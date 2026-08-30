"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

import { WorkerDetection, PPEItem, PPEType, RawPPEDetection, WorkerPPEStatus } from "@/lib/ml/safety/types";
import { QualityDefectItem } from "@/lib/ml/quality/types";

export type { WorkerDetection, PPEItem, PPEType, RawPPEDetection, WorkerPPEStatus, QualityDefectItem };

export interface SafetyModuleData {
  workers: WorkerDetection[];
  detections?: RawPPEDetection[];
  presentItems: string[];
  missingItems: string[];
  entryDecision: "Allowed" | "Denied";
  cctvWorkers?: WorkerPPEStatus[];
  cctvViolationsToday?: number;
  overallScore: number; // 0-100
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  activeViolationsCount: number;
  temperatureReading: number; // Celsius
  gasReading: number; // ppm
  criticalAlertActive: boolean;
  usedFallback?: boolean;
  violationHistory: {
    id: string;
    timestamp: string;
    workerName: string;
    missingItem: string;
    resolved: boolean;
  }[];
}

export type QualityDefect = QualityDefectItem;

export interface QualityModuleData {
  qualityScore: number; // 0-100
  defectPercent: number;
  defects: QualityDefectItem[];
  verdict?: "Pass" | "Needs Review" | "Rework Recommended";
  batchId: string;
  estimatedMonthlyLoss: number;
  averageBatchValue: number;
  monthlyBatchVolume: number;
  complianceGrade?: "Grade A (Zero Defect)" | "Grade B (Standard)" | "Grade C (Sub-optimal)" | string;
  usedFallback?: boolean;
  historyTrend: { batch: string; defectRate: number; date: string }[];
}

export interface DemandModuleData {
  historicalSales: { month: string; sales: number }[];
  currentInventory: number;
  productionCapacity: number;
  seasonalityMultiplier: number;
  projectedDemand: number;
  shortageUnits: number;
  recommendedProduction: number;
  rawMaterialKg: number;
  growthPercent: number;
}

export interface CreditModuleData {
  score: number; // 0-100
  monthlyRevenue: number;
  monthlyExpenses: number;
  annualTurnover?: number;
  businessAgeYears: number;
  existingLiabilities: number;
  loanAmountNeeded?: number;
  businessType?: string;
  state?: string;
  businessSize?: "Micro" | "Small" | "Medium";
  loanPurpose?: string;
  hasUdyam?: boolean;
  hasGst?: boolean;
  strongAreas: string[];
  weakAreas: string[];
  improvementActions: string[];
  matchedSchemesCount?: number;
}

export interface PatentModuleData {
  inventionTitle: string;
  problemSolved: string;
  technicalNovelty: string;
  mechanismSummary: string;
  patentPotential: "High" | "Medium" | "Low";
  readinessScore: number;
  similarPatents: { title: string; patentNo: string; similarity: string }[];
  differencesIdentified: string[];
  readinessChecklist: { task: string; completed: boolean }[];
}

export interface ComplianceModuleData {
  overallScore: number; // 0-100
  subScores: {
    safety: number;
    quality: number;
    records: number;
    licenses: number;
    deadlines: number;
  };
  upcomingDeadlines: {
    id: string;
    title: string;
    dueDate: string;
    daysLeft: number;
    portal: string;
    type: "danger" | "warning" | "info";
  }[];
}

export interface SchemeModuleData {
  selectedNeed: "Finance" | "Compliance" | "Growth" | "Equipment";
  matchedSchemes: {
    id: string;
    title: string;
    ministry: string;
    benefit: string;
    eligibility: string[];
    requiredDocs: string[];
    portalUrl: string;
  }[];
}

export interface CopilotCard {
  id: string;
  timestamp: string;
  metric: string;
  whatHappened: string;
  why: string;
  impact: string;
  action: string;
  category: "Safety" | "Quality" | "Demand" | "Finance" | "Compliance";
}

export interface RadarWarning {
  id: string;
  title: string;
  urgency: "Critical" | "High" | "Medium" | "Low";
  daysUntil?: number;
  moduleTarget: string; // section anchor
  triggerReason: string;
}

