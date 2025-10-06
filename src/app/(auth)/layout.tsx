import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen w-full">
      <div className="mx-auto grid w-full max-w-none grid-cols-1 items-stretch gap-8 px-4 py-10 lg:min-h-screen lg:grid-cols-2 lg:gap-0 lg:px-0 lg:py-0">
        <section className="flex h-full items-center justify-center">
          {children}
        </section>

        <aside className="relative hidden h-full overflow-hidden border border-white/10 bg-white/5 shadow-[0_30px_80px_-50px_rgba(10,14,60,0.9)] lg:block">
          <Image
            src="/images/auth-illustration.png"
            alt="Library books"
            fill
            sizes="(min-width: 1024px) 50vw, 0px"
            className="object-cover"
            priority
          />
        </aside>
      </div>
    </main>
  );
}
