"use client";

import React from "react";
import { CreditReadinessResult } from "@/lib/analyzers/credit";
import { CheckCircle2, AlertCircle, Sparkles, ArrowRight, Landmark, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

interface CreditResultCardProps {
  result: CreditReadinessResult;
  onOpenUpgrade?: () => void;
}

export default function CreditResultCard({ result, onOpenUpgrade }: CreditResultCardProps) {
  const { t } = useLanguage();

  const getBadgeStyle = (badge: CreditReadinessResult["badge"]) => {
    if (badge === "Good") return "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (badge === "Fair") return "bg-amber-100 text-amber-800 border-amber-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-md p-4 sm:p-5 space-y-4 text-left my-2">
      
      {/* Header with Score & Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#064E3B] text-white flex flex-col items-center justify-center font-extrabold shadow-sm">
            <span className="text-base leading-none">{result.overallScore}</span>
            <span className="text-[9px] text-emerald-200 uppercase font-semibold">Score</span>
          </div>
          <div>
            <h4 className="font-bold text-sm text-text-slate-900 leading-tight">
              {t.cards.credit.title}
            </h4>
            <p className="text-[11px] text-slate-500 font-medium">
              {t.cards.credit.subtitle}
            </p>
          </div>
        </div>

        <span
          className={`text-xs font-bold px-3 py-1 rounded-full border ${getBadgeStyle(
            result.badge
          )}`}
        >
          {result.badge} Standing
        </span>
      </div>

      {/* Business Profile Synthesis Line */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-medium text-slate-800 leading-relaxed">
        <span className="font-bold text-emerald-900">{t.cards.credit.profileSummaryLabel}: </span>
        {result.profileSummary}
      </div>

      {/* Score Factors Breakdown */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          {t.cards.credit.factorsLabel}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {result.scoreBreakdown.map((item, idx) => (
            <div
              key={idx}
              className="p-2 rounded-lg bg-slate-50/70 border border-slate-100 flex items-center justify-between text-[11px]"
            >
              <div className="flex items-center gap-1.5 min-w-0 pr-2">
                {item.status === "positive" ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : item.status === "negative" ? (
                  <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full bg-slate-300 shrink-0 inline-block" />
                )}
                <span className="font-medium text-slate-700 truncate">{item.label}</span>
              </div>
              <span className="font-bold text-slate-900 shrink-0">+{item.points} pts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Distinct Separator: Schemes You May Be Eligible For */}
      <div className="pt-2 border-t border-slate-100 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Landmark className="w-4 h-4 text-emerald-800" />
            {t.cards.credit.schemesTitle}
          </span>
          <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            {result.matchedSchemes.length} {t.cards.credit.matchedBadge}
          </span>
        </div>

        <div className="space-y-2">
          {result.matchedSchemes.map((scheme, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl border border-emerald-200/80 bg-emerald-50/50 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <h5 className="font-bold text-xs sm:text-sm text-emerald-950">{scheme.name}</h5>
                <span className="text-[10px] font-extrabold text-emerald-900 bg-emerald-100/90 px-2.5 py-0.5 rounded-full shrink-0">
                  {scheme.maxAmount}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{scheme.description}</p>
              <div className="text-[11px] font-semibold text-emerald-800">
                {t.cards.credit.benefitCoverageLabel}: {scheme.subsidyRate}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actionable Advice if score needs improvement */}
      {result.overallScore <= 60 && (
        <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
          <span className="font-bold flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" /> {t.cards.credit.improvementPriorityLabel}:
          </span>
          <p className="text-[11.5px] leading-relaxed">
            {result.actionableSteps[0]}
          </p>
        </div>
      )}

      {/* Upgrade Callout */}
      <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-slate-700 leading-relaxed space-y-2.5">
        <p className="font-medium text-emerald-950">{result.upgradeNote}</p>
        <Button
          onClick={onOpenUpgrade}
          size="sm"
          className="w-full bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-bold rounded-xl py-2 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.cards.credit.upgradePrompt}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

    </div>
  );
}
