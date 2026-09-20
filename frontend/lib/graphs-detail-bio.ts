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
};
