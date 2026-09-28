export const cap02Meta = {
  examples: [
    "Capacitive touch screen: An array of micro parallel-plate capacitors senses fingertip proximity; conductive finger tissue alters local electric field and capacitance, registering touch coordinates.",
    "Condenser microphone: A flexible conductive diaphragm acts as one plate of a capacitor; sound waves deflect the diaphragm, modulating plate separation d and generating an audio voltage signal.",
    "Variable gang capacitor: Interleaved metal plates rotate into each other to alter overlapping plate area A, smoothly tuning receiver resonant frequencies."
  ],
  practiceQuestions: [
    "Q1. Derive the expression for the capacitance of a parallel plate capacitor filled with air.",
    "Q2. Deduce an expression for the capacitance of a parallel plate capacitor when a dielectric slab of thickness t (t < d) is inserted between its plates.",
    "Q3. Show that the force between the plates of a parallel plate capacitor is F = Q² / (2ε₀A). Why is there a factor of 1/2?",
    "Q4. A capacitor is charged to a potential V and then disconnected from the battery. What happens to its capacitance, charge, potential difference, and stored energy when a dielectric slab is inserted?"
  ],
  formulas: [
    "Capacitance with vacuum/air: $C_0 = \\frac{\\varepsilon_0 A}{d}$",
    "Capacitance fully filled with dielectric: $C = \\frac{\\kappa \\varepsilon_0 A}{d} = \\kappa C_0$",
    "Capacitance with partially filled slab: $C = \\frac{\\varepsilon_0 A}{d - t(1 - 1/\\kappa)}$",
    "Capacitance with conducting slab ($t < d$): $C = \\frac{\\varepsilon_0 A}{d - t}$",
    "Electrostatic force between plates: $F = \\frac{Q^2}{2\\varepsilon_0 A} = \\frac{1}{2} \\frac{\\varepsilon_0 A V^2}{d^2}$"
  ],
  keyPoints: [
    "Capacitance of a parallel plate capacitor is directly proportional to plate area A and inversely proportional to separation distance d.",
    "Inserting a dielectric increases capacitance by factor κ by reducing net internal electric field for a given charge.",
    "A conducting slab of thickness t increases capacitance equivalent to reducing effective separation to (d - t).",
    "Force between plates is attractive and equals F = Q² / (2ε₀A); it is independent of d for constant charge Q."
  ]
};
