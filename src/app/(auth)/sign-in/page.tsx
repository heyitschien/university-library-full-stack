import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <section className="w-full max-w-md">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_35px_90px_-50px_rgba(5,8,35,0.95)] backdrop-blur-lg sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <Image src="/icons/logo.svg" alt="BookWise" width={36} height={30} />
          <span className="font-display text-xl font-semibold tracking-tight text-foreground">
            BookWise
          </span>
        </div>

        <div className="mb-6 space-y-2">
          <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Welcome back to BookWise
          </h1>
          <p className="text-sm text-muted-foreground">
            Access the vast collection of resources and stay updated.
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-foreground/90">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-white/20 focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-foreground/90">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="At least 8 characters"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-white/20 focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <Button type="submit" className="mt-2 w-full rounded-xl bg-primary font-semibold text-primary-foreground">
            Login
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Don’t have an account already?{" "}
          <Link href="/sign-up" className="font-semibold text-primary hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
}
