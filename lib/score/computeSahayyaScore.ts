import { ModuleResultsStore } from "@/lib/context/ModuleResultsContext";

export interface ScorePillar {
  name: string;
  score: number;
  weight: number;
  status: "Excellent" | "Good" | "Needs Attention" | "Critical";
  tip: string;
}

export interface ComputedSahayyaScore {
  overallScore: number; // 0-100
  ratingTier: "Gold Standard (A+)" | "High Growth (A)" | "Moderate Health (B)" | "Action Required (C)";
  biggestImprovementArea: {
    name: string;
    score: number;
    actionTip: string;
  };
  pillars: ScorePillar[];
}

export function computeSahayyaScore(store: ModuleResultsStore): ComputedSahayyaScore {
  const safetyScore = store.safety.overallScore;
  const qualityScore = store.quality.qualityScore;
  const demandScore = Math.min(100, Math.round(store.demand.growthPercent * 3.5 + 40));
  const creditScore = store.credit.score;
  const complianceScore = store.compliance.overallScore;
  const patentScore = store.patent.readinessScore;

  const pillars: ScorePillar[] = [
    {
      name: "Safety Intelligence",
      score: safetyScore,
      weight: 0.2,
      status: safetyScore >= 85 ? "Excellent" : safetyScore >= 70 ? "Good" : "Needs Attention",
      tip: store.safety.activeViolationsCount > 0 ? "Resolve PPE infractions in high-heat zones" : "All floor safety checks passed",
    },
    {
      name: "Quality Assurance",
      score: qualityScore,
      weight: 0.2,
      status: qualityScore >= 90 ? "Excellent" : qualityScore >= 75 ? "Good" : "Needs Attention",
      tip: `Defect rate at ${store.quality.defectPercent}%. Monthly loss estimated ₹${store.quality.estimatedMonthlyLoss.toLocaleString("en-IN")}`,
    },
    {
      name: "Demand & Production",
      score: demandScore,
      weight: 0.15,
      status: demandScore >= 80 ? "Excellent" : demandScore >= 65 ? "Good" : "Needs Attention",
      tip: store.demand.shortageUnits > 0 ? `Anticipate ${store.demand.shortageUnits} units buffer shortfall` : "Inventory is fully balanced",
    },
    {
      name: "Credit Readiness",
      score: creditScore,
      weight: 0.15,
      status: creditScore >= 80 ? "Excellent" : creditScore >= 65 ? "Good" : "Needs Attention",
      tip: "Pre-screened for SIDBI & Mudra collateral-free windows",
    },
    {
      name: "Statutory Compliance",
      score: complianceScore,
      weight: 0.2,
      status: complianceScore >= 90 ? "Excellent" : complianceScore >= 75 ? "Good" : "Needs Attention",
      tip: "GSTR-1 and Factory Permit renewals on track",
    },
    {
      name: "IP & Innovation",
      score: patentScore,
      weight: 0.1,
      status: patentScore >= 80 ? "Excellent" : "Good",
      tip: "80% MSME statutory patent fee waiver certificate ready",
    },
  ];

  const weightedTotal = Math.round(
    pillars.reduce((acc, p) => acc + p.score * p.weight, 0)
  );

  let ratingTier: ComputedSahayyaScore["ratingTier"] = "High Growth (A)";
  if (weightedTotal >= 90) ratingTier = "Gold Standard (A+)";
  else if (weightedTotal >= 75) ratingTier = "High Growth (A)";
  else if (weightedTotal >= 60) ratingTier = "Moderate Health (B)";
  else ratingTier = "Action Required (C)";

  // Find lowest scoring pillar
  const lowestPillar = [...pillars].sort((a, b) => a.score - b.score)[0];

  return {
    overallScore: weightedTotal,
    ratingTier,
    biggestImprovementArea: {
      name: lowestPillar.name,
      score: lowestPillar.score,
      actionTip: lowestPillar.tip,
    },
    pillars,
  };
}
