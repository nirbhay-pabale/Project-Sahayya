import { NextResponse } from "next/server";
import { analyzeVisionJSON } from "@/lib/ai/vision-client";

interface PackagingVisionResponse {
  packagingIntact: boolean;
  packagingIssue: string | null;
  reasoning: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { image } = body;

    if (!image || typeof image !== "string" || image.length < 50) {
      return NextResponse.json({
        status: "Uncertain",
        confidence: 0.0,
        reasoning: "No valid image provided for visual packaging check.",
        usedFallback: false,
      });
    }

    const packagingPrompt = `Look at this image of a product or food packaging very carefully.

CRITICAL PACKAGING INTEGRITY CHECK:
Examine the packaging very closely, especially the edges, seals, and seams. Look for: any tear, rip, cut, or opening in the material; any place where the seal appears broken or peeled back; any place where the inner contents or lining are visible through a gap that shouldn't be there. Even a small tear or partially opened corner counts as damaged packaging. Do not assume packaging is intact just because the product design/branding is clearly visible — focus specifically on the physical integrity of the material itself, not the print/label. If you see ANY irregularity in the physical seal or edge of the packaging, set packagingIntact to false and describe exactly what you observed in packagingIssue.

FEW-SHOT CLARIFICATION:
- A wrapper with a visible tear, an unsealed/peeled-open top corner, or a gap in the seam is DAMAGED — mark packagingIntact: false in these cases.
- An unopened, factory-sealed packet with all crimped/welded edges fully intact and no tears or openings is INTACT — mark packagingIntact: true.

Respond with ONLY this JSON:
{
  "packagingIntact": boolean,
  "packagingIssue": string | null,
  "reasoning": string
}`;

    const visionData = await analyzeVisionJSON<PackagingVisionResponse>(
      image,
      packagingPrompt,
      {
        systemInstruction:
          "You are an expert food packaging and seal integrity inspection vision AI. Assess the wrapper honestly based on visible features, identifying any tears, rips, open corners, or broken seals.",
      }
    );

    const isIntact = Boolean(visionData.packagingIntact);
    const status = isIntact ? "Sealed" : "Possibly Open/Torn";
    const reasoning = isIntact
      ? visionData.reasoning || "Packaging wrapper appears sealed and intact across outer edges."
      : visionData.packagingIssue || visionData.reasoning || "Packaging appears open, torn, or damaged.";

    return NextResponse.json({
      status,
      confidence: 0.94,
      reasoning,
      usedFallback: false,
    });
  } catch (error: any) {
    console.error("Error in Vision packaging-check route:", error);
    return NextResponse.json({
      status: "Uncertain",
      confidence: 0.0,
      reasoning: "Automated packaging visual check unavailable — please confirm manually below.",
      usedFallback: false,
    });
  }
}
