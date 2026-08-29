"use client";

import { useState } from "react";
import { BookOpen, Lightbulb, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Katex } from "@/components/content/katex";

interface TheoryPanelProps {
  // Old interface (used by existing labs)
  title?: string;
  vocabulary?: string;
  look?: string | React.ReactNode;
  predict?: string;
  principle?: string | React.ReactNode;
  why?: string;
  // New interface (for theory lab pages)
  subject?: string;
  topic?: string;
}

// Theory content database for the new Theory Lab
type SectionData = { heading: string; content: string; formula?: string; example?: string };
type TopicData = { title: string; sections: SectionData[]; keyPoints: string[]; practiceQuestions: string[] };
const THEORY_CONTENT: Record<string, Record<string, TopicData>> = {
  physics: {
    kinematics: {
      title: "Kinematics - Motion in One and Two Dimensions",
      sections: [
        { heading: "1. What is Kinematics?", content: "Kinematics is the branch of mechanics that describes the motion of objects without considering the forces that cause the motion.", formula: "Key quantities: displacement ($s$), velocity ($v$), acceleration ($a$), time ($t$)" },
        { heading: "2. Equations of Motion", content: "When acceleration is constant, we use the three kinematic equations:", formula: "\\begin{aligned} v &= u + at \\\\ s &= ut + \\tfrac{1}{2}at^2 \\\\ v^2 &= u^2 + 2as \\end{aligned}" },
        { heading: "3. Projectile Motion", content: "For a projectile launched at angle $\\theta$ with initial velocity $u$:", formula: "\\begin{aligned} R &= \\tfrac{u^2 \\sin 2\\theta}{g} \\\\ H &= \\tfrac{u^2 \\sin^2 \\theta}{2g} \\\\ T &= \\tfrac{2u \\sin \\theta}{g} \\end{aligned}" },
      ],
      keyPoints: ["Kinematics describes motion without reference to forces", "Three equations apply only for constant acceleration", "Horizontal and vertical motions are independent"],
      practiceQuestions: ["A stone is thrown vertically upward with velocity 50 m/s. Find max height."],
    },
    "laws-motion": {
      title: "Newton's Laws of Motion",
      sections: [
        { heading: "1. First Law (Inertia)", content: "An object remains at rest or in uniform motion unless acted upon by an external force.", formula: "\\text{If } \\sum \\vec{F} = 0, \\text{ then } \\vec{a} = 0" },
        { heading: "2. Second Law", content: "The net force on an object equals mass times acceleration:", formula: "\\vec{F} = m\\vec{a}" },
        { heading: "3. Third Law", content: "For every action there is an equal and opposite reaction:", formula: "\\vec{F}_{AB} = -\\vec{F}_{BA}" },
        { heading: "4. Friction", content: "Frictional force opposes relative motion:", formula: "f = \\mu N, \\quad f_s \\leq \\mu_s N" },
      ],
      keyPoints: ["Force is not needed to maintain motion", "F = ma is the fundamental equation", "Action-reaction pairs act on different bodies"],
      practiceQuestions: ["A 5 kg block is pulled by 20 N force. Find acceleration."],
    },
    "work-energy": {
      title: "Work, Energy, and Power",
      sections: [
        { heading: "1. Work Done", content: "Work is done when force causes displacement:", formula: "W = \\vec{F} \\cdot \\vec{s} = Fs\\cos\\theta" },
        { heading: "2. Kinetic Energy", content: "Energy of motion:", formula: "KE = \\tfrac{1}{2}mv^2" },
        { heading: "3. Potential Energy", content: "Energy of position (gravitational):", formula: "PE = mgh" },
        { heading: "4. Work-Energy Theorem", content: "Net work equals change in kinetic energy:", formula: "W_{\\text{net}} = \\Delta KE = \\tfrac{1}{2}mv^2 - \\tfrac{1}{2}mu^2" },
        { heading: "5. Conservation of Energy", content: "Total mechanical energy remains constant (no friction):", formula: "KE + PE = \\text{constant} \\quad \\Rightarrow \\quad \\tfrac{1}{2}mv^2 + mgh = \\text{constant}" },
        { heading: "6. Power", content: "Rate of doing work:", formula: "P = \\tfrac{W}{t} = \\vec{F} \\cdot \\vec{v}" },
      ],
      keyPoints: ["Work is a scalar quantity (dot product)", "Conservative forces conserve mechanical energy", "Power is measured in watts (W)"],
      practiceQuestions: ["A 2 kg ball dropped from 20m. Find KE before hitting ground."],
    },
    gravitation: {
      title: "Universal Gravitation",
      sections: [
        { heading: "1. Newton's Law of Gravitation", content: "Every particle attracts every other particle:", formula: "F = G\\,\\dfrac{m_1\\, m_2}{r^2}, \\quad G = 6.674 \\times 10^{-11}\\; \\text{N·m}^2/\\text{kg}^2" },
        { heading: "2. Gravitational Field", content: "Field strength at distance $r$ from mass $M$:", formula: "g = \\dfrac{GM}{r^2}" },
        { heading: "3. Orbital Velocity", content: "For a satellite in circular orbit:", formula: "v = \\sqrt{\\dfrac{GM}{r}}" },
        { heading: "4. Escape Velocity", content: "Minimum velocity to escape gravitational field:", formula: "v_e = \\sqrt{\\dfrac{2GM}{R}} = \\sqrt{2gR} \\approx 11.2\\; \\text{km/s}" },
        { heading: "5. Gravitational Potential Energy", content: "Energy at distance $r$ from center:", formula: "U = -\\dfrac{GMm}{r}" },
      ],
      keyPoints: ["Gravitational force is always attractive", "Escape velocity is independent of the escaping object's mass", "G is universal gravitational constant"],
      practiceQuestions: ["Find gravitational force between two 1kg masses 1m apart."],
    },
    thermodynamics: {
      title: "Thermodynamics",
      sections: [
        { heading: "1. First Law", content: "Conservation of energy applied to thermal systems:", formula: "\\Delta U = Q - W" },
        { heading: "2. Specific Heat", content: "Heat required to raise temperature:", formula: "Q = mc\\Delta T" },
        { heading: "3. Ideal Gas Law", content: "", formula: "PV = nRT = \\dfrac{m}{M}RT" },
        { heading: "4. Second Law", content: "Entropy of an isolated system never decreases:", formula: "\\Delta S_{\\text{universe}} \\geq 0" },
        { heading: "5. Carnot Engine", content: "Maximum theoretical efficiency:", formula: "\\eta = 1 - \\dfrac{T_C}{T_H}" },
      ],
      keyPoints: ["Internal energy depends only on temperature (ideal gas)", "Carnot engine has maximum possible efficiency", "Heat flows from hot to cold naturally"],
      practiceQuestions: ["100 J heat added, gas does 40 J work. Find Delta U."],
    },
    optics: {
      title: "Optics - Reflection and Refraction",
      sections: [
        { heading: "1. Reflection", content: "Angle of incidence equals angle of reflection:", formula: "i = r" },
        { heading: "2. Mirror Equation", content: "For spherical mirrors:", formula: "\\dfrac{1}{v} + \\dfrac{1}{u} = \\dfrac{1}{f}" },
        { heading: "3. Lens Maker's Formula", content: "For thin lenses:", formula: "\\dfrac{1}{f} = \\left(n - 1\\right)\\!\\left(\\dfrac{1}{R_1} - \\dfrac{1}{R_2}\\right)" },
        { heading: "4. Snell's Law", content: "Refraction at interface:", formula: "n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2" },
        { heading: "5. Total Internal Reflection", content: "Critical angle when light goes dense to rare:", formula: "\\sin C = \\dfrac{n_2}{n_1}" },
        { heading: "6. Magnification", content: "", formula: "m = -\\dfrac{v}{u} = \\dfrac{h_i}{h_o}" },
      ],
      keyPoints: ["Concave mirror can form real or virtual images", "Optical fiber uses total internal reflection", "Convex lens converges, concave lens diverges"],
      practiceQuestions: ["Object at 30cm from concave mirror (f=10cm). Find image."],
    },
    electrostatics: {
      title: "Electrostatics",
      sections: [
        { heading: "1. Coulomb's Law", content: "Force between two point charges:", formula: "F = \\dfrac{1}{4\\pi\\varepsilon_0} \\cdot \\dfrac{q_1\\, q_2}{r^2} = k\\,\\dfrac{q_1\\, q_2}{r^2}" },
        { heading: "2. Electric Field", content: "Force per unit positive charge:", formula: "\\vec{E} = \\dfrac{\\vec{F}}{q} = \\dfrac{1}{4\\pi\\varepsilon_0}\\cdot\\dfrac{Q}{r^2}\\,\\hat{r}" },
        { heading: "3. Electric Potential", content: "Potential energy per unit charge:", formula: "V = \\dfrac{1}{4\\pi\\varepsilon_0}\\cdot\\dfrac{Q}{r}" },
        { heading: "4. Capacitance", content: "Ability to store charge:", formula: "C = \\dfrac{Q}{V}, \\quad C_0 = \\dfrac{\\varepsilon_0 A}{d}" },
        { heading: "5. Gauss's Law", content: "Flux through closed surface:", formula: "\\oint \\vec{E}\\cdot d\\vec{A} = \\dfrac{Q_{\\text{enc}}}{\\varepsilon_0}" },
      ],
      keyPoints: ["Like charges repel, opposite charges attract", "Inside a conductor E = 0 (electrostatic equilibrium)", "Electric field lines start on + charges, end on - charges"],
      practiceQuestions: ["Two charges 2μC and 3μC are 0.1m apart. Find force."],
    },
    current: {
      title: "Current Electricity",
      sections: [
        { heading: "1. Ohm's Law", content: "Voltage proportional to current:", formula: "V = IR" },
        { heading: "2. Resistance", content: "Depends on material and geometry:", formula: "R = \\rho\\,\\dfrac{L}{A}" },
        { heading: "3. Kirchhoff's Junction Rule", content: "Conservation of charge at a junction:", formula: "\\sum I_{\\text{in}} = \\sum I_{\\text{out}} \\quad \\text{or} \\quad \\sum I = 0" },
        { heading: "4. Kirchhoff's Loop Rule", content: "Conservation of energy around a loop:", formula: "\\sum \\Delta V = 0" },
        { heading: "5. Series and Parallel", content: "Resistors in series: add up; in parallel: reciprocals add", formula: "\\dfrac{1}{R_{\\text{eq}}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\cdots" },
        { heading: "6. Power in Circuits", content: "Electrical power dissipated:", formula: "P = IV = I^2R = \\dfrac{V^2}{R}" },
      ],
      keyPoints: ["Current same in series, voltage same in parallel", "Resistivity depends on temperature", "Kirchhoff's laws are consequences of charge/energy conservation"],
      practiceQuestions: ["Three resistors 2, 3, 6 ohm in parallel. Find equivalent."],
    },
    emw: {
      title: "Electromagnetic Waves",
      sections: [
        { heading: "1. EM Wave Properties", content: "All EM waves travel at the speed of light:", formula: "c = \\lambda\\nu = 3 \\times 10^8 \\; \\text{m/s}" },
        { heading: "2. EM Spectrum", content: "From longest to shortest wavelength:", formula: "\\lambda: \\text{radio} > \\text{microwave} > \\text{IR} > \\text{visible} > \\text{UV} > \\text{X-ray} > \\gamma\\text{-ray}" },
        { heading: "3. Energy of Photon", content: "", formula: "E = h\\nu = \\dfrac{hc}{\\lambda}" },
        { heading: "4. Displacement Current", content: "Maxwell's correction to Ampere's law:", formula: "I_d = \\varepsilon_0\\,\\dfrac{d\\Phi_E}{dt}" },
      ],
      keyPoints: ["Higher frequency = higher photon energy", "EM waves can be polarized (transverse)", "No medium required for propagation"],
      practiceQuestions: ["Find frequency of radio wave with wavelength 300m."],
    },
    modern: {
      title: "Modern Physics",
      sections: [
        { heading: "1. Photoelectric Effect", content: "Light behaves as photons (particles):", formula: "KE_{\\max} = h\\nu - \\phi = h\\nu - h\\nu_0" },
        { heading: "2. Bohr Model", content: "Quantized energy levels in hydrogen:", formula: "E_n = -\\dfrac{13.6}{n^2}\\; \\text{eV}" },
        { heading: "3. de Broglie Wavelength", content: "Matter waves:", formula: "\\lambda = \\dfrac{h}{p} = \\dfrac{h}{mv}" },
        { heading: "4. Nuclear Decay", content: "Exponential decay law:", formula: "N = N_0\\,e^{-\\lambda t}, \\quad T_{1/2} = \\dfrac{\\ln 2}{\\lambda}" },
        { heading: "5. Binding Energy", content: "Mass defect converted to energy:", formula: "BE = \\Delta m\\,c^2, \\quad \\Delta m = Zm_p + Nm_n - M_{\\text{nucleus}}" },
      ],
      keyPoints: ["Proves particle nature of light", "Half-life is constant regardless of conditions", "Binding energy per nucleon peaks at Iron-56"],
      practiceQuestions: ["Activity reduces to 1/8 in 24 days. Find half-life."],
    },
  },
  chemistry: {
    atomic: {
      title: "Atomic Structure",
      sections: [
        { heading: "1. Quantum Numbers", content: "Four quantum numbers describe each electron's state:", formula: "\\begin{aligned} n &\\rightarrow \\text{principal (shell)} \\\\ l &\\rightarrow \\text{azimuthal (subshell): } 0 \\leq l \\leq n-1 \\\\ m_l &\\rightarrow \\text{magnetic: } -l \\leq m_l \\leq +l \\\\ m_s &\\rightarrow \\text{spin: } +\\tfrac{1}{2}\\text{ or } -\\tfrac{1}{2} \\end{aligned}" },
        { heading: "2. Aufbau Principle", content: "Electrons fill orbitals in order of increasing energy:", formula: "1s \\lt 2s \\lt 2p \\lt 3s \\lt 3p \\lt 4s \\lt 3d \\lt 4p \\lt 5s \\lt 4d \\lt 5p \\lt 6s \\lt 4f \\lt \\cdots" },
        { heading: "3. Pauli Exclusion Principle", content: "No two electrons can have the same four quantum numbers:", formula: "Each orbital holds max 2 electrons with opposite spins" },
        { heading: "4. Hund's Rule", content: "Electrons fill degenerate orbitals singly first:", formula: "\\underline{\\uparrow\\,}\\;\\underline{\\uparrow\\,}\\;\\underline{\\uparrow\\,} \\quad (3\\text{ unpaired in } p^3)" },
      ],
      keyPoints: ["n determines energy level and size", "Hund: electrons fill singly first, then pair up", "Maximum electrons in shell n = 2n²"],
      practiceQuestions: ["Write electronic configuration of Fe (Z=26)."],
    },
    bonding: {
      title: "Chemical Bonding",
      sections: [
        { heading: "1. Ionic Bond", content: "Complete transfer of electrons from metal to non-metal:", formula: "\\text{Na} \\rightarrow \\text{Na}^+ + e^- \\qquad \\text{Cl} + e^- \\rightarrow \\text{Cl}^- \\qquad \\text{Na}^+ + \\text{Cl}^- \\rightarrow \\text{NaCl}" },
        { heading: "2. Covalent Bond", content: "Sharing of electron pairs:", formula: "\\text{H}\\cdot \\; + \\; \\cdot\\text{H} \\rightarrow \\text{H: H} \\quad (\\text{or } \\text{H}-\\text{H})" },
        { heading: "3. VSEPR Theory", content: "Predict molecular geometry from electron domains:", formula: "\\text{Steric number} = \\text{bonding pairs} + \\text{lone pairs}" },
        { heading: "4. Bond Parameters", content: "", formula: "\\begin{aligned} \\text{Bond length} &: \\text{distance between nuclei} \\\\ \\text{Bond energy} &: \\text{energy to break bond} \\\\ \\text{Bond angle} &: \\text{angle between bonds} \\end{aligned}" },
      ],
      keyPoints: ["Ionic: metal + non-metal, electron transfer", "Covalent: non-metal + non-metal, electron sharing", "VSEPR: more lone pairs → smaller bond angles"],
      practiceQuestions: ["Predict geometry of CH₄, NH₃, H₂O."],
    },
    equilibrium: {
      title: "Chemical Equilibrium",
      sections: [
        { heading: "1. Equilibrium Constant (Kc)", content: "For a reversible reaction:", formula: "a\\text{A} + b\\text{B} \\rightleftharpoons c\\text{C} + d\\text{D} \\qquad K_c = \\dfrac{[\\text{C}]^c\\,[\\text{D}]^d}{[\\text{A}]^a\\,[\\text{B}]^b}" },
        { heading: "2. Le Chatelier's Principle", content: "System opposes any imposed change:", formula: "\\text{Increase pressure} \\rightarrow \\text{shift toward fewer moles of gas}" },
        { heading: "3. pH and pOH", content: "", formula: "\\text{pH} = -\\log[\\text{H}^+], \\qquad \\text{pOH} = -\\log[\\text{OH}^-], \\qquad \\text{pH} + \\text{pOH} = 14" },
        { heading: "4. Henderson-Hasselbalch", content: "Buffer pH calculation:", formula: "\\text{pH} = \\text{p}K_a + \\log\\dfrac{[\\text{A}^-]}{[\\text{HA}]}" },
        { heading: "5. Relation between Kp and Kc", content: "", formula: "K_p = K_c\\,(RT)^{\\Delta n}, \\qquad \\Delta n = (c+d) - (a+b)" },
      ],
      keyPoints: ["K > 1: products favored at equilibrium", "Temperature is the only factor that changes K", "Catalyst speeds up both forward and reverse equally"],
      practiceQuestions: ["Calculate pH of 0.01M HCl."],
    },
    thermo: {
      title: "Thermochemistry",
      sections: [
        { heading: "1. Enthalpy", content: "Heat exchanged at constant pressure:", formula: "\\Delta H = q_p" },
        { heading: "2. Hess's Law", content: "Enthalpy is a state function:", formula: "\\Delta H_{\\text{total}} = \\sum \\Delta H_{\\text{steps}}" },
        { heading: "3. Gibbs Free Energy", content: "Spontaneity criterion:", formula: "\\Delta G = \\Delta H - T\\Delta S" },
        { heading: "4. Spontaneity Conditions", content: "", formula: "\\begin{aligned} \\Delta G < 0 &: \\text{spontaneous} \\\\ \\Delta G = 0 &: \\text{equilibrium} \\\\ \\Delta G > 0 &: \\text{non-spontaneous} \\end{aligned}" },
        { heading: "5. Standard Gibbs Energy", content: "From formation energies:", formula: "\\Delta G^\\circ_{\\text{rxn}} = \\sum \\Delta G^\\circ_f(\\text{products}) - \\sum \\Delta G^\\circ_f(\\text{reactants})" },
      ],
      keyPoints: ["Exothermic: ΔH < 0 (releases heat)", "ΔG < 0: spontaneous at constant T and P", "Entropy (S) measures disorder"],
      practiceQuestions: ["Is reaction spontaneous if ΔH = -100 kJ, ΔS = -200 J/K?"],
    },
    kinetics: {
      title: "Chemical Kinetics",
      sections: [
        { heading: "1. Rate Law", content: "Rate depends on concentration raised to orders:", formula: "\\text{Rate} = k\\,[\\text{A}]^m\\,[\\text{B}]^n" },
        { heading: "2. Integrated Rate Laws", content: "", formula: "\\begin{aligned} \\text{Zero order:} \\quad &[\\text{A}] = [\\text{A}]_0 - kt \\\\ \\text{First order:} \\quad &\\ln[\\text{A}] = \\ln[\\text{A}]_0 - kt \\\\ \\text{Second order:} \\quad &\\dfrac{1}{[\\text{A}]} = \\dfrac{1}{[\\text{A}]_0} + kt \\end{aligned}" },
        { heading: "3. Half-life", content: "Time for concentration to halve:", formula: "\\begin{aligned} t_{1/2} &= \\dfrac{\\ln 2}{k} \\approx \\dfrac{0.693}{k} \\quad &\\text{(first order)} \\\\ t_{1/2} &= \\dfrac{[\\text{A}]_0}{2k} \\quad &\\text{(second order)} \\end{aligned}" },
        { heading: "4. Arrhenius Equation", content: "Temperature dependence of rate constant:", formula: "k = A\\,e^{-E_a/RT}, \\qquad \\ln\\dfrac{k_2}{k_1} = \\dfrac{E_a}{R}\\!\\left(\\dfrac{1}{T_1} - \\dfrac{1}{T_2}\\right)" },
      ],
      keyPoints: ["Order ≠ molecularity (determined experimentally)", "Catalyst lowers activation energy, increases rate", "Rate constant k depends only on temperature"],
      practiceQuestions: ["Calculate half-life with k = 0.02 s⁻¹."],
    },
    "acid-base": {
      title: "Acid-Base Chemistry",
      sections: [
        { heading: "1. pH Definition", content: "", formula: "\\text{pH} = -\\log_{10}[\\text{H}^+], \\qquad [\\text{H}^+] = 10^{-\\text{pH}}" },
        { heading: "2. Strong Acids and Bases", content: "Fully dissociate in water:", formula: "\\text{HCl} \\rightarrow \\text{H}^+ + \\text{Cl}^- \\qquad \\text{NaOH} \\rightarrow \\text{Na}^+ + \\text{OH}^-" },
        { heading: "3. Weak Acid Dissociation", content: "", formula: "\\text{HA} \\rightleftharpoons \\text{H}^+ + \\text{A}^- \\qquad K_a = \\dfrac{[\\text{H}^+][\\text{A}^-]}{[\\text{HA}]}" },
        { heading: "4. pH of Weak Acid", content: "For weak acid with concentration C:", formula: "\\text{pH} = \\tfrac{1}{2}\\,\\text{p}K_a - \\tfrac{1}{2}\\log C \\qquad (\\text{approx.})" },
        { heading: "5. Buffer Solution", content: "Resists pH change:", formula: "\\text{pH} = \\text{p}K_a + \\log\\dfrac{[\\text{salt}]}{[\\text{acid}]} \\quad (\\text{Henderson-Hasselbalch})" },
        { heading: "6. Water Ion Product", content: "", formula: "K_w = [\\text{H}^+][\\text{OH}^-] = 1.0 \\times 10^{-14} \\quad \\text{at } 25\\degree\\text{C}" },
      ],
      keyPoints: ["Strong acids completely ionize in water", "pH < 7: acidic, pH = 7: neutral, pH > 7: basic", "Buffer resists pH change when small amounts of acid/base added"],
      practiceQuestions: ["Calculate pH of 0.1M CH₃COOH (Ka = 1.8×10⁻⁵)."],
    },
    redox: {
      title: "Redox Reactions",
      sections: [
        { heading: "1. Oxidation-Reduction", content: "OIL RIG — Oxidation Is Loss, Reduction Is Gain:", formula: "\\begin{aligned} \\text{Oxidation:}\\quad &\\text{A} \\rightarrow \\text{A}^+ + e^- \\\\ \\text{Reduction:}\\quad &\\text{B} + e^- \\rightarrow \\text{B}^- \\end{aligned}" },
        { heading: "2. Cell Potential", content: "", formula: "E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}" },
        { heading: "3. Nernst Equation", content: "Cell potential at non-standard conditions:", formula: "E = E^\\circ - \\dfrac{0.0591}{n}\\,\\log Q \\quad \\text{(at } 25\\degree\\text{C)}" },
        { heading: "4. Gibbs Energy and Cell Potential", content: "", formula: "\\Delta G^\\circ = -nFE^\\circ_{\\text{cell}}" },
      ],
      keyPoints: ["Anode: oxidation (loss of electrons)", "Cathode: reduction (gain of electrons)", "Higher E° means stronger oxidizing agent"],
      practiceQuestions: ["Calculate E°cell for Zn|Zn²⁺||Cu²⁺|Cu."],
    },
    organic: {
      title: "Organic Chemistry Basics",
      sections: [
        { heading: "1. IUPAC Nomenclature", content: "Naming organic compounds systematically:", formula: "\\text{Name} = \\text{prefix} + \\text{root} + \\text{suffix}" },
        { heading: "2. Functional Groups", content: "", formula: "\\begin{aligned} \\text{Alcohol:} && \\text{-OH} &\\rightarrow \\text{R-OH} \\\\ \\text{Aldehyde:} && \\text{-CHO} &\\rightarrow \\text{R-CHO} \\\\ \\text{Ketone:} && \\text{-CO-} &\\rightarrow \\text{R-CO-R'} \\\\ \\text{Carboxylic acid:} && \\text{-COOH} &\\rightarrow \\text{R-COOH} \\\\ \\text{Amine:} && \\text{-NH}_2 &\\rightarrow \\text{R-NH}_2 \\end{aligned}" },
        { heading: "3. Isomerism", content: "Same molecular formula, different structure:", formula: "\\begin{aligned} \\text{Structural isomers:}\\quad &\\text{different connectivity} \\\\ \\text{Stereoisomers:}\\quad &\\text{same connectivity, different spatial arrangement} \\end{aligned}" },
        { heading: "4. Homologous Series", content: "Series differing by CH₂:", formula: "\\Delta M = 14 \\; \\text{g/mol per } \\text{CH}_2 \\text{ unit}" },
      ],
      keyPoints: ["Carbon forms 4 covalent bonds (tetravalency)", "Homologous series differ by CH₂ (14 g/mol)", "Isomers have different physical and chemical properties"],
      practiceQuestions: ["Name: CH₃CH(CH₃)CH₂CH₃"],
    },
  },
  mathematics: {
    calculus: {
      title: "Calculus",
      sections: [
        { heading: "1. Limits", content: "The value a function approaches:", formula: "\\lim_{x \\to a} f(x) = L" },
        { heading: "2. Derivatives — Basic Rules", content: "Rate of change of a function:", formula: "\\dfrac{d}{dx}\\big[x^n\\big] = nx^{n-1}, \\quad \\dfrac{d}{dx}[\\sin x] = \\cos x, \\quad \\dfrac{d}{dx}[e^x] = e^x, \\quad \\dfrac{d}{dx}[\\ln x] = \\dfrac{1}{x}" },
        { heading: "3. Product and Quotient Rules", content: "", formula: "\\begin{aligned} \\dfrac{d}{dx}[f \\cdot g] &= f'g + fg' \\\\ \\dfrac{d}{dx}\\!\\left[\\dfrac{f}{g}\\right] &= \\dfrac{f'g - fg'}{g^2} \\end{aligned}" },
        { heading: "4. Chain Rule", content: "For composite functions:", formula: "\\dfrac{dy}{dx} = \\dfrac{dy}{du}\\cdot\\dfrac{du}{dx}" },
        { heading: "5. Integration — Basic Formulas", content: "Antiderivatives:", formula: "\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C, \\quad \\int \\dfrac{1}{x}\\,dx = \\ln|x| + C, \\quad \\int e^x\\,dx = e^x + C" },
        { heading: "6. Fundamental Theorem of Calculus", content: "Connects differentiation and integration:", formula: "\\int_a^b f(x)\\,dx = F(b) - F(a), \\quad \\text{where } F'(x) = f(x)" },
        { heading: "7. Integration by Parts", content: "", formula: "\\int u\\,dv = uv - \\int v\\,du" },
      ],
      keyPoints: ["Derivative = instantaneous rate of change (slope)", "Integration = accumulation / area under curve", "Differentiation and integration are inverse operations"],
      practiceQuestions: ["Find derivative of x³ + 2x² - 5x + 3."],
    },
    trigonometry: {
      title: "Trigonometry",
      sections: [
        { heading: "1. Basic Ratios", content: "In a right triangle:", formula: "\\sin\\theta = \\dfrac{\\text{opposite}}{\\text{hypotenuse}}, \\quad \\cos\\theta = \\dfrac{\\text{adjacent}}{\\text{hypotenuse}}, \\quad \\tan\\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}} = \\dfrac{\\sin\\theta}{\\cos\\theta}" },
        { heading: "2. Pythagorean Identities", content: "", formula: "\\sin^2\\theta + \\cos^2\\theta = 1, \\qquad 1 + \\tan^2\\theta = \\sec^2\\theta, \\qquad 1 + \\cot^2\\theta = \\csc^2\\theta" },
        { heading: "3. Double Angle Formulas", content: "", formula: "\\begin{aligned} \\sin 2\\theta &= 2\\sin\\theta\\cos\\theta \\\\ \\cos 2\\theta &= \\cos^2\\theta - \\sin^2\\theta = 2\\cos^2\\theta - 1 = 1 - 2\\sin^2\\theta \\\\ \\tan 2\\theta &= \\dfrac{2\\tan\\theta}{1 - \\tan^2\\theta} \\end{aligned}" },
        { heading: "4. Sum and Difference", content: "", formula: "\\begin{aligned} \\sin(A \\pm B) &= \\sin A\\cos B \\pm \\cos A\\sin B \\\\ \\cos(A \\pm B) &= \\cos A\\cos B \\mp \\sin A\\sin B \\end{aligned}" },
        { heading: "5. Law of Sines and Cosines", content: "For any triangle:", formula: "\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}, \\qquad c^2 = a^2 + b^2 - 2ab\\cos C" },
      ],
      keyPoints: ["SOH CAH TOA", "Period of sin/cos: 2π, period of tan: π", "All angles in radians for calculus"],
      practiceQuestions: ["Find sin 75°."],
    },
    algebra: {
      title: "Algebra",
      sections: [
        { heading: "1. Matrix Operations", content: "Addition and scalar multiplication:", formula: "\\begin{aligned} A + B &= \\begin{pmatrix} a_{11}+b_{11} & a_{12}+b_{12} \\\\ a_{21}+b_{21} & a_{22}+b_{22} \\end{pmatrix} \\\\ kA &= \\begin{pmatrix} ka_{11} & ka_{12} \\\\ ka_{21} & ka_{22} \\end{pmatrix} \\end{aligned}" },
        { heading: "2. Matrix Multiplication", content: "", formula: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\\begin{pmatrix} e & f \\\\ g & h \\end{pmatrix} = \\begin{pmatrix} ae+bg & af+bh \\\\ ce+dg & cf+dh \\end{pmatrix}" },
        { heading: "3. Transpose Property", content: "", formula: "(AB)^T = B^T \\cdot A^T" },
        { heading: "4. Determinant (2×2)", content: "", formula: "\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc" },
        { heading: "5. Complex Numbers", content: "", formula: "i^2 = -1, \\qquad (a+bi)(a-bi) = a^2 + b^2, \\qquad |a+bi| = \\sqrt{a^2 + b^2}" },
        { heading: "6. Quadratic Formula", content: "", formula: "x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" },
      ],
      keyPoints: ["Matrix multiplication is not commutative (AB ≠ BA in general)", "Conjugate of a + bi is a - bi", "det(AB) = det(A)·det(B)"],
      practiceQuestions: ["Find determinant of [[2,3],[1,4]]."],
    },
    statistics: {
      title: "Statistics",
      sections: [
        { heading: "1. Measures of Central Tendency", content: "", formula: "\\bar{x} = \\dfrac{\\sum_{i=1}^{n} x_i}{n}" },
        { heading: "2. Variance and Standard Deviation", content: "", formula: "\\sigma^2 = \\dfrac{\\sum (x_i - \\mu)^2}{n}, \\qquad \\sigma = \\sqrt{\\sigma^2}" },
        { heading: "3. Probability", content: "For equally likely outcomes:", formula: "P(E) = \\dfrac{n(E)}{n(S)}" },
        { heading: "4. Conditional Probability", content: "", formula: "P(A|B) = \\dfrac{P(A \\cap B)}{P(B)}" },
        { heading: "5. Bayes' Theorem", content: "", formula: "P(A_i|B) = \\dfrac{P(B|A_i)\\cdot P(A_i)}{\\sum_j P(B|A_j)\\cdot P(A_j)}" },
        { heading: "6. Binomial Distribution", content: "n independent trials, probability of success p:", formula: "P(X = k) = \\binom{n}{k}\\,p^k\\,(1-p)^{n-k}" },
      ],
      keyPoints: ["Mean is affected by outliers; median is robust", "Standard deviation measures spread from mean", "P(A∩B) = P(A)·P(B) for independent events"],
      practiceQuestions: ["Find mean, median, mode of: 2, 3, 3, 4, 5, 5, 5, 6"],
    },
    geometry: {
      title: "Coordinate Geometry",
      sections: [
        { heading: "1. Distance Formula", content: "", formula: "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}" },
        { heading: "2. Section Formula", content: "Point dividing line in ratio m:n:", formula: "\\left(\\dfrac{mx_2 + nx_1}{m+n},\\; \\dfrac{my_2 + ny_1}{m+n}\\right)" },
        { heading: "3. Slope", content: "", formula: "m = \\dfrac{y_2 - y_1}{x_2 - x_1} = \\tan\\theta" },
        { heading: "4. Equation of a Line", content: "", formula: "\\begin{aligned} y - y_1 &= m(x - x_1) \\quad &\\text{(point-slope)} \\\\ y &= mx + c \\quad &\\text{(slope-intercept)} \\\\ ax + by + c &= 0 \\quad &\\text{(general form)} \\end{aligned}" },
        { heading: "5. Circle", content: "Center (h,k), radius r:", formula: "(x - h)^2 + (y - k)^2 = r^2" },
        { heading: "6. Parabola", content: "Standard form:", formula: "y^2 = 4ax \\quad (\\text{opens right}), \\qquad x^2 = 4ay \\quad (\\text{opens up})" },
        { heading: "7. Ellipse", content: "", formula: "\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1" },
        { heading: "8. Hyperbola", content: "", formula: "\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1" },
      ],
      keyPoints: ["Parallel lines: equal slopes (m₁ = m₂)", "Perpendicular lines: m₁·m₂ = -1", "Distance from point to line: d = |ax₁+by₁+c|/√(a²+b²)"],
      practiceQuestions: ["Find distance between (1,2) and (4,6)."],
    },
  },
  biology: {
    cell: {
      title: "Cell Theory & Structure",
      sections: [
        { heading: "1. Cell Theory", content: "All living organisms are composed of cells, the basic unit of life. Cells arise from pre-existing cells.", formula: "Schleiden (1838) + Schwann (1839) + Virchow (1855)" },
        { heading: "2. Prokaryotic vs Eukaryotic Cells", content: "Prokaryotes lack membrane-bound organelles; eukaryotes have a nucleus and organelles.", formula: "\\text{Prokaryote: } 0.1{-}5\\,\\mu\\text{m} \\qquad \\text{Eukaryote: } 10{-}100\\,\\mu\\text{m}" },
        { heading: "3. Cell Membrane", content: "Phospholipid bilayer with embedded proteins — selectively permeable.", formula: "\\text{Fluid Mosaic Model: } \\text{phospholipids} + \\text{proteins} + \\text{cholesterol}" },
        { heading: "4. Key Organelles", content: "Nucleus (DNA storage), mitochondria (ATP production), ribosomes (protein synthesis), ER (transport), Golgi (packaging).", formula: "Mitochondria: \\; 2C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + 6H_2O + 38\\,ATP" },
        { heading: "5. Plant vs Animal Cell", content: "Plant cells have cell wall (cellulose), chloroplasts, large central vacuole. Animal cells have centrioles, lysosomes.", formula: "\\text{Cell wall: } (C_6H_{10}O_5)_n \\quad (\\text{cellulose})" },
      ],
      keyPoints: ["Cell is the smallest unit of life", "All cells come from pre-existing cells", "Plant cells have cell walls; animal cells do not"],
      practiceQuestions: ["Label the parts of a plant cell and state their functions."],
    },
    genetics: {
      title: "Genetics & Heredity",
      sections: [
        { heading: "1. Mendel's Laws", content: "Law of Segregation: allele pairs separate during gamete formation. Law of Independent Assortment: genes for different traits segregate independently.", formula: "\\text{Monohybrid cross: } Aa \\times Aa \\rightarrow 1\\,AA : 2\\,Aa : 1\\,aa" },
        { heading: "2. DNA Structure", content: "Double helix: two antiparallel strands with sugar-phosphate backbone and complementary base pairs.", formula: "A = T \\;(2\\;\\text{H-bonds}), \\qquad G \\equiv C \\;(3\\;\\text{H-bonds})" },
        { heading: "3. DNA Replication", content: "Semi-conservative: each new DNA molecule has one old and one new strand.", formula: "Helicase opens → DNA polymerase adds nucleotides 5'→3'" },
        { heading: "4. Transcription", content: "DNA → mRNA in the nucleus (RNA polymerase reads template strand).", formula: "DNA: 3'-TACGG-5' → mRNA: 5'-AUGCC-3'" },
        { heading: "5. Translation", content: "mRNA → protein at ribosome. Codons (triplets) specify amino acids.", formula: "\\text{Genetic code: } 64\\;\\text{codons} \\rightarrow 20\\;\\text{amino acids}" },
      ],
      keyPoints: ["DNA is a double helix with complementary base pairing", "mRNA carries genetic info from nucleus to ribosome", "One gene → one polypeptide (central dogma)"],
      practiceQuestions: ["If a DNA strand is 3'-TACGTA-5', write the mRNA sequence."],
    },
    ecology: {
      title: "Ecology & Environment",
      sections: [
        { heading: "1. Ecosystem Components", content: "Biotic (living: producers, consumers, decomposers) and abiotic (non-living: sunlight, water, soil).", formula: "\\text{Energy flow: Sun} \\rightarrow \\text{Producer} \\rightarrow \\text{Consumer} \\rightarrow \\text{Decomposer}" },
        { heading: "2. Food Chain & Web", content: "Feeding relationships: producers → primary consumers → secondary consumers → tertiary consumers.", formula: "10\\%\\;\\text{rule: only ~10\\% energy transfers to next trophic level}" },
        { heading: "3. Biogeochemical Cycles", content: "Carbon cycle: photosynthesis ↔ respiration. Nitrogen cycle: fixation → nitrification → assimilation → denitrification.", formula: "\\text{Carbon: } 6CO_2 + 6H_2O \\xrightarrow{\\text{light}} C_6H_{12}O_6 + 6O_2" },
        { heading: "4. Population Ecology", content: "Population growth: exponential (J-curve) and logistic (S-curve with carrying capacity K).", formula: "\\dfrac{dN}{dt} = rN\\left(\\dfrac{K - N}{K}\\right) \\quad (\\text{logistic})" },
        { heading: "5. Biodiversity & Conservation", content: "Loss of biodiversity threatens ecosystem stability. Strategies: in-situ (national parks) and ex-situ (zoos, seed banks).", formula: "\\text{Biodiversity hotspots: } \\gt 1500\\;\\text{vascular plant species, } \\gt 70\\%\\;\\text{original habitat lost}" },
      ],
      keyPoints: ["Energy flows one way; nutrients cycle", "10% energy transfer between trophic levels", "Biodiversity = variety of life at all levels"],
      practiceQuestions: ["Draw a food web for a forest ecosystem and identify trophic levels."],
    },
    human: {
      title: "Human Physiology",
      sections: [
        { heading: "1. Circulatory System", content: "Heart (4 chambers), blood vessels (arteries, veins, capillaries), blood (RBC, WBC, platelets, plasma).", formula: "\\text{Cardiac output} = \\text{HR} \\times \\text{SV} = 70 \\times 70 = 4900\\;\\text{mL/min}" },
        { heading: "2. Respiratory System", content: "Gas exchange in alveoli: O₂ diffuses into blood, CO₂ diffuses out.", formula: "O_2 + 4Hb \\rightleftharpoons Hb_4O_8 \\quad (\\text{hemoglobin})" },
        { heading: "3. Digestive System", content: "Mechanical + chemical breakdown of food. Enzymes: amylase (carbs), pepsin (protein), lipase (fats).", formula: "\\text{Starch} \\xrightarrow{\\text{amylase}} \\text{Maltose} \\xrightarrow{\\text{maltase}} \\text{Glucose}" },
        { heading: "4. Nervous System", content: "Neuron structure: dendrite → cell body → axon → terminal. Impulse travels as action potential.", formula: "\\text{Resting potential: } -70\\,\\text{mV} \\quad \\text{Action potential: } +30\\,\\text{mV}" },
        { heading: "5. Excretory System", content: "Kidneys filter blood → nephrons → urine. Each kidney has ~1 million nephrons.", formula: "\\text{GFR} \\approx 125\\;\\text{mL/min} \\quad (\\text{glomerular filtration rate})" },
      ],
      keyPoints: ["Blood circulates in a closed double循环 system", "Alveoli provide huge surface area for gas exchange", "Nephron is the functional unit of the kidney"],
      practiceQuestions: ["Describe the path of a red blood cell from the heart to the big toe and back."],
    },
    evolution: {
      title: "Evolution & Classification",
      sections: [
        { heading: "1. Origin of Life", content: "Oparin-Haldane hypothesis: organic molecules formed from inorganic precursors in early Earth conditions.", formula: "\\text{Miller-Urey: } CH_4 + NH_3 + H_2 + H_2O \\xrightarrow{\\text{spark}} \\text{amino acids}" },
        { heading: "2. Natural Selection", content: "Darwin: individuals with favorable variations survive and reproduce more.", formula: "\\text{Fitness} = \\dfrac{\\text{reproductive success}}{\\text{population}} \\propto \\text{adaptation}" },
        { heading: "3. Evidence of Evolution", content: "Fossil record, comparative anatomy (homologous vs analogous), embryology, molecular biology (DNA similarity).", formula: "\\text{Human-Chimp DNA similarity} \\approx 98.7\\%" },
        { heading: "4. Taxonomy", content: "Classification hierarchy: Kingdom → Phylum → Class → Order → Family → Genus → Species.", formula: "\\text{Binomial nomenclature: } \\textit{Homo\\;sapiens}" },
        { heading: "5. Phylogenetic Trees", content: "Branching diagrams showing evolutionary relationships based on shared characteristics.", formula: "\\text{Cladogram: nodes = common ancestors, branches = lineages}" },
      ],
      keyPoints: ["Natural selection drives evolution", "Homologous structures indicate common ancestry", "Five-kingdom system: Monera, Protista, Fungi, Plantae, Animalia"],
      practiceQuestions: ["Explain how homologous structures provide evidence for evolution."],
    },
    plant: {
      title: "Plant Physiology",
      sections: [
        { heading: "1. Photosynthesis", content: "Light reactions (thylakoid) produce ATP + NADPH; Calvin cycle (stroma) fixes CO₂ into glucose.", formula: "6CO_2 + 6H_2O \\xrightarrow{\\text{light, chlorophyll}} C_6H_{12}O_6 + 6O_2" },
        { heading: "2. Transpiration", content: "Water loss as vapor through stomata. Creates transpiration pull for water ascent.", formula: "\\text{Transpiration rate} \\propto \\dfrac{\\Delta RH \\times \\text{area}}{\\text{resistance}}" },
        { heading: "3. Transport in Plants", content: "Xylem: water + minerals upward (transpiration pull). Phloem: sugars bidirectional (pressure flow).", formula: "\\text{Pressure flow: } P_{\\text{source}} \\gt P_{\\text{sink}} \\rightarrow \\text{mass flow}" },
        { heading: "4. Plant Hormones", content: "Auxin (growth), gibberellin (stem elongation), cytokinin (cell division), abscisic acid (stress), ethylene (ripening).", formula: "\\text{Phototropism: } \\text{auxin accumulates on shaded side} \\rightarrow \\text{bending toward light}" },
        { heading: "5. Nutrition", content: "Essential elements: macronutrients (N, P, K, Ca, Mg, S) and micronutrients (Fe, Mn, Zn, Cu, B, Mo, Cl).", formula: "\\text{N deficiency: } \\text{chlorosis (yellowing) of older leaves}" },
      ],
      keyPoints: ["Photosynthesis occurs in chloroplasts", "Xylem transports water up; phloem transports food both ways", "Plant hormones regulate growth and responses"],
      practiceQuestions: ["Explain the light-dependent and light-independent reactions of photosynthesis."],
    },
  },
};

// Old TheoryPanel rendering (for existing labs)
function OldTheoryPanel({ title, vocabulary, look, predict, principle, why }: {
  title?: string;
  vocabulary?: string;
  look?: string | React.ReactNode;
  predict?: string;
  principle?: string | React.ReactNode;
  why?: string;
}) {
  if (!title && !vocabulary) return null;
  
  return (
    <div className="mt-4 space-y-3">
      {title && <h3 className="font-semibold text-sm text-primary">{title}</h3>}
      {vocabulary && (
        <div className="bg-muted p-3 rounded-lg">
          <p className="text-xs font-semibold text-muted-foreground mb-1">Vocabulary</p>
          <p className="text-sm">{vocabulary}</p>
        </div>
      )}
      {look && (
        <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">Look</p>
          <div className="text-sm">{look}</div>
        </div>
      )}
      {predict && (
        <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">Predict</p>
          <p className="text-sm">{predict}</p>
        </div>
      )}
      {principle && (
        <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
          <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">Principle</p>
          <div className="text-sm">{principle}</div>
        </div>
      )}
      {why && (
        <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-400 mb-1">Why</p>
          <p className="text-sm">{why}</p>
        </div>
      )}
    </div>
  );
}

// New TheoryPanel rendering (for theory lab)
function NewTheoryPanel({ subject, topic }: { subject?: string; topic?: string }) {
  const [activeSection, setActiveSection] = useState(0);
  
  if (!subject || !topic) return null;
  
  const data = THEORY_CONTENT[subject]?.[topic];
  
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <BookOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h2 className="text-lg font-semibold">Theory Content Coming Soon</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Detailed theory for {subject} - {topic} is being prepared.
        </p>
      </div>
    );
  }

  const currentSection = data.sections[activeSection];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/10 to-transparent p-4 rounded-lg border-l-4 border-primary">
        <h2 className="text-xl font-bold">{data.title}</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {data.sections.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSection(idx)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeSection === idx
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {idx + 1}. {data.sections[idx].heading.replace(/^\d+\.\s*/, "")}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5 text-primary" />
            {currentSection.heading}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground leading-relaxed">{currentSection.content}</p>
          {currentSection.formula && (
            <div className="rounded-xl border border-border bg-muted/40 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-border bg-muted/60">
                <p className="flex items-center gap-2 text-primary font-semibold text-sm">
                  <span>📐 Key Formula</span>
                </p>
              </div>
              <div className="p-5 flex items-center justify-center overflow-x-auto">
                <Katex math={currentSection.formula} displayMode={true} />
              </div>
            </div>
          )}
          {currentSection.example && (
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-400 font-semibold text-sm">
                <Lightbulb className="h-4 w-4" />
                <span>Example</span>
              </p>
              <pre className="whitespace-pre-wrap text-sm font-mono">{currentSection.example}</pre>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-green-700 dark:text-green-400">
            <CheckCircle className="h-5 w-5" />
            Key Points to Remember
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span className="text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-amber-700 dark:text-amber-400">
            <AlertCircle className="h-5 w-5" />
            Practice Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {data.practiceQuestions.map((q, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-primary/10 text-primary">
                  {idx + 1}
                </span>
                <span className="text-sm">{q}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}

export function TheoryPanel(props: TheoryPanelProps) {
  // If subject and topic are provided, use new interface
  if (props.subject && props.topic) {
    return <NewTheoryPanel subject={props.subject} topic={props.topic} />;
  }
  
  // Otherwise use old interface
  return <OldTheoryPanel {...props} />;
}

