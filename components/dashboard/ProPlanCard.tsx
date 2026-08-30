"use client";

import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

interface ProPlanCardProps {
  onOpenUpgrade?: () => void;
}

export default function ProPlanCard({ onOpenUpgrade }: ProPlanCardProps) {
  const { t } = useLanguage();

  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
      {/* Header */}
      <div>
        <h3 className="font-extrabold text-base text-[#14532D]">
          {t.common.proPlan}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          {t.dashboard.aside.proCard.description}
        </p>
      </div>

      {/* 5-item Checklist */}
      <div className="space-y-2.5">
        {t.modals.proModal.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
            <span className="text-xs text-slate-700 leading-snug font-medium">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Upgrade Plan Button */}
      <Button
        onClick={onOpenUpgrade}
        className="w-full bg-[#14532D] hover:bg-[#0F3D2E] text-white rounded-xl py-3 h-auto text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2"
      >
        <span>{t.dashboard.sidebar.upgradeCard.button}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}
