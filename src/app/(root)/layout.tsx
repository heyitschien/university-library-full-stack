import Header from "@/components/Header";
import { ReactNode } from "react";

export default function RootGroupLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-32 -top-40 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.25)_0%,transparent_70%)]" />
        <div className="absolute right-[-18%] top-1/4 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(44,87,255,0.4)_0%,transparent_75%)] blur-3xl" />
      </div>

      <Header />
      {children}
    </div>
  );
}
