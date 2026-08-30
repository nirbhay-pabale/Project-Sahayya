import { ModuleResultsStore, RadarWarning } from "@/lib/context/ModuleResultsContext";

export function generateRadarWarnings(store: ModuleResultsStore): RadarWarning[] {
  const warnings: RadarWarning[] = [];

  // 1. Stock / Demand Shortage Rule
  if (store.demand.shortageUnits > 0) {
    const daysUntil = Math.max(2, Math.round(store.demand.currentInventory / 600));
    warnings.push({
      id: "RAD-DEMAND-1",
      title: `Stock shortage likely in ${daysUntil} days (${store.demand.shortageUnits} units shortfall)`,
      urgency: daysUntil <= 7 ? "Critical" : "High",
      daysUntil,
      moduleTarget: "section-demand",
      triggerReason: `Projected demand of ${store.demand.projectedDemand} exceeds existing inventory of ${store.demand.currentInventory} units.`,
    });
  }

  // 2. Safety Violation Rule
  if (store.safety.activeViolationsCount > 0) {
    warnings.push({
      id: "RAD-SAFETY-1",
      title: `${store.safety.activeViolationsCount} active PPE hazard violations on shop floor`,
      urgency: store.safety.criticalAlertActive ? "Critical" : "Medium",
      daysUntil: 1,
      moduleTarget: "section-safety",
      triggerReason: "Worker safety score dropped to " + store.safety.overallScore + "% due to missing protective gear.",
    });
  }

  // 3. Environmental Temperature/Gas Alert Rule
  if (store.safety.temperatureReading > 42 || store.safety.gasReading > 50) {
    warnings.push({
      id: "RAD-ENV-1",
      title: "Abnormal temperature/gas sensor reading in fabrication bay",
      urgency: "Critical",
      daysUntil: 0,
      moduleTarget: "section-safety",
      triggerReason: `Sensor telemetry indicates ${store.safety.temperatureReading}°C / ${store.safety.gasReading} ppm.`,
    });
  }

  // 4. Quality Defect Impact Rule
  if (store.quality.defectPercent > 5) {
    warnings.push({
      id: "RAD-QUALITY-1",
      title: `Elevated product defect rate (${store.quality.defectPercent}%) causing estimated ₹${store.quality.estimatedMonthlyLoss.toLocaleString("en-IN")}/mo loss`,
      urgency: store.quality.defectPercent > 8 ? "High" : "Medium",
      daysUntil: 3,
      moduleTarget: "section-quality",
      triggerReason: "Batch inspection detected seam seal gaps and dimensional discrepancies.",
    });
  }

  // 5. Compliance Due Dates Rule
  store.compliance.upcomingDeadlines.forEach((d) => {
    if (d.daysLeft <= 15) {
      warnings.push({
        id: `RAD-COMPLIANCE-${d.id}`,
        title: `${d.title} Due in ${d.daysLeft} Days`,
        urgency: d.daysLeft <= 7 ? "Critical" : "High",
        daysUntil: d.daysLeft,
        moduleTarget: "section-compliance",
        triggerReason: `File on ${d.portal} before ${d.dueDate} to prevent statutory penalties.`,
      });
    }
  });

  return warnings;
}
