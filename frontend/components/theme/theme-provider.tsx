"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { observeLiteResourcePolicy } from "@/lib/perf/low-data-policy";

const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=Noto+Sans:wght@300;400;500;600;700&family=Noto+Sans+Devanagari:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap";

export type Theme =
  | "light"
  | "dark"
  | "cyberpunk"
  | "emerald"
  | "sepia"
  | "nord"
  | "amber"
  | "oled"
  | "nebula"
  | "system";

export interface ThemeOption {
  id: Theme;
  label: string;
  description: string;
  badge: string;
  colors: {
    bg: string;
    primary: string;
    border: string;
  };
  isDark: boolean;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "light",
    label: "Light Mode",
    description: "Bright, clean reading with clear contrast",
    badge: "Daylight",
    colors: { bg: "#f8fafc", primary: "#2563eb", border: "#cbd5e1" },
    isDark: false,
  },
  {
    id: "dark",
    label: "Midnight Slate",
    description: "Deep, comfortable dark mode",
    badge: "Default Dark",
    colors: { bg: "#0f172a", primary: "#38bdf8", border: "#334155" },
    isDark: true,
  },
  {
    id: "cyberpunk",
    label: "Cyber Neon",
    description: "Electric violet & luminous magenta",
    badge: "Neon Sci-Fi",
    colors: { bg: "#130924", primary: "#d946ef", border: "#701a75" },
    isDark: true,
  },
  {
    id: "emerald",
    label: "Forest Emerald",
    description: "Calm dark pine & organic mint highlights",
    badge: "Biology & Nature",
    colors: { bg: "#061810", primary: "#10b981", border: "#065f46" },
    isDark: true,
  },
  {
    id: "sepia",
    label: "Warm Sepia",
    description: "Gentle paper cream for long reading sessions",
    badge: "Eye-Care Book",
    colors: { bg: "#fbf7ee", primary: "#b45309", border: "#d97706" },
    isDark: false,
  },
  {
    id: "nord",
    label: "Nordic Frost",
    description: "Arctic slate & glacier ice blue",
    badge: "Nord Polar",
    colors: { bg: "#18202c", primary: "#88c0d0", border: "#4c566a" },
    isDark: true,
  },
  {
    id: "amber",
    label: "Sunset Amber",
    description: "Warm glowing obsidian & molten gold",
    badge: "Physics Glow",
    colors: { bg: "#150d06", primary: "#f59e0b", border: "#78350f" },
    isDark: true,
  },
  {
    id: "oled",
    label: "Pure OLED Black",
    description: "Absolute pitch black for maximum battery & contrast",
    badge: "AMOLED True Black",
    colors: { bg: "#000000", primary: "#3b82f6", border: "#27272a" },
    isDark: true,
  },
  {
    id: "nebula",
    label: "Nebula Sky",
    description: "Deep-space sky with twinkling stars — the universe look",
    badge: "Space & Stars",
    colors: { bg: "#0b0f22", primary: "#b4c2ff", border: "#2a3355" },
    isDark: true,
  },
  {
    id: "system",
    label: "System",
    description: "Follow your device's light or dark preference",
    badge: "Auto",
    colors: { bg: "#f8fafc", primary: "#334155", border: "#cbd5e1" },
    isDark: false,
  },
];

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  liteStorageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "dark" | "light";
  liteMode: boolean;
  setLiteMode: (enabled: boolean) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "light",
  liteMode: false,
  setLiteMode: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

const ALL_THEME_CLASSES = [
  "light",
  "dark",
  "cyberpunk",
  "emerald",
  "sepia",
  "nord",
  "amber",
  "oled",
  "nebula",
];

export function isTheme(value: string | null): value is Theme {
  return value === "system" || ALL_THEME_CLASSES.includes(value ?? "");
}

