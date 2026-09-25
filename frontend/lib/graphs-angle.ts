/**
 * Trigonometric angle engine for the Graph Bank.
 *
 * Real angles (degrees + radians), exact values at the standard angles for
 * all six functions, and asymptote positions — the shared vocabulary of the
 * trig graph pages. Values are exact strings (√3/2, 1/√3 …), not decimals,
 * because that is how the board asks them.
 */

export type TrigFn = "sin" | "cos" | "tan" | "cot" | "sec" | "cosec";

/** Standard angles of one 360° cycle in curriculum order. */
export const STANDARD_ANGLES: { deg: number; rad: string }[] = [
  { deg: 0, rad: "0" },
  { deg: 30, rad: "π/6" },
  { deg: 45, rad: "π/4" },
  { deg: 60, rad: "π/3" },
  { deg: 90, rad: "π/2" },
  { deg: 120, rad: "2π/3" },
  { deg: 135, rad: "3π/4" },
  { deg: 150, rad: "5π/6" },
  { deg: 180, rad: "π" },
  { deg: 210, rad: "7π/6" },
  { deg: 225, rad: "5π/4" },
  { deg: 240, rad: "4π/3" },
  { deg: 270, rad: "3π/2" },
  { deg: 300, rad: "5π/3" },
  { deg: 315, rad: "7π/4" },
  { deg: 330, rad: "11π/6" },
  { deg: 360, rad: "2π" },
];

/** Exact value strings for sin x at the standard angles (null = undefined). */
const SIN: (string | null)[] = [
  "0", "1/2", "√2/2 ≈ 0.71", "√3/2 ≈ 0.87", "1", "√3/2 ≈ 0.87", "√2/2 ≈ 0.71", "1/2",
  "0", "−1/2", "−√2/2 ≈ −0.71", "−√3/2 ≈ −0.87", "−1", "−√3/2 ≈ −0.87", "−√2/2 ≈ −0.71", "−1/2", "0",
];
const COS: (string | null)[] = [
  "1", "√3/2 ≈ 0.87", "√2/2 ≈ 0.71", "1/2", "0", "−1/2", "−√2/2 ≈ −0.71", "−√3/2 ≈ −0.87",
  "−1", "−√3/2 ≈ −0.87", "−√2/2 ≈ −0.71", "−1/2", "0", "1/2", "√2/2 ≈ 0.71", "√3/2 ≈ 0.87", "1",
];
const TAN: (string | null)[] = [
  "0", "1/√3 ≈ 0.58", "1", "√3 ≈ 1.73", null, "−√3 ≈ −1.73", "−1", "−1/√3 ≈ −0.58",
  "0", "1/√3 ≈ 0.58", "1", "√3 ≈ 1.73", null, "−√3 ≈ −1.73", "−1", "−1/√3 ≈ −0.58", "0",
];
const COT: (string | null)[] = [
  null, "√3 ≈ 1.73", "1", "1/√3 ≈ 0.58", "0", "−1/√3 ≈ −0.58", "−1", "−√3 ≈ −1.73",
  null, "√3 ≈ 1.73", "1", "1/√3 ≈ 0.58", "0", "−1/√3 ≈ −0.58", "−1", "−√3 ≈ −1.73", null,
];
const SEC: (string | null)[] = [
  "1", "2/√3 ≈ 1.15", "√2 ≈ 1.41", "2", null, "−2", "−√2 ≈ −1.41", "−2/√3 ≈ −1.15",
  "−1", "−2/√3 ≈ −1.15", "−√2 ≈ −1.41", "−2", null, "2", "√2 ≈ 1.41", "2/√3 ≈ 1.15", "1",
];
const CSC: (string | null)[] = [
  null, "2", "√2 ≈ 1.41", "2/√3 ≈ 1.15", "1", "2/√3 ≈ 1.15", "√2 ≈ 1.41", "2",
  null, "−2", "−√2 ≈ −1.41", "−2/√3 ≈ −1.15", "−1", "−2/√3 ≈ −1.15", "−√2 ≈ −1.41", "−2", null,
];

const TABLES: Record<TrigFn, (string | null)[]> = { sin: SIN, cos: COS, tan: TAN, cot: COT, sec: SEC, cosec: CSC };

/** Exact value of `fn` at `deg` (null where the function is undefined). */
export function exactValueAt(fn: TrigFn, deg: number): string | null {
  const row = TABLES[fn];
  const i = STANDARD_ANGLES.findIndex((a) => a.deg === deg);
  return i === -1 ? null : row[i];
}

/** Nearest standard angle ≤ deg (for snapping the drag readout). */
export function nearestStandardDeg(deg: number): number {
  let best = STANDARD_ANGLES[0].deg;
  let bestD = Infinity;
  for (const a of STANDARD_ANGLES) {
    const d = Math.abs(a.deg - deg);
    if (d < bestD) {
      bestD = d;
      best = a.deg;
    }
  }
  return best;
}