export interface WhatIfSimulation {
  id: string;
  timestamp: string;
  query: string;
  demandImpact: string;
  inventoryImpact: string;
  costImpact: string;
  capacityImpact: string;
  qualityRiskImpact: string;
  overallSummary: string;
}

export interface ImpactLedgerItem {
  id: string;
  date: string;
  title: string;
  valueCreatedInr: number;
  category: string;
  impactNote: string;
}

export interface ModuleResultsStore {
  safety: SafetyModuleData;
  quality: QualityModuleData;
  demand: DemandModuleData;
  credit: CreditModuleData;
  patent: PatentModuleData;
  compliance: ComplianceModuleData;
  schemes: SchemeModuleData;
  copilotCards: CopilotCard[];
  radarWarnings: RadarWarning[];
  simulations: WhatIfSimulation[];
  impactLedger: ImpactLedgerItem[];
  sahayyaScore: number;
}

interface ModuleResultsContextType {
  store: ModuleResultsStore;
  updateSafety: (data: Partial<SafetyModuleData>) => void;
  updateQuality: (data: Partial<QualityModuleData>) => void;
  updateDemand: (data: Partial<DemandModuleData>) => void;
  updateCredit: (data: Partial<CreditModuleData>) => void;
  updatePatent: (data: Partial<PatentModuleData>) => void;
  updateCompliance: (data: Partial<ComplianceModuleData>) => void;
  addCopilotCard: (card: CopilotCard) => void;
  addSimulation: (simulation: WhatIfSimulation) => void;
  addImpactEntry: (entry: ImpactLedgerItem) => void;
  resetToDefaults: () => void;
}