/** Apply a theme synchronously so a deliberate switch never waits for a reload. */
function applyTheme(theme: Theme): "dark" | "light" {
  const activeTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  const isDark = THEME_OPTIONS.find((option) => option.id === activeTheme)?.isDark ?? false;
  const root = document.documentElement;

  root.classList.remove(...ALL_THEME_CLASSES);
  root.classList.add(isDark ? "dark" : "light", activeTheme);
  root.dataset.theme = activeTheme;
  root.style.colorScheme = isDark ? "dark" : "light";

  const themeColor = THEME_OPTIONS.find((option) => option.id === activeTheme)?.colors.bg;
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    "content",
    themeColor ?? (isDark ? "#0f172a" : "#f8fafc"),
  );

  return isDark ? "dark" : "light";
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "neb-theme",
  liteStorageKey = "neb-lite-mode",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light");
  const [liteMode, setLiteModeState] = useState<boolean>(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.dataset.lite === "true";
    }
    return false;
  });

  useEffect(() => {
    let initialTheme = theme;
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (isTheme(stored)) initialTheme = stored;
    } catch {
      // Storage can be unavailable in private browsing; keep the in-memory theme.
    }

    if (initialTheme !== theme) setThemeState(initialTheme);
    setResolvedTheme(applyTheme(initialTheme));

    if (initialTheme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemTheme = () => setResolvedTheme(applyTheme("system"));
    media.addEventListener?.("change", syncSystemTheme);
    return () => media.removeEventListener?.("change", syncSystemTheme);
  }, [theme, storageKey]);

  useEffect(() => {
    let savedLiteMode: string | null = null;
    try {
      savedLiteMode = window.localStorage.getItem(liteStorageKey);
    } catch {
      // Continue with connection hints when storage is unavailable.
    }
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const connectionIsConstrained =
      connection?.saveData === true ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";
    const enabled = savedLiteMode === null ? connectionIsConstrained : savedLiteMode === "true";
    setLiteModeState(enabled);
    document.documentElement.dataset.lite = String(enabled);
    document.documentElement.classList.toggle("lite", enabled);
  }, [liteStorageKey]);

  // Apply one low-data policy to every route, including content mounted later
  // by client navigation: defer nonessential media requests and low-priority
  // images while preserving explicit eager/high-priority resources.
  useEffect(() => observeLiteResourcePolicy(document.documentElement), []);

  // Keep the page's chosen fonts, but fetch Google Fonts only after first
  // paint and never fetch them while Lite mode is active.
  useEffect(() => {
    if (
      liteMode ||
      document.documentElement.dataset.lite === "true" ||
      document.getElementById("ravi-google-fonts")
    ) return;
    const head = document.head;

    for (const [id, href] of [
      ["ravi-fonts-preconnect", "https://fonts.googleapis.com"],
      ["ravi-fonts-static-preconnect", "https://fonts.gstatic.com"],
    ]) {
      if (document.getElementById(id)) continue;
      const link = document.createElement("link");
      link.id = id;
      link.rel = "preconnect";
      link.href = href;
      if (href.includes("gstatic")) link.crossOrigin = "anonymous";
      head.append(link);
    }

    const stylesheet = document.createElement("link");
    stylesheet.id = "ravi-google-fonts";
    stylesheet.rel = "stylesheet";
    stylesheet.href = GOOGLE_FONTS_URL;
    head.append(stylesheet);
  }, [liteMode]);

  // Stable callbacks so the memoized context value never changes on re-render.
  const setTheme = useCallback(
    (newTheme: Theme) => {
      try {
        window.localStorage.setItem(storageKey, newTheme);
      } catch {
        // Theme switching still works for this session when storage is blocked.
      }
      setResolvedTheme(applyTheme(newTheme));
      setThemeState(newTheme);
    },
    [storageKey],
  );

  const setLiteMode = useCallback(
    (enabled: boolean) => {
      try {
        window.localStorage.setItem(liteStorageKey, String(enabled));
      } catch {
        // The preference remains active in memory for this session.
      }
      document.documentElement.dataset.lite = String(enabled);
      document.documentElement.classList.toggle("lite", enabled);
      if (enabled) {
        document.getElementById("ravi-google-fonts")?.remove();
        document.getElementById("ravi-fonts-preconnect")?.remove();
        document.getElementById("ravi-fonts-static-preconnect")?.remove();
      }
      setLiteModeState(enabled);
    },
    [liteStorageKey],
  );

  const value = useMemo<ThemeProviderState>(
    () => ({
      theme,
      setTheme,
      resolvedTheme,
      liteMode,
      setLiteMode,
    }),
    [theme, setTheme, resolvedTheme, liteMode, setLiteMode],
  );

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

