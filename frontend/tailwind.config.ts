import type { Config } from "tailwindcss";

const colorFromHslVar = (name: string, fallbackOpacity = 1) => ({
  DEFAULT: `hsl(var(--${name}) / <alpha-value>)`,
  ...Object.fromEntries(
    [
      [50, 97], [100, 93], [200, 86], [300, 76],
      [400, 63], [500, 50], [600, 39], [700, 30],
      [800, 21], [900, 14], [950, 8],
    ].map(([step, l]) => [
      step,
      `hsl(var(--${name}-${step}, var(--${name}) ${l}% 1) / <alpha-value>)`,
    ]),
  ),
});

const subjectColorFromVar = (name: string) => ({
  DEFAULT: `hsl(var(--${name}) / <alpha-value>)`,
  ...Object.fromEntries(
    [
      [50, 97], [100, 94], [200, 86], [300, 76],
      [400, 64], [500, 52], [600, 40], [700, 32],
      [800, 23], [900, 15], [950, 8],
    ].map(([step, l]) => [
      step,
      `hsl(var(--${name}-${step}, var(--${name}) ${l}% 1) / <alpha-value>)`,
    ]),
  ),
});

const elevShadow = (step: string) => `var(--elev-${step})`;

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "Noto Sans",
          "Noto Sans Devanagari",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "var(--font-display, 'Space Grotesk')",
          "Inter",
          "Noto Sans",
          "Noto Sans Devanagari",
          "system-ui",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        nepali: ["Noto Sans Devanagari", "Inter", "system-ui", "sans-serif"],
        numerical: ["Inter", "JetBrains Mono", "ui-sans-serif", "system-ui"],
      },
      letterSpacing: {
        tighterer: "-0.04em",
      },
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input, var(--border)) / <alpha-value>)",
        ring: "hsl(var(--ring, var(--primary)) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, var(--muted)) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground, var(--muted-foreground)) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0 72% 51%) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground, 0 0% 98%) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, var(--muted)) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground, var(--muted-foreground)) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover, var(--card)) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground, var(--card-foreground)) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        side: {
          DEFAULT: "hsl(var(--side, var(--card)) / <alpha-value>)",
          foreground: "hsl(var(--side-foreground, var(--card-foreground)) / <alpha-value>)",
          border: "hsl(var(--side-border, var(--border)) / <alpha-value>)",
          accent: "hsl(var(--side-accent, var(--primary)/0.12) / <alpha-value>)",
        },
        "ai-blue": "hsl(var(--ai-blue) / <alpha-value>)",
        "accent-cyan": colorFromHslVar("accent-cyan"),
        "accent-violet": colorFromHslVar("accent-violet"),
        "accent-emerald": colorFromHslVar("accent-emerald"),
        "accent-amber": colorFromHslVar("accent-amber"),
        "accent-rose": colorFromHslVar("accent-rose"),
        "subject-physics": subjectColorFromVar("subject-physics"),
        "subject-chemistry": subjectColorFromVar("subject-chemistry"),
        "subject-biology": subjectColorFromVar("subject-biology"),
        "subject-mathematics": subjectColorFromVar("subject-mathematics"),
        "subject-english": subjectColorFromVar("subject-english"),
        "subject-nepali": subjectColorFromVar("subject-nepali"),
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 10px)",
      },
      boxShadow: {
        "elev-0": elevShadow("0"),
        "elev-1": elevShadow("1"),
        "elev-2": elevShadow("2"),
        "elev-3": elevShadow("3"),
        "elev-4": elevShadow("4"),
        "elev-5": elevShadow("5"),
        "elev-6": elevShadow("6"),
        "elev-7": elevShadow("7"),
        "card-viz": "0 1px 2px rgba(15,23,42,0.04), 0 18px 48px -24px rgba(15,23,42,0.30)",
        "inner-soft": "inset 0 1px 0 rgba(255,255,255,0.03), inset 0 0 0 1px rgba(148,163,184,0.08)",
      },
      gridTemplateColumns: {
        '18': 'repeat(18, minmax(0, 1fr))',
        'layout-viz': 'minmax(0, 1fr) minmax(280px, 24rem)',
      },
      spacing: {
        'header-h': '3.5rem',
        'header-h-d': '4rem',
      },
      keyframes: {
        "ornate-in": {
          "0%": { opacity: "0", transform: "translateY(4px) scale(0.995)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "grid-pan": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "120px 120px" },
        },
      },
      animation: {
        "ornate-in": "ornate-in 380ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "grid-pan": "grid-pan 60s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
