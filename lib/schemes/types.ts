export interface BusinessProfile {
  businessType: string; // "Manufacturing" | "Food Processing" | "Handicrafts & Artisans" | "Services" | "Trading / Retail" | "Agriculture & Allied" | "Other"
  state: string;
  businessSize: "Micro" | "Small" | "Medium";
  annualTurnover: number; // in ₹
  businessAgeYears: number; // in years
  loanAmountNeeded: number; // in ₹
  loanPurpose: string; // "Working Capital" | "Equipment Purchase" | "Business Expansion" | "Raw Material Procurement" | "Infrastructure Development" | "Other"
  existingLoans: number; // in ₹
  hasUdyam: boolean;
  hasGst: boolean;
}

export type MatchLevel = "High Match" | "Good Match" | "Partial Match" | "Not Eligible";

export interface SchemeMatch {
  id: string;
  schemeName: string;
  ministryOrBody: string;
  matchLevel: MatchLevel;
  scorePct: number;
  matchReasons: string[];
  missingRequirements: string[];
  officialLink: string;
  maxLoanOrSubsidyText: string;
  category: "Finance" | "Equipment" | "Growth" | "Compliance";
  description: string;
  benefitSummary: string;
  requiredDocs: string[];
}
