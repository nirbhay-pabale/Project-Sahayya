"use client";

import React from "react";
import { useLanguage } from "@/lib/language-context";

export default function PromoBanner() {
  const { t } = useLanguage();

  return (
    <div className="relative rounded-2xl bg-[#E6F4EA] border border-[#CEEAD6] p-5 overflow-hidden shadow-xs">
      
      {/* Text Copy */}
      <div className="relative z-10 space-y-1 mb-6">
        <h4 className="font-extrabold text-sm text-[#137333] leading-tight">
          {t.hero.badge}
        </h4>
        <p className="text-[11.5px] text-[#202124] leading-snug font-medium">
          {t.dashboard.aside.promoBanner.title}
        </p>
      </div>

      {/* Illustrated Scene at Bottom (Factory, Wind Turbine, Truck, Trees) */}
      <div className="w-full h-24 relative flex items-end justify-between select-none">
        <svg
          className="w-full h-20 text-[#34A853]"
          viewBox="0 0 300 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ground */}
          <path d="M0 85h300v5H0v-5z" fill="#81C995" />

          {/* Trees left */}
          <circle cx="20" cy="74" r="9" fill="#1E8E3E" />
          <circle cx="34" cy="70" r="12" fill="#137333" />
          <rect x="25" y="78" width="4" height="8" fill="#5F6368" />

          {/* Factory Skyline */}
          <rect x="70" y="45" width="22" height="40" fill="#4B5563" />
          <rect x="94" y="32" width="28" height="53" fill="#374151" />
          <polygon points="94,32 108,18 122,32" fill="#1F2937" />
          <rect x="124" y="50" width="18" height="35" fill="#4B5563" />
          {/* Windows */}
          <rect x="76" y="52" width="4" height="6" fill="#FDE047" />
          <rect x="84" y="52" width="4" height="6" fill="#FDE047" />
          <rect x="100" y="40" width="5" height="8" fill="#FDE047" />
          <rect x="110" y="40" width="5" height="8" fill="#FDE047" />

          {/* Small Delivery Truck */}
          <rect x="155" y="68" width="20" height="14" rx="2" fill="#FFFFFF" />
          <rect x="175" y="72" width="10" height="10" rx="1" fill="#F59E0B" />
          <circle cx="162" cy="84" r="3" fill="#111827" />
          <circle cx="180" cy="84" r="3" fill="#111827" />

          {/* Wind Turbine right */}
          <line x1="245" y1="20" x2="245" y2="85" stroke="#9CA3AF" strokeWidth="2.5" />
          <circle cx="245" cy="20" r="3.5" fill="#4B5563" />
          <line x1="245" y1="20" x2="230" y2="5" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
          <line x1="245" y1="20" x2="260" y2="12" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
          <line x1="245" y1="20" x2="245" y2="38" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />

          {/* Right trees */}
          <circle cx="280" cy="72" r="10" fill="#1E8E3E" />
          <circle cx="292" cy="76" r="8" fill="#137333" />
        </svg>
      </div>

    </div>
  );
}
