/**
 * Graph shape library — normalized curve generators for the Graph Bank.
 *
 * Every generator maps x ∈ [0, 1] to y ∈ [0, 1] (bottom-left origin) and
 * returns an SVG path string. Shape names are referenced by graph entries.
 */

export type ShapeName =
  | "constant" | "linear" | "linearRise" | "linearFall" | "parabola" | "parabolaDown"
  | "cubic" | "expRise" | "expDecay" | "expDecayToFloor" | "log" | "sqrt" | "saturate"
  | "sine" | "cosine" | "dampedWave" | "fringes" | "tangent" | "sigmoid" | "sigmoidDown"
  | "hyperbola" | "bell" | "vshape" | "peak" | "barrier" | "sawtooth" | "step" | "circle"
  | "ellipse" | "sideHyperbola" | "diode" | "resonancePeak";

const N = 64;

function path(fn: (x: number) => number, opts?: { clampMin?: number; clampMax?: number }): string {
  const pts: string[] = [];
  for (let i = 0; i <= N; i++) {
    const x = i / N;
    let y = fn(x);
    if (opts?.clampMin !== undefined) y = Math.max(opts.clampMin, y);
    if (opts?.clampMax !== undefined) y = Math.min(opts.clampMax, y);
    y = Math.min(1, Math.max(0, y));
    pts.push(`${(x * 100).toFixed(2)},${((1 - y) * 100).toFixed(2)}`);
  }
  return "M" + pts.join(" L");
}

/** Two-branch curves rendered as separate subpaths. */
function branch(paths: string[]): string {
  return paths.join(" M");
}

