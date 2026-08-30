import { DemandAnalyzer, DemandInput, DemandForecastResult, MonthlyDataPoint } from "./types";

export class StaticDemandAnalyzer implements DemandAnalyzer {
  async analyze(input: DemandInput): Promise<DemandForecastResult> {
    const raw = input.monthlySeries && input.monthlySeries.length > 0 ? input.monthlySeries : [150, 175, 210];
    const unit = input.unitLabel || "units";

    // 1. Calculate MoM % growth rates
    const growthRates: number[] = [];
    for (let i = 1; i < raw.length; i++) {
      const prev = raw[i - 1];
      const curr = raw[i];
      if (prev > 0) {
        const rate = (curr - prev) / prev;
        growthRates.push(rate);
      }
    }

    const avgGrowthRate =
      growthRates.length > 0 ? growthRates.reduce((acc, val) => acc + val, 0) / growthRates.length : 0.08;

    const lastMonthVal = raw[raw.length - 1];
    const predictedUnits = Math.round(lastMonthVal * (1 + avgGrowthRate));
    const avgGrowthPercent = Math.round(avgGrowthRate * 100 * 10) / 10;

    let trendDirection: "rising" | "flat" | "falling" = "flat";
    if (avgGrowthPercent > 2) {
      trendDirection = "rising";
    } else if (avgGrowthPercent < -2) {
      trendDirection = "falling";
    }

    // 2. Build series for chart
    const monthNames = ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5"];
    const historicalData: MonthlyDataPoint[] = raw.map((val, idx) => ({
      month: monthNames[idx] || `M${idx + 1}`,
      sales: val,
      isForecast: false,
    }));

    // Add forecast point
    historicalData.push({
      month: "Next Month (Pred.)",
      sales: predictedUnits,
      isForecast: true,
    });

    // 3. Actionable tips lookup table
    let actionableTips: string[] = [];
    if (trendDirection === "rising") {
      actionableTips = [
        "Consider placing advance orders for raw materials to prevent stockouts.",
        "Ensure machine maintenance is scheduled during non-peak batch shifts.",
        "Evaluate hiring 1-2 temporary shift helpers to meet delivery timelines.",
      ];
    } else if (trendDirection === "falling") {
      actionableTips = [
        "Avoid overproduction — consider smaller batch sizes to minimize holding cost.",
        "Run promotional bundle offers with nearby retail mandis and distributors.",
        "Tighten inventory buffer on slow-moving raw materials.",
      ];
    } else {
      actionableTips = [
        "Maintain current batch production velocity with standard 15-day raw material buffer.",
        "Monitor weekly local APMC mandi price fluctuations.",
        "Audit finished goods storage to maintain zero transit damage.",
      ];
    }

    const sign = avgGrowthPercent >= 0 ? "+" : "";

    return {
      predictedUnits,
      historicalData,
      averageGrowthPercent: avgGrowthPercent,
      trendDirection,
      headline: `Next month, you may need around ${predictedUnits.toLocaleString("en-IN")} ${unit}`,
      reasoning: `Based on your sales trend of the last ${raw.length} months (avg. ${sign}${avgGrowthPercent}% growth)`,
      actionableTips,
      upgradeNote:
        "This is a basic trend estimate. Upgrade to Pro for AI-powered forecasting that factors in seasonality, market trends, and your full sales history.",
    };
  }
}
