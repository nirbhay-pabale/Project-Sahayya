"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import { ModuleResultsProvider, useModuleResults } from "@/lib/context/ModuleResultsContext";
import PremiumTopHeader from "@/components/premium/PremiumTopHeader";
import PremiumSidebar from "@/components/premium/PremiumSidebar";
import SahayyaScoreSection from "@/components/premium/SahayyaScoreSection";
import SafetyIntelligence from "@/components/premium/SafetyIntelligence";
import QualityIntelligence from "@/components/premium/QualityIntelligence";
import DemandIntelligence from "@/components/premium/DemandIntelligence";
import CreditReadiness from "@/components/premium/CreditReadiness";
import IPPatentIntelligence from "@/components/premium/IPPatentIntelligence";
import SchemeIntelligence from "@/components/premium/SchemeIntelligence";
import EarlyWarningRadar from "@/components/premium/EarlyWarningRadar";
import WhatIfSimulator from "@/components/premium/WhatIfSimulator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Crown, Sparkles, ShieldCheck } from "lucide-react";

function PremiumDashboardContent() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { t } = useLanguage();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState("section-score");

  // Section list in chronological order for scroll spy
  const sectionIds = [
    "section-score",
    "section-safety",
    "section-quality",
    "section-demand",
    "section-credit",
    "section-patent",
    "section-schemes",
    "section-radar",
    "section-whatif",
  ];

  // Smooth scroll handler
  const handleScrollToSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    setMobileSidebarOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll spy listener using IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSectionId(id);
              }
            });
          },
          { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 }
        );
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center animate-pulse">
          <Crown className="w-7 h-7" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="font-bold text-base text-slate-800">
            Loading Sahayya Premium Dashboard...
          </h3>
          <p className="text-xs text-slate-500">
            Initializing live CCTV streaming and cross-module intelligence...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between select-none">
      
      {/* 1. STICKY TOP HEADER (Rendered strictly once) */}
      <PremiumTopHeader
        onToggleMobileSidebar={() => setMobileSidebarOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* 2. MAIN LAYOUT: Fixed Left Sidebar + Single Long-Form Vertical Scroll Main Content */}
      <div className="flex-1 w-full max-w-[1600px] mx-auto flex items-start overflow-hidden">
        
        {/* Left Column: Fixed Desktop Sidebar (~260px) with Scroll-Spy Anchor Links */}
        <div className="hidden lg:block shrink-0 sticky top-[76px]">
          <PremiumSidebar
            activeSectionId={activeSectionId}
            onNavigateSection={handleScrollToSection}
          />
        </div>

        {/* Mobile Slide-out Drawer for Sidebar */}
        <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
          <SheetContent side="left" className="p-0 w-[280px] bg-white">
            <PremiumSidebar
              activeSectionId={activeSectionId}
              onNavigateSection={handleScrollToSection}
            />
          </SheetContent>
        </Sheet>

        {/* Long-Form Continuous Scroll Main Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-12 max-w-[1240px] mx-auto overflow-y-auto">
          
          {/* Section 12 / Top Overview: Sahayya Score & Enterprise Health */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <SahayyaScoreSection />
          </motion.div>

          <div className="h-px bg-slate-200/80 my-8" />

          {/* Section 1: Safety Intelligence & Live PPE CCTV */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <SafetyIntelligence />
          </motion.div>

          <div className="h-px bg-slate-200/80 my-8" />

          {/* Section 2: Quality Intelligence & Defect Anomaly AI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <QualityIntelligence />
          </motion.div>

          <div className="h-px bg-slate-200/80 my-8" />

          {/* Section 3: Demand Intelligence & Capacity Planner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <DemandIntelligence />
          </motion.div>

          <div className="h-px bg-slate-200/80 my-8" />

          {/* Section 4: Credit Readiness & Bank Preparedness */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <CreditReadiness />
          </motion.div>

          <div className="h-px bg-slate-200/80 my-8" />

          {/* Section 5: IP & Patent Intelligence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <IPPatentIntelligence />
          </motion.div>

          <div className="h-px bg-slate-200/80 my-8" />

          {/* Section 7: Government Schemes & Subsidies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <SchemeIntelligence />
          </motion.div>

          <div className="h-px bg-slate-200/80 my-8" />

          

          {/* Section 9: Early-Warning Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <EarlyWarningRadar onScrollToSection={handleScrollToSection} />
          </motion.div>

          <div className="h-px bg-slate-200/80 my-8" />

          {/* Section 10: What-If Scenario Simulator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <WhatIfSimulator />
          </motion.div>

          

          {/* Bottom Footer Callout */}
          <div className="p-8 rounded-3xl bg-slate-900 text-white text-center space-y-2 mt-12 shadow-xl">
            <div className="flex items-center justify-center gap-2">
              <Crown className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Sahayya Enterprise Premium Suite Active
              </span>
            </div>
            <h4 className="text-xl font-bold">Empowering Rural Industrial Clusters with Precision AI</h4>
            <p className="text-xs text-slate-400 max-w-xl mx-auto">
              Bank-grade 256-bit encryption. All cluster telemetries and patent specifications are confidential and protected.
            </p>
          </div>

        </main>
      </div>

    </div>
  );
}

export default function PremiumPage() {
  return (
    <ModuleResultsProvider>
      <PremiumDashboardContent />
    </ModuleResultsProvider>
  );
}
