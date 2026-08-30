import { BusinessSnapshot, SimulationInputs, SimulationResult } from "./types";
import { assessRisk } from "./risk";

/**
 * Transparent, explainable formula-based business simulation engine.
 */
export function runSimulation(
  current: BusinessSnapshot,
  inputs: SimulationInputs,
  customQuery?: string
): SimulationResult {
  const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // 1. Calculate Production & Capacity
  const afterProduction = Math.max(
    100,
    Math.round(current.currentMonthlyProduction * (1 + inputs.productionChangePct / 100))
  );
  const afterCapacityUtil = Number(((afterProduction / Math.max(1, current.maxProductionCapacity)) * 100).toFixed(1));

  // 2. Calculate Pricing & Revenue
  const effectivePrice = current.unitSellingPrice * (1 + inputs.priceChangePct / 100);
  const sellThroughRate = inputs.priceChangePct > 15 ? 0.92 : inputs.priceChangePct < -5 ? 0.99 : 0.96;
  const afterRevenue = Math.round(afterProduction * effectivePrice * sellThroughRate);

  // 3. Calculate Material & Labor Costs
  const effectiveMaterialCost = current.unitMaterialCost * (1 + inputs.materialCostChangePct / 100);
  const totalMaterialExpense = Math.round(afterProduction * effectiveMaterialCost);
  const requiredMaterialKg = Math.round(afterProduction * 1.5);

  const effectiveWorkers = Math.max(1, current.workerCount + inputs.workerCountChange);
  const laborExpense = Math.round(effectiveWorkers * (inputs.workingHoursPerDay / 8) * 16500);

  // 4. Calculate Quality Strain
  const speedStrain = afterCapacityUtil > 90 ? (afterCapacityUtil - 90) * 0.12 : 0;
  const baseDefectRate = Math.max(0, current.currentDefectRatePct * (1 + inputs.defectRateChangePct / 100));
  const afterDefectRate = Number(Math.max(0, Math.min(25, baseDefectRate + speedStrain)).toFixed(1));
  const defectExpense = Math.round((afterDefectRate / 100) * afterRevenue * 0.55);

  // 5. Compute Profit & Outlays
  const afterProfit = Math.round(afterRevenue - totalMaterialExpense - laborExpense - defectExpense);
  const upfrontOutlay = Math.round(totalMaterialExpense * 0.8 + laborExpense * 0.5);

  // Baseline Metrics
  const beforeCapacityUtil = Number(((current.currentMonthlyProduction / Math.max(1, current.maxProductionCapacity)) * 100).toFixed(1));
  const beforeMaterials = Math.round(current.currentMonthlyProduction * current.unitMaterialCost);
  const beforeLabor = Math.round(current.workerCount * (current.workingHoursPerDay / 8) * 16500);
  const beforeDefectExp = Math.round((current.currentDefectRatePct / 100) * current.currentMonthlyRevenue * 0.55);
  const beforeProfit = Math.round(current.currentMonthlyRevenue - beforeMaterials - beforeLabor - beforeDefectExp);

  // Deltas
  const productionDeltaPct = inputs.productionChangePct;
  const revenueDeltaAbs = afterRevenue - current.currentMonthlyRevenue;
  const revenueDeltaPct = Number(((revenueDeltaAbs / Math.max(1, current.currentMonthlyRevenue)) * 100).toFixed(1));
  const profitDeltaAbs = afterProfit - beforeProfit;
  const profitDeltaPct = Number(((profitDeltaAbs / Math.max(1, Math.abs(beforeProfit))) * 100).toFixed(1));
  const defectRateDeltaPct = Number((afterDefectRate - current.currentDefectRatePct).toFixed(1));

  // Risk Assessment
  const risks = assessRisk(
    afterCapacityUtil,
    inputs.workingHoursPerDay,
    upfrontOutlay,
    current.availableWorkingCapital,
    profitDeltaPct
  );

  // AI Recommendation Generation (Exact deterministic logic matching requirement)
  let recommendationType: "Proceed" | "Proceed with caution" | "Reconsider" = "Proceed";
  let aiRecommendation = "";

  if (risks.operationalRisk === "High" || risks.cashFlowRisk === "High") {
    if (risks.cashFlowRisk === "High" && risks.operationalRisk === "High") {
      recommendationType = "Reconsider";
      aiRecommendation = `Reconsider: Pushing production to ${afterProduction.toLocaleString("en-IN")} units (${afterCapacityUtil.toFixed(0)}% capacity) requires ₹${upfrontOutlay.toLocaleString("en-IN")} upfront outlay, which strains liquid capital and increases defect rates to ${afterDefectRate}%.`;
    } else if (risks.operationalRisk === "High") {
      recommendationType = "Proceed with caution";
      aiRecommendation = `Proceed with caution: Expand production by +${Math.min(35, Math.round(inputs.productionChangePct * 0.6))}% instead of ${inputs.productionChangePct}% to avoid exceeding the ${afterCapacityUtil.toFixed(0)}% safe shop-floor capacity limit.`;
    } else {
      recommendationType = "Proceed with caution";
      aiRecommendation = `Proceed with caution: Secure ₹${(upfrontOutlay - current.availableWorkingCapital).toLocaleString("en-IN")} in trade credit before dispatching ${afterProduction.toLocaleString("en-IN")} units to safeguard working capital.`;
    }
  } else if (profitDeltaPct >= 15) {
    recommendationType = "Proceed";
    aiRecommendation = `Proceed: Expansion generates +₹${profitDeltaAbs.toLocaleString("en-IN")} net monthly profit at a manageable ${afterCapacityUtil.toFixed(0)}% capacity utilization.`;
  } else if (profitDeltaPct < 0) {
    recommendationType = "Reconsider";
    aiRecommendation = `Reconsider: Proposed cost structure and pricing reduce net monthly profit by ₹${Math.abs(profitDeltaAbs).toLocaleString("en-IN")}.`;
  } else {
    recommendationType = "Proceed";
    aiRecommendation = `Proceed: Scenario yields steady operations with ₹${afterRevenue.toLocaleString("en-IN")} monthly turnover and stable quality metrics.`;
  }

  // 5-Point Dossier Strings
  const queryText =
    customQuery ||
    `What if production is changed by ${inputs.productionChangePct >= 0 ? "+" : ""}${inputs.productionChangePct}% with ${inputs.priceChangePct >= 0 ? "+" : ""}${inputs.priceChangePct}% price change?`;

  const demandImpact =
    inputs.productionChangePct >= 0
      ? `Produces ${Math.abs(afterProduction - current.currentMonthlyProduction).toLocaleString("en-IN")} additional finished units to capture surging regional market orders.`
      : `Scales down output by ${Math.abs(afterProduction - current.currentMonthlyProduction).toLocaleString("en-IN")} units to prevent inventory accumulation during lean cycles.`;

  const inventoryImpact = `Requires procurement of ${requiredMaterialKg.toLocaleString("en-IN")} kg raw materials buffer and ${effectiveWorkers} active shop-floor workers.`;

  const costImpact = `Estimated ₹${upfrontOutlay.toLocaleString("en-IN")} upfront material & power expenses with ₹${laborExpense.toLocaleString("en-IN")}/mo labor commitment.`;

  const capacityImpact = `Shop-floor utilization shifts to ${afterCapacityUtil.toFixed(0)}% (${afterProduction.toLocaleString("en-IN")} of ${current.maxProductionCapacity.toLocaleString("en-IN")} max units/mo).`;

  const qualityRiskImpact =
    afterDefectRate > current.currentDefectRatePct
      ? `Elevated defect risk (${afterDefectRate}% vs ${current.currentDefectRatePct}% baseline): High-speed manufacturing requires dedicated quality spot-checks.`
      : `Defect rate remains stable at ${afterDefectRate}%, maintaining zero-defect export packaging standards.`;

  const overallSummary =
    profitDeltaAbs >= 0
      ? `Highly profitable decision: Net estimated enterprise revenue increases by ₹${revenueDeltaAbs.toLocaleString("en-IN")}, generating ₹${profitDeltaAbs.toLocaleString("en-IN")} additional monthly profit.`
      : `Sub-optimal margin outcome: Net enterprise profit contracts by ₹${Math.abs(profitDeltaAbs).toLocaleString("en-IN")}. Adjust variable pricing or material costs.`;

  return {
    id: `SIM-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    query: queryText,
    timestamp,
    inputs,
    before: {
      productionUnits: current.currentMonthlyProduction,
      revenue: current.currentMonthlyRevenue,
      defectRatePct: current.currentDefectRatePct,
      monthlyProfit: beforeProfit,
      capacityUtilizationPct: beforeCapacityUtil,
    },
    after: {
      productionUnits: afterProduction,
      revenue: afterRevenue,
      defectRatePct: afterDefectRate,
      monthlyProfit: afterProfit,
      capacityUtilizationPct: afterCapacityUtil,
      requiredMaterialKg,
      upfrontCostOutlay: upfrontOutlay,
    },
    deltas: {
      productionDeltaPct,
      revenueDeltaPct,
      defectRateDeltaPct,
      profitDeltaPct,
      revenueDeltaAbs,
      profitDeltaAbs,
    },
    risks,
    aiRecommendation,
    recommendationType,
    demandImpact,
    inventoryImpact,
    costImpact,
    capacityImpact,
    qualityRiskImpact,
    overallSummary,
  };
}

/**
 * Best Scenario Finder: Brute-force deterministic evaluation across variable spreads.
 */
export function findBestScenario(current: BusinessSnapshot): {
  bestResult: SimulationResult;
  testedCount: number;
  reasons: string[];
} {
  const candidateProductionChanges = [-20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80];
  let bestResult: SimulationResult | null = null;
  let bestScore = -Infinity;

  candidateProductionChanges.forEach((prodChange) => {
    // Sensible multi-variable tuning per band
    const priceChange = prodChange > 30 ? 2 : prodChange < 0 ? -2 : 0;
    const matChange = prodChange > 40 ? 3 : 0;
    const workerChange = prodChange >= 40 ? 3 : prodChange >= 20 ? 1 : 0;
    const defectChange = prodChange > 50 ? 5 : -5;

    const candidateInputs: SimulationInputs = {
      productionChangePct: prodChange,
      priceChangePct: priceChange,
      materialCostChangePct: matChange,
      workerCountChange: workerChange,
      workingHoursPerDay: prodChange > 50 ? 10 : 8,
      defectRateChangePct: defectChange,
    };

    const res = runSimulation(current, candidateInputs, `Optimized Strategy (${prodChange >= 0 ? "+" : ""}${prodChange}%)`);

    // Weighted scoring formula
    let score = res.deltas.profitDeltaPct * 1.8;
    if (res.risks.operationalRisk === "High") score -= 55;
    if (res.risks.operationalRisk === "Medium") score -= 15;
    if (res.risks.cashFlowRisk === "High") score -= 50;
    if (res.risks.cashFlowRisk === "Medium") score -= 15;
    score -= res.after.defectRatePct * 3.5;

    if (score > bestScore) {
      bestScore = score;
      bestResult = res;
    }
  });

  const best = bestResult || runSimulation(current, {
    productionChangePct: 35,
    priceChangePct: 0,
    materialCostChangePct: 0,
    workerCountChange: 1,
    workingHoursPerDay: 8,
    defectRateChangePct: -5,
  });

  const reasons = [
    `Delivers highest net profit expansion (+₹${best.deltas.profitDeltaAbs.toLocaleString("en-IN")}/mo)`,
    `Maintains safe ${best.after.capacityUtilizationPct.toFixed(0)}% shop-floor utilization without machine overload`,
    `Upfront outlay of ₹${best.after.upfrontCostOutlay.toLocaleString("en-IN")} remains within liquid cash limits`,
  ];

  return {
    bestResult: best,
    testedCount: candidateProductionChanges.length,
    reasons,
  };
}
