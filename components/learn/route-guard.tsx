/**
 * RouteGuard — protects NST Learn routes.
 * If user is not authenticated, redirects to /login?redirect=/learn
 * Uses the unified AuthContext (thenst-main auth).
 */
"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      // Not authenticated — redirect to main login with redirect param
      router.replace(`/login?redirect=${pathname}`);
    }
  }, [user, loading, router, pathname]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
        <Loader2 size={24} className="animate-spin text-sky" />
      </div>
    );
  }

  // Not authenticated — don't render anything (redirect in effect)
  if (!user) {
    return null;
  }

  // Authenticated — render the route
  return children;
}
