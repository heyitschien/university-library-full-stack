import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import "./globals.css";

// IBM Plex Sans as the app sans font (multiple weights)
const plexSans = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/IBMPlexSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

// Bebas Neue as a display font (headings)
const bebasDisplay = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/BebasNeue-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "BookWise",
  description: "A library app for students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plexSans.variable} ${bebasDisplay.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -left-32 -top-40 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.25)_0%,transparent_70%)]" />
          <div className="absolute right-[-18%] top-1/4 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(44,87,255,0.4)_0%,transparent_75%)] blur-3xl" />
        </div>
        <Header />
        {children}
      </body>
    </html>
  );
}
