"use client";

import React from "react";
import {
  MessageCircle,
  FileText,
  ShieldCheck,
  Rocket,
  LayoutGrid,
  Building2,
  Bell,
  Settings,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenUpgrade?: () => void;
  alertsCount?: number;
}

export default function Sidebar({
  activeTab,
  onSelectTab,
  onOpenUpgrade,
  alertsCount = 3,
}: SidebarProps) {
  const { t } = useLanguage();

  const mainNavItems: NavItem[] = [
    { id: "chat", label: t.dashboard.sidebar.tabs.chat, icon: MessageCircle },
    { id: "documents", label: t.dashboard.sidebar.tabs.documents, icon: FileText },
    { id: "compliance", label: t.dashboard.sidebar.tabs.compliance, icon: ShieldCheck },
    { id: "schemes", label: t.dashboard.sidebar.tabs.schemes, icon: Rocket },
    { id: "tools", label: t.dashboard.sidebar.tabs.tools, icon: LayoutGrid },
    { id: "business", label: t.dashboard.sidebar.tabs.business, icon: Building2 },
  ];

  const bottomNavItems: NavItem[] = [
    {
      id: "alerts",
      label: t.dashboard.sidebar.tabs.alerts,
      icon: Bell,
      badge: alertsCount > 0 ? alertsCount.toString() : undefined,
    },
    { id: "settings", label: t.dashboard.sidebar.tabs.settings, icon: Settings },
    { id: "help", label: t.dashboard.sidebar.tabs.help, icon: HelpCircle },
  ];

  return (
    <aside className="w-[260px] bg-white border-r border-slate-200/80 flex flex-col justify-between p-4 h-[calc(100vh-76px)] overflow-y-auto shrink-0 select-none">
      
      {/* Top Nav List */}
      <div className="space-y-6">
        {/* Main section */}
        <nav className="space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#DCFCE7] text-[#14532D] font-bold shadow-xs"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#14532D]" : "text-slate-500"}`} />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="border-t border-slate-100" />

        {/* Secondary section */}
        <nav className="space-y-1">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#DCFCE7] text-[#14532D] font-bold shadow-xs"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#14532D]" : "text-slate-500"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Pinned Upgrade to Pro Card */}
      <div className="mt-6 p-4 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] space-y-3">
        <h4 className="font-extrabold text-sm text-[#14532D] leading-tight">
          {t.dashboard.sidebar.upgradeCard.title}
        </h4>
        <p className="text-[11.5px] text-slate-600 leading-snug">
          {t.dashboard.sidebar.upgradeCard.description}
        </p>

        {/* Factory skyline illustration vector */}
        <div className="w-full h-14 relative flex items-end justify-center overflow-hidden rounded-lg bg-emerald-100/40">
          <svg
            className="w-full h-12 text-[#14532D]/30"
            viewBox="0 0 200 60"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 60V25h12v35h6V15h14v45h8V30h16v30h10V10h18v50h12V20h14v40h8V35h15v25h20V5h15v55H10z" />
            <circle cx="160" cy="18" r="4" fill="currentColor" fillOpacity="0.4" />
            <circle cx="60" cy="14" r="3" fill="currentColor" fillOpacity="0.4" />
          </svg>
        </div>

        <Button
          onClick={onOpenUpgrade}
          className="w-full bg-[#14532D] hover:bg-[#0F3D2E] text-white rounded-xl py-2 h-auto text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>{t.dashboard.sidebar.upgradeCard.button}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

    </aside>
  );
}
