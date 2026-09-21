"use client";

import { AuthForm } from "@/components/auth/auth-form";
import { AuthRedirect } from "@/components/auth-redirect";

export default function LoginPage() {
  return (
    <>
      <AuthRedirect />
      <AuthForm mode="login" role="guard" />
    </>
  );
}
