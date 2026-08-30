"use client";

import React from "react";
import { SimulationResult } from "@/lib/simulator/types";
import {
  X,
  Scale,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Layers,
  IndianRupee,
  Factory,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScenarioCompareTableProps {
  scenarios: SimulationResult[];
  onClose: () => void;
  onSelectScenario: (scenario: SimulationResult) => void;
}

export default function ScenarioCompareTable({
  scenarios,
  onClose,
  onSelectScenario,
}: ScenarioCompareTableProps) {
  if (scenarios.length === 0) return null;

  const baseline = scenarios[0].before;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#14532D] flex items-center justify-center shadow-xs">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">
                Multi-Scenario Decision Matrix
              </h3>
              <p className="text-xs text-slate-500">
                Side-by-side comparison of {scenarios.length} evaluated business plans.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="p-6 overflow-x-auto flex-1 space-y-4">
          <table className="w-full text-left text-xs border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-3 px-4 font-bold text-slate-400 uppercase text-[10.5px]">Strategic Metric</th>
                <th className="py-3 px-4 font-bold text-slate-700 bg-slate-100/70 rounded-t-xl">Current Baseline</th>
                {scenarios.map((sc, idx) => (
                  <th key={sc.id} className="py-3 px-4 font-extrabold text-emerald-950 bg-emerald-50/60 rounded-t-xl">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-emerald-700 font-bold uppercase">Scenario {String.fromCharCode(65 + idx)}</span>
                      <span className="truncate max-w-[160px] text-xs font-black">{sc.label || sc.query}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              
              {/* Production Units */}
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-600 flex items-center gap-1.5">
                  <Factory className="w-3.5 h-3.5 text-slate-400" /> Monthly Production
                </td>
                <td className="py-3.5 px-4 bg-slate-50 font-bold">
                  {baseline.productionUnits.toLocaleString("en-IN")} units
                </td>
                {scenarios.map((sc) => (
                  <td key={sc.id} className="py-3.5 px-4 bg-emerald-50/20 font-bold">
                    {sc.after.productionUnits.toLocaleString("en-IN")} units
                    <span className={`text-[10px] ml-1 font-extrabold ${sc.deltas.productionDeltaPct >= 0 ? "text-emerald-700" : "text-amber-700"}`}>
                      ({sc.deltas.productionDeltaPct >= 0 ? "+" : ""}{sc.deltas.productionDeltaPct}%)
                    </span>
                  </td>
                ))}
              </tr>

              {/* Monthly Revenue */}
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-600 flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-slate-400" /> Projected Revenue
                </td>
                <td className="py-3.5 px-4 bg-slate-50 font-bold">
                  ₹{baseline.revenue.toLocaleString("en-IN")}
                </td>
                {scenarios.map((sc) => (
                  <td key={sc.id} className="py-3.5 px-4 bg-emerald-50/20 font-bold">
                    ₹{sc.after.revenue.toLocaleString("en-IN")}
                    <span className={`text-[10px] ml-1 font-extrabold ${sc.deltas.revenueDeltaAbs >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                      ({sc.deltas.revenueDeltaAbs >= 0 ? "+₹" : "-₹"}{Math.abs(sc.deltas.revenueDeltaAbs).toLocaleString("en-IN")})
                    </span>
                  </td>
                ))}
              </tr>

              {/* Monthly Profit */}
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-600 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-slate-400" /> Estimated Net Profit
                </td>
                <td className="py-3.5 px-4 bg-slate-50 font-bold">
                  ₹{baseline.monthlyProfit.toLocaleString("en-IN")}
                </td>
                {scenarios.map((sc) => (
                  <td key={sc.id} className="py-3.5 px-4 bg-emerald-50/20 font-bold">
                    ₹{sc.after.monthlyProfit.toLocaleString("en-IN")}
                    <span className={`text-[10px] ml-1 font-extrabold ${sc.deltas.profitDeltaAbs >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                      ({sc.deltas.profitDeltaAbs >= 0 ? "+₹" : "-₹"}{Math.abs(sc.deltas.profitDeltaAbs).toLocaleString("en-IN")})
                    </span>
                  </td>
                ))}
              </tr>

              {/* Quality Defect Rate */}
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-600 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> Defect Rate
                </td>
                <td className="py-3.5 px-4 bg-slate-50">
                  {baseline.defectRatePct}%
                </td>
                {scenarios.map((sc) => (
                  <td key={sc.id} className="py-3.5 px-4 bg-emerald-50/20">
                    <span className={`font-bold ${sc.after.defectRatePct > baseline.defectRatePct ? "text-amber-800" : "text-emerald-800"}`}>
                      {sc.after.defectRatePct}%
                    </span>
                  </td>
                ))}
              </tr>

              {/* Shop-Floor Capacity Utilization */}
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-600 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-slate-400" /> Capacity Utilization
                </td>
                <td className="py-3.5 px-4 bg-slate-50">
                  {baseline.capacityUtilizationPct}%
                </td>
                {scenarios.map((sc) => (
                  <td key={sc.id} className="py-3.5 px-4 bg-emerald-50/20">
                    <span className={`font-bold ${sc.after.capacityUtilizationPct > 90 ? "text-red-700" : "text-emerald-800"}`}>
                      {sc.after.capacityUtilizationPct}%
                    </span>
                  </td>
                ))}
              </tr>

              {/* Profit Potential Badge */}
              <tr>
                <td className="py-3 px-4 font-bold text-slate-600">Profit Potential</td>
                <td className="py-3 px-4 bg-slate-50 text-slate-400 font-bold">Baseline</td>
                {scenarios.map((sc) => (
                  <td key={sc.id} className="py-3 px-4 bg-emerald-50/20">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold ${
                      sc.risks.profitPotential === "High" ? "bg-emerald-100 text-[#14532D]" : "bg-blue-100 text-blue-800"
                    }`}>
                      {sc.risks.profitPotential}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Operational Risk Badge */}
              <tr>
                <td className="py-3 px-4 font-bold text-slate-600">Operational Risk</td>
                <td className="py-3 px-4 bg-slate-50 text-slate-400 font-bold">Low</td>
                {scenarios.map((sc) => (
                  <td key={sc.id} className="py-3 px-4 bg-emerald-50/20">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold ${
                      sc.risks.operationalRisk === "High" ? "bg-red-100 text-red-800" : sc.risks.operationalRisk === "Medium" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-[#14532D]"
                    }`}>
                      {sc.risks.operationalRisk} Risk
                    </span>
                  </td>
                ))}
              </tr>

              {/* AI Recommendation Summary */}
              <tr>
                <td className="py-3 px-4 font-bold text-slate-600">AI Recommendation</td>
                <td className="py-3 px-4 bg-slate-50 text-slate-400">—</td>
                {scenarios.map((sc) => (
                  <td key={sc.id} className="py-3 px-4 bg-emerald-50/20 text-[11px] leading-snug">
                    <strong className={
                      sc.recommendationType === "Proceed" ? "text-emerald-800" : sc.recommendationType === "Proceed with caution" ? "text-amber-800" : "text-red-800"
                    }>
                      [{sc.recommendationType}]
                    </strong>{" "}
                    {sc.aiRecommendation.replace(/^.*?: /, "")}
                  </td>
                ))}
              </tr>

              {/* Action: Select / Load Plan */}
              <tr>
                <td className="py-3 px-4 font-bold text-slate-600">Action</td>
                <td className="py-3 px-4 bg-slate-50">—</td>
                {scenarios.map((sc) => (
                  <td key={sc.id} className="py-3 px-4 bg-emerald-50/20">
                    <Button
                      onClick={() => {
                        onSelectScenario(sc);
                        onClose();
                      }}
                      className="bg-[#14532D] hover:bg-[#0F3D2E] text-white text-[11px] font-bold rounded-xl py-1.5 px-3 shadow-xs cursor-pointer"
                    >
                      Apply This Plan
                    </Button>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <Button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl py-2 px-5 cursor-pointer"
          >
            Close Comparison
          </Button>
        </div>

      </div>
    </div>
  );
}
