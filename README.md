# Sahayya — Digital Growth & Compliance Platform for Rural MSMEs
> **Grand Finale — Smart Kopargaon Hackathon 2026**

Sahayya is an AI-powered enterprise platform designed to empower rural and cluster-based Micro, Small, and Medium Enterprises (MSMEs) with precision industrial intelligence, automated statutory compliance, live CCTV gate safety inspection, and loan/scheme matching.

---

## 🌟 Key Features

### 1. 🛡️ Safety Intelligence & Live PPE CCTV Verification (Panel A & Panel B)
- **Gate Turnstile Checkpoint**: Live browser-based webcam inspection with instant detection of mandatory PPE gear (Helmet, Safety Goggles, Gloves) with default-denied gate security.
- **Workplace Monitoring**: Real-time hazard detection, antistatic boot checks, and incident logs.

### 2. 🔬 Quality Intelligence & Visual Defect AI
- **Multimodal Vision Inspection**: Optical defect detection for physical packaging damage, torn wrappers, surface discoloration, and dimensional variance.
- **Conditional Gating**: Instant zero-defect assessment and financial loss calculations (`₹/month`).

### 3. 💳 Credit & Scheme Finder (Loan & Scheme Matcher)
- **10-Field Business Eligibility Assessment**: Instant matching against official government schemes (PM MUDRA, CGTMSE, PMEGP, Stand-Up India, ZED Certification, PM Surya Ghar).
- **Deterministic Explanations**: Plain-language qualification reasons and actionable gap identification.

### 4. 📈 Demand Intelligence & Capacity Planner
- Forecasts seasonal orders, inventory shortfalls, and raw material procurement schedules with interactive charts.

### 5. 💡 IP & Patent Intelligence
- AI-driven novelty evaluation, patent drafting assistants, prior-art search, and 80% MSME statutory fee waiver dossiers.

### 6. 🌐 Multilingual Accessibility
- Universal Marathi (मराठी), Hindi (हिंदी), and English translation support across all dashboards and interactive copilots.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Node.js 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/nirbhay-pabale/Project-Sahayya.git

# Navigate to project directory
cd Project-Sahayya

# Install dependencies
npm install

# Configure environment variables
# Copy .env.example to .env.local and set your Gemini/Anthropic API keys
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

---

## 🛠️ Technology Stack
- **Framework**: Next.js 15 (App Router, Server Components & Route Handlers)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Lucide Icons
- **Animation**: Framer Motion
- **Data Visualization**: Recharts
- **AI & Multimodal Vision**: Google Generative AI (Gemini Multimodal Vision) & Anthropic SDK
