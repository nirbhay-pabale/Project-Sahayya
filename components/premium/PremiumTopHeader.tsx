"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  AlertTriangle,
  Info,
  Menu,
  Crown,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useModuleResults } from "@/lib/context/ModuleResultsContext";
import { computeSahayyaScore } from "@/lib/score/computeSahayyaScore";

interface PremiumTopHeaderProps {
  onToggleMobileSidebar?: () => void;
  onScrollToSection?: (sectionId: string) => void;
}

export default function PremiumTopHeader({
  onToggleMobileSidebar,
  onScrollToSection,
}: PremiumTopHeaderProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { store } = useModuleResults();
  const [unreadCount, setUnreadCount] = useState(store.radarWarnings.length || 3);

  const computed = computeSahayyaScore(store);
  const userName = user?.fullName || "Aarav Sharma";
  const enterpriseName = user?.businessName || "Rural Tools & Fabrication";
  const initials = user?.initials || "AS";

  const handleLogout = () => {
    logout();
    router.push("/login?plan=free");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200/80 shadow-[0_2px_4px_rgba(0,0,0,0.02)] h-[76px] flex items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full flex items-center justify-between">
        
        {/* Left: Mobile Toggle & Official Brand Logo Lockup */}
        <div className="flex items-center gap-3">
          {onToggleMobileSidebar && (
            <button
              type="button"
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <a
            href="/premium"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center group py-1 cursor-pointer"
          >
            <div className="relative h-[48px] sm:h-[52px] w-[155px] sm:w-[175px] group-hover:opacity-95 transition-opacity">
              <Image
                src="/images/sahayya_logo_header.png"
                alt="Sahayya — Grow Digitally. Comply Easily. Succeed Together."
                fill
                sizes="(max-width: 640px) 155px, 175px"
                className="object-contain object-left"
                priority
              />
            </div>
          </a>
        </div>

        {/* Center/Left: Golden Premium Plan Badge & Pinned Health Score */}
        <div className="hidden md:flex items-center gap-3">
          {/* Gold Premium Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-emerald-500/10 border border-amber-300 text-amber-900 text-xs font-extrabold shadow-2xs">
            <Crown className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>Premium Plan</span>
          </div>

          {/* Sticky Overall Health Score Pill */}
          <button
            type="button"
            onClick={() => onScrollToSection && onScrollToSection("section-score")}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold text-[#14532D] transition-colors cursor-pointer"
            title="Scroll to Sahayya Health Score"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Sahayya Score: {computed.overallScore}/100</span>
          </button>
        </div>

        {/* Right: Universal Language Selector, Search, Notifications & User Profile */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          
          {/* Universal Language Switcher */}
          <LanguageSwitcher variant="header" />

          {/* Notification Bell with Red Dot & Dropdown */}
          <DropdownMenu onOpenChange={(open) => { if (open) setUnreadCount(0); }}>
            <DropdownMenuTrigger className="relative p-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer focus:outline-none">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[340px] p-2 bg-white rounded-2xl shadow-xl border border-slate-100">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="font-bold text-sm text-text-slate-900">Predictive Alerts</span>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {store.radarWarnings.length} Active
                </span>
              </div>
              <DropdownMenuSeparator />
              <div className="space-y-1 py-1">
                {store.radarWarnings.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onScrollToSection && onScrollToSection(item.moduleTarget)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        item.urgency === "Critical"
                          ? "bg-red-100 text-red-600"
                          : item.urgency === "High"
                          ? "bg-amber-100 text-amber-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-text-slate-900 truncate">{item.title}</p>
                      <p className="text-[11px] text-slate-500">{item.triggerReason}</p>
                    </div>
                  </div>
                ))}
              </div>
              <DropdownMenuSeparator />
              <div className="p-1">
                <button
                  type="button"
                  onClick={() => onScrollToSection && onScrollToSection("section-radar")}
                  className="w-full text-center py-1.5 text-xs font-bold text-[#14532D] hover:text-[#0F3D2E] transition-colors cursor-pointer"
                >
                  View Early-Warning Radar →
                </button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile Pill & Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer focus:outline-none">
              <div className="w-9 h-9 rounded-full bg-[#14532D] text-white flex items-center justify-center text-xs font-bold shadow-sm ring-2 ring-amber-300">
                {initials}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-text-slate-900 leading-tight">
                  {userName}
                </span>
                <span className="text-[10.5px] text-slate-500 leading-tight">
                  {enterpriseName}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[240px] p-2 bg-white rounded-2xl shadow-xl border border-slate-100">
              <DropdownMenuLabel className="px-3 py-2">
                <p className="text-xs font-bold text-text-slate-900">{userName}</p>
                <p className="text-[11px] text-amber-700 font-bold flex items-center gap-1 mt-0.5">
                  <Crown className="w-3 h-3 fill-amber-500" /> Premium Member Active
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => onScrollToSection && onScrollToSection("section-score")}
                className="cursor-pointer text-xs font-medium text-slate-700 rounded-xl"
              >
                <User className="w-3.5 h-3.5 mr-2 text-slate-400" /> Business Profile &amp; KYC
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/dashboard")}
                className="cursor-pointer text-xs font-medium text-slate-700 rounded-xl"
              >
                <ArrowUpRight className="w-3.5 h-3.5 mr-2 text-slate-400" /> Switch to Free Trial
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl"
              >
                <LogOut className="w-3.5 h-3.5 mr-2 text-red-500" /> {t.dashboard.header.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </header>
  );
}
