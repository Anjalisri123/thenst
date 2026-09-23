import React from "react"
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth-context";
import { ErrorBoundary } from "@/components/error-boundary";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "TheNST - Security Professionals Platform",
  description:
    "Professional security workforce management platform with KYC verification and role-based access.",
  openGraph: {
    title: "TheNST - Security Professionals Platform",
    description:
      "Professional security workforce management platform with KYC verification and role-based access.",
    url: "https://thenst.co",
    siteName: "TheNST",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TheNST - Security Professionals Platform",
    description:
      "Professional security workforce management platform with KYC verification and role-based access.",
  },
};

export const viewport: Viewport = {
  themeColor: "#1d5aab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased overflow-x-hidden`}>
        <ErrorBoundary>
          <AuthProvider>
            {children}
            <Toaster position="top-right" richColors />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
