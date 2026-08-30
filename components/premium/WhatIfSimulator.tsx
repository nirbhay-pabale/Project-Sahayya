"use client";

import React, { useState } from "react";
import { useModuleResults, WhatIfSimulation } from "@/lib/context/ModuleResultsContext";
import {
  Sliders,
  Sparkles,
  Send,
  History,
  TrendingUp,
  Layers,
  IndianRupee,
  Factory,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatIfSimulator() {
  const { store, addSimulation } = useModuleResults();
  const [naturalPrompt, setNaturalPrompt] = useState("");
  const [sliderProductionChange, setSliderProductionChange] = useState<number>(20); // +20%
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeResult, setActiveResult] = useState<WhatIfSimulation | null>(
    store.simulations[0] || null
  );

  const handleRunSimulation = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSimulating(true);

    const query = naturalPrompt.trim() || `What if I increase production by ${sliderProductionChange}% next month?`;

    // Attempt AI simulation call
    let simResult: WhatIfSimulation;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are Sahayya What-If Simulator for rural MSMEs.
Current Business Context:
- Production Capacity: ${store.demand.productionCapacity} units
- Current Monthly Sales: ${store.demand.projectedDemand} units
- Current Stock: ${store.demand.currentInventory} units
- Average Defect Rate: ${store.quality.defectPercent}%
- Monthly Operating Cost: ₹${store.credit.monthlyExpenses}

Simulate the user's decision across 5 dimensions:
1. Demand Impact
2. Inventory Impact
3. Cost Impact
4. Capacity Impact
5. Quality Risk Impact
6. Overall Summary. Return as JSON with keys: demandImpact, inventoryImpact, costImpact, capacityImpact, qualityRiskImpact, overallSummary.`,
            },
            { role: "user", content: query },
          ],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const jsonMatch = data.reply?.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          simResult = {
            id: `SIM-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            query,
            demandImpact: parsed.demandImpact || `Fulfills peak seasonal orders with +${sliderProductionChange}% buffer.`,
            inventoryImpact: parsed.inventoryImpact || `Requires ${Math.round(store.demand.rawMaterialKg * (1 + sliderProductionChange / 100))} kg raw material in advance.`,
            costImpact: parsed.costImpact || `Estimated ₹${Math.round(42000 * (sliderProductionChange / 20))} incremental working capital.`,
            capacityImpact: parsed.capacityImpact || `Utilizes ${Math.min(100, Math.round(75 + sliderProductionChange * 0.9))}% plant capacity.`,
            qualityRiskImpact: parsed.qualityRiskImpact || "Moderate defect risk without additional calibration on late afternoon shifts.",
            overallSummary: parsed.overallSummary || `Viable and profitable move: projected gross margin increases by ₹${Math.round(55000 * (sliderProductionChange / 20))}.`,
          };
          setActiveResult(simResult);
          addSimulation(simResult);
          setIsSimulating(false);
          return;
        }
      }
    } catch (err) {
      console.warn("AI Simulator fallback to rule engine:", err);
    }

    // Fallback rule engine simulation
    const addUnits = Math.round(store.demand.projectedDemand * (sliderProductionChange / 100));
    const addMat = Math.round(addUnits * 1.5);
    const addCost = Math.round(addUnits * 65);
    const profitBoost = Math.round(addUnits * 110);

    simResult = {
      id: `SIM-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      query,
      demandImpact: `Produces ${addUnits} additional finished units to capture surging regional agro demand.`,
      inventoryImpact: `Requires procurement of ${addMat} kg raw material buffer by early next week.`,
      costImpact: `Estimated ₹${addCost.toLocaleString("en-IN")} upfront material & power expenses.`,
      capacityImpact: `Shop floor utilization shifts to ${Math.min(100, 80 + Math.round(sliderProductionChange * 0.8))}%. Suggests 2nd shift on Tue/Wed.`,
      qualityRiskImpact: `Moderate risk: requires dedicated operator inspection on high-speed runs.`,
      overallSummary: `Highly profitable decision: Net estimated enterprise revenue increases by ₹${profitBoost.toLocaleString("en-IN")}.`,
    };

    setActiveResult(simResult);
    addSimulation(simResult);
    setIsSimulating(false);
  };

  return (
    <section id="section-whatif" className="scroll-mt-24 w-full space-y-6 text-left">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-100 text-[#14532D]">
              <Sliders className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
              Section 10 • Decision Modeling
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-slate-900 tracking-tight mt-1">
            What-If Scenario Simulator
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Test business decisions before taking financial risks — evaluate demand, cash flow, capacity, and quality risk.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#14532D] text-xs font-bold shadow-2xs">
          <span>Multi-Dimensional AI Forecasting</span>
        </div>
      </div>

      {/* Main Grid: Question / Sliders Left, Impact Breakdown Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Natural Language Input & Sliders (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-text-slate-900 pb-2 border-b border-slate-100">
              Simulate a Commercial Decision
            </h4>

            <form onSubmit={handleRunSimulation} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Natural Language Query
                </label>
                <textarea
                  rows={3}
                  value={naturalPrompt}
                  onChange={(e) => setNaturalPrompt(e.target.value)}
                  placeholder="e.g. What if I increase production by 20% and add a second shift on Wednesdays?"
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              {/* Slider Fallback Control */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Production Change Target</span>
                  <span className="text-[#14532D] font-extrabold text-sm">
                    {sliderProductionChange > 0 ? `+${sliderProductionChange}%` : `${sliderProductionChange}%`}
                  </span>
                </div>
                <input
                  type="range"
                  min="-40"
                  max="80"
                  step="5"
                  value={sliderProductionChange}
                  onChange={(e) => setSliderProductionChange(parseInt(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>-40% (Slowdown)</span>
                  <span>Baseline (0%)</span>
                  <span>+80% (Expansion)</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSimulating}
                className="w-full bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-bold rounded-xl py-3 shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>{isSimulating ? "Simulating Scenario..." : "Run Scenario Simulation"}</span>
              </Button>
            </form>

            {/* Simulation History Re-open List */}
            {store.simulations.length > 0 && (
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5" /> Recent Simulation Archive
                </span>
                <div className="space-y-1.5">
                  {store.simulations.slice(0, 3).map((sim) => (
                    <button
                      key={sim.id}
                      type="button"
                      onClick={() => setActiveResult(sim)}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-100 text-xs font-semibold text-slate-800 transition-colors truncate block cursor-pointer"
                    >
                      {sim.query}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Cause-and-Effect Multi-Dimension Card (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          {activeResult && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-5">
              
              {/* Header */}
              <div className="pb-3 border-b border-slate-100 space-y-1">
                <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-emerald-800">
                  Simulation Outcome Dossier • {activeResult.timestamp}
                </span>
                <h4 className="font-extrabold text-base sm:text-lg text-text-slate-900">
                  &ldquo;{activeResult.query}&rdquo;
                </h4>
              </div>

              {/* 5 Dimensional Cause-and-Effect Rows */}
              <div className="space-y-2.5">
                
                {/* 1. Demand Impact */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-100 text-blue-800 shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-text-slate-900">1. Demand &amp; Sales Impact</h5>
                    <p className="text-xs text-slate-700 leading-snug mt-0.5">{activeResult.demandImpact}</p>
                  </div>
                </div>

                {/* 2. Inventory Impact */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-text-slate-900">2. Inventory &amp; Raw Material</h5>
                    <p className="text-xs text-slate-700 leading-snug mt-0.5">{activeResult.inventoryImpact}</p>
                  </div>
                </div>

                {/* 3. Cost Impact */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-text-slate-900">3. Working Capital &amp; Power Cost</h5>
                    <p className="text-xs text-slate-700 leading-snug mt-0.5">{activeResult.costImpact}</p>
                  </div>
                </div>

                {/* 4. Capacity Impact */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-purple-100 text-purple-800 shrink-0 mt-0.5">
                    <Factory className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-text-slate-900">4. Shop-Floor Utilization</h5>
                    <p className="text-xs text-slate-700 leading-snug mt-0.5">{activeResult.capacityImpact}</p>
                  </div>
                </div>

                {/* 5. Quality Risk Impact */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-red-100 text-red-700 shrink-0 mt-0.5">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-text-slate-900">5. Quality &amp; Defect Risk</h5>
                    <p className="text-xs text-slate-700 leading-snug mt-0.5">{activeResult.qualityRiskImpact}</p>
                  </div>
                </div>

              </div>

              {/* Overall Executive Summary Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-[#DCFCE7]/60 border border-emerald-200 space-y-1">
                <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#14532D] block">
                  Expected Overall Impact
                </span>
                <p className="text-xs sm:text-sm font-extrabold text-emerald-950 leading-relaxed">
                  {activeResult.overallSummary}
                </p>
              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
}
