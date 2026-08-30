"use client";

import React, { useState, useMemo } from "react";
import { useModuleResults } from "@/lib/context/ModuleResultsContext";
import { useAuth } from "@/lib/auth-context";
import { matchSchemes } from "@/lib/schemes/matcher";
import { BusinessProfile, SchemeMatch } from "@/lib/schemes/types";
import {
  CreditCard,
  Building2,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  ExternalLink,
  Info,
  Sparkles,
  IndianRupee,
  Search,
  Check,
  X,
  FileCheck,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreditReadiness() {
  const { store, updateCredit } = useModuleResults();
  const { user } = useAuth();

  // 10-Field Business Eligibility Form State
  const [businessType, setBusinessType] = useState<string>(
    store.credit.businessType || user?.category || "Manufacturing"
  );
  const [state, setState] = useState<string>(
    store.credit.state || user?.location || "Maharashtra"
  );
  const [businessSize, setBusinessSize] = useState<"Micro" | "Small" | "Medium">(
    store.credit.businessSize || "Micro"
  );
  const [annualTurnover, setAnnualTurnover] = useState<number>(
    store.credit.annualTurnover || store.credit.monthlyRevenue * 12 || 1800000
  );
  const [businessAgeYears, setBusinessAgeYears] = useState<number>(
    store.credit.businessAgeYears || 4
  );
  const [loanAmountNeeded, setLoanAmountNeeded] = useState<number>(
    store.credit.loanAmountNeeded || 750000
  );
  const [loanPurpose, setLoanPurpose] = useState<string>(
    store.credit.loanPurpose || "Working Capital"
  );
  const [existingLoans, setExistingLoans] = useState<number>(
    store.credit.existingLiabilities || 250000
  );
  const [hasUdyam, setHasUdyam] = useState<boolean>(
    store.credit.hasUdyam ?? true
  );
  const [hasGst, setHasGst] = useState<boolean>(
    store.credit.hasGst ?? true
  );

  // Business Profile Object
  const currentProfile: BusinessProfile = useMemo(() => ({
    businessType,
    state,
    businessSize,
    annualTurnover,
    businessAgeYears,
    loanAmountNeeded,
    loanPurpose,
    existingLoans,
    hasUdyam,
    hasGst,
  }), [
    businessType,
    state,
    businessSize,
    annualTurnover,
    businessAgeYears,
    loanAmountNeeded,
    loanPurpose,
    existingLoans,
    hasUdyam,
    hasGst,
  ]);

  // Evaluate matches in real-time or on form recalculate
  const matchedSchemes: SchemeMatch[] = useMemo(() => {
    return matchSchemes(currentProfile);
  }, [currentProfile]);

  // Compute supporting financial preparedness score (0-100)
  const computedScore = useMemo(() => {
    let base = 50;
    // Revenue factor
    if (annualTurnover >= 2000000) base += 15;
    else if (annualTurnover >= 800000) base += 10;
    else base += 5;

    // Debt to turnover ratio
    const debtRatio = existingLoans / Math.max(1, annualTurnover);
    if (debtRatio <= 0.2) base += 15;
    else if (debtRatio <= 0.45) base += 10;
    else base += 2;

    // Business Age stability
    if (businessAgeYears >= 3) base += 10;
    else if (businessAgeYears >= 1) base += 5;

    // Formal Registration Boosts
    if (hasUdyam) base += 5;
    if (hasGst) base += 5;

    return Math.min(95, Math.max(40, base));
  }, [annualTurnover, existingLoans, businessAgeYears, hasUdyam, hasGst]);

  const handleFindSchemes = () => {
    const strong: string[] = [];
    const weak: string[] = [];
    const actions: string[] = [];

    const debtRatio = existingLoans / Math.max(1, annualTurnover);
    if (debtRatio <= 0.25) {
      strong.push(`Conservative debt-to-turnover ratio (${(debtRatio * 100).toFixed(0)}%)`);
    } else {
      weak.push(`Debt-to-turnover ratio at ${(debtRatio * 100).toFixed(0)}%`);
      actions.push("Accelerate debt reduction to free up monthly cash flows for new credit lines");
    }

    if (hasUdyam) {
      strong.push("Active Udyam registration unlocks sovereign guarantee windows");
    } else {
      weak.push("Missing Udyam registration limits priority MSME scheme access");
      actions.push("Register on official Udyam portal to unlock CGTMSE & PMEGP subsidies");
    }

    if (hasGst) {
      strong.push("Active GST registration enables automated fast-track bank underwriting");
    } else {
      weak.push("Unregistered GST requires manual bank financial auditing");
      actions.push("File regular GSTR returns to establish formal verifiable business turnover");
    }

    if (businessAgeYears >= 3) {
      strong.push(`${businessAgeYears}+ years operational track record`);
    } else {
      actions.push("Young enterprise: Leverage PMEGP / MUDRA Shishu windows with lower vintage mandates");
    }

    updateCredit({
      score: computedScore,
      annualTurnover,
      monthlyRevenue: Math.round(annualTurnover / 12),
      monthlyExpenses: Math.round(annualTurnover / 12 * 0.72),
      businessAgeYears,
      existingLiabilities: existingLoans,
      loanAmountNeeded,
      businessType,
      state,
      businessSize,
      loanPurpose,
      hasUdyam,
      hasGst,
      strongAreas: strong,
      weakAreas: weak,
      improvementActions: actions,
      matchedSchemesCount: matchedSchemes.length,
    });
  };

  const businessTypeOptions = [
    "Manufacturing",
    "Food Processing",
    "Handicrafts & Artisans",
    "Services",
    "Trading / Retail",
    "Agriculture & Allied",
    "Textiles & Apparel",
    "IT & Technical",
    "Other",
  ];

  const stateOptions = [
    "Maharashtra",
    "Gujarat",
    "Tamil Nadu",
    "Karnataka",
    "Uttar Pradesh",
    "Rajasthan",
    "Madhya Pradesh",
    "Punjab",
    "Andhra Pradesh",
    "West Bengal",
    "Telangana",
    "Bihar",
    "Haryana",
    "Kerala",
    "Odisha",
    "Assam",
    "Other",
  ];

  const loanPurposeOptions = [
    "Working Capital",
    "Equipment Purchase",
    "Business Expansion",
    "Raw Material Procurement",
    "Infrastructure Development",
    "Other",
  ];

  return (
    <section id="section-credit" className="scroll-mt-24 w-full space-y-6 text-left">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-100 text-[#14532D]">
              <CreditCard className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
              Section 4 • Credit &amp; Scheme Finder
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Credit &amp; Scheme Finder
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Tell us about your business — we&apos;ll find the loan and government schemes you may qualify for.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#14532D] text-xs font-bold shadow-2xs">
          <span>{matchedSchemes.length} Schemes Matched</span>
        </div>
      </div>

      {/* Honest Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-700 flex items-start gap-3 shadow-2xs">
        <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-900">Eligibility Notice:</strong> This tool estimates scheme eligibility based on publicly available criteria. It is not a guarantee of loan approval or scheme sanction — final eligibility is determined by the respective lender or government body.
        </p>
      </div>

      {/* Main Grid: 10-Field Business Eligibility Form (Left) & Results Display (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 10-Field Business Eligibility Form (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#14532D]" />
                Business Profile &amp; Requirements
              </h4>
              <span className="text-[10.5px] font-bold text-slate-400 uppercase">Step 1</span>
            </div>

            {/* 2-Column Responsive Input Form */}
            <div className="space-y-3.5">
              
              {/* Row 1: Business Type & State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Business Sector / Type
                  </label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    {businessTypeOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Location / State
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    {stateOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Business Size & Annual Turnover */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Business Scale (Udyam)
                  </label>
                  <select
                    value={businessSize}
                    onChange={(e) => setBusinessSize(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Micro">Micro (&lt; ₹5 Cr Turnover)</option>
                    <option value="Small">Small (₹5–50 Cr Turnover)</option>
                    <option value="Medium">Medium (₹50–250 Cr Turnover)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Annual Turnover (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-400 text-xs font-bold">₹</span>
                    <input
                      type="number"
                      value={annualTurnover}
                      onChange={(e) => setAnnualTurnover(parseFloat(e.target.value) || 0)}
                      className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Business Age & Loan Amount Needed */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Business Age (Years)
                  </label>
                  <input
                    type="number"
                    value={businessAgeYears}
                    onChange={(e) => setBusinessAgeYears(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <span className="text-[9.5px] text-slate-400 block mt-0.5">Years operational</span>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Loan Amount Needed (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-400 text-xs font-bold">₹</span>
                    <input
                      type="number"
                      value={loanAmountNeeded}
                      onChange={(e) => setLoanAmountNeeded(parseFloat(e.target.value) || 0)}
                      className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <span className="text-[9.5px] text-slate-400 block mt-0.5">
                    ₹{(loanAmountNeeded / 100000).toFixed(1)} Lakh
                  </span>
                </div>
              </div>

              {/* Row 4: Purpose of Loan & Existing Loans */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Purpose of Loan
                  </label>
                  <select
                    value={loanPurpose}
                    onChange={(e) => setLoanPurpose(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    {loanPurposeOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Existing Loans / Debt (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-400 text-xs font-bold">₹</span>
                    <input
                      type="number"
                      value={existingLoans}
                      onChange={(e) => setExistingLoans(parseFloat(e.target.value) || 0)}
                      className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>
              </div>

              {/* Row 5: Udyam & GST Yes/No Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1.5">
                    Udyam Registration
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setHasUdyam(true)}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        hasUdyam
                          ? "bg-[#14532D] text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" /> Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasUdyam(false)}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        !hasUdyam
                          ? "bg-slate-700 text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <X className="w-3.5 h-3.5" /> No
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1.5">
                    GST Registration
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setHasGst(true)}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        hasGst
                          ? "bg-[#14532D] text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" /> Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasGst(false)}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        !hasGst
                          ? "bg-slate-700 text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <X className="w-3.5 h-3.5" /> No
                    </button>
                  </div>
                </div>
              </div>

            </div>

            <Button
              onClick={handleFindSchemes}
              className="w-full bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-bold rounded-xl py-3 shadow-xs cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <Search className="w-4 h-4" />
              <span>Find Matching Schemes</span>
            </Button>
          </div>
        </div>

        {/* Right Column: Matched Schemes Results (Primary Hero) & Supporting Readiness (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>{matchedSchemes.length} Scheme{matchedSchemes.length === 1 ? "" : "s"} Matched</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Ranked by qualification score
            </span>
          </div>

          {/* Matched Schemes List */}
          {matchedSchemes.length === 0 ? (
            /* Helpful Empty State */
            <div className="p-8 rounded-3xl bg-white border-2 border-dashed border-slate-200 text-center space-y-3 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <h4 className="font-bold text-sm sm:text-base text-slate-900">
                  No Schemes Matched Your Current Profile
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Common reasons: Requested loan amount exceeds scheme caps (e.g. &gt; ₹5 Cr), or turnover outside eligible MSME parameters.
                </p>
                <div className="pt-2 text-[11.5px] text-slate-600 space-y-1 text-left bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <p className="font-bold text-slate-700">Recommended adjustments:</p>
                  <p>• Try reducing requested loan amount within MUDRA (₹10L) or CGTMSE (₹5Cr) thresholds</p>
                  <p>• Toggle Udyam registration to &quot;Yes&quot; to unlock sovereign guarantee programs</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {matchedSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-3.5 text-left"
                >
                  {/* Card Header: Name + Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-0.5">
                        {scheme.ministryOrBody}
                      </span>
                      <h4 className="font-extrabold text-base text-slate-900 leading-tight">
                        {scheme.schemeName}
                      </h4>
                    </div>

                    {/* Match Level Badge */}
                    <span
                      className={`text-xs font-extrabold px-3 py-1 rounded-full border shrink-0 flex items-center gap-1.5 w-fit ${
                        scheme.matchLevel === "High Match"
                          ? "bg-emerald-100 text-[#14532D] border-emerald-300 shadow-2xs"
                          : scheme.matchLevel === "Good Match"
                          ? "bg-blue-100 text-blue-800 border-blue-300 shadow-2xs"
                          : "bg-amber-100 text-amber-800 border-amber-300 shadow-2xs"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{scheme.matchLevel} ({scheme.scorePct}%)</span>
                    </span>
                  </div>

                  {/* Highlight Benefit Pill */}
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-950 font-bold text-xs flex items-center justify-between gap-2">
                    <span>{scheme.maxLoanOrSubsidyText}</span>
                    <span className="text-[10.5px] text-emerald-800 font-semibold bg-white/80 px-2 py-0.5 rounded-lg shrink-0">
                      {scheme.category}
                    </span>
                  </div>

                  {/* Deterministic Match Reasons */}
                  <div className="space-y-1.5 text-xs text-slate-700">
                    <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      You match because:
                    </span>
                    <p className="text-slate-800 leading-relaxed font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      You match because of your business type (<strong>{businessType}</strong>), turnover (<strong>₹{(annualTurnover / 100000).toFixed(1)} Lakh</strong>), and {scheme.matchReasons.join(". ")}.
                    </p>
                  </div>

                  {/* Missing Requirements Sub-section (if any) */}
                  {scheme.missingRequirements.length > 0 && (
                    <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-1 text-xs text-amber-950">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>To fully qualify:</span>
                      </div>
                      <div className="space-y-0.5 pl-5">
                        {scheme.missingRequirements.map((req, idx) => (
                          <div key={idx} className="list-disc font-medium text-[11.5px]">
                            • {req}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Card Footer: Action Link-Out */}
                  <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {scheme.benefitSummary}
                    </p>
                    <a
                      href={scheme.officialLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-bold shadow-2xs transition-colors shrink-0 cursor-pointer"
                    >
                      <span>Learn More / Apply</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. DEMOTED SUPPORTING SCORE & FINANCIAL DETAIL (Placed Below Results) */}
          <div className="p-6 rounded-3xl bg-slate-50/90 border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#14532D] text-white flex flex-col items-center justify-center font-extrabold shadow-sm">
                  <span className="text-lg leading-none">{computedScore}</span>
                  <span className="text-[8px] text-emerald-200 uppercase">/ 100</span>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">
                    Overall Financial Preparedness: {computedScore}/100
                  </h4>
                  <p className="text-xs text-slate-500">
                    Composite benchmark across debt ratio, turnover, Udyam, and tax standing.
                  </p>
                </div>
              </div>

              <span className="text-xs font-extrabold text-[#14532D] bg-emerald-100 px-3 py-1 rounded-full">
                Pre-screened
              </span>
            </div>

            {/* Separated Strong vs Watchlist Factors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Strong Areas */}
              <div className="p-3.5 rounded-2xl bg-white border border-emerald-200 space-y-1.5 shadow-2xs">
                <span className="text-[11px] font-extrabold text-[#14532D] uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Strong Credit Factors
                </span>
                <div className="space-y-1 pt-0.5">
                  {store.credit.strongAreas.length > 0 ? (
                    store.credit.strongAreas.map((area, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-800 font-medium">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{area}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-[11px] text-slate-500">Click &quot;Find Matching Schemes&quot; to audit profile</p>
                  )}
                </div>
              </div>

              {/* Weak Areas */}
              <div className="p-3.5 rounded-2xl bg-white border border-amber-200 space-y-1.5 shadow-2xs">
                <span className="text-[11px] font-extrabold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Improvement Watchlist
                </span>
                <div className="space-y-1 pt-0.5">
                  {store.credit.weakAreas.length > 0 ? (
                    store.credit.weakAreas.map((area, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-800 font-medium">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{area}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-[11px] text-slate-500">No major negative credit indicators flagged</p>
                  )}
                </div>
              </div>

            </div>

            {/* What to Improve Actions */}
            {store.credit.improvementActions.length > 0 && (
              <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  Actionable Steps to Expand Eligibility
                </span>
                <div className="space-y-1.5">
                  {store.credit.improvementActions.map((action, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200/80 flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-[11.5px] text-slate-800 font-medium">
                        {action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
