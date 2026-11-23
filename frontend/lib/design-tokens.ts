/**
 * Design token registry (PLATFORM_UPGRADE_MASTER_PLAN §3.2).
 * CSS variables in `app/globals.css` remain the runtime source; this module
 * exposes stable names for tests, Storybook, and programmatic theming.
 */

export const TYPE_SCALE_VARS = [
  "--type-scale-00",
  "--type-scale-01",
  "--type-scale-02",
  "--type-scale-03",
  "--type-scale-04",
  "--type-scale-05",
  "--type-scale-06",
  "--type-scale-07",
  "--type-scale-08",
  "--type-scale-09",
  "--type-scale-10",
  "--type-scale-11",
  "--type-scale-12",
  "--type-scale-13",
] as const;

export const SEMANTIC_COLORS = {
  primary: "hsl(var(--primary) / <alpha-value>)",
  background: "hsl(var(--background) / <alpha-value>)",
  foreground: "hsl(var(--foreground) / <alpha-value>)",
  border: "hsl(var(--border) / <alpha-value>)",
  muted: "hsl(var(--muted) / <alpha-value>)",
} as const;

export type TypeScaleVar = (typeof TYPE_SCALE_VARS)[number];