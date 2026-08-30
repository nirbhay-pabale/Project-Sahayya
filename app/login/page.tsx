"use client";

import React, { useState, Suspense, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Building2,
  ShieldCheck,
  Phone,
  Mail,
  CheckCircle2,
  Zap,
  CreditCard,
  QrCode,
  Smartphone,
  Landmark,
  Wallet,
  Receipt,
  Sparkles,
  ChevronRight,
  RefreshCw,
  Clock,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type PlanType = "free" | "premium";
type PaymentMethod = "upi" | "card" | "netbanking" | "wallet";
type UpiApp = "gpay" | "phonepe" | "paytm" | "bhim";

function LoginContent() {
  const router = useRouter();
  const { login } = useAuth();
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const initialPlanParam = searchParams?.get("plan");

  // Plan selection: 'free' or 'premium' (₹199)
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(
    initialPlanParam === "premium" || initialPlanParam === "199" ? "premium" : "free"
  );

  // Sync if URL search parameter changes
  useEffect(() => {
    if (initialPlanParam === "premium" || initialPlanParam === "199") {
      setSelectedPlan("premium");
    }
  }, [initialPlanParam]);

  // Auth credentials
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [fullNameTouched, setFullNameTouched] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // Payment section states for ₹199 Plan
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [selectedUpiApp, setSelectedUpiApp] = useState<UpiApp>("gpay");
  const [upiId, setUpiId] = useState("msme.enterprise@okaxis");
  const [isVpaVerified, setIsVpaVerified] = useState(true);
  const [showQrCode, setShowQrCode] = useState(false);

  // Card details
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8912");
  const [cardExpiry, setCardExpiry] = useState("08/29");
  const [cardCvv, setCardCvv] = useState("•••");
  const [cardHolder, setCardHolder] = useState("");

  // Net banking details
  const [selectedBank, setSelectedBank] = useState("sbi");

  // Wallet details
  const [selectedWallet, setSelectedWallet] = useState("amazonpay");

  // Payment flow simulation states
  const [paymentStep, setPaymentStep] = useState<"form" | "processing" | "success">("form");
  const [processingStatus, setProcessingStatus] = useState("Connecting to Secure Payment Gateway...");
  const [transactionData, setTransactionData] = useState({
    txnId: "",
    date: "",
    amount: "₹199.00",
    method: "UPI (Google Pay)",
  });

  // Localized texts helper
  const isHindi = language === "hi";
  const isMarathi = language === "mr";

  const getPlanBadge = () => {
    if (isMarathi) return "₹199 / महिना प्रो प्लॅन";
    if (isHindi) return "₹199 / माह प्रो प्लान";
    return "₹199 / mo Pro Enterprise";
  };

  const getPayButtonText = () => {
    if (selectedPlan === "free") {
      return loginMethod === "phone" && !otpSent
        ? t.modals.login.btnSendOtp
        : t.auth.loginButton;
    }
    if (isMarathi) return "₹199 भरा आणि प्रो सुरू करा";
    if (isHindi) return "₹199 भुगतान करें और प्रो शुरू करें";
    return "Pay ₹199 & Activate Pro Access";
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setFullNameTouched(true);
      return;
    }

    if (loginMethod === "phone" && !otpSent && selectedPlan === "free") {
      setOtpSent(true);
      return;
    }

    const effectiveBusiness = businessName.trim() || "Sahayya Enterprise MSME";
    const effectiveName = fullName.trim() || "Enterprise Owner";

    if (selectedPlan === "premium") {
      // Initiate realistic ₹199 Payment Flow
      setPaymentStep("processing");
      setProcessingStatus(
        isMarathi
          ? "सुरक्षित पेमेंट गेटवेशी जोडत आहोत..."
          : isHindi
          ? "सुरक्षित पेमेंट गेटवे से जुड़ रहे हैं..."
          : "Connecting to RBI-Approved Payment Gateway..."
      );

      setTimeout(() => {
        setProcessingStatus(
          isMarathi
            ? "NPCI आणि बँकिंग नेटवर्क द्वारे ₹199 व्हेरिफाय करत आहोत..."
            : isHindi
            ? "NPCI व बैंकिंग नेटवर्क से ₹199 सत्यापित कर रहे हैं..."
            : "Authorizing ₹199 with NPCI & Banking Network..."
        );
      }, 1200);

      setTimeout(() => {
        setProcessingStatus(
          isMarathi
            ? "पेमेंट यशस्वी! प्रो लायसन्स जनरेट होत आहे..."
            : isHindi
            ? "भुगतान सफल! प्रो लाइसेंस जारी हो रहा है..."
            : "Payment Authorized! Provisioning Pro License..."
        );
      }, 2400);

      setTimeout(() => {
        const randomTxn = "TXN_SHY_" + Math.floor(100000 + Math.random() * 900000);
        const nowFormatted = new Date().toLocaleString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        let methodLabel = "UPI";
        if (paymentMethod === "upi") {
          methodLabel = `UPI (${selectedUpiApp.toUpperCase()})`;
        } else if (paymentMethod === "card") {
          methodLabel = "Credit / Debit Card (RuPay/Visa)";
        } else if (paymentMethod === "netbanking") {
          methodLabel = `Net Banking (${selectedBank.toUpperCase()})`;
        } else {
          methodLabel = "MSME Business Wallet";
        }

        setTransactionData({
          txnId: randomTxn,
          date: nowFormatted,
          amount: "₹199.00",
          method: methodLabel,
        });

        // Save session in auth context
        login({
          fullName: effectiveName,
          identifier: loginMethod === "phone" ? phone.trim() || "9876543210" : email.trim() || "owner@enterprise.in",
          loginMethod: loginMethod,
          businessName: effectiveBusiness,
          plan: "pro",
        });

        setPaymentStep("success");
      }, 3500);

    } else {
      // Free plan standard login
      login({
        fullName: effectiveName,
        identifier: loginMethod === "phone" ? phone.trim() : email.trim(),
        loginMethod: loginMethod,
        businessName: effectiveBusiness,
        plan: "free",
      });

      setPaymentStep("success");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* 1. Header with Language Selector */}
      <Header
        showLoginButton={false}
        showFeaturesLink={false}
        activeNav="Home"
      />

      {/* 2. Split-Screen Hero Body with Full-Bleed Background Photo */}
      <div className="relative flex-1 w-full min-h-[calc(100vh-88px)] flex items-center overflow-hidden py-8">
        
        {/* Full-width industrial warehouse & worker background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/login_bg_worker.jpg"
            alt="Indian industrial factory engineer in modern warehouse"
            fill
            sizes="100vw"
            className="object-cover object-left-bottom brightness-[0.92] contrast-[1.02]"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40 md:from-white/95 md:via-white/75 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/20" />
        </div>

        {/* Two-Column Grid Content */}
        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Hero text & brand values */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center space-y-5 max-w-[620px] lg:pt-4"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green-100 text-brand-green-700 text-xs sm:text-sm font-bold tracking-tight shadow-sm border border-emerald-200/60">
                <span className="text-sm">🌱</span> {t.hero.badge}
              </span>
            </div>

            {/* H1 Headline */}
            <div className="space-y-3">
              <h1 className="text-[36px] sm:text-[46px] lg:text-[52px] font-extrabold text-text-slate-900 tracking-tight leading-[1.1] flex flex-col">
                <span>{t.hero.titleLine1}</span>
                <span>{t.hero.titleLine2}</span>
                <span className="text-text-slate-900">
                  {t.hero.titleFor} <span className="text-brand-green-700">{t.hero.titleHighlight}</span>
                </span>
              </h1>
              {/* Short green underline */}
              <div className="w-24 h-[4.5px] bg-brand-green-700 rounded-full" />
            </div>

            {/* Subtitle */}
            <p className="text-[14.5px] sm:text-[16px] text-text-slate-600 leading-relaxed font-normal">
              {t.hero.subtitle}
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-sm text-xs font-semibold text-text-slate-900">
                <ShieldCheck className="w-4 h-4 text-brand-green-700 shrink-0" />
                <span>{t.creditCard.title} ({t.creditCard.highEligibility})</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-sm text-xs font-semibold text-text-slate-900">
                <Zap className="w-4 h-4 text-brand-green-700 shrink-0" />
                <span>{t.phoneMockup.complianceScore} (85% {t.phoneMockup.compliant})</span>
              </div>
            </div>

            {/* ₹199 Subscription Perks Callout */}
            <div className="p-4 rounded-3xl bg-gradient-to-br from-emerald-900 via-[#0F3D2E] to-slate-900 text-white shadow-xl space-y-2.5 border border-emerald-700/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[11px] font-bold tracking-wider border border-emerald-400/30 uppercase">
                    ⭐ Pro Tier (₹199 / mo)
                  </span>
                </div>
                <span className="text-xs text-emerald-300 font-semibold">10 Enterprise Modules</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Full AI vision quality inspection, live PPE CCTV turnstile gate, Form 28 80% statutory patent fee waiver, and raw material demand simulator.
              </p>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Interactive Login & Payment Card */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-6 w-full max-w-[540px] mx-auto lg:ml-auto"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-5 sm:p-7 shadow-[0_25px_60px_-15px_rgba(15,61,46,0.2),0_10px_25px_rgba(0,0,0,0.06)] border border-slate-100/90 relative">
              
              {/* Top Bar: Card Title & Language Toggle */}
              <div className="flex items-start justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-text-slate-900 tracking-tight">
                    {selectedPlan === "premium"
                      ? isMarathi
                        ? "सहय्य प्रो सबस्क्रिप्शन (₹१९९)"
                        : isHindi
                        ? "सहाय्य प्रो सब्सक्रिप्शन (₹199)"
                        : "Sahayya Pro Subscription (₹199)"
                      : t.auth.loginTitle}
                  </h2>
                  <p className="text-xs text-text-slate-600 mt-1">
                    {selectedPlan === "premium"
                      ? isMarathi
                        ? "पेमेंट पद्धत निवडा आणि प्रो मॉड्युल्स तात्काळ अनलॉक करा."
                        : isHindi
                        ? "भुगतान विधि चुनें और प्रो मॉड्यूल्स तत्काल अनलॉक करें।"
                        : "Choose payment method to unlock full 10-module enterprise AI suite."
                      : t.auth.loginSubtitle}
                  </p>
                </div>

                {/* Language Switcher */}
                <LanguageSwitcher variant="compact" />
              </div>

              {/* ----------------- PLAN SELECTOR TABS ----------------- */}
              <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-100 mb-4 border border-slate-200/80">
                {/* Free Starter Tab */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlan("free");
                    setPaymentStep("form");
                  }}
                  className={`py-2.5 px-3 rounded-xl transition-all text-left flex flex-col justify-center cursor-pointer ${
                    selectedPlan === "free"
                      ? "bg-white text-text-slate-900 shadow-sm border border-slate-200/60 font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">🌱 Free Starter</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">
                      ₹0
                    </span>
                  </div>
                  <span className="text-[10.5px] text-slate-500 font-normal mt-0.5 truncate">
                    Basic diagnostics &amp; scheme search
                  </span>
                </button>

                {/* Pro Subscription (₹199) Tab */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlan("premium");
                    setPaymentStep("form");
                  }}
                  className={`py-2.5 px-3 rounded-xl transition-all text-left flex flex-col justify-center cursor-pointer relative ${
                    selectedPlan === "premium"
                      ? "bg-brand-green-700 text-white shadow-md font-bold"
                      : "text-slate-700 hover:text-brand-green-900 bg-emerald-50/70 border border-emerald-200/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-extrabold ${selectedPlan === "premium" ? "text-white" : "text-brand-green-900"}`}>
                      ⚡ Pro Enterprise
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                        selectedPlan === "premium"
                          ? "bg-white text-brand-green-900 shadow-xs"
                          : "bg-brand-green-700 text-white"
                      }`}
                    >
                      ₹199 / mo
                    </span>
                  </div>
                  <span
                    className={`text-[10.5px] font-medium mt-0.5 truncate ${
                      selectedPlan === "premium" ? "text-emerald-100" : "text-slate-600"
                    }`}
                  >
                    All 10 Enterprise AI Modules
                  </span>
                </button>
              </div>

              {/* ----------------- PAYMENT PROCESSING SCREEN ----------------- */}
              {paymentStep === "processing" && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-3xl bg-brand-green-50 border-2 border-brand-green-200 flex items-center justify-center text-brand-green-700">
                      <RefreshCw className="w-8 h-8 animate-spin" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                      ₹
                    </div>
                  </div>
                  <div className="space-y-1 max-w-[320px]">
                    <h4 className="text-base font-extrabold text-text-slate-900">
                      {isMarathi
                        ? "₹१९९ चे सुरक्षित पेमेंट सुरू आहे..."
                        : isHindi
                        ? "₹199 का सुरक्षित भुगतान जारी है..."
                        : "Securing ₹199 Payment..."}
                    </h4>
                    <p className="text-xs text-brand-green-800 font-medium animate-pulse">
                      {processingStatus}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Lock className="w-3.5 h-3.5" />
                    <span>256-Bit SSL Encrypted Banking Channel</span>
                  </div>
                </div>
              )}

              {/* ----------------- PAYMENT SUCCESS / INVOICE SCREEN ----------------- */}
              {paymentStep === "success" && (
                <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-brand-green-700 flex items-center justify-center animate-bounce shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-text-slate-900">
                      {selectedPlan === "premium"
                        ? isMarathi
                          ? "पेमेंट यशस्वी! प्रो सक्रिय झाले"
                          : isHindi
                          ? "भुगतान सफल! प्रो एक्टिवेट हुआ"
                          : "Payment Successful! Pro Plan Active"
                        : t.modals.login.authSuccessTitle}
                    </h3>
                    <p className="text-xs text-slate-600 max-w-[320px]">
                      {selectedPlan === "premium"
                        ? isMarathi
                          ? "सर्व १० इंडस्ट्रियल AI मॉड्युल्स तात्काळ उपलब्ध झाले आहेत."
                          : isHindi
                          ? "सभी 10 औद्योगिक AI मॉड्यूल्स तुरंत उपलब्ध हो गए हैं।"
                          : "Full 10-module Industrial AI workspace is now unlocked."
                        : t.modals.login.authSuccessSub}
                    </p>
                  </div>

                  {/* Official MSME Tax Invoice Preview Card */}
                  {selectedPlan === "premium" && (
                    <div className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-left space-y-2.5 text-xs shadow-2xs">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                          <Receipt className="w-4 h-4 text-brand-green-700" />
                          <span>Official MSME Tax Invoice</span>
                        </div>
                        <span className="font-mono text-[10.5px] px-2 py-0.5 rounded-md bg-emerald-100 text-brand-green-800 font-bold">
                          PAID ✓
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <span className="text-slate-400 block">Transaction Ref</span>
                          <span className="font-mono font-bold text-slate-800">{transactionData.txnId}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Payment Mode</span>
                          <span className="font-semibold text-slate-800">{transactionData.method}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Subscribed Plan</span>
                          <span className="font-bold text-brand-green-800">Sahayya Pro (30 Days)</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Total Amount Paid</span>
                          <span className="font-extrabold text-slate-900">₹199.00 (Incl. 18% GST)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={() => {
                      if (selectedPlan === "premium") {
                        router.push("/premium");
                      } else {
                        router.push("/dashboard");
                      }
                    }}
                    className="w-full bg-brand-green-700 hover:bg-brand-green-900 text-white rounded-xl py-4 font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>
                      {selectedPlan === "premium"
                        ? isMarathi
                          ? "प्रो डॅशबोर्ड वर जा →"
                          : isHindi
                          ? "प्रो डैशबोर्ड में प्रवेश करें →"
                          : "Enter Pro Enterprise Workspace →"
                        : "Proceed to Dashboard →"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* ----------------- FORM VIEW (Auth + Payment Section) ----------------- */}
              {paymentStep === "form" && (
                <form onSubmit={handleProcessPayment} className="space-y-4">
                  
                  {/* Authentication Credentials Section */}
                  <div className="space-y-3">
                    {/* Method switch: Mobile OTP vs Email */}
                    <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => {
                          setLoginMethod("phone");
                          setOtpSent(false);
                        }}
                        className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          loginMethod === "phone"
                            ? "bg-white text-brand-green-900 shadow-xs font-bold"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Phone className="w-3.5 h-3.5" /> {t.modals.login.tabPhone}
                      </button>
                      <button
                        type="button"
                        onClick={() => setLoginMethod("email")}
                        className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          loginMethod === "email"
                            ? "bg-white text-brand-green-900 shadow-xs font-bold"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Mail className="w-3.5 h-3.5" /> {t.modals.login.tabEmail}
                      </button>
                    </div>

                    {/* Row: Full Name & Firm Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-text-slate-900 mb-1">
                          {t.auth.fullNameLabel} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                          <input
                            type="text"
                            required
                            value={fullName}
                            onBlur={() => setFullNameTouched(true)}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder={t.auth.fullNamePlaceholder}
                            className={`w-full pl-9 pr-3 py-2 rounded-xl border ${
                              fullNameTouched && !fullName.trim()
                                ? "border-red-500 focus:ring-red-200"
                                : "border-slate-200 focus:ring-brand-green-600"
                            } focus:outline-none focus:ring-2 text-xs font-medium bg-white`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-text-slate-900 mb-1">
                          Enterprise Name
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                          <input
                            type="text"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            placeholder="e.g. Sahyadri Food LLP"
                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green-600 text-xs font-medium bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Phone or Email inputs */}
                    {loginMethod === "phone" ? (
                      <div className="space-y-2">
                        <div>
                          <label className="block text-xs font-semibold text-text-slate-900 mb-1">
                            {t.modals.login.mobileLabel} <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                              +91
                            </span>
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder={t.modals.login.mobilePlaceholder}
                              className="w-full pl-11 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green-600 text-xs font-medium"
                            />
                          </div>
                        </div>

                        {otpSent && selectedPlan === "free" && (
                          <div>
                            <label className="block text-xs font-semibold text-text-slate-900 mb-1">
                              {t.modals.login.otpLabel}
                            </label>
                            <input
                              type="text"
                              maxLength={6}
                              required
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              placeholder={t.modals.login.otpPlaceholder}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green-600 text-xs font-bold tracking-widest text-center"
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div>
                          <label className="block text-xs font-semibold text-text-slate-900 mb-1">
                            {t.modals.login.emailLabel} <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder={t.modals.login.emailPlaceholder}
                              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green-600 text-xs font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-text-slate-900 mb-1">
                            {t.modals.login.passwordLabel}
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                            <input
                              type={showPassword ? "text" : "password"}
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder={t.modals.login.passwordPlaceholder}
                              className="w-full pl-9 pr-9 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green-600 text-xs font-medium"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ----------------- ₹199 PAYMENT GATEWAY SECTION ----------------- */}
                  {selectedPlan === "premium" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-2 border-t border-slate-200 space-y-3"
                    >
                      {/* Subscription Order Summary Banner */}
                      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#F0FDF4] to-emerald-50 border border-emerald-200/90 text-xs space-y-2 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-[#14532D] text-white flex items-center justify-center font-bold text-xs">
                              ₹
                            </div>
                            <div>
                              <span className="font-extrabold text-slate-900 block leading-tight">
                                Sahayya Pro Enterprise Tier
                              </span>
                              <span className="text-[10.5px] text-slate-600">
                                1 Month Pass • Base ₹168.64 + 18% GST (₹30.36)
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-base font-black text-[#14532D]">₹199</span>
                            <span className="text-[10px] text-slate-500 block">/ Month</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Method Selector Tabs */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-text-slate-900">
                          {isMarathi ? "पेमेंट पद्धत निवडा" : isHindi ? "भुगतान विधि चुनें" : "Select Payment Method"}
                        </label>

                        <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl text-[11px] font-semibold text-slate-700">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod("upi")}
                            className={`py-2 px-1 rounded-lg transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                              paymentMethod === "upi"
                                ? "bg-white text-brand-green-900 shadow-xs font-bold"
                                : "hover:text-slate-900"
                            }`}
                          >
                            <Smartphone className="w-3.5 h-3.5" />
                            <span>UPI / QR</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPaymentMethod("card")}
                            className={`py-2 px-1 rounded-lg transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                              paymentMethod === "card"
                                ? "bg-white text-brand-green-900 shadow-xs font-bold"
                                : "hover:text-slate-900"
                            }`}
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Cards</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPaymentMethod("netbanking")}
                            className={`py-2 px-1 rounded-lg transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                              paymentMethod === "netbanking"
                                ? "bg-white text-brand-green-900 shadow-xs font-bold"
                                : "hover:text-slate-900"
                            }`}
                          >
                            <Landmark className="w-3.5 h-3.5" />
                            <span>NetBank</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPaymentMethod("wallet")}
                            className={`py-2 px-1 rounded-lg transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                              paymentMethod === "wallet"
                                ? "bg-white text-brand-green-900 shadow-xs font-bold"
                                : "hover:text-slate-900"
                            }`}
                          >
                            <Wallet className="w-3.5 h-3.5" />
                            <span>Wallets</span>
                          </button>
                        </div>
                      </div>

                      {/* Payment Method Sub-Panel 1: UPI / QR */}
                      {paymentMethod === "upi" && (
                        <div className="p-3 rounded-2xl bg-white border border-slate-200/90 space-y-2.5 text-xs">
                          {/* Quick UPI Apps Selector */}
                          <div className="space-y-1">
                            <span className="text-[10.5px] font-semibold text-slate-500 block">
                              Pay instantly via UPI App:
                            </span>
                            <div className="grid grid-cols-4 gap-1.5">
                              {[
                                { id: "gpay" as UpiApp, name: "GPay", color: "text-blue-600 bg-blue-50 border-blue-200" },
                                { id: "phonepe" as UpiApp, name: "PhonePe", color: "text-purple-700 bg-purple-50 border-purple-200" },
                                { id: "paytm" as UpiApp, name: "Paytm", color: "text-sky-600 bg-sky-50 border-sky-200" },
                                { id: "bhim" as UpiApp, name: "BHIM", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
                              ].map((app) => (
                                <button
                                  key={app.id}
                                  type="button"
                                  onClick={() => setSelectedUpiApp(app.id)}
                                  className={`py-1.5 px-2 rounded-lg border text-center font-bold text-[11px] transition-all cursor-pointer ${
                                    selectedUpiApp === app.id
                                      ? `${app.color} ring-2 ring-emerald-600 shadow-xs`
                                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                                  }`}
                                >
                                  {app.name}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* UPI ID Input */}
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="text-[10.5px] font-semibold text-slate-700">
                                Enter UPI ID / VPA
                              </label>
                              {isVpaVerified && (
                                <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" /> Verified MSME
                                </span>
                              )}
                            </div>
                            <div className="relative">
                              <input
                                type="text"
                                value={upiId}
                                onChange={(e) => {
                                  setUpiId(e.target.value);
                                  setIsVpaVerified(true);
                                }}
                                placeholder="e.g. yourname@okhdfcbank"
                                className="w-full pl-3 pr-16 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green-600 text-xs font-mono"
                              />
                              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">
                                @UPI
                              </span>
                            </div>
                          </div>

                          {/* Toggle QR Code */}
                          <div className="pt-1">
                            <button
                              type="button"
                              onClick={() => setShowQrCode(!showQrCode)}
                              className="text-[11px] font-bold text-brand-green-800 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <QrCode className="w-3.5 h-3.5 text-brand-green-700" />
                              <span>{showQrCode ? "Hide UPI QR Code" : "Show Dynamic UPI QR Code (Scan to Pay ₹199)"}</span>
                            </button>

                            {showQrCode && (
                              <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center space-y-1.5">
                                <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-2xs">
                                  {/* Simulated QR Code SVG pattern */}
                                  <div className="w-28 h-28 bg-slate-900 rounded flex flex-col items-center justify-center p-2 text-white text-[10px]">
                                    <QrCode className="w-20 h-20 text-white" />
                                    <span className="text-[8px] tracking-tight">₹199 • SAHAYYA PAY</span>
                                  </div>
                                </div>
                                <span className="text-[10.5px] font-medium text-slate-600">
                                  Scan with any banking app (GPay / PhonePe / Paytm / BHIM)
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Payment Method Sub-Panel 2: Credit / Debit Cards */}
                      {paymentMethod === "card" && (
                        <div className="p-3 rounded-2xl bg-white border border-slate-200/90 space-y-2.5 text-xs">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="text-[10.5px] font-semibold text-slate-700">
                                Card Number
                              </label>
                              <div className="flex items-center gap-1 text-[9.5px] font-bold text-slate-500">
                                <span className="px-1 py-0.5 bg-slate-100 rounded">RuPay</span>
                                <span className="px-1 py-0.5 bg-slate-100 rounded">VISA</span>
                                <span className="px-1 py-0.5 bg-slate-100 rounded">Mastercard</span>
                              </div>
                            </div>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                              <input
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="4532 0000 0000 0000"
                                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green-600 text-xs font-mono"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10.5px] font-semibold text-slate-700 mb-1 block">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                placeholder="MM / YY"
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green-600 text-xs font-mono text-center"
                              />
                            </div>
                            <div>
                              <label className="text-[10.5px] font-semibold text-slate-700 mb-1 block">
                                CVV / CVC
                              </label>
                              <input
                                type="password"
                                maxLength={4}
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value)}
                                placeholder="•••"
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green-600 text-xs font-mono text-center"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Payment Method Sub-Panel 3: Net Banking */}
                      {paymentMethod === "netbanking" && (
                        <div className="p-3 rounded-2xl bg-white border border-slate-200/90 space-y-2 text-xs">
                          <label className="text-[10.5px] font-semibold text-slate-700 block">
                            Select Popular MSME Bank:
                          </label>
                          <div className="grid grid-cols-3 gap-1.5">
                            {[
                              { id: "sbi", name: "SBI" },
                              { id: "hdfc", name: "HDFC Bank" },
                              { id: "icici", name: "ICICI Bank" },
                              { id: "bob", name: "Bank of Baroda" },
                              { id: "axis", name: "Axis Bank" },
                              { id: "pnb", name: "PNB" },
                            ].map((bank) => (
                              <button
                                key={bank.id}
                                type="button"
                                onClick={() => setSelectedBank(bank.id)}
                                className={`py-1.5 px-2 rounded-lg border text-center font-bold text-[10.5px] transition-all cursor-pointer truncate ${
                                  selectedBank === bank.id
                                    ? "bg-brand-green-50 border-brand-green-600 text-brand-green-900 ring-1 ring-brand-green-600"
                                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                {bank.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Payment Method Sub-Panel 4: Wallets */}
                      {paymentMethod === "wallet" && (
                        <div className="p-3 rounded-2xl bg-white border border-slate-200/90 space-y-2 text-xs">
                          <label className="text-[10.5px] font-semibold text-slate-700 block">
                            Select Digital Wallet:
                          </label>
                          <div className="grid grid-cols-3 gap-1.5">
                            {[
                              { id: "amazonpay", name: "Amazon Pay" },
                              { id: "paytmwallet", name: "Paytm Wallet" },
                              { id: "simpl", name: "Simpl MSME" },
                            ].map((wallet) => (
                              <button
                                key={wallet.id}
                                type="button"
                                onClick={() => setSelectedWallet(wallet.id)}
                                className={`py-1.5 px-2 rounded-lg border text-center font-bold text-[10.5px] transition-all cursor-pointer truncate ${
                                  selectedWallet === wallet.id
                                    ? "bg-brand-green-50 border-brand-green-600 text-brand-green-900 ring-1 ring-brand-green-600"
                                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                {wallet.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Trust & Guarantee Badges */}
                      <div className="flex items-center justify-between text-[10px] text-slate-500 px-1">
                        <span className="flex items-center gap-1">
                          <Lock className="w-3 h-3 text-brand-green-700" /> 256-Bit SSL Secured
                        </span>
                        <span>RBI &amp; NPCI Compliant Gateway</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Submit Action Button */}
                  <Button
                    type="submit"
                    className="w-full bg-brand-green-700 hover:bg-brand-green-900 text-white rounded-xl py-4 font-bold transition-all shadow-md mt-2 cursor-pointer flex items-center justify-center gap-2 text-sm"
                  >
                    <span>{getPayButtonText()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  {/* Divider */}
                  <div className="relative flex items-center justify-center my-1">
                    <div className="border-t border-slate-200 w-full" />
                    <span className="bg-white px-3 text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">
                      or
                    </span>
                    <div className="border-t border-slate-200 w-full" />
                  </div>

                  {/* Dedicated Sign Up / Registration Link */}
                  <Link
                    href="/signup"
                    className="w-full rounded-xl py-2.5 px-4 text-xs font-bold text-brand-green-900 bg-brand-green-50 hover:bg-brand-green-100/90 border-[1.5px] border-brand-green-600 transition-all flex items-center justify-center gap-2 shadow-2xs group cursor-pointer text-center"
                  >
                    <Building2 className="w-3.5 h-3.5 text-brand-green-700 group-hover:scale-110 transition-transform" />
                    <span>{t.auth.signupLink}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-green-700 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </form>
              )}

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 rounded-full border-4 border-brand-green-700 border-t-transparent animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
