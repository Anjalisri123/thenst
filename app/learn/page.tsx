"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, BookOpen, Clock, User, ArrowRight, ArrowUpRight, CheckCircle2, Filter, Layers, GraduationCap } from "lucide-react";
import { Navbar } from "@/components/nst/navbar";
import { Footer } from "@/components/nst/footer";
import { COURSES, Course } from "@/lib/nst-data";

const CATEGORIES = [
  "All",
  "National Security",
  "Cybersecurity",
  "Emerging Technology",
  "Defence Technology",
  "Strategic Affairs",
  "AI & Technology"
];

const LEVELS = ["All", "Foundational", "Intermediate", "Advanced"];

export default function LearnPage() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const filteredCourses = COURSES.filter((c) => {
    const matchesCat = selectedCat === "All" || c.category === selectedCat;
    const matchesLevel = selectedLevel === "All" || c.level === selectedLevel;
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesLevel && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f6f2] text-[#171b22]">
      <Navbar />

      <main className="flex-1">
        {/* Intro (Dark Band) */}
        <section className="bg-[#171b22] text-white pt-20 pb-24 border-b border-[#3b414a]">
          <div className="w-min(1240px,calc(100%-48px)) max-w-[1240px] mx-auto">
            <span className="text-[11px] font-mono uppercase tracking-[2px] text-[#d95325] font-semibold mb-3 block">
              TheNST / Learning & Professional Education
            </span>
            <h1 className="text-4xl sm:text-6xl font-medium leading-[0.98] tracking-[-2.5px] text-white mb-6 max-w-[850px]">
              Structured Curricula for the Security Profession.
            </h1>
            <p className="text-base sm:text-lg text-[#c5c9ce] leading-relaxed max-w-[640px] font-sans">
              Rigorous, accredited courses covering doctrine, cyber warfare, autonomous systems, intelligence analysis and strategic geopolitics.
            </p>
          </div>
        </section>

        {/* Catalog Section */}
        <section className="bg-white py-16 sm:py-20 border-b border-[#e5e3db]">
          <div className="w-min(1240px,calc(100%-48px)) max-w-[1240px] mx-auto">
            {/* Search & Filters */}
            <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between pb-8 mb-10 border-b border-[#e5e3db]">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737a83]" />
                <input
                  type="text"
                  placeholder="Search courses, keywords, topics..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#f7f6f2] border border-[#e5e3db] text-xs text-[#171b22] placeholder:text-[#737a83] focus:outline-none focus:border-[#d95325] focus:bg-white transition-all font-sans"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCat(cat)}
                    className={`px-3 py-1.5 text-xs font-medium transition-all ${
                      selectedCat === cat
                        ? "bg-[#171b22] text-white"
                        : "bg-[#f7f6f2] text-[#4f555d] hover:bg-[#e5e3db]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Level Filter Sub-bar */}
            <div className="flex items-center justify-between pb-6 mb-8 text-xs font-mono text-[#737a83] border-b border-[#e5e3db]/60">
              <div className="flex items-center gap-3">
                <span className="uppercase tracking-wider">Level Filter:</span>
                {LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-2 py-0.5 transition-colors ${
                      selectedLevel === lvl ? "text-[#d95325] font-bold underline" : "hover:text-[#171b22]"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
              <span>Showing {filteredCourses.length} of {COURSES.length} Courses</span>
            </div>

            {/* Course Cards Grid */}
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((c) => (
                  <div
                    key={c.id}
                    className="bg-[#faf9f5] border border-[#e5e3db] p-8 flex flex-col justify-between hover:border-[#171b22]/40 transition-all duration-200"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#d95325] font-semibold">
                          {c.category}
                        </span>
                        <span className="text-[10px] font-mono text-[#737a83] uppercase">
                          {c.level}
                        </span>
                      </div>

                      <h3 className="text-xl font-medium tracking-tight text-[#171b22] mb-3">
                        {c.title}
                      </h3>

                      <p className="text-xs text-[#616872] leading-relaxed font-sans mb-6">
                        {c.description}
                      </p>

                      <div className="space-y-1.5 mb-6 text-[11px] font-sans text-[#737a83] border-t border-[#e5e3db] pt-4">
                        <div className="flex items-center justify-between">
                          <span>Duration:</span>
                          <span className="font-mono text-[#171b22]">{c.duration}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Instructor:</span>
                          <span className="font-mono text-[#171b22]">{c.instructor}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#e5e3db]">
                      <Link
                        href={`/learn/${c.id}`}
                        className="inline-flex items-center justify-between w-full text-xs font-semibold uppercase tracking-wider text-[#d95325] hover:text-[#bc3f18]"
                      >
                        <span>View Syllabus & Enrol</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Realistic Empty State */
              <div className="text-center py-20 bg-[#faf9f5] border border-[#e5e3db] p-8">
                <BookOpen className="w-10 h-10 text-[#737a83] mx-auto mb-4 stroke-1" />
                <h3 className="text-lg font-medium text-[#171b22] mb-2">No courses found</h3>
                <p className="text-xs text-[#737a83] max-w-sm mx-auto mb-6">
                  No curricula match your selected search terms or filters. Try adjusting your criteria.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSelectedCat("All");
                    setSelectedLevel("All");
                  }}
                  className="px-4 py-2 bg-[#171b22] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#d95325] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Educator Callout */}
            <div className="mt-16 p-8 sm:p-12 bg-[#f7f6f2] border border-[#e5e3db] flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#d95325] font-semibold mb-2 block">
                  Faculty Collaboration
                </span>
                <h3 className="text-2xl font-medium tracking-tight text-[#171b22] mb-2">
                  Are you a subject matter expert or experienced instructor?
                </h3>
                <p className="text-xs sm:text-sm text-[#616872] leading-relaxed max-w-xl font-sans">
                  Design and lead structured courses on TheNST Learn. Submit a course proposal to the academic council.
                </p>
              </div>
              <Link
                href="/educator"
                className="inline-flex items-center justify-center min-h-[44px] px-6 text-xs font-semibold tracking-wider text-white bg-[#171b22] hover:bg-[#d95325] transition-all uppercase whitespace-nowrap shadow-sm"
              >
                Become an Educator →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
