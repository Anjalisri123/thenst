"use client";

import React from "react";
import Link from "next/link";
import { Shield, Target, Award, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/nst/navbar";
import { Footer } from "@/components/nst/footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f6f2] text-[#171b22]">
      <Navbar />

      <main className="flex-1">
        {/* Intro */}
        <section className="bg-[#171b22] text-white pt-16 pb-20 border-b border-[#3b414a]">
          <div className="w-min(1220px,calc(100%-48px)) max-w-[1220px] mx-auto">
            <span className="eyebrow text-[#d95325] font-semibold mb-3">
              TheNST / About the Institution
            </span>
            <h1 className="text-4xl sm:text-6xl font-medium leading-[0.98] tracking-[-2.5px] text-white mb-5 max-w-[850px]">
              Institutional charter & mission.
            </h1>
            <p className="text-base sm:text-lg text-[#c5c9ce] leading-relaxed max-w-[640px] font-sans">
              The National Security Think Tank is developed as a place for serious learning, clear analysis and professional connection across the security domain.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="bg-white py-20 border-b border-[#e5e3db]">
          <div className="w-min(1220px,calc(100%-48px)) max-w-[1220px] mx-auto">
            <div className="max-w-3xl">
              <span className="eyebrow text-[#737a83] mb-4">
                CORE PRINCIPLES
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#171b22] mb-6">
                Independent, verified and capability-driven.
              </h2>
              <div className="prose text-base text-[#4f555d] leading-relaxed space-y-4 font-sans mb-12">
                <p>
                  Modern national security challenges demand cross-disciplinary collaboration. The traditional silos separating tactical personnel, academic researchers, private defense tech innovators, and institutional commanders can no longer keep pace with asymmetric threat environments.
                </p>
                <p>
                  TheNST provides a unified verification engine, structured knowledge repository, and mission deployment hub that operates with uncompromising rigor and sovereign assurance.
                </p>
              </div>

              {/* Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#e5e3db] pt-8">
                <div className="p-6 border border-[#e5e3db] bg-[#f7f6f2]">
                  <h4 className="text-lg font-medium text-[#171b22] mb-2">Zero-Knowledge Verification</h4>
                  <p className="text-xs text-[#737a83]">Cryptographic KYC and clearance validation without exposing sensitive individual identities.</p>
                </div>
                <div className="p-6 border border-[#e5e3db] bg-[#f7f6f2]">
                  <h4 className="text-lg font-medium text-[#171b22] mb-2">Peer-Reviewed Doctrine</h4>
                  <p className="text-xs text-[#737a83]">All intelligence monographs and course tracks undergo double-blind review by senior defense advisors.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
