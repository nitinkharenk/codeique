"use client";

/**
 * CustomCursor
 * ────────────
 * Replaces the native OS cursor with a two-layer design:
 *   • Dot  — snaps instantly to pointer position (stiffness: 800)
 *   • Ring — lags behind with a spring (stiffness: 150) for depth
 *
 * Cursor states are auto-detected from DOM:
 *   <a>      → "link"   (ring expands, dot shrinks)
 *   <button> → "button" (ring fills with accent, dot disappears)
 *   [data-cursor="view"]        → "view"   (large ring + "View" label)
 *   [data-cursor="drag"]        → "drag"   (ring + "Drag" label)
 *   [data-cursor="hidden"]      → hidden cursor
 *   [data-cursor-label="..."]   → custom label inside ring
 *
 * Only rendered on pointer:fine (mouse) devices. Touch devices keep
 * the native cursor and this component renders nothing.
 *
 * Add `cursor-none` class to <body> via globals.css when cursor is active.
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";

/* ── Types ── */

type CursorVariant = "default" | "link" | "button" | "view" | "drag" | "hidden";

interface CursorState {
  variant: CursorVariant;
  label: string;
}

/* ── Spring configs ── */

const DOT_SPRING = { stiffness: 800, damping: 35, mass: 0.3 };
const RING_SPRING = { stiffness: 130, damping: 18, mass: 0.8 };

/* ── Ring size per variant ── */

const RING_SCALE: Record<CursorVariant, number> = {
  default: 1,
  link: 1.8,
  button: 2.4,
  view: 3.2,
  drag: 2.8,
  hidden: 0,
};

export function CustomCursor() {
  const [isMouse, setIsMouse] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursor, setCursor] = useState<CursorState>({ variant: "default", label: "" });
  const { theme } = useTheme();
  const isLight = theme === "light";

  /* ── Raw position (used for both springs) ── */
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  /* ── Dot — near instant ── */
  const dotX = useSpring(rawX, DOT_SPRING);
  const dotY = useSpring(rawY, DOT_SPRING);

  /* ── Ring — springy lag ── */
  const ringX = useSpring(rawX, RING_SPRING);
  const ringY = useSpring(rawY, RING_SPRING);

  /* ── Only run on mouse (pointer:fine) devices ── */
  useEffect(() => {
    const isPointerFine = window.matchMedia("(pointer: fine)").matches;
    setIsMouse(isPointerFine);
    if (!isPointerFine) return;

    /* Hide native cursor while custom is active */
    document.documentElement.classList.add("has-custom-cursor");

    /* Track mouse position */
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    /* Detect what's under the cursor */
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      /* Explicit override always wins */
      const explicit = target.closest("[data-cursor]") as HTMLElement | null;
      if (explicit) {
        setCursor({
          variant: (explicit.dataset.cursor as CursorVariant) ?? "default",
          label: explicit.dataset.cursorLabel ?? "",
        });
        return;
      }

      /* Auto-detect semantics */
      if (target.closest("button")) {
        setCursor({ variant: "button", label: "" });
      } else if (target.closest("a")) {
        setCursor({ variant: "link", label: "" });
      } else {
        setCursor({ variant: "default", label: "" });
      }
    };

    const onLeaveDoc = () => setIsVisible(false);
    const onEnterDoc = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeaveDoc);
    document.addEventListener("mouseenter", onEnterDoc);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeaveDoc);
      document.removeEventListener("mouseenter", onEnterDoc);
      document.documentElement.classList.remove("has-custom-cursor");
    };
    // isVisible kept out of deps intentionally — only controls first-show
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawX, rawY]);

  if (!isMouse) return null;

  const scale = RING_SCALE[cursor.variant];
  const isHidden = cursor.variant === "hidden";

  return (
    <>
      {/* ── Dot ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{ x: dotX, y: dotY }}
        animate={{ opacity: isVisible && !isHidden ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      >
        <motion.div
          className={`rounded-full ${isLight ? "bg-black" : "bg-white"}`}
          style={{ width: 6, height: 6 }}
          animate={{
            scale: cursor.variant === "button" || cursor.variant === "link" ? 0 : 1,
          }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      {/* ── Ring ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: isVisible && !isHidden ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          className="relative flex items-center justify-center rounded-full"
          style={{ width: 34, height: 34 }}
          animate={{ scale }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Border ring */}
          <div className={`absolute inset-0 rounded-full border ${isLight ? "border-black/50" : "border-white/40"}`} />

          {/* Accent fill — view / button states */}
          <motion.div
            className="absolute inset-0 rounded-full bg-[var(--color-accent)]"
            animate={{
              opacity:
                cursor.variant === "view" || cursor.variant === "drag" ? 0.14
                : cursor.variant === "button" ? 0.1
                : 0,
            }}
            transition={{ duration: 0.2 }}
          />

          {/* Label */}
          <AnimatePresence mode="wait">
            {cursor.label && (
              <motion.span
                key={cursor.label}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className={`relative z-10 select-none font-mono text-[8px] font-bold uppercase tracking-[0.18em] ${isLight ? "text-black" : "text-white"}`}
              >
                {cursor.label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}
