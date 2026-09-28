export const cap04 = {
  title: "Energy of a Charged Capacitor",
  unitSlug: "capacitor",
  topicSlug: "energy-of-a-charged-capacitor",
  topicTitle: "Energy of charged capacitor",
  relevance: 100,
  notes: [
    "**Physical Origin of Stored Energy:** Charging a capacitor involves transferring incremental charges $dq$ from one plate to the other against the opposing potential difference established by already accumulated charge. The mechanical work done by an external charging source (battery) is stored as electrostatic potential energy in the electric field between the plates.",
    "**Mathematical Derivation:** Suppose at an intermediate stage of charging, the plate holds charge $q$ and instantaneous potential difference $v = \\frac{q}{C}$. The infinitesimal work required to transfer an additional charge $dq$ is $dW = v\\,dq = \\frac{q}{C}\\,dq$. Integrating from initial uncharged state ($q = 0$) to full charge ($q = Q$): $W = \\int_0^Q \\frac{q}{C}\\,dq = \\frac{1}{C}\\left[\\frac{q^2}{2}\\right]_0^Q = \\frac{Q^2}{2C}$.",
    "**Equivalent Expressions for Energy:** Using $Q = CV$, the stored electrostatic potential energy $U$ can be represented in three equivalent forms: $U = \\frac{Q^2}{2C} = \\frac{1}{2} C V^2 = \\frac{1}{2} Q V$.",
    "**Energy Dissipated During Charging by Battery:** A battery of EMF $V$ supplies a total charge $Q$ to fully charge the capacitor. The total work done by the battery is $W_{battery} = Q V = C V^2$. However, the energy stored in the capacitor is only $U = \\frac{1}{2} C V^2$. Exactly half the energy supplied by the battery ($50\\%$, or $\\frac{1}{2} C V^2$) is inevitably dissipated as Joule heat in connecting leads and internal resistance, regardless of circuit resistance.",
    "**Electrostatic Energy Density:** Energy is localized throughout the dielectric medium of volume $\\mathcal{V} = A d$ between the plates. Substituting $C = \\frac{\\varepsilon_0 A}{d}$ and $V = E d$ into $U = \\frac{1}{2} C V^2$: $U = \\frac{1}{2}\\left(\\frac{\\varepsilon_0 A}{d}\\right)(E d)^2 = \\frac{1}{2}\\varepsilon_0 E^2 (A d)$. Defining energy density $u$ as energy per unit volume: $u = \\frac{U}{A d} = \\frac{1}{2}\\varepsilon_0 E^2$. In a medium of relative permittivity $\\varepsilon_r$: $u = \\frac{1}{2}\\varepsilon E^2 = \\frac{1}{2}\\varepsilon_r \\varepsilon_0 E^2$."
  ],
  confusion: [
    "Thinking all battery energy enters the capacitor: The battery delivers $W = QV = CV^2$, but the capacitor only stores $U = \\frac{1}{2}QV = \\frac{1}{2}CV^2$. The remaining $50\\%$ is always converted into heat in circuit wires during transient charging.",
    "Factor of 1/2 misconception: Why is there a factor of $\\frac{1}{2}$? Because the potential across the plates starts at $0$ and linearly rises to $V$, making the effective average charging potential $\\bar{V} = \\frac{0 + V}{2} = \\frac{V}{2}$.",
    "Believing energy resides in the metal plates: Electrostatic potential energy is stored in the electric field throughout the space (dielectric volume) between plates, not inside the conducting metal itself."
  ],
  practice: [
    "A $12\\,\\mu\\text{F}$ capacitor is connected across a $50\\text{ V}$ battery. Calculate (a) charge stored, (b) electrostatic energy stored, and (c) energy supplied by the battery. Solution: (a) $Q = CV = (12 \\times 10^{-6})(50) = 600\\,\\mu\\text{C} = 0.6\\text{ mC}$. (b) $U = \\frac{1}{2} C V^2 = 0.5 \\times (12 \\times 10^{-6}) \\times (2500) = 0.015\\text{ J} = 15\\text{ mJ}$. (c) $W = Q V = (600 \\times 10^{-6})(50) = 0.030\\text{ J} = 30\\text{ mJ}$. Exactly half ($15\\text{ mJ}$) is lost as heat.",
    "Calculate the energy density in an electric field of strength $3 \\times 10^6\\text{ V/m}$ (dielectric breakdown field of air). Solution: $u = \\frac{1}{2}\\varepsilon_0 E^2 = 0.5 \\times (8.854 \\times 10^{-12}) \\times (3 \\times 10^6)^2 = 0.5 \\times 8.854 \\times 10^{-12} \\times 9 \\times 10^{12} = 39.84\\text{ J/m}^3$."
  ],
  universalFacts: [
    "The energy density equation $u = \\frac{1}{2}\\varepsilon_0 E^2$ is universally valid for any electrostatic field configuration, not just parallel plates, and applies to electromagnetic radiation (photons) traversing deep space.",
    "Defibrillators deliver a life-saving pulse of roughly 200 to 360 Joules stored in an internal high-voltage capacitor directly through a patient's heart in less than 10 milliseconds."
  ],
  animation3D: "capacitor",
  motionGraphics: "capacitor"
};
