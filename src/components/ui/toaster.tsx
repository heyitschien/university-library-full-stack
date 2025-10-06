"use client";

import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      position="top-right"
      richColors
      theme="dark"
      toastOptions={{
        classNames: {
          toast: "border border-white/10 bg-card/80 text-foreground backdrop-blur-md shadow-lg",
          title: "font-medium",
        },
      }}
    />
  );
}
