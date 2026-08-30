"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Download, Globe, Users, Calculator, CheckCircle2, Lock } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";

interface MoreToolsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigateTab?: (tabId: string) => void;
}

export default function MoreToolsModal({ open, onOpenChange, onNavigateTab }: MoreToolsModalProps) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExportData = () => {
    const exportData = {
      enterpriseName: user?.businessName || "Registered Enterprise",
      signatory: user?.fullName || "Enterprise Owner",
      identifier: user?.identifier || "N/A",
      plan: user?.plan || "free",
      exportDate: new Date().toISOString(),
      complianceHealth: "92% (Good Standing)",
      activeSchemes: ["PMEGP", "PMFME", "CGTMSE", "PM Surya Ghar Solar"],
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sahayya_msme_profile_${Date.now()}.json`;
    a.click();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white p-6 sm:p-8 rounded-3xl max-w-[540px] text-left">
        <DialogHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#14532D] flex items-center justify-center font-bold">
              🛠️
            </div>
            <DialogTitle className="text-xl font-extrabold text-text-slate-900">
              {t.modals.moreTools.title}
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-slate-500">
            {t.modals.moreTools.subtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-3">
          {/* Action 1: Export Data */}
          <div
            onClick={handleExportData}
            className="p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all flex items-center justify-between gap-3 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-xs sm:text-sm text-text-slate-900 group-hover:text-emerald-900 transition-colors">
                  {t.modals.moreTools.exportTitle}
                </h5>
                <p className="text-[11px] text-slate-500">
                  {t.modals.moreTools.exportDesc}
                </p>
              </div>
            </div>
            {downloadSuccess ? (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Exported!
              </span>
            ) : (
              <span className="text-xs font-bold text-slate-400 group-hover:text-emerald-700 transition-colors">
                Export →
              </span>
            )}
          </div>

          {/* Action 2: Change Platform Language */}
          <div
            onClick={() => {
              if (onNavigateTab) onNavigateTab("settings");
              onOpenChange(false);
            }}
            className="p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all flex items-center justify-between gap-3 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-xs sm:text-sm text-text-slate-900 group-hover:text-emerald-900 transition-colors">
                  {t.modals.moreTools.langTitle}
                </h5>
                <p className="text-[11px] text-slate-500">
                  {t.modals.moreTools.langDesc}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-400 group-hover:text-emerald-700 transition-colors">
              Configure →
            </span>
          </div>

          {/* Pro Action 3: Multi-user access */}
          <div className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/80 flex items-center justify-between gap-3 opacity-80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h5 className="font-bold text-xs sm:text-sm text-text-slate-900">
                    {t.modals.moreTools.teamTitle}
                  </h5>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                    {t.modals.moreTools.comingSoonBadge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {t.modals.moreTools.teamDesc}
                </p>
              </div>
            </div>
            <Lock className="w-4 h-4 text-slate-400 shrink-0" />
          </div>

          {/* Pro Action 4: Automated GST Challan */}
          <div className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/80 flex items-center justify-between gap-3 opacity-80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center shrink-0">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h5 className="font-bold text-xs sm:text-sm text-text-slate-900">
                    {t.modals.moreTools.gstTitle}
                  </h5>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                    {t.modals.moreTools.comingSoonBadge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {t.modals.moreTools.gstDesc}
                </p>
              </div>
            </div>
            <Lock className="w-4 h-4 text-slate-400 shrink-0" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
