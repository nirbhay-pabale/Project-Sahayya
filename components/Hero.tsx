"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import PhoneMockup from "./PhoneMockup";
import CreditEligibilityCard from "./CreditEligibilityCard";
import DemandForecastCard from "./DemandForecastCard";
import { useLanguage } from "@/lib/language-context";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeroProps {
  onOpenPricing?: () => void;
  onOpenSchemes: () => void;
}

export default function Hero({
  onOpenPricing,
  onOpenSchemes,
}: HeroProps) {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-8 lg:py-14 min-h-[calc(100vh-84px)] flex items-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
        
        {/* LEFT COLUMN: Hero Text (~45% width -> 5.2 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col justify-center space-y-6 z-10"
        >
          {/* Pill Badge */}
          <div className="inline-flex items-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green-100 text-brand-green-700 text-xs sm:text-sm font-bold tracking-tight shadow-sm border border-emerald-200/60">
              <span className="text-sm">🌱</span> {t.hero.badge}
            </span>
          </div>

          {/* H1 Headline */}
          <h1 className="text-[38px] sm:text-[48px] lg:text-[54px] font-extrabold text-text-slate-900 tracking-tight leading-[1.12] flex flex-col">
            <span>{t.hero.titleLine1}</span>
            <span>{t.hero.titleLine2}</span>
            <span className="text-text-slate-900">
              {t.hero.titleFor} <span className="text-brand-green-700">{t.hero.titleHighlight}</span>
            </span>
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-[15px] sm:text-[16px] text-text-slate-600 max-w-[480px] leading-relaxed font-normal">
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            {/* Primary Button: Start for Free */}
            <Link
              href="/login?plan=free"
              className="group relative flex items-center justify-between gap-4 px-6 py-3.5 rounded-xl bg-brand-green-700 hover:bg-brand-green-900 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-left"
            >
              <div className="flex flex-col">
                <span className="text-[16px] font-bold tracking-tight leading-snug">
                  {t.hero.startFree}
                </span>
                <span className="text-[11.5px] text-emerald-100 font-medium leading-none mt-0.5">
                  {t.hero.startFreeSub}
                </span>
              </div>
              <div className="w-9 h-9 rounded-full bg-white text-brand-green-700 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform shadow-sm">
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </Link>

            {/* Secondary Button: Try Paid at ₹199 */}
            <Link
              href="/login?plan=premium"
              className="group relative flex items-center justify-between gap-4 px-6 py-3.5 rounded-xl bg-white hover:bg-brand-green-50/50 text-brand-green-700 border-[1.5px] border-brand-green-700 hover:border-brand-green-900 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-left"
            >
              <div className="flex flex-col">
                <span className="text-[16px] font-bold tracking-tight text-brand-green-900 leading-snug">
                  {t.hero.tryPaid}
                </span>
                <span className="text-[11.5px] text-text-slate-600 font-medium leading-none mt-0.5">
                  {t.hero.tryPaidSub}
                </span>
              </div>
              <div className="w-9 h-9 rounded-full border-[1.5px] border-brand-green-700 text-brand-green-700 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </Link>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Visual Hero with Industrial Sunset Background & Floating Cards (~55% width -> 7 cols) */}
        <div className="lg:col-span-7 relative w-full flex flex-col items-center">
          
          {/* Main Visual Frame with Industrial Sunset Background */}
          <div className="relative w-full min-h-[580px] sm:min-h-[660px] rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 lg:p-7 flex items-center justify-center">
            
            {/* Full-bleed Industrial Sunset Photo with dark subtle gradient overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/industrial_sunset.jpg"
                alt="Industrial MSME logistics port at golden-hour sunset"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center scale-[1.03]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/40 via-transparent to-black/25" />
            </div>

            {/* Visual Contents Grid: Phone on left/center, Floating Cards on right (Desktop) */}
            <div className="relative z-10 w-full grid grid-cols-1 xl:grid-cols-12 gap-5 sm:gap-6 items-center">
              
              {/* Phone Mockup (xl:col-span-5) */}
              <div className="xl:col-span-5 flex justify-center items-center py-1">
                <PhoneMockup onOpenSchemes={onOpenSchemes} />
              </div>

              {/* Floating Cards (xl:col-span-7) */}
              <div className="xl:col-span-7 flex flex-col gap-4 sm:gap-5 w-full max-w-[490px] mx-auto xl:max-w-none">
                {/* Top-Right Floating Card: Credit Eligibility */}
                <CreditEligibilityCard />

                {/* Bottom-Right Floating Card: Demand Forecast */}
                <DemandForecastCard />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
