"use client";

/**
 * HomeLoader — Full-screen intro animation for the homepage.
 *
 * To customise:
 *  • DURATION_MS  — total time before it disappears
 *  • BRAND        — the big text
 *  • TAGLINE      — the small text beneath
 *  • Colors       — change the inline styles below
 *
 * Uses a portal to render on document.body so it is never
 * affected by parent transforms (template.tsx, etc.).
 */

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const DURATION_MS = 2400;
const BRAND = "Codeique";
const TAGLINE = "Beyond Code. Built with Craft.";

export function HomeLoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"visible" | "fading" | "gone">("visible");
  const [mounted, setMounted] = useState(false);

  // Portal needs document.body — wait for mount
  useEffect(() => setMounted(true), []);

  // Progress counter
  useEffect(() => {
    if (!mounted) return;

    document.body.style.overflow = "hidden";
    const start = Date.now();
    const countTo = DURATION_MS - 400;

    const tick = setInterval(() => {
      const t = Math.min(1, (Date.now() - start) / countTo);
      setProgress(Math.min(99, Math.floor((1 - Math.pow(1 - t, 3)) * 100)));
    }, 16);

    const done = setTimeout(() => {
      clearInterval(tick);
      setProgress(100);
      setTimeout(() => setPhase("fading"), 250);
    }, DURATION_MS);

    return () => {
      clearInterval(tick);
      clearTimeout(done);
    };
  }, [mounted]);

  // Fade-out → gone
  useEffect(() => {
    if (phase === "fading") {
      document.body.style.overflow = "";
      const id = setTimeout(() => setPhase("gone"), 600);
      return () => clearTimeout(id);
    }
  }, [phase]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted || phase === "gone") return null;

  const loader = (
    <>
      <style>{`
        @keyframes hl-letter-rise {
          from { opacity: 0; transform: translateY(100%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hl-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hl-scale-in {
          from { opacity: 0; transform: scale(0.8); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes hl-glow {
          from { opacity: 0; transform: scale(0.6); }
          to   { opacity: 0.15; transform: scale(1.4); }
        }
        @keyframes hl-line-expand {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          padding: 24,
          background: "var(--color-accent, #ff4925)",
          opacity: phase === "fading" ? 0 : 1,
          transition: "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          pointerEvents: phase === "fading" ? "none" : "auto",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            width: "70vmax",
            height: "70vmax",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
            pointerEvents: "none",
            animation: "hl-glow 2.4s ease-out forwards",
          }}
        />

        {/* Brand — letter-by-letter rise */}
        <h1
          style={{
            fontFamily: "var(--font-display), 'Anton', sans-serif",
            fontSize: "clamp(3rem, 11vw, 8rem)",
            lineHeight: 0.95,
            color: "#ffffff",
            textShadow: "0 8px 32px rgba(0,0,0,0.16)",
            margin: 0,
            textAlign: "center",
            textTransform: "uppercase",
            display: "flex",
            overflow: "hidden",
            justifyContent: "center",
          }}
        >
          {BRAND.split("").map((char, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                animation: `hl-letter-rise 0.55s cubic-bezier(0.22,1,0.36,1) ${0.08 + i * 0.045}s both`,
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Tagline — fade up */}
        <p
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)",
            margin: 0,
            textAlign: "center",
            animation: "hl-fade-up 0.5s cubic-bezier(0.22,1,0.36,1) 0.5s both",
          }}
        >
          {TAGLINE}
        </p>

        {/* Progress */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            width: "min(240px, 65vw)",
            animation: "hl-fade-up 0.5s cubic-bezier(0.22,1,0.36,1) 0.4s both",
          }}
        >
          <div
            style={{
              minWidth: 80,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 9999,
              padding: "10px 16px",
              background: "#111",
              color: "#fff",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.14em",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              animation: "hl-scale-in 0.4s cubic-bezier(0.22,1,0.36,1) 0.45s both",
            }}
          >
            {String(progress).padStart(2, "0")}%
          </div>

          {/* Bar */}
          <div
            style={{
              width: "100%",
              height: 8,
              borderRadius: 9999,
              background: "rgba(255,255,255,0.2)",
              overflow: "hidden",
              padding: 2,
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                borderRadius: 9999,
                background: "#ffffff",
                transition: "width 0.18s ease-out",
              }}
            />
          </div>
        </div>

        {/* Bottom decorative line */}
        <div
          style={{
            position: "absolute",
            bottom: 44,
            width: "min(120px, 30vw)",
            height: 1,
            background: "rgba(255,255,255,0.25)",
            transformOrigin: "center",
            animation: "hl-line-expand 1s cubic-bezier(0.22,1,0.36,1) 0.6s both",
          }}
        />
      </div>
    </>
  );

  return createPortal(loader, document.body);
}
