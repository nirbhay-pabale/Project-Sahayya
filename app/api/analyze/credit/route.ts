import { NextRequest, NextResponse } from "next/server";
import { CreditInput, CreditReadinessResult } from "@/lib/analyzers/credit/types";
import { StaticCreditAnalyzer } from "@/lib/analyzers/credit/static-analyzer";
import { generateAIJSON } from "@/lib/ai/client";

export async function POST(req: NextRequest) {
  try {
    const input: CreditInput = await req.json();

    const staticAnalyzer = new StaticCreditAnalyzer();
    const fallbackResult = await staticAnalyzer.analyze(input);

    const prompt = `
You are a senior Indian MSME Credit Underwriter and Banking Consultant (SIDBI / Mudra / CGTMSE specialist).
Analyze the following rural enterprise financial profile:

INPUT FINANCIAL DATA:
- Monthly Revenue: ₹${input.monthlyRevenue.toLocaleString("en-IN")}
- Monthly Expenses: ₹${input.monthlyExpenses.toLocaleString("en-IN")}
- Operating Vintage / Business History: ${input.businessHistory}
- Repayment Track Record: ${input.repaymentHistory}
- Inventory & Sales Ledger Records: ${input.maintainsRecords ? "Maintains formal records" : "Informal/Unrecorded sales"}
- Active Udyam Registration: ${input.udyamRegistered ? "Yes, active" : "No"}

Tasks:
1. Compute a 0-100 credit readiness score based on debt servicing margin, vintage, repayment behavior, and formal compliance.
2. Assign standing badge: "Good" (71-100), "Fair" (41-70), or "Needs Improvement" (0-40).
3. Synthesize a concise, tailored profile summary.
4. Provide customized score factors (label, points gained, status).
5. Select and describe 1-3 specific matched Indian government credit programs (e.g. CGTMSE for high scorers, PMEGP for Udyam holders, Mudra Shishu/Kishor/Tarun based on loan size) with natural, personalized descriptions.
6. Provide specific actionable steps to improve lender eligibility.

Produce a valid JSON object matching this exact schema:
{
  "overallScore": number (0 to 100),
  "badge": "Good" | "Fair" | "Needs Improvement",
  "profileSummary": string,
  "scoreBreakdown": [
    { "label": string, "points": number, "maxPoints": number, "status": "positive" | "neutral" | "negative" }
  ],
  "matchedSchemes": [
    {
      "name": string,
      "maxAmount": string,
      "subsidyRate": string,
      "type": string,
      "description": string
    }
  ],
  "actionableSteps": [string, string, string],
  "upgradeNote": "This is a basic self-reported profile. Upgrade to Pro to generate a verified, document-backed credit profile that financial institutions can review directly."
}
`;

    const result = await generateAIJSON<CreditReadinessResult>(prompt, fallbackResult, {
      systemInstruction: "You are an expert MSME credit underwriter in India. Return only clean, valid JSON matching the schema.",
      temperature: 0.3,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Credit Analysis Error:", error);
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
