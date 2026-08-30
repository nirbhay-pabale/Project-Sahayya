"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLanguage, LANGUAGE_OPTIONS } from "@/lib/language-context";
import { Settings, Bell, Globe, Shield, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsView() {
  const { user } = useAuth();
  const { language, setLanguage } = useLanguage();

  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex-1 p-6 sm:p-8 space-y-6 max-w-[880px] mx-auto w-full text-left">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-text-slate-900 tracking-tight">
          Platform Settings &amp; Preferences
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure notification channels, statutory alerts, and regional language preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Language Selection */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-text-slate-900 leading-tight">
                Interface Language / भाषा निवडा
              </h4>
              <p className="text-xs text-slate-500">
                Choose your preferred language for site text, chatbot guidance and dashboard tools.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {LANGUAGE_OPTIONS.map((opt) => (
              <button
                key={opt.code}
                type="button"
                onClick={() => setLanguage(opt.code)}
                className={`p-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-2.5 ${
                  language === opt.code
                    ? "border-emerald-600 bg-emerald-50/70 text-emerald-900 shadow-xs"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="text-lg">{opt.flag}</span>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-extrabold">{opt.nativeName}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{opt.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-text-slate-900 leading-tight">
                Statutory Due Date Notifications
              </h4>
              <p className="text-xs text-slate-500">
                Receive automated reminders before GST filing and license expiry dates.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100 space-y-3 pt-1">
            <label className="flex items-center justify-between pt-3 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-text-slate-900 block">WhatsApp Instant Alerts</span>
                <span className="text-[11px] text-slate-500">Receive 3-day reminders on +91 {user?.identifier || "98765 43210"}</span>
              </div>
              <input
                type="checkbox"
                checked={whatsappAlerts}
                onChange={(e) => setWhatsappAlerts(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded cursor-pointer accent-[#14532D]"
              />
            </label>

            <label className="flex items-center justify-between pt-3 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-text-slate-900 block">SMS Critical Reminders</span>
                <span className="text-[11px] text-slate-500">Emergency 24-hour statutory expiry alerts via SMS</span>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded cursor-pointer accent-[#14532D]"
              />
            </label>

            <label className="flex items-center justify-between pt-3 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-text-slate-900 block">Weekly MSME Subsidy Digest</span>
                <span className="text-[11px] text-slate-500">Curated weekly list of new government grants for your sector</span>
              </div>
              <input
                type="checkbox"
                checked={emailDigest}
                onChange={(e) => setEmailDigest(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded cursor-pointer accent-[#14532D]"
              />
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
              <CheckCircle2 className="w-4 h-4" /> Preferences saved successfully!
            </span>
          ) : (
            <span className="text-xs text-slate-400">Changes apply immediately across your dashboard session.</span>
          )}

          <Button
            type="submit"
            className="bg-[#14532D] hover:bg-[#0F3D2E] text-white rounded-xl py-2.5 px-6 font-bold text-xs shadow-xs cursor-pointer"
          >
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}
