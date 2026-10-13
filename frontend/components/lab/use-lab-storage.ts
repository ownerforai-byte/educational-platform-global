"use client";

import { useEffect, useState } from "react";

export function useLabStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {
      // Corrupt or unreadable entries fall back to the initial value.
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage unavailable or full — the panel keeps working in memory.
    }
  }, [key, value, hydrated]);

  return [value, setValue, hydrated] as const;
}

export function labStorageKey(labId: string, name: string): string {
  return `lab:${name}:${labId}`;
}
