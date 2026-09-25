"use client";

import { useEffect, useRef } from "react";

type HSLTriple = { h: number; s: number; l: number };

function parseHslVar(raw: string): HSLTriple {
  const trimmed = raw.trim();
  const parts = trimmed.split(/\s+/);
  const h = parseFloat(parts[0] ?? "0");
  const s = parseFloat((parts[1] ?? "0%").replace("%", "")) / 100;
  const l = parseFloat((parts[2] ?? "0%").replace("%", "")) / 100;
  return { h, s, l };
}

function hslToRgb({ h, s, l }: HSLTriple): [number, number, number] {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x;
  }
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const full = clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function normalizeChannel(v: number): number {
  const srgb = v / 255;
  return srgb <= 0.03928 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);
}

export function luminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map(normalizeChannel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function luminanceFromHsl(hsl: HSLTriple): number {
  return luminance(hslToRgb(hsl));
}

export function luminanceFromVar(raw: string): number {
  return luminanceFromHsl(parseHslVar(raw));
}

export function luminanceFromHex(hex: string): number {
  return luminance(hexToRgb(hex));
}

export function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function isAA(kind: "bodyText" | "largeText", ratio: number): boolean {
  if (kind === "bodyText") return ratio >= 4.5;
  return ratio >= 3;
}

export type ThemeCheckPair = {
  id: string;
  foreground: string;
  background: string;
  kind: "bodyText" | "largeText";
  description: string;
  fgResolver?: "hsl-var" | "hex";
  bgResolver?: "hsl-var" | "hex";
  fgValue?: string;
  bgValue?: string;
};

export const THEME_COLOR_CHECK_PAIRS: ThemeCheckPair[] = [
  {
    id: "subject-physics-card",
    foreground: "--subject-physics",
    background: "--card",
    kind: "bodyText",
    description: "Physics accent vs card background",
  },
  {
    id: "subject-chemistry-card",
    foreground: "--subject-chemistry",
    background: "--card",
    kind: "bodyText",
    description: "Chemistry accent vs card background",
  },
  {
    id: "subject-biology-card",
    foreground: "--subject-biology",
    background: "--card",
    kind: "bodyText",
    description: "Biology accent vs card background",
  },
  {
    id: "subject-mathematics-card",
    foreground: "--subject-mathematics",
    background: "--card",
    kind: "bodyText",
    description: "Mathematics accent vs card background",
  },
  {
    id: "subject-english-card",
    foreground: "--subject-english",
    background: "--card",
    kind: "bodyText",
    description: "English accent vs card background",
  },
  {
    id: "subject-nepali-card",
    foreground: "--subject-nepali",
    background: "--card",
    kind: "bodyText",
    description: "Nepali accent vs card background",
  },
  {
    id: "primary-vs-primary-foreground",
    foreground: "--primary",
    background: "--primary-foreground",
    kind: "bodyText",
    description: "Primary vs primary foreground (button text)",
  },
  {
    id: "muted-vs-muted-foreground",
    foreground: "--muted",
    background: "--muted-foreground",
    kind: "bodyText",
    description: "Muted surface vs muted foreground",
  },
  {
    id: "accent-cyan-700-card",
    foreground: "--accent-cyan",
    background: "--card",
    kind: "bodyText",
    description: "Accent cyan vs card background",
  },
  {
    id: "accent-violet-700-card",
    foreground: "--accent-violet",
    background: "--card",
    kind: "bodyText",
    description: "Accent violet vs card background",
  },
  {
    id: "accent-emerald-700-card",
    foreground: "--accent-emerald",
    background: "--card",
    kind: "bodyText",
    description: "Accent emerald vs card background",
  },
  {
    id: "accent-amber-700-card",
    foreground: "--accent-amber",
    background: "--card",
    kind: "bodyText",
    description: "Accent amber vs card background",
  },
  {
    id: "accent-rose-700-card",
    foreground: "--accent-rose",
    background: "--card",
    kind: "bodyText",
    description: "Accent rose vs card background",
  },
];

export type ContrastAuditRow = {
  id: string;
  description: string;
  pair: string;
  ratio: string;
  aa: string;
  pass: boolean;
};

export function auditContrast(
  root: Element,
  pairs: ThemeCheckPair[] = THEME_COLOR_CHECK_PAIRS,
): ContrastAuditRow[] {
  const style = getComputedStyle(root);
  return pairs.map((pair) => {
    const fgRaw = style.getPropertyValue(pair.foreground).trim();
    const bgRaw = style.getPropertyValue(pair.background).trim();
    let fgLum: number;
    let bgLum: number;
    try {
      fgLum = fgRaw.startsWith("#") ? luminanceFromHex(fgRaw) : luminanceFromVar(fgRaw);
    } catch {
      fgLum = 0;
    }
    try {
      bgLum = bgRaw.startsWith("#") ? luminanceFromHex(bgRaw) : luminanceFromVar(bgRaw);
    } catch {
      bgLum = 1;
    }
    const ratio = contrastRatio(fgLum, bgLum);
    const pass = isAA(pair.kind, ratio);
    return {
      id: pair.id,
      description: pair.description,
      pair: `${pair.foreground} / ${pair.background}`,
      ratio: ratio.toFixed(2),
      aa: `${pair.kind} (${pair.kind === "bodyText" ? "≥4.5" : "≥3"})`,
      pass,
    };
  });
}

export function DevContrastAudit(): null {
  const lastThemeRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (process.env.NODE_ENV === "production") return;

    const runAudit = () => {
      const root = document.documentElement;
      const theme = root.getAttribute("data-theme") ?? "unknown";
      if (theme === lastThemeRef.current) return;
      lastThemeRef.current = theme;

      const rows = auditContrast(root);
      const failures = rows.filter((r) => !r.pass);

      if (failures.length > 0) {
        console.warn(
          `%c[DevContrastAudit] theme=%c${theme}%c — ${failures.length}/${rows.length} pair(s) below WCAG AA`,
          "color:#f59e0b;font-weight:bold",
          "color:#60a5fa;font-weight:bold",
          "color:inherit",
        );
        console.table(failures, ["id", "description", "pair", "ratio", "aa", "pass"]);
      } else {
        console.info(
          `%c[DevContrastAudit] theme=%c${theme}%c — all ${rows.length} pairs pass WCAG AA ✓`,
          "color:#10b981;font-weight:bold",
          "color:#60a5fa;font-weight:bold",
          "color:inherit",
        );
      }
    };

    runAudit();

    const observer = new MutationObserver(() => {
      const t = document.documentElement.getAttribute("data-theme");
      if (t !== lastThemeRef.current) runAudit();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