const defaultInitialStore: ModuleResultsStore = {
  safety: {
    workers: [
      {
        id: "W-101",
        name: "Ramesh Shinde",
        role: "Lathe Machine Operator",
        boundingBox: { x: 12, y: 18, width: 28, height: 60 },
        detectedItems: [
          { type: "Helmet", detected: true, confidence: 0.94 },
          { type: "Safety Vest", detected: true, confidence: 0.91 },
          { type: "Gloves", detected: true, confidence: 0.88 },
          { type: "Boots", detected: true, confidence: 0.95 },
        ],
        missingItems: [],
        compliant: true,
      },
      {
        id: "W-102",
        name: "Suresh Patil",
        role: "Welding Section Helper",
        boundingBox: { x: 55, y: 22, width: 30, height: 62 },
        detectedItems: [
          { type: "Safety Vest", detected: true, confidence: 0.89 },
          { type: "Boots", detected: true, confidence: 0.92 },
        ],
        missingItems: ["Helmet", "Goggles"],
        compliant: false,
      },
    ],
    detections: [
      { className: "helmet", confidence: 0.94, boundingBox: [18.5, 12.0, 22.0, 18.5] },
      { className: "Vest", confidence: 0.91, boundingBox: [16.0, 28.0, 28.5, 34.0] },
      { className: "Gloves", confidence: 0.88, boundingBox: [12.0, 58.0, 14.0, 12.0] },
      { className: "goggles", confidence: 0.86, boundingBox: [21.0, 19.5, 15.0, 8.0] },
      { className: "mask", confidence: 0.82, boundingBox: [20.5, 23.0, 16.0, 10.0] },
    ],
    presentItems: ["helmet", "Vest", "Gloves", "goggles", "mask"],
    missingItems: [],
    entryDecision: "Allowed",
    overallScore: 84,
    riskLevel: "Medium",
    activeViolationsCount: 2,
    temperatureReading: 38.5,
    gasReading: 42,
    criticalAlertActive: false,
    usedFallback: false,
    violationHistory: [
      {
        id: "V-1",
        timestamp: "Today 10:14 AM",
        workerName: "Suresh Patil",
        missingItem: "No Helmet in Welding Bay",
        resolved: false,
      },
      {
        id: "V-2",
        timestamp: "Yesterday 03:45 PM",
        workerName: "Karan Jadhav",
        missingItem: "No Antistatic Boots",
        resolved: true,
      },
    ],
  },
  quality: {
    qualityScore: 98,
    defectPercent: 0,
    verdict: "Pass",
    complianceGrade: "Grade A (Zero Defect)",
    defects: [],
    batchId: "BATCH-2025-05-B",
    estimatedMonthlyLoss: 0,
    averageBatchValue: 42000,
    monthlyBatchVolume: 12,
    usedFallback: false,
    historyTrend: [
      { batch: "B-101", defectRate: 9.2, date: "02 May" },
      { batch: "B-102", defectRate: 8.4, date: "09 May" },
      { batch: "B-103", defectRate: 7.1, date: "16 May" },
      { batch: "B-104", defectRate: 0.0, date: "24 May" },
    ],
  },
  demand: {
    historicalSales: [
      { month: "Jan", sales: 3200 },
      { month: "Feb", sales: 3450 },
      { month: "Mar", sales: 3800 },
      { month: "Apr", sales: 4100 },
      { month: "May", sales: 4500 },
    ],
    currentInventory: 3700,
    productionCapacity: 5000,
    seasonalityMultiplier: 1.15,
    projectedDemand: 4500,
    shortageUnits: 800,
    recommendedProduction: 850,
    rawMaterialKg: 1275,
    growthPercent: 15.3,
  },
  credit: {
    score: 82,
    monthlyRevenue: 1875000,
    monthlyExpenses: 1340000,
    businessAgeYears: 4,
    existingLiabilities: 240000,
    strongAreas: [
      "Consistent 3-Year Positive Cash Flow Margin (>28%)",
      "Valid Udyam & Zero GST Default History",
      "Regular Repayment on Equipment Term Finance",
    ],
    weakAreas: [
      "High Inventory Holding Ratio (Need automated reorder buffer)",
      "Single-Vendor Dependence on Primary Raw Material",
    ],
    improvementActions: [
      "Maintain formal digital e-invoicing for all outward supplies above ₹1 Lakh",
      "Diversify supplier base to improve working capital credit score by +12 pts",
      "File GSTR-3B before 20th to unlock SBI pre-approved ₹5.8 Lakhs credit line",
    ],
  },
  patent: {
    inventionTitle: "Dual-Chamber Low-Cost Solar Agro Dehydrator",
    problemSolved: "Moisture decay in rural chili & spice harvest due to lack of grid power.",
    technicalNovelty: "Inverted vortex thermal airflow with thermal stone heat-sink retention.",
    mechanismSummary: "Uses natural convection to dry produce 3x faster without electric fans.",
    patentPotential: "High",
    readinessScore: 85,
    similarPatents: [
      { title: "Solar Cabinet Dryer with Air Baffles", patentNo: "IN-384920", similarity: "Moderate (Different Airflow)" },
      { title: "Agricultural Tray Dryer Assembly", patentNo: "IN-294011", similarity: "Low" },
    ],
    differencesIdentified: [
      "No active fan/electrical grid connection required",
      "Thermal stone heat-retention layer extends drying by 4 hours post sunset",
    ],
    readinessChecklist: [
      { task: "Provisional Specification Form 1 & 2 drafted", completed: true },
      { task: "Prior Art Search across Indian Patent Office portal", completed: true },
      { task: "MSME 80% Statutory Fee Waiver Certificate (Form 28)", completed: true },
      { task: "Complete Claims & CAD Isometric Drawings", completed: false },
    ],
  },
  compliance: {
    overallScore: 92,
    subScores: {
      safety: 88,
      quality: 91,
      records: 95,
      licenses: 90,
      deadlines: 94,
    },
    upcomingDeadlines: [
      {
        id: "1",
        title: "GSTR-1 Outward Supplies Monthly Upload",
        dueDate: "11 Jun 2025",
        daysLeft: 12,
        portal: "gst.gov.in",
        type: "danger",
      },
      {
        id: "2",
        title: "State Factory Directorate Permit Renewal (Form 2)",
        dueDate: "22 Jun 2025",
        daysLeft: 23,
        portal: "dish.gov.in",
        type: "warning",
      },
      {
        id: "3",
        title: "EPFO & ESIC Worker Monthly Remittance",
        dueDate: "15 Jun 2025",
        daysLeft: 16,
        portal: "shramsuvidha.gov.in",
        type: "info",
      },
    ],
  },
  schemes: {
    selectedNeed: "Finance",
    matchedSchemes: [
      {
        id: "pmegp",
        title: "Prime Minister Employment Generation Programme (PMEGP)",
        ministry: "Ministry of MSME",
        benefit: "Up to 35% Direct Capital Subsidy (₹50 Lakhs Project Cost)",
        eligibility: [
          "Micro enterprise manufacturing in rural area",
          "Minimum 8th standard pass for projects > ₹10 Lakhs",
          "Beneficiary contribution only 5% (Special category) to 10%",
        ],
        requiredDocs: ["Udyam Aadhaar", "Detailed Project Report (DPR)", "Rural Area Certificate", "Aadhaar Card"],
        portalUrl: "https://www.kviconline.gov.in/pmegpeportal",
      },
      {
        id: "pmfme",
        title: "PM Formalisation of Micro Food Processing Enterprises (PMFME)",
        ministry: "Ministry of Food Processing Industries (MoFPI)",
        benefit: "35% Credit-Linked Capital Subsidy up to ₹10 Lakhs",
        eligibility: [
          "Existing or new micro food processing enterprise",
          "Ownership of enterprise by individual or partnership",
        ],
        requiredDocs: ["FSSAI Registration", "Bank Account Statement (6 Months)", "Plant Quotation"],
        portalUrl: "https://pmfme.mofpi.gov.in",
      },
      {
        id: "cgtmse",
        title: "Credit Guarantee Fund Trust for Micro & Small Enterprises (CGTMSE)",
        ministry: "Ministry of MSME & SIDBI",
        benefit: "Collateral-Free Bank Loans up to ₹2 Crore (85% Govt Guarantee)",
        eligibility: [
          "New or existing Micro and Small Enterprises in manufacturing",
          "Viable business proposal with primary bank lending",
        ],
        requiredDocs: ["Udyam Certificate", "ITR Returns (2 Years)", "Project Profile"],
        portalUrl: "https://www.cgtmse.in",
      },
    ],
  },
  copilotCards: [
    {
      id: "C-1",
      timestamp: "Today 08:30 AM",
      metric: "Quality & Packaging",
      whatHappened: "Heat seal packaging defect rate reduced to 6.5% (down from 9.2%).",
      why: "Sealing temperature was calibrated to 180°C on Batch B-104.",
      impact: "Estimated ₹14,200 monthly product loss avoided.",
      action: "Maintain current temperature setting and inspect sealing tape daily.",
      category: "Quality",
    },
    {
      id: "C-2",
      timestamp: "Yesterday 05:15 PM",
      metric: "Demand & Buffer",
      whatHappened: "Projected June sales indicate a 15.3% growth surge to 4,500 units.",
      why: "Seasonal agricultural harvest demand across Western Maharashtra clusters.",
      impact: "800 units potential stock shortage if production is not advanced.",
      action: "Order 1,275 kg raw material by June 2 to prevent production delays.",
      category: "Demand",
    },
    {
      id: "C-3",
      timestamp: "28 May 11:00 AM",
      metric: "Workplace Safety",
      whatHappened: "2 PPE violations flagged in the welding bay during live CCTV audit.",
      why: "New apprentice helper missing protective goggles and helmet.",
      impact: "Safety score dropped to 84% — risk of DISH regulatory non-compliance.",
      action: "Issue mandatory safety kit to apprentice before next morning shift.",
      category: "Safety",
    },
  ],
  radarWarnings: [
    {
      id: "R-1",
      title: "Stock shortage likely in 6 days (800 units shortfall)",
      urgency: "Critical",
      daysUntil: 6,
      moduleTarget: "section-demand",
      triggerReason: "Projected June demand (4,500) exceeds current inventory (3,700).",
    },
    {
      id: "R-2",
      title: "GSTR-1 Monthly Return Filing Due in 12 Days",
      urgency: "High",
      daysUntil: 12,
      moduleTarget: "section-schemes",
      triggerReason: "Avoid ₹50/day late fee penalty under Section 47 of GST Act.",
    },
    {
      id: "R-3",
      title: "Welding bay PPE compliance dipped below 90%",
      urgency: "Medium",
      daysUntil: 1,
      moduleTarget: "section-safety",
      triggerReason: "Repeated helmet/goggle absence flagged by live vision detector.",
    },
  ],
  simulations: [
    {
      id: "SIM-1",
      timestamp: "Today 09:12 AM",
      query: "What if I increase production by 20% next month?",
      demandImpact: "Matches anticipated 15.3% regional market surge with 5% safety buffer.",
      inventoryImpact: "Requires 1,530 kg additional raw material buffer in warehouse.",
      costImpact: "Estimated ₹42,000 upfront raw material & power expenditure.",
      capacityImpact: "Shop floor reaches 96% utilization — suggests running a 2nd shift on Tue/Wed.",
      qualityRiskImpact: "Moderate defect risk without additional QC inspection on afternoon batches.",
      overallSummary: "Highly profitable expansion: Net projected profit increases by ₹68,000 if raw material is secured early.",
    },
  ],
  impactLedger: [
    {
      id: "L-1",
      date: "28 May 2025",
      title: "Packaging Sealing Defect Reduction",
      valueCreatedInr: 18500,
      category: "Quality Loss Prevention",
      impactNote: "Calibrated sealing bar prevented 120 spoiled agro-pouches.",
    },
    {
      id: "L-2",
      date: "20 May 2025",
      title: "Early Demand Reorder Stockout Avoided",
      valueCreatedInr: 32000,
      category: "Sales Protection",
      impactNote: "Early raw material procurement fulfilled 450 emergency farm tool orders.",
    },
    {
      id: "L-3",
      date: "14 May 2025",
      title: "Zero DISH Safety Penalty Clearance",
      valueCreatedInr: 15000,
      category: "Compliance Savings",
      impactNote: "100% PPE compliance during surprise state labor inspection.",
    },
  ],
  sahayyaScore: 86,
};

