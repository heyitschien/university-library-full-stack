"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Search", href: "/search" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="px-4 pt-6">
      <div className="mx-auto flex w-full max-w-6xl justify-center">
        <div className="relative w-full">
          <div className="w-full overflow-hidden rounded-full bg-white/5 shadow-[0_30px_70px_-45px_rgba(8,12,48,0.9)]">
            <div className="bg-white/8 relative flex w-full min-w-0 flex-wrap items-center justify-between gap-3 rounded-full px-3 py-2 backdrop-blur-2xl md:flex-nowrap md:gap-8 md:px-7 md:py-3.5">
              <Link href="/" className="relative flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center">
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

              <nav className="relative ml-3 flex min-w-0 items-center gap-3 text-xs font-medium sm:text-sm md:ml-8 md:gap-6">
                {NAV_ITEMS.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href === "/" && pathname === "/");
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "transition-colors duration-200",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground/85",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="relative ml-2 flex shrink-0 items-center gap-2 md:ml-6 md:gap-4">
                <div className="bg-white/18 flex items-center gap-2 rounded-full border border-white/15 px-2 py-1 backdrop-blur-xl md:gap-3 md:px-3 md:py-1.5">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/25">
                    <Image
                      src="/images/profile/chien_head_shot.jpg"
                      alt="Chien profile photo"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <span className="hidden text-sm font-semibold text-foreground/90 sm:inline">
                    Chien
                  </span>
                </div>
                <Image
                  src="/icons/logout.svg"
                  alt="Log out"
                  width={18}
                  height={18}
                  className="flex-shrink-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
