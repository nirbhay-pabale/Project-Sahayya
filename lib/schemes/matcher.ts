import { BusinessProfile, SchemeMatch, MatchLevel } from "./types";

/**
 * Pure rule-based matching engine that evaluates a business profile
 * against official government and banking MSME schemes.
 */
export function matchSchemes(profile: BusinessProfile): SchemeMatch[] {
  const matches: SchemeMatch[] = [];

  const isManufacturing =
    profile.businessType === "Manufacturing" ||
    profile.businessType === "Food Processing" ||
    profile.businessType === "Handicrafts & Artisans" ||
    profile.businessType === "Textiles & Apparel";

  const isService =
    profile.businessType === "Services" ||
    profile.businessType === "IT & Technical" ||
    profile.businessType === "Logistics";

  const isTrade =
    profile.businessType === "Trading / Retail" ||
    profile.businessType === "Wholesale";

  // -------------------------------------------------------------
  // 1. PM MUDRA Yojana (PMMY)
  // -------------------------------------------------------------
  if (profile.businessSize !== "Medium" && profile.loanAmountNeeded <= 2000000) {
    const reasons: string[] = [];
    const missing: string[] = [];

    if (profile.businessSize === "Micro" || profile.businessSize === "Small") {
      reasons.push("Micro/Small enterprise scale qualifies for 100% collateral-free coverage");
    }

    if (profile.loanAmountNeeded <= 1000000) {
      const tier =
        profile.loanAmountNeeded <= 50000
          ? "Shishu Tier (up to ₹50,000)"
          : profile.loanAmountNeeded <= 500000
          ? "Kishor Tier (₹50,000 to ₹5 Lakh)"
          : "Tarun Tier (₹5 Lakh to ₹10 Lakh)";
      reasons.push(`Loan request of ₹${profile.loanAmountNeeded.toLocaleString("en-IN")} fits the ${tier}`);
    } else {
      missing.push("Requested amount exceeds standard ₹10 Lakh MUDRA cap (Consider CGTMSE instead)");
    }

    if (
      profile.loanPurpose === "Working Capital" ||
      profile.loanPurpose === "Equipment Purchase" ||
      profile.loanPurpose === "Business Expansion" ||
      profile.loanPurpose === "Raw Material Procurement"
    ) {
      reasons.push(`Loan purpose (${profile.loanPurpose}) is an eligible productive activity`);
    }

    if (profile.businessAgeYears >= 0) {
      reasons.push("Eligible for both newly launched and operational enterprise units");
    }

    let matchLevel: MatchLevel = "Good Match";
    if (profile.loanAmountNeeded <= 1000000 && missing.length === 0) {
      matchLevel = "High Match";
    } else if (missing.length >= 2) {
      matchLevel = "Partial Match";
    }

    matches.push({
      id: "mudra",
      schemeName: "Pradhan Mantri MUDRA Yojana (PMMY)",
      ministryOrBody: "Department of Financial Services, MoF & SIDBI",
      matchLevel,
      scorePct: matchLevel === "High Match" ? 95 : matchLevel === "Good Match" ? 82 : 65,
      matchReasons: reasons,
      missingRequirements: missing,
      officialLink: "https://www.mudra.org.in",
      maxLoanOrSubsidyText: "Collateral-Free Loan up to ₹10 Lakh (Shishu, Kishor, Tarun)",
      category: "Finance",
      description: "Collateral-free loans for non-corporate, non-farm small and micro enterprises across manufacturing, services, and trade.",
      benefitSummary: "Zero collateral, subsidized interest subvention, seamless sanction via scheduled commercial banks & NBFCs.",
      requiredDocs: ["Applicant ID & Address Proof", "Business Address Proof", "Quotation for Machinery / Stock (if applicable)", "Bank Account Statement (6 Months)"],
    });
  }

  // -------------------------------------------------------------
  // 2. CGTMSE (Credit Guarantee Fund Trust for MSEs)
  // -------------------------------------------------------------
  if (profile.businessSize !== "Medium" && profile.loanAmountNeeded <= 60000000) {
    const reasons: string[] = [];
    const missing: string[] = [];

    if (isManufacturing || isService || profile.businessType === "Agriculture & Allied") {
      reasons.push(`Sector (${profile.businessType}) is fully covered under the credit guarantee framework`);
    } else if (isTrade) {
      reasons.push("Trading activity is covered under the enhanced ₹1 Crore retail/wholesale window");
    }

    if (profile.loanAmountNeeded <= 50000000) {
      reasons.push(`Loan ticket size of ₹${(profile.loanAmountNeeded / 100000).toFixed(1)} Lakh is within the ₹5 Crore guarantee window`);
    } else {
      missing.push("Loan amount exceeds standard ₹5 Crore CGTMSE guarantee limit");
    }

    if (profile.hasUdyam) {
      reasons.push("Active Udyam registration satisfies the primary statutory guarantee prerequisite");
    } else {
      missing.push("Udyam registration certificate is required for CGTMSE guarantee enrollment");
    }

    if (profile.hasGst) {
      reasons.push("Active GSTIN enables automated lender credit assessment");
    } else {
      missing.push("GST registration recommended by scheduled commercial lenders for underwriting");
    }

    let matchLevel: MatchLevel = "Good Match";
    if (profile.hasUdyam && profile.loanAmountNeeded <= 50000000 && missing.length <= 1) {
      matchLevel = profile.hasGst ? "High Match" : "Good Match";
    } else if (!profile.hasUdyam && missing.length >= 2) {
      matchLevel = "Partial Match";
    }

    matches.push({
      id: "cgtmse",
      schemeName: "Credit Guarantee Fund Scheme for Micro & Small Enterprises (CGTMSE)",
      ministryOrBody: "Ministry of MSME & SIDBI",
      matchLevel,
      scorePct: matchLevel === "High Match" ? 96 : matchLevel === "Good Match" ? 85 : 68,
      matchReasons: reasons,
      missingRequirements: missing,
      officialLink: "https://www.cgtmse.in",
      maxLoanOrSubsidyText: "Collateral-Free Credit Guarantee up to ₹5 Crore",
      category: "Finance",
      description: "Enables micro and small enterprises to access collateral-free institutional credit with up to 85% sovereign guarantee coverage.",
      benefitSummary: "Zero third-party collateral or personal asset pledging required from the business owner.",
      requiredDocs: ["Udyam Registration Certificate", "GST Returns (Latest 6 Months)", "Audited Financial Statements (Last 2 Years)", "Project / Expansion Report"],
    });
  }

  // -------------------------------------------------------------
  // 3. PMEGP (Prime Minister's Employment Generation Programme)
  // -------------------------------------------------------------
  if (profile.businessSize === "Micro" && (isManufacturing || isService)) {
    const reasons: string[] = [];
    const missing: string[] = [];

    if (profile.businessAgeYears <= 5) {
      reasons.push(`Young enterprise (age ${profile.businessAgeYears} yrs) qualifies for primary employment generation capital`);
    } else {
      missing.push("PMEGP is primarily designed for newly established units or first-time expansion");
    }

    if (isManufacturing) {
      reasons.push("Manufacturing profile is eligible for project cost ceiling up to ₹50 Lakh");
      if (profile.loanAmountNeeded > 5000000) {
        missing.push("Loan amount requested exceeds ₹50 Lakh manufacturing project limit");
      }
    } else if (isService) {
      reasons.push("Service profile is eligible for project cost ceiling up to ₹20 Lakh");
      if (profile.loanAmountNeeded > 2000000) {
        missing.push("Loan amount requested exceeds ₹20 Lakh service project limit");
      }
    }

    if (profile.hasUdyam) {
      reasons.push("Udyam registration satisfies nodal agency verification");
    } else {
      missing.push("Udyam registration required for margin money subsidy disbursement");
    }

    reasons.push("Eligible for 15% to 35% government capital subsidy on project cost");

    let matchLevel: MatchLevel = "Good Match";
    if (profile.businessAgeYears <= 5 && profile.hasUdyam && missing.length === 0) {
      matchLevel = "High Match";
    } else if (missing.length >= 2) {
      matchLevel = "Partial Match";
    }

    matches.push({
      id: "pmegp",
      schemeName: "Prime Minister's Employment Generation Programme (PMEGP)",
      ministryOrBody: "KVIC & Ministry of MSME",
      matchLevel,
      scorePct: matchLevel === "High Match" ? 92 : matchLevel === "Good Match" ? 80 : 64,
      matchReasons: reasons,
      missingRequirements: missing,
      officialLink: "https://www.kviconline.gov.in/pmegpeportal/",
      maxLoanOrSubsidyText: "15% to 35% Capital Margin Money Subsidy (up to ₹50 Lakh)",
      category: "Finance",
      description: "Credit-linked subsidy program aimed at generating self-employment opportunities through micro-enterprise establishment.",
      benefitSummary: "Up to 35% non-refundable government subsidy in rural areas (25% in urban areas) on bank-financed projects.",
      requiredDocs: ["Project DPR (Detailed Project Report)", "Udyam Registration Certificate", "Caste/Category Certificate (for special subsidies)", "Highest Educational Qualification"],
    });
  }

  // -------------------------------------------------------------
  // 4. Stand-Up India Scheme
  // -------------------------------------------------------------
  if (profile.loanAmountNeeded >= 500000 && profile.loanAmountNeeded <= 15000000) {
    const reasons: string[] = [];
    const missing: string[] = [];

    if (profile.loanAmountNeeded >= 1000000 && profile.loanAmountNeeded <= 10000000) {
      reasons.push(`Loan requirement (₹${(profile.loanAmountNeeded / 100000).toFixed(1)} Lakh) matches the ₹10 Lakh to ₹1 Crore ticket bracket`);
    } else if (profile.loanAmountNeeded < 1000000) {
      missing.push("Minimum ticket size under Stand-Up India is ₹10 Lakh (Consider MUDRA for smaller tickets)");
    } else {
      missing.push("Loan amount requested exceeds ₹1 Crore Stand-Up India ceiling");
    }

    if (
      profile.loanPurpose === "Business Expansion" ||
      profile.loanPurpose === "Equipment Purchase" ||
      profile.loanPurpose === "Infrastructure Development" ||
      profile.loanPurpose === "Working Capital"
    ) {
      reasons.push(`Purpose (${profile.loanPurpose}) matches capital expansion guidelines`);
    }

    if (profile.hasUdyam) {
      reasons.push("Active Udyam registration confirmed");
    } else {
      missing.push("Udyam registration required");
    }

    let matchLevel: MatchLevel = "Good Match";
    if (profile.loanAmountNeeded >= 1000000 && profile.loanAmountNeeded <= 10000000 && profile.hasUdyam) {
      matchLevel = "High Match";
    } else if (missing.length >= 2) {
      matchLevel = "Partial Match";
    }

    matches.push({
      id: "standup",
      schemeName: "Stand-Up India Enterprise Scheme",
      ministryOrBody: "Department of Financial Services & SIDBI",
      matchLevel,
      scorePct: matchLevel === "High Match" ? 90 : matchLevel === "Good Match" ? 78 : 62,
      matchReasons: reasons,
      missingRequirements: missing,
      officialLink: "https://www.standupmitra.in",
      maxLoanOrSubsidyText: "Composite Loan from ₹10 Lakh to ₹1 Crore",
      category: "Finance",
      description: "Bank loans between ₹10 Lakh and ₹1 Crore to facilitate greenfield enterprise creation across manufacturing, services, and trading.",
      benefitSummary: "Composite loan covering 75% to 85% of project cost (term loan + working capital component).",
      requiredDocs: ["Business Incorporation / Registration Proof", "Udyam Certificate", "Project Report with Financial Forecast", "Bank Statement (Last 6 Months)"],
    });
  }

  // -------------------------------------------------------------
  // 5. MSME Sustainable (ZED) Certification & Subsidy Scheme
  // -------------------------------------------------------------
  if (isManufacturing) {
    const reasons: string[] = [];
    const missing: string[] = [];

    reasons.push("Manufacturing profile qualifies for ZED Bronze/Silver/Gold assessment and certification subsidy");

    if (profile.hasUdyam) {
      reasons.push("Active Udyam registration confirmed for portal subsidy claiming");
    } else {
      missing.push("Udyam registration is mandatory to unlock up to 80% ZED subsidy");
    }

    reasons.push("Subsidy: 80% for Micro, 60% for Small, and 50% for Medium enterprises");

    let matchLevel: MatchLevel = "Good Match";
    if (profile.hasUdyam) {
      matchLevel = "High Match";
    }

    matches.push({
      id: "zed",
      schemeName: "MSME Sustainable (ZED) Certification & Technology Subsidy",
      ministryOrBody: "Ministry of MSME & Quality Council of India",
      matchLevel,
      scorePct: matchLevel === "High Match" ? 98 : 75,
      matchReasons: reasons,
      missingRequirements: missing,
      officialLink: "https://zed.msme.gov.in",
      maxLoanOrSubsidyText: "Up to 80% Government Subsidy on Audits & Testing",
      category: "Compliance",
      description: "Zero Defect Zero Effect scheme subsidizes third-party quality audits, clean technology upgrades, and international testing.",
      benefitSummary: "Financial assistance up to ₹5 Lakh per MSME for technology upgradation and zero defect factory clearance.",
      requiredDocs: ["Udyam Registration Certificate", "Shop-Floor Self Assessment Dossier", "Plant Electricity Bill", "PAN Card"],
    });
  }

  // -------------------------------------------------------------
  // 6. PM Surya Ghar / MSME Industrial Solar Rooftop Grant
  // -------------------------------------------------------------
  if (
    isManufacturing ||
    profile.loanPurpose === "Infrastructure Development" ||
    profile.loanPurpose === "Equipment Purchase"
  ) {
    const reasons: string[] = [
      "Industrial electrical grid connection qualifies for captive solar installation grant",
      "Reduces recurring monthly factory power tariffs by up to 60%",
    ];
    const missing: string[] = [];

    if (!profile.hasUdyam) {
      missing.push("Udyam registration required for accelerated industrial depreciation benefit");
    }

    matches.push({
      id: "solar-msme",
      schemeName: "PM Surya Ghar / MSME Industrial Solar Rooftop Grant",
      ministryOrBody: "Ministry of New and Renewable Energy (MNRE)",
      matchLevel: profile.hasUdyam ? "High Match" : "Good Match",
      scorePct: profile.hasUdyam ? 90 : 78,
      matchReasons: reasons,
      missingRequirements: missing,
      officialLink: "https://pmsuryaghar.gov.in",
      maxLoanOrSubsidyText: "Up to 40% Capital Subsidy for Captive Industrial Solar",
      category: "Equipment",
      description: "Direct capital subsidy for industrial units to install rooftop captive solar plants up to 500 kW capacity.",
      benefitSummary: "Significant reduction in operating overheads with accelerated 40% tax depreciation benefits.",
      requiredDocs: ["Latest Industrial Electricity Bill", "Factory Roof Ownership / Long Lease Deed", "DISCOM Connection Approval"],
    });
  }

  // Sort matches by matchLevel priority: High Match > Good Match > Partial Match
  const levelOrder: Record<MatchLevel, number> = {
    "High Match": 1,
    "Good Match": 2,
    "Partial Match": 3,
    "Not Eligible": 4,
  };

  return matches.sort((a, b) => {
    const diff = levelOrder[a.matchLevel] - levelOrder[b.matchLevel];
    if (diff !== 0) return diff;
    return b.scorePct - a.scorePct;
  });
}
