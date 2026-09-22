"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Compass, MapPin, Calendar, Briefcase, ArrowRight, ArrowUpRight, CheckCircle2, Filter } from "lucide-react";
import { Navbar } from "@/components/nst/navbar";
import { Footer } from "@/components/nst/footer";
import { OPPORTUNITIES, Opportunity } from "@/lib/nst-data";

const TYPES = ["All", "Collaboration", "Participation", "Project", "Fellowship"];

export default function OpportunitiesPage() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const filteredOpportunities = OPPORTUNITIES.filter((opp) => {
    const matchesType = selectedType === "All" || opp.type === selectedType;
    const matchesSearch =
      opp.title.toLowerCase().includes(search.toLowerCase()) ||
      opp.organisation.toLowerCase().includes(search.toLowerCase()) ||
      opp.description.toLowerCase().includes(search.toLowerCase()) ||
      opp.location.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f6f2] text-[#171b22]">
      <Navbar />

      <main className="flex-1">
        {/* Intro (Dark Band) */}
        <section className="bg-[#171b22] text-white pt-20 pb-24 border-b border-[#3b414a]">
          <div className="w-min(1240px,calc(100%-48px)) max-w-[1240px] mx-auto">
            <span className="text-[11px] font-mono uppercase tracking-[2px] text-[#d95325] font-semibold mb-3 block">
              TheNST / Opportunities & Field Missions
            </span>
            <h1 className="text-4xl sm:text-6xl font-medium leading-[0.98] tracking-[-2.5px] text-white mb-6 max-w-[850px]">
              Deploy Capability Where It Matters Most.
            </h1>
            <p className="text-base sm:text-lg text-[#c5c9ce] leading-relaxed max-w-[640px] font-sans">
              Discover verified project briefs, research contributor calls, operational drone missions, and sovereign defense fellowships.
            </p>
          </div>
        </section>

        {/* Opportunities List Section */}
        <section className="bg-white py-16 sm:py-20 border-b border-[#e5e3db]">
          <div className="w-min(1240px,calc(100%-48px)) max-w-[1240px] mx-auto">
            {/* Search & Type Filters */}
            <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between pb-8 mb-10 border-b border-[#e5e3db]">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737a83]" />
                <input
                  type="text"
                  placeholder="Search opportunities, organisations, locations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#f7f6f2] border border-[#e5e3db] text-xs text-[#171b22] placeholder:text-[#737a83] focus:outline-none focus:border-[#d95325] focus:bg-white transition-all font-sans"
                />
              </div>

              {/* Type Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedType(t)}
                    className={`px-3 py-1.5 text-xs font-medium transition-all ${
                      selectedType === t
                        ? "bg-[#171b22] text-white"
                        : "bg-[#f7f6f2] text-[#4f555d] hover:bg-[#e5e3db]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs font-mono uppercase tracking-widest text-[#737a83] mb-6 flex items-center justify-between">
              <span>Active Institutional Briefs ({filteredOpportunities.length})</span>
              <span>Direct Vetted Applications</span>
            </div>

            {/* Opportunities List */}
            {filteredOpportunities.length > 0 ? (
              <div className="divide-y divide-[#e5e3db] border-t border-b border-[#e5e3db] bg-white">
                {filteredOpportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="p-6 sm:p-8 flex flex-col md:flex-row justify-between md:items-center gap-6 hover:bg-[#faf9f5] transition-colors group"
                  >
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-[#737a83] mb-2">
                        <span className="text-[#d95325] font-semibold">{opp.type}</span>
                        <span>•</span>
                        <span>{opp.organisation}</span>
                        <span>•</span>
                        <span>{opp.location}</span>
                        <span>•</span>
                        <span>{opp.date}</span>
                      </div>

                      <Link
                        href={`/opportunities/${opp.id}`}
                        className="text-xl sm:text-2xl font-medium text-[#171b22] group-hover:text-[#d95325] transition-colors block mb-2"
                      >
                        {opp.title}
                      </Link>

                      <p className="text-xs sm:text-sm text-[#616872] leading-relaxed font-sans mb-3">
                        {opp.description}
                      </p>

                      {opp.compensation && (
                        <div className="text-[11px] font-mono text-[#737a83]">
                          Arrangement: <span className="text-[#171b22] font-semibold">{opp.compensation}</span>
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/opportunities/${opp.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#171b22] group-hover:text-[#d95325] whitespace-nowrap self-start md:self-center transition-colors"
                    >
                      <span>View Brief</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-[#faf9f5] border border-[#e5e3db] p-8">
                <Compass className="w-10 h-10 text-[#737a83] mx-auto mb-4 stroke-1" />
                <h3 className="text-lg font-medium text-[#171b22] mb-2">No opportunities in this category yet</h3>
                <p className="text-xs text-[#737a83] max-w-sm mx-auto mb-6">
                  No active institutional briefs currently match your search criteria. Check back as new calls are published.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSelectedType("All");
                  }}
                  className="px-4 py-2 bg-[#171b22] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#d95325] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
