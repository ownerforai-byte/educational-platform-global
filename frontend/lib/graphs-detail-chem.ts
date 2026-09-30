/**
 * Graph Bank — detail layer, Chemistry (kinetics, energetics, periodicity).
 */

import type { GraphDetailInfo } from "@/lib/graphs";

export const DETAIL_CHEM: Record<string, GraphDetailInfo> = {
  "chem-order-diagnostics": {
    gives: [
      "Reaction order read straight from curve shape: horizontal line = zero order, straight line through origin = first order, upward parabola = second order.",
      "The rate constant's position: intercept (zero order) or slope (first/second order).",
      "Rate at any concentration — plug the point into the identified order's law.",
    ],
    applies: [
      "The 'initial rates' method: diagnose order before writing any rate law.",
      "Predicting how a reaction responds to dilution or concentration changes.",
      "Designing industrial reactors where rate ∝ concentration matters for yield.",
    ],
    happens: [
      "Switch to the zero-order line: rate ignores concentration entirely — the catalyst surface is saturated.",
      "Switch to first order: double the concentration, double the rate — a proportionality you can see as a straight line.",
      "Switch to second order: doubling concentration quadruples the rate — the parabola's steepening makes it obvious.",
    ],
    limits: [
      "Only valid at constant temperature (k changes with T — a different graph).",
      "Isolation method assumption: only one concentration varied at a time.",
      "Complex/multi-step reactions can mimic simple orders over limited ranges.",
    ],
  },
  "chem-rate-time": {
    gives: [
      "Rate decaying with time — the kinetic fingerprint as reactants are consumed.",
      "Half-life read from consecutive halvings; constant half-life ⇒ first order.",
      "Instantaneous rate at any time from the tangent slope.",
    ],
    applies: [
      "Monitoring reactions by sampling concentration over time.",
      "Shelf-life prediction for pharmaceuticals and food.",
      "Distinguishing orders: first order falls exponentially, zero order falls linearly.",
    ],
    happens: [
      "Drag along a first-order curve: rate halves every half-life, forever — the exponential signature.",
      "A zero-order reaction's straight falling line hits zero at a definite time — reactant exhausted.",
      "Tangent steepens at the start where concentration (and hence rate) is largest.",
    ],
    limits: [
      "Constant temperature assumed throughout the run.",
      "Reverse reactions ignored (early-time assumption).",
      "Detection must track one species cleanly — side reactions distort the tail.",
    ],
  },
  "chem-maxwell-boltzmann": {
    gives: [
      "The energy distribution of molecules: number vs kinetic energy at a given temperature.",
      "The most-probable energy (peak), mean energy (slightly right of it), and the long high-energy tail.",
      "The fraction of molecules above activation energy Ea — the shaded area that reacts.",
    ],
    applies: [
      "Explaining temperature effects on rate WITHOUT changing Ea (the curve moves, the threshold doesn't).",
      "Catalyst reasoning: the catalyst lowers Ea, so a bigger fraction lies above the line.",
      "Diffusion/evaporation discussions — the tail explains why evaporation cools.",
    ],
    happens: [
      "Raise the temperature in your head: the peak flattens and slides right — the shaded above-Ea area explodes even for a modest ΔT.",
      "Draw Ea further right: reaction gets rarer — fewer molecules make the cut.",
      "Add a catalyst (lower Ea line leftward): the shaded fraction jumps — same molecules, easier threshold.",
    ],
    limits: [
      "Ideal-gas distribution — dense phases and strong interactions distort it.",
      "Equilibrium picture only: says nothing about collisions' orientation (the steric factor).",
    ],
  },
  "chem-energy-profile": {
    gives: [
      "The reaction coordinate story: reactants → transition state → products in one picture.",
      "Ea forward (up the hump from reactants) and Ea backward (up from products).",
      "ΔH as the height difference between the two plateaus — exothermic down, endothermic up.",
    ],
    applies: [
      "Mechanism analysis: which step is rate-determining (tallest hump).",
      "Catalyst arguments: the hump lowers, the plateaus never move.",
      "Explaining reversibility: products must climb Ea-backward to return.",
    ],
    happens: [
      "Drag across the hump: energy climbs to the transition state — the 'point of no return' at the summit.",
      "Add a catalyst in your head: two smaller humps replace one big one; ΔH is untouched.",
      "Exothermic layout: products sit lower — the difference is the heat released.",
    ],
    limits: [
      "One-dimensional simplification — real reactions explore multi-dimensional energy surfaces.",
      "Single-step picture; multi-step mechanisms need several humps.",
    ],
  },
  "chem-k-vs-t": {
    gives: [
      "The Arrhenius rise: k grows exponentially with temperature.",
      "A small ΔT producing a large rate jump — visible as the curve's steepening.",
      "Activation energy from an Arrhenius plot (ln k vs 1/T line, slope = −Ea/R).",
    ],
    applies: [
      "Industrial yield planning (why reactions are run hot).",
      "Food spoilage and drug expiry estimates (Q10 rule-of-thumb).",
      "Comparing two reactions' temperature sensitivity via their slopes.",
    ],
    happens: [
      "Drag up in temperature: k rises slowly at first, then explosively — the exponential's signature.",
      "+10°C can double or triple k: the shaded high-energy fraction grows geometrically.",
      "Higher Ea (steeper curve): the same ΔT buys a much bigger jump.",
    ],
    limits: [
      "Ea assumed constant with T; the Arrhenius equation is an approximation.",
      "Breaks down if the mechanism changes with temperature.",
    ],
  },
  "chem-titration-curve": {
    gives: [
      "pH versus titrant volume: flat buffer regions and the near-vertical equivalence jump.",
      "Equivalence point at the jump's centre; half-equivalence where pH = pKa (Henderson–Hasselbalch).",
      "Indicator selection: any indicator changing colour inside the jump works.",
    ],
    applies: [
      "Acid–base analysis and standardisation of solutions.",
      "pKa determination for weak acids — read straight at half-equivalence.",
      "Comparing strong–strong, weak–strong, strong–weak curve families.",
    ],
    happens: [
      "Drag through the buffer region: added base barely moves the pH — flat and reassuring.",
      "Hit equivalence: one extra drop swings pH by several units — the vertical cliff.",
      "Weak acid + strong base: the jump starts higher and ends lower than the strong–strong case.",
    ],
    limits: [
      "Only titratable species; mixtures with overlapping pKas blur the jump.",
      "Activity vs concentration ignored (pH meter measures activity).",
    ],
  },
  "chem-vapour-pressure-t": {
    gives: [
      "Vapour pressure climbing exponentially with temperature (Clausius–Clapeyron).",
      "Boiling point where the curve crosses atmospheric pressure.",
      "Relative volatility comparisons for distillation design.",
    ],
    applies: [
      "Distillation and evaporation engineering.",
      "Altitude cooking: lower Patm crosses the curve earlier — water boils cooler.",
      "Pressure-cooker logic: raise Patm, the crossing point (and boiling T) moves right.",
    ],
    happens: [
      "Drag along the curve: vapour pressure roughly doubles every 10°C — the exponential signature.",
      "Where the curve meets the 1 atm line: bulk boiling begins.",
      "More volatile liquids sit on higher curves — they boil earlier at any pressure.",
    ],
    limits: [
      "Pure substances only; solutions follow Raoult-colligative shifted curves.",
      "Ignores the critical point where the very concept of vapour pressure ends.",
    ],
  },
  "chem-solubility-t": {
    gives: [
      "Solubility versus temperature per salt: most rise, a few (Ce₂(SO₄)₃) fall.",
      "Crystallisation yield from the solubility gap between two temperatures.",
      "Fractional crystallisation feasibility — the steeper the line, the easier the separation.",
    ],
    applies: [
      "Recrystallisation purification — dissolve hot, cool, harvest crystals.",
      "Explaining boiler scale (calcium salts with retrograde solubility).",
      "Choosing solvents for recrystallisation in the lab.",
    ],
    happens: [
      "Drag along a rising line: hot solvent holds much more solute; cooling dumps the excess as crystals.",
      "A falling line means heating precipitates the salt — the boiler-scale surprise.",
      "Steep lines give high recovery per degree cooled.",
    ],
    limits: [
      "Equilibrium values; fast cooling can supersaturate and skip the line.",
      "Hydrate transitions make some curves kinked, not smooth.",
    ],
  },
  "chem-atomic-radius-trend": {
    gives: [
      "Atomic radius versus atomic number: a sawtooth — decreasing across each period, jumping at each new shell.",
      "The periodicity itself: the pattern repeats with period equal to the shell count.",
      "Quantitative evidence for electron shells.",
    ],
    applies: [
      "Periodicity teaching: effective nuclear charge vs shell number in one curve.",
      "Predicting relative sizes without data (where in the sawtooth is the element?).",
      "Explaining cation < atom < anion size ordering.",
    ],
    happens: [
      "Drag across a period: radius shrinks as nuclear charge pulls the same shell tighter.",
      "Hit the noble gas → alkali metal boundary: radius leaps — a new shell has started.",
      "Down a group (across sawteeth): each jump lands higher than the last.",
    ],
    limits: [
      "Mixes covalent, metallic and van der Waals radii — definitions matter.",
      "Only works across the periodic table's order; missing/known exceptions (lanthanides) distort it.",
    ],
  },
  "chem-ionization-energy-trend": {
    gives: [
      "First ionization energy versus Z: the same sawtooth with noble-gas spikes.",
      "Shell structure evidence: big dips mark new shells, small dips mark subshell starts.",
      "Reactivity reasoning: low-IE elements are eager electron donors.",
    ],
    applies: [
      "Confirming electron configurations from the spike/dip pattern.",
      "Predicting metallic character and oxide type.",
      "Explaining why Group 1 metals are so reactive.",
    ],
    happens: [
      "Drag across a period: IE climbs (harder to remove electrons) to a noble-gas spike.",
      "Cross into the next period: IE crashes — the new outer electron is shielded and far away.",
      "Sub-shell subtleties: small dips at group 13 and 16 (s², p⁴ effects).",
    ],
    limits: [
      "First IE only; higher IEs tell richer stories.",
      "Real data is spikier than the smoothed sawtooth — anomalies (e.g. B < Be) exist.",
    ],
  },
  "chem-arrhenius-plot": {
    gives: [
      "Ea straight from the slope: slope × (−R) is the activation energy, no calculus required.",
      "ln A from the intercept — the pre-exponential factor that sets the collision-attempt rate.",
      "A comparison rail: any two reactions' lines, ranked by how temperature-sensitive they are.",
      "The linearisation trick itself: turning k(T)'s exponential into a ruler-straight line.",
    ],
    applies: [
      "Kinetics numericals: 'find Ea given k at two temperatures' becomes two points and a slope.",
      "Catalysis studies: the line lifts vertically when a catalyst opens a lower-energy route.",
      "Shelf-life and reaction-hazard analysis: extrapolate k to storage temperature from hot-lab data.",
    ],
    happens: [
      "Sweep right (colder, larger 1/T): k collapses exponentially — why reactions 'stop' in the cold.",
      "Steepen the line (bigger Ea): the same temperature drop now costs far more rate.",
      "Add a catalyst: the whole line shifts UP at every temperature — same steepness, higher highway.",
      "Two lines cross? Below the crossing the low-Ea reaction wins; above it, the high-Ea one can only if it started higher.",
    ],
    limits: [
      "Two-parameter model: reactions with complex mechanisms (enzyme-catalysed, chain reactions) give curved plots.",
      "Valid only where the mechanism does not change over the temperature range studied.",
      "A and Ea are not fundamental constants — they are fitted summaries of microscopic events.",
    ],
  },
  "chem-conductivity-dilution": {
    gives: [
      "The litmus test for strong vs weak electrolyte drawn as two shaped curves.",
      "Λm⁰ by extrapolation (strong) versus the reason it cannot be measured directly (weak).",
      "The degree of dissociation: α = Λm/Λm⁰ read directly off the weak curve at any dilution.",
      "The Ostwald dilution law hiding inside the weak curve's steepness.",
    ],
    applies: [
      "Electrochemistry numericals: conductivity cell data on strong and weak acids.",
      "Water purity and titration-conductometry reasoning — where the ions come from on dilution.",
      "Distinguishing electrolytes experimentally without ever measuring ionisation directly.",
    ],
    happens: [
      "Dilute a strong electrolyte: the curve crawls up — every ion was already free; only drag relaxes.",
      "Dilute a weak electrolyte: the curve leaps — each dilution step frees new ions via dissociation.",
      "Approach infinite dilution: both curves converge on Λm⁰ — the ideal per-ion mobility limit.",
      "Switch acid (HCl → CH₃COOH): the strong line drops to the weak family — same picture, different curtain.",
    ],
    limits: [
      "Λm⁰ for weak electrolytes requires Ostwald/Kohlrausch tricks — no clean extrapolation exists.",
      "Very concentrated solutions misbehave (viscosity, ion pairs) and bend the gentle strong line.",
      "Temperature and solvent changes move all Λm⁰ landmarks; curves compare only at fixed T.",
    ],
  },
  "chem-common-ion-effect": {
    gives: [
      "The suppression profile: how fast solubility collapses when a shared ion appears.",
      "Ksp proving its constancy — the product stays pinned while each factor runs the other way.",
      "The quantitative shortcut for numericals: s = Ksp/[common ion] once the common ion dominates.",
      "The reason gravimetric analysis and qualitative salt tests wash precipitates with shared-ion solutions.",
    ],
    applies: [
      "Salting-out and precipitation numericals throughout the Ionic Equilibrium chapter.",
      "Buffer chemistry: the same lever explains why a weak acid ionises less in its own salt solution.",
      "Lab technique: washing a precipitate with dilute common-ion solution to stop it re-dissolving.",
    ],
    happens: [
      "Add the first pinch of common ion: solubility plunges — Le Chatelier's fastest response.",
      "Keep adding: each new addition moves almost nothing — the curve's flat tail.",
      "Double the common-ion concentration: solubility halves (for a 1:1 salt) — the near-flat-tail approximation.",
      "Dilute instead: the curve climbs back toward the pure-water solubility — suppression is reversible.",
    ],
    limits: [
      "Only sparingly soluble salts with genuine Ksp behaviour — highly soluble salts ignore this graph.",
      "At very high added electrolyte the salt effect (ionic strength) bends the tail upward again.",
      "Temperature must stay fixed; Ksp itself moves with T and shifts the whole curve.",
    ],
  },
  "chem-equilibrium-approach": {
    gives: [
      "The dynamic picture of equilibrium: a curve that settles instead of stopping.",
      "The catalyst result in one glance — same asymptote, earlier flat line.",
      "Temperature's power: raising T moves the asymptote itself, not just the speed of arrival.",
      "Q vs K as a decision meter for any reaction mixture at any moment.",
    ],
    applies: [
      "Explaining why a catalysed and uncatalysed reaction reach the SAME equilibrium yield.",
      "Industrial process reasoning (Haber, Contact) where the target is the asymptote level, not the speed.",
      "Reading reaction scans in the lab and deciding whether a system has settled.",
    ],
    happens: [
      "Mix reactants: Q starts far below K and the net reaction drives forward fast.",
      "As products accumulate: the drive weakens, the approach slows — the curve flattens.",
      "Reach the level: Q = K, forward and backward rates match, net change is zero forever (until conditions move).",
      "Add a catalyst: the identical asymptote appears on a compressed time axis — faster arrival, same destination.",
    ],
    limits: [
      "Q as a single number hides the many states behind it — concentrations can shift while Q stays put.",
      "The smooth exponential assumes well-stirred, isothermal conditions; hotspots and gradients distort it.",
      "If Q overshoots K (metastable states, oscillating reactions), the calm level line lies.",
    ],
  },
};
