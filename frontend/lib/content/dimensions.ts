/**
 * Tiny SI dimension algebra: exponents of [M, L, T, I, Θ, N] (PLANS.md §7.1).
 * No mathjs dependency — this module is safe to import from anywhere.
 *
 * Used for honest unit handling in the formula lab: inputs are converted to
 * base SI before evaluation (`toBase`), results are formatted back into the
 * declared unit (`formatWithUnit`). Full symbolic dimensional analysis (catching
 * an authored formula whose LHS dimension ≠ its RHS) is deliberately out of
 * scope for Phase 4a — `mul`/`pow`/`same` are the primitives for it and belong
 * in `doctor` as a build-time check when needed, not in the request path.
 */
export type Dim = readonly [number, number, number, number, number, number];

export const DIMLESS: Dim = [0, 0, 0, 0, 0, 0];

/** Base and derived units the content corpus actually uses. */
export const UNITS: Record<string, { factor: number; dim: Dim }> = {
  m: { factor: 1, dim: [0, 1, 0, 0, 0, 0] },
  cm: { factor: 0.01, dim: [0, 1, 0, 0, 0, 0] },
  mm: { factor: 1e-3, dim: [0, 1, 0, 0, 0, 0] },
  "µm": { factor: 1e-6, dim: [0, 1, 0, 0, 0, 0] },
  nm: { factor: 1e-9, dim: [0, 1, 0, 0, 0, 0] },
  kg: { factor: 1, dim: [1, 0, 0, 0, 0, 0] },
  g: { factor: 1e-3, dim: [1, 0, 0, 0, 0, 0] },
  mg: { factor: 1e-6, dim: [1, 0, 0, 0, 0, 0] },
  s: { factor: 1, dim: [0, 0, 1, 0, 0, 0] },
  min: { factor: 60, dim: [0, 0, 1, 0, 0, 0] },
  h: { factor: 3600, dim: [0, 0, 1, 0, 0, 0] },
  A: { factor: 1, dim: [0, 0, 0, 1, 0, 0] },
  K: { factor: 1, dim: [0, 0, 0, 0, 1, 0] },
  mol: { factor: 1, dim: [0, 0, 0, 0, 0, 1] },
  N: { factor: 1, dim: [1, 1, -2, 0, 0, 0] },
  J: { factor: 1, dim: [1, 2, -2, 0, 0, 0] },
  W: { factor: 1, dim: [1, 2, -3, 0, 0, 0] },
  C: { factor: 1, dim: [0, 0, 1, 1, 0, 0] },
  "µC": { factor: 1e-6, dim: [0, 0, 1, 1, 0, 0] },
  V: { factor: 1, dim: [1, 2, -3, -1, 0, 0] },
  F: { factor: 1, dim: [-1, -2, 4, 2, 0, 0] },
  "µF": { factor: 1e-6, dim: [-1, -2, 4, 2, 0, 0] },
  nF: { factor: 1e-9, dim: [-1, -2, 4, 2, 0, 0] },
  pF: { factor: 1e-12, dim: [-1, -2, 4, 2, 0, 0] },
  "Ω": { factor: 1, dim: [1, 2, -3, -2, 0, 0] },
  ohm: { factor: 1, dim: [1, 2, -3, -2, 0, 0] },
  Pa: { factor: 1, dim: [1, -1, -2, 0, 0, 0] },
  kPa: { factor: 1e3, dim: [1, -1, -2, 0, 0, 0] },
  atm: { factor: 101325, dim: [1, -1, -2, 0, 0, 0] },
  bar: { factor: 1e5, dim: [1, -1, -2, 0, 0, 0] },
  Hz: { factor: 1, dim: [0, 0, -1, 0, 0, 0] },
  eV: { factor: 1.602176634e-19, dim: [1, 2, -2, 0, 0, 0] },
  deg: { factor: Math.PI / 180, dim: DIMLESS },
  L: { factor: 1e-3, dim: [0, 3, 0, 0, 0, 0] },
  mL: { factor: 1e-6, dim: [0, 3, 0, 0, 0, 0] },
};

export const mul = (a: Dim, b: Dim): Dim => a.map((v, i) => v + b[i]) as unknown as Dim;
export const div = (a: Dim, b: Dim): Dim => a.map((v, i) => v - b[i]) as unknown as Dim;
export const pow = (a: Dim, n: number): Dim => a.map((v) => v * n) as unknown as Dim;
export const same = (a: Dim, b: Dim) => a.every((v, i) => Math.abs(v - b[i]) < 1e-9);

/** Convert a declared value into base SI (unknown unit ⇒ treated as dimensionless). */
export const toBase = (value: number, unit?: string) => {
  const u = unit ? UNITS[unit] : undefined;
  return u ? { magnitude: value * u.factor, dim: u.dim } : { magnitude: value, dim: DIMLESS };
};

/** "8.85e-12 F/m"-style pretty print for the result chip. */
export const formatWithUnit = (n: number, unit?: string) => {
  const u = unit ? UNITS[unit] : undefined;
  const v = u ? n / u.factor : n;
  const digits = Math.abs(v) >= 1e4 || (Math.abs(v) < 1e-3 && v !== 0) ? 3 : 4;
  return `${Number(v.toPrecision(digits)).toString()}${unit ? ` ${unit}` : ""}`;
};
