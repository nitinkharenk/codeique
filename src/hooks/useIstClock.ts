"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

let currentTick = Date.now();
let intervalId: number | null = null;
const listeners = new Set<() => void>();

function emitTick() {
  currentTick = Date.now();
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  if (!intervalId && typeof window !== "undefined") {
    emitTick();
    intervalId = window.setInterval(emitTick, 1000);
  }

  return () => {
    listeners.delete(listener);

    if (!listeners.size && intervalId) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  };
}

function getSnapshot() {
  return currentTick;
}

export function useIstClock(format: "short" | "long" = "long") {
  const now = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const formatter = useMemo(() => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    };

    if (format === "long") {
      options.second = "2-digit";
    }

    return new Intl.DateTimeFormat("en-IN", options);
  }, [format]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return formatter.format(new Date(now));
}
