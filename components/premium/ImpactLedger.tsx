"use client";

import React, { useState } from "react";
import { useModuleResults } from "@/lib/context/ModuleResultsContext";
import { createImpactLedgerEntry } from "@/lib/ledger/recordEvent";
import {
  History,
  TrendingUp,
  Award,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ImpactLedger() {
  const { store, addImpactEntry } = useModuleResults();
  const [newTitle, setNewTitle] = useState("");
  const [newValue, setNewValue] = useState<number>(12000);
  const [newCategory, setNewCategory] = useState("Operational Savings");
  const [newNote, setNewNote] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const totalValueCreated = store.impactLedger.reduce(
    (sum, item) => sum + (item.valueCreatedInr || 0),
    0
  );

  const handleCreateManualEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const entry = createImpactLedgerEntry(
      newTitle.trim(),
      newValue,
      newCategory,
      newNote.trim() || "Quantified operational savings verified by Sahayya cluster analytics."
    );

    addImpactEntry(entry);
    setNewTitle("");
    setNewNote("");
    setShowAddModal(false);
  };

  return (
    <section id="section-ledger" className="scroll-mt-24 w-full space-y-6 text-left">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-100 text-[#14532D]">
              <History className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
              Section 11 • Value Realization
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-slate-900 tracking-tight mt-1">
            Impact &amp; Value Ledger
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Running audited log of financial losses avoided, safety hazards prevented, and compliance penalties cleared.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#14532D] text-xs font-bold shadow-2xs">
          <span>{store.impactLedger.length} Verified Milestones</span>
        </div>
      </div>

      {/* Hero Cumulative Total Value Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#14532D] to-[#0A3423] text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 block">
            Cumulative Quantified Enterprise Value Created
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              ₹{totalValueCreated.toLocaleString("en-IN")}
            </span>
            <span className="text-xs font-bold text-emerald-200">total savings realized</span>
          </div>
          <p className="text-xs text-emerald-100/80 pt-1">
            Calculated across defect reductions, avoided stockouts, and DISH regulatory clearance.
          </p>
        </div>

        <Button
          onClick={() => setShowAddModal(!showAddModal)}
          className="bg-white hover:bg-slate-100 text-[#14532D] text-xs font-bold rounded-xl py-3 px-5 shadow-md cursor-pointer self-start sm:self-auto shrink-0"
        >
          <PlusCircle className="w-4 h-4 mr-1.5" /> Log Value Milestone
        </Button>
      </div>

      {/* Manual Entry Form when toggled */}
      {showAddModal && (
        <form
          onSubmit={handleCreateManualEntry}
          className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-3"
        >
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">
            Log New Verified Value Event
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Bulk Raw Material Discount Secured"
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
            />
            <input
              type="number"
              required
              value={newValue}
              onChange={(e) => setNewValue(parseFloat(e.target.value) || 0)}
              placeholder="Value in INR (₹)"
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
            >
              <option value="Operational Savings">Operational Savings</option>
              <option value="Quality Loss Prevention">Quality Loss Prevention</option>
              <option value="Compliance Savings">Compliance Savings</option>
              <option value="Sales Protection">Sales Protection</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddModal(false)}
              className="text-xs font-semibold rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#14532D] text-white text-xs font-bold rounded-xl px-5 cursor-pointer"
            >
              Save Milestone
            </Button>
          </div>
        </form>
      )}

      {/* Running Ledger Events List */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            Audited Value Log (Most Recent First)
          </span>
          <span className="text-xs text-slate-500 font-medium">Auto-recorded</span>
        </div>

        <div className="divide-y divide-slate-100">
          {store.impactLedger.map((item) => (
            <div key={item.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#14532D] flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h5 className="font-bold text-xs sm:text-sm text-text-slate-900">{item.title}</h5>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{item.impactNote}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">
                    {item.date}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#14532D]">
                    + ₹{item.valueCreatedInr.toLocaleString("en-IN")}
                  </span>
                </div>
                <span className="p-1 rounded-full bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
