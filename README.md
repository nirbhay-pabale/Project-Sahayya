# 🌿 Sahayya (सहाय्य) — Digital Growth & Compliance Platform for Rural MSMEs
> **Grand Finale Submission — Smart Kopargaon Hackathon 2026**  
> *Bridging the digital, safety, quality, and capital divide for Indian micro, small, and medium enterprises.*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Gemini Vision AI](https://img.shields.io/badge/Google_Gemini-Multimodal_Vision-8E75B2?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 📌 Executive Summary & Problem Statement

India’s 63+ million MSMEs contribute nearly 30% of the nation’s GDP and 45% of manufacturing output. However, **rural and semi-urban industrial clusters** struggle with four critical bottlenecks:
1. **Workplace Safety & Compliance**: High workplace injury rates and costly regulatory penalties due to lack of automated safety gear monitoring.
2. **Quality Control Bottlenecks**: Expensive manual defect inspection leads to rejected shipments, packaging damage, and loss of export orders.
3. **Credit & Capital Disconnect**: Less than 15% of eligible MSMEs access formal government loan subsidies (MUDRA, CGTMSE, PMEGP) due to complex documentation and eligibility ambiguity.
4. **Language & Digital Barriers**: Operational tools are predominantly English-only, alienating vernacular business owners who operate in Marathi or Hindi.

**Sahayya (सहाय्य)** is an integrated, vernacular-first enterprise intelligence platform engineered specifically for Indian MSMEs to automate shop-floor safety, optical quality control, demand forecasting, statutory compliance, and credit scheme matching in real time.

---

## 🚀 Core Platform Modules

### 1. 🛡️ Safety Intelligence & Real-Time Computer Vision CCTV
- **Panel A: Gate Turnstile Checkpoint (Automated Entry Authorization)**:
  - Connects to browser webcams or IP/RTSP security camera feeds.
  - **Live PPE Compliance Verification**: Simultaneously detects **Hardhat / Safety Helmet**, **Protective Goggles**, and **Industrial Gloves**.
  - **Default-Denied Gate Security**: The entry gate remains strictly locked (`Entry Denied — Missing Gear`) until the worker puts on all required equipment. Upon complete verification, the gate unlocks immediately (`Entry Allowed — All PPE Verified`).
- **Panel B: Active Workplace Zone Monitoring**:
  - Live floor hazard detection, electrostatic discharge (ESD) boot compliance, and automatic compliance timestamp logging.

---

### 2. 🔬 Quality Intelligence & Multimodal Vision Defect AI
- **Physical Damage & Seal Integrity Detection**:
  - Leverages Google Gemini Multimodal Vision AI to detect physical damage, open packaging seams, torn seal corners, surface discoloration, and dimensional abnormalities.
- **Conditional Gating & Zero-Defect Architecture**:
  - Empty-state until a sample image is uploaded.
  - Generates clear findings: e.g., `Packaging Seal Damage Detected (High Severity 95%)` alongside exact corrective actions.
  - Intact samples instantly receive a `Zero Defect ✓` badge, `98/100` score, and `0%` defect rate.
- **Direct Financial Loss Computation**:
  - Evaluates business loss formula: `(Defect % ÷ 100) × Average Batch Value × Monthly Batches` in Indian Rupees (₹/month).

---

### 3. 💳 Credit & Scheme Finder (Loan & Scheme Matcher)
- **10-Field Business Eligibility Assessment**:
  - Captures Sector (Manufacturing, Food Processing, Handicrafts, Services, etc.), State, Scale (Micro, Small, Medium), Annual Turnover, Business Age, Loan Amount Needed, Loan Purpose, Existing Debt, Udyam Registration, and GSTIN status.
- **Deterministic Rule Engine (`matcher.ts`)**:
  - Matches profiles against official Indian schemes:
    - **Pradhan Mantri MUDRA Yojana (PMMY)**: Shishu (≤ ₹50k), Kishor (₹50k–₹5L), Tarun (₹5L–₹10L).
    - **CGTMSE**: Up to ₹5 Crore collateral-free credit guarantee.
    - **PMEGP**: 15%–35% capital margin money subsidy for new/young enterprises.
    - **Stand-Up India**: ₹10 Lakh to ₹1 Crore for greenfield and expansion setups.
    - **MSME Sustainable (ZED) Subsidy**: Up to 80% government subsidy on international quality audits.
    - **PM Surya Ghar / Industrial Solar Rooftop Grant**: Up to 40% capital subsidy on captive solar power plants.
- **Explainability**:
  - Outlines exact match reasons and highlights missing prerequisites (e.g., *"To fully qualify: Udyam registration required"*).

---

### 4. 📈 Demand Intelligence & Capacity Planning
- **Predictive Order Forecasting**:
  - Analyzes historical order trends, seasonal demand spikes, and production capacity.
- **Supply-Chain Shortage Alarms**:
  - Calculates exact raw material requirements (in kg/units) and recommends buffer production targets before festive rushes.

---

### 5. 💡 IP & Patent Intelligence
- **Invention Novelty Evaluator**:
  - Screens manufacturing innovations against Indian Patent Office prior-art databases.
- **Automated MSME Fee Waiver Assistance**:
  - Generates Form 28 drafting guidelines for **80% statutory patent fee concessions** under the Startups/MSMEs Patent Rules.

---

### 6. 🌐 Multilingual Business Copilot & Vernacular Support
- Full operational interface localization in **English**, **Marathi (मराठी)**, and **Hindi (हिंदी)**.
- Real-time conversational AI copilot that synthesizes safety logs, quality defects, and financial parameters into conversational insights.

---

## 🏗️ Technical Architecture & Stack

```
                               ┌──────────────────────────────────────────────┐
                               │               Project Sahayya                │
                               │          Next.js 15 Fullstack App            │
                               └──────────────────────┬───────────────────────┘
                                                      │
         ┌────────────────────────┬───────────────────┼───────────────────┬────────────────────────┐
         │                        │                   │                   │                        │
         ▼                        ▼                   ▼                   ▼                        ▼
┌──────────────────┐    ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  Safety Vision   │    │  Quality Vision  │ │  Scheme Matcher  │ │ Demand Forecast  │ │ Vernacular i18n  │
│  Live CCTV PPE   │    │  Gemini Vision   │ │  Rule-Based DB   │ │ Supply Chain     │ │ Marathi / Hindi  │
│  Browser Webcam  │    │  Damage Detect   │ │  Mudra / CGTMSE  │ │ Recharts Visuals │ │ English Copilot  │
└──────────────────┘    └──────────────────┘ └──────────────────┘ └──────────────────┘ └──────────────────┘
```

### Core Technologies:
- **Frontend / Framework**: Next.js 15 (React 19, App Router, Server Actions)
- **Language**: TypeScript 5.0 (Strict Typing & Dev Assertions)
- **Styling & UI**: Vanilla Tailwind CSS, Lucide React, Framer Motion
- **Data Visualization**: Recharts
- **AI & Vision Ingestion**:
  - Google Gemini Multimodal Vision API
  - Sharp Image Buffer Analyzer
- **State Management**: React Context API (`ModuleResultsContext`, `LanguageContext`, `AuthContext`)

---

## 📂 Project Directory Structure

```
Project-Sahayya/
├── app/
│   ├── api/
│   │   ├── copilot/chat/route.ts      # Multi-turn Copilot synthesis
│   │   ├── quality/analyze/route.ts   # Multimodal Quality Vision AI
│   │   ├── safety/detect/route.ts     # PPE & Gate CCTV stream analysis
│   ├── dashboard/page.tsx             # Executive Main Dashboard
│   ├── premium/page.tsx               # 10-Module Premium Enterprise Hub
│   ├── login/ & signup/               # Auth & onboarding
│   ├── globals.css                    # Design system tokens
│   └── layout.tsx                     # Root layout & providers
├── components/
│   ├── dashboard/safety/              # Turnstile & CCTV components
│   ├── premium/                       # Quality, Credit, Safety & Demand UIs
│   └── ui/                            # Buttons, Dialogs, Cards
├── lib/
│   ├── ai/vision-client.ts            # Multimodal Vision client
│   ├── context/ModuleResultsContext   # Cross-module unified state
│   ├── schemes/matcher.ts             # Rule-based MSME scheme matcher
│   └── i18n/translations.ts           # Marathi, Hindi & English dictionaries
├── public/                            # Static brand logos and assets
└── README.md                          # Project documentation
```

---

## 🏆 Hackathon Impact & Value Proposition

| Metric / Dimension | Traditional Rural MSME Setup | With Sahayya Platform |
| :--- | :--- | :--- |
| **PPE Safety Compliance** | Manual clipboards / Unmonitored | Automated real-time CCTV gate check |
| **Defect Detection** | Manual end-of-line spot checks | Multimodal Vision AI with instant loss metrics |
| **Scheme Accessibility** | Lost in bureaucratic jargon | Instant 10-point deterministic scheme matching |
| **Language Barrier** | English-only enterprise ERPs | Native Marathi & Hindi voice/text synthesis |
| **IP / Patent Guidance** | High legal fees ($$$) | Guided novelty check & 80% fee waiver forms |

---

## 👥 Authors & Team

- **Team Lead & Developer**: Nirbhay Pabale & Team
- **Hackathon**: Smart Kopargaon Hackathon 2026 (Grand Finale)
- **Organization**: Project Sahayya Initiative

---

## 📜 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
