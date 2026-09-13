"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme =
  | "light"
  | "dark"
  | "cyberpunk"
  | "emerald"
  | "sepia"
  | "nord"
  | "amber"
  | "oled"
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
    label: "Clean Slate",
    description: "Crisp, daylight educational theme",
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
];

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "dark" | "light";
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "light",
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
];

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "neb-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Theme | null;
    if (stored) setTheme(stored);
  }, [storageKey]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(...ALL_THEME_CLASSES);

    let activeTheme = theme;
    if (activeTheme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      activeTheme = prefersDark ? "dark" : "light";
    }

    const selectedConfig = THEME_OPTIONS.find((t) => t.id === activeTheme);
    const isDark = selectedConfig ? selectedConfig.isDark : activeTheme === "dark";

    // Set base class (light or dark for Tailwind dark: utility compatibility)
    if (isDark) {
      root.classList.add("dark");
      setResolvedTheme("dark");
    } else {
      root.classList.add("light");
      setResolvedTheme("light");
    }

    // Set specific theme class
    root.classList.add(activeTheme);
    root.setAttribute("data-theme", activeTheme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
    resolvedTheme,
  };

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
