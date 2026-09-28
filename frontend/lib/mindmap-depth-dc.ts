import type { UnitDepth } from "./mindmap-depth";

/** DC circuits — Ohm's law, Kirchhoff, cells & bridges. */
export const DC_DEPTH: Record<string, UnitDepth> = {
  "dc-circuits": {
    unitFacts: [
      "Kirchhoff's junction rule is charge conservation and the loop rule is energy conservation; both are exact and never need an 'almost' qualifier.",
      "You cannot reduce an arbitrary network by series/parallel rules alone — Kirchhoff is needed exactly when the circuit is neither purely series nor purely parallel.",
    ],
    unitEdgeCases: [
      "An ideal ammeter has zero resistance and an ideal voltmeter infinite resistance. A real ammeter's small but non-zero resistance is precisely what makes fitting it in series change the circuit.",
      "A galvanometer deflects for current in either direction, but a centre-zero galvanometer reveals the DIRECTION — which is how one instrument serves as both ammeter and voltmeter.",
    ],
    unitExamAsked: [
      "NEB: 'Cells of emf E₁,E₂ and internal resistances r₁,r₂ in parallel across R. Find the total current.' — $I = \\frac{E_1}{r_1+R} + \\frac{E_2}{r_2+R}$.",
      "CEE: 'Why must an ammeter have very low and a voltmeter very high resistance?' — to disturb the circuit as little as possible.",
    ],
    unitCommonMistakes: [
      "Adding EMFs as though the cells were in series when they are in parallel: series EMFs add, parallel EMFs with internal resistance do not.",
      "Ignoring internal resistance when the question explicitly supplies $r$.",
    ],
    leaves: {
      "uc-dc-1": {
        keyFacts: [
          "Ohm's law is a DEFINITION of resistance, not a law of nature: resistance is the ratio $V/I$ chosen so the law holds for ohmic materials.",
          "The $V$–$I$ graph is a straight line through the origin whose SLOPE is the resistance; a steeper line means a LARGER resistance.",
        ],
        edgeCases: [
          "Non-ohmic materials (filament lamps, diodes, electrolytes) curve, so 'resistance' is only $V/I$ evaluated at that operating point.",
          "At the origin both $V$ and $I$ vanish, so the slope is undefined there — a cold lamp's resistance cannot be read at zero voltage.",
        ],
        examAsked: [
          "NEB: 'A lamp is rated 100 W, 220 V. Find its operating resistance.' — $R = V^2/P = 484\\,\\Omega$.",
          "CEE: 'As a filament's temperature rises, does its resistance rise or fall?' — rises, which is why a lamp glows once the current heats it.",
        ],
        commonMistakes: [
          "Reading the resistance as $I/V$. The slope is rise over run, $V/I = R$.",
          "Using $R = V^2/P$ for a lamp that is not at its rated operating point, where the cold filament has far lower resistance.",
        ],
      },
      "uc-dc-2": {
        keyFacts: [
          "$\\rho = \\frac{RA}{l}$: resistivity is INTRINSIC to the material, while resistance depends on shape.",
          "Resistivity falls with temperature for metals but RISES for semiconductors and insulators — the basis of every thermistor and of diode self-heating.",
        ],
        edgeCases: [
          "A superconductor has $\\rho = 0$ below its critical temperature, so the current is limited only by circuit inductance — the origin of persistent currents.",
          "Because $\\rho \\propto T$ for metals, a long transmission line's resistance rises measurably between a cold night and a hot afternoon peak, moving the grid's operating point.",
        ],
        examAsked: [
          "NEB: 'A wire of length 2 m, area $2\\times10^{-6}\\,\\text{m}^2$ and resistance 0.5 $\\Omega$. Find resistivity.' — $5\\times10^{-7}\\,\\Omega\\cdot\\text{m}$.",
          "CEE: 'Two wires of the same material, one twice as long and twice the cross-section. Compare resistances.' — equal, since $\\rho l/A$ is unchanged.",
        ],
        commonMistakes: [
          "Inverting to $\\rho = \\frac{l}{RA}$. Sanity check: a longer wire must have MORE resistance; if your formula says otherwise, it is upside down.",
          "Ranking conductors of different materials using $R$ alone instead of $\\rho$.",
        ],
      },
      "uc-dc-3": {
        keyFacts: [
          "The junction rule $\\sum I_{\\text{in}} = \\sum I_{\\text{out}}$ is an algebraic statement of charge conservation, valid at every node simultaneously.",
          "This is why current is not 'consumed': a battery transports charge from one terminal to the other.",
        ],
        edgeCases: [
          "A node receiving current with none leaving is impossible in steady state; if Kirchhoff appears violated, the steady-DC assumption itself is wrong.",
          "Series current equality is a special case of the junction rule at every intermediate node, not a separate law.",
        ],
        examAsked: [
          "NEB: '3 A enters a junction; 1 A and x A leave, and 2 A also leaves. Find x.' — $x = 4$ A.",
          "CEE: 'In a battery, current is consumed or transported?' — transported.",
        ],
        commonMistakes: [
          "Dropping the 2 A incoming branch and writing $3 = 1 + x$, which yields the nonsense $x = -2$ A.",
          "Applying the junction rule where current genuinely changes with time (while a capacitor charges), where the general form adds $\\partial\\rho/\\partial t$.",
        ],
      },
      "uc-dc-4": {
        keyFacts: [
          "The loop rule states $\\sum \\mathcal{E} = \\sum IR$ around any closed path, and is nothing more than energy conservation per unit charge.",
          "Kirchhoff's two laws replace the need for series/parallel rules for any finite network — they are algebraically complete.",
        ],
        edgeCases: [
          "Choose the loop direction FIRST and keep it consistent. Flipping direction mid-solution changes every sign and is the usual reason Kirchhoff 'gives the wrong answer'.",
          "A loop containing no source and no resistance drop is perfectly legal: it simply yields the identity $0 = 0$, which can be used as a consistency check.",
        ],
        examAsked: [
          "NEB: 'Two cells E₁,E₂ with internal resistances r₁,r₂ in series with R. Find the current.' — $I = \\frac{E_1+E_2}{r_1+r_2+R}$.",
          "CEE: 'Kirchhoff's loop law is a statement of conservation of: (a) charge (b) energy (c) momentum.' — energy.",
        ],
        commonMistakes: [
          "Writing $-\\mathcal{E}$ for a cell being traversed from + to − and $+\\mathcal{E}$ for the reverse, without checking the arrow convention; getting the EMF signs wrong is the top Kirchhoff error.",
          "Counting a shared resistor twice with the same sign, when it is actually traversed in opposite directions and must enter with opposite signs.",
        ],
      },
      "uc-dc-5": {
        keyFacts: [
          "The terminal voltage is NOT the emf: $V = \\mathcal{E} - Ir$, so a cell delivering current always reads BELOW its emf, and the shortfall $Ir$ is dissipated internally as heat.",
          "$P_{\\text{internal}} = I^2 r$ is lost forever, which is why a car battery in cold weather (high $r$) performs poorly on the first crank.",
        ],
        edgeCases: [
          "On open circuit $I = 0$, so $V = \\mathcal{E}$ exactly — the emf is only measurable when the cell draws no current.",
          "Maximum power is delivered when $r = R_{external}$, at which point the terminal voltage has fallen to $\\mathcal{E}/2$ and efficiency is only 50% — the classic 'efficiency versus maximum power' trade-off.",
        ],
        examAsked: [
          "NEB: 'A cell of emf 12 V and internal resistance 0.4 Ω supplies 2 A. Find its terminal voltage.' — $V = 12 - (2)(0.4) = 11.2$ V.",
          "CEE: 'When is the efficiency of a cell maximum?' — when the external resistance is very large, approaching 100% as $R_{ext} \\to \\infty$.",
        ],
        commonMistakes: [
          "Setting $V = \\mathcal{E}$ for a loaded cell and forgetting the $Ir$ drop, which overstates the terminal voltage.",
          "Placing the internal resistance outside the loop instead of in series with the cell, which changes the current when there is more than one junction.",
        ],
      },
      "uc-dc-6": {
        keyFacts: [
          "The Wheatstone bridge is null-BALANCED, not null-defective: at balance the galvanometer carries NO current, so its (unknown) resistance never enters the equation. That is why the bridge is so accurate.",
          "The balance condition $\\frac{P}{Q} = \\frac{R}{S}$ involves only the four RESISTORS — no meter accuracy and no cell emf appear anywhere.",
        ],
        edgeCases: [
          "A null galvanometer reading proves the bridge is balanced ONLY if the galvanometer is sensitive enough; a poor galvanometer can read zero while unbalanced, which is why the null method needs a sensitive detector.",
          "If the four resistors are all equal the bridge is balanced regardless of supply voltage, so the method is insensitive to battery drift — a deliberate design choice.",
        ],
        examAsked: [
          "NEB: 'In a Wheatstone bridge, P = 2 $\\Omega$, Q = 4 $\\Omega$, R = 6 $\\Omega$. Find S at balance.' — $S = \\frac{QR}{P} = 12\\,\\Omega$.",
          "CEE: 'Metre bridge: a 40 cm balancing length with a 100 cm wire. Find the unknown resistance for R = 5 $\\Omega$.' — $X = 5\\times\\frac{40}{60} = 3.33\\,\\Omega$.",
        ],
        commonMistakes: [
          "Inverting the ratio: writing $\\frac{P}{Q} = \\frac{S}{R}$ instead of $\\frac{P}{Q} = \\frac{R}{S}$. Trace the two arms carefully — the arms containing the unknown go on OPPOSITE sides of the equality.",
          "Using balancing length $l$ without noting $100 - l$ for the other gap in a metre bridge, the single most common numerical error in this topic.",
        ],
      },
    },
  },
};