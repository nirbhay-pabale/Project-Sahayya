"use client";

import React, { useState } from "react";
import { Plus, AlertTriangle, CheckCircle2, Trash2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

interface StockItem {
  id: string;
  name: string;
  quantity: number;
  threshold: number;
  unit: string;
}

interface StockLedgerCardProps {
  onOpenUpgrade?: () => void;
}

export default function StockLedgerCard({ onOpenUpgrade }: StockLedgerCardProps) {
  const { t } = useLanguage();
  const [items, setItems] = useState<StockItem[]>([
    { id: "1", name: "High-Tensile Fasteners", quantity: 420, threshold: 100, unit: "kg" },
    { id: "2", name: "Grade A Agro Pouches", quantity: 45, threshold: 150, unit: "units" },
    { id: "3", name: "Machine Lubricant IS-30", quantity: 18, threshold: 20, unit: "Litres" },
  ]);

  const [newItemName, setNewItemName] = useState("");
  const [newItemQty, setNewItemQty] = useState("");
  const [newItemThreshold, setNewItemThreshold] = useState("");
  const [newItemUnit, setNewItemUnit] = useState("units");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !newItemQty || !newItemThreshold) return;
    const item: StockItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      quantity: Number(newItemQty),
      threshold: Number(newItemThreshold),
      unit: newItemUnit,
    };
    setItems((prev) => [item, ...prev]);
    setNewItemName("");
    setNewItemQty("");
    setNewItemThreshold("");
    setShowAddForm(false);
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
    );
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const lowStockCount = items.filter((i) => i.quantity < i.threshold).length;

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-md p-4 sm:p-5 space-y-4 text-left my-2">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 flex items-center justify-center font-bold text-lg">
            📦
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-sm sm:text-base text-text-slate-900 leading-tight">
                {t.cards.stock.title}
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                {t.cards.stock.liveLedgerBadge}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              {t.cards.stock.subtitle}
            </p>
          </div>
        </div>

        {lowStockCount > 0 ? (
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> {lowStockCount} {t.cards.stock.lowStockBadge}
          </span>
        ) : (
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> {t.cards.stock.allHealthyBadge}
          </span>
        )}
      </div>

      {/* Stock Items List */}
      <div className="space-y-2">
        {items.map((item) => {
          const isLow = item.quantity < item.threshold;
          return (
            <div
              key={item.id}
              className={`p-3 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isLow ? "bg-amber-50/50 border-amber-200" : "bg-slate-50 border-slate-100"
              }`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h5 className="font-bold text-xs sm:text-sm text-text-slate-900 truncate">
                    {item.name}
                  </h5>
                  {isLow && (
                    <span className="text-[10px] font-extrabold bg-red-100 text-red-700 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                      {t.cards.stock.lowStockBadge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {t.cards.stock.minThresholdLabel}: {item.threshold} {item.unit}
                </p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                {/* Quantity Controls */}
                <div className="flex items-center border border-slate-200 bg-white rounded-xl shadow-2xs overflow-hidden">
                  <button
                    type="button"
                    onClick={() => handleUpdateQty(item.id, -10)}
                    className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
                  >
                    -10
                  </button>
                  <span className="px-3 py-1 text-xs font-extrabold text-slate-900 border-x border-slate-100 min-w-[65px] text-center">
                    {item.quantity} {item.unit}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleUpdateQty(item.id, 10)}
                    className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
                  >
                    +10
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Delete item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Item Form / Button */}
      {showAddForm ? (
        <form onSubmit={handleAddItem} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h5 className="font-bold text-xs text-text-slate-900">{t.cards.stock.formTitle}</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              required
              placeholder={t.cards.stock.itemNamePlaceholder}
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white"
            />
            <div className="grid grid-cols-3 gap-1">
              <input
                type="number"
                required
                placeholder={t.cards.stock.qtyPlaceholder}
                value={newItemQty}
                onChange={(e) => setNewItemQty(e.target.value)}
                className="px-2 py-1.5 rounded-xl border border-slate-200 text-xs bg-white"
              />
              <input
                type="number"
                required
                placeholder={t.cards.stock.thresholdPlaceholder}
                value={newItemThreshold}
                onChange={(e) => setNewItemThreshold(e.target.value)}
                className="px-2 py-1.5 rounded-xl border border-slate-200 text-xs bg-white"
              />
              <input
                type="text"
                placeholder={t.cards.stock.unitPlaceholder}
                value={newItemUnit}
                onChange={(e) => setNewItemUnit(e.target.value)}
                className="px-2 py-1.5 rounded-xl border border-slate-200 text-xs bg-white"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-200 cursor-pointer"
            >
              {t.common.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-[#14532D] text-white text-xs font-bold shadow-xs hover:bg-[#0F3D2E] cursor-pointer"
            >
              {t.cards.stock.saveItemBtn}
            </button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-emerald-600 hover:bg-emerald-50/50 text-xs font-bold text-slate-700 hover:text-emerald-900 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 text-emerald-700" />
          <span>{t.cards.stock.addNewItemBtn}</span>
        </button>
      )}

      {/* Pro Tier Upgrade Note */}
      <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-slate-700 leading-relaxed space-y-2.5">
        <p className="font-medium text-emerald-950">
          {t.cards.stock.upgradePrompt}
        </p>
        <Button
          onClick={onOpenUpgrade}
          size="sm"
          className="w-full bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-bold rounded-xl py-2 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.cards.stock.upgradePrompt}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

    </div>
  );
}
