"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/web" },
  { label: "Search", href: "/search" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="px-4 pt-6">
      <div className="border-white/8 from-white/8 via-white/4 mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border bg-gradient-to-r to-white/0 px-6 py-4 shadow-[0_18px_60px_-40px_rgba(7,13,45,0.95)] backdrop-blur-xl">
        <Link href="/web" className="flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center">
            <Image
              src="/icons/logo.svg"
              alt="BookWise logo"
              width={36}
              height={30}
              priority
            />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            BookWise
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <nav className="flex items-center gap-6 text-sm font-medium">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href === "/web" && pathname === "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors duration-200",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/20">
                <Image
                  src="/images/profile/chien_head_shot.jpg"
                  alt="Chien profile photo"
                  fill
                  sizes="32px"
                  className="object-cover"
                  priority
                />
              </div>
              <span className="text-sm font-semibold text-foreground/90">
                Chien
              </span>
            </div>
            <Image
              src="/icons/logout.svg"
              alt="Log out"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
