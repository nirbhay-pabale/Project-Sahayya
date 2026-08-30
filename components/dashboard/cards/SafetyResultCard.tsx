"use client";

import React, { useState } from "react";
import { SafetyResult } from "@/lib/analyzers/safety";
import { CheckCircle2, AlertTriangle, ArrowRight, Sparkles, RotateCcw, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/lib/language-context";

interface SafetyResultCardProps {
  result: SafetyResult;
  onOpenUpgrade?: () => void;
  onRerunSafety?: () => void;
}

export default function SafetyResultCard({ result, onOpenUpgrade, onRerunSafety }: SafetyResultCardProps) {
  const { t } = useLanguage();
  const [tipsModalOpen, setTipsModalOpen] = useState(false);

  const getBadgeColor = (badge: SafetyResult["statusBadge"]) => {
    if (badge === "High Safety Compliance") return "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (badge === "Moderate Risk") return "bg-amber-100 text-amber-800 border-amber-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const allSafetyTips = [
    {
      category: "1. Personal Protective Equipment (PPE)",
      standard: "Factories Act 1948 Sec 41",
      tips: [
        "Mandatory EN397/IS 2925 certified hard hats in overhead crane & loading zones.",
        "Chemical-resistant nitrile gloves and antistatic steel-toe boots for metal/chemical workers.",
        "Earplugs/earmuffs for operators working near decibel levels exceeding 85 dBA.",
      ],
    },
    {
      category: "2. Floor Markings & Zone Demarcation",
      standard: "IS 9457 Safety Colors & Signs",
      tips: [
        "Yellow high-visibility 10cm stripes for forklift and material handling aisles.",
        "Red cross-hatch marking around fire extinguishers and electrical panels (keep 1m clearance).",
        "Strict restricted entry badges for high-temperature furnace and boiler rooms.",
      ],
    },
    {
      category: "3. Machine Safety Guards & Interlocks",
      standard: "IS 2102 / Machinery Directives",
      tips: [
        "Ensure all belt pulleys, gears, and rotating spindles have fixed mesh guards.",
        "Install dual-hand safety switches on hydraulic presses to prevent pinch accidents.",
        "Conduct monthly Emergency Stop (E-Stop) trip audits.",
      ],
    },
    {
      category: "4. Shift Density & Crowd Safety",
      standard: "National Building Code Part 4 (Life Safety)",
      tips: [
        "Maintain minimum 2 square meters floor area per working employee.",
        "Ensure all emergency exit doors open outward and remain unlocked during active shifts.",
        "Conduct biannual fire evacuation drills with local fire station personnel.",
      ],
    },
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-md p-4 sm:p-5 space-y-4 text-left my-2">
      {/* Header with Score & Status Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center font-extrabold text-sm shadow-xs">
            {result.overallScore}%
          </div>
          <div>
            <h4 className="font-bold text-sm text-text-slate-900 leading-tight">
              {t.cards.safety.title}
            </h4>
            <p className="text-[11px] text-slate-500 font-medium">
              {t.cards.safety.subtitle}
            </p>
          </div>
        </div>

        <span
          className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${getBadgeColor(
            result.statusBadge
          )}`}
        >
          {result.statusBadge}
        </span>
      </div>

      {/* 4 Category Rows */}
      <div className="space-y-2.5">
        {result.categoryBreakdown.map((row, idx) => (
          <div
            key={idx}
            className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-start gap-2.5"
          >
            {row.passed ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-text-slate-900">{row.category}</span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    row.passed ? "text-emerald-700" : "text-amber-700"
                  }`}
                >
                  {row.passed ? t.cards.safety.passLabel : t.cards.safety.actionLabel}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{row.tip}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons: Re-run & Safety Library */}
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={() => {
            if (onRerunSafety) onRerunSafety();
          }}
          className="flex-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t.cards.safety.rerunBtn}</span>
        </button>
        <button
          type="button"
          onClick={() => setTipsModalOpen(true)}
          className="flex-1 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{t.cards.safety.tipsLibraryBtn}</span>
        </button>
      </div>

      {/* Summary note & upgrade prompt */}
      <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-[11.5px] text-slate-700 leading-relaxed space-y-2">
        <p className="font-medium">{result.upgradeNote}</p>
        <Button
          onClick={onOpenUpgrade}
          size="sm"
          className="w-full bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-bold rounded-xl py-2 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.cards.safety.upgradePrompt}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Safety Library Modal */}
      <Dialog open={tipsModalOpen} onOpenChange={setTipsModalOpen}>
        <DialogContent className="bg-white p-6 sm:p-8 rounded-3xl max-w-[540px] text-left max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base font-extrabold text-text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-700" />
              <span>{t.cards.safety.modalTitle}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            {allSafetyTips.map((sec, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-xs sm:text-sm text-text-slate-900">{sec.category}</h5>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {sec.standard}
                  </span>
                </div>
                <ul className="space-y-1 text-xs text-slate-600 pl-4 list-disc">
                  {sec.tips.map((tip, tIdx) => (
                    <li key={tIdx} className="leading-relaxed">{tip}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
