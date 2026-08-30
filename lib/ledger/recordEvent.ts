import { ImpactLedgerItem } from "@/lib/context/ModuleResultsContext";

export function createImpactLedgerEntry(
  title: string,
  valueCreatedInr: number,
  category: string,
  impactNote: string
): ImpactLedgerItem {
  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return {
    id: `LEDGER-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    date: dateStr,
    title,
    valueCreatedInr,
    category,
    impactNote,
  };
}
