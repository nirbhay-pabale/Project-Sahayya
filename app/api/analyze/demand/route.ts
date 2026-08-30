import { NextRequest, NextResponse } from "next/server";
import { DemandInput, DemandForecastResult } from "@/lib/analyzers/demand/types";
import { StaticDemandAnalyzer } from "@/lib/analyzers/demand/static-analyzer";
import { generateAIJSON } from "@/lib/ai/client";

export async function POST(req: NextRequest) {
  try {
    const input: DemandInput = await req.json();

    const staticAnalyzer = new StaticDemandAnalyzer();
    const fallbackResult = await staticAnalyzer.analyze(input);

    const unit = input.unitLabel || "units";
    const series = input.monthlySeries || [120, 145, 180];

    const prompt = `
You are an expert Indian MSME & Rural Village Enterprise Demand Forecaster.
Analyze the following historical monthly production and sales data:

INPUT DATA:
- Industry Sector: ${input.category || "Rural Manufacturing"}
- Historical Monthly Sales Time-Series: ${JSON.stringify(series)}
- Unit of Measurement: ${unit}

Perform statistical trend estimation and next-month demand prediction.
Calculate next month's predicted units as last month's value * (1 + avg MoM growth rate).
Provide natural, customized actionable tips based on the specific trend (e.g. advance raw material holding, shift pacing, local mandi promotions).

Produce a valid JSON object matching this exact schema:
{
  "predictedUnits": number (rounded integer for next month),
  "historicalData": [
    { "month": "Month 1", "sales": number, "isForecast": false },
    { "month": "Month 2", "sales": number, "isForecast": false },
    { "month": "Month 3", "sales": number, "isForecast": false },
    { "month": "Next Month (Pred.)", "sales": number, "isForecast": true }
  ],
  "averageGrowthPercent": number (e.g. 12.5),
  "trendDirection": "rising" | "flat" | "falling",
  "headline": string (e.g. "Next month, you may need around 202 units"),
  "reasoning": string (e.g. "Based on your sales trend of the last 3 months (avg. +12.5% growth)"),
  "actionableTips": [string, string, string],
  "upgradeNote": "This is a basic trend estimate. Upgrade to Pro for AI-powered forecasting that factors in seasonality, market trends, and your full sales history."
}
`;

    const result = await generateAIJSON<DemandForecastResult>(prompt, fallbackResult, {
      systemInstruction: "You are an expert MSME operations & inventory forecaster in India. Return only clean, valid JSON matching the schema.",
      temperature: 0.3,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Demand Analysis Error:", error);
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
