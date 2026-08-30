import { ModuleResultsStore, CopilotCard } from "@/lib/context/ModuleResultsContext";

export function synthesizeCopilotFeed(store: ModuleResultsStore): CopilotCard[] {
  const cards: CopilotCard[] = [];

  // Card 1: Quality Synthesis
  if (store.quality.defectPercent > 0) {
    cards.push({
      id: "COPILOT-Q-1",
      timestamp: "Today 08:30 AM",
      metric: `Quality Defect Rate (${store.quality.defectPercent}%)`,
      whatHappened: `Quality inspection recorded a ${store.quality.defectPercent}% defect rate on Batch ${store.quality.batchId}.`,
      why: store.quality.defects.length > 0 ? (store.quality.defects[0].displayLabel || store.quality.defects[0].description) : "Thermal variations during machine cycle.",
      impact: `Estimated ₹${store.quality.estimatedMonthlyLoss.toLocaleString("en-IN")} monthly production waste.`,
      action: "Inspect heating element calibration and test 5 sample seals before next run.",
      category: "Quality",
    });
  }

  // Card 2: Demand & Inventory Synthesis
  if (store.demand.shortageUnits > 0) {
    cards.push({
      id: "COPILOT-D-1",
      timestamp: "Today 07:15 AM",
      metric: "Demand & Production Capacity",
      whatHappened: `Next month projected demand is ${store.demand.projectedDemand.toLocaleString("en-IN")} units (↑ ${store.demand.growthPercent}%).`,
      why: "Seasonal agricultural processing surge across regional rural market.",
      impact: `${store.demand.shortageUnits} units stock shortfall without advance production.`,
      action: `Order ${store.demand.rawMaterialKg} kg raw material buffer and run ${store.demand.recommendedProduction} units batch.`,
      category: "Demand",
    });
  }

  // Card 3: Safety Synthesis
  if (store.safety.activeViolationsCount > 0) {
    cards.push({
      id: "COPILOT-S-1",
      timestamp: "Yesterday 04:45 PM",
      metric: "Workplace Safety Telemetry",
      whatHappened: `${store.safety.activeViolationsCount} active PPE hazard violations detected during camera monitoring.`,
      why: "Apprentice / helper staff working without required hard hats or goggles in fabrication bay.",
      impact: "Workplace safety score dipped to " + store.safety.overallScore + "% — increased risk of injury and DISH audit penalty.",
      action: "Mandate pre-shift PPE verification check before activating heavy machinery.",
      category: "Safety",
    });
  }

  // Card 4: Credit & Scheme Synthesis
  cards.push({
    id: "COPILOT-C-1",
    timestamp: "28 May 02:20 PM",
    metric: "Credit & Scheme Readiness",
    whatHappened: `Credit Readiness Score stands at ${store.credit.score}/100 with 3 applicable government capital subsidies.`,
    why: "Consistent cash flow margin (>28%) and zero statutory GST defaults.",
    impact: "Pre-screened for up to ₹5.8 Lakhs collateral-free bank working capital via SIDBI / Mudra.",
    action: "Generate verified digital DPR to initiate formal bank loan application.",
    category: "Finance",
  });

  return cards;
}

export async function askBusinessCopilot(query: string, store: ModuleResultsStore): Promise<string> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: `You are Sahayya Business Copilot, the AI strategic advisor for an Indian rural MSME enterprise.
Here is the user's current live business data:
- Safety Score: ${store.safety.overallScore}% (${store.safety.activeViolationsCount} violations, temp: ${store.safety.temperatureReading}°C, gas: ${store.safety.gasReading}ppm)
- Quality Score: ${store.quality.qualityScore}% (Defect rate: ${store.quality.defectPercent}%, monthly loss: ₹${store.quality.estimatedMonthlyLoss})
- Demand & Sales: Projected ${store.demand.projectedDemand} units, Current Stock: ${store.demand.currentInventory}, Shortage: ${store.demand.shortageUnits} units
- Credit Readiness Score: ${store.credit.score}/100 (Monthly revenue: ₹${store.credit.monthlyRevenue}, expenses: ₹${store.credit.monthlyExpenses})
- Compliance Health: ${store.compliance.overallScore}% (${store.compliance.upcomingDeadlines.length} upcoming filings)
- Active Patent Invention: ${store.patent.inventionTitle} (Readiness: ${store.patent.readinessScore}%)

Answer concisely (2-4 clear paragraphs) grounded in their real numbers. Use the structure:
1. What the data shows
2. The direct business impact
3. Immediate recommended action.`,
          },
          {
            role: "user",
            content: query,
          },
        ],
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.reply) return data.reply;
    }
  } catch (err) {
    console.warn("API copilot chat error:", err);
  }

  // Fallback if AI endpoint is unavailable
  return `Based on your live dashboard telemetry:
• **Quality & Production**: Your defect rate is ${store.quality.defectPercent}%, creating an estimated ₹${store.quality.estimatedMonthlyLoss.toLocaleString("en-IN")} monthly loss.
• **Demand Outlook**: Projected sales of ${store.demand.projectedDemand} units indicate an upcoming ${store.demand.shortageUnits} units buffer shortfall.
• **Immediate Action**: Calibrate fabrication sealing temperatures and order ${store.demand.rawMaterialKg} kg raw materials by early next week.`;
}
