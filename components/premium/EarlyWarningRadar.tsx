"use client";

import React from "react";
import { useModuleResults } from "@/lib/context/ModuleResultsContext";
import { generateRadarWarnings } from "@/lib/radar/generateWarnings";
import {
  Radar,
  AlertTriangle,
  Clock,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface EarlyWarningRadarProps {
  onScrollToSection?: (sectionId: string) => void;
}

export default function EarlyWarningRadar({ onScrollToSection }: EarlyWarningRadarProps) {
  const { store } = useModuleResults();
  const warnings = generateRadarWarnings(store);

  const handleNavigate = (targetSection: string) => {
    if (onScrollToSection) {
      onScrollToSection(targetSection);
    } else {
      const el = document.getElementById(targetSection);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="section-radar" className="scroll-mt-24 w-full space-y-6 text-left">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-red-100 text-red-700">
              <Radar className="w-4 h-4 animate-spin" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-800">
              Section 9 • Predictive Risk Intelligence
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-slate-900 tracking-tight mt-1">
            Early-Warning Radar
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Catch supply chain bottlenecks, safety incidents, and statutory defaults before they occur.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-800 text-xs font-bold shadow-2xs">
          <span>{warnings.length} Active Predictive Signals</span>
        </div>
      </div>

      {/* Radar Timeline Cards */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h4 className="font-extrabold text-sm text-text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-600" /> Active Predictive Timeline
          </h4>
          <span className="text-xs text-slate-400 font-medium">Sorted by Urgency</span>
        </div>

        {warnings.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <p className="font-bold text-sm text-slate-700">Radar Clear! No critical anomalies detected.</p>
            <p className="text-xs text-slate-400">All shop floor safety, quality, and stock levels operating in optimal green zone.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {warnings.map((w) => (
              <div
                key={w.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  w.urgency === "Critical"
                    ? "bg-red-50/70 border-red-200 hover:border-red-300"
                    : w.urgency === "High"
                    ? "bg-amber-50/70 border-amber-200 hover:border-amber-300"
                    : "bg-slate-50 border-slate-200/90 hover:border-slate-300"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      w.urgency === "Critical"
                        ? "bg-red-100 text-red-700 font-extrabold"
                        : w.urgency === "High"
                        ? "bg-amber-100 text-amber-800 font-bold"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    <AlertTriangle className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h5 className="font-bold text-sm text-text-slate-900">{w.title}</h5>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          w.urgency === "Critical"
                            ? "bg-red-200 text-red-950"
                            : w.urgency === "High"
                            ? "bg-amber-200 text-amber-950"
                            : "bg-slate-200 text-slate-800"
                        }`}
                      >
                        {w.urgency} Urgency
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {w.triggerReason}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  {w.daysUntil !== undefined && (
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">
                        Horizon
                      </span>
                      <span className="text-xs font-black text-text-slate-900 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" /> In {w.daysUntil} Days
                      </span>
                    </div>
                  )}

                  <Button
                    onClick={() => handleNavigate(w.moduleTarget)}
                    className="bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-bold rounded-xl py-2 px-4 shadow-xs cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
