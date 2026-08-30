import { NextResponse } from "next/server";

export async function GET() {
  const uptime = process.uptime();
  const timestamp = new Date().toISOString();

  return NextResponse.json(
    {
      status: "operational",
      platform: "Sahayya Enterprise MSME Backend",
      version: "2.1.0",
      timestamp,
      uptimeSeconds: Math.round(uptime),
      services: {
        safetyVisionAI: "healthy",
        qualityDefectAI: "healthy",
        schemeMatcher: "healthy",
        simulatorEngine: "healthy",
        conversationalAI: "healthy",
      },
    },
    { status: 200 }
  );
}
