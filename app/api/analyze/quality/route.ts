import { NextRequest, NextResponse } from "next/server";
import { QualityInput, QualityResult } from "@/lib/analyzers/quality/types";
import { StaticQualityAnalyzer } from "@/lib/analyzers/quality/static-analyzer";
import { generateAIJSON } from "@/lib/ai/client";

export async function POST(req: NextRequest) {
  try {
    const input: QualityInput = await req.json();

    const staticAnalyzer = new StaticQualityAnalyzer();
    const fallbackResult = await staticAnalyzer.analyze(input);

    const prompt = `
You are a certified Lead Quality Auditor and Zero Defect Zero Effect (ZED) Assessor for Indian MSMEs.
Analyze the following batch quality inspection responses:

INPUT DATA:
- Surface Defects / Fractures / Burrs / Warpage: ${input.surfaceDefectsFree ? "0 defects, smooth surface finish" : "Surface roughness / burrs observed"}
- Packaging, Barcode, Batch Label & Moisture Sealing: ${input.packagingAndLabelCompliance ? "Fully sealed, labeled with valid barcode" : "Defective seal / missing batch label"}
- Dimensional / Weight Tolerance (±2%): ${input.toleranceSpecsPassed ? "Tested within ±2% tolerance" : "Exceeds tolerance limit"}

Evaluate batch quality grade (Grade A / Grade B / Grade C), determine ZED rating tier (Gold / Silver / Bronze), and provide tailored corrective QC actions with 80% ZED subsidy details.

Produce a valid JSON object matching this exact schema:
{
  "qualityGrade": "Grade A (Export Ready)" | "Grade B (Commercial Quality)" | "Grade C (Rework Needed)",
  "qualityScore": number (0 to 100),
  "zedCertificationLevel": "Gold (90%+)" | "Silver (75%+)" | "Bronze (60%+)",
  "inspectionChecklist": [
    {
      "name": "Surface & Material Integrity",
      "passed": boolean,
      "standard": "ISO 9001:2015 Clause 8.6",
      "notes": string
    },
    {
      "name": "Packaging & Barcode Identification",
      "passed": boolean,
      "standard": "BIS / Legal Metrology 2011",
      "notes": string
    },
    {
      "name": "Dimensional & Tolerance Compliance",
      "passed": boolean,
      "standard": "IS 210 / Blueprint Spec (±2%)",
      "notes": string
    }
  ],
  "zedSubsidyPercent": number,
  "uploadedImageUrl": "${input.uploadedImageUrl || ""}",
  "correctiveActions": [string, string],
  "upgradeNote": "This is a basic manual self-check using your own observations. Upgrade to Pro for automated camera-based defect detection on the same image, with instant AI-verified results."
}
`;

    const result = await generateAIJSON<QualityResult>(prompt, fallbackResult, {
      systemInstruction: "You are an expert ZED & Quality auditor in India. Return only clean, valid JSON matching the schema.",
      temperature: 0.3,
    });

    if (input.uploadedImageUrl) {
      result.uploadedImageUrl = input.uploadedImageUrl;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Quality Analysis Error:", error);
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
