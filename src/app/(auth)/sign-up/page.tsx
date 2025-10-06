"use client";

import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";
import { signUpSchema, defaultSignUpValues } from "@/lib/validations/auth";
import { signUpFields } from "@/constants/auth";

export default function SignUpPage() {
  const onSubmit = async (_values: Record<string, string>) => {
    await new Promise((r) => setTimeout(r, 700));
    return { success: true, message: "Registered (mock)" };
  };

  return (
    <AuthForm
      title="Create your library account"
      description="Please complete all fields and upload a valid university ID to gain access."
      schema={signUpSchema}
      defaultValues={defaultSignUpValues}
      fields={signUpFields}
      submitLabel="Sign Up"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
      onSubmit={onSubmit}
    />
  );
}
