"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useModuleResults } from "@/lib/context/ModuleResultsContext";
import { WorkerPPEStatus, WorkplaceMonitoringResult } from "@/lib/ml/safety/types";
import { MONITORING_CHECK_INTERVAL_MS } from "@/lib/ml/safety/config";
import CameraSourceModal, { CameraSourceConfig } from "./CameraSourceModal";
import WorkerStatusList from "./WorkerStatusList";
import {
  Video,
  Settings,
  Radio,
  Sparkles,
  RefreshCw,
  Smartphone,
  Globe,
  Wifi,
  Info,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkplaceMonitoringCameraProps {
  onNewViolationAlert?: (workerId: string, missing: string[]) => void;
}

export default function WorkplaceMonitoringCamera({
  onNewViolationAlert,
}: WorkplaceMonitoringCameraProps) {
  const { store, updateSafety } = useModuleResults();
  const [modalOpen, setModalOpen] = useState(false);

  const [phoneIp, setPhoneIp] = useState<string>("192.168.1.50:8080");
  const [activeStreamUrl, setActiveStreamUrl] = useState<string>("");
  const [streamError, setStreamError] = useState<string | null>(null);

  const [cameraConfig, setCameraConfig] = useState<CameraSourceConfig>({
    sourceType: "demo",
    cameraName: "Bay 04 Main CCTV Feed",
    streamUrl: "rtsp://192.168.1.120:554/live/ch0",
  });

  const [workers, setWorkers] = useState<WorkerPPEStatus[]>([
    {
      workerTempId: "Worker A",
      detectedItems: ["Vest"],
      missingItems: ["Gloves", "goggles", "helmet", "mask"],
      status: "Violation",
      boundingBox: [21.0, 28.0, 26.5, 53.0],
      timestamp: "05:56:22 AM",
    },
    {
      workerTempId: "Worker B",
      detectedItems: ["Gloves", "goggles", "helmet", "mask"],
      missingItems: [],
      status: "Compliant",
      boundingBox: [57.0, 16.0, 17.0, 66.0],
      timestamp: "05:56:22 AM",
    },
  ]);

  const [violationsCount, setViolationsCount] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState<string>("05-06-2025 05:56:22 AM");

  const activeAlertedWorkersRef = useRef<Set<string>>(new Set(["Worker A"]));
  const isRequestInFlightRef = useRef<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const phoneImgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Robust helper to normalize phone IP/URL input (strips any accidental double http://)
  const getNormalizedPhoneUrl = (input: string) => {
    let clean = input.trim();
    if (!clean) return "";
    clean = clean.replace(/^(https?:\/\/)+/gi, "");
    clean = clean.replace(/\/+$/, "");
    return `http://${clean}`;
  };

  // Connect Phone Camera IP Webcam
  const handleConnectPhoneCctv = () => {
    const baseUrl = getNormalizedPhoneUrl(phoneIp);
    if (!baseUrl) return;

    setStreamError(null);
    const proxyStreamUrl = `/api/camera-proxy?url=${encodeURIComponent(`${baseUrl}/video`)}`;
    setActiveStreamUrl(proxyStreamUrl);

    setCameraConfig({
      sourceType: "ipwebcam",
      cameraName: "Bay 04 Main CCTV Feed (Phone Cam)",
      streamUrl: baseUrl,
    });
  };

  // Live timestamp timer
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      const day = pad(d.getDate());
      const month = pad(d.getMonth() + 1);
      const year = d.getFullYear();
      let hours = d.getHours();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const hoursStr = pad(hours);
      const minutes = pad(d.getMinutes());
      const seconds = pad(d.getSeconds());

      setCurrentTimeStr(`${day}-${month}-${year} ${hoursStr}:${minutes}:${seconds} ${ampm}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync modal save with phone active stream if ipwebcam selected
  useEffect(() => {
    if (cameraConfig.sourceType === "ipwebcam" && cameraConfig.streamUrl) {
      const baseUrl = getNormalizedPhoneUrl(cameraConfig.streamUrl);
      setPhoneIp(cameraConfig.streamUrl);
      setStreamError(null);
      setActiveStreamUrl(`/api/camera-proxy?url=${encodeURIComponent(`${baseUrl}/video`)}`);
    }
  }, [cameraConfig.sourceType, cameraConfig.streamUrl]);

  // Periodic CCTV multi-worker poll (every MONITORING_CHECK_INTERVAL_MS = 25000ms)
  const pollCctvFeed = useCallback(async () => {
    if (isRequestInFlightRef.current) return;

    isRequestInFlightRef.current = true;
    setIsProcessing(true);

    try {
      let framePayload = "";

      if (cameraConfig.sourceType === "ipwebcam") {
        try {
          const baseUrl = getNormalizedPhoneUrl(phoneIp);
          const snapshotUrl = `/api/camera-proxy?url=${encodeURIComponent(`${baseUrl}/shot.jpg`)}`;
          const shotRes = await fetch(snapshotUrl);
          if (shotRes.ok) {
            const blob = await shotRes.blob();
            framePayload = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(blob);
            });
          }
        } catch (e) {
          console.warn("[WorkplaceMonitoring] Failed to fetch IP Webcam frame snapshot:", e);
        }
      } else if (videoRef.current && canvasRef.current && cameraConfig.sourceType === "webcam") {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          framePayload = canvas.toDataURL("image/jpeg", 0.6);
        }
      }

      const res = await fetch("/api/safety/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          frame: framePayload || "data:image/jpeg;base64,/9j/4AAQSkZJRg==",
          temperature: store.safety.temperatureReading || 32,
          gasPpm: store.safety.gasReading || 25,
          mode: "monitoring",
        }),
      });

      if (res.ok) {
        const data: WorkplaceMonitoringResult = await res.json();
        const detectedWorkers = data.workers || [];

        if (detectedWorkers.length > 0) {
          setWorkers(detectedWorkers);
          const vCount = detectedWorkers.filter((w) => w.status === "Violation").length;
          setViolationsCount(vCount);

          // Check for new violations to alert without spamming
          const currentViolatorIds = new Set<string>();
          detectedWorkers.forEach((w) => {
            if (w.status === "Violation") {
              currentViolatorIds.add(w.workerTempId);
              if (!activeAlertedWorkersRef.current.has(w.workerTempId)) {
                activeAlertedWorkersRef.current.add(w.workerTempId);
                if (onNewViolationAlert) {
                  onNewViolationAlert(w.workerTempId, w.missingItems);
                }
              }
            }
          });

          // Clear resolved worker violations from active tracking
          activeAlertedWorkersRef.current.forEach((id) => {
            if (!currentViolatorIds.has(id)) {
              activeAlertedWorkersRef.current.delete(id);
            }
          });

          updateSafety({
            cctvWorkers: detectedWorkers,
            cctvViolationsToday: vCount,
          });
        }
      } else {
        console.warn("[WorkplaceMonitoring] Silent response status:", res.status);
      }
    } catch (silentErr) {
      console.warn("[WorkplaceMonitoring] Silent background poll error:", silentErr);
    } finally {
      setIsProcessing(false);
      isRequestInFlightRef.current = false;
    }
  }, [cameraConfig.sourceType, onNewViolationAlert, phoneIp, store.safety.gasReading, store.safety.temperatureReading, updateSafety]);

  useEffect(() => {
    const interval = setInterval(() => {
      pollCctvFeed();
    }, MONITORING_CHECK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [pollCctvFeed]);

  const isDemo = cameraConfig.sourceType === "demo";
  const isPhoneCam = cameraConfig.sourceType === "ipwebcam";

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 text-left">
      <canvas ref={canvasRef} width={320} height={180} className="hidden" />

      {/* Header with Title and Violations Count Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-blue-100 text-blue-900">
              <Video className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-900">
              Panel B • Workplace Monitoring
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight mt-0.5">
            CCTV Continuous Shop-Floor Surveillance
          </h3>
          <p className="text-xs text-slate-500">
            Multi-worker visual analysis with automatic violation logging.
          </p>
        </div>

        {/* Violations Today Counter */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-900 text-xs font-extrabold">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>{violationsCount} Violation{violationsCount === 1 ? "" : "s"} Active</span>
          </div>
        </div>
      </div>

      {/* VIDEO SOURCE QUICK TABS FOR PANEL B */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200">
        <button
          type="button"
          onClick={() => {
            setCameraConfig({
              sourceType: "demo",
              cameraName: "Bay 04 Main CCTV Feed",
              streamUrl: "rtsp://192.168.1.120:554/live/ch0",
            });
            setActiveStreamUrl("");
            setStreamError(null);
          }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            isDemo
              ? "bg-white text-slate-900 shadow-xs border border-slate-200/60"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Video className="w-4 h-4 text-emerald-700" />
          <span>Demo CCTV Feed</span>
        </button>

        <button
          type="button"
          onClick={() => {
            handleConnectPhoneCctv();
          }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            isPhoneCam
              ? "bg-white text-slate-900 shadow-xs border border-slate-200/60"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Smartphone className="w-4 h-4 text-emerald-700" />
          <span>Phone Camera (IP Webcam)</span>
        </button>
      </div>

      {/* PHONE CAMERA IP INPUT FIELD BOX FOR CCTV */}
      {isPhoneCam && (
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-700" />
              <span>Enter Phone CCTV IP Address &amp; Port:</span>
            </label>
            <span className="text-[10.5px] text-emerald-900 font-medium flex items-center gap-1">
              <Wifi className="w-3 h-3 text-emerald-600" /> Same Wi-Fi required
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={phoneIp}
              onChange={(e) => setPhoneIp(e.target.value)}
              placeholder="e.g. 192.168.1.50:8080"
              className="flex-1 px-3.5 py-2 rounded-xl border border-emerald-300 text-xs font-mono font-bold bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-2xs"
            />
            <Button
              size="sm"
              onClick={handleConnectPhoneCctv}
              className="bg-[#14532D] hover:bg-[#0F3D2E] text-white rounded-xl text-xs font-bold px-4 py-2 shrink-0 cursor-pointer shadow-xs"
            >
              Connect Phone CCTV
            </Button>
          </div>

          <div className="p-2.5 rounded-xl bg-white/90 border border-emerald-200/60 text-[11px] text-slate-600 flex items-start gap-2">
            <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>Phone as CCTV Feed:</strong> Open <em>IP Webcam</em> app on your phone, tap <strong>&quot;Start server&quot;</strong>, and enter the IP address shown at the bottom of your phone screen (e.g. <code>192.168.1.50:8080</code>).
            </p>
          </div>
        </div>
      )}

      {/* Video Feed Area */}
      <div className="relative w-full aspect-[4/3] sm:min-h-[380px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center select-none shadow-2xl">
        
        {/* Genuine Reference Factory Floor Scene Background (Used for Demo Mode) */}
        {isDemo && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src="/images/cctv-demo-feed.jpg"
            alt="CCTV Bay 04 Factory Floor Surveillance"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}

        {/* Live Phone Camera IP Webcam MJPEG Stream Element */}
        {isPhoneCam && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            ref={phoneImgRef}
            src={
              activeStreamUrl ||
              `/api/camera-proxy?url=${encodeURIComponent(`${getNormalizedPhoneUrl(phoneIp)}/video`)}`
            }
            alt="Phone Camera CCTV Live Stream"
            className="absolute inset-0 w-full h-full object-contain"
            onError={() => {
              console.warn("Could not load phone CCTV stream via proxy, trying direct MJPEG URL fallback...");
              // Direct browser fallback if proxy hits local subnet restriction
              const baseUrl = getNormalizedPhoneUrl(phoneIp);
              if (baseUrl && activeStreamUrl !== `${baseUrl}/video`) {
                setActiveStreamUrl(`${baseUrl}/video`);
              } else {
                setStreamError(`Unable to reach http://${phoneIp.replace(/^https?:\/\//i, "")}. Please ensure your phone & computer are connected to the same Wi-Fi network and 'Start server' is active in IP Webcam.`);
              }
            }}
          />
        )}

        {/* Stream Error Notice Overlay */}
        {isPhoneCam && streamError && (
          <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-6 text-center text-amber-200 z-20 space-y-2">
            <AlertTriangle className="w-8 h-8 text-amber-400" />
            <h4 className="font-bold text-sm text-white">Connection Warning</h4>
            <p className="text-xs text-slate-300 max-w-[320px] leading-relaxed">
              {streamError}
            </p>
            <Button
              size="sm"
              onClick={handleConnectPhoneCctv}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold px-4 py-2 mt-2 cursor-pointer"
            >
              Retry Connection
            </Button>
          </div>
        )}

        {/* Top-Left Monospace Timestamp HUD Overlay */}
        <div className="absolute top-3.5 left-4 text-white text-xs sm:text-[13px] font-mono font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-wide z-10">
          {currentTimeStr}
        </div>

        {/* Top-Right Floor Density Pill Overlay */}
        <div className="absolute top-3.5 right-4 bg-[#0F172A]/85 backdrop-blur-md border border-slate-700 text-white text-xs font-mono px-3.5 py-1.5 rounded-2xl flex items-center gap-2 shadow-lg z-10">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">
            FLOOR DENSITY:
          </span>
          <span className="text-[#38BDF8] font-black">{workers.length} Workers</span>
        </div>

        {/* Dynamic Worker Overlay Badges */}
        <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-end z-10">
          <div className="flex items-center gap-2 flex-wrap">
            {workers.map((worker) => (
              <div
                key={worker.workerTempId}
                className={`px-3 py-1.5 rounded-xl backdrop-blur-md text-xs font-mono font-bold flex items-center gap-2 shadow-lg ${
                  worker.status === "Compliant"
                    ? "bg-emerald-950/80 border border-emerald-500/50 text-emerald-200"
                    : "bg-red-950/80 border border-red-500/50 text-red-200"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${worker.status === "Compliant" ? "bg-emerald-400" : "bg-red-400 animate-ping"}`} />
                <span>{worker.workerTempId}: {worker.status.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom-Left Overlay Badge inside Video Screen */}
        <div className="absolute bottom-3.5 left-4 bg-[#0F172A]/90 backdrop-blur-md border border-slate-700/80 text-white px-3.5 py-2 rounded-2xl flex items-center gap-3 shadow-2xl pointer-events-none z-10">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <div className="text-left">
            <div className="font-extrabold text-xs text-white leading-tight">
              {cameraConfig.cameraName || "Bay 04 Main CCTV Feed"}
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              {isPhoneCam
                ? `IP WEBCAM • ${getNormalizedPhoneUrl(phoneIp)}`
                : cameraConfig.sourceType === "rtsp" && cameraConfig.streamUrl
                ? `RTSP • ${cameraConfig.streamUrl}`
                : "RTSP • rtsp://192.168.1.120:554/live/ch0"}
            </div>
          </div>
        </div>

        {/* Processing Indicator if polling */}
        {isProcessing && (
          <div className="absolute bottom-3.5 right-4 bg-slate-900/80 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1.5 backdrop-blur-xs font-mono z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            AI Visual Surveillance Active
          </div>
        )}
      </div>

      {/* Camera Source Status Bar with Settings & Scan Feed Button */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <Radio className="w-4 h-4 text-emerald-700 animate-pulse" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900">{cameraConfig.cameraName}</span>
              {isDemo && (
                <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-200">
                  Demo Feed
                </span>
              )}
              {isPhoneCam && (
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full border border-emerald-200">
                  Phone Cam CCTV
                </span>
              )}
            </div>
            <span className="text-[10.5px] text-slate-500 font-mono">
              {isDemo
                ? "Demo Feed • Sample footage (Bay 04)"
                : isPhoneCam
                ? `IP WEBCAM • ${getNormalizedPhoneUrl(phoneIp)}`
                : `${cameraConfig.sourceType.toUpperCase()} • ${cameraConfig.streamUrl}`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Scan Now Manual Trigger Button */}
          <Button
            size="sm"
            variant="outline"
            onClick={pollCctvFeed}
            disabled={isProcessing}
            className="rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 shadow-2xs cursor-pointer flex items-center gap-1.5 py-1.5 px-3"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                <span>Scanning...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Scan Feed</span>
              </>
            )}
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setModalOpen(true)}
            className="rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 shadow-2xs cursor-pointer flex items-center gap-1.5 py-1.5 px-3"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Change Source</span>
          </Button>
        </div>
      </div>

      {/* Live List of Tracked Workers */}
      <WorkerStatusList workers={workers} />

      {/* Camera Source Configuration Modal */}
      <CameraSourceModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        config={cameraConfig}
        onSaveConfig={(newConfig) => setCameraConfig(newConfig)}
      />
    </div>
  );
}
