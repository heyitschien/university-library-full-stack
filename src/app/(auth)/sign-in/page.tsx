"use client";

import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";
import { signInSchema, defaultSignInValues } from "@/lib/validations/auth";
import { signInFields } from "@/constants/auth";

export default function SignInPage() {
  const onSubmit = async (_values: Record<string, string>) => {
    await new Promise((r) => setTimeout(r, 600));
    return { success: true, message: "Logged in (mock)" };
  };

  return (
    <AuthForm
      title="Welcome back to BookWise"
      description="Access the vast collection of resources and stay updated."
      schema={signInSchema}
      defaultValues={defaultSignInValues}
      fields={signInFields}
      submitLabel="Login"
      footer={
        <>
          Don’t have an account already? {" "}
          <Link href="/sign-up" className="font-semibold text-primary hover:underline">
            Register here
          </Link>
        </>
      }
      onSubmit={onSubmit}
    />
  );
}
