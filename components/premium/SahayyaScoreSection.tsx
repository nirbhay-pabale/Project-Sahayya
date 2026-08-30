"use client";

import React from "react";
import { motion } from "framer-motion";
import { useModuleResults } from "@/lib/context/ModuleResultsContext";
import { computeSahayyaScore } from "@/lib/score/computeSahayyaScore";
import {
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Award,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

export default function SahayyaScoreSection() {
  const { store } = useModuleResults();
  const computed = computeSahayyaScore(store);

  return (
    <section id="section-score" className="scroll-mt-24 w-full space-y-6 text-left">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-100 text-[#14532D]">
              <Award className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
              Section 12 • Executive Overview
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-slate-900 tracking-tight mt-1">
            Sahayya Score &amp; Enterprise Health
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time composite health rating derived across all 6 core manufacturing pillars.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold self-start sm:self-auto shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Status: {computed.ratingTier}</span>
        </div>
      </div>

      {/* Main Score Hero Card with 6 Pillars */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-[#F9FCF9] to-emerald-50/40 border border-slate-200/90 shadow-md space-y-6">
        
        {/* Top Hero: Large Gauge + Summary Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Large Circular / Numeric Score Callout */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-emerald-100 shadow-sm text-center space-y-2">
            <div className="relative flex items-center justify-center w-36 h-36 rounded-full bg-gradient-to-br from-emerald-50 to-[#DCFCE7] border-4 border-[#14532D] shadow-inner">
              <div className="flex flex-col items-center">
                <span className="text-4xl sm:text-5xl font-black text-[#14532D] tracking-tight">
                  {computed.overallScore}
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">
                  / 100 Points
                </span>
              </div>
            </div>

            <span className="text-xs font-bold text-text-slate-900 mt-2">
              Overall Growth &amp; Stability Score
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              Top 8% in Western Maharashtra MSME cluster
            </span>
          </div>

          {/* Quick Pillar Breakdown & Biggest Improvement Area */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
            
            {/* Biggest Improvement Area Alert Box */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-amber-800">
                    Priority Improvement Focus
                  </span>
                  <span className="text-[10.5px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.2 rounded-full">
                    {computed.biggestImprovementArea.name} ({computed.biggestImprovementArea.score}%)
                  </span>
                </div>
                <p className="text-xs font-medium text-amber-950 leading-relaxed">
                  {computed.biggestImprovementArea.actionTip}
                </p>
              </div>
            </div>

            {/* 6 Sub-Score Progress Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {computed.pillars.map((pillar, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200/70 shadow-2xs space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-text-slate-900 truncate pr-2">{pillar.name}</span>
                    <span className="font-extrabold text-[#14532D] shrink-0">{pillar.score}%</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        pillar.score >= 85 ? "bg-emerald-600" : pillar.score >= 70 ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                      style={{ width: `${pillar.score}%` }}
                    />
                  </div>

                  <p className="text-[10.5px] text-slate-500 truncate">{pillar.tip}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