const ModuleResultsContext = createContext<ModuleResultsContextType | undefined>(undefined);

const STORAGE_KEY = "sahayya_premium_module_store_v1";

export const ModuleResultsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [store, setStore] = useState<ModuleResultsStore>(defaultInitialStore);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setStore(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Failed to load stored premium module results:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      } catch (e) {
        console.warn("Failed to persist module results:", e);
      }
    }
  }, [store, isLoaded]);

  const updateSafety = (data: Partial<SafetyModuleData>) => {
    setStore((prev) => ({ ...prev, safety: { ...prev.safety, ...data } }));
  };

  const updateQuality = (data: Partial<QualityModuleData>) => {
    setStore((prev) => ({ ...prev, quality: { ...prev.quality, ...data } }));
  };

  const updateDemand = (data: Partial<DemandModuleData>) => {
    setStore((prev) => ({ ...prev, demand: { ...prev.demand, ...data } }));
  };

  const updateCredit = (data: Partial<CreditModuleData>) => {
    setStore((prev) => ({ ...prev, credit: { ...prev.credit, ...data } }));
  };

  const updatePatent = (data: Partial<PatentModuleData>) => {
    setStore((prev) => ({ ...prev, patent: { ...prev.patent, ...data } }));
  };

  const updateCompliance = (data: Partial<ComplianceModuleData>) => {
    setStore((prev) => ({ ...prev, compliance: { ...prev.compliance, ...data } }));
  };

  const addCopilotCard = (card: CopilotCard) => {
    setStore((prev) => ({
      ...prev,
      copilotCards: [card, ...prev.copilotCards],
    }));
  };

  const addSimulation = (sim: WhatIfSimulation) => {
    setStore((prev) => ({
      ...prev,
      simulations: [sim, ...prev.simulations],
    }));
  };

  const addImpactEntry = (entry: ImpactLedgerItem) => {
    setStore((prev) => ({
      ...prev,
      impactLedger: [entry, ...prev.impactLedger],
    }));
  };

  const resetToDefaults = () => {
    setStore(defaultInitialStore);
  };

  return (
    <ModuleResultsContext.Provider
      value={{
        store,
        updateSafety,
        updateQuality,
        updateDemand,
        updateCredit,
        updatePatent,
        updateCompliance,
        addCopilotCard,
        addSimulation,
        addImpactEntry,
        resetToDefaults,
      }}
    >
      {children}
    </ModuleResultsContext.Provider>
  );
};

export function useModuleResults() {
  const context = useContext(ModuleResultsContext);
  if (!context) {
    throw new Error("useModuleResults must be used within a ModuleResultsProvider");
  }
  return context;
}
