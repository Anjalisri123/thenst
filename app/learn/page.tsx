"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, BookOpen, Clock, User, ArrowRight, ArrowUpRight, CheckCircle2, Filter, Loader2 } from "lucide-react";
import { Navbar } from "@/components/nst/navbar";
import { Footer } from "@/components/nst/footer";
import { COURSES, Course } from "@/lib/nst-data";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";

const CATEGORIES = [
  "All",
  "National Security",
  "Cybersecurity",
  "Emerging Technology",
  "Defence Technology",
  "Strategic Affairs",
  "AI & Technology"
];

export default function LearnPage() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolledSuccess, setEnrolledSuccess] = useState(false);

  const filteredCourses = COURSES.filter((c) => {
    const matchesCat = selectedCat === "All" || c.category === selectedCat;
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleEnrol = async () => {
    if (!selectedCourse) return;

    if (!user) {
      toast.info("Please sign in to enrol in this course");
      router.push(`/login?redirect=/learn`);
      return;
    }

    try {
      setEnrolling(true);
      // Create or update enrollment record in Firestore
      const enrollmentRef = doc(db, "enrollments", `${user.uid}_${selectedCourse.id}`);
      await setDoc(
        enrollmentRef,
        {
          userId: user.uid,
          userEmail: user.email,
          userName: profile?.fullName || "Student",
          courseId: selectedCourse.id,
          courseTitle: selectedCourse.title,
          category: selectedCourse.category,
          level: selectedCourse.level,
          duration: selectedCourse.duration,
          status: "active",
          progress: 0,
          enrolledAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      setEnrolledSuccess(true);
      toast.success(`Successfully enrolled in ${selectedCourse.title}!`);
    } catch (err: any) {
      console.error("Enrollment error:", err);
      toast.error("Failed to enrol: " + (err?.message || "Please try again"));
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f6f2] text-[#171b22]">
      <Navbar />

      <main className="flex-1">
        {/* Page Intro Banner (Dark Band) */}
        <section className="bg-[#171b22] text-white pt-16 pb-20 border-b border-[#3b414a]">
          <div className="w-min(1220px,calc(100%-48px)) max-w-[1220px] mx-auto">
            <span className="eyebrow text-[#d95325] font-semibold mb-3">
              TheNST / Learn
            </span>
            <h1 className="text-4xl sm:text-6xl font-medium leading-[0.98] tracking-[-2.5px] text-white mb-5 max-w-[850px]">
              Structured learning for the national security profession.
            </h1>
            <p className="text-base sm:text-lg text-[#c5c9ce] leading-relaxed max-w-[640px] font-sans">
              From foundations of national security to cyber deterrence, electronic warfare and AI strategic stability. Built by practitioners and sovereign research faculty.
            </p>
          </div>
        </section>

        {/* Course Catalog & Filter Section */}
        <section className="bg-white py-16 border-b border-[#e5e3db]">
          <div className="w-min(1220px,calc(100%-48px)) max-w-[1220px] mx-auto">
            {/* Search Controls */}
            <div className="flex items-center border-b border-[#171b22] pb-3.5 mb-6 gap-3">
              <Search className="w-5 h-5 text-[#737a83]" />
              <input
                type="text"
                placeholder="Search courses, modules, or technology areas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-0 outline-none text-lg text-[#171b22] placeholder:text-[#737a83]/60 font-sans"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-2 mb-12">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCat(cat)}
                  className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-150 ${
                    selectedCat === cat
                      ? "bg-[#171b22] text-white border border-[#171b22]"
                      : "bg-transparent text-[#737a83] border border-[#e5e3db] hover:border-[#171b22] hover:text-[#171b22]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Heading Summary */}
            <div className="flex items-center justify-between border-b border-[#e5e3db] pb-3 mb-8 text-[11px] font-mono uppercase tracking-widest text-[#737a83]">
              <span>Showing {filteredCourses.length} Structured Pathways</span>
              <span>All Courses Certified</span>
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e5e3db] border border-[#e5e3db]">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => {
                    setSelectedCourse(course);
                    setEnrolledSuccess(false);
                  }}
                  className="bg-white p-7 sm:p-8 flex flex-col justify-between min-h-[340px] hover:bg-[#efede6] transition-all duration-200 cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#737a83] mb-8">
                      <span className="text-[#d95325] font-semibold">{course.category}</span>
                      <span>{course.level}</span>
                    </div>

                    <h3 className="text-2xl font-medium tracking-[-0.8px] text-[#171b22] group-hover:text-[#d95325] transition-colors mb-3 leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-xs text-[#737a83] leading-relaxed line-clamp-3 font-sans">
                      {course.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-4 text-[11px] font-mono text-[#737a83] pt-6 mb-4 border-t border-[#e5e3db]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {course.duration}
                      </span>
                      <span>•</span>
                      <span>{course.instructor}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-semibold text-[#d95325] uppercase tracking-wider">
                      <span>Course Syllabus & Enrol</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Educator Banner Strip */}
        <section className="bg-[#171b22] text-white py-16 border-t border-[#3b414a]">
          <div className="w-min(1220px,calc(100%-48px)) max-w-[1220px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="eyebrow text-[#d95325] font-semibold mb-2">
                CONTRIBUTE CURRICULA
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium text-white mb-2">
                Are you a domain expert or defense educator?
              </h2>
              <p className="text-sm text-[#c5c9ce] max-w-[520px]">
                Create accredited masterclasses and course tracks on TheNST Learn. Reach officers, analysts and researchers across institutions.
              </p>
            </div>
            <Link
              href="/educator"
              className="inline-flex items-center justify-center min-h-[44px] px-6 text-xs font-semibold tracking-wider text-white bg-[#d95325] hover:bg-[#bc3f18] transition-all uppercase whitespace-nowrap"
            >
              Become an Educator
            </Link>
          </div>
        </section>

        {/* Course Detail / Enrolment Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 z-50 bg-[#111419]/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-[#e5e3db] max-w-2xl w-full p-8 sm:p-10 shadow-2xl relative animate-in fade-in zoom-in-95">
              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="absolute top-6 right-6 text-[#737a83] hover:text-[#171b22] text-xl font-bold"
              >
                ✕
              </button>

              <span className="eyebrow text-[#d95325] font-semibold mb-2">
                {selectedCourse.category} // {selectedCourse.level}
              </span>

              <h2 className="text-2xl sm:text-3xl font-medium text-[#171b22] tracking-tight mb-4">
                {selectedCourse.title}
              </h2>

              <p className="text-sm text-[#737a83] leading-relaxed mb-6 font-sans">
                {selectedCourse.description}
              </p>

              <div className="flex items-center gap-6 text-xs font-mono text-[#737a83] pb-4 mb-6 border-b border-[#e5e3db]">
                <span>Duration: {selectedCourse.duration}</span>
                <span>Instructor: {selectedCourse.instructor}</span>
              </div>

              {selectedCourse.modules && (
                <div className="mb-8">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#171b22] font-semibold mb-3">
                    Curriculum Modules:
                  </h4>
                  <ul className="space-y-2">
                    {selectedCourse.modules.map((m, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#4f555d] font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#d95325] mt-0.5 flex-shrink-0" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {enrolledSuccess && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 mb-6">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Enrolment registered successfully in Firestore!</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-[#e5e3db]">
                <button
                  type="button"
                  onClick={() => setSelectedCourse(null)}
                  className="px-5 py-2.5 text-xs font-semibold text-[#737a83] hover:text-[#171b22] uppercase tracking-wider"
                >
                  Close
                </button>
                {enrolledSuccess ? (
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#171b22] uppercase tracking-wider shadow-sm"
                  >
                    Go to My Learning
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={handleEnrol}
                    disabled={enrolling}
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#d95325] hover:bg-[#bc3f18] uppercase tracking-wider shadow-sm disabled:opacity-70"
                  >
                    {enrolling ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      <>
                        Enrol in Pathway
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
