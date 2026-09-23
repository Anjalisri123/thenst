"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Flame, Clock3, Award } from "lucide-react";
import { Header } from "@/components/learn/layout/Header";
import { Footer } from "@/components/learn/layout/Footer";
import { Sidebar } from "@/components/learn/layout/Sidebar";
import { LoadingScreen } from "@/components/learn/ui/LoadingScreen";
import { BannerCarousel } from "@/components/learn/banner/BannerCarousel";
import { CourseGrid } from "@/components/learn/courses/CourseGrid";
import { BannerSkeleton, CourseCardSkeleton } from "@/components/learn/ui/Skeleton";
import { AvatarRenderer } from "@/components/learn/avatar/AvatarRenderer";
import { useAvatar } from "@/context/AvatarContext";
import { useAuth } from "@/context/AuthContext";
import { useNow, formatLongDate, formatTime } from "@/hooks/useNow";
import { emptyStats, greetingFor, subtitleFor, formatHours } from "@/lib/learn/stats";
import { banners } from "@/data/banners";
import { Course } from "@/lib/learn/types";
import { getCourses } from "@/lib/learn/courses";


const categories = ["All", "AI / ML", "Web Dev", "Data", "Blockchain"];

const chipAccent: Record<string, { soft: string; text: string }> = {
  amber: { soft: "bg-amber-soft", text: "text-amber" },
  sky: { soft: "bg-sky-soft", text: "text-sky" },
  emerald: { soft: "bg-emerald-soft", text: "text-emerald" },
};

function StatChip({ icon: Icon, label, value, accent }: { icon: React.ElementType; label: string; value: string; accent: keyof typeof chipAccent }) {
  const a = chipAccent[accent];
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 shadow-card">
      <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${a.soft} ${a.text}`}><Icon size={18} /></span>
      <div>
        <p className="font-display text-lg font-bold leading-none text-[var(--ink)]">{value}</p>
        <p className="mt-0.5 text-xs text-[var(--ink-soft)]">{label}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [booting, setBooting] = useState(true);
  const [loadingContent, setLoadingContent] = useState(true);
  const [active, setActive] = useState("All");
  const [courses, setCourses] = useState<Course[]>([]);
  const { avatar } = useAvatar();
  const { user } = useAuth();
  const now = useNow();
  const firstName = user ? user.full_name.split(" ")[0] : "there";
  // Real values arrive from the backend later; everyone starts at zero for now.
  const stats = emptyStats;
  const greeting = now ? greetingFor(now.getHours()) : "Welcome";
  const subtitle = subtitleFor(!!user, stats);

  useEffect(() => {
    const t1 = setTimeout(() => setBooting(false), 1400);
    const t2 = setTimeout(() => setLoadingContent(false), 2000);
    getCourses().then(setCourses);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const filtered = active === "All" ? courses : courses.filter((c) => c.category === active);

  return (
    <>
      <AnimatePresence>{booting && <LoadingScreen />}</AnimatePresence>

      <div className="min-h-screen">
        <Sidebar />
        <div className="lg:pl-64">
          <Header />
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <section className="mb-10">
              <div className="mb-5 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <div className="shrink-0 rounded-full shadow-card">
                    <AvatarRenderer config={avatar} size={64} />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-soft px-3 py-1 text-xs font-semibold text-sky">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky" />
                      {now ? `${formatLongDate(now)} · ${formatTime(now)}` : "\u00A0"}
                    </span>
                    <h1 className="mt-2 font-display text-2xl font-bold leading-tight text-[var(--ink)] sm:text-3xl">
                      {greeting}, <span className="bg-gradient-to-r from-sky to-violet bg-clip-text text-transparent">{firstName}</span>
                    </h1>
                    <p className="mt-1 text-[var(--ink-soft)]">{subtitle}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <StatChip icon={Flame} label="Day streak" value={String(stats.dayStreak)} accent="amber" />
                  <StatChip icon={Clock3} label="Hours learned" value={formatHours(stats.hoursLearned)} accent="sky" />
                  <StatChip icon={Award} label="Certificates" value={String(stats.certificates)} accent="emerald" />
                </div>
              </div>
              {loadingContent ? <BannerSkeleton /> : <BannerCarousel cards={banners} />}
            </section>

            <section>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <h2 className="font-display text-xl font-bold text-[var(--ink)] sm:text-2xl">Courses Available</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button key={cat} onClick={() => setActive(cat)}
                      className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${active === cat ? "bg-navy-500 text-white" : "border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] hover:border-sky"}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              {loadingContent ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, i) => (<CourseCardSkeleton key={i} />))}
                </div>
              ) : filtered.length ? (
                <CourseGrid courses={filtered} />
              ) : (
                <p className="py-16 text-center text-[var(--ink-soft)]">No courses in this category yet. Try another.</p>
              )}
            </section>
          </main>
          <Footer />
        </div>
      </div>

    </>
  );
}
