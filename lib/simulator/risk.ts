import { RiskAssessment, RiskLevel } from "./types";

/**
 * Pure rule-based risk and reward assessment engine.
 */
export function assessRisk(
  capacityUtilizationPct: number,
  workingHoursPerDay: number,
  upfrontCostOutlay: number,
  availableCapital: number,
  profitDeltaPct: number
): RiskAssessment {
  // 1. Operational Risk: Capacity utilization > 90% or hours >= 12 increases risk
  let operationalRisk: RiskLevel = "Low";
  let operationalExplanation = `Operating at safe ${capacityUtilizationPct.toFixed(0)}% shop-floor capacity (${workingHoursPerDay} hrs/day).`;

  if (capacityUtilizationPct > 95 || workingHoursPerDay >= 14) {
    operationalRisk = "High";
    operationalExplanation = `Extreme load (${capacityUtilizationPct.toFixed(0)}% capacity, ${workingHoursPerDay}h shift) elevates machine breakdown & safety risks.`;
  } else if (capacityUtilizationPct > 85 || workingHoursPerDay >= 10) {
    operationalRisk = "Medium";
    operationalExplanation = `Moderate capacity stretch (${capacityUtilizationPct.toFixed(0)}%). Recommend staggered operator rotations.`;
  }

  // 2. Cash-Flow Risk: Upfront outlay vs available working capital
  let cashFlowRisk: RiskLevel = "Low";
  let cashFlowExplanation = `Outlay (₹${upfrontCostOutlay.toLocaleString("en-IN")}) is comfortably backed by available reserves.`;
  const capitalRatio = upfrontCostOutlay / Math.max(50000, availableCapital);

  if (capitalRatio > 1.2) {
    cashFlowRisk = "High";
    cashFlowExplanation = `Outlay (₹${upfrontCostOutlay.toLocaleString("en-IN")}) exceeds working capital buffer (₹${availableCapital.toLocaleString("en-IN")}).`;
  } else if (capitalRatio > 0.75) {
    cashFlowRisk = "Medium";
    cashFlowExplanation = `Outlay uses ${(capitalRatio * 100).toFixed(0)}% of available capital buffer. Requires timely trade receivables collection.`;
  }

  // 3. Profit Potential
  let profitPotential: RiskLevel = "Medium";
  let profitExplanation = `Steady profit growth (+${profitDeltaPct.toFixed(0)}%) expected.`;

  if (profitDeltaPct >= 20) {
    profitPotential = "High";
    profitExplanation = `Strong net margin expansion (+${profitDeltaPct.toFixed(0)}%) projected.`;
  } else if (profitDeltaPct <= 3) {
    profitPotential = "Low";
    profitExplanation = `Minimal profit increment (+${profitDeltaPct.toFixed(0)}%) may not offset execution friction.`;
  }

  return {
    profitPotential,
    operationalRisk,
    cashFlowRisk,
    profitExplanation,
    operationalExplanation,
    cashFlowExplanation,
  };
}
