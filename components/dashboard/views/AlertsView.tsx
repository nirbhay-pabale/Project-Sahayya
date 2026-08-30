"use client";

import React, { useState } from "react";
import { AlertTriangle, Info, CheckCircle2, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

export interface AlertItemData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  type: "danger" | "warning" | "info";
  dueDate: string;
  actionLabel: string;
  portal: string;
}

interface AlertsViewProps {
  onOpenAlertDetail: (alert: AlertItemData) => void;
}

export default function AlertsView({ onOpenAlertDetail }: AlertsViewProps) {
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState<AlertItemData[]>([
    {
      id: "udyam",
      title: t.phoneMockup.notificationsList[0]?.title || "Udyam Registration Expiring Soon",
      subtitle: t.phoneMockup.notificationsList[0]?.description || "Renew before 15 Jun 2025",
      description: "Your annual MSME classification turnover verification is due on the National Udyam Portal. Failure to update may pause bank interest subvention benefits.",
      type: "danger",
      dueDate: "15 Jun 2025",
      actionLabel: "Renew Udyam Aadhaar",
      portal: "udyamregistration.gov.in",
    },
    {
      id: "license",
      title: "State Factory License Expiry",
      subtitle: "Expires on 22 Jun 2025",
      description: "State Directorate of Industrial Safety & Health (DISH) factory manufacturing permit expires in 22 days. File Form 2 for automated renewal.",
      type: "warning",
      dueDate: "22 Jun 2025",
      actionLabel: "Renew Factory Permit",
      portal: "dish.gov.in",
    },
    {
      id: "gst",
      title: "GST Returns Pending (GSTR-1)",
      subtitle: "File GSTR-1 for May 2025",
      description: "Outward supply invoice reconciliation for May 2025 must be uploaded by 11th of this month to avoid late fee penalty of ₹50/day.",
      type: "info",
      dueDate: "11 Jun 2025",
      actionLabel: "File GSTR-1 Return",
      portal: "gst.gov.in",
    },
  ]);

  const [filter, setFilter] = useState<"all" | "danger" | "warning">("all");

  const handleDismiss = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const filtered = alerts.filter((a) => {
    if (filter === "danger") return a.type === "danger";
    if (filter === "warning") return a.type === "warning" || a.type === "danger";
    return true;
  });

  return (
    <div className="flex-1 p-6 sm:p-8 space-y-6 max-w-[1020px] mx-auto w-full text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-text-slate-900 tracking-tight">
              {t.views.alerts.title}
            </h2>
            <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
              {alerts.length} {t.common.active}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.views.alerts.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              filter === "all" ? "bg-[#14532D] text-white" : "bg-white text-slate-600 border border-slate-200"
            }`}
          >
            {t.views.alerts.filterAll} ({alerts.length})
          </button>
          <button
            onClick={() => setFilter("danger")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              filter === "danger" ? "bg-red-600 text-white" : "bg-white text-slate-600 border border-slate-200"
            }`}
          >
            {t.views.alerts.filterHigh}
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200 space-y-2">
            <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500" />
            <p className="text-sm font-bold text-slate-700">{t.views.alerts.allResolvedTitle}</p>
            <p className="text-xs text-slate-400">{t.views.alerts.allResolvedSub}</p>
          </div>
        ) : (
          filtered.map((alert) => (
            <div
              key={alert.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-start gap-4 min-w-0">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${
                    alert.type === "danger"
                      ? "bg-red-100 text-red-600"
                      : alert.type === "warning"
                      ? "bg-amber-100 text-amber-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {alert.type === "info" ? <Info className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-sm text-text-slate-900 leading-tight">
                      {alert.title}
                    </h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        alert.type === "danger"
                          ? "bg-red-100 text-red-700"
                          : alert.type === "warning"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      Due: {alert.dueDate}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pr-2">
                    {alert.description}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Filing Portal: <span className="text-emerald-700 font-semibold">{alert.portal}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <Button
                  onClick={() => onOpenAlertDetail(alert)}
                  className="bg-[#14532D] hover:bg-[#0F3D2E] text-white rounded-xl py-2 px-4 text-xs font-bold shadow-xs cursor-pointer"
                >
                  <span>{alert.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
                <button
                  type="button"
                  onClick={() => handleDismiss(alert.id)}
                  className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                  title={t.views.alerts.dismissTooltip}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
