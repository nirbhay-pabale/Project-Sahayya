"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, Video, Upload, Radio, Check, Settings2, Link2, Smartphone, Globe } from "lucide-react";

export interface CameraSourceConfig {
  sourceType: "demo" | "rtsp" | "http" | "video" | "webcam" | "ipwebcam";
  cameraName: string;
  streamUrl: string;
  videoFileName?: string;
}

interface CameraSourceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: CameraSourceConfig;
  onSaveConfig: (config: CameraSourceConfig) => void;
}

export default function CameraSourceModal({
  open,
  onOpenChange,
  config,
  onSaveConfig,
}: CameraSourceModalProps) {
  const [sourceType, setSourceType] = useState<CameraSourceConfig["sourceType"]>(config.sourceType);
  const [cameraName, setCameraName] = useState(config.cameraName);
  const [streamUrl, setStreamUrl] = useState(config.streamUrl || "192.168.1.50:8080");
  const [selectedFileName, setSelectedFileName] = useState(config.videoFileName || "");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      setSourceType("video");
    }
  };

  const handleSave = () => {
    onSaveConfig({
      sourceType,
      cameraName: cameraName.trim() || "Bay 04 Main CCTV Feed",
      streamUrl: streamUrl.trim(),
      videoFileName: selectedFileName,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6 rounded-3xl bg-white border border-slate-200 shadow-2xl">
        <DialogHeader className="text-left space-y-1">
          <div className="flex items-center gap-2 text-emerald-800">
            <Settings2 className="w-5 h-5" />
            <DialogTitle className="text-lg font-extrabold text-slate-900">
              Configure Workplace CCTV Stream
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-slate-500">
            Connect your Phone Camera (IP Webcam), an RTSP/HTTP camera feed, or upload shop-floor demonstration video.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-3 text-left">
          {/* Camera Name Input */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Camera Feed Name
            </label>
            <input
              type="text"
              value={cameraName}
              onChange={(e) => setCameraName(e.target.value)}
              placeholder="e.g. Bay 04 Main CCTV Feed"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {/* Source Type Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              Feed Source Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSourceType("ipwebcam")}
                className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  sourceType === "ipwebcam"
                    ? "bg-emerald-50 border-emerald-600 text-emerald-950 shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Smartphone className="w-4 h-4 text-emerald-700" />
                <span>Phone Camera (IP)</span>
              </button>

              <button
                type="button"
                onClick={() => setSourceType("rtsp")}
                className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  sourceType === "rtsp"
                    ? "bg-emerald-50 border-emerald-600 text-emerald-950 shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Radio className="w-4 h-4 text-emerald-700" />
                <span>RTSP Stream</span>
              </button>

              <button
                type="button"
                onClick={() => setSourceType("http")}
                className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  sourceType === "http"
                    ? "bg-emerald-50 border-emerald-600 text-emerald-950 shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Link2 className="w-4 h-4 text-emerald-700" />
                <span>HTTP / MJPEG</span>
              </button>

              <button
                type="button"
                onClick={() => setSourceType("demo")}
                className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  sourceType === "demo"
                    ? "bg-emerald-50 border-emerald-600 text-emerald-950 shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Video className="w-4 h-4 text-emerald-700" />
                <span>Demo CCTV Feed</span>
              </button>
            </div>
          </div>

          {/* Conditional Stream URL / Phone IP input */}
          {sourceType === "ipwebcam" && (
            <div className="space-y-1.5 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
              <label className="text-xs font-bold text-slate-800 block flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-700" />
                <span>Phone Camera IP Address &amp; Port:</span>
              </label>
              <input
                type="text"
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
                placeholder="e.g. 192.168.1.50:8080"
                className="w-full px-3.5 py-2 rounded-xl border border-emerald-300 text-xs font-mono font-bold bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <span className="text-[10.5px] text-emerald-900 block leading-snug">
                Open <strong>IP Webcam</strong> app on phone &gt; Tap &apos;Start server&apos; &gt; Enter IP shown on phone screen.
              </span>
            </div>
          )}

          {(sourceType === "rtsp" || sourceType === "http") && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Stream URL ({sourceType.toUpperCase()})
              </label>
              <input
                type="text"
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
                placeholder={
                  sourceType === "rtsp"
                    ? "rtsp://admin:pass@192.168.1.120:554/live/ch0"
                    : "http://192.168.1.120:8080/video.mjpg"
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <span className="text-[10.5px] text-slate-400 mt-1 block">
                The server polls snapshots periodically for multi-worker YOLO inference.
              </span>
            </div>
          )}

          {sourceType === "demo" && (
            <div className="p-3.5 rounded-2xl bg-slate-100 text-slate-700 border border-slate-200 text-xs">
              <strong>Demo CCTV Feed:</strong> Uses sample Bay 04 factory floor surveillance footage for demonstration.
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-xl text-xs font-bold px-4 py-2"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#14532D] hover:bg-[#0F3D2E] text-white rounded-xl text-xs font-bold px-5 py-2 shadow-xs"
          >
            Save &amp; Connect Feed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
