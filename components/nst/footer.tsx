"use client";

import React from "react";
import Link from "next/link";
import { Shield, ArrowUpRight, Radio } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#111419] text-[#cbd0d5] pt-16 pb-8 border-t border-[#30353d] mt-auto">
      <div className="w-min(1180px,calc(100%-48px)) max-w-[1180px] mx-auto">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 pb-14">
          {/* Column 1: Brand & Charter */}
          <div className="flex flex-col items-start pr-0 lg:pr-8">
            <Link href="/" className="flex items-baseline gap-0 text-[24px] font-medium tracking-[-1.1px] text-white">
              <span className="font-sans font-bold">The</span>
              <span className="font-serif italic font-normal text-[28px] tracking-[-0.5px]">NST</span>
              <small className="text-[8px] tracking-[1.4px] text-[#858c95] ml-2.5 font-bold uppercase">
                INSTITUTIONAL
              </small>
            </Link>
            <p className="text-[13px] text-[#858c95] leading-relaxed max-w-[300px] mt-4 font-sans">
              The National Security Think Tank connects verified personnel, research institutes, sovereign organisations, and cutting-edge capability across the security domain.
            </p>
            <div className="mt-6 flex items-center gap-2 text-[10px] font-mono tracking-wider text-[#9299a2] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#d95325] animate-pulse" />
              <span>Sovereign Security Network Active</span>
            </div>
          </div>

          {/* Column 2: Domains */}
          <div className="flex flex-col gap-3 text-[13px]">
            <b className="text-white text-xs uppercase tracking-widest font-semibold mb-1">
              Domains
            </b>
            <Link href="/learn" className="hover:text-[#d95325] transition-colors">TheNST Learn</Link>
            <Link href="/research" className="hover:text-[#d95325] transition-colors">Research Desk</Link>
            <Link href="/network" className="hover:text-[#d95325] transition-colors">People & Network</Link>
            <Link href="/opportunities" className="hover:text-[#d95325] transition-colors">Opportunities</Link>
            <Link href="/ecosystem" className="hover:text-[#d95325] transition-colors">Ecosystem Architecture</Link>
          </div>

          {/* Column 3: Roles */}
          <div className="flex flex-col gap-3 text-[13px]">
            <b className="text-white text-xs uppercase tracking-widest font-semibold mb-1">
              Role Profiles
            </b>
            <Link href="/security-professional" className="hover:text-[#d95325] transition-colors">Security Professional</Link>
            <Link href="/drone-pilot" className="hover:text-[#d95325] transition-colors">Drone Pilot</Link>
            <Link href="/educator" className="hover:text-[#d95325] transition-colors">Educator</Link>
            <Link href="/organisation" className="hover:text-[#d95325] transition-colors">Organisation</Link>
            <Link href="/researcher" className="hover:text-[#d95325] transition-colors">Researcher</Link>
            <Link href="/learner" className="hover:text-[#d95325] transition-colors">Learner</Link>
          </div>

          {/* Column 4: Institutional */}
          <div className="flex flex-col gap-3 text-[13px]">
            <b className="text-white text-xs uppercase tracking-widest font-semibold mb-1">
              Institution
            </b>
            <Link href="/about" className="hover:text-[#d95325] transition-colors">About TheNST</Link>
            <Link href="/ecosystem" className="hover:text-[#d95325] transition-colors">Methodology & Charter</Link>
            <Link href="/login" className="hover:text-[#d95325] transition-colors">Platform Sign In</Link>
            <Link href="/register" className="hover:text-[#d95325] transition-colors">Institutional Onboarding</Link>
            <a href="mailto:intelligence@thenst.co" className="hover:text-[#d95325] transition-colors">Direct Desk Briefing</a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#30353d] pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#737a83]">
          <p>© {new Date().getFullYear()} TheNST. All rights reserved. Dedicated to uncompromising national capability.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-[#d95325] transition-colors">Privacy & Sovereignty</Link>
            <Link href="/about" className="hover:text-[#d95325] transition-colors">Terms of Briefing</Link>
            <Link href="/about" className="hover:text-[#d95325] transition-colors">Security Disclosures</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
