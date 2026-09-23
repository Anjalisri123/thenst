"use client";

import React, { useState, useEffect } from "react"
import Link from "next/link";
import {
  Shield,
  UserCheck,
  ClipboardCheck,
  Lock,
  ArrowRight,
  CheckCircle,
  Cpu,
  Radio,
  Target,
  Briefcase,
  MessageSquare,
  ShieldCheck,
  FileText,
  Search,
  ChevronDown,
  User,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthRedirect } from "@/components/auth-redirect";
import { TacticalCanvas } from "@/components/3d/floating-shield";
import { CyberHUD } from "@/components/ui/cyber-hud";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col items-start gap-4 rounded-xl border border-ashoka-blue/10 bg-slate-50 p-8 transition-all duration-500 hover:border-saffron/40 hover:bg-saffron/5"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-saffron/10 text-saffron group-hover:text-saffron/80 transition-colors">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold text-ashoka-blue tracking-widest uppercase">{title}</h3>
      <p className="text-sm leading-relaxed text-ashoka-blue/70 font-medium">{description}</p>

      {/* Tactical HUD Corner */}
      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-saffron/0 group-hover:border-saffron/40 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-saffron/0 group-hover:border-saffron/40 transition-all duration-500" />
    </motion.div>
  );
}

function ProcessStep({
  number,
  icon: Icon,
  title,
  description,
  isLast = false
}: {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
  isLast?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center text-center group"
    >
      <div className="relative mb-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-india-green/30 bg-india-green/5 text-india-green shadow-[0_0_15px_rgba(19,136,8,0.1)] group-hover:border-india-green group-hover:text-india-green/80 transition-all duration-500">
          <Icon className="h-7 w-7" />
        </div>
        <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-ashoka-blue text-[10px] font-bold text-white shadow-lg">
          {number}
        </div>
      </div>
      <h3 className="mb-3 text-base font-black tracking-widest text-ashoka-blue uppercase">{title}</h3>
      <p className="text-xs text-ashoka-blue/60 font-medium leading-relaxed max-w-[200px]">{description}</p>

      {!isLast && (
        <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-[1px] bg-gradient-to-r from-india-green/50 to-transparent" />
      )}
    </motion.div>
  );
}

const galleryImages = [
  "/gallery/conclave.png",
  "/gallery/defense.png",
  "/gallery/force-alpha.png",
  "/gallery/forces.png",
  "/gallery/tactical-gear.jpg",
  "/gallery/training2.png",
];

// Double images for seamless loop
const scrollImages = [...galleryImages, ...galleryImages];

function EliteGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="relative py-24 overflow-hidden bg-slate-50 border-y border-ashoka-blue/5 z-10">
      <div className="container mx-auto px-6 max-w-7xl mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-black text-ashoka-blue tracking-[0.3em] uppercase">Elite Personnel Showcase</h2>
          <p className="mt-2 text-[10px] font-bold text-india-green/60 uppercase tracking-widest">Global Field Operations Portfolio</p>
        </motion.div>
      </div>

      <div
        className="relative max-w-4xl mx-auto px-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="overflow-hidden rounded-2xl border border-blue-500/20 shadow-[0_0_30px_rgba(37,99,235,0.08)] bg-black aspect-[16/10] relative group">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0.3, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full h-full relative"
          >
            <img
              src={galleryImages[currentIndex]}
              alt={`Elite Personnel ${currentIndex + 1}`}
              className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ashoka-blue/90 via-transparent to-transparent opacity-75 group-hover:opacity-50 transition-opacity duration-500" />

            <div className="absolute bottom-6 left-6 font-bold text-[10px] text-white tracking-widest uppercase bg-ashoka-blue/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-lg">
              OP_REF: {currentIndex % 2 === 0 ? "B-TAC" : "K-RECON"}-{currentIndex + 1042} // VERIFIED PERSONNEL
            </div>

            <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-saffron/60 animate-pulse" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-india-green/60 animate-pulse" />
          </motion.div>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${currentIndex === index
                  ? "bg-ashoka-blue scale-125 ring-2 ring-saffron/40"
                  : "bg-ashoka-blue/30 hover:bg-ashoka-blue/50"
                }`}
              title={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const franchiseePartners = [
  { name: "G4S Secure Solutions", domain: "g4s.com" },
  { name: "SIS India Ltd.", domain: "sisindia.com" },
  { name: "Peregrine Guarding", domain: "peregrine-security.com", logoUrl: "https://www.peregrine-security.com/wp-content/uploads/2025/12/mob-logo.svg" },
  { name: "Securitas India", domain: "securitas.in" },
  { name: "Checkmate Services", domain: "checkmateservices.com" },
  { name: "M/S Raj Security", domain: "rajsecurityservices.com" },
  { name: "BVG India Ltd.", domain: "bvgindia.com" },
  { name: "Quess Security", domain: "quesscorp.com" },
  { name: "Premier Shield", domain: "premiershield.com" },
];

function FranchiseeMarquee() {
  return (
    <section className="relative py-24 bg-white border-t border-ashoka-blue/5 overflow-hidden z-10">
      <div className="container mx-auto px-6 max-w-7xl mb-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-black text-ashoka-blue tracking-[0.3em] uppercase italic">Partnerships in Growth</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-saffron via-ashoka-blue to-india-green mx-auto mt-6" />
        </motion.div>
      </div>

      <div className="relative flex overflow-hidden group">
        <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex whitespace-nowrap gap-8 md:gap-16 py-4 items-center pl-8 md:pl-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
        >
          {[...franchiseePartners, ...franchiseePartners].map((partner, index) => (
            <div key={index} className="flex items-center justify-center gap-4 min-w-[200px] md:min-w-[320px] h-24 px-8 transition-all duration-500 cursor-default border border-ashoka-blue/10 rounded-2xl bg-slate-50 hover:border-india-green/30 hover:bg-india-green/5 hover:shadow-lg hover:-translate-y-1">
              <img 
                src={(partner as any).logoUrl || `https://s2.googleusercontent.com/s2/favicons?domain=${partner.domain}&sz=128`} 
                alt={`${partner.name} Logo`}
                className="w-10 h-10 object-contain rounded-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('ui-avatars')) {
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(partner.name)}&background=0F172A&color=fff&bold=true&rounded=true`;
                  } else {
                    target.style.display = 'none';
                  }
                }}
              />
              <span className="text-sm md:text-base font-black text-ashoka-blue tracking-widest uppercase whitespace-normal leading-tight text-center max-w-[200px]">
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


export default function HomePage() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <main className="min-h-screen flex flex-col bg-white relative font-sans selection:bg-saffron/30">
      <AuthRedirect />

      {/* Tactical Blueprint Layer */}
      <CyberHUD />

      {/* Corporate Atmosphere Orbs - Subtle Tricolour */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full bg-saffron/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-india-green/5 blur-[100px]" />
      </div>

      {/* Navbar - Fixed for better static feel */}
      <header className="fixed top-0 left-0 w-full z-50 border-b border-saffron/10 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2.5"
          >
            <Radio className="h-5 w-5 text-saffron animate-pulse" />
            <span className="text-xl font-black tracking-[0.2em] text-ashoka-blue uppercase italic">TheNST</span>
          </motion.div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-xs font-bold text-ashoka-blue hover:bg-ashoka-blue/5 rounded-none px-6 uppercase tracking-widest leading-none">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="text-xs font-black bg-saffron hover:bg-saffron/90 text-white rounded-none px-6 uppercase tracking-widest shadow-xl leading-none">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Added pt-20 to account for fixed header */}
      <section className="relative min-h-screen flex flex-col justify-center pt-20 py-20 lg:py-0">
        <div className="container relative z-20 mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center overflow-visible">
            {/* Tactical Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left order-2 lg:order-1 relative z-50 pr-0 lg:pr-12 overflow-visible"
            >
              <div className="max-w-2xl mx-auto lg:mx-0">
                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 border border-saffron/20 bg-saffron/5 px-4 py-1 text-[10px] font-bold text-saffron mb-8 tracking-[0.3em] uppercase">
                  <Target className="h-3 w-3" />
                  <span>Enterprise-Grade Security Staffing</span>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-4xl font-black tracking-widest text-ashoka-blue md:text-6xl lg:text-7xl leading-[1.1] mb-8 uppercase"
                >
                  ELITE SECURITY <br />
                  <span className="inline-block text-ashoka-blue whitespace-nowrap overflow-visible">
                    PROFESSIONALS
                  </span>
                </motion.h1>

                <motion.p variants={itemVariants} className="max-w-lg text-lg md:text-xl text-ashoka-blue/60 mb-10 leading-relaxed font-bold mx-auto lg:mx-0 text-sm tracking-tight text-balance">
                  Connecting certified, background-checked security personnel with top-tier organizations.
                  Disciplined hiring, rigorous vetting, and instant deployment.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link href="/solutions" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-xs font-black rounded-none bg-ashoka-blue hover:bg-ashoka-blue/90 text-white shadow-xl transition-all duration-300 border-none uppercase tracking-[0.15em]">
                      Discover Solutions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/learn" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 text-xs font-black rounded-none border-2 border-india-green text-india-green hover:bg-india-green hover:text-white shadow-lg transition-all duration-300 uppercase tracking-[0.15em]">
                      NST Learn
                      <Cpu className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Drone Swarm / Cyber Canvas */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="relative h-[400px] md:h-[600px] order-1 lg:order-2 flex items-center justify-center z-10"
            >
              <div className="absolute inset-0 bg-saffron/5 rounded-full blur-[120px] animate-pulse pointer-events-none" />
              <div className="w-full h-full lg:translate-x-8">
                <TacticalCanvas />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Elite Personnel Gallery */}
      <EliteGallery />

      {/* Hiring Process Section */}
      <section className="relative py-32 z-10 border-t border-blue-500/10">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-3xl lg:text-4xl font-black text-ashoka-blue tracking-[0.3em] uppercase">Hiring Process</h2>
            <p className="mt-4 text-sm font-bold text-india-green/60 uppercase tracking-widest">Five steps to connect with elite security professionals</p>
            <div className="h-1 w-24 bg-gradient-to-r from-saffron via-ashoka-blue to-india-green mx-auto mt-6" />
          </motion.div>

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5 relative">
            <ProcessStep
              number="01"
              icon={Briefcase}
              title="Post Jobs"
              description="Define your requirements using professional job templates and specific criteria."
            />
            <ProcessStep
              number="02"
              icon={Search}
              title="Smart Match"
              description="Our system identifies top verified security professionals for your specific needs."
            />
            <ProcessStep
              number="03"
              icon={FileText}
              title="Review Profiles"
              description="Access detailed profiles with verified experience, certifications, and career objectives."
            />
            <ProcessStep
              number="04"
              icon={MessageSquare}
              title="Direct Connect"
              description="Reach out directly and schedule interviews within our secure environment."
            />
            <ProcessStep
              number="05"
              icon={ShieldCheck}
              title="Finalize Hires"
              description="Secure top talent and manage your hiring pipeline from a unified hub."
              isLast
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-slate-50 pt-32 pb-20 border-y border-ashoka-blue/5 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-3xl font-black text-ashoka-blue tracking-[0.3em] uppercase italic">Rigorous Vetting Process</h2>
            <div className="h-1 w-24 bg-saffron mx-auto mt-4" />
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={Target}
              title="Identity Verification"
              description="Comprehensive background checks, government ID verification, and criminal record screening for every candidate."
            />
            <FeatureCard
              icon={Shield}
              title="Skill Intel"
              description="Automated assessment of combat readiness and emergency response protocols."
            />
            <FeatureCard
              icon={Lock}
              title="Professional Ethics"
              description="Behavioral interviews to ensure security professionals possess the discipline, integrity, and professionalism your business needs."
            />
          </div>
        </div>
      </section>

      {/* Partnerships in Growth Section */}
      <FranchiseeMarquee />

      {/* Footer */}
      <footer className="mt-auto border-t border-ashoka-blue/5 bg-white pt-12 pb-0 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Radio className="h-4 w-4 text-saffron" />
            <span className="text-lg font-black tracking-widest text-ashoka-blue uppercase italic">TheNST</span>
          </div>
          <p className="text-[10px] font-mono text-ashoka-blue/30 tracking-[0.2em] uppercase">
            © {new Date().getFullYear()} TheNST. Dedicated to uncompromising safety.
          </p>
        </div>
      </footer>
    </main>
  );
}
