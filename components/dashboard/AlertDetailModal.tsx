"use client";

import React, { useState } from "react";
import { AlertItemData } from "./views/AlertsView";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, CheckCircle2, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface AlertDetailModalProps {
  alert: AlertItemData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onResolved?: (alertId: string) => void;
}

export default function AlertDetailModal({ alert, open, onOpenChange, onResolved }: AlertDetailModalProps) {
  const { t } = useLanguage();
  const [resolving, setResolving] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!alert) return null;

  const handleAction = () => {
    setResolving(true);
    setTimeout(() => {
      setResolving(false);
      setIsDone(true);
      setTimeout(() => {
        setIsDone(false);
        if (onResolved) onResolved(alert.id);
        onOpenChange(false);
      }, 1200);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white p-6 sm:p-8 rounded-3xl max-w-[480px] text-left">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
                alert.type === "danger"
                  ? "bg-red-100 text-red-600"
                  : alert.type === "warning"
                  ? "bg-amber-100 text-amber-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {alert.type === "info" ? <Info className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            </div>
            <div>
              <DialogTitle className="text-base font-extrabold text-text-slate-900 leading-tight">
                {alert.title}
              </DialogTitle>
              <span className="text-[11px] font-bold text-red-600">Due: {alert.dueDate}</span>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-3 text-xs text-slate-600 leading-relaxed">
          <p className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 font-medium">
            {alert.description}
          </p>

          <div className="space-y-2">
            <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block">
              {t.modals.alertDetail.filingPortalLabel}
            </span>
            <div className="flex items-center justify-between p-3 rounded-xl border border-emerald-100 bg-emerald-50/50">
              <span className="font-bold text-emerald-900">{alert.portal}</span>
              <a
                href={`https://${alert.portal}`}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
              >
                <span>Visit Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            {t.modals.alertDetail.closeBtn}
          </button>
          <Button
            onClick={handleAction}
            disabled={resolving || isDone}
            className="bg-[#14532D] hover:bg-[#0F3D2E] text-white rounded-xl py-2.5 px-5 text-xs font-bold shadow-xs cursor-pointer"
          >
            {isDone ? (
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> {t.modals.alertDetail.resolvedConfirmation}
              </span>
            ) : resolving ? (
              "Routing to Portal..."
            ) : (
              alert.actionLabel
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
