"use client";

import React, { useState } from "react";
import {
  Menu,
  Bell,
  ArrowUpRight,
  Home,
  Activity,
  LineChart as LineChartIcon,
  CreditCard,
  MoreHorizontal,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import {
  growthSparkline,
  complianceSparkline,
  schemesSparkline,
  demandMiniSparkline,
} from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/lib/language-context";
import Image from "next/image";

interface PhoneMockupProps {
  onOpenSchemes: () => void;
}

export default function PhoneMockup({ onOpenSchemes }: PhoneMockupProps) {
  const [activeTab, setActiveTab] = useState<"home" | "monitor" | "forecast" | "credit" | "more">("home");
  const { t } = useLanguage();

  return (
    <div className="relative mx-auto flex items-center justify-center select-none">
      
      {/* 1. Realistic Human Hand (Positioned behind phone bezel, in front of background photo) */}
      <div className="absolute -left-[64px] -right-[64px] -bottom-[42px] top-[12%] z-10 pointer-events-none flex items-center justify-center">
        <div className="relative w-[390px] sm:w-[420px] h-[580px] sm:h-[620px]">
          <Image
            src="/images/hand_holding_phone_transparent.png"
            alt="Human hand holding phone"
            fill
            sizes="(max-width: 640px) 390px, 420px"
            className="object-contain object-bottom drop-shadow-[0_25px_40px_rgba(0,0,0,0.45)]"
            priority
          />
        </div>
      </div>

      {/* 2. Realistic Phone Chassis (Sits in front of the hand) */}
      <div className="relative z-20 w-[295px] sm:w-[325px] h-[610px] sm:h-[640px] bg-slate-950 rounded-[44px] p-[9px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-slate-800/80 border-[3.5px] border-slate-900 flex flex-col">
        
        {/* Minimal Black Notch on Phone Bezel */}
        <div className="w-[78px] h-[16px] bg-slate-950 rounded-full mx-auto my-1 shrink-0" />

        {/* Left Side Buttons (Volume) */}
        <div className="absolute -left-[6px] top-[115px] w-[3px] h-[28px] bg-slate-700 rounded-l-sm" />
        <div className="absolute -left-[6px] top-[155px] w-[3px] h-[36px] bg-slate-700 rounded-l-sm" />
        <div className="absolute -left-[6px] top-[200px] w-[3px] h-[36px] bg-slate-700 rounded-l-sm" />

        {/* Right Side Button (Power) */}
        <div className="absolute -right-[6px] top-[140px] w-[3px] h-[48px] bg-slate-700 rounded-r-sm" />

        {/* Phone Screen Container */}
        <div className="relative w-full flex-1 bg-slate-50 rounded-[34px] overflow-hidden flex flex-col justify-between border border-slate-200/60 shadow-inner">
          
          {/* Top Bar: Hamburger, Title + Subtitle, Plain Bell with Dropdown */}
          <div className="pt-3.5 px-4 pb-2.5 bg-white border-b border-slate-100 flex items-center justify-between z-20 shrink-0">
            <button
              type="button"
              className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-800 transition-colors"
              aria-label="App menu"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="text-center">
              <h4 className="text-[14.5px] font-bold text-text-slate-900 leading-tight">
                {t.phoneMockup.dashboard}
              </h4>
              <p className="text-[10.5px] text-text-slate-600 font-medium">
                {t.phoneMockup.welcomeBack}
              </p>
            </div>

            {/* Notification Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className="relative w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-800 transition-colors cursor-pointer outline-none"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 text-slate-700 stroke-[1.8]" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[260px] bg-white p-2 rounded-xl shadow-xl border border-slate-100 text-xs"
              >
                <div className="flex items-center justify-between px-2 py-1.5">
                  <span className="font-bold text-text-slate-900">{t.phoneMockup.notifications}</span>
                </div>
                <DropdownMenuSeparator className="bg-slate-100" />
                <div className="max-h-[190px] overflow-y-auto space-y-1 py-1">
                  {t.phoneMockup.notificationsList.map((n, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-semibold text-text-slate-900 leading-tight">
                          {n.title}
                        </span>
                        <span className="text-[9px] text-slate-400 shrink-0">{n.time}</span>
                      </div>
                      <p className="text-[10.5px] text-text-slate-600 mt-0.5 leading-tight">
                        {n.description}
                      </p>
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Phone Screen Scrollable Main Content */}
          <div className="flex-1 overflow-y-auto px-3 py-2.5 space-y-2.5 scrollbar-none">
            <AnimatePresence mode="wait">
              {activeTab === "home" && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2.5"
                >
                  {/* Card 1: Green filled "Overall Growth Score" */}
                  <div className="bg-brand-green-700 text-white rounded-xl p-3 shadow-md relative overflow-hidden">
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-[11px] font-medium text-emerald-100">
                        {t.phoneMockup.growthScore}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-emerald-200" />
                    </div>

                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className="text-[26px] font-black tracking-tight leading-none">
                        72
                      </span>
                      <span className="text-[12px] font-semibold text-emerald-200">
                        /100
                      </span>
                      <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-white text-[9.5px] font-bold">
                        {t.phoneMockup.good}
                      </span>
                    </div>

                    {/* Sparkline */}
                    <div className="h-[28px] w-full my-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={growthSparkline}>
                          <Line
                            type="monotone"
                            dataKey="val"
                            stroke="#FFFFFF"
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="text-[10px] font-medium text-emerald-100 flex items-center gap-1">
                      <span>{t.phoneMockup.growthVsLastMonth}</span>
                    </div>
                  </div>

                  {/* Card 2: Compliance Score (White, Bordered) */}
                  <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-semibold text-text-slate-600">
                        {t.phoneMockup.complianceScore}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-brand-green-100 text-brand-green-700 text-[9.5px] font-bold">
                        {t.phoneMockup.compliant}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[20px] font-black text-text-slate-900 leading-none">
                        85%
                      </span>
                      <div className="w-[100px] h-[22px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={complianceSparkline}>
                            <Line
                              type="monotone"
                              dataKey="val"
                              stroke="#16A34A"
                              strokeWidth={2}
                              dot={{ r: 1.5, fill: "#16A34A" }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="text-[9.5px] font-semibold text-brand-green-700 mt-1">
                      {t.phoneMockup.complianceVsLastMonth}
                    </div>
                  </div>

                  {/* Card 3: Active Schemes */}
                  <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-semibold text-text-slate-600">
                        {t.phoneMockup.activeSchemes}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-brand-green-100 text-brand-green-700 text-[9.5px] font-bold">
                        {t.phoneMockup.applicable}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[20px] font-black text-text-slate-900 leading-none">
                        5
                      </span>
                      <div className="w-[100px] h-[22px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={schemesSparkline}>
                            <Line
                              type="monotone"
                              dataKey="val"
                              stroke="#16A34A"
                              strokeWidth={2}
                              dot={{ r: 1.5, fill: "#16A34A" }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={onOpenSchemes}
                      className="text-[10.5px] font-bold text-brand-green-700 hover:text-brand-green-900 hover:underline flex items-center gap-1 mt-1 cursor-pointer"
                    >
                      {t.phoneMockup.viewAllSchemes}
                    </button>
                  </div>

                  {/* Card 4: Demand Forecast (Next Month) */}
                  <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-sm">
                    <span className="text-[11px] font-semibold text-text-slate-600 block mb-1">
                      {t.phoneMockup.demandForecastTitle}
                    </span>

                    <div className="flex items-center justify-between">
                      <div className="text-[13px] font-extrabold text-text-slate-900">
                        ↑ 15% <span className="text-[10px] font-semibold text-slate-500">{t.phoneMockup.localMarket}</span>
                      </div>
                      <div className="w-[90px] h-[22px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={demandMiniSparkline}>
                            <Line
                              type="monotone"
                              dataKey="val"
                              stroke="#16A34A"
                              strokeWidth={2}
                              dot={{ r: 1.5, fill: "#16A34A" }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Monitor Tab */}
              {activeTab === "monitor" && (
                <motion.div
                  key="monitor"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2.5"
                >
                  <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-text-slate-900">
                        {t.phoneMockup.monitor.telemetryTitle}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center pt-1">
                      <div className="p-2 rounded-lg bg-slate-50">
                        <span className="text-[9px] text-slate-500 block">{t.phoneMockup.monitor.efficiency}</span>
                        <span className="text-sm font-extrabold text-brand-green-900">92.4%</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50">
                        <span className="text-[9px] text-slate-500 block">{t.phoneMockup.monitor.passRate}</span>
                        <span className="text-sm font-extrabold text-brand-green-900">98.8%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm space-y-1.5">
                    <span className="text-[11px] font-bold text-text-slate-900 block">
                      {t.phoneMockup.monitor.qualityAudits}
                    </span>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-600">{t.phoneMockup.monitor.zedBronze}</span>
                      <span className="text-brand-green-700 font-bold">{t.phoneMockup.monitor.passed}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-600">{t.phoneMockup.monitor.isoReadiness}</span>
                      <span className="text-amber-600 font-bold">{t.phoneMockup.monitor.inReview}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Forecast Tab */}
              {activeTab === "forecast" && (
                <motion.div
                  key="forecast"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2.5"
                >
                  <div className="bg-brand-green-700 text-white rounded-xl p-3 shadow-md space-y-1">
                    <span className="text-[10px] text-emerald-200 uppercase font-bold tracking-wide">
                      {t.phoneMockup.forecast.insightBadge}
                    </span>
                    <h5 className="text-[13px] font-bold leading-tight">
                      {t.phoneMockup.forecast.insightHeadline}
                    </h5>
                    <p className="text-[10px] text-emerald-100">
                      {t.phoneMockup.forecast.insightTip}
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm space-y-2">
                    <span className="text-[11px] font-bold text-text-slate-900 block">
                      {t.phoneMockup.forecast.rawMaterialIndex}
                    </span>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">{t.phoneMockup.forecast.cottonJute}</span>
                      <span className="font-semibold text-emerald-600">{t.phoneMockup.forecast.favorable}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Credit Tab */}
              {activeTab === "credit" && (
                <motion.div
                  key="credit"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2.5"
                >
                  <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm space-y-2">
                    <span className="text-[11px] font-bold text-text-slate-900 block">
                      {t.phoneMockup.credit.title}
                    </span>
                    <div className="text-2xl font-black text-brand-green-900">
                      810 <span className="text-xs font-medium text-slate-500">/ 1000</span>
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-brand-green-100 text-brand-green-700 text-[10px] font-bold">
                      {t.phoneMockup.credit.preApproved}
                    </span>
                    <p className="text-[10px] text-slate-600">
                      {t.phoneMockup.credit.bankEligibility}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* More Tab */}
              {activeTab === "more" && (
                <motion.div
                  key="more"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm space-y-2 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-slate-600">{t.phoneMockup.more.udyamReg}</span>
                      <span className="font-semibold text-emerald-600">{t.phoneMockup.more.verified}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-slate-600">{t.phoneMockup.more.gstinAuto}</span>
                      <span className="font-semibold text-emerald-600">{t.phoneMockup.more.active}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-600">{t.phoneMockup.more.clusterSupport}</span>
                      <span className="font-semibold text-brand-green-700">{t.phoneMockup.more.callSupport}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Tab Bar (Home, Monitor, Forecast, Credit, More) */}
          <div className="h-[52px] bg-white border-t border-slate-200/80 px-2 flex items-center justify-around z-20 shrink-0">
            {[
              { id: "home", label: t.phoneMockup.tabs.home, icon: Home },
              { id: "monitor", label: t.phoneMockup.tabs.monitor, icon: Activity },
              { id: "forecast", label: t.phoneMockup.tabs.forecast, icon: LineChartIcon },
              { id: "credit", label: t.phoneMockup.tabs.credit, icon: CreditCard },
              { id: "more", label: t.phoneMockup.tabs.more, icon: MoreHorizontal },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? "text-brand-green-700 font-bold scale-105"
                      : "text-slate-400 hover:text-slate-700 font-medium"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-brand-green-700" : "text-slate-400"}`} />
                  <span className="text-[9px] mt-0.5 leading-none">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Home indicator bar at bottom */}
          <div className="w-[100px] h-[3px] bg-slate-900 rounded-full mx-auto mb-1 opacity-70 shrink-0" />
        </div>
      </div>
    </div>
  );
}
