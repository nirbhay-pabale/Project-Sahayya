import { safetyFlow } from "./safety-flow";
import { demandFlow } from "./demand-flow";
import { creditFlow } from "./credit-flow";
import { patentFlow } from "./patent-flow";
import { qualityFlow } from "./quality-flow";
import { complianceFlow } from "./compliance-flow";
import { schemesFlow } from "./schemes-flow";
import { stockFlow } from "./stock-flow";
import { ChatFlow } from "./types";

export * from "./types";

export const chatFlowRegistry: Record<string, ChatFlow> = {
  safety: safetyFlow,
  demand: demandFlow,
  stock: stockFlow,
  credit: creditFlow,
  patent: patentFlow,
  quality: qualityFlow,
  compliance: complianceFlow,
  schemes: schemesFlow,
};

export function findFlowByKeyword(input: string): ChatFlow | null {
  const query = input.toLowerCase().trim();

  if (
    query.includes("safe") ||
    query.includes("hazard") ||
    query.includes("helmet") ||
    query.includes("fire") ||
    query.includes("ppe")
  ) {
    return safetyFlow;
  }

  if (
    query.includes("demand") ||
    query.includes("forecast") ||
    query.includes("predict my sales") ||
    query.includes("sales prediction") ||
    query.includes("sales forecast") ||
    query.includes("predict sales") ||
    query.includes("sales trend")
  ) {
    return demandFlow;
  }

  if (
    query.includes("stock") ||
    query.includes("inventory") ||
    query.includes("warehouse") ||
    query.includes("raw material")
  ) {
    return stockFlow;
  }

  if (
    query.includes("credit") ||
    query.includes("loan") ||
    query.includes("finance") ||
    query.includes("mudra") ||
    query.includes("cgtmse") ||
    query.includes("borrow") ||
    query.includes("banking")
  ) {
    return creditFlow;
  }

  if (
    query.includes("patent") ||
    query.includes("ip") ||
    query.includes("trademark") ||
    query.includes("copyright") ||
    query.includes("gi tag") ||
    query.includes("invention")
  ) {
    return patentFlow;
  }

  if (
    query.includes("quality") ||
    query.includes("zed") ||
    query.includes("defect") ||
    query.includes("inspect") ||
    query.includes("photo")
  ) {
    return qualityFlow;
  }

  if (
    query.includes("complian") ||
    query.includes("gst") ||
    query.includes("license") ||
    query.includes("tax") ||
    query.includes("epfo") ||
    query.includes("udyam")
  ) {
    return complianceFlow;
  }

  if (
    query.includes("scheme") ||
    query.includes("subsidy") ||
    query.includes("grant") ||
    query.includes("pmegp") ||
    query.includes("pmfme") ||
    query.includes("solar")
  ) {
    return schemesFlow;
  }

  return null;
}
