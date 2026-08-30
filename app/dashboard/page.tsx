"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import TopHeader from "@/components/dashboard/TopHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import MainChat from "@/components/dashboard/MainChat";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import ProPlanCard from "@/components/dashboard/ProPlanCard";
import PromoBanner from "@/components/dashboard/PromoBanner";
import DocumentsView from "@/components/dashboard/views/DocumentsView";
import ComplianceView from "@/components/dashboard/views/ComplianceView";
import SchemesView from "@/components/dashboard/views/SchemesView";
import ToolsView from "@/components/dashboard/views/ToolsView";
import BusinessProfileView from "@/components/dashboard/views/BusinessProfileView";
import AlertsView, { AlertItemData } from "@/components/dashboard/views/AlertsView";
import SettingsView from "@/components/dashboard/views/SettingsView";
import HelpSupportView from "@/components/dashboard/views/HelpSupportView";
import AlertDetailModal from "@/components/dashboard/AlertDetailModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("chat");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [selectedAlertDetail, setSelectedAlertDetail] = useState<AlertItemData | null>(null);
  const [alertModalOpen, setAlertModalOpen] = useState(false);

  const [activeAlerts, setActiveAlerts] = useState<AlertItemData[]>([
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

  // Protect route: Only open free trial dashboard if user has logged in or signed up with a valid name
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user?.fullName)) {
      router.push("/login?plan=free");
    }
  }, [isLoading, isAuthenticated, user, router]);

  const handleOpenAlert = (alert: AlertItemData) => {
    setSelectedAlertDetail(alert);
    setAlertModalOpen(true);
  };

  const handleResolveAlert = (id: string) => {
    setActiveAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleLaunchTool = (toolId: string) => {
    setActiveTab("chat");
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#14532D] flex items-center justify-center animate-pulse">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="font-bold text-base text-slate-800">
            {t.common.loading}
          </h3>
          <p className="text-xs text-slate-500">
            {t.auth.loginSubtitle}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between select-none">
      
      {/* 1. TOP HEADER (Rendered strictly once) */}
      <TopHeader
        onToggleMobileSidebar={() => setMobileSidebarOpen(true)}
        onOpenUpgrade={() => setUpgradeModalOpen(true)}
        onNavigateTab={(tab) => setActiveTab(tab)}
        onOpenAlertDetail={handleOpenAlert}
      />

      {/* 2. THREE-COLUMN DASHBOARD BODY */}
      <div className="flex-1 w-full max-w-[1580px] mx-auto flex items-start overflow-hidden">
        
        {/* LEFT COLUMN: Fixed Sidebar on Desktop (~260px) */}
        <div className="hidden lg:block shrink-0">
          <Sidebar
            activeTab={activeTab}
            onSelectTab={(tab) => setActiveTab(tab)}
            onOpenUpgrade={() => setUpgradeModalOpen(true)}
            alertsCount={activeAlerts.length}
          />
        </div>

        {/* Mobile Slide-out Drawer for Sidebar */}
        <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
          <SheetContent side="left" className="p-0 w-[280px] bg-white">
            <Sidebar
              activeTab={activeTab}
              onSelectTab={(tab) => {
                setActiveTab(tab);
                setMobileSidebarOpen(false);
              }}
              onOpenUpgrade={() => {
                setMobileSidebarOpen(false);
                setUpgradeModalOpen(true);
              }}
              alertsCount={activeAlerts.length}
            />
          </SheetContent>
        </Sheet>

        {/* CENTER COLUMN: Dynamic Active Tab View (~880px max-width) */}
        <main className="flex-1 min-w-0 bg-white min-h-[calc(100vh-76px)] overflow-y-auto flex flex-col border-r border-slate-200/80">
          {activeTab === "chat" && (
            <MainChat
              onOpenUpgrade={() => setUpgradeModalOpen(true)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}
          {activeTab === "documents" && <DocumentsView />}
          {activeTab === "compliance" && <ComplianceView onStartAudit={() => setActiveTab("chat")} />}
          {activeTab === "schemes" && <SchemesView onStartSchemeWizard={() => setActiveTab("chat")} />}
          {activeTab === "tools" && <ToolsView onLaunchTool={handleLaunchTool} />}
          {activeTab === "business" && <BusinessProfileView />}
          {activeTab === "alerts" && <AlertsView onOpenAlertDetail={handleOpenAlert} />}
          {activeTab === "settings" && <SettingsView />}
          {activeTab === "help" && <HelpSupportView />}
        </main>

        {/* RIGHT COLUMN: Right Sidebar (~330px, hidden on tablet/mobile) */}
        <aside className="hidden xl:flex flex-col gap-5 w-[330px] p-5 h-[calc(100vh-76px)] overflow-y-auto shrink-0 bg-[#F8FAFC]">
          {/* Card 1: Alerts */}
          <AlertsPanel
            alerts={activeAlerts}
            onSelectAlert={handleOpenAlert}
            onViewAll={() => setActiveTab("alerts")}
            onResolveAlert={handleResolveAlert}
          />

          {/* Card 2: Pro Plan */}
          <ProPlanCard onOpenUpgrade={() => setUpgradeModalOpen(true)} />

          {/* Card 3: Illustrated Promo Banner */}
          <PromoBanner />
        </aside>

      </div>

      {/* 3. PRO UPGRADE MODAL */}
      <Dialog open={upgradeModalOpen} onOpenChange={setUpgradeModalOpen}>
        <DialogContent className="bg-white p-6 sm:p-8 rounded-3xl max-w-[500px] border border-slate-100 shadow-2xl">
          <DialogHeader className="text-left space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#14532D] flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <DialogTitle className="text-2xl font-extrabold text-text-slate-900 tracking-tight">
              {t.modals.proModal.title}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              {t.modals.proModal.subtitle}
            </DialogDescription>
          </DialogHeader>

          {/* Feature highlights */}
          <div className="space-y-2.5 py-4 border-y border-slate-100 text-left">
            {t.modals.proModal.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 font-medium leading-snug">
                  {feat}
                </span>
              </div>
            ))}
          </div>

          {/* Price & CTA */}
          <div className="pt-2 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-extrabold text-text-slate-900">{t.modals.proModal.price}</span>
                <span className="text-xs text-slate-500 font-medium"> {t.modals.proModal.billingNote}</span>
              </div>
              <span className="text-[11px] font-bold text-brand-green-700 bg-brand-green-50 px-2.5 py-1 rounded-full">
                {t.modals.proModal.saveBadge}
              </span>
            </div>

            <Button
              onClick={() => {
                setUpgradeModalOpen(false);
                router.push("/premium");
              }}
              className="w-full bg-[#14532D] hover:bg-[#0F3D2E] text-white rounded-xl py-5 font-bold transition-all shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <span>{t.modals.proModal.subscribeBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 4. ALERT DETAIL MODAL */}
      <AlertDetailModal
        alert={selectedAlertDetail}
        open={alertModalOpen}
        onOpenChange={setAlertModalOpen}
        onResolved={handleResolveAlert}
      />

    </div>
  );
}
