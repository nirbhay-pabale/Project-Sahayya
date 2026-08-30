"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Video,
  TrendingUp,
  Package,
  CreditCard,
  Microscope,
  Cpu,
  Sparkles,
  Radar,
  Sliders,
  History,
  Lightbulb,
  ShieldCheck,
  Building2,
  Crown,
  CheckCircle2,
} from "lucide-react";

export interface PremiumNavItem {
  id: string;
  label: string;
  targetSection: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

interface PremiumSidebarProps {
  activeSectionId?: string;
  onNavigateSection: (sectionId: string) => void;
}

export default function PremiumSidebar({
  activeSectionId = "section-score",
  onNavigateSection,
}: PremiumSidebarProps) {
  const navItems: PremiumNavItem[] = [
    { id: "score", label: "Sahayya Score", targetSection: "section-score", icon: LayoutDashboard },
    { id: "safety", label: "CCTV & AI Safety", targetSection: "section-safety", icon: Video },
    { id: "quality", label: "Quality Intelligence", targetSection: "section-quality", icon: Microscope },
    { id: "demand", label: "Sales & Demand", targetSection: "section-demand", icon: TrendingUp },
    { id: "credit", label: "Credit & Schemes", targetSection: "section-credit", icon: CreditCard },
    { id: "patent", label: "IP & Patents", targetSection: "section-patent", icon: Lightbulb },
    { id: "schemes", label: "Govt Schemes", targetSection: "section-schemes", icon: Building2 },
    {
      id: "radar",
      label: "Early-Warning Radar",
      targetSection: "section-radar",
      icon: Radar,
      badge: "Live",
      badgeColor: "bg-red-100 text-red-700",
    },
    { id: "whatif", label: "What-If Simulator", targetSection: "section-whatif", icon: Sliders },
  ];

  return (
    <aside className="w-[260px] bg-white border-r border-slate-200/80 flex flex-col justify-between p-4 h-[calc(100vh-76px)] overflow-y-auto shrink-0 select-none">
      
      {/* Navigation List */}
      <div className="space-y-1">
        <div className="px-3 py-2 text-[10.5px] font-extrabold uppercase tracking-wider text-slate-400">
          Executive Navigation
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSectionId === item.targetSection;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigateSection(item.targetSection)}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#DCFCE7] text-[#14532D] font-extrabold shadow-2xs translate-x-0.5"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? "text-[#14532D]" : "text-slate-400 group-hover:text-slate-700"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9.5px] font-extrabold px-1.5 py-0.5 rounded-md shrink-0 ml-1.5 ${
                      item.badgeColor || "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Pinned "You're on Premium!" Card */}
      <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-[#F0FDF4] to-emerald-50/70 border border-[#DCFCE7] space-y-2.5 shadow-2xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#14532D] text-white flex items-center justify-center shadow-xs">
            <Crown className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          </div>
          <h4 className="font-extrabold text-xs text-[#14532D] leading-tight">
            You&apos;re on Premium!
          </h4>
        </div>
        <p className="text-[11px] text-slate-600 leading-snug">
          All enterprise intelligence modules, live CCTV streaming, and early warning radar are active for your cluster.
        </p>

        <div className="pt-1.5 border-t border-emerald-200/60 flex items-center gap-1.5 text-[10.5px] font-bold text-emerald-800">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Priority Nodal Support Active</span>
        </div>
      </div>

    </aside>
  );
}
