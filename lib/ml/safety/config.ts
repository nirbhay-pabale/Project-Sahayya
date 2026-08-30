export type RequiredPPEClass = "helmet" | "goggles" | "Gloves";

export const REQUIRED_PPE_ITEMS: RequiredPPEClass[] = [
  "helmet",
  "goggles",
  "Gloves",
];

export const CONFIDENCE_THRESHOLD = 0.5;

// Tunable interval settings for polling Vision AI (safe free-tier conservative intervals)
export const ENTRY_CHECK_INTERVAL_MS = 15000; // 15 seconds for Panel A
export const MONITORING_CHECK_INTERVAL_MS = 25000; // 25 seconds for Panel B
export const DETECTION_INTERVAL_MS = ENTRY_CHECK_INTERVAL_MS;

export const PPE_CLASS_COLORS: Record<
  string,
  { border: string; bg: string; text: string; hex: string }
> = {
  helmet: { border: "border-amber-500", bg: "bg-amber-500/20", text: "text-amber-300", hex: "#F59E0B" },
  goggles: { border: "border-cyan-400", bg: "bg-cyan-400/20", text: "text-cyan-300", hex: "#06B6D4" },
  Gloves: { border: "border-blue-500", bg: "bg-blue-500/20", text: "text-blue-300", hex: "#3B82F6" },
  Vest: { border: "border-emerald-500", bg: "bg-emerald-500/20", text: "text-emerald-300", hex: "#10B981" },
  mask: { border: "border-purple-400", bg: "bg-purple-400/20", text: "text-purple-300", hex: "#A855F7" },
};
