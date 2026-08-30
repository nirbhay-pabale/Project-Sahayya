"use client";

import React, { useState } from "react";
import { useModuleResults } from "@/lib/context/ModuleResultsContext";
import {
  TrendingUp,
  Package,
  Boxes,
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  Layers,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function DemandIntelligence() {
  const { store, updateDemand } = useModuleResults();
  const [salesInputs, setSalesInputs] = useState<number[]>([3200, 3450, 3800, 4100, 4500]);
  const [currentStock, setCurrentStock] = useState<number>(store.demand.currentInventory || 3700);
  const [capacity, setCapacity] = useState<number>(store.demand.productionCapacity || 5000);
  const [seasonality, setSeasonality] = useState<number>(store.demand.seasonalityMultiplier || 1.15);
  const [materialRatio, setMaterialRatio] = useState<number>(1.5); // 1.5 kg per unit

  // Transparent, explainable arithmetic calculation
  const calculateForecast = () => {
    const avgRecent = salesInputs[salesInputs.length - 1] || 4500;
    const projected = Math.round(avgRecent * seasonality);
    const growth = Math.round(((projected - salesInputs[salesInputs.length - 2]) / salesInputs[salesInputs.length - 2]) * 100);
    const shortage = Math.max(0, projected - currentStock);
    const recommended = shortage > 0 ? Math.round(shortage * 1.06) : 0; // +6% safety buffer
    const rawMaterial = Math.round(recommended * materialRatio);

    updateDemand({
      currentInventory: currentStock,
      productionCapacity: capacity,
      seasonalityMultiplier: seasonality,
      projectedDemand: projected,
      shortageUnits: shortage,
      recommendedProduction: recommended,
      rawMaterialKg: rawMaterial,
      growthPercent: growth,
    });
  };

  const chartData = [
    { month: "Jan", actual: 3200, projected: 3200 },
    { month: "Feb", actual: 3450, projected: 3450 },
    { month: "Mar", actual: 3800, projected: 3800 },
    { month: "Apr", actual: 4100, projected: 4100 },
    { month: "May", actual: 4500, projected: 4500 },
    { month: "Jun (P)", actual: null, projected: store.demand.projectedDemand },
    { month: "Jul (P)", actual: null, projected: Math.round(store.demand.projectedDemand * 1.08) },
  ];

  return (
    <section id="section-demand" className="scroll-mt-24 w-full space-y-6 text-left">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-100 text-[#14532D]">
              <TrendingUp className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
              Section 3 • Demand &amp; Production Planning
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-slate-900 tracking-tight mt-1">
            Demand Intelligence &amp; Capacity Planner
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Forecast demand, anticipate stockouts, and compute exact raw material buffer requirements.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#14532D] text-xs font-bold shadow-2xs">
          <span>Projected Growth: ↑ {store.demand.growthPercent}%</span>
        </div>
      </div>

      {/* Stock Shortage Warning Banner if shortfall exists */}
      {store.demand.shortageUnits > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-300 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-amber-950">
                Stock Shortage Warning: {store.demand.shortageUnits} Units Projected Shortfall
              </h4>
              <p className="text-xs text-amber-900 mt-0.5">
                Current inventory ({store.demand.currentInventory} units) is below projected June demand ({store.demand.projectedDemand} units). Initiate batch of {store.demand.recommendedProduction} units.
              </p>
            </div>
          </div>
          <Button
            onClick={calculateForecast}
            className="bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-bold rounded-xl px-4 py-2 shrink-0 cursor-pointer shadow-xs"
          >
            Re-run Forecast
          </Button>
        </div>
      )}

      {/* Main Grid: Parameters Left, Forecast Card & Step Calculation Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Forecasting Inputs Panel (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-700" /> Sales &amp; Inventory Parameters
            </h4>

            {/* Current Inventory & Monthly Capacity */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Current Stock (Units)</label>
                <input
                  type="number"
                  value={currentStock}
                  onChange={(e) => setCurrentStock(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Monthly Capacity</label>
                <input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50"
                />
              </div>
            </div>

            {/* Seasonality Factor & Raw Material per Unit */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Seasonality Factor</label>
                <select
                  value={seasonality}
                  onChange={(e) => setSeasonality(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50"
                >
                  <option value={1.0}>Normal Season (1.0x)</option>
                  <option value={1.15}>Agro Harvest Surge (+15%)</option>
                  <option value={1.25}>Festival Peak Surge (+25%)</option>
                  <option value={0.85}>Monsoon Lull (-15%)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Raw Material Ratio</label>
                <input
                  type="number"
                  step="0.1"
                  value={materialRatio}
                  onChange={(e) => setMaterialRatio(parseFloat(e.target.value) || 1)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50"
                />
                <span className="text-[10px] text-slate-400 block mt-0.5">kg / finished unit</span>
              </div>
            </div>

            {/* Multi-month Sales History */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-bold text-slate-700 block">
                Last 5 Months Dispatch History (Jan - May)
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {salesInputs.map((val, idx) => (
                  <input
                    key={idx}
                    type="number"
                    value={val}
                    onChange={(e) => {
                      const updated = [...salesInputs];
                      updated[idx] = parseInt(e.target.value) || 0;
                      setSalesInputs(updated);
                    }}
                    className="w-full px-1.5 py-1.5 rounded-lg border border-slate-200 text-[11px] font-bold text-center bg-slate-50"
                  />
                ))}
              </div>
            </div>

            <Button
              onClick={calculateForecast}
              className="w-full bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-bold rounded-xl py-3 shadow-xs cursor-pointer"
            >
              Update Projection &amp; Material Plan
            </Button>
          </div>
        </div>

        {/* Right Column: Step-by-Step Worked Calculation & Trend Chart (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Step-by-Step Worked Arithmetic Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                  Transparent Planning Formula
                </span>
                <h4 className="font-extrabold text-base text-text-slate-900">
                  Step-by-Step Production Math
                </h4>
              </div>
              <span className="text-xs font-extrabold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full">
                Next Month Demand: {store.demand.projectedDemand.toLocaleString("en-IN")} Units
              </span>
            </div>

            {/* Step formula breakdown cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-0.5">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">1. Projected Demand</span>
                <span className="text-base font-extrabold text-text-slate-900">
                  {store.demand.projectedDemand}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-0.5">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">2. Current Stock</span>
                <span className="text-base font-extrabold text-text-slate-900">
                  {store.demand.currentInventory}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100 text-center space-y-0.5">
                <span className="text-[10px] text-amber-800 font-bold uppercase block">3. Shortfall</span>
                <span className="text-base font-extrabold text-amber-900">
                  {store.demand.shortageUnits}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-center space-y-0.5">
                <span className="text-[10px] text-emerald-800 font-bold uppercase block">4. Target Batch</span>
                <span className="text-base font-extrabold text-[#14532D]">
                  {store.demand.recommendedProduction}
                </span>
              </div>
            </div>

            {/* Suggested Raw Material Procurement Callout */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50/80 to-[#DCFCE7]/60 border border-emerald-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#14532D] text-white flex items-center justify-center shrink-0">
                  <Boxes className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-extrabold text-xs text-[#14532D]">
                    Suggested Raw Material Order: {store.demand.rawMaterialKg.toLocaleString("en-IN")} kg
                  </h5>
                  <p className="text-[11px] text-emerald-900">
                    Formula: {store.demand.recommendedProduction} target units × {materialRatio} kg material ratio
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-extrabold text-emerald-950 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
                Order by Jun 2
              </span>
            </div>

            {/* Recharts Historical + Predicted Line Chart */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Demand Forecast Curve (Historical vs Predicted)</span>
                <span className="text-emerald-700">↑ {store.demand.growthPercent}% vs last month</span>
              </div>

              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 15, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                    <XAxis dataKey="month" stroke="#64748B" fontSize={10} tickLine={false} />
                    <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: "12px",
                        border: "1px solid #E2E8F0",
                        fontSize: "11px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#065F46"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: "#065F46" }}
                      name="Actual Sales"
                    />
                    <Line
                      type="monotone"
                      dataKey="projected"
                      stroke="#10B981"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={{ r: 4, fill: "#10B981" }}
                      name="AI Projected Demand"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
