"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Compass, MapPin, Calendar, Briefcase, ArrowRight, ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { Navbar } from "@/components/nst/navbar";
import { Footer } from "@/components/nst/footer";
import { OPPORTUNITIES, Opportunity } from "@/lib/nst-data";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";

export default function OpportunitiesPage() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleSubmitApplication = async () => {
    if (!selectedOpp) return;

    if (!user) {
      toast.info("Please sign in to submit an expression of interest");
      router.push(`/login?redirect=/opportunities`);
      return;
    }

    try {
      setSubmitting(true);
      // Save application to Firestore requests collection
      await addDoc(collection(db, "requests"), {
        type: "opportunity_application",
        userId: user.uid,
        userEmail: user.email,
        userName: profile?.fullName || "Applicant",
        userRole: profile?.role || "guard",
        oppId: selectedOpp.id,
        oppTitle: selectedOpp.title,
        organisation: selectedOpp.organisation,
        category: selectedOpp.category,
        location: selectedOpp.location,
        status: "pending",
        createdAt: new Date().toISOString(),
        serverTimestamp: serverTimestamp(),
      });

      setApplied(true);
      toast.success("Expression of interest submitted to the desk!");
    } catch (err: any) {
      console.error("Application submission error:", err);
      toast.error("Submission failed: " + (err?.message || "Please try again"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f6f2] text-[#171b22]">
      <Navbar />

      <main className="flex-1">
        {/* Intro */}
        <section className="bg-[#171b22] text-white pt-16 pb-20 border-b border-[#3b414a]">
          <div className="w-min(1220px,calc(100%-48px)) max-w-[1220px] mx-auto">
            <span className="eyebrow text-[#d95325] font-semibold mb-3">
              TheNST / Opportunities & Field Missions
            </span>
            <h1 className="text-4xl sm:text-6xl font-medium leading-[0.98] tracking-[-2.5px] text-white mb-5 max-w-[850px]">
              Deploy capability where it matters most.
            </h1>
            <p className="text-base sm:text-lg text-[#c5c9ce] leading-relaxed max-w-[640px] font-sans">
              Discover verified project briefs, research contributor calls, tactical drone missions, and sovereign defense fellowships.
            </p>
          </div>
        </section>

        {/* Opportunities List */}
        <section className="bg-white py-16 border-b border-[#e5e3db]">
          <div className="w-min(1220px,calc(100%-48px)) max-w-[1220px] mx-auto">
            <div className="flex items-center justify-between border-b border-[#e5e3db] pb-3 mb-8 text-[11px] font-mono uppercase tracking-widest text-[#737a83]">
              <span>Active Institutional Postings ({OPPORTUNITIES.length})</span>
              <span>Direct Vetted Applications</span>
            </div>

            {/* List */}
            <div className="divide-y divide-[#e5e3db] border-t border-b border-[#e5e3db]">
              {OPPORTUNITIES.map((opp) => (
                <div
                  key={opp.id}
                  onClick={() => {
                    setSelectedOpp(opp);
                    setApplied(false);
                  }}
                  className="py-8 flex flex-col md:flex-row justify-between md:items-center gap-6 group hover:bg-[#f7f6f2] px-4 -mx-4 transition-all duration-200 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-[#737a83] mb-2">
                      <span className="text-[#d95325] font-semibold">{opp.type}</span>
                      <span>•</span>
                      <span>{opp.organisation}</span>
                      <span>•</span>
                      <span>{opp.location}</span>
                    </div>

                    <h3 className="text-2xl font-medium tracking-tight text-[#171b22] group-hover:text-[#d95325] transition-colors mb-2">
                      {opp.title}
                    </h3>

                    <p className="text-xs text-[#737a83] leading-relaxed max-w-xl font-sans">
                      {opp.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 self-start md:self-auto">
                    <div className="text-right hidden sm:block">
                      <span className="text-[10px] font-mono uppercase text-[#737a83] block">Status</span>
                      <b className="text-xs font-semibold text-emerald-700">{opp.date}</b>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#171b22] text-white text-xs font-semibold uppercase tracking-wider group-hover:bg-[#d95325] transition-colors">
                      <span>View Brief</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Opportunity Detail Modal */}
        {selectedOpp && (
          <div className="fixed inset-0 z-50 bg-[#111419]/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-[#e5e3db] max-w-2xl w-full p-8 sm:p-10 shadow-2xl relative animate-in fade-in zoom-in-95">
              <button
                type="button"
                onClick={() => setSelectedOpp(null)}
                className="absolute top-6 right-6 text-[#737a83] hover:text-[#171b22] text-xl font-bold"
              >
                ✕
              </button>

              <span className="eyebrow text-[#d95325] font-semibold mb-2">
                {selectedOpp.type} // {selectedOpp.category}
              </span>

              <h2 className="text-2xl sm:text-3xl font-medium text-[#171b22] tracking-tight mb-4">
                {selectedOpp.title}
              </h2>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono text-[#737a83] pb-4 mb-6 border-b border-[#e5e3db]">
                <div>
                  <span className="block text-[10px] uppercase text-[#9299a2]">Organisation</span>
                  <b className="text-[#171b22]">{selectedOpp.organisation}</b>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-[#9299a2]">Location</span>
                  <b className="text-[#171b22]">{selectedOpp.location}</b>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-[#9299a2]">Compensation</span>
                  <b className="text-[#171b22]">{selectedOpp.compensation || "Standard Institutional Rate"}</b>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-[#9299a2]">Timeline</span>
                  <b className="text-emerald-700">{selectedOpp.date}</b>
                </div>
              </div>

              <p className="text-sm text-[#4f555d] leading-relaxed mb-6 font-sans">
                {selectedOpp.description}
                <br /><br />
                Applications are reviewed by accredited commanders and desk officers.
              </p>

              {applied && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 mb-6">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Your expression of interest has been securely submitted to Firestore!</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-[#e5e3db]">
                <button
                  type="button"
                  onClick={() => setSelectedOpp(null)}
                  className="px-5 py-2 text-xs font-semibold text-[#737a83] hover:text-[#171b22] uppercase tracking-wider"
                >
                  Close
                </button>

                {!applied ? (
                  <button
                    type="button"
                    onClick={handleSubmitApplication}
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#d95325] hover:bg-[#bc3f18] uppercase tracking-wider shadow-sm disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Expression of Interest
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                ) : (
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#171b22] uppercase tracking-wider shadow-sm"
                  >
                    Go to Dashboard
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
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
