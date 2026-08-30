"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import {
  PricingModal,
  SchemesModal,
} from "@/components/Modals";

export default function Home() {
  const [pricingOpen, setPricingOpen] = useState(false);
  const [schemesOpen, setSchemesOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");

  return (
    <main className="min-h-screen bg-white flex flex-col justify-start overflow-x-hidden">
      {/* 1. Header with direct Login page routing */}
      <Header
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      {/* 2. Intro / Hero Section */}
      <Hero
        onOpenPricing={() => setPricingOpen(true)}
        onOpenSchemes={() => setSchemesOpen(true)}
      />

      {/* 3. Interactive Information Modals */}
      <PricingModal open={pricingOpen} onOpenChange={setPricingOpen} />
      <SchemesModal open={schemesOpen} onOpenChange={setSchemesOpen} />
    </main>
  );
}
