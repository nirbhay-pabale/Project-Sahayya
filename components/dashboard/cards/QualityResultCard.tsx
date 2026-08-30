"use client";

import React from "react";
import { QualityResult } from "@/lib/analyzers/quality";
import { CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, ArrowRight, Award, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

interface QualityResultCardProps {
  result: QualityResult;
  onOpenUpgrade?: () => void;
}

export default function QualityResultCard({ result, onOpenUpgrade }: QualityResultCardProps) {
  const { t } = useLanguage();

  const getGradeStyle = (grade: QualityResult["qualityGrade"]) => {
    if (grade.includes("Grade A")) return "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (grade.includes("Grade B")) return "bg-blue-100 text-blue-800 border-blue-200";
    return "bg-amber-100 text-amber-800 border-amber-200";
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-md p-4 sm:p-5 space-y-4 text-left my-2">
      
      {/* Uploaded Image Thumbnail Preview at Top */}
      {result.uploadedImageUrl && (
        <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
          <img
            src={result.uploadedImageUrl}
            alt="Uploaded product sample"
            className="w-full h-full object-contain"
          />
          <div className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
            <ImageIcon className="w-3 h-3" /> Inspected Sample Image
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-text-slate-900 leading-tight">
              {t.cards.quality.title}
            </h4>
            <p className="text-[11px] text-slate-500 font-medium">
              {t.cards.quality.subtitle}
            </p>
          </div>
        </div>

        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${getGradeStyle(result.qualityGrade)}`}>
          {result.qualityGrade}
        </span>
      </div>

      {/* 3-Point Checklist */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          {t.cards.quality.checklistTitle}
        </span>
        <div className="space-y-2">
          {result.inspectionChecklist.map((item, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5"
            >
              {item.passed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-text-slate-900">{item.name}</span>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-full">
                    {item.standard}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{item.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ZED Certification & Concessions */}
      <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-[11.5px] text-slate-800 space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-bold text-emerald-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" /> {t.cards.quality.zedGrantBadge}
          </span>
          <span className="text-[10.5px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
            {result.zedSubsidyPercent}% Reimbursement
          </span>
        </div>
        <p className="text-slate-600 leading-snug">
          Eligible for <strong>{result.zedCertificationLevel}</strong> ZED rating with 0.5% bank loan interest rebate.
        </p>
      </div>

      {/* Upgrade Callout */}
      <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-slate-700 leading-relaxed space-y-2.5">
        <p className="font-medium text-emerald-950">{result.upgradeNote}</p>
        <Button
          onClick={onOpenUpgrade}
          size="sm"
          className="w-full bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-bold rounded-xl py-2 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.cards.quality.upgradePrompt}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

    </div>
  );
}
