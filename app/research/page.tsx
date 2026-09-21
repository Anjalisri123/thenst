"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, BookOpen, Clock, FileText, ArrowRight, ArrowUpRight, ShieldCheck, Download, Share2, Loader2, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/nst/navbar";
import { Footer } from "@/components/nst/footer";
import { ARTICLES, Article } from "@/lib/nst-data";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";

export default function ResearchPage() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [requesting, setRequesting] = useState(false);
  const [requested, setRequested] = useState(false);

  const handleRequestBriefingPack = async () => {
    if (!selectedArticle) return;

    if (!user) {
      toast.info("Please sign in to request briefing packs");
      router.push(`/login?redirect=/research`);
      return;
    }

    try {
      setRequesting(true);
      await addDoc(collection(db, "requests"), {
        type: "briefing_pack_request",
        userId: user.uid,
        userEmail: user.email,
        userName: profile?.fullName || "Researcher",
        articleId: selectedArticle.id,
        articleTitle: selectedArticle.title,
        category: selectedArticle.category,
        author: selectedArticle.author,
        status: "approved",
        createdAt: new Date().toISOString(),
        serverTimestamp: serverTimestamp(),
      });

      setRequested(true);
      toast.success("Briefing pack request confirmed! Document access granted.");
    } catch (err: any) {
      console.error("Briefing pack request error:", err);
      toast.error("Request failed: " + (err?.message || "Please try again"));
    } finally {
      setRequesting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f6f2] text-[#171b22]">
      <Navbar />

      <main className="flex-1">
        {/* Intro (Dark Band) */}
        <section className="bg-[#171b22] text-white pt-16 pb-20 border-b border-[#3b414a]">
          <div className="w-min(1220px,calc(100%-48px)) max-w-[1220px] mx-auto">
            <span className="eyebrow text-[#d95325] font-semibold mb-3">
              TheNST / Research Desk
            </span>
            <h1 className="text-4xl sm:text-6xl font-medium leading-[0.98] tracking-[-2.5px] text-white mb-5 max-w-[850px]">
              Independent analysis. Rigorous inquiry.
            </h1>
            <p className="text-base sm:text-lg text-[#c5c9ce] leading-relaxed max-w-[640px] font-sans">
              Peer-reviewed intelligence briefs, doctrinal analyses, and technology assessments covering multi-domain security, autonomous systems, and strategic geopolitics.
            </p>
          </div>
        </section>

        {/* Featured Monograph & Archive */}
        <section className="bg-white py-16 border-b border-[#e5e3db]">
          <div className="w-min(1220px,calc(100%-48px)) max-w-[1220px] mx-auto">
            {/* Featured Monograph Banner */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[#171b22] text-white p-8 sm:p-12 mb-16 shadow-lg">
              <div className="flex flex-col justify-center items-start">
                <span className="eyebrow text-[#d95325] font-semibold mb-3">
                  Lead Intelligence Monograph // Q1 2026
                </span>
                <h2 className="text-2xl sm:text-4xl font-medium leading-tight tracking-[-1.2px] text-white mb-4">
                  {ARTICLES[0].title}
                </h2>
                <p className="text-sm text-[#b8bec5] leading-relaxed mb-6 font-sans">
                  {ARTICLES[0].summary}
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-[#9299a2] mb-8">
                  <span>{ARTICLES[0].date}</span>
                  <span>•</span>
                  <span>{ARTICLES[0].readTime}</span>
                  <span>•</span>
                  <span className="text-[#d95325]">{ARTICLES[0].author}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedArticle(ARTICLES[0]);
                    setRequested(false);
                  }}
                  className="inline-flex items-center justify-center min-h-[44px] px-6 text-xs font-semibold tracking-wider text-white bg-[#d95325] hover:bg-[#bc3f18] uppercase transition-all"
                >
                  Read Complete Monograph
                </button>
              </div>

              <div className="relative min-h-[280px]">
                <img
                  src={ARTICLES[0].image}
                  alt="Maritime Research"
                  className="w-full h-full object-cover grayscale-[25%]"
                />
              </div>
            </div>

            {/* Research Archive Heading */}
            <div className="flex items-center justify-between border-b border-[#e5e3db] pb-3 mb-8 text-[11px] font-mono uppercase tracking-widest text-[#737a83]">
              <span>Research Monographs & Intelligence Briefs</span>
              <span>Open-Access Repository</span>
            </div>

            {/* Article Rows */}
            <div className="divide-y divide-[#e5e3db] border-t border-b border-[#e5e3db]">
              {ARTICLES.map((article) => (
                <div
                  key={article.id}
                  onClick={() => {
                    setSelectedArticle(article);
                    setRequested(false);
                  }}
                  className="py-8 flex flex-col md:flex-row justify-between md:items-center gap-6 group hover:bg-[#f7f6f2] px-4 -mx-4 transition-all duration-200 cursor-pointer"
                >
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-[#737a83] mb-2">
                      <span className="text-[#d95325] font-semibold">{article.category}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.author}</span>
                    </div>

                    <h3 className="text-2xl font-medium tracking-tight text-[#171b22] group-hover:text-[#d95325] transition-colors mb-2">
                      {article.title}
                    </h3>

                    <p className="text-xs text-[#737a83] leading-relaxed font-sans line-clamp-2">
                      {article.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-semibold text-[#d95325] uppercase tracking-wider whitespace-nowrap self-start md:self-auto">
                    <span>Read Brief</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Article Reader Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 bg-[#111419]/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-[#e5e3db] max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 sm:p-12 shadow-2xl relative animate-in fade-in zoom-in-95">
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 text-[#737a83] hover:text-[#171b22] text-xl font-bold"
              >
                ✕
              </button>

              <span className="eyebrow text-[#d95325] font-semibold mb-2">
                {selectedArticle.category} // TheNST Research Desk
              </span>

              <h2 className="text-2xl sm:text-3xl font-medium text-[#171b22] tracking-tight mb-4">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-4 text-xs font-mono text-[#737a83] pb-4 mb-6 border-b border-[#e5e3db]">
                <span>Author: {selectedArticle.author}</span>
                <span>•</span>
                <span>Date: {selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              {selectedArticle.image && (
                <div className="mb-6 aspect-[16/9] w-full overflow-hidden bg-black">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="prose max-w-none text-sm leading-relaxed text-[#4f555d] space-y-4 font-sans mb-8">
                <p className="font-semibold text-base text-[#171b22]">
                  {selectedArticle.summary}
                </p>
                <p>
                  Contemporary operational doctrines in the Indo-Pacific theatre increasingly require seamless sensor-to-shooter telemetry networks that can withstand aggressive electronic warfare countermeasures and multi-spectral jamming.
                </p>
                <p>
                  As autonomous platforms proliferate across subsea, surface, and low-earth orbit domains, sovereign defense institutions must establish rigorous verification standards and cognitive-load reduction frameworks for strategic commanders.
                </p>
                <p>
                  TheNST Research Desk continues to monitor open telemetry benchmarks, satellite positioning vulnerabilities, and supply chain interdictions across critical semiconductor clusters.
                </p>
              </div>

              {requested && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 mb-6">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Briefing request logged in Firestore. Full confidential package sent to your dashboard.</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-6 border-t border-[#e5e3db]">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2 text-xs font-semibold text-[#737a83] hover:text-[#171b22] uppercase tracking-wider"
                >
                  Close Document
                </button>
                {!requested ? (
                  <button
                    type="button"
                    onClick={handleRequestBriefingPack}
                    disabled={requesting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#d95325] hover:bg-[#bc3f18] uppercase tracking-wider shadow-sm disabled:opacity-70"
                  >
                    {requesting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Logging Request...
                      </>
                    ) : (
                      <>
                        Request Full Briefing Pack
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                ) : (
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#171b22] uppercase tracking-wider shadow-sm"
                  >
                    View in Dashboard
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
