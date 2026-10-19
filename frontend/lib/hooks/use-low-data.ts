"use client";

/**
 * useLowData — the single source of truth for "data-saver mode" across the
 * frontend. The signal is already set on `<html data-lite>` by the theme
 * bootstrap in app/layout.tsx (it auto-detects `navigator.saveData` and the
 * connection's `effectiveType`). This hook re-broadcasts it as a live React
 * value, exposes an explicit user override, and persists the choice in
 * `localStorage` so subsequent page loads restore it before React hydrates.
 *
 * A component can opt in three ways:
 *
 *   const lite = useLowData();
 *   if (lite) return <CheapFallback />;            // gate a heavy tree
 *   return <img src={lite ? thumb : full} ... />;  // pick a resource
 *
 * Or via the CSS-only escape hatch: any `data-lite-aware` element hides
 * itself when lite is on (see app/globals.css).
 */
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "neb-lite-mode";
const HTML_ATTR = "lite";

/** Three-value state: on, off, or follow the browser's automatic hint. */
export type LitePreference = "auto" | "on" | "off";

/** Effective low-data mode (after applying the preference to the auto hint). */
export function isLiteActive(pref: LitePreference, auto: boolean): boolean {
  if (pref === "on") return true;
  if (pref === "off") return false;
  return auto;
}

/** Read the browser's automatic hint: saveData or 2g/slow-2g. */
export function readAutoLiteHint(): boolean {
  if (typeof navigator === "undefined") return false;
  const conn =
    (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
  if (!conn) return false;
  if (conn.saveData) return true;
  return conn.effectiveType === "2g" || conn.effectiveType === "slow-2g";
}

function readHtmlLite(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset[HTML_ATTR] === "true";
}

function readPref(): LitePreference {
  if (typeof localStorage === "undefined") return "auto";
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === "on" || raw === "off") return raw;
  return "auto";
}

function applyToHtml(lite: boolean) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset[HTML_ATTR] = lite ? "true" : "false";
}

function applyPref(pref: LitePreference) {
  const auto = readAutoLiteHint();
  const lite = isLiteActive(pref, auto);
  applyToHtml(lite);
  return { auto, lite };
}

export interface LowData {
  /** True when the page should use the cheap, fast, low-data surface. */
  active: boolean;
  /** The user's preference (auto / on / off). */
  preference: LitePreference;
  /** The browser's automatic hint (saveData or 2g). */
  autoHint: boolean;
  /** Update the user preference and persist it. */
  setPreference: (next: LitePreference) => void;
}

export function useLowData(): LowData {
  // Read the value already on <html data-lite> so the first paint matches
  // what the bootstrap script computed (no hydration mismatch, no flash).
  const [active, setActive] = useState<boolean>(() => readHtmlLite());
  const [preference, setPrefState] = useState<LitePreference>(() => readPref());
  const [autoHint, setAutoHint] = useState<boolean>(() => readAutoLiteHint());

  // Re-derive when the preference changes.
  useEffect(() => {
    const { auto, lite } = applyPref(preference);
    setActive(lite);
    setAutoHint(auto);
  }, [preference]);

  // The connection type can change at runtime (e.g. wifi -> cellular). Track
  // it so the "auto" preference tracks reality.
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const conn = (navigator as Navigator & {
      connection?: EventTarget & { saveData?: boolean; effectiveType?: string };
    }).connection;
    if (!conn) return;
    const update = () => {
      const auto = readAutoLiteHint();
      setAutoHint(auto);
      const lite = isLiteActive(preference, auto);
      setActive(lite);
      applyToHtml(lite);
    };
    conn.addEventListener?.("change", update);
    return () => conn.removeEventListener?.("change", update);
  }, [preference]);

  const setPreference = useCallback((next: LitePreference) => {
    if (typeof localStorage !== "undefined") {
      if (next === "auto") localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, next);
    }
    setPrefState(next);
  }, []);

  return { active, preference, autoHint, setPreference };
}
