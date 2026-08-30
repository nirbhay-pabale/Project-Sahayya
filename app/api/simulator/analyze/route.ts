import { NextResponse } from "next/server";
import { runSimulation, findBestScenario } from "@/lib/simulator/engine";
import { BusinessSnapshot, SimulationInputs } from "@/lib/simulator/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action = "simulate", snapshot, inputs, query } = body;

    const defaultSnapshot: BusinessSnapshot = {
      currentMonthlyProduction: snapshot?.currentMonthlyProduction || 4500,
      currentMonthlyRevenue: snapshot?.currentMonthlyRevenue || 675000,
      currentDefectRatePct: snapshot?.currentDefectRatePct ?? 0.0,
      maxProductionCapacity: snapshot?.maxProductionCapacity || 6000,
      unitSellingPrice: snapshot?.unitSellingPrice || 150,
      unitMaterialCost: snapshot?.unitMaterialCost || 65,
      workerCount: snapshot?.workerCount || 12,
      workingHoursPerDay: snapshot?.workingHoursPerDay || 8,
      availableWorkingCapital: snapshot?.availableWorkingCapital || 250000,
    };

    if (action === "find_best") {
      const best = findBestScenario(defaultSnapshot);
      return NextResponse.json({ success: true, data: best }, { status: 200 });
    }

    const defaultInputs: SimulationInputs = {
      productionChangePct: inputs?.productionChangePct ?? 20,
      priceChangePct: inputs?.priceChangePct ?? 0,
      materialCostChangePct: inputs?.materialCostChangePct ?? 0,
      workerCountChange: inputs?.workerCountChange ?? 0,
      workingHoursPerDay: inputs?.workingHoursPerDay ?? 8,
      defectRateChangePct: inputs?.defectRateChangePct ?? 0,
    };

    const result = runSimulation(defaultSnapshot, defaultInputs, query);
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error: any) {
    console.error("[Simulator API Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process simulation" },
      { status: 500 }
    );
  }
}
