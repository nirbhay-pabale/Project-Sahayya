import { NextResponse } from "next/server";
import { matchSchemes } from "@/lib/schemes/matcher";
import { BusinessProfile } from "@/lib/schemes/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const profile: BusinessProfile = {
      businessType: body.businessType || "Manufacturing",
      state: body.state || "Maharashtra",
      businessSize: body.businessSize || "Micro",
      annualTurnover: body.annualTurnover || 1800000,
      businessAgeYears: body.businessAgeYears ?? 4,
      loanAmountNeeded: body.loanAmountNeeded || 750000,
      loanPurpose: body.loanPurpose || "Working Capital",
      existingLoans: body.existingLoans ?? 250000,
      hasUdyam: body.hasUdyam ?? true,
      hasGst: body.hasGst ?? true,
    };

    const matches = matchSchemes(profile);
    return NextResponse.json({
      success: true,
      totalMatched: matches.length,
      profile,
      matches,
    }, { status: 200 });
  } catch (error: any) {
    console.error("[Schemes Match API Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to evaluate scheme matching" },
      { status: 500 }
    );
  }
}