export const SHAPE_GENERATORS: Record<ShapeName, (variant?: number) => string> = {
  constant: () => path(() => 0.5),
  linear: (v = 0.5) => path((x) => 0.25 + (v - 0.25) * x),
  linearRise: () => path((x) => x),
  linearFall: () => path((x) => 1 - x),
  parabola: (v = 1) => path((x) => v * (x - 0.5) * (x - 0.5) / 0.25),
  parabolaDown: () => path((x) => 1 - (x * x)),
  cubic: () => path((x) => (x - 0.5) * (x - 0.5) * (x - 0.5) / 0.125 + 0.5),
  expRise: (v = 5) => path((x) => (Math.exp(v * x) - 1) / (Math.exp(v) - 1)),
  expDecay: (v = 5) => path((x) => Math.exp(-v * x)),
  expDecayToFloor: (v = 5) => path((x) => 0.1 + 0.9 * Math.exp(-v * x)),
  log: () => path((x) => (x <= 0.02 ? 0 : Math.log(1 + 9 * x) / Math.log(10)), { clampMin: 0 }),
  sqrt: () => path((x) => Math.sqrt(x)),
  saturate: (v = 8) => path((x) => (v * x) / (1 + v * x)),
  sine: () => path((x) => 0.5 + 0.5 * Math.sin(2 * Math.PI * x)),
  cosine: () => path((x) => 0.5 + 0.5 * Math.cos(2 * Math.PI * x)),
  dampedWave: (v = 4) => path((x) => 0.5 + 0.5 * Math.exp(-1.6 * x) * Math.sin(v * Math.PI * x)),
  fringes: (v = 12) => path((x) => Math.max(0, Math.cos(v * Math.PI * x) ** 2)),
  tangent: () => branch([path((x) => 0.5 + 0.45 * Math.tan(Math.PI * (x - 0.25)) / Math.tan(Math.PI * 0.22), { clampMin: -0.15, clampMax: 1.15 }), path((x) => 0.5 + 0.45 * Math.tan(Math.PI * (x + 0.25 - 1)) / Math.tan(Math.PI * 0.22), { clampMin: -0.15, clampMax: 1.15 })]),
  sigmoid: (v = 10) => path((x) => 1 / (1 + Math.exp(-v * (x - 0.5)))),
  sigmoidDown: (v = 10) => path((x) => 1 - 1 / (1 + Math.exp(-v * (x - 0.5)))),
  hyperbola: () => branch([path((x) => x <= 0.015 ? 0.98 : Math.min(0.98, 0.04 / x), { clampMax: 0.98 }), path((x) => x <= 0.015 ? 0.02 : Math.max(0.02, 0.04 / (x - 0.001) * 0 + 1.04 - x), { clampMax: 0.98 })].slice(0, 1).concat([path((x) => x >= 0.985 ? 0.02 : Math.max(0.02, Math.min(0.98, 1.04 - x * 1.04)))])),
  bell: (v = 7) => path((x) => Math.exp(-v * (x - 0.5) * (x - 0.5))),
  vshape: () => path((x) => Math.abs(2 * x - 1)),
  peak: (v = 8) => path((x) => 4 * v * x * (1 - x) / (1 + v * 4 * (x - 0.5) * (x - 0.5)) * 0.25 + 0.75 * Math.exp(-30 * (x - 0.5) * (x - 0.5))),
  barrier: () => path((x) => 0.1 + 0.85 * Math.exp(-28 * (x - 0.42) * (x - 0.42))),
  sawtooth: (v = 4) => path((x) => 0.5 + 0.42 * Math.sin(v * Math.PI * x) * Math.exp(-0.12 * x)),
  step: (v = 4) => path((x) => Math.floor(x * v) / (v - 1) * 0.9 + 0.05),
  circle: () => branch([path((x) => Math.sqrt(Math.max(0, 0.25 - (x - 0.5) * (x - 0.5))) + 0.5), path((x) => -Math.sqrt(Math.max(0, 0.25 - (x - 0.5) * (x - 0.5))) + 0.5)]),
  ellipse: () => branch([path((x) => Math.sqrt(Math.max(0, 1 - ((x - 0.5) / 0.48) ** 2)) * 0.32 + 0.5), path((x) => -Math.sqrt(Math.max(0, 1 - ((x - 0.5) / 0.48) ** 2)) * 0.32 + 0.5)]),
  sideHyperbola: () => branch([path((x) => 0.25 / Math.max(0.06, x) * 0.5 + 0.25, { clampMax: 0.95 }), path((x) => 0.95 - 0.25 / Math.max(0.06, x) * 0.5, { clampMin: 0.05 })]),
  diode: () => branch([path((x) => x < 0.45 ? 0.5 - (0.45 - x) * 0.12 : 0.5 + Math.exp((x - 0.5) * 18) * 0.02, { clampMax: 0.95 }, ), path((x) => 0.5 - (0.5 - x) * 0.06)]),
  resonancePeak: (v = 14) => path((x) => (0.06 + 0.9 / (1 + v * 8 * (x - 0.45) * (x - 0.45))) * (x < 0.02 ? x / 0.02 : 1)),
};

export function shapeToPath(shape: ShapeName, variant?: number): string {
  const gen = SHAPE_GENERATORS[shape] ?? SHAPE_GENERATORS.linear;
  try {
    return gen(variant);
  } catch {
    return SHAPE_GENERATORS.linear();
  }
}

/**
 * Continuous y(x) evaluators — the explorer samples these directly (the
 * generators above only emit path strings). Values mirror the PRIMARY branch
 * of multi-branch shapes; normalized x,y ∈ [0,1] clamped for plotting.
 */
