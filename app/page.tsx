"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  BookOpen,
  Compass,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Users,
  Building2,
  Activity,
  Layers,
  Cpu,
  Lock,
  Search,
  Radio,
  ExternalLink
} from "lucide-react";
import { Navbar } from "@/components/nst/navbar";
import { Footer } from "@/components/nst/footer";
import { CapabilityGraph } from "@/components/nst/capability-graph";
import { COURSES, ARTICLES } from "@/lib/nst-data";

export default function HomePage() {
  const [activePillar, setActivePillar] = useState<"People" | "Knowledge" | "Organisations" | "Opportunities">("People");

  const pillarCopy = {
    People: "Discover verified professionals, tactical operators, researchers and educators working across the security landscape.",
    Knowledge: "Explore peer-reviewed research, strategic intelligence, doctrine analysis and structured accredited learning.",
    Organisations: "Connect institutions, defense manufacturers, sovereign agencies and employers around shared capability requirements.",
    Opportunities: "Find high-impact missions, field deployments, research fellowships and verified institutional placements."
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f6f2] text-[#171b22] selection:bg-[#d95325]/20 selection:text-[#d95325]">
      {/* Top Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* ========================================================
            HERO SECTION (DARK BAND #171b22)
        ======================================================== */}
        <section className="bg-[#171b22] text-white pt-20 pb-24 border-b border-[#3b414a] relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d95325]/5 rounded-full blur-[140px] pointer-events-none" />

          <div className="w-min(1220px,calc(100%-48px)) max-w-[1220px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
              {/* Left Column: Hero Text */}
              <div className="flex flex-col items-start">
                <span className="eyebrow text-[#d95325] font-bold tracking-[2px] mb-4">
                  THE NATIONAL SECURITY THINK TANK
                </span>

                <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-medium leading-[0.94] tracking-[-3px] mb-7 text-white">
                  Security is a <em className="font-serif italic font-normal text-[#e5e3db]">collective</em> capability.
                </h1>

                <p className="text-base sm:text-lg text-[#c5c9ce] leading-relaxed max-w-[540px] mb-9 font-normal">
                  TheNST brings together professionals, researchers, educators, organisations and emerging capabilities to build knowledge, expertise and opportunity across the security landscape.
                </p>

                {/* Hero Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/ecosystem"
                    className="inline-flex items-center justify-center min-h-[46px] px-6 text-xs font-semibold tracking-wider text-white bg-[#d95325] hover:bg-[#bc3f18] transition-all duration-200 uppercase shadow-md"
                  >
                    Explore TheNST
                  </Link>
                  <Link
                    href="/ecosystem"
                    className="inline-flex items-center justify-center min-h-[46px] px-6 text-xs font-semibold tracking-wider text-white border border-[#9299a2] hover:bg-white hover:text-[#171b22] transition-all duration-200 uppercase"
                  >
                    Find Your Path
                  </Link>
                </div>

                {/* Hero Meta 4-Domain Strip */}
                <div className="w-full border-t border-[#393e46] mt-16 pt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-[#9299a2] text-[10px] font-mono tracking-widest uppercase">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d95325]" />
                    <span>01 / People</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d95325]" />
                    <span>02 / Knowledge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d95325]" />
                    <span>03 / Organisations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d95325]" />
                    <span>04 / Opportunity</span>
                  </div>
                </div>
              </div>

              {/* Right Column: 3D / 2D Animated Capability Graph */}
              <div className="w-full flex justify-center lg:justify-end">
                <CapabilityGraph />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            STATEMENT SECTION (WHITE PAPER)
        ======================================================== */}
        <section className="bg-white py-24 sm:py-28 border-b border-[#e5e3db]">
          <div className="w-min(1220px,calc(100%-48px)) max-w-[1220px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
              <span className="eyebrow text-[#737a83]">
                WHAT IS THE NST
              </span>

              <div className="flex flex-col items-start">
                <h2 className="text-3xl sm:text-5xl font-medium leading-[1.05] tracking-[-2px] text-[#171b22] mb-6 max-w-[720px]">
                  A national security institution built around people, knowledge, organisations and opportunity.
                </h2>

                <p className="text-base sm:text-lg text-[#737a83] leading-relaxed max-w-[650px] mb-8">
                  TheNST is a place to learn, research, connect and participate. It provides a clear path into the wider security landscape without asking visitors to already know where they belong.
                </p>

                <Link
                  href="/ecosystem"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#d95325] hover:text-[#bc3f18] transition-colors border-b border-transparent hover:border-[#d95325] pb-0.5"
                >
                  Explore the ecosystem
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            ECOSYSTEM PILLARS (DARK BAND #171b22)
        ======================================================== */}
        <section className="bg-[#171b22] text-white py-24 sm:py-28 border-b border-[#3b414a]">
          <div className="w-min(1220px,calc(100%-48px)) max-w-[1220px] mx-auto">
            {/* Section Header */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-8 mb-14">
              <div>
                <span className="eyebrow text-[#a7adb5]">TheNST / Ecosystem</span>
                <h2 className="text-3xl sm:text-5xl font-medium leading-[1.05] tracking-[-2px] text-white mt-3">
                  One institution. Many ways in.
                </h2>
              </div>
              <p className="text-base text-[#a7adb5] leading-relaxed self-end">
                Choose the part of TheNST that is most useful to you now. Your path can change as your work does.
              </p>
            </div>

            {/* Interactive Pillar Tabs */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.45fr] border-t border-[#3d434c]">
              {/* Left Pillar List */}
              <div className="border-b lg:border-b-0 lg:border-r border-[#3d434c]">
                {(["People", "Knowledge", "Organisations", "Opportunities"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setActivePillar(item)}
                    className={`w-full flex justify-between items-center text-left py-6 px-4 sm:px-0 sm:pr-8 text-xl font-medium border-b border-[#3d434c] transition-all duration-200 ${
                      activePillar === item
                        ? "text-white sm:pl-4 bg-white/5 sm:bg-transparent"
                        : "text-[#959ca5] hover:text-white"
                    }`}
                  >
                    <span>{item}</span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        activePillar === item ? "text-[#d95325] translate-x-1" : "text-[#737a83]"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Right Pillar Detail */}
              <div className="py-10 lg:py-16 lg:pl-16 flex flex-col justify-center items-start">
                <span className="eyebrow text-[#d95325] font-semibold mb-3">
                  {activePillar} Pillar
                </span>

                <h3 className="text-2xl sm:text-4xl font-medium leading-tight tracking-[-1px] text-white max-w-[540px] mb-8">
                  {pillarCopy[activePillar]}
                </h3>

                <Link
                  href={
                    activePillar === "People"
                      ? "/network"
                      : activePillar === "Knowledge"
                      ? "/research"
                      : activePillar === "Organisations"
                      ? "/about"
                      : "/opportunities"
                  }
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-white hover:text-[#d95325] transition-colors border-b border-white hover:border-[#d95325] pb-0.5"
                >
                  Explore {activePillar.toLowerCase()}
                  <ArrowUpRight className="w-4 h-4 text-[#d95325]" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            CHOOSE YOUR PATH (WHITE / PAPER TILES)
        ======================================================== */}
        <section className="bg-white py-24 sm:py-28 border-b border-[#e5e3db]">
          <div className="w-min(1220px,calc(100%-48px)) max-w-[1220px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-8 mb-14">
              <div>
                <span className="eyebrow text-[#737a83]">Choose your path</span>
                <h2 className="text-3xl sm:text-5xl font-medium leading-[1.05] tracking-[-2px] text-[#171b22] mt-3">
                  Where do you fit?
                </h2>
              </div>
              <p className="text-base text-[#737a83] leading-relaxed self-end">
                Start with the role or question that brings you here. TheNST is designed to meet you there.
              </p>
            </div>

            {/* Path Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e5e3db] border border-[#e5e3db]">
              {/* Path 1: Security Professional */}
              <div className="bg-white p-8 sm:p-9 flex flex-col justify-between min-h-[300px] hover:bg-[#efede6] transition-all duration-200 group">
                <div>
                  <div className="text-[#d95325] mb-8">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-medium tracking-[-0.7px] text-[#171b22] mb-3 group-hover:text-[#d95325] transition-colors">
                    Become a Security Professional
                  </h3>
                  <p className="text-[14px] text-[#737a83] leading-relaxed mb-6 font-sans">
                    Build your professional identity, discover high-clearance opportunities and connect with the national security community.
                  </p>
                </div>
                <Link
                  href="/security-professional"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d95325] uppercase tracking-wider"
                >
                  View Roadmap <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Path 2: Educator */}
              <div className="bg-white p-8 sm:p-9 flex flex-col justify-between min-h-[300px] hover:bg-[#efede6] transition-all duration-200 group">
                <div>
                  <div className="text-[#d95325] mb-8">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-medium tracking-[-0.7px] text-[#171b22] mb-3 group-hover:text-[#d95325] transition-colors">
                    Become an Educator
                  </h3>
                  <p className="text-[14px] text-[#737a83] leading-relaxed mb-6 font-sans">
                    Share your expertise and create structured accredited learning experiences for the next generation of analysts and officers.
                  </p>
                </div>
                <Link
                  href="/educator"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d95325] uppercase tracking-wider"
                >
                  Create Courses <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Path 3: Drone Pilot */}
              <div className="bg-white p-8 sm:p-9 flex flex-col justify-between min-h-[300px] hover:bg-[#efede6] transition-all duration-200 group">
                <div>
                  <div className="text-[#d95325] mb-8">
                    <Compass className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-medium tracking-[-0.7px] text-[#171b22] mb-3 group-hover:text-[#d95325] transition-colors">
                    Become a Drone Pilot
                  </h3>
                  <p className="text-[14px] text-[#737a83] leading-relaxed mb-6 font-sans">
                    Bring aerial capability, sensor fusion, and counter-UAS field experience into the wider sovereign security landscape.
                  </p>
                </div>
                <Link
                  href="/drone-pilot"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d95325] uppercase tracking-wider"
                >
                  Deploy Capability <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            IMAGE BANNER: CONTRIBUTE KNOWLEDGE
        ======================================================== */}
        <section className="bg-[#eceae3] border-b border-[#e5e3db] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] min-h-[460px]">
            <div className="h-full min-h-[280px] lg:min-h-[460px] relative">
              <img
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"
                alt="TheNST Executive Briefing"
                className="w-full h-full object-cover grayscale-[25%] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-[#171b22]/15" />
            </div>

            <div className="p-8 sm:p-14 lg:p-20 flex flex-col justify-center items-start">
              <span className="eyebrow text-[#737a83] mb-2">
                CONTRIBUTE KNOWLEDGE
              </span>
              <h2 className="text-3xl sm:text-5xl font-medium leading-[0.98] tracking-[-2.5px] text-[#171b22] mb-5">
                Become an Educator
              </h2>
              <p className="text-base text-[#737a83] leading-relaxed max-w-[420px] mb-8 font-sans">
                Turn your field experience and strategic analysis into structured learning and contribute to the next generation of security leadership.
              </p>
              <Link
                href="/educator"
                className="inline-flex items-center justify-center min-h-[44px] px-6 text-xs font-semibold tracking-wider text-white bg-[#d95325] hover:bg-[#bc3f18] transition-all uppercase shadow-sm"
              >
                Become an Educator
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================
            THENST LEARN PREVIEW
        ======================================================== */}
        <section className="bg-[#f7f6f2] py-24 sm:py-28 border-b border-[#e5e3db]">
          <div className="w-min(1220px,calc(100%-48px)) max-w-[1220px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-8 mb-14">
              <div>
                <span className="eyebrow text-[#737a83]">TheNST Learn</span>
                <h2 className="text-3xl sm:text-5xl font-medium leading-[1.05] tracking-[-2px] text-[#171b22] mt-3">
                  Structured learning for the security profession.
                </h2>
              </div>
              <p className="text-base text-[#737a83] leading-relaxed self-end">
                Professional education across national security, cyber operations, defence technology, AI and strategic affairs.
              </p>
            </div>

            {/* Featured Course Card + List Table */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-[#e5e3db] pt-10">
              {/* Left Featured Course */}
              <div className="flex flex-col justify-between bg-white border border-[#e5e3db] p-8">
                <div>
                  <span className="eyebrow text-[#d95325] font-semibold mb-3">
                    Featured Course / Foundational
                  </span>
                  <h3 className="text-3xl font-medium tracking-[-1.2px] text-[#171b22] mb-4">
                    Foundations of National Security
                  </h3>
                  <p className="text-sm text-[#737a83] leading-relaxed mb-6 font-sans">
                    An introductory pathway covering institutions, intelligence frameworks, legal doctrines and contemporary multi-domain threat environments.
                  </p>

                  <div className="flex items-center gap-6 text-xs font-mono text-[#737a83] mb-8 pb-6 border-b border-[#e5e3db]">
                    <span>Duration: 6 weeks</span>
                    <span>Level: Foundational</span>
                    <span>Desk: TheNST Learn</span>
                  </div>
                </div>

                <Link
                  href="/learn"
                  className="inline-flex items-center justify-between w-full text-xs font-semibold text-[#d95325] uppercase tracking-wider hover:text-[#bc3f18]"
                >
                  <span>View Course Details & Enrol</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Right Course Index Rows */}
              <div className="flex flex-col border-t lg:border-t-0 border-[#e5e3db]">
                {COURSES.slice(1, 5).map((c) => (
                  <Link
                    key={c.id}
                    href="/learn"
                    className="grid grid-cols-[1fr_auto] sm:grid-cols-[1.2fr_2fr_auto] gap-4 items-center py-5 border-b border-[#e5e3db] group hover:pl-2 transition-all duration-200"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#737a83]">
                      {c.category}
                    </span>
                    <b className="text-base font-medium text-[#171b22] group-hover:text-[#d95325] transition-colors">
                      {c.title}
                    </b>
                    <span className="text-[11px] font-mono text-[#737a83] hidden sm:block">
                      {c.duration}
                    </span>
                  </Link>
                ))}

                <div className="mt-8">
                  <Link
                    href="/learn"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#d95325] uppercase tracking-wider hover:text-[#bc3f18]"
                  >
                    Explore all {COURSES.length} courses
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            RESEARCH DESK PREVIEW
        ======================================================== */}
        <section className="bg-white py-24 sm:py-28 border-b border-[#e5e3db]">
          <div className="w-min(1220px,calc(100%-48px)) max-w-[1220px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-8 mb-14">
              <div>
                <span className="eyebrow text-[#737a83]">TheNST Research Desk</span>
                <h2 className="text-3xl sm:text-5xl font-medium leading-[1.05] tracking-[-2px] text-[#171b22] mt-3">
                  Independent analysis. Rigorous inquiry.
                </h2>
              </div>
              <p className="text-base text-[#737a83] leading-relaxed self-end">
                Intelligence monographs, doctrine briefings and strategic research authored by defense practitioners and sovereign analysts.
              </p>
            </div>

            {/* Featured Research Card */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[#171b22] text-white p-8 sm:p-12 mb-12">
              <div className="flex flex-col justify-center items-start">
                <span className="eyebrow text-[#d95325] font-semibold mb-3">
                  Featured Intelligence Monograph
                </span>
                <h3 className="text-2xl sm:text-4xl font-medium leading-tight tracking-[-1.2px] text-white mb-4">
                  The Contested Order: Indo-Pacific Maritime Security
                </h3>
                <p className="text-sm text-[#b8bec5] leading-relaxed mb-6 font-sans">
                  An in-depth intelligence review of maritime surveillance networks, chokepoint control, and unmanned undersea deterrence in the eastern maritime corridors.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-[#9299a2] mb-8">
                  <span>March 2026</span>
                  <span>•</span>
                  <span>12 min read</span>
                  <span>•</span>
                  <span className="text-[#d95325]">TheNST Research Desk</span>
                </div>
                <Link
                  href="/research"
                  className="inline-flex items-center justify-center min-h-[42px] px-5 text-xs font-semibold tracking-wider text-white bg-[#d95325] hover:bg-[#bc3f18] uppercase transition-all"
                >
                  Read Monograph
                </Link>
              </div>

              <div className="relative min-h-[260px]">
                <img
                  src={ARTICLES[0].image}
                  alt="Maritime Research"
                  className="w-full h-full object-cover grayscale-[30%]"
                />
              </div>
            </div>

            {/* Additional Research Articles */}
            <div className="border-t border-[#e5e3db]">
              {ARTICLES.slice(1).map((a) => (
                <div
                  key={a.id}
                  className="flex flex-col sm:flex-row justify-between sm:items-center py-6 border-b border-[#e5e3db] gap-4 group"
                >
                  <div>
                    <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-[#737a83] mb-1.5">
                      <span>{a.category}</span>
                      <span>•</span>
                      <span>{a.date}</span>
                    </div>
                    <Link
                      href="/research"
                      className="text-xl font-medium text-[#171b22] group-hover:text-[#d95325] transition-colors"
                    >
                      {a.title}
                    </Link>
                  </div>
                  <Link
                    href="/research"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#737a83] group-hover:text-[#d95325] whitespace-nowrap transition-colors uppercase tracking-wider self-start sm:self-auto"
                  >
                    <span>Read Brief</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/research"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#d95325] uppercase tracking-wider hover:text-[#bc3f18]"
              >
                Visit the Research Desk
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================
            PLATFORM PREVIEW HUD (DARK BAND #171b22)
        ======================================================== */}
        <section className="bg-[#171b22] text-white py-24 sm:py-28">
          <div className="w-min(1220px,calc(100%-48px)) max-w-[1220px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-14 items-center">
              {/* Left Info */}
              <div>
                <span className="eyebrow text-[#d95325] font-semibold mb-3">
                  THE PLATFORM
                </span>
                <h2 className="text-3xl sm:text-5xl font-medium leading-[1] tracking-[-2px] text-white mb-6">
                  A single hub for learning, opportunity and institutional connection.
                </h2>
                <p className="text-base text-[#b5bbc2] leading-relaxed max-w-[480px] mb-8 font-sans">
                  TheNST platform integrates accredited KYC verification, role-specific capability mapping, direct enterprise postings, and real-time security alerts into a unified, secure dashboard.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center min-h-[44px] px-6 text-xs font-semibold tracking-wider text-white bg-[#d95325] hover:bg-[#bc3f18] transition-all uppercase shadow-md"
                  >
                    Enter Platform
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center min-h-[44px] px-6 text-xs font-semibold tracking-wider text-white border border-[#3b414a] hover:bg-white hover:text-[#171b22] transition-all uppercase"
                  >
                    Institutional Sign In
                  </Link>
                </div>
              </div>

              {/* Right HUD Tactical Card */}
              <div className="bg-[#1b2028] border border-[#414750] p-6 sm:p-8 shadow-2xl relative">
                {/* HUD Top Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-[#414750] text-xs font-mono text-[#9299a2]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#d95325] animate-pulse" />
                    <span className="text-white font-semibold">SOVEREIGN NETWORK // ONLINE</span>
                  </div>
                  <span>ENCLAVE: v4.2.8</span>
                </div>

                {/* HUD Live Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#343a43] my-6 border border-[#343a43]">
                  <div className="bg-[#1b2028] p-4 flex items-center justify-between">
                    <span className="text-xs text-[#b9c0c8]">Verified Personnel</span>
                    <b className="text-sm text-[#d95325] font-mono font-bold">12,480</b>
                  </div>
                  <div className="bg-[#1b2028] p-4 flex items-center justify-between">
                    <span className="text-xs text-[#b9c0c8]">Active Desks</span>
                    <b className="text-sm text-[#d95325] font-mono font-bold">14</b>
                  </div>
                  <div className="bg-[#1b2028] p-4 flex items-center justify-between">
                    <span className="text-xs text-[#b9c0c8]">Curricula Modules</span>
                    <b className="text-sm text-[#d95325] font-mono font-bold">48</b>
                  </div>
                  <div className="bg-[#1b2028] p-4 flex items-center justify-between">
                    <span className="text-xs text-[#b9c0c8]">Open Opportunities</span>
                    <b className="text-sm text-[#d95325] font-mono font-bold">64</b>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="space-y-2.5 text-[11px] font-mono text-[#9299a2]">
                  <div className="flex items-center justify-between">
                    <span>Cryptographic Verification Engine:</span>
                    <span className="text-emerald-400 font-semibold">PASS [Zero-Knowledge]</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Institutional Affiliation Desk:</span>
                    <span className="text-emerald-400 font-semibold">ACTIVE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tactical Radar Stream:</span>
                    <span className="text-[#d95325] font-semibold">SYNCHRONIZED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
}
