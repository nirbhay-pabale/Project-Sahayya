"use client";

import React from "react";
import { AlertTriangle, Info, ChevronRight, ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { AlertItemData } from "./views/AlertsView";

interface AlertsPanelProps {
  alerts?: AlertItemData[];
  onSelectAlert?: (alert: AlertItemData) => void;
  onViewAll?: () => void;
  onResolveAlert?: (id: string) => void;
}

export default function AlertsPanel({ alerts: propAlerts, onSelectAlert, onViewAll, onResolveAlert }: AlertsPanelProps) {
  const { t } = useLanguage();

  const defaultAlerts: AlertItemData[] = [
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
      title: "Factory License Expiry",
      subtitle: "Expires on 22 Jun 2025",
      description: "State Directorate of Industrial Safety & Health (DISH) factory manufacturing permit expires in 22 days. File Form 2 for automated renewal.",
      type: "warning",
      dueDate: "22 Jun 2025",
      actionLabel: "Renew Factory Permit",
      portal: "dish.gov.in",
    },
    {
      id: "gst",
      title: "GST Returns Pending",
      subtitle: "File GSTR-1 for May 2025",
      description: "Outward supply invoice reconciliation for May 2025 must be uploaded by 11th of this month to avoid late fee penalty of ₹50/day.",
      type: "info",
      dueDate: "11 Jun 2025",
      actionLabel: "File GSTR-1 Return",
      portal: "gst.gov.in",
    },
  ];

  const alerts = propAlerts !== undefined ? propAlerts : defaultAlerts;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4 text-left">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-extrabold text-base text-text-slate-900">
            {t.dashboard.aside.alertsTitle}
          </h3>
          <span className="text-[10.5px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
            {alerts.length}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onViewAll && onViewAll()}
          className="text-xs font-semibold text-slate-500 hover:text-brand-green-700 transition-colors cursor-pointer"
        >
          {t.dashboard.aside.viewAll}
        </button>
      </div>

      {/* Alert Rows */}
      <div className="space-y-2">
        {alerts.length === 0 ? (
          <div className="p-4 text-center text-slate-400 bg-slate-50 rounded-xl space-y-1">
            <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-500" />
            <p className="text-xs font-bold text-slate-700">{t.common.allAlertsCleared}</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => onSelectAlert && onSelectAlert(alert)}
              className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200/60 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    alert.type === "danger"
                      ? "bg-red-100 text-red-600"
                      : alert.type === "warning"
                      ? "bg-amber-100 text-amber-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {alert.type === "info" ? (
                    <Info className="w-4 h-4" />
                  ) : (
                    <AlertTriangle className="w-4 h-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-text-slate-900 group-hover:text-brand-green-700 transition-colors truncate">
                    {alert.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    {alert.subtitle}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </div>
          ))
        )}
      </div>

      {/* Footer Link */}
      <div className="pt-1 border-t border-slate-100">
        <button
          type="button"
          onClick={() => onViewAll && onViewAll()}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green-700 hover:text-brand-green-900 transition-colors cursor-pointer"
        >
          <span>{t.dashboard.aside.viewAll} {t.dashboard.aside.alertsTitle}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
