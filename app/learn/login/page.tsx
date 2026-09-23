/**
 * NST Learn /learn/login — NOT USED
 * 
 * NST Learn is auth-protected by RouteGuard in app/learn/layout.tsx.
 * Unauthenticated users are redirected to /login?redirect=/learn automatically.
 * There is no separate /learn/login page — all auth goes through the main site.
 *
 * This page exists only to catch direct navigation attempts and redirect to /login.
 */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LearnLoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Immediately redirect to main login
    router.replace("/login?redirect=/learn");
  }, [router]);

  return null;
}
