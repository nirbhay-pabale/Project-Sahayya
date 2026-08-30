"use client";

import React from "react";
import { WorkerPPEStatus } from "@/lib/ml/safety/types";
import { CheckCircle2, AlertTriangle, UserCheck, UserX, Clock } from "lucide-react";

interface WorkerStatusListProps {
  workers: WorkerPPEStatus[];
}

export default function WorkerStatusList({ workers }: WorkerStatusListProps) {
  if (!workers || workers.length === 0) {
    return (
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 text-center">
        No active worker clusters currently in frame.
      </div>
    );
  }

  return (
    <div className="space-y-2 text-left">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
          Tracked Workers in Monitored Area ({workers.length})
        </span>
        <span className="text-[10px] text-slate-400 font-mono">
          Proximity Cluster Engine
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {workers.map((worker) => {
          const isCompliant = worker.status === "Compliant";
          return (
            <div
              key={worker.workerTempId}
              className={`p-3 rounded-2xl border transition-all ${
                isCompliant
                  ? "bg-emerald-50/70 border-emerald-200/90 text-emerald-950"
                  : "bg-red-50/70 border-red-200/90 text-red-950"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  {isCompliant ? (
                    <UserCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  ) : (
                    <UserX className="w-4 h-4 text-red-700 shrink-0" />
                  )}
                  <span className="font-extrabold text-xs text-slate-900">
                    {worker.workerTempId}
                  </span>
                </div>

                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    isCompliant
                      ? "bg-emerald-200 text-emerald-900"
                      : "bg-red-200 text-red-900 animate-pulse"
                  }`}
                >
                  {worker.status}
                </span>
              </div>

              {/* Items Summary */}
              <div className="text-[11px] space-y-0.5">
                {isCompliant ? (
                  <p className="text-emerald-800 font-medium">
                    ✓ All PPE equipped ({worker.detectedItems.join(", ")})
                  </p>
                ) : (
                  <p className="text-red-800 font-bold">
                    ✗ Missing: {worker.missingItems.join(", ")}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-[9.5px] text-slate-500 pt-1.5 mt-1 border-t border-slate-200/60 font-mono">
                <span>Location: ({worker.boundingBox[0]}%, {worker.boundingBox[1]}%)</span>
                <span>{worker.timestamp}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
