export type Language = "en" | "hi" | "mr";

export interface Translations {
  // Common & Navigation
  common: {
    loading: string;
    save: string;
    cancel: string;
    close: string;
    apply: string;
    download: string;
    verified: string;
    active: string;
    pending: string;
    actionRequired: string;
    freeTrial: string;
    proPlan: string;
    upgradeToPro: string;
    clearChat: string;
    allAlertsCleared: string;
  };
  nav: {
    home: string;
    features: string;
    aboutUs: string;
    contact: string;
    login: string;
    loginToAccount: string;
    startFree: string;
    selectLanguage: string;
  };

  // Auth pages (Login & Signup)
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    mobileOrEmailLabel: string;
    mobileOrEmailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    loginButton: string;
    noAccountPrompt: string;
    signupLink: string;
    freeTrialBadge: string;
    freeTrialPill: string;
    securityNote: string;
    validationNameRequired: string;
    validationContactRequired: string;

    signupTitle: string;
    signupSubtitle: string;
    firmNameLabel: string;
    firmNamePlaceholder: string;
    categoryLabel: string;
    categories: string[];
    createAccountButton: string;
    haveAccountPrompt: string;
    loginLink: string;
    benefitsList: string[];
  };

  // Intro Landing Page
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    titleFor: string;
    titleHighlight: string;
    subtitle: string;
    startFree: string;
    startFreeSub: string;
    tryPaid: string;
    tryPaidSub: string;
  };
  phoneMockup: {
    dashboard: string;
    welcomeBack: string;
    notifications: string;
    growthScore: string;
    good: string;
    growthVsLastMonth: string;
    complianceScore: string;
    compliant: string;
    complianceVsLastMonth: string;
    activeSchemes: string;
    applicable: string;
    viewAllSchemes: string;
    demandForecastTitle: string;
    localMarket: string;
    tabs: {
      home: string;
      monitor: string;
      forecast: string;
      credit: string;
      more: string;
    };
    monitor: {
      telemetryTitle: string;
      efficiency: string;
      passRate: string;
      qualityAudits: string;
      zedBronze: string;
      passed: string;
      isoReadiness: string;
      inReview: string;
    };
    forecast: {
      insightBadge: string;
      insightHeadline: string;
      insightTip: string;
      rawMaterialIndex: string;
      cottonJute: string;
      favorable: string;
    };
    credit: {
      title: string;
      preApproved: string;
      bankEligibility: string;
    };
    more: {
      udyamReg: string;
      verified: string;
      gstinAuto: string;
      active: string;
      clusterSupport: string;
      callSupport: string;
    };
    notificationsList: {
      title: string;
      description: string;
      time: string;
    }[];
  };
  creditCard: {
    title: string;
    subtitle: string;
    legendRevenue: string;
    legendQuality: string;
    legendProduction: string;
    scoreLabel: string;
    highEligibility: string;
    scoreExplanation: string;
  };
  demandCard: {
    title: string;
    statLabel: string;
    growthPercentage: string;
    localMarket: string;
    instruction: string;
  };

  // Dashboard Structure (Header, Sidebar, Right Aside)
  dashboard: {
    header: {
      searchPlaceholder: string;
      trialActiveBadge: string;
      upgradeButton: string;
      notificationsTitle: string;
      notificationsEmpty: string;
      profileSettings: string;
      logout: string;
    };
    sidebar: {
      tabs: {
        chat: string;
        documents: string;
        compliance: string;
        schemes: string;
        tools: string;
        business: string;
        alerts: string;
        settings: string;
        help: string;
      };
      upgradeCard: {
        title: string;
        description: string;
        button: string;
      };
    };
    aside: {
      alertsTitle: string;
      viewAll: string;
      proCard: {
        badge: string;
        title: string;
        description: string;
        button: string;
      };
      promoBanner: {
        badge: string;
        title: string;
        subtitle: string;
        button: string;
      };
    };
    featureGrid: {
      compliance: { title: string; desc: string };
      schemes: { title: string; desc: string };
      safety: { title: string; desc: string };
      stock: { title: string; desc: string };
      quality: { title: string; desc: string };
      patent: { title: string; desc: string };
      credits: { title: string; desc: string };
      tools: { title: string; desc: string };
    };
    mainChat: {
      welcomeGreeting: string;
      welcomeSub: string;
      chipDemand: string;
      chipPatent: string;
      inputPlaceholder: string;
      quickPromptsTitle: string;
      quickPrompts: string[];
      thinkingText: string;
      conversationSession: string;
      clearChatBtn: string;
    };
  };

  // 9 Dashboard Views
  views: {
    documents: {
      title: string;
      subtitle: string;
      uploadBtn: string;
      categories: string[];
      docNameHeader: string;
      categoryHeader: string;
      statusHeader: string;
      dateHeader: string;
      actionHeader: string;
    };
    compliance: {
      title: string;
      subtitle: string;
      healthScoreTitle: string;
      standingLabel: string;
      startAuditBtn: string;
      statutoryItems: {
        title: string;
        status: string;
        dueDate: string;
        notes: string;
      }[];
    };
    schemes: {
      title: string;
      subtitle: string;
      filterAll: string;
      filterGrants: string;
      filterLoans: string;
      startWizardBtn: string;
      matchedCountBadge: string;
    };
    tools: {
      title: string;
      subtitle: string;
      launchBtn: string;
    };
    business: {
      title: string;
      subtitle: string;
      profileCardTitle: string;
      signatoryLabel: string;
      firmNameLabel: string;
      categoryLabel: string;
      udyamStatusLabel: string;
      gstinStatusLabel: string;
      financialHealthLabel: string;
      editProfileBtn: string;
    };
    alerts: {
      title: string;
      subtitle: string;
      filterAll: string;
      filterHigh: string;
      activeCountBadge: string;
      allResolvedTitle: string;
      allResolvedSub: string;
      dismissTooltip: string;
    };
    settings: {
      title: string;
      subtitle: string;
      langSectionTitle: string;
      langSectionSub: string;
      notifSectionTitle: string;
      notifSectionSub: string;
      whatsappLabel: string;
      whatsappSub: string;
      smsLabel: string;
      smsSub: string;
      emailLabel: string;
      emailSub: string;
      saveBtn: string;
      saveSuccess: string;
    };
    help: {
      title: string;
      subtitle: string;
      whatsappSupportTitle: string;
      whatsappSupportSub: string;
      whatsappBtn: string;
      callSupportTitle: string;
      callSupportSub: string;
      callBtn: string;
      faqTitle: string;
      faqs: { q: string; a: string }[];
    };
  };

  // Structured Result Cards
  cards: {
    safety: {
      title: string;
      subtitle: string;
      passLabel: string;
      actionLabel: string;
      rerunBtn: string;
      tipsLibraryBtn: string;
      upgradePrompt: string;
      modalTitle: string;
    };
    demand: {
      title: string;
      subtitle: string;
      headlinePrefix: string;
      growthAvgLabel: string;
      nextMonthPred: string;
      tipsTitle: string;
      upgradePrompt: string;
    };
    credit: {
      title: string;
      subtitle: string;
      profileSummaryLabel: string;
      factorsLabel: string;
      schemesTitle: string;
      matchedBadge: string;
      benefitCoverageLabel: string;
      improvementPriorityLabel: string;
      upgradePrompt: string;
    };
    patent: {
      title: string;
      subtitle: string;
      freeTrialBadge: string;
      feeWaiverBadge: string;
      roadmapTitle: string;
      stages: { title: string; desc: string }[];
      upgradePrompt: string;
    };
    quality: {
      title: string;
      subtitle: string;
      zedGrantBadge: string;
      checklistTitle: string;
      correctiveTitle: string;
      uploadInitialPrompt: string;
      changePhotoBtn: string;
      analyzeImageBtn: string;
      upgradePrompt: string;
    };
    stock: {
      title: string;
      subtitle: string;
      liveLedgerBadge: string;
      lowStockBadge: string;
      allHealthyBadge: string;
      minThresholdLabel: string;
      addNewItemBtn: string;
      formTitle: string;
      itemNamePlaceholder: string;
      qtyPlaceholder: string;
      thresholdPlaceholder: string;
      unitPlaceholder: string;
      saveItemBtn: string;
      upgradePrompt: string;
    };
  };

  // Interactive Modals
  modals: {
    login: {
      title: string;
      description: string;
      authSuccessTitle: string;
      authSuccessSub: string;
      tabPhone: string;
      tabEmail: string;
      mobileLabel: string;
      mobilePlaceholder: string;
      otpLabel: string;
      otpPlaceholder: string;
      resendOtp: string;
      emailLabel: string;
      emailPlaceholder: string;
      passwordLabel: string;
      passwordPlaceholder: string;
      btnSendOtp: string;
      btnLogin: string;
      noAccount: string;
      startFree: string;
    };
    signup: {
      title: string;
      description: string;
      successTitle: string;
      successSub: string;
      firmLabel: string;
      firmPlaceholder: string;
      categoryLabel: string;
      categories: string[];
      contactLabel: string;
      contactPlaceholder: string;
      includedFreeBadge: string;
      includedFreeText: string;
      btnCreate: string;
      haveAccount: string;
      loginHere: string;
    };
    pricing: {
      offerBadge: string;
      title: string;
      description: string;
      successTitle: string;
      successSub: string;
      monthlyTitle: string;
      monthlyBadge: string;
      monthlyPrice: string;
      monthlyPeriod: string;
      monthlyDesc: string;
      annualTitle: string;
      annualBadge: string;
      annualPrice: string;
      annualPeriod: string;
      annualDesc: string;
      feature1: string;
      feature2: string;
      feature3: string;
      btnProcessing: string;
      btnProceed: string;
      securityNote: string;
    };
    schemes: {
      badge: string;
      title: string;
      description: string;
      benefitLabel: string;
      eligibilityLabel: string;
      deadlineLabel: string;
      btnApply: string;
      schemesList: {
        id: string;
        name: string;
        department: string;
        subsidy: string;
        eligibilityScore: string;
        status: string;
        deadline: string;
      }[];
    };
    proModal: {
      title: string;
      subtitle: string;
      price: string;
      billingNote: string;
      saveBadge: string;
      subscribeBtn: string;
      features: string[];
    };
    alertDetail: {
      title: string;
      dueLabel: string;
      filingPortalLabel: string;
      resolveBtn: string;
      resolvedConfirmation: string;
      closeBtn: string;
    };
    moreTools: {
      title: string;
      subtitle: string;
      exportTitle: string;
      exportDesc: string;
      exportedBadge: string;
      exportAction: string;
      langTitle: string;
      langDesc: string;
      configureAction: string;
      teamTitle: string;
      teamDesc: string;
      gstTitle: string;
      gstDesc: string;
      comingSoonBadge: string;
    };
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      close: "Close",
      apply: "Apply",
      download: "Download",
      verified: "Verified ✓",
      active: "Active ✓",
      pending: "Pending",
      actionRequired: "Action Required",
      freeTrial: "Free Trial",
      proPlan: "Pro Plan",
      upgradeToPro: "Upgrade to Pro",
      clearChat: "Clear chat",
      allAlertsCleared: "All alerts resolved! Compliance is healthy.",
    },
    nav: {
      home: "Home",
      features: "Features",
      aboutUs: "About Us",
      contact: "Contact",
      login: "Login",
      loginToAccount: "Login to Account",
      startFree: "Start for Free",
      selectLanguage: "Language",
    },
    auth: {
      loginTitle: "Log In to Sahayya",
      loginSubtitle: "Enter your registered name & details to access your free trial dashboard.",
      fullNameLabel: "Full Name",
      fullNamePlaceholder: "e.g. Priya Deshmukh",
      mobileOrEmailLabel: "Mobile Number or Email",
      mobileOrEmailPlaceholder: "98765 43210 or name@enterprise.in",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",
      loginButton: "Enter My Dashboard →",
      noAccountPrompt: "Don't have an enterprise account?",
      signupLink: "Register your business here",
      freeTrialBadge: "⚡ Free Trial Access",
      freeTrialPill: "No Credit Card Required • Instant Free Access",
      securityNote: "🔒 256-bit Bank Grade Security. Your MSME data is confidential.",
      validationNameRequired: "Please enter your full name to personalize your dashboard session.",
      validationContactRequired: "Please enter a valid mobile number or email address.",

      signupTitle: "Business Registration",
      signupSubtitle: "Join 12,000+ rural enterprises unlocking government grants, compliance, and credit rating.",
      firmNameLabel: "Enterprise / Firm Name",
      firmNamePlaceholder: "e.g. Sahyadri Agro Processing LLP",
      categoryLabel: "Enterprise Category",
      categories: [
        "Micro Enterprise (Agro / Food / Processing)",
        "Textile & Handloom Cluster",
        "Artisan / Handicrafts Unit",
        "Light Engineering / Fabrication",
        "Rural FPO / SHG Federation",
      ],
      createAccountButton: "Register & Start Free →",
      haveAccountPrompt: "Already registered?",
      loginLink: "Log in here",
      benefitsList: [
        "Instant Credit Readiness score and SIDBI/Mudra pre-approval",
        "80% subsidy assistance for ZED certification and patents",
        "Automated GST & State Factory license expiry reminders",
      ],
    },
    hero: {
      badge: "Empowering Rural Enterprises",
      titleLine1: "Digital Growth &",
      titleLine2: "Compliance Platform",
      titleFor: "for",
      titleHighlight: "Rural MSMEs",
      subtitle:
        "A one-stop digital platform to help rural enterprises and industrial clusters grow, stay compliant, access finance & schemes, and improve product quality.",
      startFree: "Start for Free",
      startFreeSub: "Free Forever • No Credit Card",
      tryPaid: "Try Paid at ₹199",
      tryPaidSub: "Unlock Premium Features",
    },
    phoneMockup: {
      dashboard: "Dashboard",
      welcomeBack: "Welcome back!",
      notifications: "Notifications",
      growthScore: "Overall Growth Score",
      good: "Good",
      growthVsLastMonth: "↑ 12% vs last month",
      complianceScore: "Compliance Score",
      compliant: "Compliant",
      complianceVsLastMonth: "↑ 8% vs last month",
      activeSchemes: "Active Schemes",
      applicable: "Applicable",
      viewAllSchemes: "View all schemes →",
      demandForecastTitle: "Demand Forecast (Next Month)",
      localMarket: "(Local Market)",
      tabs: {
        home: "Home",
        monitor: "Monitor",
        forecast: "Forecast",
        credit: "Credit",
        more: "More",
      },
      monitor: {
        telemetryTitle: "Cluster Production Telemetry",
        efficiency: "Efficiency (OEE)",
        passRate: "Pass Rate",
        qualityAudits: "Quality Audits",
        zedBronze: "ZED Bronze Inspection",
        passed: "Passed",
        isoReadiness: "ISO 9001 Readiness",
        inReview: "In Review",
      },
      forecast: {
        insightBadge: "AI Demand Insight",
        insightHeadline: "Anticipated 22% Surge in Regional Agri-Packaging",
        insightTip: "Recommendation: Advance inventory stocking by 10 days.",
        rawMaterialIndex: "Raw Material Index",
        cottonJute: "Cotton / Jute",
        favorable: "↓ 3.2% (Favorable)",
      },
      credit: {
        title: "Quality-Based Credit Pre-check",
        preApproved: "Pre-approved Collateral Free",
        bankEligibility: "Eligible for SIDBI & SBI MSME credit windows at 7.85% p.a.",
      },
      more: {
        udyamReg: "Udyam Registration",
        verified: "Verified ✓",
        gstinAuto: "GSTIN Automation",
        active: "Active ✓",
        clusterSupport: "Cluster Manager Support",
        callSupport: "Call Support",
      },
      notificationsList: [
        {
          title: "Udyam Renewal Due",
          description: "Renew verification before 15 Jun 2025.",
          time: "2h ago",
        },
        {
          title: "PMEGP Subsidy Match",
          description: "New 35% capital subsidy unlocked.",
          time: "1d ago",
        },
        {
          title: "GSTR-1 Filed",
          description: "May return successfully submitted.",
          time: "3d ago",
        },
      ],
    },
    creditCard: {
      title: "Credit Eligibility",
      subtitle: "(Quality-Based)",
      legendRevenue: "Revenue",
      legendQuality: "Quality",
      legendProduction: "Production",
      scoreLabel: "Eligibility Score",
      highEligibility: "High Eligibility",
      scoreExplanation: "Based on quality records & production history",
    },
    demandCard: {
      title: "Demand Forecast",
      statLabel: "Next Month Demand",
      growthPercentage: "↑ 15%",
      localMarket: "(Local Market)",
      instruction: "Adjust production plan accordingly.",
    },
    dashboard: {
      header: {
        searchPlaceholder: "Search compliance, schemes, tools or ask Sahayya AI...",
        trialActiveBadge: "Free Trial Active",
        upgradeButton: "Upgrade to Pro",
        notificationsTitle: "Notifications & Alerts",
        notificationsEmpty: "No unread notifications",
        profileSettings: "Business Profile & Settings",
        logout: "Log Out",
      },
      sidebar: {
        tabs: {
          chat: "Chat",
          documents: "My Documents",
          compliance: "Compliance",
          schemes: "Schemes & Finance",
          tools: "Tools",
          business: "My Business",
          alerts: "Alerts",
          settings: "Settings",
          help: "Help & Support",
        },
        upgradeCard: {
          title: "Upgrade to Pro",
          description: "Unlock detailed AI safety video monitoring, 1-click tax filing, and bank loan pre-approvals.",
          button: "Upgrade Plan",
        },
      },
      aside: {
        alertsTitle: "Alerts",
        viewAll: "View all",
        proCard: {
          badge: "Pro Plan Benefits",
          title: "Grow Faster with Pro",
          description: "Bank-ready DPR generation, priority WhatsApp support, and direct nodal bank application routing.",
          button: "Upgrade for ₹199",
        },
        promoBanner: {
          badge: "Govt Subsidy Alert",
          title: "PMEGP 35% Capital Grant",
          subtitle: "Applications open for rural manufacturing units. Get up to ₹50 Lakhs project funding.",
          button: "Check Eligibility →",
        },
      },
      featureGrid: {
        compliance: {
          title: "Check Compliance",
          desc: "GST, Udyam, factory licenses & statutory tracking",
        },
        schemes: {
          title: "Find Government Schemes",
          desc: "PMEGP, Mudra, PMFME grants & subsidies",
        },
        safety: {
          title: "AI Safety Check",
          desc: "OSHA & Factory Act hazard assessment",
        },
        stock: {
          title: "Stock Management",
          desc: "Track inventory, raw material buffers & low alerts",
        },
        quality: {
          title: "AI Quality Check",
          desc: "Photo inspection, defect audit & ZED rating",
        },
        patent: {
          title: "IP / Patent Support",
          desc: "Protect innovations with 80% MSME fee waiver",
        },
        credits: {
          title: "Credit Readiness",
          desc: "CGTMSE & loan pre-qualification scoring",
        },
        tools: {
          title: "More Tools",
          desc: "Data export, language switch & calculators",
        },
      },
      mainChat: {
        welcomeGreeting: "Hi there! I'm",
        welcomeSub: "Ask me anything about compliance, schemes, finance, licenses, or how to grow your business. I'm here to help.",
        chipDemand: "📈 Demand for your category is trending up... Run forecast",
        chipPatent: "💡 Claim 80% MSME fee waiver on Indian patents",
        inputPlaceholder: "Ask anything about compliance, schemes, safety, or finance...",
        quickPromptsTitle: "Quick Suggestions",
        quickPrompts: [
          "Check my GST deadline & factory compliance",
          "How to reduce workshop electricity bills?",
          "Can I apply for PMEGP and Mudra together?",
          "What safety guards are needed for mechanical presses?",
        ],
        thinkingText: "Sahayya AI is thinking...",
        conversationSession: "Conversation Session",
        clearChatBtn: "Clear chat",
      },
    },
    views: {
      documents: {
        title: "Enterprise Document Vault",
        subtitle: "Securely store, organize, and download your GST returns, Udyam certificates, and scheme applications.",
        uploadBtn: "Upload New Document",
        categories: ["All Documents", "Tax & GST", "Licensing", "Schemes & Grants", "Quality & ZED"],
        docNameHeader: "Document Title",
        categoryHeader: "Category",
        statusHeader: "Verification",
        dateHeader: "Last Updated",
        actionHeader: "Action",
      },
      compliance: {
        title: "Statutory & Tax Compliance Health",
        subtitle: "Monitor filing statuses across GST, Factory Permits, Pollution Consent (CPCB), and EPFO challans.",
        healthScoreTitle: "Overall Compliance Standing",
        standingLabel: "High Good Standing (92%)",
        startAuditBtn: "Run Full Compliance Check",
        statutoryItems: [
          {
            title: "GSTR-1 & GSTR-3B Monthly Returns",
            status: "Compliant",
            dueDate: "11 June 2025",
            notes: "April return filed. May reconciliation in progress.",
          },
          {
            title: "State Factory Directorate License",
            status: "Action Required",
            dueDate: "22 June 2025",
            notes: "Permit renewal form due within 22 days.",
          },
          {
            title: "Pollution Control Board Consent to Operate (CTO)",
            status: "Valid",
            dueDate: "31 March 2026",
            notes: "Annual emission audit cleared.",
          },
          {
            title: "EPFO / ESIC Worker Remittances",
            status: "Cleared",
            dueDate: "15 June 2025",
            notes: "All 18 worker monthly challans cleared.",
          },
        ],
      },
      schemes: {
        title: "Government Schemes & Subsidies Navigator",
        subtitle: "Matched central and state incentives based on your enterprise category, vintage, and credit profile.",
        filterAll: "All Schemes",
        filterGrants: "Capital Subsidies",
        filterLoans: "Collateral-Free Loans",
        startWizardBtn: "Find More Schemes via Chat",
        matchedCountBadge: "5 Schemes Applicable",
      },
      tools: {
        title: "MSME Operations & Growth Tools",
        subtitle: "Interactive calculators, export utilities, and shop-floor productivity boosters.",
        launchBtn: "Launch Tool →",
      },
      business: {
        title: "Enterprise KYC & Profile",
        subtitle: "Verified business records used to auto-fill government loan and subsidy applications.",
        profileCardTitle: "Registered MSME Details",
        signatoryLabel: "Authorized Signatory",
        firmNameLabel: "Enterprise Name",
        categoryLabel: "Industry Cluster",
        udyamStatusLabel: "Udyam Aadhaar Status",
        gstinStatusLabel: "GSTIN Status",
        financialHealthLabel: "Credit Health Rating",
        editProfileBtn: "Edit Business Profile",
      },
      alerts: {
        title: "Actionable Alerts & Statutory Deadlines",
        subtitle: "Real-time notifications regarding license expiries, tax filing due dates, and compliance actions.",
        filterAll: "All Alerts",
        filterHigh: "High Priority",
        activeCountBadge: "Active",
        allResolvedTitle: "All alerts resolved!",
        allResolvedSub: "Your enterprise compliance status is up to date.",
        dismissTooltip: "Dismiss alert",
      },
      settings: {
        title: "Platform Settings & Preferences",
        subtitle: "Configure notification channels, statutory alerts, and regional language preferences.",
        langSectionTitle: "Interface Language",
        langSectionSub: "Choose your preferred language for site text, chatbot guidance, and dashboard tools.",
        notifSectionTitle: "Statutory Due Date Notifications",
        notifSectionSub: "Receive automated reminders before GST filing and license expiry dates.",
        whatsappLabel: "WhatsApp Instant Alerts",
        whatsappSub: "Receive 3-day reminders on your registered mobile number",
        smsLabel: "SMS Critical Reminders",
        smsSub: "Emergency 24-hour statutory expiry alerts via SMS",
        emailLabel: "Weekly MSME Subsidy Digest",
        emailSub: "Curated weekly list of new government grants for your sector",
        saveBtn: "Save Preferences",
        saveSuccess: "Preferences saved successfully!",
      },
      help: {
        title: "Help & Enterprise Support",
        subtitle: "Get guided assistance from MSME specialists, view scheme tutorials, and explore FAQs.",
        whatsappSupportTitle: "Direct WhatsApp Support Desk",
        whatsappSupportSub: "Chat directly with a certified compliance and scheme advisor.",
        whatsappBtn: "Open WhatsApp Chat",
        callSupportTitle: "Cluster Helpline (Toll-Free)",
        callSupportSub: "Mon-Sat, 9:00 AM - 6:00 PM IST",
        callBtn: "Call 1800-SAHAYYA",
        faqTitle: "Frequently Asked Questions",
        faqs: [
          {
            q: "How does Sahayya help rural MSMEs get bank loans?",
            a: "Sahayya synthesizes your self-reported sales, record-keeping discipline, and Udyam status into a structured credit profile that aligns with CGTMSE collateral-free lending rules and Mudra guidelines.",
          },
          {
            q: "Are the government scheme recommendations updated for 2025?",
            a: "Yes, Sahayya monitors latest guidelines from the Ministry of MSME, KVIC (PMEGP), MOFPI (PMFME), and SIDBI.",
          },
          {
            q: "What is the fee waiver for MSME patent applications?",
            a: "Under the amended Patent Rules, registered MSMEs and DPIIT-recognized startups receive an 80% statutory fee waiver on all Indian patent filing and examination fees.",
          },
          {
            q: "How do I download my compliance report?",
            a: "Run the 'Check Compliance' flow or open 'My Documents' to download a clean text summary of all your statutory statuses.",
          },
        ],
      },
    },
    cards: {
      safety: {
        title: "Workplace Safety Self-Audit",
        subtitle: "4-Point Hazard & Machinery Assessment",
        passLabel: "Pass",
        actionLabel: "Action Required",
        rerunBtn: "Re-run Safety Check",
        tipsLibraryBtn: "View Safety Tips Library",
        upgradePrompt: "Upgrade to Pro for Real-Time Camera AI Monitoring",
        modalTitle: "OSHA & Factory Act Safety Tips Library",
      },
      demand: {
        title: "Production Demand Forecast",
        subtitle: "Trend-based batch projection & inventory recommendations",
        headlinePrefix: "Next month, you may need around",
        growthAvgLabel: "Avg. Growth Trend",
        nextMonthPred: "Projected Units",
        tipsTitle: "Actionable Production Recommendations",
        upgradePrompt: "Upgrade to Pro for Live Mandi APMC Demand Forecasts",
      },
      credit: {
        title: "MSME Credit Readiness Profile",
        subtitle: "Institutional Lender Eligibility Assessment",
        profileSummaryLabel: "Profile Summary",
        factorsLabel: "Credit Score Factors",
        schemesTitle: "Schemes You May Be Eligible For",
        matchedBadge: "Matched",
        benefitCoverageLabel: "Benefit Coverage",
        improvementPriorityLabel: "Improvement Priority",
        upgradePrompt: "Upgrade to Pro for Verified Bank DPR & Pre-Approval",
      },
      patent: {
        title: "Indian Patent Filing Roadmap",
        subtitle: "6-Stage Intellectual Property Assessment (Form 1 to Grant)",
        freeTrialBadge: "Included in Free Trial",
        feeWaiverBadge: "80% MSME Fee Waiver",
        roadmapTitle: "6-Stage IPO Visual Stepper Roadmap",
        stages: [
          { title: "Idea Check", desc: "Confirm your idea is new and hasn't been publicly shared yet." },
          { title: "Prior Art Search", desc: "Check if something similar already exists (basic manual search)." },
          { title: "Provisional Filing", desc: "File a provisional application to lock in your filing date." },
          { title: "Complete Specification", desc: "Submit full technical details within 12 months." },
          { title: "Examination", desc: "Patent office reviews and may raise objections." },
          { title: "Response & Grant", desc: "Respond to objections; patent is granted if approved." },
        ],
        upgradePrompt: "Upgrade to Pro for AI Prior-Art Search & Patent Attorney Drafting",
      },
      quality: {
        title: "AI Quality & ZED Certification Check",
        subtitle: "3-Point Batch Inspection & Zero Defect Assessment",
        zedGrantBadge: "80% ZED Grant",
        checklistTitle: "Batch Inspection Checklist",
        correctiveTitle: "Corrective Quality Actions",
        uploadInitialPrompt: "Upload a photo of your product sample to get started",
        changePhotoBtn: "Change photo",
        analyzeImageBtn: "Analyze This Image & Start Check",
        upgradePrompt: "Upgrade to Pro for Automated Computer Vision Defect Detection",
      },
      stock: {
        title: "MSME Inventory & Stock Ledger",
        subtitle: "Track raw material buffers, finished lots & threshold alerts",
        liveLedgerBadge: "Live Ledger",
        lowStockBadge: "Low Stock Alert",
        allHealthyBadge: "All Levels Healthy",
        minThresholdLabel: "Min Buffer Threshold",
        addNewItemBtn: "Add New Raw Material / Finished Item",
        formTitle: "Add New Stock Item",
        itemNamePlaceholder: "Item name (e.g. Copper Wire Coils)",
        qtyPlaceholder: "Current Qty",
        thresholdPlaceholder: "Low Alert",
        unitPlaceholder: "Unit (kg/pcs)",
        saveItemBtn: "Save Stock Item",
        upgradePrompt: "Upgrade to Pro for Automated Barcode & Purchase Order Engine",
      },
    },
    modals: {
      login: {
        title: "Welcome to Sahayya",
        description: "Access your enterprise dashboard, compliance tracker, and credit eligibility.",
        authSuccessTitle: "Authentication Successful!",
        authSuccessSub: "Redirecting you to your MSME dashboard...",
        tabPhone: "Mobile OTP",
        tabEmail: "Email / Password",
        mobileLabel: "Registered Mobile Number",
        mobilePlaceholder: "98765 43210",
        otpLabel: "Enter 6-digit OTP",
        otpPlaceholder: "123456",
        resendOtp: "Resend OTP (28s)",
        emailLabel: "Email Address",
        emailPlaceholder: "name@enterprise.in",
        passwordLabel: "Password",
        passwordPlaceholder: "••••••••",
        btnSendOtp: "Send Verification OTP",
        btnLogin: "Log In to Sahayya",
        noAccount: "Don't have an account?",
        startFree: "Start for Free",
      },
      signup: {
        title: "Start Free Forever",
        description: "Join 12,000+ rural enterprises boosting credit ratings and automating compliance. No credit card required.",
        successTitle: "Welcome to Sahayya!",
        successSub: "Your free workspace is ready. Unlocking MSME scheme diagnostics now...",
        firmLabel: "Enterprise / Firm Name",
        firmPlaceholder: "e.g. Sahyadri Agro Processing LLP",
        categoryLabel: "Enterprise Category",
        categories: [
          "Micro Enterprise (Agro / Food / Processing)",
          "Textile & Handloom Cluster",
          "Artisan / Handicrafts Unit",
          "Light Engineering / Manufacturing",
          "Rural FPO / SHG Federation",
        ],
        contactLabel: "Mobile Number or Email",
        contactPlaceholder: "+91 98765 43210 or email@domain.com",
        includedFreeBadge: "Included free:",
        includedFreeText: "Quality scoring, basic demand forecast, government scheme alerts & GST reminders.",
        btnCreate: "Create Free Account",
        haveAccount: "Already have an account?",
        loginHere: "Log in here",
      },
      pricing: {
        offerBadge: "⚡ Special MSME Intro Offer",
        title: "Unlock Sahayya Pro",
        description: "Full compliance filing automation, bank credit dossier export, and AI demand forecasting.",
        successTitle: "Pro Plan Activated!",
        successSub: "Receipt and instant setup guide sent via SMS & WhatsApp.",
        monthlyTitle: "Monthly Plan",
        monthlyBadge: "Most Popular",
        monthlyPrice: "₹199",
        monthlyPeriod: "/ month",
        monthlyDesc: "Cancel anytime. Ideal for single enterprise units.",
        annualTitle: "Annual Pass",
        annualBadge: "Save 30%",
        annualPrice: "₹1,699",
        annualPeriod: "/ year",
        annualDesc: "Includes dedicated CA & cluster manager phone support.",
        feature1: "Quality-backed 810/1000 Bank Credit Report PDF",
        feature2: "Direct application to PMEGP & CGTMSE schemes",
        feature3: "Next-month cluster demand & inventory recommendation",
        btnProcessing: "Connecting to Payment Gateway...",
        btnProceed: "Proceed to Pay (UPI / Cards)",
        securityNote: "🔒 256-bit Encrypted. Supports Google Pay, PhonePe, Paytm, Cards & Netbanking.",
      },
      schemes: {
        badge: "Government Schemes Navigator",
        title: "5 Matched Government Schemes",
        description: "Based on your enterprise quality score (810/1000) and production records.",
        benefitLabel: "Benefit / Subsidy:",
        eligibilityLabel: "Eligibility Check:",
        deadlineLabel: "Deadline:",
        btnApply: "Apply with Sahayya Pre-fill",
        schemesList: [
          {
            id: "pmegp",
            name: "Prime Minister Employment Generation Programme (PMEGP)",
            department: "Ministry of MSME, Govt of India",
            subsidy: "Up to 35% Capital Subsidy (Max ₹50 Lakhs)",
            eligibilityScore: "High Match (Score 810/1000)",
            status: "Eligible",
            deadline: "30 June 2025",
          },
          {
            id: "zed",
            name: "MSME Sustainable (ZED) Certification Grant",
            department: "Quality Council of India (QCI)",
            subsidy: "80% Financial Reimbursement for Bronze/Silver/Gold",
            eligibilityScore: "Verified Inspection Ready",
            status: "Eligible",
            deadline: "Open All Year",
          },
          {
            id: "mudra",
            name: "Pradhan Mantri MUDRA Yojana (Tarun Tier)",
            department: "Department of Financial Services",
            subsidy: "Collateral-Free Loan up to ₹10 Lakhs (Concessional ROI)",
            eligibilityScore: "Pre-Approved",
            status: "Eligible",
            deadline: "No Deadline",
          },
          {
            id: "pmfme",
            name: "PM Formalisation of Micro Food Processing (PMFME)",
            department: "Ministry of Food Processing Industries",
            subsidy: "35% Credit-Linked Grant up to ₹10 Lakhs",
            eligibilityScore: "Sector Qualified",
            status: "Application Open",
            deadline: "15 July 2025",
          },
          {
            id: "cgtmse",
            name: "Credit Guarantee Fund Trust for Micro & Small Enterprises",
            department: "SIDBI & Ministry of MSME",
            subsidy: "85% Govt Guarantee on Bank Loans up to ₹2 Crore",
            eligibilityScore: "High Quality Rating",
            status: "Eligible",
            deadline: "Rolling Window",
          },
        ],
      },
      proModal: {
        title: "Upgrade to Sahayya Pro",
        subtitle: "Unlock enterprise-grade AI automation, full compliance guarantees, and bank-ready financing tools.",
        price: "₹199",
        billingNote: "/ month (Billed annually)",
        saveBadge: "Save 50% Today",
        subscribeBtn: "Subscribe to Pro Plan",
        features: [
          "Live Computer Vision PPE & Hazard Safety Video Analysis",
          "Automated GST & ZED 1-Click Return Filings",
          "Live Mandi APMC Demand & Predictive Pricing Model",
          "Automated SIDBI Bank DPR & Credit Score Pre-Approval",
          "Priority WhatsApp Support from Compliance Officers",
        ],
      },
      alertDetail: {
        title: "Statutory Alert Details",
        dueLabel: "Due Date",
        filingPortalLabel: "Filing Portal",
        resolveBtn: "Mark as Resolved ✓",
        resolvedConfirmation: "Alert resolved! Compliance updated.",
        closeBtn: "Close",
      },
      moreTools: {
        title: "MSME Growth & Utility Tools",
        subtitle: "Quick utilities for data exports, scheme databases, and team collaboration.",
        exportTitle: "Export Enterprise Profile Data",
        exportDesc: "Download certified JSON/CSV summary of your compliance & business KYC.",
        exportedBadge: "Exported!",
        exportAction: "Export →",
        langTitle: "Interface Language & Regional Dialects",
        langDesc: "Switch site and chatbot between English, हिन्दी (Hindi), and मराठी (Marathi).",
        configureAction: "Configure →",
        teamTitle: "Multi-User Supervisor Access",
        teamDesc: "Add shop-floor supervisors and accounts clerks with role-based permissions.",
        gstTitle: "Automated GST PMT-06 Challan Maker",
        gstDesc: "Compute monthly net tax liabilities and auto-fill GST portal bank challans.",
        comingSoonBadge: "Coming Soon (Pro)",
      },
    },
  },

  hi: {
    common: {
      loading: "लोड हो रहा है...",
      save: "सहेजें",
      cancel: "रद्द करें",
      close: "बंद करें",
      apply: "आवेदन करें",
      download: "डाउनलोड करें",
      verified: "सत्यापित ✓",
      active: "सक्रिय ✓",
      pending: "लंबित",
      actionRequired: "कार्रवाई आवश्यक",
      freeTrial: "निःशुल्क ट्रायल",
      proPlan: "प्रो प्लान",
      upgradeToPro: "प्रो में अपग्रेड करें",
      clearChat: "चैट साफ करें",
      allAlertsCleared: "सभी अलर्ट हल हो गए! अनुपालन स्थिति उत्तम है।",
    },
    nav: {
      home: "होम",
      features: "विशेषताएं",
      aboutUs: "हमारे बारे में",
      contact: "संपर्क करें",
      login: "लॉग इन",
      loginToAccount: "खाते में लॉग इन करें",
      startFree: "निःशुल्क शुरू करें",
      selectLanguage: "भाषा",
    },
    auth: {
      loginTitle: "सहाय्य में लॉग इन करें",
      loginSubtitle: "अपने फ्री ट्रायल डैशबोर्ड तक पहुंचने के लिए अपना पंजीकृत नाम और विवरण दर्ज करें।",
      fullNameLabel: "पूरा नाम",
      fullNamePlaceholder: "उदा. प्रिया देशमुख",
      mobileOrEmailLabel: "मोबाइल नंबर या ईमेल पता",
      mobileOrEmailPlaceholder: "98765 43210 या name@enterprise.in",
      passwordLabel: "पासवर्ड",
      passwordPlaceholder: "••••••••",
      loginButton: "डैशबोर्ड में प्रवेश करें →",
      noAccountPrompt: "क्या आपके पास खाता नहीं है?",
      signupLink: "यहां अपना व्यवसाय पंजीकृत करें",
      freeTrialBadge: "⚡ निःशुल्क ट्रायल एक्सेस",
      freeTrialPill: "क्रेडिट कार्ड की आवश्यकता नहीं • तुरंत निःशुल्क एक्सेस",
      securityNote: "🔒 256-बिट बैंक स्तरीय सुरक्षा। आपका डेटा पूर्णतः गोपनीय है।",
      validationNameRequired: "डैशबोर्ड सत्र को व्यक्तिगत बनाने के लिए कृपया अपना पूरा नाम दर्ज करें।",
      validationContactRequired: "कृपया एक वैध मोबाइल नंबर या ईमेल पता दर्ज करें।",

      signupTitle: "व्यवसाय पंजीकरण",
      signupSubtitle: "12,000+ से अधिक ग्रामीण उद्यमों से जुड़ें और सरकारी अनुदान व ऋण रेटिंग प्राप्त करें।",
      firmNameLabel: "उद्यम / फर्म का नाम",
      firmNamePlaceholder: "उदा. सह्याद्री एग्रो प्रोसेसिंग LLP",
      categoryLabel: "उद्यम की श्रेणी",
      categories: [
        "सूक्ष्म उद्यम (कृषि / खाद्य प्रसंस्करण)",
        "वस्त्र एवं हथकरघा क्लस्टर",
        "कारीगर / हस्तशिल्प इकाई",
        "लाइट इंजीनियरिंग / विनिर्माण",
        "ग्रामीण FPO / स्वयं सहायता समूह",
      ],
      createAccountButton: "पंजीकृत करें और निःशुल्क शुरू करें →",
      haveAccountPrompt: "पहले से पंजीकृत हैं?",
      loginLink: "यहां लॉग इन करें",
      benefitsList: [
        "तत्काल क्रेडिट पात्रता स्कोर और SIDBI/Mudra पूर्व-मंजूरी",
        "ZED प्रमाणन और पेटेंट हेतु 80% सरकारी सब्सिडी सहायता",
        "GST और राज्य फैक्ट्री लाइसेंस समाप्ति के स्वचालित रिमाइंडर",
      ],
    },
    hero: {
      badge: "ग्रामीण उद्यमों का सशक्तिकरण",
      titleLine1: "डिजिटल विकास एवं",
      titleLine2: "अनुपालन मंच",
      titleFor: "ग्रामीण",
      titleHighlight: "MSME उद्यमों के लिए",
      subtitle:
        "ग्रामीण उद्यमों और औद्योगिक समूहों को आगे बढ़ाने, नियमों का अनुपालन करने, वित्त व सरकारी योजनाओं तक पहुंचने और गुणवत्ता सुधारने का संपूर्ण डिजिटल समाधान।",
      startFree: "निःशुल्क शुरू करें",
      startFreeSub: "हमेशा फ्री • क्रेडिट कार्ड की जरूरत नहीं",
      tryPaid: "₹199 में प्रो प्लान लें",
      tryPaidSub: "प्रीमियम सुविधाएं अनलॉक करें",
    },
    phoneMockup: {
      dashboard: "डैशबोर्ड",
      welcomeBack: "नमस्ते, आपका स्वागत है!",
      notifications: "सूचनाएं",
      growthScore: "कुल विकास स्कोर",
      good: "उत्तम",
      growthVsLastMonth: "↑ पिछले माह से 12% अधिक",
      complianceScore: "अनुपालन स्कोर",
      compliant: "पूर्ण अनुपालन",
      complianceVsLastMonth: "↑ पिछले माह से 8% अधिक",
      activeSchemes: "सक्रिय योजनाएं",
      applicable: "लागू योजनाएं",
      viewAllSchemes: "सभी योजनाएं देखें →",
      demandForecastTitle: "मांग पूर्वानुमान (अगला माह)",
      localMarket: "(स्थानीय बाज़ार)",
      tabs: {
        home: "होम",
        monitor: "मॉनिटर",
        forecast: "पूर्वानुमान",
        credit: "क्रेडिट",
        more: "अधिक",
      },
      monitor: {
        telemetryTitle: "क्लस्टर उत्पादन टेलीमेट्री",
        efficiency: "दक्षता (OEE)",
        passRate: "सफलता दर",
        qualityAudits: "गुणवत्ता ऑडिट",
        zedBronze: "ZED कांस्य निरीक्षण",
        passed: "उत्तीर्ण",
        isoReadiness: "ISO 9001 तैयारी",
        inReview: "समीक्षा में",
      },
      forecast: {
        insightBadge: "AI मांग अंतर्दृष्टि",
        insightHeadline: "क्षेत्रीय कृषि-पैकेजिंग में 22% वृद्धि की संभावना",
        insightTip: "सुझाव: कच्चे माल का स्टॉक 10 दिन पहले से तैयार रखें।",
        rawMaterialIndex: "कच्चा माल सूचकांक",
        cottonJute: "कपास / जूट",
        favorable: "↓ 3.2% (अनुकूल)",
      },
      credit: {
        title: "गुणवत्ता-आधारित ऋण पात्रता",
        preApproved: "बिना गारंटी पूर्व-स्वीकृत",
        bankEligibility: "7.85% वार्षिक दर पर SIDBI व SBI MSME ऋण हेतु पात्र।",
      },
      more: {
        udyamReg: "उद्यम पंजीकरण",
        verified: "सत्यापित ✓",
        gstinAuto: "GSTIN ऑटोमेशन",
        active: "सक्रिय ✓",
        clusterSupport: "क्लस्टर प्रबंधक सहायता",
        callSupport: "कॉल सहायता",
      },
      notificationsList: [
        {
          title: "उद्यम नवीनीकरण देय",
          description: "15 जून 2025 से पहले वार्षिक सत्यापन पूरा करें।",
          time: "2 घंटे पहले",
        },
        {
          title: "PMEGP सब्सिडी मैच",
          description: "35% नई पूंजी सब्सिडी अनलॉक हुई।",
          time: "1 दिन पहले",
        },
        {
          title: "GSTR-1 दाखिल",
          description: "मई माह का रिटर्न सफलतापूर्वक जमा हुआ।",
          time: "3 दिन पहले",
        },
      ],
    },
    creditCard: {
      title: "क्रेडिट पात्रता",
      subtitle: "(गुणवत्ता आधारित)",
      legendRevenue: "राजस्व",
      legendQuality: "गुणवत्ता",
      legendProduction: "उत्पादन",
      scoreLabel: "पात्रता स्कोर",
      highEligibility: "उच्च पात्रता",
      scoreExplanation: "गुणवत्ता रिकॉर्ड और उत्पादन इतिहास के आधार पर",
    },
    demandCard: {
      title: "मांग पूर्वानुमान",
      statLabel: "अगले माह की मांग",
      growthPercentage: "↑ 15%",
      localMarket: "(स्थानीय बाज़ार)",
      instruction: "तदनुसार उत्पादन योजना को समायोजित करें।",
    },
    dashboard: {
      header: {
        searchPlaceholder: "अनुपालन, योजनाएं, टूल्स खोजें या सहाय्य AI से पूछें...",
        trialActiveBadge: "निःशुल्क ट्रायल सक्रिय",
        upgradeButton: "प्रो में अपग्रेड करें",
        notificationsTitle: "सूचनाएं एवं अलर्ट",
        notificationsEmpty: "कोई नई सूचना नहीं है",
        profileSettings: "व्यवसाय प्रोफ़ाइल एवं सेटिंग्स",
        logout: "लॉग आउट करें",
      },
      sidebar: {
        tabs: {
          chat: "चैट",
          documents: "मेरे दस्तावेज़",
          compliance: "अनुपालन",
          schemes: "योजनाएं एवं वित्त",
          tools: "टूल्स",
          business: "मेरा व्यवसाय",
          alerts: "अलर्ट",
          settings: "सेटिंग्स",
          help: "सहायता एवं समर्थन",
        },
        upgradeCard: {
          title: "प्रो में अपग्रेड करें",
          description: "AI कैमरा सुरक्षा मॉनिटरिंग, 1-क्लिक टैक्स फाइलिंग और बैंक ऋण पूर्व-स्वीकृति अनलॉक करें।",
          button: "प्लान अपग्रेड करें",
        },
      },
      aside: {
        alertsTitle: "अलर्ट",
        viewAll: "सभी देखें",
        proCard: {
          badge: "प्रो प्लान के लाभ",
          title: "प्रो के साथ तेजी से बढ़ें",
          description: "बैंक-तैयार DPR निर्माण, प्राथमिकता WhatsApp सहायता और नोडल बैंक सीधी रूटिंग।",
          button: "₹199 में अपग्रेड करें",
        },
        promoBanner: {
          badge: "सरकारी सब्सिडी अलर्ट",
          title: "PMEGP 35% पूंजी अनुदान",
          subtitle: "ग्रामीण विनिर्माण इकाइयों के लिए आवेदन खुले हैं। ₹50 लाख तक का प्रोजेक्ट फंड पाएं।",
          button: "पात्रता जांचें →",
        },
      },
      featureGrid: {
        compliance: {
          title: "अनुपालन जांचें",
          desc: "GST, उद्यम, फैक्ट्री लाइसेंस और वैधानिक ट्रैकिंग",
        },
        schemes: {
          title: "सरकारी योजनाएं खोजें",
          desc: "PMEGP, मुद्रा, PMFME अनुदान और सब्सिडी",
        },
        safety: {
          title: "AI सुरक्षा ऑडिट",
          desc: "कारखाना अधिनियम और कार्यस्थल खतरा मूल्यांकन",
        },
        stock: {
          title: "स्टॉक प्रबंधन",
          desc: "इन्वेंट्री, कच्चा माल बफर और लो-स्टॉक अलर्ट ट्रैक करें",
        },
        quality: {
          title: "AI गुणवत्ता जांच",
          desc: "उत्पाद फोटो निरीक्षण, दोष ऑडिट और ZED रेटिंग",
        },
        patent: {
          title: "IP / पेटेंट सहायता",
          desc: "80% MSME फीस छूट के साथ आविष्कारों को सुरक्षित करें",
        },
        credits: {
          title: "ऋण पात्रता (क्रेडिट)",
          desc: "CGTMSE और बैंक ऋण पूर्व-योग्यता स्कोरिंग",
        },
        tools: {
          title: "अन्य उपयोगी टूल्स",
          desc: "डेटा एक्सपोर्ट, भाषा चयन और उपयोगिता कैलकुलेटर",
        },
      },
      mainChat: {
        welcomeGreeting: "नमस्ते! मैं हूँ",
        welcomeSub: "अनुपालन, सरकारी योजनाएं, वित्त, लाइसेंस, या व्यवसाय बढ़ाने के बारे में कुछ भी पूछें। मैं आपकी सहायता के लिए तैयार हूँ।",
        chipDemand: "📈 आपकी श्रेणी में मांग बढ़ रही है... पूर्वानुमान चलाएं",
        chipPatent: "💡 भारतीय पेटेंट पर 80% MSME फीस छूट प्राप्त करें",
        inputPlaceholder: "अनुपालन, योजनाएं, सुरक्षा या वित्त के बारे में कुछ भी पूछें...",
        quickPromptsTitle: "त्वरित सुझाव",
        quickPrompts: [
          "मेरी GST अंतिम तिथि और फैक्ट्री अनुपालन जांचें",
          "वर्कशॉप का बिजली बिल कैसे कम करें?",
          "क्या मैं PMEGP और मुद्रा ऋण एक साथ ले सकता हूँ?",
          "मैकेनिकल प्रेस के लिए कौन से सुरक्षा गार्ड जरूरी हैं?",
        ],
        thinkingText: "सहाय्य AI सोच रहा है...",
        conversationSession: "सक्रिय बातचीत सत्र",
        clearChatBtn: "चैट साफ करें",
      },
    },
    views: {
      documents: {
        title: "एंटरप्राइज दस्तावेज़ वॉल्ट",
        subtitle: "अपने GST रिटर्न, उद्यम प्रमाणपत्र और योजना आवेदनों को सुरक्षित रूप से सहेजें और डाउनलोड करें।",
        uploadBtn: "नया दस्तावेज़ अपलोड करें",
        categories: ["सभी दस्तावेज़", "टैक्स एवं GST", "लाइसेंसिंग", "योजनाएं एवं अनुदान", "गुणवत्ता एवं ZED"],
        docNameHeader: "दस्तावेज़ का नाम",
        categoryHeader: "श्रेणी",
        statusHeader: "सत्यापन",
        dateHeader: "अंतिम अपडेट",
        actionHeader: "कार्रवाई",
      },
      compliance: {
        title: "वैधानिक एवं टैक्स अनुपालन स्थिति",
        subtitle: "GST, फैक्ट्री परमिट, प्रदूषण बोर्ड सहमति (CPCB) और EPFO चालानों की स्थिति ट्रैक करें।",
        healthScoreTitle: "कुल अनुपालन स्थिति",
        standingLabel: "उच्च अनुपालन स्थिति (92%)",
        startAuditBtn: "पूर्ण अनुपालन जांच शुरू करें",
        statutoryItems: [
          {
            title: "GSTR-1 एवं GSTR-3B मासिक रिटर्न",
            status: "अनुपालन पूर्ण",
            dueDate: "11 जून 2025",
            notes: "अप्रैल रिटर्न जमा। मई समाधान प्रक्रिया में है।",
          },
          {
            title: "राज्य फैक्ट्री निदेशालय लाइसेंस",
            status: "कार्रवाई आवश्यक",
            dueDate: "22 जून 2025",
            notes: "लाइसेंस नवीनीकरण फॉर्म 22 दिनों के भीतर देय है।",
          },
          {
            title: "प्रदूषण नियंत्रण बोर्ड संचालन सहमति (CTO)",
            status: "वैध",
            dueDate: "31 मार्च 2026",
            notes: "वार्षिक उत्सर्जन ऑडिट सफलतापूर्वक पूर्ण।",
          },
          {
            title: "EPFO / ESIC कर्मचारी अंशदान",
            status: "भुगतान पूर्ण",
            dueDate: "15 जून 2025",
            notes: "सभी 18 श्रमिकों के मासिक चालान जमा किए गए।",
          },
        ],
      },
      schemes: {
        title: "सरकारी योजनाएं एवं सब्सिडी नेविगेटर",
        subtitle: "आपकी उद्यम श्रेणी, अनुभव और क्रेडिट प्रोफाइल पर आधारित केंद्र और राज्य सरकार के प्रोत्साहन।",
        filterAll: "सभी योजनाएं",
        filterGrants: "पूंजी सब्सिडी",
        filterLoans: "बिना गारंटी ऋण",
        startWizardBtn: "चैट द्वारा और योजनाएं खोजें",
        matchedCountBadge: "5 योजनाएं लागू हैं",
      },
      tools: {
        title: "MSME परिचालन एवं विकास टूल्स",
        subtitle: "इंटरैक्टिव कैलकुलेटर, डेटा एक्सपोर्ट और शॉप-फ्लोर उत्पादकता टूल्स।",
        launchBtn: "टूल शुरू करें →",
      },
      business: {
        title: "एंटरप्राइज KYC एवं प्रोफ़ाइल",
        subtitle: "सत्यापित व्यावसायिक रिकॉर्ड जिनका उपयोग सरकारी ऋण और सब्सिडी आवेदनों में होता है।",
        profileCardTitle: "पंजीकृत MSME विवरण",
        signatoryLabel: "अधिकृत हस्ताक्षरकर्ता",
        firmNameLabel: "उद्यम का नाम",
        categoryLabel: "उद्योग क्लस्टर",
        udyamStatusLabel: "उद्यम आधार स्थिति",
        gstinStatusLabel: "GSTIN स्थिति",
        financialHealthLabel: "क्रेडिट स्वास्थ्य रेटिंग",
        editProfileBtn: "प्रोफ़ाइल संपादित करें",
      },
      alerts: {
        title: "सक्रिय अलर्ट एवं वैधानिक अंतिम तिथियां",
        subtitle: "लाइसेंस समाप्ति, टैक्स रिटर्न देय तिथियों और आवश्यक अनुपालन कार्यों के रीयल-टाइम नोटिफिकेशन।",
        filterAll: "सभी अलर्ट",
        filterHigh: "उच्च प्राथमिकता",
        activeCountBadge: "सक्रिय",
        allResolvedTitle: "सभी अलर्ट हल हो चुके हैं!",
        allResolvedSub: "आपके उद्यम की अनुपालन स्थिति पूरी तरह से अद्यतित है।",
        dismissTooltip: "अलर्ट हटाएं",
      },
      settings: {
        title: "प्लेटफॉर्म सेटिंग्स एवं प्राथमिकताएं",
        subtitle: "अधिसूचना चैनल, वैधानिक अलर्ट और क्षेत्रीय भाषा प्राथमिकताओं को कॉन्फ़िगर करें।",
        langSectionTitle: "इंटरफ़ेस भाषा",
        langSectionSub: "साइट टेक्स्ट, चैटबॉट और डैशबोर्ड टूल्स के लिए अपनी पसंदीदा भाषा चुनें।",
        notifSectionTitle: "वैधानिक देय तिथि नोटिफिकेशन",
        notifSectionSub: "GST फाइलिंग और लाइसेंस समाप्ति से पहले स्वचालित रिमाइंडर प्राप्त करें।",
        whatsappLabel: "WhatsApp त्वरित अलर्ट",
        whatsappSub: "अपने पंजीकृत मोबाइल नंबर पर 3-दिन पहले रिमाइंडर प्राप्त करें",
        smsLabel: "SMS महत्वपूर्ण रिमाइंडर",
        smsSub: "SMS के माध्यम से आपातकालीन 24-घंटे पहले समाप्ति अलर्ट",
        emailLabel: "साप्ताहिक MSME सब्सिडी डाइजेस्ट",
        emailSub: "आपके क्षेत्र के लिए नए सरकारी अनुदानों की साप्ताहिक सूची",
        saveBtn: "प्राथमिकताएं सहेजें",
        saveSuccess: "प्राथमिकताएं सफलतापूर्वक सहेजी गईं!",
      },
      help: {
        title: "सहायता एवं एंटरप्राइज सपोर्ट",
        subtitle: "MSME विशेषज्ञों से मार्गदर्शन प्राप्त करें, योजना ट्यूटोरियल देखें और अक्सर पूछे जाने वाले प्रश्न पढ़ें।",
        whatsappSupportTitle: "सीधा WhatsApp सपोर्ट डेस्क",
        whatsappSupportSub: "प्रमाणित अनुपालन और योजना सलाहकार से सीधे चैट करें।",
        whatsappBtn: "WhatsApp चैट शुरू करें",
        callSupportTitle: "क्लस्टर हेल्पलाइन (टोल-फ्री)",
        callSupportSub: "सोम-शनि, सुबह 9:00 - शाम 6:00 बजे",
        callBtn: "1800-SAHAYYA पर कॉल करें",
        faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
        faqs: [
          {
            q: "सहाय्य ग्रामीण MSMEs को बैंक ऋण प्राप्त करने में कैसे मदद करता है?",
            a: "सहाय्य आपकी बिक्री, बहीखाता अनुशासन और उद्यम स्थिति को एक संरचित क्रेडिट प्रोफाइल में बदलता है जो CGTMSE और मुद्रा ऋण नियमों के अनुरूप होता है।",
          },
          {
            q: "क्या सरकारी योजनाओं की सिफारिशें 2025 के लिए अद्यतित हैं?",
            a: "हाँ, सहाय्य MSME मंत्रालय, KVIC (PMEGP), MOFPI (PMFME), और SIDBI के नवीनतम दिशानिर्देशों का अनुसरण करता है।",
          },
          {
            q: "MSME पेटेंट आवेदनों के लिए सरकारी फीस में क्या छूट है?",
            a: "संशोधित पेटेंट नियमों के तहत, पंजीकृत MSME उद्यमों और स्टार्टअप्स को भारतीय पेटेंट फाइलिंग और परीक्षा शुल्क पर 80% वैधानिक छूट मिलती है।",
          },
          {
            q: "मैं अपनी अनुपालन रिपोर्ट कैसे डाउनलोड कर सकता हूँ?",
            a: "'अनुपालन जांच' फ्लो चलाएं या 'मेरे दस्तावेज़' टैब में जाकर अपनी स्थिति का संपूर्ण टेक्स्ट सारांश डाउनलोड करें।",
          },
        ],
      },
    },
    cards: {
      safety: {
        title: "कार्यस्थल सुरक्षा स्व-ऑडिट",
        subtitle: "4-बिंदु खतरा एवं मशीनरी मूल्यांकन",
        passLabel: "उत्तीर्ण",
        actionLabel: "कार्रवाई आवश्यक",
        rerunBtn: "सुरक्षा जांच पुनः चलाएं",
        tipsLibraryBtn: "सुरक्षा टिप्स लाइब्रेरी देखें",
        upgradePrompt: "रीयल-टाइम AI कैमरा निगरानी के लिए प्रो में अपग्रेड करें",
        modalTitle: "फैक्ट्री अधिनियम एवं OSHA सुरक्षा टिप्स लाइब्रेरी",
      },
      demand: {
        title: "उत्पादन मांग पूर्वानुमान",
        subtitle: "रुझान-आधारित बैच अनुमान एवं इन्वेंट्री सिफारिशें",
        headlinePrefix: "अगले महीने, आपको लगभग आवश्यकता हो सकती है",
        growthAvgLabel: "औसत विकास दर",
        nextMonthPred: "अनुमानित इकाइयां",
        tipsTitle: "व्यावहारिक उत्पादन सिफारिशें",
        upgradePrompt: "लाइव मंडी APMC मांग पूर्वानुमान हेतु प्रो में अपग्रेड करें",
      },
      credit: {
        title: "MSME क्रेडिट पात्रता प्रोफ़ाइल",
        subtitle: "संस्थागत बैंक ऋण योग्यता मूल्यांकन",
        profileSummaryLabel: "प्रोफ़ाइल सारांश",
        factorsLabel: "क्रेडिट स्कोर कारक",
        schemesTitle: "योजनाएं जिनके लिए आप पात्र हो सकते हैं",
        matchedBadge: "उपयुक्त",
        benefitCoverageLabel: "लाभ कवरेज",
        improvementPriorityLabel: "सुधार प्राथमिकता",
        upgradePrompt: "सत्यापित बैंक DPR और पूर्व-मंजूरी हेतु प्रो में अपग्रेड करें",
      },
      patent: {
        title: "भारतीय पेटेंट फाइलिंग रोडमैप",
        subtitle: "6-चरणीय बौद्धिक संपदा मूल्यांकन (फॉर्म 1 से पेटेंट मिलने तक)",
        freeTrialBadge: "फ्री ट्रायल में शामिल",
        feeWaiverBadge: "80% MSME फीस छूट",
        roadmapTitle: "6-चरणीय विजुअल पेटेंट रोडमैप",
        stages: [
          { title: "आइडिया जांच", desc: "पुष्टि करें कि आपका आविष्कार नया है और सार्वजनिक रूप से साझा नहीं हुआ है।" },
          { title: "पूर्व कला खोज", desc: "जांचें कि क्या ऐसा कोई पेटेंट पहले से मौजूद है।" },
          { title: "अनंतिम फाइलिंग", desc: "अपनी फाइलिंग तिथि सुरक्षित करने के लिए प्रोविजनल आवेदन दाखिल करें।" },
          { title: "पूर्ण विवरण", desc: "12 महीनों के भीतर पूर्ण तकनीकी विवरण और दावे जमा करें।" },
          { title: "परीक्षा", desc: "पेटेंट कार्यालय तकनीकी समीक्षा करता है और आपत्तियां उठा सकता है।" },
          { title: "उत्तर एवं अनुदान", desc: "आपत्तियों का समाधान करें; अनुमोदन पर पेटेंट प्रमाणपत्र प्राप्त होता है।" },
        ],
        upgradePrompt: "AI पेटेंट खोज एवं कानूनी ड्राफ्टिंग हेतु प्रो में अपग्रेड करें",
      },
      quality: {
        title: "AI गुणवत्ता एवं ZED प्रमाणन जांच",
        subtitle: "3-बिंदु बैच निरीक्षण एवं शून्य दोष मूल्यांकन",
        zedGrantBadge: "80% ZED अनुदान",
        checklistTitle: "बैच निरीक्षण चेकलिस्ट",
        correctiveTitle: "सुधारात्मक गुणवत्ता कदम",
        uploadInitialPrompt: "शुरू करने के लिए अपने उत्पाद के नमूने की फोटो अपलोड करें",
        changePhotoBtn: "फोटो बदलें",
        analyzeImageBtn: "इस छवि का विश्लेषण करें और जांच शुरू करें",
        upgradePrompt: "स्वचालित कंप्यूटर विज़न दोष पहचान हेतु प्रो में अपग्रेड करें",
      },
      stock: {
        title: "MSME इन्वेंट्री एवं स्टॉक लेजर",
        subtitle: "कच्चा माल बफर, तैयार उत्पाद एवं कम स्टॉक अलर्ट ट्रैक करें",
        liveLedgerBadge: "लाइव लेजर",
        lowStockBadge: "कम स्टॉक चेतावनी",
        allHealthyBadge: "सभी स्तर संतुलित हैं",
        minThresholdLabel: "न्यूनतम बफर सीमा",
        addNewItemBtn: "नया कच्चा माल / तैयार उत्पाद जोड़ें",
        formTitle: "नया स्टॉक आइटम जोड़ें",
        itemNamePlaceholder: "आइटम का नाम (उदा. कॉपर वायर कॉइल)",
        qtyPlaceholder: "वर्तमान मात्रा",
        thresholdPlaceholder: "कम सीमा अलर्ट",
        unitPlaceholder: "इकाई (kg/pcs)",
        saveItemBtn: "स्टॉक आइटम सहेजें",
        upgradePrompt: "स्वचालित बारकोड स्कैनिंग एवं PO इंजन हेतु प्रो में अपग्रेड करें",
      },
    },
    modals: {
      login: {
        title: "सहाय्य में आपका स्वागत है",
        description: "अपने एंटरप्राइज डैशबोर्ड, अनुपालन ट्रैकर और ऋण पात्रता तक पहुंचें।",
        authSuccessTitle: "प्रमाणीकरण सफल रहा!",
        authSuccessSub: "आपको MSME डैशबोर्ड पर भेजा जा रहा है...",
        tabPhone: "मोबाइल OTP",
        tabEmail: "ईमेल / पासवर्ड",
        mobileLabel: "पंजीकृत मोबाइल नंबर",
        mobilePlaceholder: "98765 43210",
        otpLabel: "6-अंकों का OTP दर्ज करें",
        otpPlaceholder: "123456",
        resendOtp: "OTP पुनः भेजें (28s)",
        emailLabel: "ईमेल पता",
        emailPlaceholder: "name@enterprise.in",
        passwordLabel: "पासवर्ड",
        passwordPlaceholder: "••••••••",
        btnSendOtp: "सत्यापन OTP भेजें",
        btnLogin: "सहाय्य में लॉग इन करें",
        noAccount: "खाता नहीं है?",
        startFree: "निःशुल्क शुरू करें",
      },
      signup: {
        title: "हमेशा के लिए निःशुल्क शुरू करें",
        description: "12,000+ से अधिक ग्रामीण उद्यमों से जुड़ें और नियमों का ऑटोमेशन पाएं। क्रेडिट कार्ड आवश्यक नहीं।",
        successTitle: "सहाय्य में आपका स्वागत है!",
        successSub: "आपका निःशुल्क कार्यस्थान तैयार है। सरकारी योजना जांच शुरू हो रही है...",
        firmLabel: "उद्यम / फर्म का नाम",
        firmPlaceholder: "उदा. सह्याद्री एग्रो प्रोसेसिंग LLP",
        categoryLabel: "उद्यम की श्रेणी",
        categories: [
          "सूक्ष्म उद्यम (कृषि / खाद्य प्रसंस्करण)",
          "वस्त्र एवं हथकरघा क्लस्टर",
          "कारीगर / हस्तशिल्प इकाई",
          "लाइट इंजीनियरिंग / विनिर्माण",
          "ग्रामीण FPO / स्वयं सहायता समूह",
        ],
        contactLabel: "मोबाइल नंबर या ईमेल",
        contactPlaceholder: "+91 98765 43210 या email@domain.com",
        includedFreeBadge: "मुफ्त में शामिल:",
        includedFreeText: "गुणवत्ता स्कोरिंग, बुनियादी मांग पूर्वानुमान, सरकारी योजना अलर्ट और GST रिमाइंडर।",
        btnCreate: "निःशुल्क खाता बनाएं",
        haveAccount: "पहले से खाता है?",
        loginHere: "यहां लॉग इन करें",
      },
      pricing: {
        offerBadge: "⚡ विशेष MSME परिचयात्मक ऑफर",
        title: "सहाय्य प्रो अनलॉक करें",
        description: "पूर्ण अनुपालन फाइलिंग ऑटोमेशन, बैंक क्रेडिट डोजियर एक्सपोर्ट और AI मांग पूर्वानुमान।",
        successTitle: "प्रो प्लान सक्रिय हो गया!",
        successSub: "रसीद और तत्काल सेटअप निर्देश SMS व WhatsApp पर भेजे गए हैं।",
        monthlyTitle: "मासिक प्लान",
        monthlyBadge: "सर्वाधिक लोकप्रिय",
        monthlyPrice: "₹199",
        monthlyPeriod: "/ माह",
        monthlyDesc: "कभी भी रद्द करें। एकल उद्यम इकाइयों के लिए सर्वोत्तम।",
        annualTitle: "वार्षिक पास",
        annualBadge: "30% की बचत",
        annualPrice: "₹1,699",
        annualPeriod: "/ वर्ष",
        annualDesc: "समर्पित CA और क्लस्टर प्रबंधक फोन सहायता शामिल।",
        feature1: "गुणवत्ता-समर्थित 810/1000 बैंक क्रेडिट रिपोर्ट PDF",
        feature2: "PMEGP और CGTMSE योजनाओं के लिए सीधा आवेदन",
        feature3: "अगले माह की क्लस्टर मांग और इन्वेंट्री सिफारिशें",
        btnProcessing: "पेमेंट गेटवे से जुड़ रहे हैं...",
        btnProceed: "भुगतान करें (UPI / कार्ड्स)",
        securityNote: "🔒 256-बिट एन्क्रिप्टेड। Google Pay, PhonePe, Paytm, कार्ड्स और नेटबैंकिंग समर्थित।",
      },
      schemes: {
        badge: "सरकारी योजना नेविगेटर",
        title: "5 उपयुक्त सरकारी योजनाएं",
        description: "आपके उद्यम गुणवत्ता स्कोर (810/1000) और उत्पादन रिकॉर्ड पर आधारित।",
        benefitLabel: "लाभ / सब्सिडी:",
        eligibilityLabel: "पात्रता जांच:",
        deadlineLabel: "अंतिम तिथि:",
        btnApply: "सहाय्य ऑटो-फिल से आवेदन करें",
        schemesList: [
          {
            id: "pmegp",
            name: "प्रधानमंत्री रोजगार सृजन कार्यक्रम (PMEGP)",
            department: "MSME मंत्रालय, भारत सरकार",
            subsidy: "35% तक पूंजी सब्सिडी (अधिकतम ₹50 लाख)",
            eligibilityScore: "उच्च उपयुक्तता (स्कोर 810/1000)",
            status: "पात्र",
            deadline: "30 जून 2025",
          },
          {
            id: "zed",
            name: "MSME सतत (ZED) प्रमाणन अनुदान",
            department: "भारतीय गुणवत्ता परिषद (QCI)",
            subsidy: "कांस्य/चांदी/स्वर्ण स्तर हेतु 80% वित्तीय प्रतिपूर्ति",
            eligibilityScore: "सत्यापित निरीक्षण हेतु तैयार",
            status: "पात्र",
            deadline: "वर्ष भर खुला",
          },
          {
            id: "mudra",
            name: "प्रधानमंत्री मुद्रा योजना (तरुण श्रेणी)",
            department: "वित्तीय सेवा विभाग",
            subsidy: "₹10 लाख तक बिना गारंटी ऋण (रियायती ब्याज)",
            eligibilityScore: "पूर्व-स्वीकृत",
            status: "पात्र",
            deadline: "कोई अंतिम तिथि नहीं",
          },
          {
            id: "pmfme",
            name: "प्रधानमंत्री सूक्ष्म खाद्य प्रसंस्करण उद्यम (PMFME)",
            department: "खाद्य प्रसंस्करण उद्योग मंत्रालय",
            subsidy: "35% क्रेडिट-लिंक्ड अनुदान ₹10 लाख तक",
            eligibilityScore: "क्षेत्र योग्य",
            status: "आवेदन खुला",
            deadline: "15 जुलाई 2025",
          },
          {
            id: "cgtmse",
            name: "क्रेडिट गारंटी फंड ट्रस्ट (CGTMSE)",
            department: "SIDBI एवं MSME मंत्रालय",
            subsidy: "₹2 करोड़ तक बैंक ऋण पर 85% सरकारी गारंटी",
            eligibilityScore: "उच्च गुणवत्ता रेटिंग",
            status: "पात्र",
            deadline: "निरंतर चालू",
          },
        ],
      },
      proModal: {
        title: "सहाय्य प्रो में अपग्रेड करें",
        subtitle: "एंटरप्राइज-स्तरीय AI ऑटोमेशन, पूर्ण अनुपालन गारंटी और बैंक-तैयार वित्तपोषण टूल्स अनलॉक करें।",
        price: "₹199",
        billingNote: "/ माह (वार्षिक बिलिंग)",
        saveBadge: "आज 50% की बचत करें",
        subscribeBtn: "प्रो प्लान सब्सक्राइब करें",
        features: [
          "लाइव कंप्यूटर विज़न PPE और खतरा सुरक्षा वीडियो विश्लेषण",
          "स्वचालित GST एवं ZED 1-क्लिक रिटर्न फाइलिंग",
          "लाइव मंडी APMC मांग एवं पूर्वानुमान मूल्य निर्धारण मॉडल",
          "स्वचालित SIDBI बैंक DPR एवं क्रेडिट स्कोर पूर्व-मंजूरी",
          "अनुपालन अधिकारियों से प्राथमिकता WhatsApp सहायता",
        ],
      },
      alertDetail: {
        title: "वैधानिक अलर्ट विवरण",
        dueLabel: "अंतिम तिथि",
        filingPortalLabel: "फाइलिंग पोर्टल",
        resolveBtn: "हल किया गया चिह्नित करें ✓",
        resolvedConfirmation: "अलर्ट हल हो गया! अनुपालन अद्यतित है।",
        closeBtn: "बंद करें",
      },
      moreTools: {
        title: "MSME विकास एवं उपयोगिता टूल्स",
        subtitle: "डेटा एक्सपोर्ट, सरकारी योजना डेटाबेस और टीम सहयोग के लिए त्वरित टूल्स।",
        exportTitle: "एंटरप्राइज प्रोफ़ाइल डेटा एक्सपोर्ट करें",
        exportDesc: "अपने अनुपालन और व्यवसाय KYC का प्रमाणित JSON/CSV सारांश डाउनलोड करें।",
        exportedBadge: "एक्सपोर्ट पूर्ण!",
        exportAction: "एक्सपोर्ट करें →",
        langTitle: "इंटरफ़ेस भाषा एवं क्षेत्रीय बोलियां",
        langDesc: "वेबसाइट और चैटबॉट को English, हिन्दी और मराठी में बदलें।",
        configureAction: "कॉन्फ़िगर करें →",
        teamTitle: "मल्टी-यूज़र सुपरवाइज़र एक्सेस",
        teamDesc: "शॉप-फ्लोर सुपरवाइजरों और अकाउंट क्लर्कों को अनुमतियों के साथ जोड़ें।",
        gstTitle: "स्वचालित GST PMT-06 चालान मेकर",
        gstDesc: "मासिक टैक्स देनदारियों की गणना करें और GST बैंक चालान ऑटो-फिल करें।",
        comingSoonBadge: "शीघ्र आ रहा है (प्रो)",
      },
    },
  },

  mr: {
    common: {
      loading: "लोड होत आहे...",
      save: "जतन करा",
      cancel: "रद्द करा",
      close: "बंद करा",
      apply: "अर्ज करा",
      download: "डाउनलोड करा",
      verified: "प्रमाणित ✓",
      active: "सक्रिय ✓",
      pending: "प्रलंबित",
      actionRequired: "कार्रवाई आवश्यक",
      freeTrial: "मोफत ट्रायल",
      proPlan: "प्रो प्लॅन",
      upgradeToPro: "प्रो मध्ये अपग्रेड करा",
      clearChat: "चॅट साफ करा",
      allAlertsCleared: "सर्व अलर्ट पूर्ण झाले! नियम पूर्तता उत्तम आहे.",
    },
    nav: {
      home: "मुख्यपृष्ठ",
      features: "वैशिष्ट्ये",
      aboutUs: "आमच्याबद्दल",
      contact: "संपर्क",
      login: "लॉग इन",
      loginToAccount: "खात्यात लॉग इन करा",
      startFree: "मोफत सुरू करा",
      selectLanguage: "भाषा",
    },
    auth: {
      loginTitle: "सहय्य मध्ये लॉग इन करा",
      loginSubtitle: "आपल्या मोफत ट्रायल डॅशबोर्डमध्ये प्रवेश करण्यासाठी नोंदणीकृत नाव आणि तपशील टाका.",
      fullNameLabel: "पूर्ण नाव",
      fullNamePlaceholder: "उदा. प्रिया देशमुख",
      mobileOrEmailLabel: "मोबाईल क्रमांक किंवा ईमेल",
      mobileOrEmailPlaceholder: "98765 43210 किंवा name@enterprise.in",
      passwordLabel: "पासवर्ड",
      passwordPlaceholder: "••••••••",
      loginButton: "डॅशबोर्ड उघडा →",
      noAccountPrompt: "खाते नोंदणीकृत नाही का?",
      signupLink: "येथे व्यवसाय नोंदणी करा",
      freeTrialBadge: "⚡ मोफत ट्रायल ॲक्सेस",
      freeTrialPill: "क्रेडिट कार्डची गरज नाही • त्वरित मोफत प्रवेश",
      securityNote: "🔒 256-बिट बँक दर्जाची सुरक्षा. आपला डेटा पूर्णतः गोपनीय आहे.",
      validationNameRequired: "डॅशबोर्ड सुरू करण्यासाठी कृपया आपले पूर्ण नाव टाका.",
      validationContactRequired: "कृपया वैध मोबाईल क्रमांक किंवा ईमेल पत्ता टाका.",

      signupTitle: "व्यवसाय नोंदणी",
      signupSubtitle: "12,000+ पेक्षा जास्त ग्रामीण उद्योगांमध्ये सामील व्हा आणि सरकारी अनुदान व कर्ज रेटिंग मिळवा.",
      firmNameLabel: "उद्योगाचे / फर्मचे नाव",
      firmNamePlaceholder: "उदा. सह्याद्री ॲग्रो प्रोसेसिंग LLP",
      categoryLabel: "उद्योगाचा प्रकार",
      categories: [
        "सूक्ष्म उद्योग (कृषी / अन्न प्रक्रिया)",
        "कापड व हातमाग क्लस्टर",
        "कारीगर / हस्तकला युनिट",
        "लाइट इंजिनिअरिंग / मॅन्युफॅक्चरिंग",
        "ग्रामीण FPO / महिला बचत गट फेडरेशन",
      ],
      createAccountButton: "नोंदणी करा आणि मोफत सुरू करा →",
      haveAccountPrompt: "आधीच नोंदणी केली आहे का?",
      loginLink: "येथे लॉग इन करा",
      benefitsList: [
        "त्वरित कर्ज पात्रता स्कोअर आणि SIDBI/Mudra पूर्व-मंजुरी",
        "ZED प्रमाणन आणि पेटंटसाठी 80% सरकारी सबसिडी मदत",
        "GST आणि राज्य फॅक्टरी परवाना नूतनीकरणाचे ऑटोमॅटिक रिमाइंडर्स",
      ],
    },
    hero: {
      badge: "ग्रामीण उद्योगांचे सक्षमीकरण",
      titleLine1: "डिजिटल वाढ आणि",
      titleLine2: "नियम पूर्तता मंच",
      titleFor: "ग्रामीण",
      titleHighlight: "MSME उद्योगांसाठी",
      subtitle:
        "ग्रामीण उद्योग आणि क्लस्टर्सची प्रगती, सरकारी नियमांचे सुलभ पालन, वित्त व योजनांचा लाभ आणि उत्पादन गुणवत्ता सुधारण्यासाठी सर्वसमावेशक डिजिटल व्यासपीठ.",
      startFree: "मोफत सुरू करा",
      startFreeSub: "कायम मोफत • क्रेडिट कार्डची गरज नाही",
      tryPaid: "₹199 मध्ये प्रो प्लॅन घ्या",
      tryPaidSub: "प्रीमियम सुविधा अनलॉक करा",
    },
    phoneMockup: {
      dashboard: "डॅशबोर्ड",
      welcomeBack: "नमस्कार, आपले स्वागत आहे!",
      notifications: "सूचना",
      growthScore: "एकूण वाढीचा स्कोअर",
      good: "उत्कृष्ट",
      growthVsLastMonth: "↑ मागील महिन्यापेक्षा 12% जास्त",
      complianceScore: "नियम पूर्तता स्कोअर",
      compliant: "पूर्ण पूर्तता",
      complianceVsLastMonth: "↑ मागील महिन्यापेक्षा 8% जास्त",
      activeSchemes: "सक्रिय योजना",
      applicable: "पात्र योजना",
      viewAllSchemes: "सर्व योजना पहा →",
      demandForecastTitle: "मागणी अंदाज (पुढील महिना)",
      localMarket: "(स्थानिक बाजारपेठ)",
      tabs: {
        home: "मुख्य",
        monitor: "मॉनिटर",
        forecast: "अंदाज",
        credit: "कर्ज",
        more: "अधिक",
      },
      monitor: {
        telemetryTitle: "क्लस्टर उत्पादन टेलिमेट्री",
        efficiency: "कार्यक्षमता (OEE)",
        passRate: "उत्तीर्ण दर",
        qualityAudits: "गुणवत्ता तपासणी",
        zedBronze: "ZED कांस्य तपासणी",
        passed: "उत्तीर्ण",
        isoReadiness: "ISO 9001 तयारी",
        inReview: "पुनरावलोकन चालू",
      },
      forecast: {
        insightBadge: "AI मागणी अंदाज",
        insightHeadline: "प्रादेशिक कृषी-पॅकेजिंगमध्ये 22% वाढीचा अंदाज",
        insightTip: "शिफारस: कच्च्या मालाचा साठा 10 दिवस आधीच ठेवा.",
        rawMaterialIndex: "कच्चा माल निर्देशांक",
        cottonJute: "कापूस / ताग",
        favorable: "↓ 3.2% (अनुकूल)",
      },
      credit: {
        title: "गुणवत्ता-आधारित कर्ज पात्रता",
        preApproved: "तारणाशिवाय पूर्व-मंजूर",
        bankEligibility: "7.85% दराने SIDBI व SBI MSME कर्जासाठी पात्र.",
      },
      more: {
        udyamReg: "उद्यम नोंदणी",
        verified: "प्रमाणित ✓",
        gstinAuto: "GSTIN ऑटोमेशन",
        active: "सक्रिय ✓",
        clusterSupport: "क्लस्टर व्यवस्थापक मदत",
        callSupport: "कॉल सपोर्ट",
      },
      notificationsList: [
        {
          title: "उद्यम नूतनीकरण बाकी",
          description: "15 जून 2025 पूर्वी वार्षिक पडताळणी पूर्ण करा.",
          time: "2 तास आधी",
        },
        {
          title: "PMEGP सबसिडी मॅच",
          description: "35% नवीन भांडवली सबसिडी अनलॉक झाली.",
          time: "1 दिवस आधी",
        },
        {
          title: "GSTR-1 दाखल केले",
          description: "मे महिन्याचा रिटर्न यशस्वीरीत्या सबमिट झाला.",
          time: "3 दिवस आधी",
        },
      ],
    },
    creditCard: {
      title: "कर्ज पात्रता",
      subtitle: "(गुणवत्तेवर आधारित)",
      legendRevenue: "महसूल",
      legendQuality: "गुणवत्ता",
      legendProduction: "उत्पादन",
      scoreLabel: "पात्रता स्कोअर",
      highEligibility: "उच्च पात्रता",
      scoreExplanation: "गुणवत्ता नोंदी आणि उत्पादन इतिहासावर आधारित",
    },
    demandCard: {
      title: "मागणी अंदाज",
      statLabel: "पुढील महिन्याची मागणी",
      growthPercentage: "↑ 15%",
      localMarket: "(स्थानिक बाजारपेठ)",
      instruction: "त्यानुसार उत्पादन नियोजन समायोजित करा.",
    },
    dashboard: {
      header: {
        searchPlaceholder: "नियम, योजना, टूल्स शोधा किंवा सहय्य AI ला विचारा...",
        trialActiveBadge: "मोफत ट्रायल सक्रिय",
        upgradeButton: "प्रो मध्ये अपग्रेड करा",
        notificationsTitle: "सूचना आणि अलर्ट्स",
        notificationsEmpty: "कोणतीही नवीन सूचना नाही",
        profileSettings: "व्यवसाय प्रोफाईल आणि सेटिंग्स",
        logout: "लॉग आउट करा",
      },
      sidebar: {
        tabs: {
          chat: "चॅट",
          documents: "माझी कागदपत्रे",
          compliance: "नियम पूर्तता",
          schemes: "योजना आणि वित्त",
          tools: "टूल्स",
          business: "माझा व्यवसाय",
          alerts: "अलर्ट्स",
          settings: "सेटिंग्ज",
          help: "मदत आणि सपोर्ट",
        },
        upgradeCard: {
          title: "प्रो मध्ये अपग्रेड करा",
          description: "AI कॅमेरा सुरक्षा मॉनिटरिंग, 1-क्लिक टॅक्स फायलिंग आणि बँक कर्ज पूर्व-मंजुरी मिळवा.",
          button: "प्लॅन अपग्रेड करा",
        },
      },
      aside: {
        alertsTitle: "अलर्ट्स",
        viewAll: "सर्व पहा",
        proCard: {
          badge: "प्रो प्लॅनचे फायदे",
          title: "प्रो सह वेगाने प्रगती करा",
          description: "बँक-तयार DPR निर्मिती, प्राधान्य WhatsApp सपोर्ट आणि थेट नोडल बँक अर्ज रूटिंग.",
          button: "₹199 मध्ये अपग्रेड करा",
        },
        promoBanner: {
          badge: "सरकारी सबसिडी अलर्ट",
          title: "PMEGP 35% भांडवली अनुदान",
          subtitle: "ग्रामीण उत्पादन युनिट्ससाठी अर्ज सुरू आहेत. ₹50 लाखांपर्यंत प्रोजेक्ट फंड मिळवा.",
          button: "पात्रता तपासा →",
        },
      },
      featureGrid: {
        compliance: {
          title: "नियम पूर्तता तपासा",
          desc: "GST, उद्यम, फॅक्टरी परवाना आणि वैधानिक ट्रॅकिंग",
        },
        schemes: {
          title: "सरकारी योजना शोधा",
          desc: "PMEGP, मुद्रा, PMFME अनुदान आणि सबसिडी",
        },
        safety: {
          title: "AI सुरक्षा ऑडिट",
          desc: "कारखाना कायदा आणि कार्यस्थळ सुरक्षा मूल्यांकन",
        },
        stock: {
          title: "स्टॉक व्यवस्थापन",
          desc: "इन्व्हेंटरी, कच्चा माल बफर आणि कमी साठा अलर्ट",
        },
        quality: {
          title: "AI गुणवत्ता तपासणी",
          desc: "उत्पादन फोटो तपासणी, दोष ऑडिट आणि ZED रेटिंग",
        },
        patent: {
          title: "IP / पेटंट सपोर्ट",
          desc: "80% MSME फी सवलतीसह आपले संशोधन सुरक्षित करा",
        },
        credits: {
          title: "कर्ज पात्रता (क्रेडिट)",
          desc: "CGTMSE आणि बँक कर्ज पूर्व-पात्रता स्कोअरिंग",
        },
        tools: {
          title: "इतर उपयुक्त टूल्स",
          desc: "डेटा एक्सपोर्ट, भाषा बदल आणि उपयुक्त कॅल्क्युलेटर्स",
        },
      },
      mainChat: {
        welcomeGreeting: "नमस्कार! मी आहे",
        welcomeSub: "नियम पूर्तता, सरकारी योजना, वित्त, परवाने किंवा व्यवसाय वाढीबद्दल काहीही विचारा. मी मदतीसाठी तयार आहे.",
        chipDemand: "📈 आपल्या श्रेणीत मागणी वाढत आहे... अंदाज तपासा",
        chipPatent: "💡 भारतीय पेटंटवर 80% MSME फी सवलत मिळवा",
        inputPlaceholder: "नियम, योजना, सुरक्षा किंवा वित्ताबद्दल काहीही विचारा...",
        quickPromptsTitle: "त्वरित सूचना",
        quickPrompts: [
          "माझी GST अंतिम मुदत आणि फॅक्टरी नियम तपासा",
          "वर्कशॉपचे वीज बिल कसे कमी करावे?",
          "मी PMEGP आणि मुद्रा कर्ज एकत्र घेऊ शकतो का?",
          "मेकॅनिकल प्रेससाठी कोणते सुरक्षा गार्ड आवश्यक आहेत?",
        ],
        thinkingText: "सहय्य AI विचार करत आहे...",
        conversationSession: "सक्रिय संवाद सत्र",
        clearChatBtn: "चॅट साफ करा",
      },
    },
    views: {
      documents: {
        title: "एंटरप्राइज डॉक्युमेंट व्हॉल्ट",
        subtitle: "आपले GST रिटर्न्स, उद्यम प्रमाणपत्रे आणि योजनांचे अर्ज सुरक्षितपणे साठवा आणि डाउनलोड करा.",
        uploadBtn: "नवीन दस्तऐवज अपलोड करा",
        categories: ["सर्व कागदपत्रे", "कर आणि GST", "परवाने", "योजना आणि अनुदान", "गुणवत्ता आणि ZED"],
        docNameHeader: "दस्तऐवजाचे नाव",
        categoryHeader: "श्रेणी",
        statusHeader: "पडताळणी",
        dateHeader: "शेवटचे अपडेट",
        actionHeader: "कृती",
      },
      compliance: {
        title: "वैधानिक आणि कर नियम पूर्तता",
        subtitle: "GST, फॅक्टरी परवाने, प्रदूषण मंडळ संमती (CPCB) आणि EPFO चलनांची स्थिती ट्रॅक करा.",
        healthScoreTitle: "एकूण नियम पूर्तता स्थिती",
        standingLabel: "उत्कृष्ट स्थिती (92%)",
        startAuditBtn: "पूर्ण नियम तपासणी सुरू करा",
        statutoryItems: [
          {
            title: "GSTR-1 आणि GSTR-3B मासिक रिटर्न्स",
            status: "नियम पूर्ण",
            dueDate: "11 जून 2025",
            notes: "एप्रिल रिटर्न दाखल. मे महिन्याची जुळवणी सुरू आहे.",
          },
          {
            title: "राज्य फॅक्टरी संचालनालय परवाना",
            status: "कार्रवाई आवश्यक",
            dueDate: "22 जून 2025",
            notes: "परवाना नूतनीकरण फॉर्म 22 दिवसांत भरणे आवश्यक आहे.",
          },
          {
            title: "प्रदूषण नियंत्रण मंडळ संमती (CTO)",
            status: "वैध",
            dueDate: "31 मार्च 2026",
            notes: "वार्षिक तपासणी यशस्वीरीत्या पूर्ण झाली.",
          },
          {
            title: "EPFO / ESIC कामगार योगदान",
            status: "पूर्ण भरणा",
            dueDate: "15 जून 2025",
            notes: "सर्व 18 कामगारांचे मासिक चलन भरले आहे.",
          },
        ],
      },
      schemes: {
        title: "सरकारी योजना आणि सबसिडी मार्गदर्शक",
        subtitle: "आपल्या उद्योग श्रेणी, अनुभव आणि क्रेडिट प्रोफाइलवर आधारित केंद्र व राज्य सरकारचे लाभ.",
        filterAll: "सर्व योजना",
        filterGrants: "भांडवली सबसिडी",
        filterLoans: "विनातारण कर्जे",
        startWizardBtn: "चॅटद्वारे अधिक योजना शोधा",
        matchedCountBadge: "5 योजना लागू आहेत",
      },
      tools: {
        title: "MSME कामकाज आणि वाढीचे टूल्स",
        subtitle: "इंटरॅक्टिव्ह कॅल्क्युलेटर्स, डेटा एक्सपोर्ट आणि उत्पादकता वाढवणारी टूल्स.",
        launchBtn: "टूल उघडा →",
      },
      business: {
        title: "एंटरप्राइज KYC आणि प्रोफाईल",
        subtitle: "सरकारी कर्ज आणि अनुदान अर्जांसाठी वापरल्या जाणाऱ्या प्रमाणित नोंदी.",
        profileCardTitle: "नोंदणीकृत MSME तपशील",
        signatoryLabel: "अधिकृत स्वाक्षरीकर्ता",
        firmNameLabel: "उद्योगाचे नाव",
        categoryLabel: "उद्योग क्लस्टर",
        udyamStatusLabel: "उद्यम आधार स्थिती",
        gstinStatusLabel: "GSTIN स्थिती",
        financialHealthLabel: "क्रेडिट आरोग्य रेटिंग",
        editProfileBtn: "प्रोफाईल संपादित करा",
      },
      alerts: {
        title: "सक्रिय अलर्ट्स आणि वैधानिक अंतिम मुदती",
        subtitle: "परवाना समाप्ती, टॅक्स रिटर्न मुदती आणि आवश्यक कायदेशीर कामांच्या रीयल-टाइम सूचना.",
        filterAll: "सर्व अलर्ट्स",
        filterHigh: "उच्च प्राधान्य",
        activeCountBadge: "सक्रिय",
        allResolvedTitle: "सर्व अलर्ट्स पूर्ण झाले आहेत!",
        allResolvedSub: "आपल्या उद्योगाची नियम पूर्तता अद्ययावत आहे.",
        dismissTooltip: "अलर्ट काढून टाका",
      },
      settings: {
        title: "प्लॅटफॉर्म सेटिंग्स आणि पसंती",
        subtitle: "सूचना माध्यमे, वैधानिक अलर्ट्स आणि प्रादेशिक भाषा निवडा.",
        langSectionTitle: "इंटरफेस भाषा",
        langSectionSub: "वेबसाईट, चॅटबॉट आणि टूल्ससाठी आपली पसंतीची भाषा निवडा.",
        notifSectionTitle: "वैधानिक मुदत सूचना",
        notifSectionSub: "GST भरणे आणि परवाना समाप्तीपूर्वी ऑटोमॅटिक रिमाइंडर्स मिळवा.",
        whatsappLabel: "WhatsApp त्वरित अलर्ट्स",
        whatsappSub: "नोंदणीकृत मोबाईल क्रमांकावर 3 दिवस आधी रिमाइंडर्स मिळवा",
        smsLabel: "SMS महत्त्वाचे रिमाइंडर्स",
        smsSub: "SMS द्वारे आणीबाणीच्या 24 तास आधीचे मुदत अलर्ट्स",
        emailLabel: "साप्ताहिक MSME सबसिडी डायजेस्ट",
        emailSub: "आपल्या क्षेत्रासाठी नवीन सरकारी योजनांची साप्ताहिक यादी",
        saveBtn: "पसंती जतन करा",
        saveSuccess: "पसंती यशस्वीरीत्या जतन झाली!",
      },
      help: {
        title: "मदत आणि एंटरप्राइज सपोर्ट",
        subtitle: "MSME तज्ज्ञांकडून मार्गदर्शन मिळवा, योजनांचे ट्युटोरियल्स पहा आणि वारंवार विचारले जाणारे प्रश्न वाचा.",
        whatsappSupportTitle: "थेट WhatsApp सपोर्ट डेस्क",
        whatsappSupportSub: "प्रमाणित सल्लागारांशी थेट चॅट करा.",
        whatsappBtn: "WhatsApp चॅट सुरू करा",
        callSupportTitle: "क्लस्टर हेल्पलाइन (टोल-फ्री)",
        callSupportSub: "सोम-शनि, सकाळी 9:00 - संध्याकाळी 6:00",
        callBtn: "1800-SAHAYYA वर कॉल करा",
        faqTitle: "वारंवार विचारले जाणारे प्रश्न (FAQ)",
        faqs: [
          {
            q: "सहय्य ग्रामीण उद्योगांना बँक कर्ज मिळवून देण्यात कशी मदत करते?",
            a: "सहय्य आपल्या विक्री नोंदी, हिशोबाची शिस्त आणि उद्यम स्थितीचा वापर करून CGTMSE आणि मुद्रा नियमांनुसार बँक-तयार क्रेडिट प्रोफाइल तयार करते.",
          },
          {
            q: "सरकारी योजनांच्या शिफारसी 2025 साठी अद्ययावत आहेत का?",
            a: "होय, सहय्य MSME मंत्रालय, KVIC (PMEGP), MOFPI (PMFME) आणि SIDBI च्या ताज्या नियमांचे पालन करते.",
          },
          {
            q: "MSME पेटंट अर्जांसाठी सरकारी फी मध्ये काय सवलत आहे?",
            a: "सुधारित पेटंट नियमांनुसार, नोंदणीकृत MSME उद्योगांना आणि स्टार्टअप्सना भारतीय पेटंट फाइलिंग आणि तपासणी फी वर 80% वैधानिक सवलत मिळते.",
          },
          {
            q: "मी माझा नियम पूर्तता अहवाल कसा डाउनलोड करू शकतो?",
            a: "'नियम पूर्तता तपासा' फ्लो चालवा किंवा 'माझी कागदपत्रे' विभागात जाऊन संपूर्ण अहवाल डाउनलोड करा.",
          },
        ],
      },
    },
    cards: {
      safety: {
        title: "कार्यस्थळ सुरक्षा स्व-ऑडिट",
        subtitle: "4-मुद्यांचे धोका आणि मशिनरी मूल्यांकन",
        passLabel: "उत्तीर्ण",
        actionLabel: "कार्रवाई आवश्यक",
        rerunBtn: "सुरक्षा तपासणी पुन्हा करा",
        tipsLibraryBtn: "सुरक्षा टिप्स लायब्ररी पहा",
        upgradePrompt: "रीयल-टाइम AI कॅमेरा मॉनिटरिंगसाठी प्रो मध्ये अपग्रेड करा",
        modalTitle: "फॅक्टरी कायदा आणि OSHA सुरक्षा टिप्स लायब्ररी",
      },
      demand: {
        title: "उत्पादन मागणी अंदाज",
        subtitle: "ट्रेंडवर आधारित उत्पादन अंदाज आणि साठा शिफारसी",
        headlinePrefix: "पुढील महिन्यात आपल्याला अंदाजे आवश्यकता भासेल",
        growthAvgLabel: "सरासरी वाढ दर",
        nextMonthPred: "अंदाजित युनिट्स",
        tipsTitle: "उत्पादन सुधारणा शिफारसी",
        upgradePrompt: "थेट कृषी उत्पन्न बाजार समिती (APMC) मागणी अंदाजासाठी प्रो घ्या",
      },
      credit: {
        title: "MSME कर्ज पात्रता (क्रेडिट) प्रोफाइल",
        subtitle: "संस्थात्मक बँक कर्ज पात्रता मूल्यांकन",
        profileSummaryLabel: "प्रोफाइल सारांश",
        factorsLabel: "क्रेडिट स्कोअर घटक",
        schemesTitle: "आपण पात्र असणाऱ्या सरकारी योजना",
        matchedBadge: "पात्र",
        benefitCoverageLabel: "फायदा व्याप्ती",
        improvementPriorityLabel: "सुधारणा प्राधान्य",
        upgradePrompt: "प्रमाणित बँक DPR आणि पूर्व-मंजुरीसाठी प्रो मध्ये अपग्रेड करा",
      },
      patent: {
        title: "भारतीय पेटंट नोंदणी रोडमॅप",
        subtitle: "6-टप्प्यांचे बौद्धिक संपदा मूल्यांकन (फॉर्म 1 ते पेटंट मिळेपर्यंत)",
        freeTrialBadge: "मोफत ट्रायलमध्ये समाविष्ट",
        feeWaiverBadge: "80% MSME फी सवलत",
        roadmapTitle: "6-टप्प्यांचा व्हिज्युअल पेटंट रोडमॅप",
        stages: [
          { title: "आयडिया तपासणी", desc: "आपला शोध नवीन आहे आणि सार्वजनिक केलेला नाही याची खात्री करा." },
          { title: "पूर्व शोध", desc: "असा शोध आधीच अस्तित्वात आहे का ते तपासा." },
          { title: "तात्पुरता अर्ज", desc: "तारीख आरक्षित करण्यासाठी प्रोव्हिजनल अर्ज दाखल करा." },
          { title: "पूर्ण तपशील", desc: "12 महिन्यांत पूर्ण तांत्रिक तपशील आणि दावे सादर करा." },
          { title: "तपासणी", desc: "पेटंट कार्यालय तांत्रिक तपासणी करते आणि आक्षेप घेऊ शकते." },
          { title: "उत्तर आणि मंजुरी", desc: "आक्षेपांचे निरसन करा; मंजुरीनंतर पेटंट प्रमाणपत्र मिळते." },
        ],
        upgradePrompt: "AI पेटंट शोध आणि वकिलांच्या मसुद्यासाठी प्रो मध्ये अपग्रेड करा",
      },
      quality: {
        title: "AI गुणवत्ता आणि ZED प्रमाणन तपासणी",
        subtitle: "3-मुद्यांची उत्पादन तपासणी आणि शून्य दोष मूल्यांकन",
        zedGrantBadge: "80% ZED अनुदान",
        checklistTitle: "उत्पादन तपासणी यादी",
        correctiveTitle: "गुणवत्ता सुधारणा पावले",
        uploadInitialPrompt: "सुरू करण्यासाठी आपल्या उत्पादनाचा फोटो अपलोड करा",
        changePhotoBtn: "फोटो बदला",
        analyzeImageBtn: "या फोटोचे विश्लेषण करा आणि तपासणी सुरू करा",
        upgradePrompt: "स्वयंचलित संगणक दृष्टी दोष तपासणीसाठी प्रो मध्ये अपग्रेड करा",
      },
      stock: {
        title: "MSME इन्व्हेंटरी आणि स्टॉक लेजर",
        subtitle: "कच्चा माल बफर, तयार वस्तू आणि कमी साठा अलर्ट ट्रॅक करा",
        liveLedgerBadge: "लाइव्ह लेजर",
        lowStockBadge: "कमी साठा इशारा",
        allHealthyBadge: "सर्व साठा संतुलित आहे",
        minThresholdLabel: "किमान बफर मर्यादा",
        addNewItemBtn: "नवीन कच्चा माल / तयार वस्तू जोडा",
        formTitle: "नवीन स्टॉक घटक जोडा",
        itemNamePlaceholder: "घटकाचे नाव (उदा. कॉपर वायर कॉइल)",
        qtyPlaceholder: "सध्याचे प्रमाण",
        thresholdPlaceholder: "कमी मर्यादा अलर्ट",
        unitPlaceholder: "एकक (kg/pcs)",
        saveItemBtn: "स्टॉक घटक जतन करा",
        upgradePrompt: "स्वयंचलित बारकोड स्कॅनिंग आणि खरेदी ऑर्डरसाठी प्रो घ्या",
      },
    },
    modals: {
      login: {
        title: "सहय्य मध्ये आपले स्वागत आहे",
        description: "आपल्या एंटरप्राइझ डॅशबोर्ड, नियम पूर्तता ट्रॅकर आणि कर्ज पात्रतेमध्ये प्रवेश करा.",
        authSuccessTitle: "प्रमाणीकरण यशस्वी झाले!",
        authSuccessSub: "आपल्याला MSME डॅशबोर्डवर नेले जात आहे...",
        tabPhone: "मोबाईल OTP",
        tabEmail: "ईमेल / पासवर्ड",
        mobileLabel: "नोंदणीकृत मोबाईल क्रमांक",
        mobilePlaceholder: "98765 43210",
        otpLabel: "6-अंकी OTP टाका",
        otpPlaceholder: "123456",
        resendOtp: "OTP पुन्हा पाठवा (28s)",
        emailLabel: "ईमेल पत्ता",
        emailPlaceholder: "name@enterprise.in",
        passwordLabel: "पासवर्ड",
        passwordPlaceholder: "••••••••",
        btnSendOtp: "पडताळणी OTP पाठवा",
        btnLogin: "सहय्य मध्ये लॉग इन करा",
        noAccount: "खाते नाही का?",
        startFree: "मोफत सुरू करा",
      },
      signup: {
        title: "कायम मोफत सुरू करा",
        description: "12,000+ पेक्षा जास्त ग्रामीण उद्योगांमध्ये सामील व्हा आणि नियम पूर्तता ऑटोमेट करा. क्रेडिट कार्ड लागत नाही.",
        successTitle: "सहय्य मध्ये आपले स्वागत आहे!",
        successSub: "आपले मोफत वर्कस्पेस तयार आहे. योजना तपासणी सुरू होत आहे...",
        firmLabel: "उद्योगाचे / फर्मचे नाव",
        firmPlaceholder: "उदा. सह्याद्री ॲग्रो प्रोसेसिंग LLP",
        categoryLabel: "उद्योगाचा प्रकार",
        categories: [
          "सूक्ष्म उद्योग (कृषी / अन्न प्रक्रिया)",
          "कापड व हातमाग क्लस्टर",
          "कारीगर / हस्तकला युनिट",
          "लाइट इंजिनिअरिंग / मॅन्युफॅक्चरिंग",
          "ग्रामीण FPO / महिला बचत गट फेडरेशन",
        ],
        contactLabel: "मोबाईल क्रमांक किंवा ईमेल",
        contactPlaceholder: "+91 98765 43210 किंवा email@domain.com",
        includedFreeBadge: "मोफत समाविष्ट:",
        includedFreeText: "गुणवत्ता स्कोअरिंग, प्राथमिक मागणी अंदाज, सरकारी योजना सूचना आणि GST रिमाइंडर्स.",
        btnCreate: "मोफत खाते तयार करा",
        haveAccount: "आधीच खाते आहे का?",
        loginHere: "येथे लॉग इन करा",
      },
      pricing: {
        offerBadge: "⚡ विशेष MSME ऑफर",
        title: "सहय्य प्रो अनलॉक करा",
        description: "संपूर्ण नियम पूर्तता ऑटोमेशन, बँक क्रेडिट डॉझियर एक्सपोर्ट आणि AI मागणी अंदाज.",
        successTitle: "प्रो प्लॅन सक्रिय झाला!",
        successSub: "पावती आणि सेटअप सूचना SMS व WhatsApp द्वारे पाठवल्या आहेत.",
        monthlyTitle: "मासिक प्लॅन",
        monthlyBadge: "सर्वाधिक पसंती",
        monthlyPrice: "₹199",
        monthlyPeriod: "/ महिना",
        monthlyDesc: "कधीही रद्द करा. स्वतंत्र उद्योगांसाठी सर्वोत्तम.",
        annualTitle: "वार्षिक पास",
        annualBadge: "30% बचत",
        annualPrice: "₹1,699",
        annualPeriod: "/ वर्ष",
        annualDesc: "विशेष CA आणि क्लस्टर व्यवस्थापक फोन सपोर्ट समाविष्ट.",
        feature1: "गुणवत्ता-समर्थित 810/1000 बँक क्रेडिट रिपोर्ट PDF",
        feature2: "PMEGP आणि CGTMSE योजनांसाठी थेट अर्ज",
        feature3: "पुढील महिन्याची क्लस्टर मागणी आणि इन्व्हेंटरी शिफारसी",
        btnProcessing: "पेमेंट गेटवेशी जोडत आहोत...",
        btnProceed: "पेमेंट करा (UPI / कार्ड्स)",
        securityNote: "🔒 256-बिट एन्क्रिप्टेड. Google Pay, PhonePe, Paytm, कार्ड्स आणि नेटबँकिंग समर्थित.",
      },
      schemes: {
        badge: "सरकारी योजना मार्गदर्शक",
        title: "5 योग्य सरकारी योजना",
        description: "आपल्या उद्योग गुणवत्ता स्कोअर (810/1000) आणि उत्पादन नोंदींवर आधारित.",
        benefitLabel: "फायदा / सबसिडी:",
        eligibilityLabel: "पात्रता तपासणी:",
        deadlineLabel: "शेवटची तारीख:",
        btnApply: "सहय्य ऑटो-फिलसह अर्ज करा",
        schemesList: [
          {
            id: "pmegp",
            name: "पंतप्रधान रोजगार निर्मिती कार्यक्रम (PMEGP)",
            department: "MSME मंत्रालय, भारत सरकार",
            subsidy: "35% पर्यंत भांडवली सबसिडी (जास्तीत जास्त ₹50 लाख)",
            eligibilityScore: "उच्च पात्रता (स्कोअर 810/1000)",
            status: "पात्र",
            deadline: "30 जून 2025",
          },
          {
            id: "zed",
            name: "MSME शाश्वत (ZED) प्रमाणन अनुदान",
            department: "भारतीय गुणवत्ता परिषद (QCI)",
            subsidy: "कांस्य/रजत/सुवर्ण स्तरासाठी 80% आर्थिक परतावा",
            eligibilityScore: "तपासणीसाठी तयार",
            status: "पात्र",
            deadline: "वर्षभर चालू",
          },
          {
            id: "mudra",
            name: "प्रधानमंत्री मुद्रा योजना (तरुण श्रेणी)",
            department: "वित्तीय सेवा विभाग",
            subsidy: "₹10 लाखांपर्यंत विनातारण कर्ज (सवलतीचे व्याज)",
            eligibilityScore: "पूर्व-मंजूर",
            status: "पात्र",
            deadline: "कोणतीही मुदत नाही",
          },
          {
            id: "pmfme",
            name: "प्रधानमंत्री सूक्ष्म अन्न प्रक्रिया उद्योग (PMFME)",
            department: "अन्न प्रक्रिया उद्योग मंत्रालय",
            subsidy: "35% क्रेडिट-लिंक्ड अनुदान ₹10 लाखांपर्यंत",
            eligibilityScore: "पात्र क्षेत्र",
            status: "अर्ज सुरू आहेत",
            deadline: "15 जुलै 2025",
          },
          {
            id: "cgtmse",
            name: "क्रेडिट गॅरंटी फंड ट्रस्ट (CGTMSE)",
            department: "SIDBI आणि MSME मंत्रालय",
            subsidy: "₹2 कोटींपर्यंत बँक कर्जावर 85% सरकारी हमी",
            eligibilityScore: "उच्च गुणवत्ता रेटिंग",
            status: "पात्र",
            deadline: "नेहमी उपलब्ध",
          },
        ],
      },
      proModal: {
        title: "सहय्य प्रो मध्ये अपग्रेड करा",
        subtitle: "एंटरप्राइज दर्जाचे AI ऑटोमेशन, संपूर्ण नियम पूर्तता हमी आणि बँक-तयार वित्तपुरवठा टूल्स मिळवा.",
        price: "₹199",
        billingNote: "/ महिना (वार्षिक बिलिंग)",
        saveBadge: "आज 50% बचत करा",
        subscribeBtn: "प्रो प्लॅन सुरू करा",
        features: [
          "थेट संगणक दृष्टी PPE आणि कार्यस्थळ सुरक्षा व्हिडिओ विश्लेषण",
          "स्वयंचलित GST आणि ZED 1-क्लिक रिटर्न फायलिंग",
          "थेट कृषी उत्पन्न बाजार समिती (APMC) मागणी आणि मूल्य अंदाज मॉडेल",
          "स्वयंचलित SIDBI बँक DPR आणि क्रेडिट स्कोअर पूर्व-मंजुरी",
          "नियम अधिकाऱ्यांकडून प्राधान्य WhatsApp सपोर्ट",
        ],
      },
      alertDetail: {
        title: "वैधानिक अलर्ट तपशील",
        dueLabel: "अंतिम मुदत",
        filingPortalLabel: "फायलिंग पोर्टल",
        resolveBtn: "पूर्ण झाले म्हणून चिन्हांकित करा ✓",
        resolvedConfirmation: "अलर्ट पूर्ण झाला! नियम स्थिती अद्ययावत झाली.",
        closeBtn: "बंद करा",
      },
      moreTools: {
        title: "MSME वाढ आणि उपयुक्त टूल्स",
        subtitle: "डेटा एक्सपोर्ट, सरकारी योजना डेटाबेस आणि टीम सहकार्यासाठी उपयुक्त टूल्स.",
        exportTitle: "एंटरप्राइज प्रोफाइल डेटा एक्सपोर्ट करा",
        exportDesc: "आपल्या नियम आणि व्यवसाय KYC चा प्रमाणित JSON/CSV सारांश डाउनलोड करा.",
        exportedBadge: "एक्सपोर्ट पूर्ण!",
        exportAction: "एक्सपोर्ट करा →",
        langTitle: "इंटरफेस भाषा आणि प्रादेशिक बोल्या",
        langDesc: "वेबसाइट आणि चॅटबॉट English, हिन्दी किंवा मराठीमध्ये बदला.",
        configureAction: "निवडा →",
        teamTitle: "अनेक सुपरवायझर प्रवेश",
        teamDesc: "शॉप-फ्लोर सुपरवायझर आणि अकाउंट क्लर्कांना परवानग्यांसह जोडा.",
        gstTitle: "स्वयंचलित GST PMT-06 चलन मेकर",
        gstDesc: "मासिक कर दायित्वाची गणना करा आणि GST बँक चलन ऑटो-फिल करा.",
        comingSoonBadge: "लवकरच येत आहे (प्रो)",
      },
    },
  },
};
