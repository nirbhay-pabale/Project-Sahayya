export interface MonthlyDataPoint {
  month: string;
  sales: number;
  isForecast?: boolean;
}

export interface DemandInput {
  category: string;
  monthlySeries: number[]; // e.g. [120, 140, 160] or [500, 520, 550, 600]
  unitLabel?: string; // e.g. "units", "bags", "kg"
}

export interface DemandForecastResult {
  predictedUnits: number;
  historicalData: MonthlyDataPoint[];
  averageGrowthPercent: number;
  trendDirection: "rising" | "flat" | "falling";
  headline: string;
  reasoning: string;
  actionableTips: string[];
  upgradeNote: string;
}

export interface DemandAnalyzer {
  analyze(input: DemandInput): Promise<DemandForecastResult>;
}
