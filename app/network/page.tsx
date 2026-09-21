"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ShieldCheck, User, Building2, ArrowRight, ArrowUpRight, BadgeCheck } from "lucide-react";
import { Navbar } from "@/components/nst/navbar";
import { Footer } from "@/components/nst/footer";
import { NETWORK_PEOPLE, Person } from "@/lib/nst-data";

export default function NetworkPage() {
  const [search, setSearch] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All");

  const domains = ["All", "Strategic Affairs", "Defence Technology", "AI & Technology", "Counter-UAS", "Cybersecurity", "National Security"];

  const filteredPeople = NETWORK_PEOPLE.filter((p) => {
    const matchesDomain = selectedDomain === "All" || p.domain === selectedDomain;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.role.toLowerCase().includes(search.toLowerCase()) ||
      p.domain.toLowerCase().includes(search.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f6f2] text-[#171b22]">
      <Navbar />

      <main className="flex-1">
        {/* Intro */}
        <section className="bg-[#171b22] text-white pt-16 pb-20 border-b border-[#3b414a]">
          <div className="w-min(1220px,calc(100%-48px)) max-w-[1220px] mx-auto">
            <span className="eyebrow text-[#d95325] font-semibold mb-3">
              TheNST / People & Capability Network
            </span>
            <h1 className="text-4xl sm:text-6xl font-medium leading-[0.98] tracking-[-2.5px] text-white mb-5 max-w-[850px]">
              A verified network of security practitioners.
            </h1>
            <p className="text-base sm:text-lg text-[#c5c9ce] leading-relaxed max-w-[640px] font-sans">
              Connect with vetted security commanders, intelligence analysts, drone operators, and research fellows across sovereign institutions.
            </p>
          </div>
        </section>

        {/* Directory Section */}
        <section className="bg-white py-16 border-b border-[#e5e3db]">
          <div className="w-min(1220px,calc(100%-48px)) max-w-[1220px] mx-auto">
            {/* Search */}
            <div className="flex items-center border-b border-[#171b22] pb-3.5 mb-6 gap-3">
              <Search className="w-5 h-5 text-[#737a83]" />
              <input
                type="text"
                placeholder="Search by name, role, domain or clearance level..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-0 outline-none text-lg text-[#171b22] placeholder:text-[#737a83]/60 font-sans"
              />
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2 mb-12">
              {domains.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDomain(d)}
                  className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-150 ${
                    selectedDomain === d
                      ? "bg-[#171b22] text-white border border-[#171b22]"
                      : "bg-transparent text-[#737a83] border border-[#e5e3db] hover:border-[#171b22] hover:text-[#171b22]"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* List Heading */}
            <div className="flex items-center justify-between border-b border-[#e5e3db] pb-3 mb-6 text-[11px] font-mono uppercase tracking-widest text-[#737a83]">
              <span>Verified Personnel Directory ({filteredPeople.length})</span>
              <span>Sovereign Enclave Clearance</span>
            </div>

            {/* People Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 border-t border-[#e5e3db]">
              {filteredPeople.map((person) => (
                <div
                  key={person.id}
                  className="flex items-start gap-5 py-6 border-b border-[#e5e3db] group hover:bg-[#f7f6f2] px-3 -mx-3 transition-colors"
                >
                  {/* Initials Avatar */}
                  <div className="w-12 h-12 bg-[#171b22] text-white flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 group-hover:bg-[#d95325] transition-colors">
                    {person.initials}
                  </div>

                  {/* Person Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-medium text-[#171b22] group-hover:text-[#d95325] transition-colors truncate">
                        {person.name}
                      </h3>
                      <BadgeCheck className="w-4 h-4 text-[#d95325] flex-shrink-0" />
                    </div>

                    <p className="text-xs text-[#737a83] mb-1 font-medium font-sans">
                      {person.role} • {person.affiliation}
                    </p>

                    <div className="flex items-center gap-3 text-[10px] font-mono text-[#9299a2]">
                      <span>{person.domain}</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-semibold">{person.clearance}</span>
                    </div>
                  </div>

                  <Link
                    href="/register"
                    className="self-center text-[#d95325] p-2 hover:bg-[#d95325]/10 rounded transition-colors"
                    title="Connect on Platform"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Network CTA */}
        <section className="bg-[#171b22] text-white py-16 border-t border-[#3b414a]">
          <div className="w-min(1220px,calc(100%-48px)) max-w-[1220px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="eyebrow text-[#d95325] font-semibold mb-2">
                VERIFY YOUR PROFILE
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium text-white mb-2">
                Join the verified national security directory.
              </h2>
              <p className="text-sm text-[#c5c9ce] max-w-[540px]">
                Complete your cryptographic KYC, link your institutional affiliations, and access closed security networks.
              </p>
            </div>
            <Link
              href="/register"
              className="inline-flex items-center justify-center min-h-[44px] px-6 text-xs font-semibold tracking-wider text-white bg-[#d95325] hover:bg-[#bc3f18] transition-all uppercase whitespace-nowrap"
            >
              Verify Profile
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
