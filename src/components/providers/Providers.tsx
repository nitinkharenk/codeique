"use client";

/**
 * Providers
 * ─────────
 * Client-side providers wrapper that sits inside the server <RootLayout>.
 * Bundles together:
 *   • SmoothScrollProvider — Lenis smooth scrolling + GSAP ScrollTrigger sync
 *   • CustomCursor         — Two-layer cursor replacing the native OS cursor
 *   • Preloader            — First-visit animated preloader
 *   • TransitionCurtain    — Accent overlay flash between route navigations
 *
 * Why a separate file? Next.js app/layout.tsx is a server component;
 * any client-side API (usePathname, useEffect, etc.) must live in a
 * separate "use client" module.
 */

import { type ReactNode } from "react";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { TransitionCurtain } from "@/components/ui/TransitionCurtain";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        {/* Cursor — rendered above everything except the preloader */}
        <CustomCursor />

        {/* Route transition curtain — accent flash on every navigation */}
        <TransitionCurtain />

        {children}
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
