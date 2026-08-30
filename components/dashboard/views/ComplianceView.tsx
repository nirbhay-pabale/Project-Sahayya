"use client";

import React from "react";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

interface ComplianceViewProps {
  onStartAudit: () => void;
}

export default function ComplianceView({ onStartAudit }: ComplianceViewProps) {
  const { t } = useLanguage();

  const filings = [
    {
      id: "1",
      title: t.views.compliance.statutoryItems[0]?.title || "GSTR-1 (Outward Supplies)",
      period: "May 2025",
      dueDate: t.views.compliance.statutoryItems[0]?.dueDate || "11 Jun 2025",
      status: t.cards.safety.actionLabel,
      portal: "GST Portal",
    },
    {
      id: "2",
      title: "GSTR-3B (Monthly Summary)",
      period: "May 2025",
      dueDate: "20 Jun 2025",
      status: t.common.pending,
      portal: "GST Portal",
    },
    {
      id: "3",
      title: t.views.compliance.statutoryItems[1]?.title || "State Factory License Renewal",
      period: "FY 2025-26",
      dueDate: t.views.compliance.statutoryItems[1]?.dueDate || "22 Jun 2025",
      status: t.views.compliance.statutoryItems[1]?.status || "Action Required",
      portal: "State Labour Dept.",
    },
    {
      id: "4",
      title: t.views.compliance.statutoryItems[3]?.title || "EPFO & ESIC Worker Contribution",
      period: "May 2025",
      dueDate: t.views.compliance.statutoryItems[3]?.dueDate || "15 Jun 2025",
      status: t.cards.safety.passLabel,
      portal: "Shram Suvidha",
    },
  ];

  return (
    <div className="flex-1 p-6 sm:p-8 space-y-6 max-w-[1020px] mx-auto w-full text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-text-slate-900 tracking-tight">
            {t.views.compliance.title}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.views.compliance.subtitle}
          </p>
        </div>
        <Button
          onClick={onStartAudit}
          className="bg-[#14532D] hover:bg-[#0F3D2E] text-white rounded-xl py-2.5 px-4 font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>{t.views.compliance.startAuditBtn}</span>
        </Button>
      </div>

      {/* Top Health Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-extrabold text-base">
            92%
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">{t.views.compliance.healthScoreTitle}</h4>
            <p className="font-extrabold text-base text-text-slate-900">{t.views.compliance.standingLabel}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-extrabold text-base">
            2
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">{t.dashboard.aside.alertsTitle}</h4>
            <p className="font-extrabold text-base text-text-slate-900">Due in &lt;15 Days</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-extrabold text-base">
            0
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">{t.views.compliance.statutoryItems[2]?.title}</h4>
            <p className="font-extrabold text-base text-text-slate-900">{t.views.compliance.statutoryItems[2]?.status}</p>
          </div>
        </div>
      </div>

      {/* Statutory Filing Calendar List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-slate-600" />
            <h3 className="font-bold text-base text-text-slate-900">{t.views.compliance.title}</h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">Q1 FY 2025-26</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filings.map((f) => (
            <div key={f.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    f.status === t.cards.safety.passLabel || f.status === "Compliant" || f.status === "Valid" || f.status === "Cleared"
                      ? "bg-emerald-100 text-emerald-800"
                      : f.status === t.cards.safety.actionLabel || f.status === "Action Required"
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {f.status === t.cards.safety.passLabel || f.status === "Compliant" || f.status === "Valid" || f.status === "Cleared" ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <AlertTriangle className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-text-slate-900">{f.title}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                    <span>Period: {f.period}</span>
                    <span>•</span>
                    <span>Portal: {f.portal}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">DUE DATE</span>
                  <span className="text-xs font-bold text-text-slate-900">{f.dueDate}</span>
                </div>
                <Button
                  onClick={onStartAudit}
                  size="sm"
                  className="bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 text-slate-700 text-xs font-bold rounded-xl py-1.5 px-3 cursor-pointer shadow-2xs"
                >
                  <span>{t.views.compliance.startAuditBtn}</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
