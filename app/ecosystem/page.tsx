"use client";

import React from "react";
import Link from "next/link";
import { Shield, Users, BookOpen, Building2, Compass, ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/nst/navbar";
import { Footer } from "@/components/nst/footer";

export default function EcosystemPage() {
  const components = [
    {
      title: "People",
      desc: "Verified professionals, tactical operators, drone pilots, researchers and educators working across security domains.",
      href: "/network",
      count: "12,480+ Members"
    },
    {
      title: "Knowledge",
      desc: "Peer-reviewed defense research, intelligence monographs, doctrine analyses and accredited masterclasses.",
      href: "/research",
      count: "140+ Publications"
    },
    {
      title: "Organisations",
      desc: "Defense contractors, sovereign government bodies, security enterprises and academic institutions.",
      href: "/about",
      count: "210+ Entities"
    },
    {
      title: "Opportunities",
      desc: "Field deployments, research fellowships, procurement tenders, and specialized high-clearance missions.",
      href: "/opportunities",
      count: "78 Open Briefs"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f6f2] text-[#171b22]">
      <Navbar />

      <main className="flex-1">
        {/* Intro */}
        <section className="bg-[#171b22] text-white pt-16 pb-20 border-b border-[#3b414a]">
          <div className="w-min(1220px,calc(100%-48px)) max-w-[1220px] mx-auto">
            <span className="eyebrow text-[#d95325] font-semibold mb-3">
              TheNST / Architecture
            </span>
            <h1 className="text-4xl sm:text-6xl font-medium leading-[0.98] tracking-[-2.5px] text-white mb-5 max-w-[850px]">
              The National Security Ecosystem.
            </h1>
            <p className="text-base sm:text-lg text-[#c5c9ce] leading-relaxed max-w-[640px] font-sans">
              A multi-layered institutional framework connecting talent, intelligence, capital, and sovereign doctrine into a resilient, high-readiness network.
            </p>
          </div>
        </section>

        {/* 4 Pillars Section */}
        <section className="bg-white py-20 border-b border-[#e5e3db]">
          <div className="w-min(1220px,calc(100%-48px)) max-w-[1220px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {components.map((c, i) => (
                <div key={i} className="p-8 border border-[#e5e3db] bg-[#f7f6f2] flex flex-col justify-between min-h-[260px] group hover:border-[#d95325] transition-all">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono uppercase text-[#737a83] mb-4">
                      <span className="text-[#d95325] font-bold">0{i + 1} / Pillar</span>
                      <span>{c.count}</span>
                    </div>
                    <h3 className="text-3xl font-medium tracking-tight text-[#171b22] group-hover:text-[#d95325] transition-colors mb-3">
                      {c.title}
                    </h3>
                    <p className="text-sm text-[#737a83] leading-relaxed font-sans">
                      {c.desc}
                    </p>
                  </div>
                  <Link
                    href={c.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d95325] uppercase tracking-wider mt-6"
                  >
                    Explore Pillar <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
