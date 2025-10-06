import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
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
            Create Your Library Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Please complete all fields and upload a valid university ID to gain access.
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm text-foreground/90">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Adrian Hajdin"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-white/20 focus:ring-2 focus:ring-primary/40"
            />
          </div>

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
            <label htmlFor="universityId" className="text-sm text-foreground/90">
              University ID Number
            </label>
            <input
              id="universityId"
              name="universityId"
              type="text"
              placeholder="eg: 394365762"
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

          <div className="space-y-2">
            <label className="text-sm text-foreground/90">Upload University ID Card (file upload)</label>
            <label htmlFor="idUpload" className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-muted-foreground hover:bg-white/10">
              <span>Upload a file</span>
              <Image src="/icons/upload.svg" alt="Upload" width={16} height={16} />
              <input id="idUpload" name="idUpload" type="file" className="hidden" />
            </label>
          </div>

          <Button type="submit" className="mt-2 w-full rounded-xl bg-primary font-semibold text-primary-foreground">
            Sign Up
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Have an account already?{" "}
          <Link href="/sign-in" className="font-semibold text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
