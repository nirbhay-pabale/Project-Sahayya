"use client";

import React, { useState } from "react";
import {
  Search,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

interface SchemesViewProps {
  onStartSchemeWizard: () => void;
}

export default function SchemesView({ onStartSchemeWizard }: SchemesViewProps) {
  const { t } = useLanguage();
  const [selectedTag, setSelectedTag] = useState("All");
  const [search, setSearch] = useState("");

  const tags = [
    t.views.schemes.filterAll,
    t.views.schemes.filterGrants,
    t.views.schemes.filterLoans,
    "Agro & Food Processing",
    "Solar / Clean Energy",
  ];

  const schemes = [
    {
      id: "pmegp",
      title: "Prime Minister Employment Generation Programme (PMEGP)",
      ministry: "Ministry of MSME",
      subsidy: "15% – 35% Capital Subsidy",
      maxLimit: "Up to ₹50 Lakhs Project Cost",
      category: t.views.schemes.filterGrants,
      description: "Credit-linked subsidy programme to generate continuous self-employment in rural manufacturing & services.",
    },
    {
      id: "pmfme",
      title: "PM Formalisation of Micro Food Processing Enterprises (PMFME)",
      ministry: "Ministry of Food Processing",
      subsidy: "35% Credit-Linked Grant",
      maxLimit: "Up to ₹10 Lakhs Subsidy",
      category: "Agro & Food Processing",
      description: "Financial, technical and business support for upgrading existing micro food processing units.",
    },
    {
      id: "cgtmse",
      title: "Credit Guarantee Fund Trust for Micro & Small Enterprises (CGTMSE)",
      ministry: "Ministry of MSME & SIDBI",
      subsidy: "85% Govt Guarantee Coverage",
      maxLimit: "Up to ₹2 Crore Collateral-Free",
      category: t.views.schemes.filterLoans,
      description: "Enables formal collateral-free bank loans for micro & small manufacturing units across India.",
    },
    {
      id: "mudra",
      title: "Pradhan Mantri MUDRA Yojana (Tarun Scheme)",
      ministry: "Department of Financial Services",
      subsidy: "Concessional Interest",
      maxLimit: "₹5 Lakhs to ₹10 Lakhs",
      category: t.views.schemes.filterLoans,
      description: "Fast-track working capital and machinery term finance for established small enterprises.",
    },
    {
      id: "solar",
      title: "PM Surya Ghar MSME Industrial Solar Rooftop Grant",
      ministry: "Ministry of New & Renewable Energy",
      subsidy: "Up to 40% Capital Subsidy",
      maxLimit: "Up to 500 kW Plant",
      category: "Solar / Clean Energy",
      description: "Capital grant on solar power installations to reduce factory electricity tariffs by up to 60%.",
    },
  ];

  const filtered = schemes.filter((s) => {
    const isAll = selectedTag === "All" || selectedTag === tags[0];
    const matchesTag = isAll || s.category === selectedTag;
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="flex-1 p-6 sm:p-8 space-y-6 max-w-[1020px] mx-auto w-full text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-text-slate-900 tracking-tight">
              {t.views.schemes.title}
            </h2>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              {t.views.schemes.matchedCountBadge}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.views.schemes.subtitle}
          </p>
        </div>
        <Button
          onClick={onStartSchemeWizard}
          className="bg-[#14532D] hover:bg-[#0F3D2E] text-white rounded-xl py-2.5 px-4 font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>{t.views.schemes.startWizardBtn}</span>
        </Button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {tags.map((tag: string, idx: number) => {
            const isSelected = selectedTag === tag || (idx === 0 && selectedTag === "All");
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#14532D] text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={t.views.schemes.filterAll}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-green-600 bg-white"
          />
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((scheme) => (
          <div
            key={scheme.id}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-500/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 text-left"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {scheme.subsidy}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">{scheme.ministry}</span>
              </div>
              <h4 className="font-bold text-sm text-text-slate-900 leading-snug">{scheme.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{scheme.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">MAX BENEFIT</span>
                <span className="text-xs font-extrabold text-emerald-900">{scheme.maxLimit}</span>
              </div>
              <Button
                onClick={onStartSchemeWizard}
                size="sm"
                className="bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-bold rounded-xl py-1.5 px-3 cursor-pointer shadow-xs"
              >
                <span>{t.views.schemes.startWizardBtn}</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
