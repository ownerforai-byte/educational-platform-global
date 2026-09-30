/**
 * Graph Bank — detail layer, Biology (enzymes, ecology, physiology).
 */

import type { GraphDetailInfo } from "@/lib/graphs";

export const DETAIL_BIO: Record<string, GraphDetailInfo> = {
  "bio-enzyme-temperature": {
    gives: [
      "Reaction rate versus temperature: a rise to an optimum, then a crash from denaturation.",
      "The optimum temperature — the peak where activity is maximal.",
      "Two competing effects in one curve: kinetic energy gain (rising side) vs protein unfolding (falling side).",
    ],
    applies: [
      "Explaining human enzyme optima near 37°C and fever's danger.",
      "Food preservation: refrigeration slows enzymes by sliding down the cold side.",
      "Industrial enzyme engineering for heat-stable variants.",
    ],
    happens: [
      "Drag up the cold side: rate roughly doubles per 10°C — more energetic collisions.",
      "Pass the optimum: the curve falls off a cliff — tertiary structure unravels and the active site warps.",
      "Past denaturation the loss is permanent — cooling back does NOT restore the rate.",
    ],
    limits: [
      "Measured in vitro; cellular conditions (crowding, protectants) shift the optimum.",
      "Exact peak position depends on pH — the two graphs interact.",
    ],
  },
  "bio-enzyme-ph": {
    gives: [
      "Rate versus pH: a bell curve peaking at the enzyme's optimum pH.",
      "Ionisation-state reasoning: charge changes at the active site bend the bell's arms.",
      "Different enzymes' optima compared (pepsin ~2, amylase ~7, trypsin ~8).",
    ],
    applies: [
      "Explaining why stomach and intestinal enzymes differ so drastically.",
      "Industrial process control (detergents, brewing) at fixed pH.",
      "Diagnosing acidosis/alkalosis effects on blood enzymes.",
    ],
    happens: [
      "Drag away from the optimum either way: rate falls as active-site charges repel or repel the substrate.",
      "Extreme pH denatures the enzyme permanently — the far tails are a cliff, not a valley.",
      "Symmetric-looking bell, but the two arms have different molecular causes.",
    ],
    limits: [
      "Optimum pH depends on buffer and temperature used.",
      "Membrane-bound and multi-enzyme complexes can show flatter, shifted bells.",
    ],
  },
  "bio-michaelis-menten": {
    gives: [
      "Velocity versus substrate concentration: the saturation hyperbola v = Vmax[S]/(Km+[S]).",
      "Vmax from the plateau — every enzyme busy, rate limited by turnover.",
      "Km (substrate affinity) read where v = Vmax/2 — smaller Km, tighter binding.",
    ],
    applies: [
      "Core enzyme-kinetics analysis; comparing wild-type vs mutant enzymes.",
      "Drug design: competitive inhibitors raise apparent Km (same Vmax); non-competitive lower Vmax.",
      "Estimating intracellular rates when [S] >> Km (zero-order regime).",
    ],
    happens: [
      "Drag at low [S]: nearly linear — rate proportional to substrate, enzyme mostly idle.",
      "Drag into the plateau: adding substrate changes nothing — every active site is occupied.",
      "Halve Km in your head: the curve reaches half-Vmax earlier — higher affinity.",
    ],
    limits: [
      "Single-substrate, steady-state assumption.",
      "Allosteric enzymes give sigmoid curves, not hyperbolas.",
      "Initial rates only — product build-up invalidates the tail.",
    ],
  },
  "bio-population-growth": {
    gives: [
      "Exponential J-curve vs logistic S-curve on one canvas.",
      "Carrying capacity K from the logistic plateau.",
      "Maximum growth rate at K/2 — the inflection of the S-curve.",
    ],
    applies: [
      "Ecology and population management (fisheries harvest at K/2).",
      "Bacterial culture and fermentation planning.",
      "Human-demography debates about overshoot and collapse.",
    ],
    happens: [
      "Drag along the J-curve: unrestricted growth doubles again and again — no ceiling in sight (until there is).",
      "Drag along the S-curve: growth accelerates to the inflection, then decelerates as resources bind.",
      "Past K the population can overshoot and oscillate — the plateau is an average, not a wall.",
    ],
    limits: [
      "Constant K assumed — real environments fluctuate seasonally.",
      "No age structure, migration or time lags (which cause boom–bust cycles).",
    ],
  },
  "bio-oxygen-dissociation": {
    gives: [
      "Haemoglobin's O₂ saturation versus partial pressure: the signature sigmoid.",
      "P50 — the PO₂ at 50% saturation — a single number summarising affinity.",
      "Cooperativity made visible: the steep mid-section where loading/unloading happens fastest.",
    ],
    applies: [
      "Physiology of loading in lungs (high PO₂) and unloading in tissues (low PO₂).",
      "The Bohr effect: acid/CO₂ shifts the curve right, easing unloading in active muscle.",
      "Altitude adaptation and fetal Hb's left shift (higher affinity).",
    ],
    happens: [
      "Drag up the S-curve: the first O₂ binds slowly, then binding makes further binding easier — the steep climb.",
      "Shift right (↑CO₂/heat): at any PO₂ saturation is lower — oxygen dumps into tissues.",
      "Shift left (fetal Hb, ↓BPG): the mother's blood hands oxygen to the fetus across the placenta.",
    ],
    limits: [
      "Standard curve assumes normal pH, temperature and 2,3-BPG — all three shift it.",
      "Myoglobin's hyperbola is a different graph — don't mix the shapes.",
    ],
  },
  "bio-photosynthesis-light": {
    gives: [
      "Photosynthetic rate versus light intensity: linear rise, then light-saturation plateau.",
      "Light compensation point (LCP) — where photosynthesis equals respiration.",
      "Light saturation point (LSP) — beyond it, CO₂ or temperature limits.",
    ],
    applies: [
      "Greenhouse lighting economics — no yield benefit beyond LSP.",
      "Shade vs sun plant comparison (different LCP/LSP).",
      "Aquatic ecology: depth zonation from light falloff.",
    ],
    happens: [
      "Drag from darkness: below LCP the plant respires net — the curve starts negative.",
      "Cross LCP: net gain begins; the linear region is light-limited (photons are the bottleneck).",
      "Reach the plateau: another factor (CO₂, temperature) now limits — light no longer matters.",
    ],
    limits: [
      "Holds other factors fixed; real leaves face co-limitation.",
      "Photoinhibition at very high intensity (curve dips) isn't shown.",
    ],
  },
  "bio-growth-curve": {
    gives: [
      "Bacterial population vs time: the four phases — lag, log (exponential), stationary, death.",
      "Generation time from the log phase: doubling time read directly.",
      "Total-culture story: why 'growth' is phase-dependent, not a single number.",
    ],
    applies: [
      "Fermentation and bioreactor scheduling (harvest at late log).",
      "Antibiotic action reasoning: which phase the drug hits.",
      "Food-safety time–temperature logic (lag phase = your safety margin).",
    ],
    happens: [
      "Drag through lag: flat-ish start — cells are metabolising, not dividing yet.",
      "Enter log phase: the straight climbing line on a log plot — doubling every generation time.",
      "Nutrients exhaust, waste accumulates: stationary plateau, then death phase decline.",
    ],
    limits: [
      "Closed (batch) culture only; chemostats hold the log phase indefinitely.",
      "Log scale vs linear scale confusion changes the whole look.",
    ],
  },
  "bio-enzyme-inhibition": {
    gives: [
      "The two inhibition signatures side by side: same ceiling / shifted right (competitive) versus lower ceiling (non-competitive).",
      "A Km-reader: the midpoint of each curve, showing which inhibitor changed the enzyme's appetite for substrate.",
      "A Vmax-reader: the summits, showing which inhibitor changed the enzyme's working capacity.",
      "The rescue logic: why flooding with substrate defeats one inhibitor and not the other.",
    ],
    applies: [
      "Pharmacology: many drugs are designed as competitive inhibitors (methotrexate, statins).",
      "Poison biology: cyanide and heavy metals act non-competitively — no amount of substrate helps.",
      "Metabolic regulation: product molecules often inhibit upstream enzymes competitively — feedback control.",
    ],
    happens: [
      "No inhibitor: classic saturation curve, fastest to its ceiling.",
      "Competitive present: the start looks slow, but push [S] high enough and the curve climbs to the SAME summit.",
      "Non-competitive present: every point scales down — the curve flattens, and the summit is out of reach.",
      "Raise inhibitor dose: competitive stretches the curve further right; non-competitive presses the ceiling lower.",
    ],
    limits: [
      "Idealised hyperbolic kinetics: allosteric enzymes give sigmoid curves, not these.",
      "Assumes pure inhibition with no enzyme denaturation or slow-tight binding complications.",
      "Real assays drift (temperature, pH); the clean three-curve overlay is the textbook ideal.",
    ],
  },
  "bio-survivorship": {
    gives: [
      "The demographic signature of a species: where death concentrates in the lifespan.",
      "A strategy comparison: K-strategy (Type I) versus r-strategy (Type III) drawn as curves.",
      "Conservation insight: which life stage matters most for saving a species.",
      "The raw material of life tables — lx columns are literally these curves.",
    ],
    applies: [
      "Population ecology: predicting recovery after disturbances for r- versus K-selected species.",
      "Conservation planning: protecting nesting beaches (sea turtles, Type III) versus elder care in long-lived species.",
      "Human demography: national survivorship curves shift as healthcare improves.",
    ],
    happens: [
      "Trace Type III: the crowd dies in the first chapters — millions of eggs, few adults.",
      "Trace Type II: risk has no age bias — the line just keeps sliding.",
      "Trace Type I: the cohort marches together until the cliff near the last chapter.",
      "Compare at midlife: the three curves are already worlds apart — species strategies made visible.",
    ],
    limits: [
      "Cohort studies take a lifetime — most curves come from snapshot life tables with assumptions.",
      "Captive vs wild populations give very different curves for the same species.",
      "The three 'types' are archetypes; real populations sit on a continuum and can switch under stress.",
    ],
  },
  "bio-action-potential": {
    gives: [
      "The full electrical script of a nerve impulse: rest, threshold, spike, undershoot, recovery.",
      "The all-or-none rule drawn in: sub-threshold stimuli simply never appear on this graph.",
      "Ionic choreography: Na⁺ in (upstroke), K⁺ out (downstroke), pumps restore (baseline).",
      "The numbers worth memorising: −70 resting, −55 threshold, +30 peak (in mV).",
    ],
    applies: [
      "Neurophysiology: how signals travel without fading (regenerated at every point).",
      "ECG and EEG reading — the same spike logic scaled up to organs.",
      "Anaesthesia and drug action: many agents work by shifting threshold or slowing ion gates.",
    ],
    happens: [
      "Stimulus below threshold: the trace wiggles and relaxes — no spike, no signal.",
      "Stimulus at threshold: the gates commit — Na⁺ floods in and the trace rockets up.",
      "Peak reached: Na⁺ gates slam shut, K⁺ gates open — the fall begins, a touch slower.",
      "Aftermath: the K⁺ overshoot dips the trace below rest, then the pumps restore the baseline.",
    ],
    limits: [
      "Idealised single spike: real recordings show noise, drifts and non-linear summation.",
      "Squid-axon numbers — mammalian neurons vary quite a bit in threshold and peak.",
      "Ignores spatial spread: a real propagating spike is this curve moving, not standing still.",
    ],
  },
  "bio-predator-prey": {
    gives: [
      "The defining feature of coupled populations: oscillations with a built-in time lag.",
      "The causal chain: prey rise feeds predators, predator rise crashes prey, crash starves predators.",
      "The lag readout: predator peaks trail prey peaks by roughly a quarter cycle.",
      "A warning system: the phase gap is how ecologists spot interaction rather than coincidence.",
    ],
    applies: [
      "Wildlife management: hare–lynx, moose–wolf, plankton–fish cycles all print this shape.",
      "Pest control: introduce a predator and the prey cycle changes phase, not just level.",
      "Conservation maths: Lotka–Volterra's equations sit inside modern ecosystem models.",
    ],
    happens: [
      "Prey take off: food is plentiful and predation is still light.",
      "Predators follow: with prey abundant, their numbers climb too — the lagged copy of the prey curve.",
      "Prey crash: too many mouths; the food base collapses under the peak predator load.",
      "Predators starve back: the food gone, their numbers fall, releasing the prey to start again.",
    ],
    limits: [
      "Classic model ignores carrying capacity, space and other species — real cycles can damp out.",
      "Fur-trade records measure trapping, not true populations; the curves are proxies.",
      "At small population sizes, noise and extinction risk break the elegant mathematics.",
    ],
  },
};