const PRIMARY_FNS: Record<ShapeName, (x: number, v?: number) => number> = {
  constant: () => 0.5,
  linear: (x, v = 0.5) => 0.25 + (v - 0.25) * x,
  linearRise: (x) => x,
  linearFall: (x) => 1 - x,
  parabola: (x, v = 1) => (v * (x - 0.5) * (x - 0.5)) / 0.25,
  parabolaDown: (x) => 1 - x * x,
  cubic: (x) => ((x - 0.5) ** 3) / 0.125 + 0.5,
  expRise: (x, v = 5) => (Math.exp(v * x) - 1) / (Math.exp(v) - 1),
  expDecay: (x, v = 5) => Math.exp(-v * x),
  expDecayToFloor: (x, v = 5) => 0.1 + 0.9 * Math.exp(-v * x),
  log: (x) => (x <= 0.02 ? 0 : Math.log(1 + 9 * x) / Math.log(10)),
  sqrt: (x) => Math.sqrt(x),
  saturate: (x, v = 8) => (v * x) / (1 + v * x),
  sine: (x) => 0.5 + 0.5 * Math.sin(2 * Math.PI * x),
  cosine: (x) => 0.5 + 0.5 * Math.cos(2 * Math.PI * x),
  dampedWave: (x, v = 4) => 0.5 + 0.5 * Math.exp(-1.6 * x) * Math.sin(v * Math.PI * x),
  fringes: (x, v = 12) => Math.max(0, Math.cos(v * Math.PI * x) ** 2),
  tangent: (x) => 0.5 + (0.45 * Math.tan(Math.PI * (x - 0.25))) / Math.tan(Math.PI * 0.22),
  sigmoid: (x, v = 10) => 1 / (1 + Math.exp(-v * (x - 0.5))),
  sigmoidDown: (x, v = 10) => 1 - 1 / (1 + Math.exp(-v * (x - 0.5))),
  hyperbola: (x) => (x <= 0.015 ? 0.98 : Math.min(0.98, 0.04 / x)),
  bell: (x, v = 7) => Math.exp(-v * (x - 0.5) * (x - 0.5)),
  vshape: (x) => Math.abs(2 * x - 1),
  peak: (x, v = 8) =>
    (4 * v * x * (1 - x)) / (1 + v * 4 * (x - 0.5) * (x - 0.5)) * 0.25 +
    0.75 * Math.exp(-30 * (x - 0.5) * (x - 0.5)),
  barrier: (x) => 0.1 + 0.85 * Math.exp(-28 * (x - 0.42) * (x - 0.42)),
  sawtooth: (x, v = 4) => 0.5 + 0.42 * Math.sin(v * Math.PI * x) * Math.exp(-0.12 * x),
  step: (x, v = 4) => (Math.floor(x * v) / (v - 1)) * 0.9 + 0.05,
  circle: (x) => Math.sqrt(Math.max(0, 0.25 - (x - 0.5) * (x - 0.5))) + 0.5,
  ellipse: (x) => Math.sqrt(Math.max(0, 1 - ((x - 0.5) / 0.48) ** 2)) * 0.32 + 0.5,
  sideHyperbola: (x) => Math.min(0.95, (0.25 / Math.max(0.06, x)) * 0.5 + 0.25),
  diode: (x) => (x < 0.45 ? 0.5 - (0.45 - x) * 0.12 : 0.5 + Math.exp((x - 0.5) * 18) * 0.02),
  resonancePeak: (x, v = 14) =>
    (0.06 + 0.9 / (1 + v * 8 * (x - 0.45) * (x - 0.45))) * (x < 0.02 ? x / 0.02 : 1),
};

const clamp01 = (y: number) => Math.min(1, Math.max(0, y));

/** y at a normalized x on a shape's primary branch, clamped to [0,1]. */
export function shapeYAt(shape: ShapeName, variant: number | undefined, x: number): number {
  const fn = PRIMARY_FNS[shape] ?? PRIMARY_FNS.linear;
  try {
    return clamp01(fn(Math.min(1, Math.max(0, x)), variant));
  } catch {
    return 0.5;
  }
}

/** Numeric first derivative dy/dx (normalized units). */
export function shapeSlopeAt(shape: ShapeName, variant: number | undefined, x: number): number {
  const h = 0.004;
  const x0 = Math.min(1 - h, Math.max(h, x));
  return (shapeYAt(shape, variant, x0 + h) - shapeYAt(shape, variant, x0 - h)) / (2 * h);
}

/** Trapezoid area under the curve from 0 to x (normalized units). */
export function shapeAreaUntil(shape: ShapeName, variant: number | undefined, x: number): number {
  const n = 96;
  const xa = Math.min(1, Math.max(0, x));
  const h = xa / n;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += (shapeYAt(shape, variant, (i * xa) / n) + shapeYAt(shape, variant, ((i + 1) * xa) / n)) / 2;
  }
  return sum * h;
}

