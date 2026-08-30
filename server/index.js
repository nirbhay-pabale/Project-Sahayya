/**
 * Sahayya Express.js Backend Server
 * Microservice architecture supporting MSME Safety, Quality, Schemes, and Decision Simulations
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request Logger
app.use((req, res, next) => {
  console.log(`[Express API] ${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// 1. Healthcheck Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'operational',
    server: 'Express.js on Node.js',
    platform: 'Sahayya Enterprise Backend',
    version: '2.1.0',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// 2. Schemes Matcher Endpoint
app.post('/api/schemes/match', (req, res) => {
  try {
    const profile = req.body || {};
    const businessType = profile.businessType || 'Manufacturing';
    const loanAmount = profile.loanAmountNeeded || 750000;
    const hasUdyam = profile.hasUdyam ?? true;
    const hasGst = profile.hasGst ?? true;
    const businessAge = profile.businessAgeYears || 4;

    const matches = [];

    // MUDRA
    if (loanAmount <= 1000000) {
      matches.push({
        id: 'mudra',
        schemeName: 'Pradhan Mantri MUDRA Yojana (PMMY)',
        matchLevel: 'High Match',
        scorePct: 95,
        maxLoanOrSubsidyText: 'Collateral-Free Loan up to ₹10 Lakh',
        officialLink: 'https://www.mudra.org.in',
      });
    }

    // CGTMSE
    if (hasUdyam) {
      matches.push({
        id: 'cgtmse',
        schemeName: 'Credit Guarantee Fund Scheme for Micro & Small Enterprises (CGTMSE)',
        matchLevel: hasGst ? 'High Match' : 'Good Match',
        scorePct: hasGst ? 96 : 85,
        maxLoanOrSubsidyText: 'Collateral-Free Credit Guarantee up to ₹5 Crore',
        officialLink: 'https://www.cgtmse.in',
      });
    }

    // PMEGP
    if (businessAge <= 5 && hasUdyam) {
      matches.push({
        id: 'pmegp',
        schemeName: "Prime Minister's Employment Generation Programme (PMEGP)",
        matchLevel: 'High Match',
        scorePct: 92,
        maxLoanOrSubsidyText: '15% to 35% Capital Margin Money Subsidy',
        officialLink: 'https://www.kviconline.gov.in/pmegpeportal/',
      });
    }

    // ZED
    if (businessType === 'Manufacturing' && hasUdyam) {
      matches.push({
        id: 'zed',
        schemeName: 'MSME Sustainable (ZED) Certification & Subsidy Scheme',
        matchLevel: 'High Match',
        scorePct: 98,
        maxLoanOrSubsidyText: 'Up to 80% Government Subsidy on Audits & Testing',
        officialLink: 'https://zed.msme.gov.in',
      });
    }

    res.json({
      success: true,
      totalMatched: matches.length,
      profile,
      matches,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. What-If Simulator Endpoint
app.post('/api/simulator/analyze', (req, res) => {
  try {
    const { action = 'simulate', snapshot = {}, inputs = {} } = req.body;

    const currentProd = snapshot.currentMonthlyProduction || 4500;
    const currentRev = snapshot.currentMonthlyRevenue || 675000;
    const prodChange = inputs.productionChangePct || 20;

    const afterProd = Math.round(currentProd * (1 + prodChange / 100));
    const afterRev = Math.round(currentRev * (1 + prodChange / 100) * 0.98);

    res.json({
      success: true,
      data: {
        query: `Simulation for ${prodChange >= 0 ? '+' : ''}${prodChange}% production`,
        before: { productionUnits: currentProd, revenue: currentRev, defectRatePct: 0 },
        after: { productionUnits: afterProd, revenue: afterRev, defectRatePct: 0.8 },
        deltas: {
          productionDeltaPct: prodChange,
          revenueDeltaAbs: afterRev - currentRev,
        },
        recommendation: `Proceed: Expansion generates +₹${afterRev - currentRev} net turnover with stable shop-floor operations.`,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log('=======================================================');
  console.log(`🌿 Sahayya Express.js Backend Server Active on Port ${PORT}`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🏥 Healthcheck: http://localhost:${PORT}/api/health`);
  console.log('=======================================================');
});
