/**
 * Pro Knowledge — Numerical Physics, chapters 4–6.
 * Electrostatics & current, Optics, Modern physics.
 */

import type { KnowledgeChapter } from "@/features/knowledge/types";

export const PHYSICS_CHAPTERS_B: KnowledgeChapter[] = [
  /* ══════════ 4 · ELECTROSTATICS & CURRENT ══════════ */
  {
    id: "electrostatics-current",
    title: "Electrostatics & Current Electricity",
    classLevel: "both",
    blurb:
      "Coulomb's law, field and potential of standard charge configurations, capacitors, Ohm's law, resistivity, Kirchhoff's rules and power.",
    theory: [
      {
        heading: "Charge, quantisation and Coulomb's law",
        level: "basic",
        body:
          "Charge is quantised in units of e = 1.6 × 10⁻¹⁹ C and conserved in every process. Coulomb's law gives the force between two point charges: proportional to the product of charges, inversely proportional to the square of the separation, attractive for unlike and repulsive for like charges. In a medium the force weakens by the dielectric constant K.",
        math: "F = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1q_2}{r^2}, \\qquad \\varepsilon_0 = 8.85 \\times 10^{-12}\\ \\text{C}^2/\\text{N·m}^2",
      },
      {
        heading: "Electric field and field lines",
        level: "standard",
        body:
          "The electric field is the force per unit positive test charge. Field lines start on positive and end on negative charges, never cross, and their density shows strength. Inside a conductor in electrostatic equilibrium the field is exactly zero, which is why charge resides on the outer surface and why a car protects you from lightning.",
        math: "E = \\frac{F}{q} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{r^2}",
      },
      {
        heading: "Potential, potential difference and equipotentials",
        level: "standard",
        body:
          "Potential is the work per unit charge moving from infinity to the point (V = kQ/r, positive for a positive charge). Potential difference is what drives current. Field and potential are related by E = −dV/dr, so a uniform field has potential falling linearly with distance and equipotential surfaces are always perpendicular to field lines.",
        math: "V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{r}, \\qquad E = -\\frac{dV}{dr}",
      },
      {
        heading: "Capacitors and dielectrics",
        level: "pro",
        body:
          "A capacitor stores charge for a given voltage; capacitance depends only on geometry (C = ε₀A/d for a parallel-plate capacitor) and rises by a factor K when a dielectric fills the gap. Energy stored is ½CV². In series the equivalent capacitance falls and each shares the same charge; in parallel capacitances add and each sees the same voltage.",
        math: "C = \\frac{\\varepsilon_0 K A}{d}, \\qquad U = \\tfrac{1}{2}CV^2 = \\tfrac{1}{2}\\frac{Q^2}{C}",
      },
      {
        heading: "Ohm's law and resistivity",
        level: "standard",
        body:
          "For a metallic conductor at constant temperature, current is proportional to potential difference: V = IR. Resistance depends on the material and geometry, R = ρL/A. As temperature rises, metal resistance rises (more lattice scattering) while semiconductor resistance falls (more carriers freed).",
        math: "V = IR, \\qquad R = \\frac{\\rho L}{A}",
      },
      {
        heading: "Kirchhoff's rules and circuit solving",
        level: "pro",
        body:
          "The junction rule encodes charge conservation: currents entering equal currents leaving. The loop rule encodes energy conservation: around any closed loop the algebraic sum of potential changes is zero. Together they solve any network, however tangled, without needing equivalent-resistance cleverness.",
        math: "\\sum I_{in} = \\sum I_{out}, \\qquad \\sum \\Delta V_{loop} = 0",
      },
      {
        heading: "Electrical power and heating",
        level: "pro",
        body:
          "Power dissipated in a resistor is P = VI = I²R = V²/R. Which form to use depends on what is fixed: a series chain shares current so I²R is convenient, while a parallel bank shares voltage so V²/R is faster. The largest resistance in series dissipates most; in parallel the smallest resistance dissipates most.",
        math: "P = I^2R = \\frac{V^2}{R} = VI",
      },
    ],
    formulas: [
      {
        name: "Coulomb's law",
        latex: "F = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1q_2}{r^2}",
        symbols: [
          { sym: "q₁, q₂", meaning: "point charges", unit: "C" },
          { sym: "r", meaning: "separation", unit: "m" },
          { sym: "1/4πε₀", meaning: "electrostatic constant ≈ 9 × 10⁹", unit: "N·m²/C²" },
        ],
        when: "Point charges in vacuum (divide by K in a medium).",
      },
      {
        name: "Electric field of a point charge",
        latex: "E = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{r^2}",
        symbols: [{ sym: "E", meaning: "field strength", unit: "N/C or V/m" }],
        when: "Point charge or outside a uniformly charged sphere.",
      },
      {
        name: "Potential of a point charge",
        latex: "V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{r}",
        symbols: [{ sym: "V", meaning: "electric potential", unit: "V" }],
        when: "Zero reference at infinity; scalar, so potentials simply add.",
      },
      {
        name: "Parallel-plate capacitance",
        latex: "C = \\frac{\\varepsilon_0 K A}{d}",
        symbols: [
          { sym: "A", meaning: "plate area", unit: "m²" },
          { sym: "d", meaning: "plate separation", unit: "m" },
          { sym: "K", meaning: "dielectric constant (1 for air)" },
        ],
        when: "d small compared with the plate dimensions (uniform field).",
      },
      {
        name: "Energy stored in a capacitor",
        latex: "U = \\tfrac{1}{2}CV^2 = \\tfrac{1}{2}QV = \\frac{Q^2}{2C}",
        symbols: [{ sym: "U", meaning: "stored energy", unit: "J" }],
        when: "Any capacitor; choose the form matching the fixed quantity.",
      },
      {
        name: "Resistance and resistivity",
        latex: "R = \\frac{\\rho L}{A}",
        symbols: [
          { sym: "ρ", meaning: "resistivity of the material", unit: "Ω·m" },
          { sym: "L", meaning: "length", unit: "m" },
          { sym: "A", meaning: "cross-sectional area", unit: "m²" },
        ],
        when: "Uniform conductor. Stretching a wire changes both L and A together.",
      },
      {
        name: "Electric power",
        latex: "P = I^2R = \\frac{V^2}{R} = VI",
        symbols: [{ sym: "P", meaning: "power dissipated", unit: "W" }],
        when: "Ohmic resistor. Pick the form using the fixed quantity.",
      },
      {
        name: "Capacitors in series and parallel",
        latex: "\\frac{1}{C_s} = \\sum \\frac{1}{C_i}, \\qquad C_p = \\sum C_i",
        symbols: [{ sym: "C_s, C_p", meaning: "equivalent capacitances", unit: "F" }],
        when: "Ideal capacitors — the formulas are reversed compared with resistors.",
      },
    ],
    specialCases: [
      {
        title: "Midpoint between two equal charges",
        condition: "Equal like charges at ±a",
        result: "E = 0, \\qquad V = \\frac{2kq}{a}",
        why: "The two fields cancel by symmetry, but potential is a scalar and adds — a favourite conceptual trap.",
        askedIn: "MCQs contrasting field and potential.",
      },
      {
        title: "Dipole on the axial line",
        condition: "r much greater than dipole length",
        result: "E_{axial} = \\frac{2kp}{r^3}",
        why: "The fields of the two charges almost cancel, leaving a 1/r³ falloff instead of 1/r².",
      },
      {
        title: "Capacitor with battery still connected vs disconnected",
        condition: "Battery connected → V fixed; disconnected → Q fixed",
        result: "V\\text{ fixed: } C \\uparrow, \\ Q \\uparrow, \\ U \\uparrow \\quad;\\quad Q\\text{ fixed: } C \\uparrow, \\ V \\downarrow, \\ U \\downarrow",
        why: "Inserting a dielectric always raises C, but whether the extra energy comes from the battery or is taken from the field depends on the connection.",
        askedIn: "Dielectric-insertion reasoning questions.",
      },
      {
        title: "Series chain power comparison",
        condition: "Two resistors in series",
        result: "P \\propto R \\quad (\\text{larger R dissipates more})",
        why: "Series shares the same current, so I²R favours the bigger resistance — the reverse of parallel.",
      },
      {
        title: "Wire stretched to double length",
        condition: "Volume constant, L → 2L",
        result: "A \\to A/2, \\qquad R \\to 4R",
        why: "Doubling length doubles R and halving area doubles it again, so R scales as L² at constant volume.",
        askedIn: "Resistance-change numericals.",
      },
    ],
    tricks: [
      {
        title: "Use k = 9 × 10⁹ and cancel powers",
        how:
          "Write charges as multiples of 10⁻⁶ C and distances in cm; the powers of ten often cancel completely.",
        example: "$q_1 = q_2 = 1\\,\\mu$C at 10 cm: $F = 9\\times10^9 \\times 10^{-12}/10^{-2} = 0.9$ N.",
        saves: "~35 s",
      },
      {
        title: "Field zero points by distance ratio",
        how:
          "Between like charges (or outside unlike charges) the null point splits distances in the ratio √q₁ : √q₂.",
        example: "4 μC and 1 μC, 30 cm apart: null point at 20 cm from the 4 μC.",
        saves: "~30 s",
      },
      {
        title: "Series–parallel mirror rule",
        how:
          "Resistors add in series; capacitors add in parallel. Whenever you feel lost, ask 'is the shared quantity current or charge?'",
        example: "Two 4 μF capacitors in series give 2 μF, not 8 μF.",
      },
      {
        title: "Power form by fixed quantity",
        how:
          "Series → same I → use I²R. Parallel → same V → use V²/R. Then simply compare the R values.",
        example: "Parallel 2 Ω and 6 Ω on 12 V: $P = 144/2 + 144/6 = 96$ W.",
        saves: "~25 s",
      },
      {
        title: "Kirchhoff in two loops",
        how:
          "Assign loop currents rather than branch currents — one unknown per loop, and the junction rule is automatic.",
        example: "Two-mesh circuit: solve the 2×2 current matrix instead of four branch unknowns.",
        saves: "~60 s",
      },
    ],
    mistakes: [
      {
        wrong: "Cancelling field but also assuming potential is zero at the midpoint.",
        right: "Fields cancel as vectors; potentials add as scalars and are generally not zero.",
        why: "Mixing up vector cancellation with scalar addition.",
      },
      {
        wrong: "Using the point-charge formula inside a charged sphere.",
        right: "Inside a uniformly charged sphere E = 0 (shell) or ∝ r (solid), not kQ/r².",
        why: "The inverse-square law only holds outside the charge distribution.",
      },
      {
        wrong: "Adding capacitances in series the way resistors add.",
        right: "Series capacitors: 1/C = 1/C₁ + 1/C₂. Parallel capacitors add directly.",
        why: "Series capacitors hold equal charge, so voltage splits inversely with C.",
      },
      {
        wrong: "Assuming resistance always rises with temperature.",
        right: "Metals rise, semiconductors fall, and some alloys (manganin) barely change.",
        why: "Two competing effects — lattice scattering versus carrier concentration.",
      },
      {
        wrong: "Ignoring internal resistance when asked for terminal voltage.",
        right: "V_terminal = ε − Ir; only the open-circuit emf equals ε.",
        why: "Real cells lose voltage under load, which changes the whole loop equation.",
      },
    ],
  },

  /* ══════════ 5 · OPTICS ══════════ */
  {
    id: "optics",
    title: "Ray & Wave Optics",
    classLevel: "both",
    blurb:
      "Mirror and lens formulas, magnification, refraction, prism, dispersion, interference, diffraction and polarization.",
    theory: [
      {
        heading: "Reflection and spherical mirrors",
        level: "basic",
        body:
          "The angle of incidence equals the angle of reflection, measured from the normal. For spherical mirrors the mirror formula links object distance, image distance and focal length, with f = R/2. Sign convention decides everything: distances measured against the incident light are negative in the Cartesian convention.",
        math: "\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}, \\qquad f = \\frac{R}{2}",
      },
      {
        heading: "Refraction, refractive index and total internal reflection",
        level: "standard",
        body:
          "Light bends towards the normal entering a denser medium because its speed drops: n = c/v. Snell's law keeps n sin θ constant across an interface. When light tries to leave a dense medium beyond the critical angle, sin C = 1/n, it reflects entirely — the principle behind optical fibres, prisms in periscopes and the sparkle of diamonds.",
        math: "n_1\\sin i = n_2\\sin r, \\qquad \\sin C = \\frac{1}{n}",
      },
      {
        heading: "Lenses and the lens maker's formula",
        level: "standard",
        body:
          "A thin lens forms an image whose position follows the same 1/v − 1/u = 1/f pattern with its own sign rules. The lens maker's formula connects the focal length to the material and curvature: a larger refractive index or more sharply curved surfaces shortens the focal length. Power in dioptres is the reciprocal of f in metres.",
        math: "\\frac{1}{f} = (n-1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right), \\qquad P = \\frac{1}{f}",
      },
      {
        heading: "Prism, dispersion and spectra",
        level: "pro",
        body:
          "A prism deviates light by A(n−1) in the thin-prism limit; at minimum deviation the ray passes symmetrically and n = sin((A + δ_m)/2) / sin(A/2). Because n depends on wavelength, violet bends most and red least — that spread is dispersion, producing a spectrum.",
        math: "n = \\frac{\\sin\\left(\\frac{A+\\delta_m}{2}\\right)}{\\sin\\left(\\frac{A}{2}\\right)}, \\qquad \\delta \\approx A(n-1)",
      },
      {
        heading: "Wave optics: interference and the double slit",
        level: "pro",
        body:
          "Interference needs coherent sources. Path difference decides the outcome: a whole number of wavelengths gives bright fringes, a half-integer gives dark ones. In Young's experiment the fringe width is β = λD/d, so larger wavelength, larger screen distance or smaller slit separation spreads the pattern out. In a thin film, reflected light gets an extra λ/2 from the denser medium, which flips the bright/dark conditions.",
        math: "\\beta = \\frac{\\lambda D}{d}, \\qquad \\text{path diff} = n\\lambda \\ (\\text{bright})",
      },
      {
        heading: "Diffraction, resolving power and polarization",
        level: "pro",
        body:
          "Diffraction is bending around obstacles; through a single slit of width a, minima occur at a sin θ = nλ. Diffraction sets the ultimate limit of resolution: a telescope needs a large aperture to resolve close objects. Polarization proves light is transverse; reflected light is partially polarized, and at Brewster's angle the reflected ray is fully polarized with tan θ_p = n.",
        math: "a\\sin\\theta = n\\lambda, \\qquad \\tan\\theta_p = n",
      },
    ],
    formulas: [
      {
        name: "Mirror formula",
        latex: "\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}",
        symbols: [
          { sym: "u", meaning: "object distance (negative for real object)", unit: "m" },
          { sym: "v", meaning: "image distance", unit: "m" },
          { sym: "f", meaning: "focal length (negative for concave in Cartesian sign convention)", unit: "m" },
        ],
        when: "Paraxial rays only; sign convention must be fixed first.",
      },
      {
        name: "Magnification (mirror and lens)",
        latex: "m = -\\frac{v}{u} \\ (\\text{mirror}), \\qquad m = \\frac{v}{u} \\ (\\text{lens})",
        symbols: [{ sym: "m", meaning: "linear magnification; negative = inverted" }],
        when: "Thin mirror or lens, paraxial approximation.",
      },
      {
        name: "Snell's law",
        latex: "n_1\\sin i = n_2\\sin r",
        symbols: [
          { sym: "i", meaning: "angle of incidence from the normal", unit: "°" },
          { sym: "r", meaning: "angle of refraction", unit: "°" },
        ],
        when: "Interface between two transparent media; all angles from the normal.",
      },
      {
        name: "Critical angle",
        latex: "\\sin C = \\frac{n_2}{n_1}",
        symbols: [{ sym: "C", meaning: "critical angle for total internal reflection", unit: "°" }],
        when: "Light travelling from denser to rarer medium; total internal reflection for i > C.",
      },
      {
        name: "Lens maker's formula",
        latex: "\\frac{1}{f} = (n-1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)",
        symbols: [
          { sym: "n", meaning: "refractive index of the lens material" },
          { sym: "R₁, R₂", meaning: "radii of curvature of the two surfaces", unit: "m" },
        ],
        when: "Thin lens in air; for immersion divide (n − 1) by the medium's index ratio.",
      },
      {
        name: "Prism — minimum deviation",
        latex: "n = \\frac{\\sin\\left(\\frac{A+\\delta_m}{2}\\right)}{\\sin\\left(\\frac{A}{2}\\right)}",
        symbols: [
          { sym: "A", meaning: "angle of the prism", unit: "°" },
          { sym: "δ_m", meaning: "angle of minimum deviation", unit: "°" },
        ],
        when: "Symmetric passage (i = e); the standard laboratory measurement of n.",
      },
      {
        name: "Young's double-slit fringe width",
        latex: "\\beta = \\frac{\\lambda D}{d}",
        symbols: [
          { sym: "λ", meaning: "wavelength", unit: "m" },
          { sym: "D", meaning: "screen distance", unit: "m" },
          { sym: "d", meaning: "slit separation", unit: "m" },
        ],
        when: "Small angles; fringes equally spaced.",
        hook: "Wider λ or D spreads fringes; wider d squeezes them.",
      },
      {
        name: "Single-slit diffraction minima",
        latex: "a\\sin\\theta = n\\lambda",
        symbols: [
          { sym: "a", meaning: "slit width", unit: "m" },
          { sym: "n", meaning: "order (1, 2, …)" },
        ],
        when: "Fraunhofer diffraction; n = 0 gives the central maximum.",
      },
      {
        name: "Brewster's law",
        latex: "\\tan\\theta_p = n",
        symbols: [{ sym: "θ_p", meaning: "polarizing angle", unit: "°" }],
        when: "Reflection at a dielectric; the reflected ray is fully plane-polarized.",
      },
    ],
    specialCases: [
      {
        title: "Object at the focus of a converging lens",
        condition: "u = f",
        result: "v \\to \\infty, \\qquad m \\to \\infty",
        why: "Emergent rays are parallel — the projector/spotlight arrangement.",
        askedIn: "Conceptual MCQ on image at infinity.",
      },
      {
        title: "Object at 2f",
        condition: "u = 2f",
        result: "v = 2f, \\qquad m = -1",
        why: "Image is real, inverted and the same size — the symmetric case.",
      },
      {
        title: "Grazing incidence through a prism",
        condition: "i = 90°",
        result: "\\text{Deviation is maximum}; \\ e = A",
        why: "The ray just enters and travels along the second surface, giving the maximum-deviation condition.",
      },
      {
        title: "Lens immersed in a liquid of the same index",
        condition: "n_lens = n_liquid",
        result: "f \\to \\infty, \\qquad P = 0",
        why: "(n − 1) becomes zero, so no refraction occurs at either surface and the lens behaves as a plain glass plate.",
      },
      {
        title: "Central maximum in single-slit diffraction",
        condition: "n = 0",
        result: "\\theta = 0, \\ \\text{width } \\propto \\frac{1}{a}",
        why: "Narrowing the slit widens the central bright band — the uncertainty-principle echo.",
      },
      {
        title: "Fringe pattern underwater",
        condition: "λ decreases by factor n",
        result: "\\beta' = \\frac{\\beta}{n}",
        why: "Both wavelength and speed drop by n while frequency stays fixed, so fringes crowd together.",
      },
    ],
    tricks: [
      {
        title: "One sign table for everything",
        how:
          "Cartesian convention: distances in the incident-light direction are negative for mirrors, and for lenses distances measured against the light are negative. Fix it once and never re-derive.",
        example: "Concave mirror, object at 30 cm, f = 10 cm: $1/v = 1/10 - 1/30 \\Rightarrow v = 15$ cm (real, inverted).",
        saves: "~40 s",
      },
      {
        title: "Powers add for thin lenses in contact",
        how:
          "P_total = P₁ + P₂. Combine lenses by adding powers, not focal lengths.",
        example: "+5 D and −2 D give +3 D, so f = 33 cm.",
        saves: "~25 s",
      },
      {
        title: "Critical angle from index quickly",
        how:
          "sin C = 1/n. Memorise n = 1.5 → C ≈ 42°, n = √2 → 45°, n = 2 → 30°.",
        example: "Water n = 4/3 → C ≈ 49°.",
        saves: "~20 s",
      },
      {
        title: "Fringe shift tells film thickness",
        how:
          "If n fringes cross the field when a film of index μ is placed, thickness t = nλ/(μ − 1).",
        example: "One fringe shift with μ = 1.5, λ = 600 nm gives t = 1.2 μm.",
      },
      {
        title: "Dispersion shortcut for deviation",
        how:
          "Angular dispersion = δ_violet − δ_red ≈ A(n_v − n_r); dispersive power ω = (n_v − n_r)/(n_y − 1).",
        example: "Thin prism with A = 5°, n_v − n_r = 0.02 gives 0.1° spread.",
      },
    ],
    mistakes: [
      {
        wrong: "Measuring angles from the surface instead of the normal.",
        right: "All optical angles are from the normal, never from the interface.",
        why: "Gives a completely wrong refraction angle and a cascade of errors.",
      },
      {
        wrong: "Assuming real images are always inverted and virtual always upright without checking signs.",
        right: "Apply the formula; the sign of v and m decides real/virtual and inverted/upright.",
        why: "Edge cases like diverging lenses invert the remembered rule.",
      },
      {
        wrong: "Thinking frequency changes during refraction.",
        right: "Frequency is set by the source and stays constant; speed and wavelength change by n.",
        why: "Colour is frequency, so a beam does not change colour on entering glass.",
      },
      {
        wrong: "Treating interference and diffraction as the same effect.",
        right: "Interference is superposition of separate wavefronts; diffraction is bending at an aperture. Every real pattern combines both.",
        why: "Examiners ask for the distinguishing statement.",
      },
      {
        wrong: "Mixing up bright and dark conditions for thin-film reflection.",
        right: "Include the λ/2 phase reversal from the denser medium before applying the path-difference rule.",
        why: "Missing the half-wave shift flips the entire pattern.",
      },
    ],
  },

  /* ══════════ 6 · MODERN PHYSICS ══════════ */
  {
    id: "modern-physics",
    title: "Modern Physics",
    classLevel: "class-12",
    blurb:
      "Photoelectric effect, photons and de Broglie waves, Bohr model, X-rays, radioactivity and nuclear energy.",
    theory: [
      {
        heading: "Photons and the photoelectric effect",
        level: "basic",
        body:
          "Light delivers energy in discrete packets of hf. A metal emits electrons only if the photon energy exceeds its work function; the surplus becomes kinetic energy. Intensity controls how many electrons are emitted, frequency controls their maximum energy, and below the threshold frequency no emission occurs no matter how intense the light.",
        math: "hf = \\phi + KE_{max}, \\qquad \\phi = hf_0",
      },
      {
        heading: "Einstein's equation and stopping potential",
        level: "standard",
        body:
          "A retarding voltage can stop even the fastest photoelectrons: eV₀ = KE_max. Plotting stopping potential against frequency gives a straight line whose slope is h/e and whose intercept on the frequency axis is the threshold — the classic experimental proof of photons.",
        math: "eV_0 = hf - \\phi",
      },
      {
        heading: "de Broglie waves and matter waves",
        level: "pro",
        body:
          "Every moving particle has an associated wavelength λ = h/p. It is unobservably tiny for everyday objects but comparable to atomic spacings for electrons, which is why electron diffraction works and why electron microscopes beat optical ones.",
        math: "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mKE}}",
      },
      {
        heading: "Bohr model and spectral lines",
        level: "pro",
        body:
          "Bohr quantised angular momentum, allowing only discrete orbits with radius ∝ n² and energy ∝ −1/n². Electron jumps between levels emit or absorb photons of exactly the energy difference. For hydrogen, the Lyman series lies in the ultraviolet, Balmer in the visible and Paschen in the infrared.",
        math: "E_n = -\\frac{13.6}{n^2}\\ \\text{eV}, \\qquad \\frac{1}{\\lambda} = R\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)",
      },
      {
        heading: "X-rays, Moseley's law and Bragg diffraction",
        level: "pro",
        body:
          "Fast electrons striking a target produce a continuous bremsstrahlung spectrum with a sharp minimum wavelength set by the accelerating voltage, plus characteristic lines that depend on the target element (Moseley's law, √f ∝ Z − b). Crystal lattices act as three-dimensional gratings, giving Bragg's condition 2d sin θ = nλ.",
        math: "\\lambda_{min} = \\frac{hc}{eV}, \\qquad 2d\\sin\\theta = n\\lambda",
      },
      {
        heading: "Radioactivity, decay law and nuclear energy",
        level: "pro",
        body:
          "Unstable nuclei decay randomly, so the number remaining falls exponentially with a half-life; after n half-lives the fraction is (1/2)ⁿ. Alpha decay reduces A by 4 and Z by 2, beta-minus raises Z by 1 with A unchanged, and gamma emission changes neither. The mass lost in a reaction appears as energy via E = Δmc², which is why fission and fusion release so much.",
        math: "N = N_0e^{-\\lambda t}, \\qquad t_{1/2} = \\frac{0.693}{\\lambda}, \\qquad E = \\Delta mc^2",
      },
    ],
    formulas: [
      {
        name: "Photon energy",
        latex: "E = hf = \\frac{hc}{\\lambda}",
        symbols: [
          { sym: "h", meaning: "Planck's constant, 6.63 × 10⁻³⁴", unit: "J·s" },
          { sym: "f", meaning: "frequency", unit: "Hz" },
          { sym: "λ", meaning: "wavelength", unit: "m" },
        ],
        when: "Any electromagnetic radiation; E in joules unless eV is used (1 eV = 1.6 × 10⁻¹⁹ J).",
        hook: "Shorter wavelength = more energetic photon.",
      },
      {
        name: "Einstein's photoelectric equation",
        latex: "KE_{max} = hf - \\phi",
        symbols: [
          { sym: "φ", meaning: "work function of the metal", unit: "J or eV" },
          { sym: "KE_max", meaning: "maximum kinetic energy of emitted electrons", unit: "J or eV" },
        ],
        when: "hf ≥ φ; below threshold no emission at all.",
      },
      {
        name: "Stopping potential",
        latex: "eV_0 = KE_{max}",
        symbols: [
          { sym: "V₀", meaning: "stopping potential (negative anode)", unit: "V" },
          { sym: "e", meaning: "electronic charge", unit: "C" },
        ],
        when: "Measurement setup for KE_max; independent of light intensity.",
      },
      {
        name: "de Broglie wavelength",
        latex: "\\lambda = \\frac{h}{mv} = \\frac{h}{\\sqrt{2meV}}",
        symbols: [
          { sym: "m", meaning: "particle mass", unit: "kg" },
          { sym: "v", meaning: "speed", unit: "m/s" },
          { sym: "V", meaning: "accelerating potential (for electrons)", unit: "V" },
        ],
        when: "Non-relativistic speeds for the second form.",
      },
      {
        name: "Bohr radius and energy levels",
        latex: "r_n = n^2 r_0, \\qquad E_n = -\\frac{13.6}{n^2}\\ \\text{eV}",
        symbols: [
          { sym: "r₀", meaning: "Bohr radius, 0.53 Å", unit: "m" },
          { sym: "n", meaning: "principal quantum number" },
        ],
        when: "Hydrogen-like single-electron atoms (divide energy by Z² scaling for other Z).",
      },
      {
        name: "Rydberg formula for spectral lines",
        latex: "\\frac{1}{\\lambda} = R\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)",
        symbols: [
          { sym: "R", meaning: "Rydberg constant, 1.097 × 10⁷", unit: "m⁻¹" },
          { sym: "n₁, n₂", meaning: "lower and upper levels (n₂ > n₁)" },
        ],
        when: "Hydrogen spectrum; series named by n₁ (Lyman 1, Balmer 2, Paschen 3).",
      },
      {
        name: "Minimum X-ray wavelength",
        latex: "\\lambda_{min} = \\frac{hc}{eV}",
        symbols: [{ sym: "V", meaning: "accelerating voltage", unit: "V" }],
        when: "Continuous spectrum cut-off; independent of the target material.",
      },
      {
        name: "Radioactive decay law",
        latex: "N = N_0 e^{-\\lambda t}, \\qquad t_{1/2} = \\frac{\\ln 2}{\\lambda}",
        symbols: [
          { sym: "λ", meaning: "decay constant", unit: "s⁻¹" },
          { sym: "t₁/₂", meaning: "half-life", unit: "s" },
        ],
        when: "Statistical law for large numbers; applies to all decay modes.",
        hook: "After n half-lives, 1/2ⁿ remains — no calculator needed.",
      },
      {
        name: "Mass–energy equivalence",
        latex: "E = \\Delta m c^2",
        symbols: [
          { sym: "Δm", meaning: "mass defect", unit: "kg" },
          { sym: "c", meaning: "speed of light, 3 × 10⁸", unit: "m/s" },
        ],
        when: "Nuclear reactions; 1 u ≡ 931.5 MeV.",
      },
    ],
    specialCases: [
      {
        title: "Light at exactly the threshold frequency",
        condition: "f = f₀",
        result: "KE_{max} = 0",
        why: "All the photon energy pays the work function; electrons are released with zero speed, marking the boundary of the effect.",
      },
      {
        title: "Doubling intensity only",
        condition: "f fixed, I → 2I",
        result: "\\text{Number of electrons} \\uparrow, \\ KE_{max}\\text{ unchanged}",
        why: "Each photon ejects at most one electron, so more photons mean more electrons but each carries the same energy.",
        askedIn: "Most-asked conceptual MCQ on the photoelectric effect.",
      },
      {
        title: "Electron transition to n = 1",
        condition: "Lyman series",
        result: "\\lambda_{min} = 912\\ \\text{Å (UV)}",
        why: "The largest gap in hydrogen lies between n = 1 and infinity, giving the shortest wavelength of the series.",
      },
      {
        title: "Ionization of hydrogen from the ground state",
        condition: "n = 1 → free electron",
        result: "13.6\\ \\text{eV}",
        why: "The ground-state energy is −13.6 eV, so that much energy must be supplied to reach zero.",
      },
      {
        title: "After three half-lives",
        condition: "t = 3t₁/₂",
        result: "\\frac{N}{N_0} = \\frac{1}{8} = 12.5\\%",
        why: "Each half-life halves what remains; the fraction follows 1/2ⁿ with no need for the decay constant.",
        askedIn: "Quick radioactivity numericals.",
      },
      {
        title: "Alpha decay effect on the periodic table",
        condition: "Z → Z − 2, A → A − 4",
        result: "\\text{Element moves two places down}",
        why: "Losing two protons shifts the element and losing four nucleons lightens the nucleus.",
      },
    ],
    tricks: [
      {
        title: "Work in eV, not joules",
        how:
          "Keep photon energies in eV: E(eV) = 12400 / λ(Å). Then threshold comparisons are instant.",
        example: "λ = 6200 Å → E = 2 eV, so it ejects electrons from caesium (φ ≈ 1.9 eV).",
        saves: "~50 s",
      },
      {
        title: "Slope and intercept of the photoelectric graph",
        how:
          "On a V₀–f plot the slope is h/e and the intercept is −φ/e. Read h from the slope without any table.",
        example: "Slope 4.1 × 10⁻¹⁵ V·s → h/e → h ≈ 6.6 × 10⁻³⁴ J·s.",
      },
      {
        title: "Energy-level difference in one step",
        how:
          "ΔE(eV) = 13.6(1/n₁² − 1/n₂²); convert to wavelength with 12400/ΔE Å.",
        example: "n = 2 → 1 gives 10.2 eV → λ ≈ 1216 Å (Lyman-α).",
        saves: "~40 s",
      },
      {
        title: "Half-life arithmetic, no e",
        how:
          "Fraction remaining = (1/2)^(t/t½). Multiply half-lives by halving.",
        example: "t = 20 h, t½ = 5 h → four half-lives → 6.25% remains.",
        saves: "~30 s",
      },
      {
        title: "de Broglie ratio for accelerated particles",
        how:
          "λ ∝ 1/√(mV) for the same charge; compare two particles by the square root of the mass–voltage product.",
        example: "An electron accelerated four times more has half the wavelength.",
        saves: "~25 s",
      },
    ],
    mistakes: [
      {
        wrong: "Expecting brighter light to give faster photoelectrons.",
        right: "Intensity changes the number of electrons; only frequency changes their maximum kinetic energy.",
        why: "The one-photon-one-electron picture forbids the classical expectation.",
      },
      {
        wrong: "Using E = hf with f in Å or nm.",
        right: "Convert wavelength to metres first, or use E(eV) = 12400/λ(Å).",
        why: "Unit slips cost whole marks in numericals.",
      },
      {
        wrong: "Thinking the electron orbits the nucleus exactly like a planet.",
        right: "Bohr orbits are quantised stationary states with no radiation; angular momentum comes in units of h/2π.",
        why: "A plain planetary picture cannot explain discrete spectra or the stability of the atom.",
      },
      {
        wrong: "Saying gamma decay changes the element.",
        right: "Gamma emission only lowers the nucleus's energy; Z and A are unchanged.",
        why: "Confusing energy release with particle loss.",
      },
      {
        wrong: "Ignoring the mass of the emitted particle in beta decay accounting.",
        right: "Beta-minus: a neutron becomes a proton, so Z rises by 1 while A is unchanged.",
        why: "The mass number counts nucleons, and the electron is not a nucleon.",
      },
    ],
  },
];
