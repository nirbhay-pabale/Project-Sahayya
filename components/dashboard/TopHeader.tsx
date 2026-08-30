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
import { AlertItemData } from "./views/AlertsView";

interface TopHeaderProps {
  onToggleMobileSidebar?: () => void;
  onOpenUpgrade?: () => void;
  onNavigateTab?: (tabId: string) => void;
  onOpenAlertDetail?: (alert: AlertItemData) => void;
}

export default function TopHeader({
  onToggleMobileSidebar,
  onOpenUpgrade,
  onNavigateTab,
  onOpenAlertDetail,
}: TopHeaderProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [unreadCount, setUnreadCount] = useState(3);

  const userName = user?.fullName || "Enterprise User";
  const enterpriseName = user?.businessName || (user?.plan === "pro" ? t.common.proPlan : t.common.freeTrial);
  const initials = user?.initials || "EU";

  const alerts: AlertItemData[] = [
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

  const handleLogout = () => {
    logout();
    router.push("/login?plan=free");
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateTab) {
      onNavigateTab("chat");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] h-[76px] flex items-center px-4 sm:px-6 lg:px-8">
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

          <a href="/dashboard" onClick={handleLogoClick} className="flex items-center group py-1 cursor-pointer">
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

        {/* Right: Language Switcher, Notifications & User Profile Menu */}
        <div className="flex items-center gap-3 sm:gap-5">
          
          {/* Universal Language Switcher */}
          <LanguageSwitcher variant="header" />

          {/* Notification Bell with Red Dot & Dropdown */}
          <DropdownMenu onOpenChange={(open) => { if (open) setUnreadCount(0); }}>
            <DropdownMenuTrigger className="relative p-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer focus:outline-none">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[320px] p-2 bg-white rounded-2xl shadow-xl border border-slate-100">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="font-bold text-sm text-text-slate-900">{t.dashboard.header.notificationsTitle}</span>
                <span className="text-[11px] font-semibold text-brand-green-700 bg-brand-green-50 px-2 py-0.5 rounded-full">
                  {alerts.length} {t.dashboard.aside.alertsTitle}
                </span>
              </div>
              <DropdownMenuSeparator />
              <div className="space-y-1 py-1">
                {alerts.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onOpenAlertDetail && onOpenAlertDetail(item)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        item.type === "danger"
                          ? "bg-red-100 text-red-600"
                          : item.type === "warning"
                          ? "bg-amber-100 text-amber-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {item.type === "info" ? (
                        <Info className="w-4 h-4" />
                      ) : (
                        <AlertTriangle className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-text-slate-900 truncate">{item.title}</p>
                      <p className="text-[11px] text-slate-500">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
              <DropdownMenuSeparator />
              <div className="p-1">
                <button
                  type="button"
                  onClick={() => onNavigateTab && onNavigateTab("alerts")}
                  className="w-full text-center py-1.5 text-xs font-bold text-brand-green-700 hover:text-brand-green-900 transition-colors cursor-pointer"
                >
                  {t.dashboard.aside.viewAll} {t.dashboard.aside.alertsTitle} →
                </button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile Pill & Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 p-1.5 pr-2.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer focus:outline-none">
              <div className="w-9 h-9 rounded-full bg-[#1E293B] text-white flex items-center justify-center text-xs font-bold shadow-sm">
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
            <DropdownMenuContent align="end" className="w-[220px] p-2 bg-white rounded-2xl shadow-xl border border-slate-100">
              <DropdownMenuLabel className="px-3 py-2">
                <p className="text-xs font-bold text-text-slate-900">{userName}</p>
                <p className="text-[11px] text-slate-500 font-normal">
                  {user?.plan === "pro" ? t.common.proPlan : t.common.freeTrial}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onOpenUpgrade}
                className="cursor-pointer text-xs font-semibold text-brand-green-700 hover:bg-brand-green-50 rounded-xl"
              >
                🚀 {t.dashboard.header.upgradeButton}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onNavigateTab && onNavigateTab("business")}
                className="cursor-pointer text-xs font-medium text-slate-700 rounded-xl"
              >
                <User className="w-3.5 h-3.5 mr-2 text-slate-400" /> {t.dashboard.sidebar.tabs.business}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onNavigateTab && onNavigateTab("settings")}
                className="cursor-pointer text-xs font-medium text-slate-700 rounded-xl"
              >
                <Settings className="w-3.5 h-3.5 mr-2 text-slate-400" /> {t.dashboard.sidebar.tabs.settings}
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
