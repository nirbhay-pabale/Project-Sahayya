"use client";

import React, { useState } from "react";
import { useModuleResults } from "@/lib/context/ModuleResultsContext";
import {
  ShieldCheck,
  Calendar,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ComplianceIntelligence() {
  const { store } = useModuleResults();
  const [bisSearchQuery, setBisSearchQuery] = useState("");
  const [expandedArea, setExpandedArea] = useState<string | null>(null);

  const subAreas = [
    {
      id: "safety",
      title: "Factory Act & Workplace Safety",
      score: store.compliance.subScores.safety,
      status: "Compliant",
      details: "DISH Form 2 renewal filed; live CCTV hazard telemetry active in shop bay.",
    },
    {
      id: "quality",
      title: "ZED Bronze & Product Quality",
      score: store.compliance.subScores.quality,
      status: "Compliant",
      details: "Quality defect threshold maintained under 7%; testing records logged.",
    },
    {
      id: "records",
      title: "Statutory Registers & Wage Records",
      score: store.compliance.subScores.records,
      status: "Cleared",
      details: "Form B Wage register and Form D overtime registers digitized.",
    },
    {
      id: "licenses",
      title: "State Directorate & Trade Licenses",
      score: store.compliance.subScores.licenses,
      status: "Action Required",
      details: "State manufacturing permit renewal due in 23 days on DISH portal.",
    },
    {
      id: "deadlines",
      title: "Tax & GST Monthly Deadlines",
      score: store.compliance.subScores.deadlines,
      status: "On Track",
      details: "GSTR-1 upload due 11th June; GSTR-3B payment due 20th June.",
    },
  ];

  const handleBisSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (bisSearchQuery.trim()) {
      window.open(`https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/knowyourstandards/issearch?query=${encodeURIComponent(bisSearchQuery)}`, "_blank");
    } else {
      window.open("https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/knowyourstandards/issearch", "_blank");
    }
  };

  return (
    <section id="section-compliance" className="scroll-mt-24 w-full space-y-6 text-left">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-100 text-[#14532D]">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
              Section 6 • Statutory Compliance
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-slate-900 tracking-tight mt-1">
            Compliance Intelligence &amp; Statutory Tracker
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            One unified score across GST, State Factory Act permits, Pollution CTO, and worker statutory challans.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#14532D] text-xs font-bold shadow-2xs">
          <span>Overall Health: 92% (High Standing)</span>
        </div>
      </div>

      {/* 4-Step Workflow Visual Diagram (Detect → Track → Remind → Report) */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 to-[#0F3D2E] text-white space-y-3 shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
            Automated Statutory Workflow
          </span>
          <span className="text-[11px] text-slate-300">Continuous 360° MSME Coverage</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs space-y-1">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center">
              1
            </div>
            <h5 className="font-bold text-xs">Detect</h5>
            <p className="text-[11px] text-slate-300">Scan CCTV hazards, defect rates &amp; missing filings</p>
          </div>

          <div className="p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs space-y-1">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center">
              2
            </div>
            <h5 className="font-bold text-xs">Track</h5>
            <p className="text-[11px] text-slate-300">Maintain digital wage registers &amp; license calendars</p>
          </div>

          <div className="p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs space-y-1">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center">
              3
            </div>
            <h5 className="font-bold text-xs">Remind</h5>
            <p className="text-[11px] text-slate-300">Automated WhatsApp &amp; SMS alerts 3 days prior</p>
          </div>

          <div className="p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs space-y-1">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center">
              4
            </div>
            <h5 className="font-bold text-xs">Report</h5>
            <p className="text-[11px] text-slate-300">Generate bank-ready audit &amp; inspection dossiers</p>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Sub-area breakdown list (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-text-slate-900 pb-2 border-b border-slate-100">
              Statutory Sub-Area Health Breakdown
            </h4>

            <div className="space-y-2">
              {subAreas.map((area) => {
                const isExpanded = expandedArea === area.id;
                return (
                  <div
                    key={area.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <h5 className="font-bold text-xs text-text-slate-900">{area.title}</h5>
                          <span className="text-[10.5px] text-slate-500">Score: {area.score}%</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            area.status === "Compliant" || area.status === "Cleared" || area.status === "On Track"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {area.status}
                        </span>
                        <button
                          type="button"
                          onClick={() => setExpandedArea(isExpanded ? null : area.id)}
                          className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 mt-2 font-medium">
                        {area.details}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Deadlines List & BIS Search (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Deadlines List */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="font-bold text-sm text-text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-700" /> Upcoming Filings &amp; Renewals
              </h4>
              <span className="text-[10.5px] font-bold text-slate-500">June 2025</span>
            </div>

            <div className="space-y-2">
              {store.compliance.upcomingDeadlines.map((d) => (
                <div key={d.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <h5 className="font-bold text-text-slate-900 text-xs">{d.title}</h5>
                    <span className="text-[10.5px] text-slate-500">Portal: {d.portal}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${d.type === "danger" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800"}`}>
                      Due: {d.dueDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BIS Standard Search Box */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
              Check a Standard (BIS Bureau of Indian Standards)
            </span>
            <form onSubmit={handleBisSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={bisSearchQuery}
                  onChange={(e) => setBisSearchQuery(e.target.value)}
                  placeholder="e.g. IS 2062 (Steel), IS 1165 (Milk Powder)"
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium bg-slate-50"
                />
              </div>
              <Button
                type="submit"
                className="bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-bold rounded-xl px-3 cursor-pointer shadow-xs"
              >
                Search <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </form>
            <p className="text-[10.5px] text-slate-400">
              Official linkout to Bureau of Indian Standards (BIS) Know Your Standard repository.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
