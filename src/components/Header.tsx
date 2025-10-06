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
      <div className="mx-auto flex w-full max-w-6xl justify-center">
        <div className="relative w-full">
          <div className="w-full rounded-full bg-white/5 shadow-[0_30px_70px_-45px_rgba(8,12,48,0.9)]">
            <div className="bg-white/8 relative flex w-full items-center justify-between gap-8 rounded-full px-7 py-3.5 backdrop-blur-2xl">

              <Link href="/web" className="relative flex items-center gap-3">
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

              <nav className="relative ml-8 flex items-center gap-6 text-sm font-medium">
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
                          : "text-muted-foreground hover:text-foreground/85",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="relative ml-6 flex items-center gap-4">
                <div className="bg-white/18 flex items-center gap-3 rounded-full border border-white/15 px-3 py-1.5 backdrop-blur-xl">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/25">
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
        </div>
      </div>
    </header>
  );
}