/** Radian label for an arbitrary angle (deg → multiple of π/180 simplified). */
export function radLabel(deg: number): string {
  const known = STANDARD_ANGLES.find((a) => a.deg === deg);
  if (known) return known.rad;
  if (deg === 0) return "0";
  // reduce deg/180
  const num = deg;
  const den = 180;
  const g = gcd(num, den);
  const n = num / g;
  const d = den / g;
  if (d === 1) return `${n}π`;
  return `${n}π/${d}`;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/** Degrees → radians (number). */
export const deg2rad = (deg: number) => (deg * Math.PI) / 180;

/** shape name → trig function (shared by the explorer and the quadrant map). */
export function shapeToTrigFn(shape: string): TrigFn | null {
  const map: Record<string, TrigFn> = {
    sine: "sin", cosine: "cos", tangent: "tan", cotangent: "cot", secant: "sec", cosecant: "cosec",
  };
  return map[shape] ?? null;
}

/** The four-axis story of one function: range, zeros, peaks, asymptotes, signs. */
export interface TrigVitals {
  /** What values the function outputs — e.g. "oscillates between −1 and 1". */
  range: string;
  /** Where the curve crosses zero, with the nπ family. */
  zeros: string;
  /** Where it reaches +1 / a maximum (when applicable). */
  peaks?: string;
  /** Where it reaches −1 / a minimum (when applicable). */
  troughs?: string;
  /** Vertical asymptote angles (when applicable). */
  asymptotes?: string;
  period: string;
  /** Quadrants (1-4) where the function is positive. */
  positiveQuads: (1 | 2 | 3 | 4)[];
  /** The ASTC rule line for this function. */
  astc: string;
  /** One exam-facing insight tying the circle to the curve. */
  note: string;
}

export const TRIG_VITALS: Record<TrigFn, TrigVitals> = {
  sin: {
    range: "Oscillates between −1 and 1 (amplitude 1)",
    zeros: "0°, 180°, 360° — x = nπ",
    peaks: "+1 at 90° (π/2 + 2πn)",
    troughs: "−1 at 270° (3π/2 + 2πn)",
    period: "360° (2π rad)",
    positiveQuads: [1, 2],
    astc: "S — Sine (and cosec) positive in Q1 & Q2",
    note: "sin θ IS the y-coordinate of the unit-circle point — the height of the rotating arm.",
  },
  cos: {
    range: "Oscillates between −1 and 1 (amplitude 1)",
    zeros: "90°, 270° — x = π/2 + nπ",
    peaks: "+1 at 0°, 360° (2πn)",
    troughs: "−1 at 180° (π + 2πn)",
    period: "360° (2π rad)",
    positiveQuads: [1, 4],
    astc: "C — Cosine (and secant) positive in Q1 & Q4",
    note: "cos θ IS the x-coordinate — the horizontal shadow of the rotating arm.",
  },
  tan: {
    range: "All real values (−∞ to +∞) — no amplitude",
    zeros: "0°, 180°, 360° — x = nπ",
    asymptotes: "90°, 270° — x = π/2 + nπ (cos θ = 0)",
    period: "180° (π rad) — repeats twice per turn",
    positiveQuads: [1, 3],
    astc: "T — Tangent (and cotangent) positive in Q1 & Q3",
    note: "tan θ = the arm's slope (y/x); it repeats every half-turn and explodes at cos θ = 0.",
  },
  cot: {
    range: "All real values (−∞ to +∞) — no amplitude",
    zeros: "90°, 270° — x = π/2 + nπ",
    asymptotes: "0°, 180°, 360° — x = nπ (sin θ = 0)",
    period: "180° (π rad) — repeats twice per turn",
    positiveQuads: [1, 3],
    astc: "T — Cotangent shares tan's quadrant signs (Q1 & Q3)",
    note: "cot θ = x/y — the reciprocal slope; it FALLS on every branch while tan rises.",
  },
  sec: {
    range: "(−∞, −1] ∪ [1, ∞) — never between −1 and 1",
    zeros: "None — sec θ is never zero",
    asymptotes: "90°, 270° — x = π/2 + nπ (cos θ = 0)",
    peaks: "+1 at 0°, 360° (2πn) — the cup bottoms",
    troughs: "−1 at 180° (π + 2πn) — the inverted-cup tops",
    period: "360° (2π rad)",
    positiveQuads: [1, 4],
    astc: "C — Secant shares cosine's quadrant signs (Q1 & Q4)",
    note: "sec θ = 1/cos θ — the arm's reciprocal reach; watch it escape the unit circle.",
  },
  cosec: {
    range: "(−∞, −1] ∪ [1, ∞) — never between −1 and 1",
    zeros: "None — cosec θ is never zero",
    asymptotes: "0°, 180°, 360° — x = nπ (sin θ = 0)",
    peaks: "+1 at 90° (π/2 + 2πn) — the cup bottoms",
    troughs: "−1 at 270° (3π/2 + 2πn) — the inverted-cup tops",
    period: "360° (2π rad)",
    positiveQuads: [1, 2],
    astc: "S — Cosecant shares sine's quadrant signs (Q1 & Q2)",
    note: "cosec θ = 1/sin θ — the reciprocal height; it blows up wherever the arm crosses the x-axis.",
  },
};

/** Where each function's vertical asymptotes sit, in degrees (one cycle). */
export const ASYMPTOTES_DEG: Record<TrigFn, number[]> = {
  sin: [],
  cos: [],
  tan: [90, 270],
  cot: [0, 180, 360],
  sec: [90, 270],
  cosec: [0, 180, 360],
};

/** Where each function's zeros sit, in degrees (one cycle). */
export const ZEROS_DEG: Record<TrigFn, number[]> = {
  sin: [0, 180, 360],
  cos: [90, 270],
  tan: [0, 180, 360],
  cot: [90, 270],
  sec: [],
  cosec: [],
};
