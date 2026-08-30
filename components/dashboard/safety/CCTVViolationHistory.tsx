"use client";

import React, { useState } from "react";
import { AlertTriangle, Filter, Search, CheckCircle2, ShieldAlert } from "lucide-react";

export interface CCTVViolationEvent {
  id: string;
  workerTempId: string;
  cameraName: string;
  missingItems: string[];
  timestamp: string;
  severity: "Medium" | "High" | "Critical";
  status: "Active" | "Resolved";
}

interface CCTVViolationHistoryProps {
  events: CCTVViolationEvent[];
  onResolveViolation?: (id: string) => void;
}

export default function CCTVViolationHistory({
  events,
  onResolveViolation,
}: CCTVViolationHistoryProps) {
  const [filter, setFilter] = useState<"all" | "active" | "resolved">("all");
  const [search, setSearch] = useState("");

  const filtered = events.filter((ev) => {
    if (filter === "active" && ev.status !== "Active") return false;
    if (filter === "resolved" && ev.status !== "Resolved") return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        ev.workerTempId.toLowerCase().includes(q) ||
        ev.cameraName.toLowerCase().includes(q) ||
        ev.missingItems.some((item) => item.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div>
          <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-700" />
            CCTV Safety Violation Log (Panel B Surveillance)
          </h4>
          <p className="text-[11px] text-slate-500">
            Automated event telemetry captured by the shop-floor CCTV monitoring feed
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filter === "all" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            All ({events.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("active")}
            className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filter === "active" ? "bg-white text-red-900 shadow-xs font-extrabold" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Active
          </button>
          <button
            type="button"
            onClick={() => setFilter("resolved")}
            className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filter === "resolved" ? "bg-white text-emerald-900 shadow-xs font-extrabold" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Resolved
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by worker (e.g. Worker B) or missing item (e.g. goggles)..."
          className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-600"
        />
      </div>

      {/* Table / List */}
      <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-400 font-medium">
            No violation events matching filter.
          </div>
        ) : (
          filtered.map((ev) => (
            <div
              key={ev.id}
              className="py-2.5 flex items-center justify-between text-xs gap-3 hover:bg-slate-50/60 px-1 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                    ev.status === "Active"
                      ? "bg-red-100 text-red-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900">{ev.workerTempId}</span>
                    <span className="text-[10px] text-slate-400 font-mono">• {ev.cameraName}</span>
                  </div>
                  <p className="text-[11px] text-red-700 font-semibold">
                    Missing: {ev.missingItems.join(", ")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-slate-400 font-mono">{ev.timestamp}</span>
                {ev.status === "Active" && onResolveViolation ? (
                  <button
                    onClick={() => onResolveViolation(ev.id)}
                    className="text-[10px] font-bold px-2 py-1 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 border border-slate-200 transition-colors cursor-pointer"
                  >
                    Acknowledge
                  </button>
                ) : (
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Resolved ✓
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
