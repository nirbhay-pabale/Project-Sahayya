"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export interface FeatureCardItem {
  id: string;
  title: string;
  description: string;
  flowId: string;
  illustration: React.ReactNode;
}

interface FeatureCardGridProps {
  onSelectFeature: (flowId: string) => void;
}

export default function FeatureCardGrid({ onSelectFeature }: FeatureCardGridProps) {
  const { t } = useLanguage();

  const cards: FeatureCardItem[] = [
    {
      id: "compliance",
      title: t.dashboard.featureGrid.compliance.title,
      description: t.dashboard.featureGrid.compliance.desc,
      flowId: "compliance",
      illustration: (
        <svg className="w-14 h-14" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="36" fill="#F0FDF4" />
          <path d="M26 34c0-4 3-7 7-7h14c4 0 7 3 7 7v28H26V34z" fill="#15803D" />
          <circle cx="40" cy="24" r="7" fill="#FDE047" />
          <rect x="42" y="36" width="18" height="24" rx="3" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <path d="M46 42h10M46 48h10M46 54h6" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
          <circle cx="37" cy="23" r="1.5" fill="#0F172A" />
        </svg>
      ),
    },
    {
      id: "schemes",
      title: t.dashboard.featureGrid.schemes.title,
      description: t.dashboard.featureGrid.schemes.desc,
      flowId: "schemes",
      illustration: (
        <svg className="w-14 h-14" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="36" fill="#F8FAFC" />
          <path d="M20 34l20-10 20 10v4H20v-4z" fill="#475569" />
          <rect x="23" y="38" width="5" height="18" fill="#94A3B8" />
          <rect x="31" y="38" width="5" height="18" fill="#94A3B8" />
          <rect x="44" y="38" width="5" height="18" fill="#94A3B8" />
          <rect x="52" y="38" width="5" height="18" fill="#94A3B8" />
          <rect x="18" y="56" width="44" height="5" rx="1" fill="#475569" />
          <circle cx="56" cy="48" r="4" fill="#0284C7" />
          <path d="M52 58c0-3 2-5 4-5s4 2 4 5v2h-8v-2z" fill="#0369A1" />
        </svg>
      ),
    },
    {
      id: "safety",
      title: t.dashboard.featureGrid.safety.title,
      description: t.dashboard.featureGrid.safety.desc,
      flowId: "safety",
      illustration: (
        <svg className="w-14 h-14" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="36" fill="#FEFCE8" />
          <circle cx="40" cy="27" r="7" fill="#FDE047" />
          <path d="M30 25c0-6 4.5-9 10-9s10 3 10 9v2H30v-2z" fill="#EAB308" />
          <path d="M28 27h24v2H28z" fill="#CA8A04" />
          <path d="M28 42c0-5 5-9 12-9s12 4 12 9v18H28V42z" fill="#1E3A8A" />
          <rect x="42" y="44" width="16" height="18" rx="2" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="1.5" />
          <path d="M46 49h8M46 54h6" stroke="#CA8A04" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "stock",
      title: t.dashboard.featureGrid.stock.title,
      description: t.dashboard.featureGrid.stock.desc,
      flowId: "stock",
      illustration: (
        <svg className="w-14 h-14" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="36" fill="#EFF6FF" />
          <rect x="20" y="22" width="28" height="38" rx="2" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
          <line x1="20" y1="35" x2="48" y2="35" stroke="#64748B" strokeWidth="2" />
          <line x1="20" y1="48" x2="48" y2="48" stroke="#64748B" strokeWidth="2" />
          <rect x="24" y="26" width="9" height="7" rx="1" fill="#D97706" />
          <rect x="35" y="26" width="9" height="7" rx="1" fill="#B45309" />
          <rect x="24" y="39" width="10" height="7" rx="1" fill="#F59E0B" />
          <circle cx="56" cy="38" r="4.5" fill="#3B82F6" />
          <path d="M51 48c0-3 2-5 5-5s5 2 5 5v12h-10V48z" fill="#1D4ED8" />
        </svg>
      ),
    },
    {
      id: "quality",
      title: t.dashboard.featureGrid.quality.title,
      description: t.dashboard.featureGrid.quality.desc,
      flowId: "quality",
      illustration: (
        <svg className="w-14 h-14" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="36" fill="#F0FDF4" />
          <circle cx="34" cy="27" r="7" fill="#FDE047" />
          <path d="M25 24c0-5 4-8 9-8s9 3 9 8v6h-3v-4h-12v4h-3v-6z" fill="#1E293B" />
          <path d="M23 42c0-5 5-9 11-9s11 4 11 9v18H23V42z" fill="#059669" />
          <path d="M48 38c4 0 9-3 9-3s5 3 9 3v8c0 8-9 12-9 12s-9-4-9-12v-8z" fill="#10B981" />
          <path d="M53 46l3 3 5-5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "patent",
      title: t.dashboard.featureGrid.patent.title,
      description: t.dashboard.featureGrid.patent.desc,
      flowId: "patent",
      illustration: (
        <svg className="w-14 h-14" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="36" fill="#FEFCE8" />
          <path d="M34 26a10 10 0 0115 8.7c-1 1.7-2 3.3-2 5.3h-8c0-2-1-3.6-2-5.3A10 10 0 0134 26z" fill="#F59E0B" />
          <rect x="37" y="42" width="9" height="4" rx="1" fill="#78350F" />
          <rect x="42" y="34" width="18" height="26" rx="2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
          <path d="M46 40h10M46 46h10M46 52h6" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="51" cy="53" r="3" fill="#DC2626" />
        </svg>
      ),
    },
    {
      id: "credits",
      title: t.dashboard.featureGrid.credits.title,
      description: t.dashboard.featureGrid.credits.desc,
      flowId: "credit",
      illustration: (
        <svg className="w-14 h-14" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="36" fill="#FFFBEB" />
          <rect x="22" y="36" width="34" height="22" rx="4" fill="#92400E" stroke="#78350F" strokeWidth="1.5" />
          <circle cx="48" cy="47" r="3" fill="#FDE047" />
          <circle cx="34" cy="27" r="9" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
          <path d="M32 23h4M32 27h4M34 23v8" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="58" cy="38" r="4.5" fill="#3B82F6" />
          <path d="M54 48c0-3 2-5 4-5s4 2 4 5v10h-8V48z" fill="#2563EB" />
        </svg>
      ),
    },
    {
      id: "tools",
      title: t.dashboard.featureGrid.tools.title,
      description: t.dashboard.featureGrid.tools.desc,
      flowId: "compliance",
      illustration: (
        <svg className="w-14 h-14" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="36" fill="#F1F5F9" />
          <path d="M28 26l8 8-4 4-8-8a5 5 0 010-7 5 5 0 014 3z" fill="#64748B" />
          <line x1="32" y1="34" x2="52" y2="54" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          <line x1="52" y1="28" x2="28" y2="52" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
          <circle cx="56" cy="46" r="4.5" fill="#0EA5E9" />
          <path d="M52 56c0-3 2-4 4-4s4 1 4 4v4h-8v-4z" fill="#0284C7" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {cards.map((card) => (
        <div
          key={card.id}
          onClick={() => onSelectFeature(card.flowId)}
          className="group flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-brand-green-600/60 shadow-xs hover:shadow-md transition-all cursor-pointer text-left"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="shrink-0 transition-transform group-hover:scale-105">
              {card.illustration}
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-[13.5px] text-text-slate-900 leading-snug group-hover:text-brand-green-700 transition-colors">
                {card.title}
              </h4>
              <p className="text-[11.5px] text-slate-500 line-clamp-2 leading-tight mt-0.5">
                {card.description}
              </p>
            </div>
          </div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400 group-hover:text-brand-green-700 group-hover:translate-x-0.5 transition-all shrink-0 ml-2">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      ))}
    </div>
  );
}
