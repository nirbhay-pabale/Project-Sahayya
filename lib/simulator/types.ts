export interface BusinessSnapshot {
  currentMonthlyProduction: number; // units/mo (e.g. 4,500)
  currentMonthlyRevenue: number; // ₹/mo (e.g. ₹6,75,000)
  currentDefectRatePct: number; // % (e.g. 0.0 or 3.2%)
  maxProductionCapacity: number; // units/mo (e.g. 6,000)
  unitSellingPrice: number; // ₹/unit (e.g. ₹150)
  unitMaterialCost: number; // ₹/unit (e.g. ₹65)
  workerCount: number; // (e.g. 12)
  workingHoursPerDay: number; // (e.g. 8)
  availableWorkingCapital: number; // ₹ (e.g. ₹2,50,000)
}

export interface SimulationInputs {
  productionChangePct: number; // -40% to +80%
  priceChangePct: number; // -20% to +30%
  materialCostChangePct: number; // -20% to +30%
  workerCountChange: number; // -5 to +15 workers
  workingHoursPerDay: number; // 6 to 16 hrs
  defectRateChangePct: number; // -20% to +20%
}

export type RiskLevel = "Low" | "Medium" | "High";

export interface RiskAssessment {
  profitPotential: RiskLevel;
  operationalRisk: RiskLevel;
  cashFlowRisk: RiskLevel;
  profitExplanation: string;
  operationalExplanation: string;
  cashFlowExplanation: string;
}

export interface SimulationResult {
  id: string;
  label?: string;
  query: string;
  timestamp: string;
  inputs: SimulationInputs;
  
  before: {
    productionUnits: number;
    revenue: number;
    defectRatePct: number;
    monthlyProfit: number;
    capacityUtilizationPct: number;
  };
  after: {
    productionUnits: number;
    revenue: number;
    defectRatePct: number;
    monthlyProfit: number;
    capacityUtilizationPct: number;
    requiredMaterialKg: number;
    upfrontCostOutlay: number;
  };
  deltas: {
    productionDeltaPct: number;
    revenueDeltaPct: number;
    defectRateDeltaPct: number;
    profitDeltaPct: number;
    revenueDeltaAbs: number;
    profitDeltaAbs: number;
  };

  risks: RiskAssessment;
  aiRecommendation: string;
  recommendationType: "Proceed" | "Proceed with caution" | "Reconsider";

  demandImpact: string;
  inventoryImpact: string;
  costImpact: string;
  capacityImpact: string;
  qualityRiskImpact: string;
  overallSummary: string;
}
