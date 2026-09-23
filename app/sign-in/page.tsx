"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Lock, Mail, ArrowRight, CheckCircle2, User, Building2, Compass, BookOpen, ChevronRight, Eye, EyeOff } from "lucide-react";
import { Navbar } from "@/components/nst/navbar";
import { Footer } from "@/components/nst/footer";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";

export default function SignInPage() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();

  const [mode, setMode] = useState<"signin" | "onboarding">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Onboarding Steps (1: Role, 2: Topics, 3: Details)
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("Security Professional");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [otherInterestText, setOtherInterestText] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const roleOptions = [
    { id: "Security Professional", desc: "Build professional identity & discover high-impact briefs." },
    { id: "Drone Pilot", desc: "Deploy aerial and counter-UAS field capabilities." },
    { id: "Educator", desc: "Design structured curricula and teach security cohorts." },
    { id: "Organisation", desc: "Procure verified talent & commission strategic research." },
    { id: "Researcher", desc: "Publish peer-reviewed defense and intelligence monographs." },
    { id: "Learner", desc: "Acquire foundational and advanced security competencies." },
  ];

  const ROLE_INTERESTS: Record<string, { subtitle: string; options: string[] }> = {
    "Security Professional": {
      subtitle: "Choose security areas and responsibilities you want to work or specialize in:",
      options: [
        "Facility & Campus Security",
        "CCTV & Camera Monitoring",
        "Emergency Response & First Aid",
        "Guard Team Supervision",
        "Access Control & Checkpoints",
        "Fire Safety & Evacuation Drills",
        "VIP & Event Protection",
        "Incident Reporting & Patrols"
      ]
    },
    "Drone Pilot": {
      subtitle: "Choose drone flight operations and field missions you want to take on:",
      options: [
        "Aerial Perimeter Inspection",
        "Site Mapping & 3D Surveying",
        "Thermal & Night Camera Flights",
        "Drone Flight Controls & Safety",
        "Drone Video & Data Tagging",
        "Long-Range Flight Operations",
        "Counter-Drone Detection Systems",
        "Drone Maintenance & Battery Care"
      ]
    },
    "Educator": {
      subtitle: "Choose topics you want to teach or create learning materials for:",
      options: [
        "Security Guard Fundamentals",
        "Cyber Safety for Beginners",
        "Drone Flight Training & Rules",
        "First Aid & CPR Workshops",
        "Password & Online Threat Defense",
        "Workplace Safety & Fire Drills",
        "Curriculum & Lesson Planning",
        "Student Mentoring & Certification"
      ]
    },
    "Organisation": {
      subtitle: "Choose security solutions and staffing services your organization needs:",
      options: [
        "Hiring Verified Security Guards",
        "Booking Drone Inspection Flights",
        "Upgrading CCTV & Camera Systems",
        "Training Staff in Cyber Safety",
        "Facility Safety & Risk Audits",
        "24/7 Emergency Response Setup",
        "Security Supervisor Placements",
        "Safety Compliance Certification"
      ]
    },
    "Researcher": {
      subtitle: "Choose research fields and analysis topics for your briefings:",
      options: [
        "Daily Threat News Tracking",
        "Cyber Attack Trends & Defense",
        "Power Grid & Infrastructure Safety",
        "Regional & Maritime Security",
        "AI & Automated Threat Detection",
        "Satellite & Communication Protection",
        "Defense Technology Case Studies",
        "Safety Policy Briefs & Summaries"
      ]
    },
    "Learner": {
      subtitle: "Choose practical skills and courses you want to learn:",
      options: [
        "Cyber Defense Basics",
        "Drone Flying & Camera Controls",
        "Security Guarding Essentials",
        "First Aid & Emergency Response",
        "Safe Online Habits & Passwords",
        "CCTV Setup & Troubleshooting",
        "Building a Security Resume",
        "Earning Skill Certificates"
      ]
    }
  };

  const currentInterestData = ROLE_INTERESTS[selectedRole] || ROLE_INTERESTS["Security Professional"];
  const interestOptions = currentInterestData.options;

  const toggleInterest = (topic: string) => {
    if (selectedInterests.includes(topic)) {
      setSelectedInterests(selectedInterests.filter((t) => t !== topic));
    } else {
      setSelectedInterests([...selectedInterests, topic]);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please provide both email and password.");
      return;
    }
    try {
      setLoading(true);
      await signIn(email, password);
      toast.success("Signed in successfully. Welcome to TheNST.");
      router.push("/platform");
    } catch (err: any) {
      toast.error(err?.message || "Sign in failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      setLoading(true);
      // Map friendly role to internal auth role
      const roleMap: Record<string, any> = {
        "Security Professional": "guard",
        "Drone Pilot": "guard",
        "Educator": "educator",
        "Organisation": "agency",
        "Researcher": "superadmin",
        "Learner": "intern"
      };
      await signUp(email, password, fullName, phone || "+919999999999", roleMap[selectedRole] || "guard");
      toast.success("Account created! Personalizing your TheNST workspace...");
      router.push("/platform");
    } catch (err: any) {
      toast.error(err?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f6f2] text-[#171b22]">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24">
        <div className="w-min(1240px,calc(100%-48px)) max-w-xl mx-auto">
          {/* Top Auth Mode Tabs */}
          <div className="flex border-b border-[#e5e3db] mb-8">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                mode === "signin"
                  ? "border-[#d95325] text-[#171b22]"
                  : "border-transparent text-[#737a83] hover:text-[#171b22]"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("onboarding")}
              className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                mode === "onboarding"
                  ? "border-[#d95325] text-[#171b22]"
                  : "border-transparent text-[#737a83] hover:text-[#171b22]"
              }`}
            >
              Create Account & Onboard
            </button>
          </div>

          {/* SIGN IN FORM */}
          {mode === "signin" && (
            <div className="bg-white border border-[#e5e3db] p-8 sm:p-10 shadow-sm">
              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#d95325] font-semibold block mb-1">
                  Institutional Authentication
                </span>
                <h2 className="text-2xl font-medium tracking-tight text-[#171b22]">
                  Sign in to TheNST
                </h2>
                <p className="text-xs text-[#737a83] font-sans mt-1">
                  Access your personalized platform, learning modules, and opportunity briefings.
                </p>
              </div>

              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#737a83] block mb-1.5">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@institution.org"
                    className="w-full px-4 py-2.5 bg-[#f7f6f2] border border-[#e5e3db] text-xs text-[#171b22] focus:outline-none focus:border-[#d95325] focus:bg-white font-sans"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#737a83] block mb-1.5">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-4 py-2.5 bg-[#f7f6f2] border border-[#e5e3db] text-xs text-[#171b22] focus:outline-none focus:border-[#d95325] focus:bg-white font-sans"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737a83] hover:text-[#171b22]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center min-h-[44px] px-6 text-xs font-semibold tracking-wider text-white bg-[#171b22] hover:bg-[#d95325] transition-all uppercase mt-2 shadow-sm disabled:opacity-50"
                >
                  {loading ? "Authenticating..." : "Sign In to Platform →"}
                </button>
              </form>

              <div className="pt-6 border-t border-[#e5e3db] mt-6 text-center text-xs text-[#737a83]">
                <span>New to TheNST? </span>
                <button
                  type="button"
                  onClick={() => setMode("onboarding")}
                  className="text-[#d95325] font-semibold hover:underline"
                >
                  Start Guided Onboarding
                </button>
              </div>
            </div>
          )}

          {/* GUIDED ONBOARDING FLOW */}
          {mode === "onboarding" && (
            <div className="bg-white border border-[#e5e3db] p-8 sm:p-10 shadow-sm">
              {/* Step indicator */}
              <div className="flex items-center justify-between pb-4 border-b border-[#e5e3db] mb-6 text-xs font-mono text-[#737a83]">
                <span className="text-[#d95325] font-semibold">Step 0{onboardingStep} of 03</span>
                <span>
                  {onboardingStep === 1
                    ? "Role Pathway"
                    : onboardingStep === 2
                    ? "Domain Focus"
                    : "Profile Credentials"}
                </span>
              </div>

              {/* Step 1: Role Selection */}
              {onboardingStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-medium tracking-tight text-[#171b22] mb-1">
                      What brings you to TheNST?
                    </h2>
                    <p className="text-xs text-[#737a83] font-sans">
                      Select your primary professional track to personalize your interface.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {roleOptions.map((r) => (
                      <div
                        key={r.id}
                        onClick={() => setSelectedRole(r.id)}
                        className={`p-4 border transition-all cursor-pointer flex items-start justify-between ${
                          selectedRole === r.id
                            ? "border-[#d95325] bg-[#faf9f5] ring-1 ring-[#d95325]"
                            : "border-[#e5e3db] hover:border-[#171b22]/30"
                        }`}
                      >
                        <div>
                          <div className="text-sm font-medium text-[#171b22]">{r.id}</div>
                          <div className="text-xs text-[#737a83] font-sans mt-0.5">{r.desc}</div>
                        </div>
                        {selectedRole === r.id && (
                          <CheckCircle2 className="w-4 h-4 text-[#d95325] flex-shrink-0 mt-0.5" />
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setOnboardingStep(2)}
                    className="w-full inline-flex items-center justify-center min-h-[44px] px-6 text-xs font-semibold tracking-wider text-white bg-[#171b22] hover:bg-[#d95325] transition-all uppercase"
                  >
                    Continue to Interests →
                  </button>
                </div>
              )}

              {/* Step 2: Interests Selection */}
              {onboardingStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#fff3ee] border border-[#ffd5c4] text-[#d95325] text-[10px] font-mono font-semibold uppercase tracking-wider mb-2">
                      <span>{selectedRole} Track</span>
                    </div>
                    <h2 className="text-xl font-medium tracking-tight text-[#171b22] mb-1">
                      What are you interested in?
                    </h2>
                    <p className="text-xs text-[#737a83] font-sans leading-relaxed">
                      {currentInterestData.subtitle}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {interestOptions.map((topic) => {
                        const isSelected = selectedInterests.includes(topic);
                        return (
                          <div
                            key={topic}
                            onClick={() => toggleInterest(topic)}
                            className={`p-3 border text-xs font-medium font-sans cursor-pointer transition-all flex items-center justify-between ${
                              isSelected
                                ? "border-[#d95325] bg-[#faf9f5] text-[#171b22]"
                                : "border-[#e5e3db] text-[#616872] hover:border-[#171b22]/30"
                            }`}
                          >
                            <span>{topic}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#d95325]" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* Dedicated Other / Custom Focus Option */}
                    <div
                      onClick={() => toggleInterest("Other")}
                      className={`p-3 border text-xs font-medium font-sans cursor-pointer transition-all flex items-center justify-between ${
                        selectedInterests.includes("Other")
                          ? "border-[#d95325] bg-[#faf9f5] text-[#171b22] font-semibold"
                          : "border-[#e5e3db] text-[#616872] hover:border-[#171b22]/30 bg-white"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="text-[#d95325] font-bold">+</span> Other / Custom Focus Area
                      </span>
                      {selectedInterests.includes("Other") && <CheckCircle2 className="w-3.5 h-3.5 text-[#d95325]" />}
                    </div>

                    {/* Custom interest input if Other is selected */}
                    {selectedInterests.includes("Other") && (
                      <div className="p-3.5 bg-[#faf9f5] border border-[#d95325]/30 rounded-none space-y-1.5 animate-in fade-in duration-200">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-[#d95325] font-semibold block">
                          Specify Your Specific Interest Area
                        </label>
                        <input
                          type="text"
                          value={otherInterestText}
                          onChange={(e) => setOtherInterestText(e.target.value)}
                          placeholder="e.g. Agricultural Drone Mapping, Industrial Site Patrol..."
                          className="w-full px-3 py-2 bg-white border border-[#e5e3db] text-xs text-[#171b22] focus:outline-none focus:border-[#d95325] font-sans"
                          autoFocus
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setOnboardingStep(1)}
                      className="px-5 py-2.5 border border-[#e5e3db] text-xs font-semibold uppercase tracking-wider text-[#171b22] hover:bg-[#f7f6f2]"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setOnboardingStep(3)}
                      className="flex-1 inline-flex items-center justify-center min-h-[44px] px-6 text-xs font-semibold tracking-wider text-white bg-[#171b22] hover:bg-[#d95325] transition-all uppercase"
                    >
                      Continue to Profile →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Account Credentials */}
              {onboardingStep === 3 && (
                <form onSubmit={handleCompleteOnboarding} className="space-y-4">
                  <div>
                    <h2 className="text-xl font-medium tracking-tight text-[#171b22] mb-1">
                      Create Your Profile Credentials
                    </h2>
                    <p className="text-xs text-[#737a83] font-sans">
                      Your identity as <span className="text-[#d95325] font-semibold">{selectedRole}</span>.
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-[#737a83] block mb-1.5">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Dr. / Col. / First Last"
                      className="w-full px-4 py-2.5 bg-[#f7f6f2] border border-[#e5e3db] text-xs text-[#171b22] focus:outline-none focus:border-[#d95325] focus:bg-white font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-[#737a83] block mb-1.5">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@institution.org"
                      className="w-full px-4 py-2.5 bg-[#f7f6f2] border border-[#e5e3db] text-xs text-[#171b22] focus:outline-none focus:border-[#d95325] focus:bg-white font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-[#737a83] block mb-1.5">
                      Password (min 8 characters) *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-4 py-2.5 bg-[#f7f6f2] border border-[#e5e3db] text-xs text-[#171b22] focus:outline-none focus:border-[#d95325] focus:bg-white font-sans pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737a83] hover:text-[#171b22] transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setOnboardingStep(2)}
                      className="px-5 py-2.5 border border-[#e5e3db] text-xs font-semibold uppercase tracking-wider text-[#171b22] hover:bg-[#f7f6f2]"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 inline-flex items-center justify-center min-h-[44px] px-6 text-xs font-semibold tracking-wider text-white bg-[#d95325] hover:bg-[#bc3f18] transition-all uppercase shadow-md disabled:opacity-50"
                    >
                      {loading ? "Creating Account..." : "Launch TheNST Experience →"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
