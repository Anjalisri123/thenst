"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/nst/navbar";
import { Footer } from "@/components/nst/footer";
import { ROLE_COPY } from "@/lib/nst-data";

export function RolePageView({ roleKey }: { roleKey: string }) {
  const role = ROLE_COPY[roleKey] || ROLE_COPY["security-professional"];

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f6f2] text-[#171b22]">
      <Navbar />

      <main className="flex-1">
        {/* Role Hero (Dark Band) */}
        <section className="bg-[#171b22] text-white pt-16 pb-20 border-b border-[#3b414a]">
          <div className="w-min(1220px,calc(100%-48px)) max-w-[1220px] mx-auto">
            <span className="eyebrow text-[#d95325] font-semibold mb-3">
              Role Profile // {role.subtitle}
            </span>
            <h1 className="text-4xl sm:text-6xl font-medium leading-[0.98] tracking-[-2.5px] text-white mb-5 max-w-[850px]">
              {role.heroTitle}
            </h1>
            <p className="text-base sm:text-lg text-[#c5c9ce] leading-relaxed max-w-[640px] font-sans mb-8">
              {role.heroDesc}
            </p>
            <Link
              href="/register"
              className="inline-flex items-center justify-center min-h-[46px] px-7 text-xs font-semibold tracking-wider text-white bg-[#d95325] hover:bg-[#bc3f18] uppercase transition-all shadow-md"
            >
              Get Started as {role.title}
            </Link>
          </div>
        </section>

        {/* 5-Step Integration Roadmap */}
        <section className="bg-white py-20 border-b border-[#e5e3db]">
          <div className="w-min(1220px,calc(100%-48px)) max-w-[1220px] mx-auto">
            <div className="mb-12">
              <span className="eyebrow text-[#737a83]">Integration Process</span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#171b22] mt-2">
                Five steps to connect and deploy.
              </h2>
            </div>

            {/* Timeline Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[#e5e3db] border-y border-[#e5e3db] my-8">
              {role.steps.map((step) => (
                <div key={step.num} className="p-6 md:p-8 flex flex-col justify-between min-h-[220px]">
                  <span className="text-sm font-mono font-bold text-[#d95325] mb-6 block">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium text-[#171b22] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#737a83] leading-relaxed font-sans">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="pt-10">
              <span className="eyebrow text-[#737a83] mb-4">
                CAPABILITY PRIVILEGES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {role.benefits.map((b, i) => (
                  <div key={i} className="p-5 border border-[#e5e3db] bg-[#f7f6f2] flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#d95325] flex-shrink-0" />
                    <span className="text-xs font-semibold text-[#171b22]">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
