import { writeDual } from "./enrich-helper.mjs";

export const cap01 = {
  title: "Capacitance and Capacitor",
  unitSlug: "capacitor",
  topicSlug: "capacitance-and-capacitor",
  topicTitle: "Capacitance and capacitor",
  relevance: 100,
  notes: [
    "**Capacitance definition:** Capacitance $C$ of a conductor is the ratio of electric charge $Q$ given to it to the resulting increase in its electrostatic potential $V$: $C = \\frac{Q}{V}$. It is a scalar quantity measuring the conductor's capacity to hold electric charge without electrical breakdown of surrounding insulating medium.",
    "**SI Unit and Dimensions:** The SI unit of capacitance is the farad (F), where $1\\text{ F} = 1\\text{ C/V} = 1\\text{ C}^2\\text{J}^{-1}$. Because 1 farad is enormous, practical submultiples are microfarad ($1\\,\\mu\\text{F} = 10^{-6}\\text{ F}$), nanofarad ($1\\text{ nF} = 10^{-9}\\text{ F}$), and picofarad ($1\\text{ pF} = 10^{-12}\\text{ F}$). The dimensional formula is $[M^{-1}L^{-2}T^4I^2]$.",
    "**Isolated Spherical Conductor:** For an isolated conducting sphere of radius $R$ carrying charge $Q$ in vacuum, potential at its surface is $V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{R}$. Therefore its capacitance is $C = \\frac{Q}{V} = 4\\pi\\varepsilon_0 R$. For Earth ($R \\approx 6.4 \\times 10^6\\text{ m}$), $C = 4\\pi(8.854 \\times 10^{-12})(6.4 \\times 10^6) \\approx 711\\,\\mu\\text{F}$, showing an isolated conductor cannot achieve huge capacitance in a compact space.",
    "**Principle of a Capacitor:** A capacitor consists of two conductors separated by an insulator/dielectric. When an insulated metal plate $A$ is given a positive charge $+Q$, its potential rises to $V$. Bringing an uncharged grounded plate $B$ close to $A$ induces negative charge on the near face of $B$ and positive charge on the far face. The positive charge flows to earth, leaving only negative charge on $B$. This negative charge lowers the potential of plate $A$ while holding charge $Q$ constant, thereby drastically increasing capacitance $C = Q/V$.",
    "**Factors Affecting Capacitance:** Capacitance depends purely on geometric factors and intervening medium: (1) Area of the plates ($C \\propto A$), (2) Separation between plates ($C \\propto 1/d$), and (3) Relative permittivity or dielectric constant of the insulating medium ($C \\propto \\varepsilon_r$). It is strictly independent of $Q$ and $V$.",
    "**Role in Circuits:** Capacitors block direct current (DC) after fully charging, while allowing alternating current (AC) to pass through continuous charging and discharging cycles. They are essential for filtering power supplies, tuning radio receivers, pulse power delivery, and flash photography."
  ],
  confusion: [
    "Thinking $C$ depends on $Q$ or $V$: Although $C = Q/V$, capacitance is an intrinsic geometric and material property. Doubling $Q$ doubles $V$ proportionally, leaving $C$ constant (analogous to resistance $R = V/I$).",
    "Believing an isolated conductor cannot store charge: An isolated conductor is actually a capacitor whose second plate is imagined to be an infinitely large conducting sphere at infinity ($V_\\infty = 0$).",
    "Confusing plate charge with total capacitor charge: The net charge on a charged capacitor is $+Q + (-Q) = 0$. When we refer to charge on a capacitor, we strictly mean the magnitude of charge on either single plate.",
    "Assuming capacitance changes when disconnected: Once disconnected from a battery, charge $Q$ remains trapped and conserved. Any geometric alteration changes potential $V$ and capacitance $C$, but not $Q$."
  ],
  practice: [
    "An isolated spherical conductor of capacitance $1\\text{ pF}$ is placed in air. Calculate its radius. Solution: $C = 4\\pi\\varepsilon_0 R \\implies R = \\frac{C}{4\\pi\\varepsilon_0} = (10^{-12}\\text{ F}) \\times (9 \\times 10^9\\text{ N m}^2/\\text{C}^2) = 9 \\times 10^{-3}\\text{ m} = 9\\text{ mm}$.",
    "A conductor acquires a potential of $250\\text{ V}$ when a charge of $5\\,\\mu\\text{C}$ is supplied. Find its capacitance. Solution: $C = \\frac{Q}{V} = \\frac{5 \\times 10^{-6}\\text{ C}}{250\\text{ V}} = 2 \\times 10^{-8}\\text{ F} = 20\\text{ nF} = 0.02\\,\\mu\\text{F}$.",
    "What potential is required to store $0.1\\text{ C}$ of charge on a $50\\,\\mu\\text{F}$ capacitor? Solution: $V = \\frac{Q}{C} = \\frac{0.1\\text{ C}}{50 \\times 10^{-6}\\text{ F}} = 2000\\text{ V} = 2\\text{ kV}$."
  ],
  universalFacts: [
    "One farad is such a tremendous capacitance that an isolated spherical conductor would require a radius of $9 \\times 10^9\\text{ m}$, about 14 times the radius of the Sun.",
    "Supercapacitors achieve thousands of farads in pocket-sized packages by utilizing porous carbon with internal surface areas exceeding $2000\\text{ m}^2/\\text{g}$ and sub-nanometer Helmholtz layer separations.",
    "The net electric charge of any operational capacitor as a whole system is strictly zero at all times.",
    "Capacitors store electrostatic energy in the electric field between plates, unlike chemical batteries which store energy in chemical bond rearrangements."
  ],
  animation3D: "capacitor",
  motionGraphics: "capacitor"
};
