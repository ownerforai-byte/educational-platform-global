/**
 * Entrance Question Bank — Physics, Class 12 (Electrostatics → Communication).
 * Unit slugs mirror the class-12 physics syllabus (lib/syllabus.ts).
 */

import type { EntranceUnitBank } from "./types";

export const PHYSICS_12_ENTRANCE: EntranceUnitBank[] = [
  {
    units: ["electrostatics"],
    questions: [
      { q: "The force between two charges when the distance is halved becomes:", options: ["4 times", "2 times", "Half", "Unchanged"], answer: 0, why: "F ∝ 1/r² — halving r multiplies F by 4 (Coulomb's inverse-square).", exam: "CEE 2080" },
      { q: "A charge q is placed at the centre of a cube. Electric flux through one face is:", options: ["q/8ε₀", "q/ε₀", "q/6ε₀", "zero"], answer: 2, why: "Total flux q/ε₀ splits over 6 identical faces → q/6ε₀ per face.", exam: "IOE 2079" },
      { q: "Energy stored in a capacitor of capacitance C charged to V is:", options: ["½CV²", "CV²", "½CV", "2CV²"], answer: 0, why: "Area under the V–Q graph = ½QV = ½CV²; watch the missing ½ distractor.", exam: "CEE 2081" },
      { q: "Inserting a dielectric slab (K) between capacitor plates at constant V makes the stored energy:", options: ["Increase K times", "Decrease K times", "Unchanged", "Zero"], answer: 0, why: "C → KC at fixed V; U = ½CV² rises K-fold (battery supplies the extra charge).", exam: "CEE 2079" },
      { q: "Work done in moving a charge around a closed loop in an electrostatic field is:", options: ["Zero", "qV", "qE·d", "Infinite"], answer: 0, why: "Electrostatic field is conservative — the closed-loop integral vanishes.", exam: "NEB Board" },
    ],
  },
  {
    units: ["current-electricity"],
    questions: [
      { q: "Drift velocity of electrons in a conductor carrying current I is proportional to:", options: ["I", "I²", "1/I", "√I"], answer: 0, why: "v_d = I/(nAe) — linear in current.", exam: "CEE 2080" },
      { q: "The terminal potential difference of a cell of emf E, internal resistance r, delivering current I is:", options: ["E − Ir", "E + Ir", "E", "Ir"], answer: 0, why: "Internal drop Ir subtracts while discharging; adds while charging.", exam: "IOE 2079" },
      { q: "Kirchhoff's junction rule is a statement of conservation of:", options: ["Charge", "Energy", "Momentum", "Flux"], answer: 0, why: "ΣI(in) = ΣI(out) — charge can't accumulate at a node; loop rule is energy.", exam: "CEE 2079" },
      { q: "Power dissipated in a resistor R carrying current I is:", options: ["I²R", "IR²", "I/R", "I√R"], answer: 0, why: "P = I²R = V²/R = IV — the heating (Joule) law.", exam: "CEE 2081" },
      { q: "A Wheatstone bridge is balanced when:", options: ["P/Q = R/S", "PQ = RS", "P + Q = R + S", "P/Q = S/R"], answer: 0, why: "Balanced bridge → galvanometer carries zero current.", exam: "IOE 2078" },
    ],
  },
  {
    units: ["magnetism-and-magnetic-effect"],
    questions: [
      { q: "The magnetic force on a charge moving parallel to B is:", options: ["Zero", "qvB", "qE", "maximum"], answer: 0, why: "F = qvB sinθ; θ = 0 → sinθ = 0 — the moving charge sails straight.", exam: "CEE 2080" },
      { q: "Magnetic field at the centre of a circular coil of N turns, radius r, current I is:", options: ["μ₀NI/2r", "μ₀NI/4πr", "μ₀I/2r", "μ₀NI/r"], answer: 0, why: "Biot–Savart at the centre of a loop — the N and 1/2r factors are the exam trap.", exam: "CEE 2079" },
      { q: "A moving-coil galvanometer is converted into an ammeter by connecting:", options: ["A low shunt in parallel", "A high resistance in series", "A capacitor in series", "Another galvanometer"], answer: 0, why: "Shunt bypasses most current; voltmeter needs a high series multiplier instead.", exam: "IOE 2079" },
      { q: "Two parallel wires carrying currents in the same direction:", options: ["Attract each other", "Repel each other", "Exert no force", "Rotate about each other"], answer: 0, why: "F/L = μ₀I₁I₂/2πd — same direction attracts, opposite repels.", exam: "CEE 2081" },
      { q: "A cyclotron CANNOT accelerate:", options: ["Electrons", "Protons", "Deuterons", "Alpha particles"], answer: 0, why: "Relativistic mass gain desynchronises light electrons from the fixed-frequency field.", exam: "CEE 2080" },
    ],
  },
  {
    units: ["electromagnetic-induction"],
    questions: [
      { q: "Lenz's law is a consequence of conservation of:", options: ["Energy", "Charge", "Momentum", "Mass"], answer: 0, why: "The induced current opposes the change — otherwise free energy would exist.", exam: "CEE 2080" },
      { q: "A metal ring falls over a bar magnet. As it approaches the pole, its fall:", options: ["Slows down", "Speeds up", "Stays uniform", "Reverses"], answer: 0, why: "Induced current repels the approaching change of flux — Lenz braking.", exam: "IOE 2079" },
      { q: "The SI unit of magnetic flux is:", options: ["Weber", "Tesla", "Henry", "Gauss"], answer: 0, why: "Φ = BA → T·m² = Wb; tesla is flux density, henry is inductance.", exam: "NEB Board" },
      { q: "Self-inductance of a solenoid is doubled if its number of turns is:", options: ["Doubled", "Halved", "Quadrupled", "Unchanged"], answer: 2, why: "L ∝ N² — doubling N quadruples L (both B and flux linkages rise).", exam: "CEE 2081" },
      { q: "Eddy currents are undesirable in transformer cores, so cores are:", options: ["Laminated", "Solid iron", "Copper-plated", "Supercooled"], answer: 0, why: "Thin insulated laminations break the eddy loops, cutting I²R heating.", exam: "CEE 2079" },
    ],
  },
  {
    units: ["alternating-current"],
    questions: [
      { q: "In a pure inductive AC circuit, current:", options: ["Lags voltage by 90°", "Leads voltage by 90°", "Is in phase", "Lags by 45°"], answer: 0, why: "ELI the ICE man — inductors lag (X_L = ωL), capacitors lead.", exam: "CEE 2080" },
      { q: "At series LCR resonance:", options: ["X_L = X_C and impedance is minimum", "Z is maximum", "Current is minimum", "X_L > X_C"], answer: 0, why: "Reactances cancel → Z = R, current peaks — the resonance signature.", exam: "IOE 2079" },
      { q: "The rms value of a sinusoidal AC of peak V₀ is:", options: ["V₀/√2", "V₀√2", "V₀/2", "2V₀/π"], answer: 0, why: "0.707 V₀; 2V₀/π is the average over a half-cycle — different thing.", exam: "CEE 2079" },
      { q: "Power factor of a pure capacitive AC circuit is:", options: ["Zero", "One", "0.5", "Infinity"], answer: 0, why: "Phase difference 90° → cos 90° = 0 — wattless current.", exam: "CEE 2081" },
      { q: "A choke coil in a tube-light circuit works by:", options: ["High reactance at low power loss", "Resistance heating", "Capacitance blocking", "Mutual induction only"], answer: 0, why: "X_L limits current while its near-zero resistance wastes almost nothing.", exam: "IOE 2078" },
    ],
  },
  {
    units: ["ray-optics"],
    questions: [
      { q: "The image formed by a concave mirror when the object is at the focus is:", options: ["At infinity, real, inverted", "At the centre of curvature", "Virtual and erect", "Same size at C"], answer: 0, why: "Ray reflected parallel — object at F → image at ∞.", exam: "CEE 2080" },
      { q: "Power of a lens of focal length 25 cm is:", options: ["+4 D", "+2.5 D", "+0.25 D", "−4 D"], answer: 0, why: "P = 1/f(m) = 1/0.25 = 4 dioptres — metres, not centimetres.", exam: "CEE 2079" },
      { q: "A convex lens of glass (μ = 1.5) is immersed in water (μ = 1.33). Its focal length:", options: ["Increases", "Decreases", "Stays the same", "Becomes zero"], answer: 0, why: "Relative μ falls → lensmaker power falls → f rises.", exam: "IOE 2079" },
      { q: "Critical angle for a medium of refractive index √2 is:", options: ["45°", "30°", "60°", "90°"], answer: 0, why: "sin C = 1/μ = 1/√2 → C = 45°.", exam: "CEE 2081" },
      { q: "Astronomical telescopes are adjusted for final image at infinity. Their angular magnification is:", options: ["f₀/fₑ", "fₑ/f₀", "f₀ × fₑ", "f₀ + fₑ"], answer: 0, why: "Objective focal length over eyepiece — tube length f₀ + fₑ in normal adjustment.", exam: "NEB Board" },
    ],
  },
  {
    units: ["wave-optics"],
    questions: [
      { q: "In Young's double-slit experiment, fringe width is proportional to:", options: ["Wavelength λ", "1/λ", "Slit separation d", "λ²"], answer: 0, why: "β = λD/d — wider for red than violet, narrower with larger d.", exam: "CEE 2080" },
      { q: "Polarisation proves light is:", options: ["A transverse wave", "A longitudinal wave", "A particle", "A sound wave"], answer: 0, why: "Only transverse waves can be polarised — the classic conceptual discriminator.", exam: "IOE 2079" },
      { q: "Diffraction is most pronounced when the slit width is:", options: ["Comparable to λ", "Much larger than λ", "Exactly zero", "Independent of λ"], answer: 0, why: "Spreading angle ≈ λ/a — significant only when a ~ λ.", exam: "CEE 2079" },
      { q: "In a single-slit pattern, the condition for the first dark fringe is:", options: ["a sinθ = λ", "a sinθ = λ/2", "d sinθ = λ", "a = λ/2"], answer: 0, why: "Minima at a sinθ = nλ (n = 1, 2…); the a sinθ = λ/2 form is wrong.", exam: "CEE 2081" },
      { q: "When a wave travels from air into glass, which stays constant?", options: ["Frequency", "Wavelength", "Speed", "Both speed and wavelength"], answer: 0, why: "Source sets frequency; speed and wavelength drop by factor μ.", exam: "NEB Board" },
    ],
  },
  {
    units: ["modern-physics"],
    questions: [
      { q: "The photoelectric stopping potential depends on:", options: ["Frequency of light only", "Intensity only", "Both equally", "Neither"], answer: 0, why: "eV₀ = hν − φ — intensity changes current, not stopping voltage.", exam: "CEE 2080" },
      { q: "The de Broglie wavelength of a particle accelerated through V is:", options: ["h/√(2meV)", "√(2meV)/h", "2meV/h", "h·2meV"], answer: 0, why: "λ = h/p with p = √(2meV) — the electron-diffraction standard.", exam: "CEE 2079" },
      { q: "Half-life of a radioactive sample of decay constant λ is:", options: ["0.693/λ", "λ/0.693", "1/λ²", "2λ"], answer: 0, why: "T½ = ln2/λ — the 0.693 factor appears in every radiometrics MCQ.", exam: "IOE 2079" },
      { q: "Bohr's radius of hydrogen (n = 1) is about:", options: ["0.53 Å", "5.3 Å", "1.06 Å", "0.053 Å"], answer: 0, why: "a₀ = 0.529 Å; radius scales as n².", exam: "CEE 2081" },
      { q: "Nuclear fusion releases energy because:", options: ["Binding energy per nucleon rises for light nuclei", "Mass is conserved", "Protons vanish", "Electrons fuse"], answer: 0, why: "Mass defect × c²; iron is the BE/nucleon peak — both sides release energy toward it.", exam: "CEE 2079" },
    ],
  },
  {
    units: ["communication-systems"],
    questions: [
      { q: "The frequency range of ground (surface) wave propagation is:", options: ["Up to ~2 MHz", "30–300 MHz", "Above 30 MHz", "Infrared"], answer: 0, why: "Low/MF frequencies follow the curvature; sky waves take over up to ~30 MHz.", exam: "CEE 2080" },
      { q: "In amplitude modulation, the side bands carry:", options: ["The information", "The carrier power", "No power", "Only noise"], answer: 0, why: "Carrier holds ~2/3 of power uselessly; side bands at ω_c ± ω_m carry the signal.", exam: "IOE 2079" },
      { q: "Critical frequency of the ionosphere for sky-wave propagation is:", options: ["~10 MHz (foF2 layer)", "100 MHz", "1 GHz", "10 kHz"], answer: 0, why: "Above foF2 waves punch through instead of reflecting — that's why TV needs satellites.", exam: "CEE 2079" },
      { q: "A modem:", options: ["Modulates and demodulates", "Only amplifies", "Only detects", "Generates carriers"], answer: 0, why: "MOdulator + DEModulator — converts digital ↔ analogue for the channel.", exam: "NEB Board" },
    ],
  },
];
