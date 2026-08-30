import { NextRequest, NextResponse } from "next/server";
import { PatentInput, PatentResult } from "@/lib/analyzers/patent/types";
import { StaticPatentAnalyzer } from "@/lib/analyzers/patent/static-analyzer";
import { generateAIJSON } from "@/lib/ai/client";

export async function POST(req: NextRequest) {
  try {
    const input: PatentInput = await req.json();

    const staticAnalyzer = new StaticPatentAnalyzer();
    const fallbackResult = await staticAnalyzer.analyze(input);

    const prompt = `
You are a registered Indian Patent Attorney and MSME Intellectual Property Consultant.
Analyze the following invention disclosure for patentability under the Indian Patents Act 1970:

INPUT DATA:
- Invention Novelty: ${input.novelty}
- Inventive Step (Non-obvious technical solution): ${input.inventiveStep ? "Yes" : "No"}
- Prior Public Disclosure (published, showcased, sold): ${input.priorPublicDisclosure ? "Yes, publicly disclosed" : "No, confidential"}
- MSME / Startup Concession Eligibility: ${input.isMsmeOrStartup ? "Eligible (80% fee waiver)" : "Standard"}

Evaluate patentability status and provide the 6-step roadmap with customized advice.

Produce a valid JSON object matching this exact schema:
{
  "patentabilityStatus": "High Patentability Potential" | "Caution: Prior Disclosure Risk" | "Better Suited for Design / GI Protection",
  "patentabilityScore": number (0 to 100),
  "msmeFeeWaiverPercent": 80,
  "roadmapSteps": [
    { "stepNumber": 1, "title": "Idea Check", "formName": "Confidential Assessment", "timeline": "Stage 1", "description": "Confirm your idea is new and hasn't been publicly shared yet." },
    { "stepNumber": 2, "title": "Prior Art Search", "formName": "IPO / Manual Search", "timeline": "Stage 2", "description": "Check if something similar already exists (basic manual search)." },
    { "stepNumber": 3, "title": "Provisional Filing", "formName": "Form 1 & Form 2", "timeline": "Stage 3", "description": "File a provisional application to lock in your filing date." },
    { "stepNumber": 4, "title": "Complete Specification", "formName": "Form 2 (Full Spec)", "timeline": "Within 12 Months", "description": "Submit full technical details within 12 months." },
    { "stepNumber": 5, "title": "Examination", "formName": "Form 18 / 18A", "timeline": "Stage 5", "description": "Patent office reviews and may raise objections." },
    { "stepNumber": 6, "title": "Response & Grant", "formName": "Patent Certificate", "timeline": "Final Stage", "description": "Respond to objections; patent is granted if approved." }
  ],
  "giAndTrademarkAdvice": string (tailored guidance on trademarks and Geographical Indications for cluster crafts/products),
  "actionPlan": [string, string, string],
  "upgradeNote": "This is a basic roadmap to orient you. Upgrade to Pro for AI-assisted prior-art search, document drafting help, and guided support from an IP specialist at each step."
}
`;

    const result = await generateAIJSON<PatentResult>(prompt, fallbackResult, {
      systemInstruction: "You are an expert Indian IP & patent consultant. Return only clean, valid JSON matching the schema.",
      temperature: 0.3,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Patent Analysis Error:", error);
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
