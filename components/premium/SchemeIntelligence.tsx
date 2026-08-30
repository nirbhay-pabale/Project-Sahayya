"use client";

import React, { useState, useMemo } from "react";
import { useAuth } from "@/lib/auth-context";
import { useModuleResults } from "@/lib/context/ModuleResultsContext";
import { matchSchemes } from "@/lib/schemes/matcher";
import { BusinessProfile, SchemeMatch } from "@/lib/schemes/types";
import {
  Building2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Filter,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

export default function SchemeIntelligence() {
  const { user } = useAuth();
  const { store } = useModuleResults();
  const [selectedNeed, setSelectedNeed] = useState<"All" | "Finance" | "Compliance" | "Equipment" | "Growth">("All");

  const filterNeeds = ["All", "Finance", "Equipment", "Compliance"];

  // Shared pure matcher invocation
  const profile: BusinessProfile = useMemo(() => ({
    businessType: store.credit.businessType || user?.category || "Manufacturing",
    state: store.credit.state || user?.location || "Maharashtra",
    businessSize: store.credit.businessSize || "Micro",
    annualTurnover: store.credit.annualTurnover || store.credit.monthlyRevenue * 12 || 1800000,
    businessAgeYears: store.credit.businessAgeYears || 4,
    loanAmountNeeded: store.credit.loanAmountNeeded || 750000,
    loanPurpose: store.credit.loanPurpose || "Working Capital",
    existingLoans: store.credit.existingLiabilities || 250000,
    hasUdyam: store.credit.hasUdyam ?? true,
    hasGst: store.credit.hasGst ?? true,
  }), [store.credit, user]);

  const allMatchedSchemes: SchemeMatch[] = useMemo(() => {
    return matchSchemes(profile);
  }, [profile]);

  const filtered = allMatchedSchemes.filter((s) => {
    if (selectedNeed === "All") return true;
    return s.category === selectedNeed;
  });

  return (
    <section id="section-schemes" className="scroll-mt-24 w-full space-y-6 text-left">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-100 text-[#14532D]">
              <Building2 className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
              Section 7 • Subsidies &amp; Grants
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Best Opportunities for Your Business
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Government schemes matched specifically to your enterprise sector ({profile.businessType}), state ({profile.state}), and credit profile.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#14532D] text-xs font-bold shadow-2xs">
          <span>{filtered.length} Matched Opportunities</span>
        </div>
      </div>

      {/* Official Udyam Registration Reference Note */}
      <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#14532D] shrink-0" />
          <p className="text-xs text-emerald-950">
            <strong>Official Registration Mandate:</strong> Official MSME classification and national registration is conducted exclusively via the Ministry of MSME Udyam Portal. Ensure your Udyam Certificate is active to claim subsidies.
          </p>
        </div>
        <a
          href="https://udyamregistration.gov.in"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-emerald-300 text-xs font-bold text-[#14532D] shrink-0 transition-colors shadow-2xs"
        >
          <span>Official Udyam Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Filter by Primary Need */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0 mr-1">
          <Filter className="w-3.5 h-3.5" /> Primary Need:
        </span>
        {filterNeeds.map((need) => (
          <button
            key={need}
            type="button"
            onClick={() => setSelectedNeed(need as any)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedNeed === need
                ? "bg-[#14532D] text-white shadow-2xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
            }`}
          >
            {need === "All" ? "All Matched Schemes" : need}
          </button>
        ))}
      </div>

      {/* Matched Schemes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((scheme) => (
          <div
            key={scheme.id}
            className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 text-left"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-extrabold text-[#14532D] bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {scheme.category}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">{scheme.ministryOrBody}</span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                  {scheme.schemeName}
                </h4>
                <span
                  className={`text-[10.5px] font-extrabold px-2 py-0.5 rounded-full border shrink-0 ${
                    scheme.matchLevel === "High Match"
                      ? "bg-emerald-100 text-[#14532D] border-emerald-300"
                      : scheme.matchLevel === "Good Match"
                      ? "bg-blue-100 text-blue-800 border-blue-300"
                      : "bg-amber-100 text-amber-800 border-amber-300"
                  }`}
                >
                  {scheme.matchLevel}
                </span>
              </div>

              {/* Benefit Highlight Pill */}
              <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-950 font-bold text-xs">
                ✨ {scheme.maxLoanOrSubsidyText}
              </div>

              {/* Matching Reasons */}
              <div className="space-y-1">
                <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">
                  Eligibility &amp; Alignment
                </span>
                {scheme.matchReasons.slice(0, 3).map((el, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[11.5px] text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{el}</span>
                  </div>
                ))}
              </div>

              {/* Missing Requirements if any */}
              {scheme.missingRequirements.length > 0 && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Prerequisite:</strong> {scheme.missingRequirements.join(" • ")}</span>
                </div>
              )}

              {/* Required Documents */}
              <div className="space-y-1 pt-1">
                <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">
                  Required Documentation
                </span>
                <div className="flex flex-wrap gap-1">
                  {scheme.requiredDocs.map((doc, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Official Source Link-Out Button */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Direct Nodal Window</span>
              <a
                href={scheme.officialLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-bold shadow-xs transition-colors"
              >
                <span>Official Scheme Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
