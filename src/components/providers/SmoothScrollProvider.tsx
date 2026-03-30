"use client";

/**
 * SmoothScrollProvider
 * ────────────────────
 * Wraps the entire app with Lenis smooth scrolling and syncs it
 * with GSAP ScrollTrigger so scroll-triggered animations are
 * perfectly aligned with the eased scroll position.
 *
 * Usage: wrap <body> children in <SmoothScrollProvider>
 * Hook:  const { lenis } = useSmoothScroll()  →  lenis.scrollTo("#section")
 */

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

// Register ScrollTrigger once at module level (safe on client only)
gsap.registerPlugin(ScrollTrigger);

/* ── Context ── */

type LenisInstance = InstanceType<typeof Lenis>;

interface SmoothScrollContextValue {
  lenis: LenisInstance | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

/* ── Provider ── */

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisInstance | null>(null);
  const [lenis, setLenis] = useState<LenisInstance | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const instance = new Lenis({
      // Scroll duration in seconds — higher = more lag = silkier feel
      duration: 1.2,
      // Custom ease curve: exponential deceleration
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      // Multipliers — tune for feel
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = instance;
    setLenis(instance);

    /* ── GSAP ticker drives Lenis RAF instead of requestAnimationFrame ── */
    // This guarantees Lenis and GSAP are always in the same frame.
    const tickerFn = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0); // Prevent stutters on tab visibility change

    /* ── Sync ScrollTrigger on every Lenis scroll event ── */
    instance.on("scroll", ScrollTrigger.update);

    return () => {
      instance.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tickerFn);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  /* ── Jump to top on route change (no smooth scroll to avoid jarring feel) ── */
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return (
    <SmoothScrollContext.Provider value={{ lenis }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
