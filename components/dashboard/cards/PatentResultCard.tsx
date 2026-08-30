"use client";

import React from "react";
import { PatentResult } from "@/lib/analyzers/patent";
import { Sparkles, ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

interface PatentResultCardProps {
  result: PatentResult;
  onOpenUpgrade?: () => void;
}

export default function PatentResultCard({ result, onOpenUpgrade }: PatentResultCardProps) {
  const { t } = useLanguage();
  const stepIcons = ["💡", "🔍", "📝", "📐", "⚖️", "🏆"];

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-md p-4 sm:p-6 space-y-5 text-left my-2">
      
      {/* Header with Free Trial Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center font-bold text-lg">
            💡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-sm sm:text-base text-text-slate-900 leading-tight">
                {t.cards.patent.title}
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                {t.cards.patent.freeTrialBadge}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              {t.cards.patent.subtitle}
            </p>
          </div>
        </div>

        <span
          className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
            result.patentabilityStatus.includes("Caution")
              ? "bg-amber-100 text-amber-800 border-amber-200"
              : "bg-emerald-100 text-emerald-800 border-emerald-200"
          }`}
        >
          {result.patentabilityStatus}
        </span>
      </div>

      {/* 6-Step Visual Stepper Roadmap */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            {t.cards.patent.roadmapTitle}
          </span>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            {t.cards.patent.feeWaiverBadge}
          </span>
        </div>

        <div className="space-y-2.5 relative before:absolute before:left-[17px] before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {result.roadmapSteps.map((step, idx) => (
            <div
              key={step.stepNumber}
              className="relative flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
            >
              {/* Stepper Node */}
              <div className="w-8 h-8 rounded-xl bg-[#14532D] text-white flex items-center justify-center text-xs font-extrabold shrink-0 z-10 shadow-xs">
                {step.stepNumber}
              </div>

              {/* Step Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-xs sm:text-sm text-text-slate-900 flex items-center gap-1.5">
                    <span>{stepIcons[idx] || "📌"}</span>
                    <span>{t.cards.patent.stages[idx]?.title || step.title}</span>
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                    {step.timeline}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed font-normal">
                  {t.cards.patent.stages[idx]?.desc || step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional GI & Trademark Protection Note */}
      <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-slate-700 space-y-1">
        <span className="font-bold text-amber-950 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-700" /> Regional GI &amp; Trademark Protection
        </span>
        <p className="leading-relaxed text-[11.5px] text-amber-900 font-medium">
          {result.giAndTrademarkAdvice}
        </p>
      </div>

      {/* Pro Tier Upgrade Callout */}
      <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-slate-700 leading-relaxed space-y-3">
        <p className="text-[12px] font-medium text-emerald-950">
          {result.upgradeNote}
        </p>
        <Button
          onClick={onOpenUpgrade}
          size="sm"
          className="w-full bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-bold rounded-xl py-2.5 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.cards.patent.upgradePrompt}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

    </div>
  );
}
