"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useModuleResults } from "@/lib/context/ModuleResultsContext";
import EntryCheckpointCamera from "@/components/dashboard/safety/EntryCheckpointCamera";
import WorkplaceMonitoringCamera from "@/components/dashboard/safety/WorkplaceMonitoringCamera";
import CCTVViolationHistory, { CCTVViolationEvent } from "@/components/dashboard/safety/CCTVViolationHistory";
import {
  Video,
  ShieldCheck,
  Flame,
  Wind,
  BellRing,
  Sparkles,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SafetyIntelligence() {
  const { store, updateSafety } = useModuleResults();
  const [tempInput, setTempInput] = useState<number>(store.safety.temperatureReading || 38.5);
  const [gasInput, setGasInput] = useState<number>(store.safety.gasReading || 42);

  const [violationEvents, setViolationEvents] = useState<CCTVViolationEvent[]>([
    {
      id: "CCTV-V-101",
      workerTempId: "Worker B",
      cameraName: "Bay 04 Main CCTV Feed",
      missingItems: ["helmet", "goggles", "mask"],
      timestamp: "Today 10:14 AM",
      severity: "High",
      status: "Active",
    },
    {
      id: "CCTV-V-102",
      workerTempId: "Worker C",
      cameraName: "Welding Section Helper Bay",
      missingItems: ["Gloves"],
      timestamp: "Today 09:30 AM",
      severity: "Medium",
      status: "Resolved",
    },
    {
      id: "CCTV-V-103",
      workerTempId: "Worker A",
      cameraName: "Bay 02 Loading Dock",
      missingItems: ["Vest"],
      timestamp: "Yesterday 04:45 PM",
      severity: "Medium",
      status: "Resolved",
    },
  ]);

  const handleUpdateSensors = (temp: number, gas: number) => {
    setTempInput(temp);
    setGasInput(gas);
    const critical = (temp > 42 && gas > 50) || (gas > 50 && store.safety.activeViolationsCount > 0);
    updateSafety({
      temperatureReading: temp,
      gasReading: gas,
      criticalAlertActive: critical,
    });
  };

  const handleNewViolationAlert = (workerId: string, missing: string[]) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newEvent: CCTVViolationEvent = {
      id: `CCTV-V-${Date.now().toString().slice(-4)}`,
      workerTempId: workerId,
      cameraName: "Bay 04 Main CCTV Feed",
      missingItems: missing,
      timestamp: `Today ${timeStr}`,
      severity: missing.length >= 2 ? "High" : "Medium",
      status: "Active",
    };

    setViolationEvents((prev) => [newEvent, ...prev]);

    // Also update ModuleResultsContext violation history
    const existingHist = store.safety.violationHistory || [];
    updateSafety({
      violationHistory: [
        {
          id: newEvent.id,
          timestamp: newEvent.timestamp,
          workerName: workerId,
          missingItem: `Missing: ${missing.join(", ")}`,
          resolved: false,
        },
        ...existingHist,
      ],
    });
  };

  const handleResolveViolation = (id: string) => {
    setViolationEvents((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, status: "Resolved" } : ev))
    );
  };

  return (
    <section id="section-safety" className="scroll-mt-24 w-full space-y-6 text-left">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-100 text-[#14532D]">
              <Video className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
              Section 1 • Dual-Feed Workplace Safety Vision
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-slate-900 tracking-tight mt-1">
            Safety Intelligence &amp; AI Visual PPE Analysis
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Two distinct visual intelligence feeds powered by multimodal Vision AI: <strong>Panel A</strong> for personal entry gate verification and <strong>Panel B</strong> for multi-worker shop-floor surveillance.
          </p>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-emerald-700" /> AI Visual Analysis Active
          </span>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#14532D] text-xs font-bold shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Dual Feeds Online</span>
          </div>
        </div>
      </div>

      {/* Environmental Critical Alert Banner if sensors spike */}
      {store.safety.criticalAlertActive && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-amber-500 text-slate-950 shadow-md flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center shrink-0">
              <BellRing className="w-6 h-6 text-slate-950 animate-bounce" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm uppercase tracking-wider">
                Multi-Sensor Environmental Alert
              </h4>
              <p className="text-xs font-medium text-slate-900 mt-0.5">
                Elevated gas level ({gasInput} ppm) and ambient temperature ({tempInput}°C) in manufacturing bay.
              </p>
            </div>
          </div>
          <Button
            onClick={() => handleUpdateSensors(34, 25)}
            className="bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl px-4 py-2 shrink-0 cursor-pointer shadow-md"
          >
            Reset Sensors
          </Button>
        </motion.div>
      )}

      {/* SIDE-BY-SIDE TWO-CAMERA PANEL LAYOUT (Desktop >=1024px: 2 Cols, Mobile: Stacked) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* PANEL A: Entry Checkpoint (Webcam) */}
        <EntryCheckpointCamera />

        {/* PANEL B: Workplace Monitoring (CCTV Feed) */}
        <WorkplaceMonitoringCamera onNewViolationAlert={handleNewViolationAlert} />

      </div>

      {/* Sensor Controls & Environmental Risk Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-600" /> Bay Temperature Sensor
            </span>
            <span className="text-amber-800 font-extrabold">{tempInput}°C</span>
          </div>
          <input
            type="range"
            min="20"
            max="60"
            step="0.5"
            value={tempInput}
            onChange={(e) => handleUpdateSensors(parseFloat(e.target.value), gasInput)}
            className="w-full accent-emerald-700 cursor-pointer"
          />
          <span className="text-[10.5px] text-slate-400 block">
            Safe Operating Range: 22°C - 38°C (Trigger threshold: &gt;42°C)
          </span>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-blue-600" /> Gas Concentration (PPM)
            </span>
            <span className="text-blue-800 font-extrabold">{gasInput} ppm</span>
          </div>
          <input
            type="range"
            min="10"
            max="90"
            step="1"
            value={gasInput}
            onChange={(e) => handleUpdateSensors(tempInput, parseInt(e.target.value))}
            className="w-full accent-emerald-700 cursor-pointer"
          />
          <span className="text-[10.5px] text-slate-400 block">
            Safe Operating Range: 10 - 45 ppm (Hazard threshold: &gt;50 ppm)
          </span>
        </div>
      </div>

      {/* CCTV Violation History Table Log */}
      <CCTVViolationHistory
        events={violationEvents}
        onResolveViolation={handleResolveViolation}
      />
    </section>
  );
}
