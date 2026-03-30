"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const SCRAMBLE_CHARS = "!<>-_/[]{}=+*^?#~01";
const SCRAMBLE_INTERVAL_MS = 18;
const SCRAMBLE_STEP = 0.7;

type ScrambleTextProps = {
  children: string;
  className?: string;
  interactive?: boolean;
  triggerKey?: string | number | null;
};

export function ScrambleText({
  children,
  className = "",
  interactive = true,
  triggerKey,
}: ScrambleTextProps) {
  const reduceMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState(children);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const previousTriggerRef = useRef<string | number | null | undefined>(
    triggerKey,
  );

  useEffect(() => {
    setDisplayText(children);
  }, [children]);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (
      triggerKey == null ||
      triggerKey === previousTriggerRef.current ||
      reduceMotion
    ) {
      previousTriggerRef.current = triggerKey;
      return;
    }

    previousTriggerRef.current = triggerKey;
    startScramble();
  }, [triggerKey, reduceMotion]);

  const startScramble = () => {
    if (reduceMotion) {
      setDisplayText(children);
      return;
    }

    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
    }

    let iteration = 0;
    setIsScrambling(true);

    intervalRef.current = window.setInterval(() => {
      const nextText = children
        .split("")
        .map((char, index) => {
          if (char === " ") {
            return " ";
          }

          if (index < iteration) {
            return children[index];
          }

          return SCRAMBLE_CHARS[
            Math.floor(Math.random() * SCRAMBLE_CHARS.length)
          ];
        })
        .join("");

      setDisplayText(nextText);
      iteration += SCRAMBLE_STEP;

      if (iteration >= children.length) {
        if (intervalRef.current !== null) {
          window.clearInterval(intervalRef.current);
        }

        intervalRef.current = null;
        setDisplayText(children);
        setIsScrambling(false);
      }
    }, SCRAMBLE_INTERVAL_MS);
  };

  return (
    <span
      className={`relative inline-grid align-top ${className}`.trim()}
      onMouseEnter={interactive ? startScramble : undefined}
      aria-label={children}
    >
      <span aria-hidden className="invisible whitespace-pre-wrap [grid-area:1/1]">
        {children}
      </span>
      <span
        aria-hidden
        className="whitespace-pre-wrap [grid-area:1/1] transition-[color,text-shadow] duration-200"
        style={
          isScrambling
            ? {
                color: "var(--color-accent)",
                textShadow: "0 0 18px rgba(255, 73, 37, 0.28)",
              }
            : undefined
        }
      >
        {displayText}
      </span>
    </span>
  );
}
