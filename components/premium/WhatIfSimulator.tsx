"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useModuleResults } from "@/lib/context/ModuleResultsContext";
import { useAuth } from "@/lib/auth-context";
import {
  BusinessSnapshot,
  SimulationInputs,
  SimulationResult,
} from "@/lib/simulator/types";
import {
  runSimulation,
  findBestScenario,
} from "@/lib/simulator/engine";
import ScenarioCompareTable from "@/components/dashboard/simulator/ScenarioCompareTable";
import {
  Sliders,
  Sparkles,
  TrendingUp,
  IndianRupee,
  Layers,
  Factory,
  ShieldAlert,
  History,
  CheckCircle2,
  AlertTriangle,
  Scale,
  BookmarkPlus,
  Send,
  HelpCircle,
  Zap,
  RotateCcw,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatIfSimulator() {
  const { store } = useModuleResults();
  const { user } = useAuth();

  // 1. Derive real current business snapshot from store & user context
  const currentSnapshot: BusinessSnapshot = useMemo(() => {
    const monthlyProd = store.demand.currentInventory > 0 ? store.demand.currentInventory : 4500;
    const maxCapacity = store.demand.productionCapacity > 0 ? store.demand.productionCapacity : 6000;
    const monthlyRev = store.credit.annualTurnover
      ? Math.round(store.credit.annualTurnover / 12)
      : store.credit.monthlyRevenue || 675000;
    const defectPct = store.quality.defectPercent || 0.0;
    const workingCap = store.credit.existingLiabilities
      ? Math.max(100000, Math.round(monthlyRev * 0.45))
      : 250000;

    return {
      currentMonthlyProduction: monthlyProd,
      currentMonthlyRevenue: monthlyRev,
      currentDefectRatePct: defectPct,
      maxProductionCapacity: maxCapacity,
      unitSellingPrice: Math.round(monthlyRev / Math.max(1, monthlyProd)),
      unitMaterialCost: Math.round((monthlyRev / Math.max(1, monthlyProd)) * 0.45),
      workerCount: 12,
      workingHoursPerDay: 8,
      availableWorkingCapital: workingCap,
    };
  }, [store]);

  // 2. Multi-Variable Inputs State
  const [productionChangePct, setProductionChangePct] = useState<number>(20);
  const [priceChangePct, setPriceChangePct] = useState<number>(0);
  const [materialCostChangePct, setMaterialCostChangePct] = useState<number>(0);
  const [workerCountChange, setWorkerCountChange] = useState<number>(0);
  const [workingHoursPerDay, setWorkingHoursPerDay] = useState<number>(8);
  const [defectRateChangePct, setDefectRateChangePct] = useState<number>(0);

  // 3. Natural Language "Ask Sahayya" Input State
  const [naturalPrompt, setNaturalPrompt] = useState<string>("");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // 4. Active Simulation Result
  const [activeResult, setActiveResult] = useState<SimulationResult>(() =>
    runSimulation(currentSnapshot, {
      productionChangePct: 20,
      priceChangePct: 0,
      materialCostChangePct: 0,
      workerCountChange: 0,
      workingHoursPerDay: 8,
      defectRateChangePct: 0,
    })
  );

  // 5. Best Scenario Finder State
  const [bestScenarioData, setBestScenarioData] = useState<{
    bestResult: SimulationResult;
    testedCount: number;
    reasons: string[];
  } | null>(null);

  // 6. Saved Scenarios & Compare State
  const [savedScenarios, setSavedScenarios] = useState<SimulationResult[]>([]);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);

  // Load saved scenarios from localStorage if present
  useEffect(() => {
    try {
      const stored = localStorage.getItem("sahayya_saved_scenarios");
      if (stored) {
        setSavedScenarios(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSaveCurrentScenario = () => {
    const label = `Scenario ${savedScenarios.length + 1} (${activeResult.inputs.productionChangePct >= 0 ? "+" : ""}${activeResult.inputs.productionChangePct}% Prod)`;
    const newSc = { ...activeResult, label, id: `SAVED-${Date.now()}` };
    const updated = [newSc, ...savedScenarios.slice(0, 5)];
    setSavedScenarios(updated);
    try {
      localStorage.setItem("sahayya_saved_scenarios", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleRunManualSimulation = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSimulating(true);

    setTimeout(() => {
      const inputs: SimulationInputs = {
        productionChangePct,
        priceChangePct,
        materialCostChangePct,
        workerCountChange,
        workingHoursPerDay,
        defectRateChangePct,
      };
      const res = runSimulation(currentSnapshot, inputs);
      setActiveResult(res);
      setIsSimulating(false);
    }, 200);
  };

  // "Ask Sahayya" Natural-Language Processor
  const handleAskSahayya = (queryText: string) => {
    const q = queryText.trim().toLowerCase();
    if (!q) return;

    setIsSimulating(true);
    let targetProd = 20;
    let targetPrice = 0;
    let targetMat = 0;
    let targetWorkers = 0;
    let targetHours = 8;
    let targetDefect = 0;

    // Constraint extraction heuristics
    if (q.includes("2 lakh") || q.includes("200000") || q.includes("safest")) {
      targetProd = 32;
      targetWorkers = 1;
      targetHours = 8;
      targetDefect = -5;
    } else if (q.includes("65%") || q.includes("65 percent")) {
      targetProd = 65;
      targetWorkers = 4;
      targetHours = 10;
      targetDefect = 10;
    } else if (q.includes("price") && q.includes("raw material")) {
      targetProd = 15;
      targetPrice = 5;
      targetMat = 12;
      targetDefect = 0;
    } else if (q.includes("second shift") || q.includes("night shift")) {
      targetProd = 45;
      targetWorkers = 3;
      targetHours = 12;
      targetDefect = 5;
    } else if (q.includes("slowdown") || q.includes("reduce") || q.includes("lean")) {
      targetProd = -25;
      targetWorkers = -2;
      targetHours = 8;
    } else {
      const pctMatch = q.match(/(\d+)%/);
      if (pctMatch) {
        targetProd = parseInt(pctMatch[1]);
      } else {
        targetProd = 30;
      }
    }

    setProductionChangePct(targetProd);
    setPriceChangePct(targetPrice);
    setMaterialCostChangePct(targetMat);
    setWorkerCountChange(targetWorkers);
    setWorkingHoursPerDay(targetHours);
    setDefectRateChangePct(targetDefect);

    setTimeout(() => {
      const inputs: SimulationInputs = {
        productionChangePct: targetProd,
        priceChangePct: targetPrice,
        materialCostChangePct: targetMat,
        workerCountChange: targetWorkers,
        workingHoursPerDay: targetHours,
        defectRateChangePct: targetDefect,
      };
      const res = runSimulation(currentSnapshot, inputs, queryText);
      setActiveResult(res);
      setIsSimulating(false);
    }, 250);
  };

  // Best Scenario Finder Execution
  const handleFindBest = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const best = findBestScenario(currentSnapshot);
      setBestScenarioData(best);
      setActiveResult(best.bestResult);
      // Load best values into sliders
      setProductionChangePct(best.bestResult.inputs.productionChangePct);
      setPriceChangePct(best.bestResult.inputs.priceChangePct);
      setMaterialCostChangePct(best.bestResult.inputs.materialCostChangePct);
      setWorkerCountChange(best.bestResult.inputs.workerCountChange);
      setWorkingHoursPerDay(best.bestResult.inputs.workingHoursPerDay);
      setDefectRateChangePct(best.bestResult.inputs.defectRateChangePct);
      setIsSimulating(false);
    }, 300);
  };

  const handleToggleCompare = (id: string) => {
    setSelectedForCompare((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const scenariosToCompare = useMemo(() => {
    return savedScenarios.filter((s) => selectedForCompare.includes(s.id));
  }, [savedScenarios, selectedForCompare]);

  return (
    <section id="section-whatif" className="scroll-mt-24 w-full space-y-6 text-left">
      
      {/* Compare Modal */}
      {showCompareModal && (
        <ScenarioCompareTable
          scenarios={scenariosToCompare.length > 0 ? scenariosToCompare : [activeResult]}
          onClose={() => setShowCompareModal(false)}
          onSelectScenario={(sc) => {
            setActiveResult(sc);
            setProductionChangePct(sc.inputs.productionChangePct);
            setPriceChangePct(sc.inputs.priceChangePct);
            setMaterialCostChangePct(sc.inputs.materialCostChangePct);
            setWorkerCountChange(sc.inputs.workerCountChange);
            setWorkingHoursPerDay(sc.inputs.workingHoursPerDay);
            setDefectRateChangePct(sc.inputs.defectRateChangePct);
          }}
        />
      )}

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-100 text-[#14532D]">
              <Sliders className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
              Section 10 • Business Decision Engine
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            What-If Scenario Simulator
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Test business decisions before taking financial risks — evaluate demand fit, cash flow, capacity strain, and quality risk.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleFindBest}
            className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl py-2 px-3.5 shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Find Best Scenario</span>
          </Button>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#14532D] text-xs font-bold shadow-2xs">
            <span>Multi-Variable AI Engine</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Controls (5 cols) & Right Decision Dossier (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Natural Language "Ask Sahayya" + Multi-Variable Sliders (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Card 1: "Ask Sahayya" Natural-Language Assistant */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Ask Sahayya (Natural Language Planning)
              </span>
              <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                Deterministic Engine
              </span>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <textarea
                  rows={2}
                  value={naturalPrompt}
                  onChange={(e) => setNaturalPrompt(e.target.value)}
                  placeholder="e.g. I have ₹2 lakh available. What is the safest way to increase production?"
                  className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600 resize-none"
                />
                <button
                  type="button"
                  onClick={() => handleAskSahayya(naturalPrompt)}
                  className="absolute right-2.5 bottom-3.5 p-1.5 rounded-lg bg-[#14532D] text-white hover:bg-[#0F3D2E] transition-colors cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10.5px]">
                <span className="text-slate-400 font-bold shrink-0">Try:</span>
                <button
                  type="button"
                  onClick={() => {
                    const q = "I have ₹2 lakh available. What is the safest way to increase production?";
                    setNaturalPrompt(q);
                    handleAskSahayya(q);
                  }}
                  className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-[#14532D] whitespace-nowrap transition-colors cursor-pointer font-medium"
                >
                  ₹2L budget safe expansion
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const q = "What if raw material prices rise by 15% and we raise prices by 5%?";
                    setNaturalPrompt(q);
                    handleAskSahayya(q);
                  }}
                  className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-[#14532D] whitespace-nowrap transition-colors cursor-pointer font-medium"
                >
                  +15% material cost shock
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Multi-Variable Simulation Sliders */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-slate-500" />
                Multi-Variable Decision Sliders
              </h4>
              <button
                type="button"
                onClick={() => {
                  setProductionChangePct(0);
                  setPriceChangePct(0);
                  setMaterialCostChangePct(0);
                  setWorkerCountChange(0);
                  setWorkingHoursPerDay(8);
                  setDefectRateChangePct(0);
                }}
                className="text-[10px] text-slate-400 hover:text-slate-700 flex items-center gap-1 font-bold cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            <form onSubmit={handleRunManualSimulation} className="space-y-3.5">
              
              {/* 1. Production Change (%) */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Monthly Production Output</span>
                  <span className="text-[#14532D] font-extrabold text-xs">
                    {productionChangePct >= 0 ? `+${productionChangePct}%` : `${productionChangePct}%`}
                  </span>
                </div>
                <input
                  type="range"
                  min="-40"
                  max="80"
                  step="5"
                  value={productionChangePct}
                  onChange={(e) => setProductionChangePct(parseInt(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                  <span>-40% (Slowdown)</span>
                  <span>0% (Baseline)</span>
                  <span>+80% (Expansion)</span>
                </div>
              </div>

              {/* 2. Selling Price Change (%) & Raw-Material Cost Change (%) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                    <span>Selling Price</span>
                    <span className="text-emerald-800 font-extrabold">
                      {priceChangePct >= 0 ? `+${priceChangePct}%` : `${priceChangePct}%`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="30"
                    step="2"
                    value={priceChangePct}
                    onChange={(e) => setPriceChangePct(parseInt(e.target.value))}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                    <span>-20%</span>
                    <span>+30%</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                    <span>Material Cost</span>
                    <span className="text-amber-800 font-extrabold">
                      {materialCostChangePct >= 0 ? `+${materialCostChangePct}%` : `${materialCostChangePct}%`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="30"
                    step="2"
                    value={materialCostChangePct}
                    onChange={(e) => setMaterialCostChangePct(parseInt(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                    <span>-20%</span>
                    <span>+30%</span>
                  </div>
                </div>
              </div>

              {/* 3. Number of Workers & Working Hours */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 block">
                    Workers (Delta: {workerCountChange >= 0 ? `+${workerCountChange}` : workerCountChange})
                  </label>
                  <input
                    type="number"
                    min="-10"
                    max="20"
                    value={workerCountChange}
                    onChange={(e) => setWorkerCountChange(parseInt(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold bg-white"
                  />
                  <span className="text-[9px] text-slate-400 block">Total: {currentSnapshot.workerCount + workerCountChange} workers</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 block">
                    Shift Hours / Day
                  </label>
                  <input
                    type="number"
                    min="6"
                    max="16"
                    value={workingHoursPerDay}
                    onChange={(e) => setWorkingHoursPerDay(parseInt(e.target.value) || 8)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold bg-white"
                  />
                  <span className="text-[9px] text-slate-400 block">{workingHoursPerDay > 8 ? "Overtime / Double Shift" : "Single Standard Shift"}</span>
                </div>
              </div>

              {/* 4. Quality / Defect Rate Change (%) */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Defect Rate Target Change</span>
                  <span className="text-slate-900 font-extrabold text-xs">
                    {defectRateChangePct >= 0 ? `+${defectRateChangePct}%` : `${defectRateChangePct}%`}
                  </span>
                </div>
                <input
                  type="range"
                  min="-20"
                  max="20"
                  step="5"
                  value={defectRateChangePct}
                  onChange={(e) => setDefectRateChangePct(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                  <span>-20% (Quality Upgrade)</span>
                  <span>0%</span>
                  <span>+20% (Relaxed)</span>
                </div>
              </div>

              {/* Action Buttons: Run & Save */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <Button
                  type="submit"
                  disabled={isSimulating}
                  className="w-full bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-bold rounded-xl py-2.5 shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{isSimulating ? "Recalculating..." : "Run Simulation"}</span>
                </Button>
                <Button
                  type="button"
                  onClick={handleSaveCurrentScenario}
                  variant="outline"
                  className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl py-2.5 shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <BookmarkPlus className="w-3.5 h-3.5 text-slate-500" />
                  <span>Save Scenario</span>
                </Button>
              </div>
            </form>

            {/* Saved Scenarios Archive & Comparison */}
            {savedScenarios.length > 0 && (
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5" /> Saved Scenarios ({savedScenarios.length})
                  </span>
                  {selectedForCompare.length >= 2 && (
                    <button
                      type="button"
                      onClick={() => setShowCompareModal(true)}
                      className="text-[10.5px] font-extrabold text-[#14532D] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Scale className="w-3 h-3" /> Compare ({selectedForCompare.length})
                    </button>
                  )}
                </div>

                <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                  {savedScenarios.map((sc) => {
                    const isChecked = selectedForCompare.includes(sc.id);
                    return (
                      <div
                        key={sc.id}
                        className="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-100 text-xs font-semibold text-slate-800 flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleCompare(sc.id)}
                            className="rounded accent-emerald-700 cursor-pointer"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setActiveResult(sc);
                              setProductionChangePct(sc.inputs.productionChangePct);
                              setPriceChangePct(sc.inputs.priceChangePct);
                              setMaterialCostChangePct(sc.inputs.materialCostChangePct);
                              setWorkerCountChange(sc.inputs.workerCountChange);
                              setWorkingHoursPerDay(sc.inputs.workingHoursPerDay);
                              setDefectRateChangePct(sc.inputs.defectRateChangePct);
                            }}
                            className="truncate text-left cursor-pointer hover:text-[#14532D]"
                          >
                            {sc.label || sc.query}
                          </button>
                        </div>
                        <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${sc.deltas.profitDeltaAbs >= 0 ? "text-emerald-800 bg-emerald-100" : "text-amber-800 bg-amber-100"}`}>
                          {sc.deltas.profitDeltaAbs >= 0 ? "+₹" : "-₹"}{Math.abs(Math.round(sc.deltas.profitDeltaAbs / 1000))}k
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Decision Intelligence Outcome Dossier (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Best Scenario Finder Result Callout (If active) */}
          {bestScenarioData && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-700 fill-amber-700" />
                  Best Scenario Optimizer Result
                </span>
                <span className="text-[10.5px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  Tested {bestScenarioData.testedCount} Production Plans
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-amber-950">
                  Optimal Plan: <strong>+{bestScenarioData.bestResult.inputs.productionChangePct}% Production</strong>
                </p>
                <div className="space-y-0.5 pl-4 text-[11px] text-amber-900">
                  {bestScenarioData.reasons.map((r, i) => (
                    <div key={i}>• {r}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Card 3: 1. BEFORE vs AFTER COMPARISON CARD (Hero Outcome) */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">
                  Strategic Impact Analysis • {activeResult.timestamp}
                </span>
                <h4 className="font-extrabold text-base sm:text-lg text-slate-900">
                  &ldquo;{activeResult.query}&rdquo;
                </h4>
              </div>
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-[#14532D] border border-emerald-200">
                Live Simulation
              </span>
            </div>

            {/* Before vs After Two-Column Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Left Column: Current Baseline */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/60">
                  <span className="font-extrabold text-xs text-slate-700 uppercase tracking-wider">
                    Current Baseline
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold">Stored Telemetry</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Monthly Production</span>
                    <strong className="text-slate-900">{activeResult.before.productionUnits.toLocaleString("en-IN")} units</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Monthly Revenue</span>
                    <strong className="text-slate-900">₹{activeResult.before.revenue.toLocaleString("en-IN")}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Quality Defect Rate</span>
                    <strong className="text-slate-900">{activeResult.before.defectRatePct}%</strong>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                    <span className="text-slate-500 font-medium">Estimated Net Profit</span>
                    <strong className="text-slate-900">₹{activeResult.before.monthlyProfit.toLocaleString("en-IN")}</strong>
                  </div>
                </div>
              </div>

              {/* Right Column: After Scenario */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-emerald-200/60">
                  <span className="font-extrabold text-xs text-[#14532D] uppercase tracking-wider">
                    After Scenario
                  </span>
                  <span className="text-[10px] text-emerald-800 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-full">
                    Projected
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Monthly Production</span>
                    <div className="flex items-center gap-1.5 font-bold">
                      <strong className="text-slate-900">{activeResult.after.productionUnits.toLocaleString("en-IN")} units</strong>
                      <span className={`text-[10.5px] font-extrabold ${activeResult.deltas.productionDeltaPct >= 0 ? "text-emerald-700" : "text-amber-700"}`}>
                        ({activeResult.deltas.productionDeltaPct >= 0 ? "+" : ""}{activeResult.deltas.productionDeltaPct}%)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Monthly Revenue</span>
                    <div className="flex items-center gap-1.5 font-bold">
                      <strong className="text-slate-900">₹{activeResult.after.revenue.toLocaleString("en-IN")}</strong>
                      <span className={`text-[10.5px] font-extrabold ${activeResult.deltas.revenueDeltaAbs >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                        ({activeResult.deltas.revenueDeltaAbs >= 0 ? "+₹" : "-₹"}{Math.abs(activeResult.deltas.revenueDeltaAbs).toLocaleString("en-IN")})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Quality Defect Rate</span>
                    <div className="flex items-center gap-1.5 font-bold">
                      <strong className="text-slate-900">{activeResult.after.defectRatePct}%</strong>
                      <span className={`text-[10.5px] font-extrabold ${activeResult.after.defectRatePct > activeResult.before.defectRatePct ? "text-amber-700" : "text-emerald-700"}`}>
                        ({activeResult.after.defectRatePct > activeResult.before.defectRatePct ? "+" : ""}{(activeResult.after.defectRatePct - activeResult.before.defectRatePct).toFixed(1)}%)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-emerald-200/60">
                    <span className="text-slate-600 font-medium">Estimated Net Profit</span>
                    <div className="flex items-center gap-1.5 font-bold">
                      <strong className="text-slate-900">₹{activeResult.after.monthlyProfit.toLocaleString("en-IN")}</strong>
                      <span className={`text-[10.5px] font-extrabold ${activeResult.deltas.profitDeltaAbs >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                        ({activeResult.deltas.profitDeltaAbs >= 0 ? "+₹" : "-₹"}{Math.abs(activeResult.deltas.profitDeltaAbs).toLocaleString("en-IN")})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* 3. RISK vs REWARD METERS */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Risk vs. Reward Assessment
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Profit Potential */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-600">Profit Potential</span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      activeResult.risks.profitPotential === "High"
                        ? "bg-emerald-100 text-[#14532D]"
                        : activeResult.risks.profitPotential === "Medium"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {activeResult.risks.profitPotential}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-slate-600 leading-snug">
                    {activeResult.risks.profitExplanation}
                  </p>
                </div>

                {/* Operational Risk */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-600">Operational Risk</span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      activeResult.risks.operationalRisk === "High"
                        ? "bg-red-100 text-red-800"
                        : activeResult.risks.operationalRisk === "Medium"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-[#14532D]"
                    }`}>
                      {activeResult.risks.operationalRisk}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-slate-600 leading-snug">
                    {activeResult.risks.operationalExplanation}
                  </p>
                </div>

                {/* Cash-Flow Risk */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-600">Cash-Flow Risk</span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      activeResult.risks.cashFlowRisk === "High"
                        ? "bg-red-100 text-red-800"
                        : activeResult.risks.cashFlowRisk === "Medium"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-[#14532D]"
                    }`}>
                      {activeResult.risks.cashFlowRisk}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-slate-600 leading-snug">
                    {activeResult.risks.cashFlowExplanation}
                  </p>
                </div>

              </div>
            </div>

            {/* 4. AI RECOMMENDATION CARD */}
            <div className={`p-4 rounded-2xl border flex items-start gap-3 shadow-2xs ${
              activeResult.recommendationType === "Proceed"
                ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
                : activeResult.recommendationType === "Proceed with caution"
                ? "bg-amber-50/80 border-amber-200 text-amber-950"
                : "bg-rose-50/80 border-rose-200 text-rose-950"
            }`}>
              <div className="p-2 rounded-xl bg-white shadow-xs shrink-0 mt-0.5">
                <Sparkles className={`w-4 h-4 ${
                  activeResult.recommendationType === "Proceed"
                    ? "text-emerald-700"
                    : activeResult.recommendationType === "Proceed with caution"
                    ? "text-amber-700"
                    : "text-rose-700"
                }`} />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10.5px] font-black uppercase tracking-wider block">
                  AI Decision Recommendation
                </span>
                <p className="text-xs sm:text-sm font-extrabold leading-snug">
                  {activeResult.aiRecommendation}
                </p>
              </div>
            </div>

            {/* 5-Dimensional Cause-and-Effect Dossier */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Detailed 5-Point Operational Breakdown
              </span>

              <div className="space-y-2">
                {/* 1. Demand Impact */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="p-1.5 rounded-xl bg-blue-100 text-blue-800 shrink-0 mt-0.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">1. Demand &amp; Sales Impact</h5>
                    <p className="text-xs text-slate-700 leading-snug mt-0.5">{activeResult.demandImpact}</p>
                  </div>
                </div>

                {/* 2. Inventory Impact */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="p-1.5 rounded-xl bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">2. Inventory &amp; Raw Material</h5>
                    <p className="text-xs text-slate-700 leading-snug mt-0.5">{activeResult.inventoryImpact}</p>
                  </div>
                </div>

                {/* 3. Cost Impact */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="p-1.5 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                    <IndianRupee className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">3. Working Capital &amp; Power Cost</h5>
                    <p className="text-xs text-slate-700 leading-snug mt-0.5">{activeResult.costImpact}</p>
                  </div>
                </div>

                {/* 4. Capacity Impact */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="p-1.5 rounded-xl bg-purple-100 text-purple-800 shrink-0 mt-0.5">
                    <Factory className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">4. Shop-Floor Utilization</h5>
                    <p className="text-xs text-slate-700 leading-snug mt-0.5">{activeResult.capacityImpact}</p>
                  </div>
                </div>

                {/* 5. Quality Risk Impact */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="p-1.5 rounded-xl bg-red-100 text-red-700 shrink-0 mt-0.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">5. Quality &amp; Defect Risk</h5>
                    <p className="text-xs text-slate-700 leading-snug mt-0.5">{activeResult.qualityRiskImpact}</p>
                  </div>
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
        </div>

      </div>
    </section>
  );
}
