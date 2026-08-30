"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useModuleResults } from "@/lib/context/ModuleResultsContext";
import {
  REQUIRED_PPE_ITEMS,
  PPE_CLASS_COLORS,
  ENTRY_CHECK_INTERVAL_MS,
} from "@/lib/ml/safety/config";
import { PPEDetectionResult, RawPPEDetection } from "@/lib/ml/safety/types";
import {
  Camera,
  Play,
  Square,
  VideoOff,
  RefreshCw,
  Sparkles,
  Unlock,
  Lock,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

type CameraPermissionState = "idle" | "requesting" | "active" | "denied" | "not_found";

export default function EntryCheckpointCamera() {
  const { store, updateSafety } = useModuleResults();

  const [permissionState, setPermissionState] = useState<CameraPermissionState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Verification tracking
  const [hasReceivedFirstCheck, setHasReceivedFirstCheck] = useState<boolean>(false);
  const [lastCheckTime, setLastCheckTime] = useState<string | null>(null);
  const [aiReasoning, setAiReasoning] = useState<string | null>(null);

  // Real live detection state — starts at normal unverified 0/3 state
  const [liveDetections, setLiveDetections] = useState<RawPPEDetection[]>([]);
  const [presentItems, setPresentItems] = useState<string[]>([]);
  const [missingItems, setMissingItems] = useState<string[]>([...REQUIRED_PPE_ITEMS]);
  const [entryDecision, setEntryDecision] = useState<"Allowed" | "Denied">("Denied");

  // Single-flight guard & cache refs
  const isRequestInFlightRef = useRef<boolean>(false);
  const candidateDecisionRef = useRef<"Allowed" | "Denied">("Denied");
  const consecutiveCountRef = useRef<number>(0);
  const lastAnalyzedFrameTimeRef = useRef<number>(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const captureCanvasRef = useRef<HTMLCanvasElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Request actual browser webcam via getUserMedia
  const startCamera = async () => {
    setPermissionState("requesting");
    setErrorMessage(null);
    setHasReceivedFirstCheck(false);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("getUserMedia is not supported on this browser.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: false,
      });

      mediaStreamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch((err) => {
            console.warn("Video play error:", err);
          });
        };
      }

      setPermissionState("active");
    } catch (err: any) {
      console.warn("Camera access error:", err);
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setPermissionState("denied");
        setErrorMessage("Camera access was blocked. Please allow camera permissions in your browser settings.");
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        setPermissionState("not_found");
        setErrorMessage("No physical camera device was detected on your computer.");
      } else {
        setPermissionState("denied");
        setErrorMessage(err.message || "Failed to access device camera.");
      }
    }
  };

  // Stop camera tracks and release device
  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setPermissionState("idle");
    setLiveDetections([]);
    setPresentItems([]);
    setMissingItems([...REQUIRED_PPE_ITEMS]);
    setHasReceivedFirstCheck(false);
    isRequestInFlightRef.current = false;
  };

  useEffect(() => {
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Overlay Canvas Drawing Function
  const drawOverlay = useCallback(
    (detections: RawPPEDetection[]) => {
      const canvas = overlayCanvasRef.current;
      const video = videoRef.current;
      if (!canvas || !video) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 360;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      detections.forEach((det) => {
        const [pctX, pctY, pctW, pctH] = det.boundingBox;
        const x = (pctX / 100) * canvas.width;
        const y = (pctY / 100) * canvas.height;
        const w = (pctW / 100) * canvas.width;
        const h = (pctH / 100) * canvas.height;

        const colorInfo = PPE_CLASS_COLORS[det.className.toLowerCase()] ||
          PPE_CLASS_COLORS[det.className] || { hex: "#10B981" };

        const colorHex = colorInfo.hex || "#10B981";

        // Draw Bounding Box Rectangle
        ctx.strokeStyle = colorHex;
        ctx.lineWidth = 3;
        ctx.fillStyle = `${colorHex}26`;
        ctx.strokeRect(x, y, w, h);
        ctx.fillRect(x, y, w, h);

        // Draw Label Tag Pill
        const label = `${det.className} (${Math.round(det.confidence * 100)}%)`;
        ctx.font = "bold 13px sans-serif";
        const textWidth = ctx.measureText(label).width;
        const pillHeight = 22;
        const pillY = Math.max(0, y - pillHeight - 2);

        ctx.fillStyle = "rgba(15, 23, 42, 0.88)";
        ctx.fillRect(x, pillY, textWidth + 12, pillHeight);

        ctx.fillStyle = colorHex;
        ctx.fillText(label, x + 6, pillY + 15);
      });
    },
    []
  );

  // Core Inspection Worker with Single-Flight Guard & Detailed Diagnostics
  const runInspection = useCallback(async () => {
    // 1. Strict single-flight guard
    if (isRequestInFlightRef.current) return;

    const video = videoRef.current;
    const captureCanvas = captureCanvasRef.current;

    if (!video || video.readyState < 2 || !captureCanvas) return;

    const now = Date.now();
    if (now - lastAnalyzedFrameTimeRef.current < 6000) return;

    isRequestInFlightRef.current = true;
    setIsProcessing(true);

    try {
      captureCanvas.width = 640;
      captureCanvas.height = 360;

      const ctx = captureCanvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);
      const frameBase64 = captureCanvas.toDataURL("image/jpeg", 0.65);

      const response = await fetch("/api/safety/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          frame: frameBase64,
          temperature: store.safety.temperatureReading || 32,
          gasPpm: store.safety.gasReading || 25,
          mode: "entry",
        }),
      });

      lastAnalyzedFrameTimeRef.current = Date.now();

      if (response.ok) {
        const data: PPEDetectionResult = await response.json();

        console.log(`[ENTRY CHECK CLIENT SUCCESS] ${new Date().toLocaleTimeString()}`, {
          present: data.presentItems,
          missing: data.missingItems,
          decision: data.entryDecision,
          reasoning: data.reasoning,
        });

        const returnedDetections = data.detections || [];
        setLiveDetections(returnedDetections);
        drawOverlay(returnedDetections);

        const currentPresent = data.presentItems || [];
        const currentMissing = data.missingItems || REQUIRED_PPE_ITEMS;

        setPresentItems(currentPresent);
        setMissingItems(currentMissing);
        setHasReceivedFirstCheck(true);
        setLastCheckTime(data.timestamp || new Date().toLocaleTimeString());
        setAiReasoning(data.reasoning || null);

        // 2-Cycle Stability Check for Entry Decision
        const rawDecision: "Allowed" | "Denied" = data.entryDecision || (currentMissing.length === 0 ? "Allowed" : "Denied");

        if (rawDecision === candidateDecisionRef.current) {
          consecutiveCountRef.current += 1;
        } else {
          candidateDecisionRef.current = rawDecision;
          consecutiveCountRef.current = 1;
        }

        if (consecutiveCountRef.current >= 2 || !hasReceivedFirstCheck) {
          setEntryDecision(rawDecision);
        }

        updateSafety({
          detections: returnedDetections,
          presentItems: currentPresent,
          missingItems: currentMissing,
          entryDecision: rawDecision,
          overallScore: data.overallSafetyScore,
          riskLevel: data.riskLevel,
          usedFallback: false,
        });
      } else {
        console.warn(`[ENTRY CHECK CLIENT SILENT STATUS] ${new Date().toLocaleTimeString()} HTTP ${response.status}`);
      }
    } catch (silentErr: any) {
      console.warn(`[ENTRY CHECK CLIENT SILENT ERROR] ${new Date().toLocaleTimeString()}`, silentErr);
    } finally {
      setIsProcessing(false);
      isRequestInFlightRef.current = false;
    }
  }, [drawOverlay, hasReceivedFirstCheck, store.safety.gasReading, store.safety.temperatureReading, updateSafety]);

  // Periodic Frame Detection Loop (every ENTRY_CHECK_INTERVAL_MS = 15000ms)
  useEffect(() => {
    if (permissionState !== "active") return;

    const initialTimer = setTimeout(() => {
      runInspection();
    }, 800);

    const interval = setInterval(() => {
      runInspection();
    }, ENTRY_CHECK_INTERVAL_MS);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [permissionState, runInspection]);

  // Manual Check Now Handler
  const handleManualCheckNow = async () => {
    if (permissionState !== "active" || isRequestInFlightRef.current) return;
    lastAnalyzedFrameTimeRef.current = 0; // Immediate trigger
    await runInspection();
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 text-left">
      {/* Hidden canvas for video frame capture */}
      <canvas ref={captureCanvasRef} className="hidden" />

      {/* Header with Title and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-100 text-[#14532D]">
              <Camera className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
              Panel A • Entry Checkpoint
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight mt-0.5">
            Personal PPE Gate Verification
          </h3>
          <p className="text-xs text-slate-500">
            Live laptop camera inspection — ALL 3 items required before plant entry.
          </p>
        </div>

        {/* Start / Stop Toggle Button & Manual Check Now */}
        <div className="flex items-center gap-2 flex-wrap">
          {permissionState === "active" && (
            <>
              {/* Check Now Manual Trigger Button */}
              <Button
                size="sm"
                variant="outline"
                onClick={handleManualCheckNow}
                disabled={isProcessing}
                className="rounded-xl text-xs font-bold bg-white text-slate-700 hover:text-slate-900 border border-slate-200 shadow-2xs cursor-pointer flex items-center gap-1.5 py-1.5 px-3"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                    <span>Checking...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Check Now</span>
                  </>
                )}
              </Button>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#14532D] text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Live Checkpoint</span>
              </div>
            </>
          )}

          {permissionState === "active" ? (
            <Button
              size="sm"
              onClick={stopCamera}
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold px-3 py-1.5 flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop Checkpoint</span>
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={startCamera}
              disabled={permissionState === "requesting"}
              className="bg-[#14532D] hover:bg-[#0F3D2E] text-white rounded-xl text-xs font-bold px-3.5 py-1.5 flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              {permissionState === "requesting" ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Requesting...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Checkpoint</span>
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Real Live Video Feed Area with Absolute Canvas Overlay */}
      <div className="relative w-full h-[260px] sm:h-[300px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center select-none shadow-inner">
        {/* Real Live Webcam Video Element */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className={`w-full h-full object-cover transform -scale-x-100 ${
            permissionState === "active" ? "block" : "hidden"
          }`}
        />

        {/* Absolute Canvas Overlay for Real Bounding Boxes */}
        <canvas
          ref={overlayCanvasRef}
          className={`absolute inset-0 w-full h-full pointer-events-none transform -scale-x-100 ${
            permissionState === "active" ? "block" : "hidden"
          }`}
        />

        {/* State: Idle / Paused */}
        {permissionState === "idle" && (
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400">
              <Camera className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-slate-200">Checkpoint Paused</h4>
              <p className="text-xs text-slate-400 max-w-[280px]">
                Click <strong>&quot;Start Checkpoint&quot;</strong> above to open your laptop camera and begin live PPE verification.
              </p>
            </div>
            <Button
              size="sm"
              onClick={startCamera}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold px-4 py-2 flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Activate Camera</span>
            </Button>
          </div>
        )}

        {/* State: Requesting Camera Permission */}
        {permissionState === "requesting" && (
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-3 text-white">
            <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
            <h4 className="font-bold text-sm">Waiting for Camera Permission...</h4>
            <p className="text-xs text-slate-400 max-w-[260px]">
              Please click <strong>&quot;Allow&quot;</strong> in your browser prompt to enable live personal PPE inspection.
            </p>
          </div>
        )}

        {/* State: Permission Denied */}
        {permissionState === "denied" && (
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-3 text-red-200">
            <div className="w-12 h-12 rounded-2xl bg-red-950/60 border border-red-800 flex items-center justify-center text-red-400">
              <VideoOff className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-white">Camera Access Denied</h4>
              <p className="text-xs text-red-300 max-w-[300px] leading-relaxed">
                {errorMessage || "Camera access is required for entry verification. Please allow camera permissions and try again."}
              </p>
            </div>
            <Button
              size="sm"
              onClick={startCamera}
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold px-4 py-2 shadow-sm cursor-pointer"
            >
              Retry Camera Permission
            </Button>
          </div>
        )}

        {/* State: No Camera Found */}
        {permissionState === "not_found" && (
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-2 text-slate-300">
            <VideoOff className="w-8 h-8 text-amber-400" />
            <h4 className="font-bold text-sm text-white">No Camera Detected</h4>
            <p className="text-xs text-slate-400 max-w-[280px]">
              Please connect a USB webcam or enable your device camera to use Entry Checkpoint.
            </p>
          </div>
        )}

        {/* Live Active HUD Elements */}
        {permissionState === "active" && (
          <>
            {/* Live Analyzing Indicator */}
            {isProcessing && (
              <div className="absolute top-2.5 left-2.5 bg-slate-900/80 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1.5 backdrop-blur-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Analyzing Live Frame...
              </div>
            )}

            {/* Top-Right VERIFIED: X/3 PPE Badge */}
            <div className="absolute top-2.5 right-2.5 bg-slate-900/85 backdrop-blur-xs border border-slate-700 text-white text-[10.5px] px-2.5 py-1 rounded-xl font-mono shadow-sm">
              <span className="text-slate-400 mr-1.5">VERIFIED:</span>
              <span
                className={`font-bold ${
                  presentItems.length === REQUIRED_PPE_ITEMS.length
                    ? "text-emerald-400"
                    : "text-amber-400"
                }`}
              >
                {presentItems.length}/{REQUIRED_PPE_ITEMS.length} PPE
              </span>
            </div>
          </>
        )}
      </div>

      {/* 3 Required PPE Checklist Items Pills (Helmet, Safety Goggles, Gloves) */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600">
          <span className="uppercase tracking-wider text-[10.5px]">Required Entry PPE Checklist ({REQUIRED_PPE_ITEMS.length} Items)</span>
          <span className="font-mono text-[11px]">
            {presentItems.length}/{REQUIRED_PPE_ITEMS.length} Verified
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {REQUIRED_PPE_ITEMS.map((item) => {
            const isPresent = presentItems.some(
              (p) => p.toLowerCase() === item.toLowerCase()
            );

            return (
              <div
                key={item}
                className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold transition-colors ${
                  isPresent
                    ? "bg-emerald-100/70 border-emerald-300 text-emerald-900 shadow-2xs"
                    : "bg-white border-slate-200 text-slate-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isPresent ? "bg-emerald-500" : "bg-slate-300"
                    }`}
                  />
                  <span className="capitalize">{item === "goggles" ? "Safety Goggles" : item}</span>
                </div>
                {isPresent ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-slate-300" />
                )}
              </div>
            );
          })}
        </div>

        {/* AI Diagnostics Pill (shown once check completes) */}
        {hasReceivedFirstCheck && (
          <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-[11px] text-slate-600 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5 font-medium truncate max-w-full">
              <Eye className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span className="truncate">
                <strong className="text-slate-800">AI Visual Observation:</strong> {aiReasoning || "Frame inspected and evaluated."}
              </span>
            </div>
            {lastCheckTime && (
              <span className="text-[10px] text-slate-400 font-mono shrink-0 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {lastCheckTime}
              </span>
            )}
          </div>
        )}
      </div>

      {/* LIVE ENTRY STATUS BANNER (Pops up when camera is opened/activated, default DENIED) */}
      <AnimatePresence mode="wait">
        {permissionState === "active" ? (
          entryDecision === "Allowed" && presentItems.length === REQUIRED_PPE_ITEMS.length ? (
            <motion.div
              key="allowed-banner"
              initial={{ opacity: 0, scale: 0.94, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -8 }}
              transition={{ type: "spring", stiffness: 450, damping: 28 }}
              className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm tracking-tight">
                    Entry Allowed — All PPE Verified
                  </h4>
                  <p className="text-[11px] text-emerald-100">
                    All {REQUIRED_PPE_ITEMS.length} required items confirmed. Turnstile barrier unlocked.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold bg-white/20 px-2.5 py-1 rounded-xl shrink-0">
                <Unlock className="w-3.5 h-3.5" /> Unlocked
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="denied-banner"
              initial={{ opacity: 0, scale: 0.94, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -8 }}
              transition={{ type: "spring", stiffness: 450, damping: 28 }}
              className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 font-bold">
                  <XCircle className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm tracking-tight">
                    Entry Denied — Missing Gear
                  </h4>
                  <p className="text-[11px] text-red-100">
                    Missing:{" "}
                    <strong className="text-white underline font-bold">
                      {(() => {
                        const displayMissing = (
                          missingItems.length > 0
                            ? missingItems
                            : REQUIRED_PPE_ITEMS.filter(
                                (req) => !presentItems.some((p) => p.toLowerCase() === req.toLowerCase())
                              )
                        ).map((item) => (item.toLowerCase() === "goggles" ? "Safety Goggles" : item));
                        return displayMissing.join(", ") || "Incomplete PPE";
                      })()}
                    </strong>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold bg-white/20 px-2.5 py-1 rounded-xl shrink-0">
                <Lock className="w-3.5 h-3.5" /> Locked
              </div>
            </motion.div>
          )
        ) : (
          <motion.div
            key="standby-banner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold flex items-center justify-between"
          >
            <span>Entry Checkpoint Standby — Start camera to verify PPE compliance</span>
            <span className="font-mono text-[10.5px] text-slate-500">Gate: Inactive</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
