/**
 * Graph Bank — comparison layer for multi-condition graphs (Chem, Bio, Math).
 */

import type { GraphCompareNote } from "@/lib/graphs";

export const COMPARE_CHEM_BIO_MATH: Record<string, GraphCompareNote> = {
  "chem-order-diagnostics": {
    series: [
      { label: "ln[A] vs t (1st order)", meaning: "If plotting the natural log of concentration against time gives a STRAIGHT line, the reaction is first order." },
      { label: "1/[A] vs t (2nd order)", meaning: "If instead the reciprocal concentration straightens against time, the reaction is second order." },
    ],
    differences: [
      "Same raw data, two linearisations: whichever one produces a straight line reveals the order.",
      "First order: equal half-lives forever. Second order: half-lives DOUBLE each period.",
      "Only one of the two lines will be straight — the other curves away.",
    ],
    identify: [
      "Straight ln[A] plot → k = −slope, first order. Straight 1/[A] plot → k = +slope, second order.",
      "If neither straightens, the reaction is zero order (A itself vs t) or something more complex.",
    ],
  },
  "chem-maxwell-boltzmann": {
    series: [
      { label: "low T", meaning: "Tall, narrow peak near low energy — most molecules crowd just above zero; tiny high-energy tail." },
      { label: "high T", meaning: "Flatter, broader curve shifted right — many molecules carry high energy; the tail reaches far." },
    ],
    differences: [
      "TOTAL area under both curves is identical (same number of molecules) — only the SHAPE moves.",
      "The fraction above Ea (shaded) is small at low T but explodes at high T — that's why +10°C can double the rate.",
      "The peak energy (most probable) shifts right and DROPS as T rises — flattening is unavoidable.",
    ],
    identify: [
      "Taller and left = cooler gas. Flatter, shifted right, longer tail = hotter gas.",
      "Ea line fixed: compare the shaded area right of it between the two curves.",
    ],
  },
  "chem-energy-profile": {
    series: [
      { label: "uncatalysed", meaning: "One large hump — reactants must climb the full activation energy Ea in a single step." },
      { label: "catalysed", meaning: "Two smaller humps — the catalyst offers an alternative path with a much lower energy barrier." },
    ],
    differences: [
      "The catalyst LOWERS the maximum hump but the reactant/product plateaus (ΔH) never move.",
      "The catalysed path usually has TWO humps (through an intermediate), not one.",
      "Ea is smaller in BOTH directions on the catalysed path — forward and reverse speeds rise together.",
    ],
    identify: [
      "Bigger single hump = uncatalysed. Double hump with lower crest = catalysed.",
      "Check ΔH: identical in both — the catalyst changes the road, not the destination heights.",
    ],
  },
  "chem-k-vs-t": {
    series: [
      { label: "endothermic (ΔH > 0)", meaning: "Rises steeply with temperature — heating strongly favours the reaction (van't Hoff)." },
      { label: "exothermic (ΔH < 0)", meaning: "Rises more gently and can flatten or fall at high T — heat is a product, so heating pushes the balance back." },
    ],
    differences: [
      "Both grow with T initially (Arrhenius), but the endothermic curve climbs far more steeply.",
      "At high temperature the curves separate: endothermic keeps gaining, exothermic loses ground.",
      "Le Chatelier made graphical: heat helps the heat-consuming direction, hurts the heat-releasing one.",
    ],
    identify: [
      "Steeper riser = endothermic. Flattening curve = exothermic.",
      "Where they cross in your mind: beyond it, the endothermic reaction wins the temperature game.",
    ],
  },
  "chem-titration-curve": {
    series: [
      { label: "strong acid + strong base", meaning: "Starts very low (~pH 1–2), equivalence jump centred at pH 7, ends ~13." },
      { label: "weak acid + strong base", meaning: "Starts higher (~pH 3–4) with a buffer flat, equivalence point ABOVE 7, ends ~13." },
    ],
    differences: [
      "Initial pH differs — the weak acid barely dissociates, so it starts 1–2 units higher.",
      "Equivalence position: exactly 7 for strong–strong; ABOVE 7 for weak–strong (conjugate base hydrolyses).",
      "The weak–strong curve has a pronounced buffer flat before the jump — strong–strong plunges earlier.",
    ],
    identify: [
      "Symmetric jump about 7 → strong–strong (any indicator works). Jump pushed to the basic side → weak acid (use phenolphthalein).",
      "Half-equivalence pH = pKa — readable only on the weak–strong curve.",
    ],
  },
  "chem-solubility-t": {
    series: [
      { label: "KNO₃ (steep)", meaning: "Solubility climbs sharply with temperature — hot water dissolves vastly more than cold." },
      { label: "NaCl (flat)", meaning: "Almost horizontal — temperature barely changes how much dissolves." },
    ],
    differences: [
      "Cooling a hot saturated KNO₃ solution dumps a large crop of crystals; cooling NaCl gives almost none.",
      "Fractional crystallisation exploits exactly this slope difference to separate the two salts.",
      "NaCl's flatness is why salt is recovered by evaporation, not cooling.",
    ],
    identify: [
      "Steep line = temperature-sensitive salt (KNO₃). Flat line = temperature-insensitive (NaCl).",
      "Yield per 10°C drop ≈ the vertical gap between the curve's two temperatures.",
    ],
  },
  "bio-enzyme-ph": {
    series: [
      { label: "pepsin (pH ~2)", meaning: "Bell curve centred near pH 2 — the stomach's protein-digesting enzyme works in acid." },
      { label: "trypsin (pH ~8)", meaning: "Bell curve centred near pH 8 — the intestine's enzyme needs alkaline conditions." },
    ],
    differences: [
      "Same bell SHAPE, completely different optima — the curves barely overlap.",
      "Each enzyme's active-site charges are tuned to its organ's pH: swap them and both fail.",
      "Extreme pH denatures both permanently — the far tails are cliffs, not valleys.",
    ],
    identify: [
      "The peak's position names the enzyme: ~2 → pepsin, ~8 → trypsin.",
      "Shape is universal; position is specialisation — a favourite NEB contrast.",
    ],
  },
  "bio-population-growth": {
    series: [
      { label: "exponential (J)", meaning: "Unchecked doubling — the J-curve rockets upward with no ceiling until collapse." },
      { label: "logistic (S)", meaning: "Growth that decelerates as resources bind, flattening at the carrying capacity K." },
    ],
    differences: [
      "The S-curve has an inflection at K/2 — its fastest point — where growth begins to slow; the J-curve has none.",
      "Same early phase: both look exponential at first (plenty of resources).",
      "The J-curve's 'end' is a crash; the S-curve's end is a stable plateau at K.",
    ],
    identify: [
      "No ceiling visible → J-curve. Flattening toward a level → S-curve.",
      "Harvest math: the S-curve's K/2 point gives maximum sustainable yield; the J-curve offers no such handle.",
    ],
  },
  "bio-oxygen-dissociation": {
    series: [
      { label: "pH 7.4", meaning: "The standard sigmoid — haemoglobin's cooperative binding under normal tissue conditions." },
      { label: "Bohr shift (low pH, CO₂)", meaning: "The SAME curve pushed RIGHT — lower affinity, oxygen lets go more easily." },
    ],
    differences: [
      "At any given PO₂ the shifted curve is LESS saturated — oxygen unloads where it's acidic and CO₂-rich.",
      "P50 (the PO₂ at 50% saturation) moves right under the Bohr shift — the single number that tracks the change.",
      "Loading in the lungs is barely affected (both curves near-saturated there); unloading in tissues changes dramatically.",
    ],
    identify: [
      "Right curve = Bohr shift (active muscle conditions). Left/standard = resting pH 7.4.",
      "Fetal Hb sits LEFT of both — higher affinity to steal oxygen across the placenta.",
    ],
  },
  "math-linear": {
    series: [
      { label: "m > 0", meaning: "Rising straight line — the function increases: bigger x, bigger y." },
      { label: "m < 0", meaning: "Falling straight line — the function decreases: bigger x, smaller y." },
    ],
    differences: [
      "Same steepness rules, opposite directions — the sign of m is the whole difference.",
      "Both hit the x-axis at x = −c/m; one crosses descending, the other ascending.",
      "Rising line: negative slope never appears. Falling line: never positive.",
    ],
    identify: [
      "Read left-to-right: up = m > 0, down = m < 0.",
      "Steeper line = larger |m| regardless of sign.",
    ],
  },
  "math-quadratic": {
    series: [
      { label: "a > 0", meaning: "Valley parabola — vertex is a MINIMUM; range is [k, ∞)." },
      { label: "a < 0", meaning: "Dome parabola — vertex is a MAXIMUM; range is (−∞, k]." },
    ],
    differences: [
      "Mirror images through their vertex tangent: the sign of a flips the bowl.",
      "a > 0 grows without bound both ways upward; a < 0 both ways downward.",
      "Discriminant geometry identical — roots exist where the curve meets the axis, whichever way it opens.",
    ],
    identify: [
      "Opens up (holds water) → a > 0. Opens down (spills) → a < 0.",
      "Vertex: lowest point of the valley, highest point of the dome — the optimisation answer either way.",
    ],
  },
  "math-exponential": {
    series: [
      { label: "a > 1", meaning: "Growth curve — slow start, explosive climb; doubles every fixed interval." },
      { label: "0 < a < 1", meaning: "Decay curve — the mirror image; halves every fixed interval, hugging zero." },
    ],
    differences: [
      "Both pass through (0, 1) and both have the x-axis as a horizontal asymptote — on opposite ends.",
      "Growth's asymptote is on the LEFT (y→0 as x→−∞); decay's is on the RIGHT.",
      "Equal x-steps MULTIPLY y by a: >1 grows it, <1 shrinks it — the base's sign of intent.",
    ],
    identify: [
      "Climbing right = growth (a > 1). Dying right = decay (0 < a < 1).",
      "Neither curve ever touches zero or goes negative — range is strictly (0, ∞).",
    ],
  },
  "math-sine-reciprocals": {
    series: [
      { label: "sec x", meaning: "Reciprocal of cosine — cups centred on cos x's crests (x = 2πn) and troughs (π + 2πn), asymptotes where cos = 0." },
      { label: "cosec x", meaning: "Reciprocal of sine — identical cups shifted right by π/2, asymptotes at nπ where sin = 0." },
      { label: "cot x", meaning: "Reciprocal of tan — falling branches, asymptotes at nπ, zeros at π/2 + nπ: tan with zeros and poles swapped." },
    ],
    differences: [
      "Cup curves (sec, cosec) never enter the band −1 < y < 1; branch curves (tan, cot) fill all of ℝ — the two families look nothing alike.",
      "tan rises on every branch; cot falls on every branch — the S-curves are point reflections of each other about their zero crossings.",
      "Asymptote sets differ: sec at π/2 + nπ, cosec and cot at nπ — the zeros of the function being reciprocated always kill its reciprocal.",
    ],
    identify: [
      "U-cups above and below the axis → secant (centre cups at even multiples of π) or cosecant (centre cups at odd multiples of π/2).",
      "Falling S-branches → cot. Rising S-branches → tan.",
      "Cup minima at y = 1 sit exactly on the parent wave's crests — trace which parent (sin or cos) and the name follows.",
    ],
  },
  "math-inverse-trig": {
    series: [
      { label: "sin⁻¹x (range −π/2..π/2)", meaning: "Rises through the origin, defined only on [−1, 1] — returns the angle whose sine is x." },
      { label: "cos⁻¹x", meaning: "Falls from π/2 to 0 across [−1, 1] — returns the angle whose cosine is x." },
    ],
    differences: [
      "arcsin rises; arccos falls — everywhere on the shared domain their slopes have opposite signs.",
      "Identity link: cos⁻¹x = π/2 − sin⁻¹x — the two curves are mirror complements.",
      "arcsin passes through (0,0); arccos through (0, π/2) — the anchor points.",
    ],
    identify: [
      "Rising through the origin → arcsin. Falling from π/2 → arccos.",
      "Both flatten vertically near x = ±1 — the derivative blows up at the domain edges.",
    ],
  },
  "chem-arrhenius-plot": {
    series: [
      { label: "small Ea (shallow line)", meaning: "Low barrier reaction: k barely changes with temperature — the line hardly tilts." },
      { label: "large Ea (steep line)", meaning: "High barrier reaction: k is violently temperature-sensitive — the line plunges as 1/T grows." },
    ],
    differences: [
      "Same axes, same physical law — only the slope separates them.",
      "The steep line loses rate far faster when cooled (rightward on the axis).",
      "At very high temperature (left edge) both lines converge near ln A — the ceiling rate.",
    ],
    identify: [
      "Whichever line falls harder as 1/T increases is the high-Ea reaction.",
      "Read slope × (−R) to rank the activation energies numerically.",
      "A shifted-but-parallel line signals a changed mechanism or catalyst — slopes compare only where the mechanism holds.",
    ],
  },
  "chem-conductivity-dilution": {
    series: [
      { label: "strong electrolyte (KCl)", meaning: "Gentle near-linear rise: all ions already free; dilution only un-crowds them." },
      { label: "weak electrolyte (CH₃COOH)", meaning: "Steep runaway rise: each dilution step dissociates more molecules into ions." },
    ],
    differences: [
      "The strong line is straight-ish; the weak curve hugs zero then rockets.",
      "At high dilution both crowd toward Λm⁰ from very different starting heights.",
      "The weak curve's shape IS the degree of dissociation plotted against dilution.",
    ],
    identify: [
      "Gentle, nearly straight rise = strong. Steep, curved rise from near zero = weak.",
      "If extrapolating the straight line to zero concentration gives a clean intercept → strong electrolyte.",
      "Fix the concentration and compare heights — same c, weak sits far below strong.",
    ],
  },
  "bio-enzyme-inhibition": {
    series: [
      { label: "no inhibitor", meaning: "Reference saturation: the enzyme's natural Km and Vmax." },
      { label: "competitive inhibitor", meaning: "Same ceiling, stretched right — apparent Km rises, Vmax survives." },
      { label: "non-competitive inhibitor", meaning: "Same Km, lowered ceiling — Vmax is cut down permanently." },
    ],
    differences: [
      "At high [S] the competitive curve JOINS the reference; the non-competitive one never does.",
      "At low [S] all three look slow — the inhibitor story only reveals itself at the ceilings.",
      "Km (the midpoint) moves right for competitive; it stays put for non-competitive.",
    ],
    identify: [
      "Ceilings equal but curves apart = competitive.",
      "Ceiling pressed lower = non-competitive.",
      "Flood with substrate: whichever curve catches up to the reference was the competitive one.",
    ],
  },
  "bio-survivorship": {
    series: [
      { label: "Type I (sigmoid-down)", meaning: "Death waits until old age — the curve holds high then cliffs. Humans, elephants." },
      { label: "Type II (straight line)", meaning: "Constant death fraction at every age — risk has no age bias. Songbirds, hydra." },
      { label: "Type III (steep decay)", meaning: "Death floods the young; survivors tail off. Fish, insects, oysters." },
    ],
    differences: [
      "At mid-life Type I still stands near the top, Type III is already crawling near the floor.",
      "Type II is the great straight middle — the geometric 'no memory' of age.",
      "The three curves agree only at the two endpoints: everything starts at 100%, everything ends at 0%.",
    ],
    identify: [
      "High-then-cliff = Type I. Constant slope = Type II. Instant plunge = Type III.",
      "Match to life history: heavy parental care → Type I; millions of eggs → Type III.",
      "If unsure, read the first quarter: 90s% survivors = I, steady decline = II, single digits = III.",
    ],
  },
  "bio-predator-prey": {
    series: [
      { label: "prey (hare)", meaning: "Rises first on abundant food; crashes when predator numbers peak." },
      { label: "predator (lynx)", meaning: "Follows the prey — its peaks and crashes trail the prey's by roughly a quarter cycle." },
    ],
    differences: [
      "The curves never peak together: the vertical gap between peaks IS the interaction lag.",
      "Both oscillate at the same period but permanently out of phase — the system's signature.",
      "When prey is high and predators are still climbing, the crash is already mathematically scheduled.",
    ],
    identify: [
      "Whichever wave peaks first is the prey; the lagging wave is the predator.",
      "The lag is about a quarter period — not exactly zero, not exactly opposite.",
      "If the waves were in step, the species would not be interacting — check the lag to confirm coupling.",
    ],
  },
};
