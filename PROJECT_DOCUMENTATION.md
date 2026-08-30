# 📘 Project Sahayya — Complete System Architecture & Feature Documentation
> **Enterprise Platform for Rural & Cluster MSMEs (Smart Kopargaon Hackathon 2026)**  
> *Author: Nirbhay Pabale & Team | Repository: https://github.com/nirbhay-pabale/Project-Sahayya*

---

## 🧭 Table of Contents
1. [Project Overview & Domain Context](#1-project-overview--domain-context)
2. [Global Application Flow & User Journeys](#2-global-application-flow--user-journeys)
3. [Comprehensive Feature Specifications & Business Logic](#3-comprehensive-feature-specifications--business-logic)
   - [3.1 Intro & Landing Page](#31-intro--landing-page)
   - [3.2 Safety Intelligence & Live PPE CCTV Turnstile](#32-safety-intelligence--live-ppe-cctv-turnstile)
   - [3.3 Quality Intelligence & Multimodal Defect AI](#33-quality-intelligence--multimodal-defect-ai)
   - [3.4 Credit & Scheme Finder (Loan & Scheme Matcher)](#34-credit--scheme-finder-loan--scheme-matcher)
   - [3.5 Demand Intelligence & Capacity Planning](#35-demand-intelligence--capacity-planning)
   - [3.6 IP & Patent Intelligence](#36-ip--patent-intelligence)
   - [3.7 What-If Scenario Simulator (Decision Engine)](#37-what-if-scenario-simulator-decision-engine)
   - [3.8 Early-Warning Radar & Sahayya Score](#38-early-warning-radar--sahayya-score)
   - [3.9 Vernacular Localization Engine (Marathi / Hindi / English)](#39-vernacular-localization-engine-marathi--hindi--english)
4. [Data Schemas, State Contracts & Mathematical Formulas](#4-data-schemas-state-contracts--mathematical-formulas)
5. [Backend API Specifications & Endpoints](#5-backend-api-specifications--endpoints)
6. [Porting Guide: How to Implement in Different Tech Stacks](#6-porting-guide-how-to-implement-in-different-tech-stacks)

---

## 1. Project Overview & Domain Context

**Project Sahayya** is an all-in-one industrial intelligence platform designed for Indian Micro, Small, and Medium Enterprises (MSMEs). It addresses critical operational gaps:
- **Shop-floor Worker Safety**: Automated camera-based enforcement of Personal Protective Equipment (PPE) to eliminate industrial accidents and gate compliance overheads.
- **Optical Quality Control**: Real-time image-based defect and physical damage detection preventing batch rejections and commercial loss.
- **Government Subsidies & Debt Capital Access**: Rule-based matching against official schemes (MUDRA, CGTMSE, PMEGP, ZED, Stand-Up India).
- **Supply-Chain Forecasting**: Seasonality-adjusted demand modeling to prevent inventory shortages.
- **Vernacular First**: Complete multi-dialect UX across Marathi (मराठी), Hindi (हिंदी), and English.

---

## 2. Global Application Flow & User Journeys

```
[ Visitor / MSME Owner ]
         │
         ▼
[ Intro Landing Page (/) ] ──► [ Login / Signup (/login, /signup) ]
                                            │
                                            ▼
                    ┌──────────────────────────────────────────────┐
                    │               User Selection                 │
                    ├──────────────────────┬───────────────────────┤
                    ▼                                              ▼
       [ Free Executive Dashboard ]               [ Enterprise Premium Hub ]
            (/dashboard)                                  (/premium)
         • Interactive Chatbot                     • 10-Module Scroll-Spy Suite
         • Quick Action Cards                      • Live Computer Vision CCTV
         • Document & Tool Drawer                  • Multi-variable Decision Engine
```

---

## 3. Comprehensive Feature Specifications & Business Logic

### 3.1 Intro & Landing Page
- **Purpose**: High-conversion, brand-accurate landing experience presenting Sahayya's value proposition.
- **UI Elements**:
  - Top Navigation: Official brand emblem, feature anchors, language switcher dropdown, and Login/Signup CTAs.
  - Hero Section: Industrial background visual, live phone mockup showcase with real dashboard interface, and quick eligibility calculator preview card.
  - Floating Value Badges: Highlighting "100% MSME Compliant", "Govt Scheme Sanctioned", and "ZED Quality Ready".

---

### 3.2 Safety Intelligence & Live PPE CCTV Turnstile
- **Module ID**: `section-safety` | **Components**: `EntryCheckpointCamera.tsx`, `WorkplaceMonitoringCamera.tsx`, `SafetyIntelligence.tsx`
- **Architecture**:
  - **Panel A: Gate Turnstile Checkpoint**:
    - Video Ingestion: Browser webcam stream via `getUserMedia` or RTSP IP camera feed.
    - Default State: **`Entry Denied — Missing Gear`** (Locked gate status with red pill).
    - Verification Logic: Checks 3 mandatory items: **Hardhat / Safety Helmet**, **Protective Goggles**, and **Industrial Gloves**.
    - Transition: Only when all 3 items are detected with confidence > 85%, gate transitions to **`Entry Allowed — All PPE Verified`** (Unlocked gate status with green pill).
  - **Panel B: Active Workplace Zone Monitoring**:
    - Real-time shop floor hazard tracking, antistatic boot checks, zone intrusion alerts, and ambient gas/temperature readings.
- **Backend API**: `POST /api/safety/detect` (or Python FastAPI `POST /predict/ppe`).

---

### 3.3 Quality Intelligence & Multimodal Defect AI
- **Module ID**: `section-quality` | **Component**: `QualityIntelligence.tsx`
- **Architecture**:
  - **State Gating**:
    - Initial / No Upload: Results area is hidden; displays a neutral upload placeholder (*"Upload a product image to run a quality check"*).
    - During Analysis: Displays an active spinner (*"Analyzing image with Vision AI..."*).
    - After Analysis: Full results reveal.
  - **Inspection Output**:
    - **Intact Sample**: 0% defect rate, `98/100` score, `Pass` verdict, and `Zero Defect ✓` badge.
    - **Damaged Sample**: Flags `Packaging Seal Damage Detected (High Severity 95%)`, sets score ~`72/100`, defect rate `6.5%`, `Needs Review` verdict, and calculates financial loss.
- **Financial Loss Formula**:
  $$	ext{Monthly Loss (₹)} = \left( rac{	ext{Defect Rate \%}}{100} ight) 	imes 	ext{Avg Batch Value (₹)} 	imes 	ext{Monthly Batch Volume}$$
- **Backend API**: `POST /api/quality/analyze` (Gemini Multimodal Vision + Sharp buffer analyzer).

---

### 3.4 Credit & Scheme Finder (Loan & Scheme Matcher)
- **Module ID**: `section-credit` | **Components**: `CreditReadiness.tsx`, `SchemeIntelligence.tsx`
- **Architecture**:
  - **10-Field Business Eligibility Form**:
    1. Business Type *(Manufacturing, Food Processing, Services, Trade, Agriculture, etc.)*
    2. Location / State *(Maharashtra, Gujarat, Karnataka, etc.)*
    3. Business Size *(Micro, Small, Medium via Udyam criteria)*
    4. Annual Turnover (₹)
    5. Business Age (Years operational)
    6. Loan Amount Needed (₹)
    7. Purpose of Loan *(Working Capital, Equipment, Expansion, Raw Materials, Infrastructure)*
    8. Existing Debt / Liabilities (₹)
    9. Udyam Registration *(Yes / No visual toggle)*
    10. GST Registration *(Yes / No visual toggle)*
  - **Rule Engine (`lib/schemes/matcher.ts`)**:
    - Evaluates against:
      - **PM MUDRA Yojana**: ≤ ₹10L loan, Micro/Small scale, Shishu/Kishor/Tarun tiers.
      - **CGTMSE**: Up to ₹5 Crore collateral-free bank guarantee (requires Udyam).
      - **PMEGP**: 15%–35% capital subsidy for new/young setups (age ≤ 5 yrs).
      - **Stand-Up India**: ₹10L to ₹1 Crore for greenfield projects.
      - **ZED Subsidy**: Up to 80% subsidy on testing/audits for manufacturing units.
      - **PM Surya Ghar**: Up to 40% capital subsidy on captive solar power plants.
  - **Outputs**:
    - Dynamic Match Level Badges: `High Match` (Green), `Good Match` (Blue), `Partial Match` (Amber).
    - Deterministic Plain-Language Reasons: *"You match because of your business type, turnover, and loan purpose."*
    - Missing Requirements Callout: *"To fully qualify: Udyam registration certificate required."*
    - Secondary Preparedness Score: Composite `0-100` rating placed below scheme cards.

---

### 3.5 Demand Intelligence & Capacity Planning
- **Module ID**: `section-demand` | **Component**: `DemandIntelligence.tsx`
- **Business Logic**:
  - Computes seasonal demand multipliers (e.g. 1.35x for festive/harvest quarters).
  - Evaluates Inventory Shortage:
    $$	ext{Shortage Units} = \max(0, 	ext{Projected Demand} - 	ext{Current Stock})$$
  - Recommends Raw Material Procurement:
    $$	ext{Raw Material Required (kg)} = 	ext{Recommended Production Units} 	imes 1.5	ext{ kg/unit}$$

---

### 3.6 IP & Patent Intelligence
- **Module ID**: `section-patent` | **Component**: `IPPatentIntelligence.tsx`
- **Business Logic**:
  - Evaluates manufacturing inventions against prior art from the Indian Patent Office (IPO).
  - Assesses Novelty Potential: High / Medium / Low.
  - Generates statutory documentation checklists including **Form 28 for MSME 80% fee waivers**.

---

### 3.7 What-If Scenario Simulator (Decision Engine)
- **Module ID**: `section-whatif` | **Component**: `WhatIfSimulator.tsx`
- **Architecture**:
  - **Multi-Variable Controls**:
    - Production Output Change: $-40\%$ to $+80\%$
    - Selling Price Change: $-20\%$ to $+30\%$
    - Raw Material Cost Change: $-20\%$ to $+30\%$
    - Workers Delta: $-10$ to $+20$ workers
    - Shift Hours/Day: $6$ to $16$ hours
    - Quality Target Change: $-20\%$ to $+20\%$
  - **Chained Formula Engine (`lib/simulator/engine.ts`)**:
    - $	ext{After Production} = 	ext{Base Production} 	imes (1 + \Delta 	ext{Prod})$
    - $	ext{Capacity Utilization} = (	ext{After Production} / 	ext{Max Capacity}) 	imes 100$
    - $	ext{Labor Expense} = 	ext{Workers} 	imes (	ext{Hours} / 8) 	imes ₹16,500$
    - $	ext{Defect Rate} = 	ext{Base Defect} + (	ext{Capacity Utilization} > 90\% \ ? \ (	ext{Util} - 90) 	imes 0.12 : 0)$
    - $	ext{Net Profit} = 	ext{Revenue} - 	ext{Material Costs} - 	ext{Labor} - 	ext{Defect Losses}$
  - **Risk vs. Reward Assessment (`lib/simulator/risk.ts`)**:
    - Profit Potential: High / Medium / Low
    - Operational Risk: High (Util > 95% or Shift ≥ 14h), Medium (Util > 85%), Low
    - Cash-Flow Risk: High (Upfront Outlay > 1.2x Working Capital), Medium, Low
  - **AI Recommendation**: e.g., `Proceed with caution: ...` or `Proceed: ...`
  - **Best Scenario Optimizer**: Brute-force evaluates 21 candidate plans to identify the highest scoring risk-adjusted outcome.
  - **Scenario Save & Compare**: Checkbox multi-select modal comparing metrics across saved plans.
  - **"Ask Sahayya" Natural Language Assistant**: Parses constraints from queries like *"I have ₹2 lakh available. What is the safest way to increase production?"* and executes deterministic simulations.

---

### 3.8 Early-Warning Radar & Sahayya Score
- **Early-Warning Radar (`section-radar`)**:
  - Analyzes cross-module data to flag predictive risk signals across Demand Shortages (Horizon in Days), Shop-Floor Safety Violations, and Quality Defect Spikes.
- **Sahayya Score (`section-score`)**:
  - Weighted composite index ($0-100$) evaluating Safety ($25\%$), Quality ($25\%$), Financial Readiness ($25\%$), and Demand Efficiency ($25\%$).

---

### 3.9 Vernacular Localization Engine
- **Supported Languages**: English, Marathi (मराठी), Hindi (हिंदी).
- **Implementation**: Dictionary mapping in `lib/i18n/translations.ts` toggled via React Context or language headers.

---

## 4. Data Schemas & Mathematical Contracts

### 4.1 Business Profile Schema (`lib/schemes/types.ts`)
```typescript
interface BusinessProfile {
  businessType: string;         // e.g. "Manufacturing", "Food Processing"
  state: string;                // e.g. "Maharashtra", "Gujarat"
  businessSize: "Micro" | "Small" | "Medium";
  annualTurnover: number;       // in ₹
  businessAgeYears: number;     // operational years
  loanAmountNeeded: number;     // in ₹
  loanPurpose: string;          // e.g. "Working Capital", "Equipment Purchase"
  existingLoans: number;        // in ₹
  hasUdyam: boolean;            // statutory MSME registration
  hasGst: boolean;              // active GSTIN
}
```

### 4.2 Simulation Input & Output Contracts (`lib/simulator/types.ts`)
```typescript
interface SimulationInputs {
  productionChangePct: number;  // -40 to +80
  priceChangePct: number;       // -20 to +30
  materialCostChangePct: number;// -20 to +30
  workerCountChange: number;    // -10 to +20
  workingHoursPerDay: number;   // 6 to 16
  defectRateChangePct: number;  // -20 to +20
}

interface SimulationResult {
  id: string;
  query: string;
  before: { productionUnits: number; revenue: number; defectRatePct: number; monthlyProfit: number; capacityUtilizationPct: number };
  after: { productionUnits: number; revenue: number; defectRatePct: number; monthlyProfit: number; capacityUtilizationPct: number; upfrontCostOutlay: number };
  deltas: { productionDeltaPct: number; revenueDeltaAbs: number; profitDeltaAbs: number; defectRateDeltaPct: number };
  risks: { profitPotential: "High" | "Medium" | "Low"; operationalRisk: "High" | "Medium" | "Low"; cashFlowRisk: "High" | "Medium" | "Low" };
  aiRecommendation: string;
  recommendationType: "Proceed" | "Proceed with caution" | "Reconsider";
}
```

---

## 5. Backend API Specifications & Endpoints

| Method | Endpoint | Description | Payload Sample | Response Sample |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Healthcheck & service status | None | `{"status": "operational", "uptime": 120}` |
| `POST` | `/api/safety/detect` | PPE gear & Gate CCTV detection | `{"image": "data:image/jpeg;base64,..."}` | `{"status": "PERMITTED", "detections": [{"class": "helmet", "confidence": 0.94}], "gateState": "UNLOCKED"}` |
| `POST` | `/api/quality/analyze` | Optical defect & damage inspection | `{"image": "data:image/jpeg;base64,...", "fileName": "sample.jpg", "avgBatchValue": 42000, "monthlyVolume": 12}` | `{"qualityScore": 72, "defectPercent": 6.5, "verdict": "Needs Review", "defects": [...]}` |
| `POST` | `/api/schemes/match` | MSME scheme eligibility matcher | `BusinessProfile` object | `{"totalMatched": 4, "matches": [{"schemeName": "MUDRA", "matchLevel": "High Match"}]}` |
| `POST` | `/api/simulator/analyze`| Multi-variable simulation engine | `{"snapshot": {...}, "inputs": {...}}` | `SimulationResult` object |

---

## 6. Porting Guide: How to Implement in Different Tech Stacks

If you wish to migrate or rebuild Project Sahayya in another tech stack on a different machine:

### Option A: Python / Django / FastAPI Backend + React / Flutter Frontend
1. **Computer Vision & Inference**:
   - Use `app_ml/inference_service/main.py` directly with `uvicorn main:app --port 8000`.
   - Install `ultralytics`, `opencv-python`, and `google-generativeai`.
2. **Business Logic & Simulation**:
   - Convert `lib/simulator/engine.ts` into a Python module `simulator/engine.py`.
   - Convert `lib/schemes/matcher.ts` into `schemes/matcher.py`.
3. **Mobile Client (Flutter / React Native)**:
   - Use `camera` plugin for live PPE turnstile stream.
   - Replicate the 10-module dashboard navigation using state management (Bloc / Riverpod / Redux).

### Option B: Java / Spring Boot + Angular / Vue
1. **REST Controllers**:
   - Create `@RestController` classes for `/api/safety`, `/api/quality`, `/api/schemes`, and `/api/simulator`.
2. **Mathematical Engine**:
   - Port `engine.ts` formulas into a `SimulationService.java` spring bean.
3. **Vision Processing**:
   - Call Google Gemini REST API directly using `WebClient` or `RestTemplate`.

### Option C: Go (Golang) + SvelteKit / Vanilla JS
1. Use `gin-gonic/gin` or `fiber` for ultra-high throughput camera frame ingestion.
2. Port scheme rules and mathematical simulation formulas into pure Go structs and functions.
