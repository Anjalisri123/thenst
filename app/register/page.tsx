"use client";

import { AuthForm } from "@/components/auth/auth-form";
import { AuthRedirect } from "@/components/auth-redirect";

export default function RegisterPage() {
  return (
    <>
      <AuthRedirect />
      <AuthForm mode="register" role="guard" />
    </>
  );
}
