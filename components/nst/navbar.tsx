"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, Shield, User, ArrowRight, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

const NAV_LINKS = [
  { label: "Learn", href: "/learn" },
  { label: "Research", href: "/research" },
  { label: "Network", href: "/network" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "About", href: "/about" },
];

const ROLES = [
  { label: "Security Professional", href: "/security-professional" },
  { label: "Drone Pilot", href: "/drone-pilot" },
  { label: "Educator", href: "/educator" },
  { label: "Organisation", href: "/organisation" },
  { label: "Researcher", href: "/researcher" },
  { label: "Learner", href: "/learner" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, signOut, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Successfully signed out");
      router.push("/");
    } catch (err: any) {
      toast.error("Error signing out: " + (err?.message || "Please try again"));
    }
  };

  const getDashboardHref = () => {
    if (!profile) return "/dashboard";
    switch (profile.role) {
      case "superadmin":
        return "/dashboard/superadmin";
      case "admin":
        return "/dashboard/admin";
      case "hr":
        return "/dashboard/hr";
      case "agency":
        return "/dashboard/agency";
      case "guard":
        return "/dashboard/guard";
      case "intern":
        return "/dashboard/intern";
      default:
        return "/dashboard";
    }
  };

  return (
    <header className="sticky top-0 left-0 w-full z-50 h-[74px] border-b border-[#e5e3db] bg-[#f7f6f2]/95 backdrop-blur-md">
      <div className="w-min(1290px,calc(100%-48px)) max-w-[1290px] mx-auto h-full px-4 flex items-center justify-between gap-8">
        {/* Institutional Logo */}
        <Link href="/" className="flex items-baseline gap-0 text-[22px] font-medium tracking-[-1.1px] text-[#171b22] hover:opacity-90 transition-opacity">
          <span className="font-sans font-bold">The</span>
          <span className="font-serif italic font-normal text-[26px] tracking-[-0.5px]">NST</span>
          <small className="text-[8px] tracking-[1.4px] text-[#737a83] ml-2.5 font-bold uppercase">
            INSTITUTIONAL
          </small>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 ml-auto">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium transition-colors ${
                  isActive ? "text-[#d95325] font-semibold" : "text-[#4f555d] hover:text-[#d95325]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Role Hub Switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              onBlur={() => setTimeout(() => setRoleDropdownOpen(false), 250)}
              className="flex items-center gap-1.5 text-[13px] text-[#4f555d] hover:text-[#d95325] transition-colors py-1.5 px-2 font-medium"
            >
              <span>Roles</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#e5e3db] shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1 text-[9px] font-mono uppercase tracking-widest text-[#737a83] border-b border-[#e5e3db]/60 mb-1">
                  Select Role View
                </div>
                {ROLES.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="block px-3 py-2 text-xs text-[#171b22] hover:bg-[#f7f6f2] hover:text-[#d95325] font-medium transition-colors"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Desktop Action Buttons / Authenticated User Menu */}
        <div className="hidden lg:flex items-center gap-3">
          {!loading && user && profile ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                onBlur={() => setTimeout(() => setUserDropdownOpen(false), 250)}
                className="flex items-center gap-2.5 px-3 py-1.5 bg-[#171b22] text-white text-xs font-semibold hover:bg-[#111419] transition-all shadow-sm"
              >
                <div className="w-5 h-5 rounded-full bg-[#d95325] text-white flex items-center justify-center font-mono text-[10px]">
                  {profile.fullName?.charAt(0) || profile.email?.charAt(0) || "U"}
                </div>
                <span className="max-w-[130px] truncate">{profile.fullName || profile.email}</span>
                <span className="text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 bg-white/10 text-[#e5e3db]">
                  {profile.role}
                </span>
                <ChevronDown className="w-3 h-3 text-[#9299a2]" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#e5e3db] shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-[#e5e3db] mb-1">
                    <p className="text-xs font-bold text-[#171b22] truncate">{profile.fullName || "User"}</p>
                    <p className="text-[10px] text-[#737a83] truncate">{profile.email}</p>
                  </div>
                  <Link
                    href={getDashboardHref()}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-[#171b22] hover:bg-[#f7f6f2] hover:text-[#d95325] font-medium"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Command Dashboard
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-2 px-4 py-2 text-xs text-[#171b22] hover:bg-[#f7f6f2] hover:text-[#d95325] font-medium"
                  >
                    <User className="w-3.5 h-3.5" />
                    Profile & KYC
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-medium text-left border-t border-[#e5e3db] mt-1 pt-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-[13px] font-medium text-[#4f555d] hover:text-[#d95325] px-3 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center min-h-[42px] px-5 text-xs font-semibold tracking-wider text-white bg-[#d95325] hover:bg-[#bc3f18] transition-all duration-200 uppercase shadow-sm"
              >
                Enter Platform
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex items-center gap-1.5 text-xs text-[#171b22] p-2 hover:bg-[#e5e3db]/50 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-[74px] left-0 w-full bg-[#f7f6f2] border-b border-[#e5e3db] p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-[#171b22] hover:text-[#d95325] py-1 border-b border-[#e5e3db]/40"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#737a83] block mb-2">
              Role Profiles
            </span>
            <div className="grid grid-cols-2 gap-2">
              {ROLES.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xs text-[#4f555d] hover:text-[#d95325] py-1"
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-2 border-t border-[#e5e3db]">
            {user && profile ? (
              <>
                <Link
                  href={getDashboardHref()}
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-2.5 text-xs font-semibold text-white bg-[#171b22] uppercase tracking-wider"
                >
                  Go to Dashboard ({profile.role})
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    handleSignOut();
                  }}
                  className="w-full text-center py-2.5 text-xs font-semibold text-rose-600 border border-rose-200 uppercase tracking-wider"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-2.5 text-xs font-semibold text-[#171b22] border border-[#171b22] uppercase tracking-wider"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-2.5 text-xs font-semibold text-white bg-[#d95325] uppercase tracking-wider"
                >
                  Enter Platform
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
