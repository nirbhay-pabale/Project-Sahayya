import { NextRequest, NextResponse } from "next/server";
import { SafetyInput, SafetyResult } from "@/lib/analyzers/safety/types";
import { StaticSafetyAnalyzer } from "@/lib/analyzers/safety/static-analyzer";
import { generateAIJSON } from "@/lib/ai/client";

export async function POST(req: NextRequest) {
  try {
    const input: SafetyInput = await req.json();

    const staticAnalyzer = new StaticSafetyAnalyzer();
    const fallbackResult = await staticAnalyzer.analyze(input);

    const prompt = `
You are an expert Indian MSME Industrial Safety Auditor. Analyze the following workforce safety audit for a rural manufacturing workshop/factory and generate personalized, realistic feedback:

INPUT RESPONSES:
- Helmets Worn on Floor: ${input.ppeHelmets ? "Yes, 100% compliant" : "No / Inconsistent helmet usage"}
- Safety Gloves & Footwear: ${input.ppeGlovesAndFootwear ? "Yes, protective footwear in use" : "No / Missing boots & gloves"}
- Hazardous Zone Boundaries & Warning Signs: ${input.zoneHazardMarking ? "Yes, demarcated with yellow/red stripes" : "No / Floor markings unclear"}
- Restricted Zone Access Control: ${input.zoneRestrictedAccess ? "Yes, strictly restricted" : "No unauthorized access control"}
- Machine Safety Interlocks & Physical Guards: ${input.machineGuardsAndInterlocks ? "Yes, guards in place" : "No / Missing mesh interlocks"}
- Machine Operator Safety Training: ${input.machineOperatorTraining ? "Yes, certified operators" : "Untrained machine operators"}
- Safe Shift Density & Crowd Flow: ${input.crowdSafeOccupancy ? "Yes, orderly shift transitions" : "Severe congestion during shifts"}

Produce a valid JSON object matching this exact schema:
{
  "overallScore": number (0 to 100 based on weighted compliance),
  "statusBadge": "High Safety Compliance" | "Moderate Risk" | "Critical Attention Needed",
  "categoryBreakdown": [
    {
      "category": "PPE Compliance",
      "passed": boolean,
      "status": "pass" | "fail",
      "tip": string (personalized, 1-line OSHA/Factories Act guidance addressing their specific answer)
    },
    {
      "category": "Zone Safety & Demarcation",
      "passed": boolean,
      "status": "pass" | "fail",
      "tip": string (personalized 1-line guidance)
    },
    {
      "category": "Machine Operation & Guards",
      "passed": boolean,
      "status": "pass" | "fail",
      "tip": string (personalized 1-line guidance)
    },
    {
      "category": "Crowd & Shift Congestion",
      "passed": boolean,
      "status": "pass" | "fail",
      "tip": string (personalized 1-line guidance)
    }
  ],
  "tips": [string, string],
  "summary": string (2-3 sentences of natural executive summary),
  "upgradeNote": "This is a basic self-audit. Upgrade to Pro to enable real-time camera-based monitoring that automatically detects PPE violations, restricted-zone entry, and unsafe machine operation as they happen."
}
`;

    const result = await generateAIJSON<SafetyResult>(prompt, fallbackResult, {
      systemInstruction: "You are an expert MSME safety compliance auditor in India. Return only clean, valid JSON matching the requested schema.",
      temperature: 0.3,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Safety Analysis Error:", error);
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
