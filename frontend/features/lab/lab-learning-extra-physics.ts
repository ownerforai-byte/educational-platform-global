/**
 * Learning packs for the labs that had none — the 73 registry entries that
 * previously fell through to "Under progress — will be added in a future
 * update".
 *
 * Same shape as `lab-learning.ts` (`LabLearningPack`), so `getLabLearning`
 * can look here as a second source without any component change.
 *
 * Every pack is authored from the NEB Class 11/12 syllabus for its own lab —
 * no generic filler. Each one carries:
 *   • a NON-GENERAL proof — a concrete case with real numbers, worked step by
 *     step, so the learner sees the law verified rather than restated;
 *   • theory blocks — the conceptual backbone of the topic;
 *   • confusions — the exact wrong beliefs with the reason they feel true;
 *   • practice questions — with answers and hints.
 */

import type { LabLearningPack } from "./lab-learning";

export const EXTRA_LEARNING: Record<string, LabLearningPack> = {
  /* ══════════════════════════════════════════════════════════════════════
   * PHYSICS — 3D labs
   * ══════════════════════════════════════════════════════════════════════ */

  "ph-3d-pendulum": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Simple pendulum, L = 1.0 m, g = 9.8 m/s², released from θ₀ = 10°",
      steps: [
        { text: "Small-angle period from T = 2π√(L/g):", math: "T = 2π·√(1.0/9.8) = 2π·0.3194 = 2.007 s" },
        { text: "Frequency is the reciprocal:", math: "f = 1/T = 0.498 Hz" },
        { text: "Restoring force at the release angle (tangential component of weight):", math: "F = mg·sinθ = 0.1·9.8·sin10° = 0.170 N (m = 100 g)" },
        { text: "Small-angle check: sin10° = 0.1736 vs θ in radians = 0.1745 — a 0.5% error, so the SHM approximation holds:", math: "sinθ ≈ θ → error 0.5% ✓" },
        { text: "Energy at the lowest point — all of mgh becomes ½mv²:", math: "h = L(1−cos10°) = 1.0·(1−0.9848) = 0.0152 m → v = √(2·9.8·0.0152) = 0.546 m/s" },
        { text: "Amplitude doubles to 20°: the small-angle error grows to 1.9% (sin20° = 0.342 vs 0.349 rad), so T is no longer isochronous.", math: "T(20°) ≈ 2.007·(1 + 20²/576·(π/180)²·...) ≈ 2.03 s" },
      ],
      takeaway: "T = 2π√(L/g) is independent of mass and (for small θ) of amplitude — a 1 m pendulum ticks every 2.007 s whether it carries a 100 g or a 1 kg bob.",
    },
    theory: [
      {
        heading: "Simple pendulum as a linear oscillator",
        body: "For a bob on a massless string, the tangential restoring force is −mg·sinθ. For small θ, sinθ ≈ θ, so the equation of motion becomes θ'' + (g/L)θ = 0 — simple harmonic motion with ω = √(g/L). That is why the period T = 2π√(L/g) depends only on length and gravity: mass cancels, and (in the small-angle regime) amplitude cancels too.",
      },
      {
        heading: "Where the approximation breaks",
        body: "The exact period is T = 4√(L/g)·K(sin(θ₀/2)), an elliptic integral that grows with amplitude. At 10° the correction is 0.2%; at 30° it is 1.7%; at 90° it is 18%. A real pendulum clock is therefore built for small swings — and a 'seconds pendulum' (T = 2 s) is 0.994 m long.",
      },
    ],
    confusions: [
      {
        wrong: "A heavier bob swings faster.",
        right: "Period is independent of mass — g is the same for every mass, and inertia scales with it exactly.",
        why: "'Heavier = more pull' is true for the force, but the same mass appears in F = ma, so the acceleration is unchanged.",
      },
      {
        wrong: "A pendulum released from a higher point takes longer to come back.",
        right: "For small angles the period is the same; only the speed at the bottom changes (v = √(2gh)).",
        why: "Students conflate 'travels further' with 'takes longer', ignoring that it also moves faster.",
      },
      {
        wrong: "The string tension provides the restoring force.",
        right: "Tension is radial — it is cancelled by the radial component of weight. The restoring force is the TANGENTIAL component of gravity, mg·sinθ.",
        why: "'The string pulls it back' feels right because the string is what visibly changes direction.",
      },
    ],
    questions: [
      { q: "A pendulum has T = 2.0 s on Earth. What is its period on the Moon (g = 1.6 m/s²)?", a: "T ∝ 1/√g → T_moon = 2.0·√(9.8/1.6) = 2.0·2.47 = 4.95 s.", hint: "T = 2π√(L/g); L is unchanged." },
      { q: "To halve the period, what must happen to the length?", a: "T ∝ √L → L must become L/4 (0.25 m if it started at 1 m).", hint: "Square the ratio: (1/2)² = 1/4." },
      { q: "At what length does a pendulum have T = 1 s (a 'half-second' pendulum)?", a: "L = g·(T/2π)² = 9.8·(1/6.283)² = 9.8·0.02533 = 0.248 m.", hint: "Rearrange T = 2π√(L/g) for L." },
    ],
  },

  "ph-3d-em": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Plane electromagnetic wave in vacuum: E₀ = 600 V/m, f = 100 MHz",
      steps: [
        { text: "Wave speed is c — always, in vacuum:", math: "c = 3.00×10⁸ m/s" },
        { text: "Wavelength from c = fλ:", math: "λ = c/f = 3×10⁸ / 1×10⁸ = 3.0 m" },
        { text: "Magnetic-field amplitude — E and B are locked by E = cB:", math: "B₀ = E₀/c = 600 / 3×10⁸ = 2.0×10⁻⁶ T" },
        { text: "Intensity (time-averaged Poynting magnitude):", math: "I = ½·c·ε₀·E₀² = ½·3×10⁸·8.85×10⁻¹²·600² = 478 W/m²" },
        { text: "Cross-check with the magnetic form — I = ½·(c/µ₀)·B₀²:", math: "½·(3×10⁸/4π×10⁻⁷)·(2×10⁻⁶)² = 478 W/m² ✓" },
        { text: "Momentum delivered to a perfectly absorbing surface per second:", math: "p = I/c = 478/3×10⁸ = 1.59×10⁻⁶ Pa (radiation pressure)" },
      ],
      takeaway: "E and B are not two fields that happen to coexist — they are one wave: E₀ = cB₀, they oscillate in phase, and both are perpendicular to the direction of travel and to each other.",
    },
    theory: [
      {
        heading: "The structure of an EM wave",
        body: "A plane EM wave has E and B oscillating in phase, mutually perpendicular, and both perpendicular to the propagation direction k. In vacuum, E = cB at every instant, the wave travels at c = 1/√(µ₀ε₀), and the fields carry energy with the Poynting vector S = (1/µ₀)E×B. Because E and B are 90° out of phase in space (not time), a charge at a fixed point feels the electric force peak and the magnetic force peak at the same moment.",
      },
      {
        heading: "Energy, intensity and radiation pressure",
        body: "Energy density is u = ½ε₀E² + B²/2µ₀; for an EM wave the electric and magnetic halves are equal, so u = ε₀E². Intensity is I = ⟨u⟩c. When light is absorbed, it delivers momentum p = U/c — the basis of solar sails and laser cooling. Reflection doubles the momentum transfer.",
      },
    ],
    confusions: [
      {
        wrong: "The electric and magnetic fields are 90° out of phase in time.",
        right: "They are 90° apart in SPACE (E along x, B along y for propagation along z) but in phase in time — both peak together.",
        why: "The perpendicular arrows on a textbook diagram get mistaken for a time offset.",
      },
      {
        wrong: "EM waves need a medium, like sound.",
        right: "EM waves are self-propagating: the changing E induces B, the changing B induces E. No medium is required — that is why sunlight crosses vacuum.",
        why: "Every mechanical wave they have met (sound, water) needs matter to carry it.",
      },
      {
        wrong: "A brighter light means faster photons.",
        right: "Brightness is photon RATE (more photons per second); every photon still travels at c. Colour (frequency) sets the energy per photon.",
        why: "'More intense = more energetic' conflates quantity with per-particle energy.",
      },
    ],
    questions: [
      { q: "An EM wave has E₀ = 300 V/m. What is B₀?", a: "B₀ = E₀/c = 300/3×10⁸ = 1.0×10⁻⁶ T.", hint: "E = cB." },
      { q: "A radio station broadcasts at 90 MHz. What is its wavelength?", a: "λ = c/f = 3×10⁸/9×10⁷ = 3.33 m.", hint: "c = fλ." },
      { q: "What is the intensity of a wave with E₀ = 100 V/m?", a: "I = ½cε₀E₀² = ½·3×10⁸·8.85×10⁻¹²·10⁴ = 13.3 W/m².", hint: "Use I = ½cε₀E², or the B form." },
      { q: "A perfectly absorbing surface of 1 m² faces a 1000 W/m² beam. What force does it feel?", a: "p = I·A/c = 1000·1/3×10⁸ = 3.3×10⁻⁶ N.", hint: "Absorbed momentum per second = IA/c." },
    ],
  },

  "ph-3d-magnetic": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Long straight wire, I = 5 A; field at r = 0.02 m",
      steps: [
        { text: "Ampère's law for a long straight wire, B = µ₀I/(2πr):", math: "B = (4π×10⁻⁷ · 5)/(2π·0.02) = (2×10⁻⁷·5)/0.02 = 5.0×10⁻⁵ T" },
        { text: "Direction — right-hand rule: thumb along I (+z), fingers curl counterclockwise seen from +z:", math: "B circles the wire, no radial component ✓" },
        { text: "Force on a 0.10 m segment of a parallel wire 0.02 m away carrying I₂ = 3 A:", math: "F/L = µ₀I₁I₂/(2πr) = (4π×10⁻⁷·5·3)/(2π·0.02) = 1.5×10⁻⁴ N/m" },
        { text: "So a 0.10 m piece feels:", math: "F = 1.5×10⁻⁴ · 0.10 = 1.5×10⁻⁵ N (attractive, currents in the same direction)" },
        { text: "Check with the field at wire 2: B₁ = 5.0×10⁻⁵ T; F = B₁·I₂·L = 5×10⁻⁵·3·0.10 = 1.5×10⁻⁵ N ✓", math: "agrees with the Biot–Savart/Ampère result" },
      ],
      takeaway: "A straight wire's field falls off as 1/r and circles the wire — double the distance, half the field; double the current, double the field.",
    },
    theory: [
      {
        heading: "Field of a current distribution",
        body: "Biot–Savart sums the contribution of every current element: dB = (µ₀/4π)·I dl×r̂/r². For symmetric geometries Ampère's law is far faster: ∮B·dl = µ₀I_enclosed. A long straight wire gives B = µ₀I/2πr; a solenoid of n turns per metre gives B = µ₀nI inside; a toroid gives B = µ₀NI/2πr. Field lines form closed loops around the current — they have no beginning or end.",
      },
      {
        heading: "Forces between currents — and the ampere",
        body: "Two parallel wires attract when the currents flow the same way and repel when they oppose: F/L = µ₀I₁I₂/2πr. This is the operational definition of the ampere (the old SI definition used exactly this force). The force on a moving charge is F = qv×B — perpendicular to both, which is why magnetic forces do no work.",
      },
    ],
    confusions: [
      {
        wrong: "Magnetic field lines start at the north pole and end at the south pole.",
        right: "They form CLOSED loops — outside the magnet they run N→S, inside they run S→N. There is no beginning or end (no magnetic monopoles).",
        why: "Bar-magnet diagrams draw only the outside, which looks like two separate poles.",
      },
      {
        wrong: "Parallel currents repel.",
        right: "Same-direction parallel currents ATTRACT. (Anti-parallel repel.)",
        why: "'Like poles repel' from magnets gets transferred to currents incorrectly.",
      },
      {
        wrong: "A magnetic field can accelerate a charge to a higher speed.",
        right: "F = qv×B is always perpendicular to v, so it changes direction only — the SPEED and kinetic energy stay constant.",
        why: "'Force means speed-up' ignores the direction of the force relative to motion.",
      },
    ],
    questions: [
      { q: "What is B at 5 cm from a wire carrying 10 A?", a: "B = µ₀I/2πr = (2×10⁻⁷·10)/0.05 = 4.0×10⁻⁵ T.", hint: "B = µ₀I/(2πr)." },
      { q: "Two wires 2 cm apart carry 10 A each in the same direction. Force per metre?", a: "F/L = µ₀I₁I₂/(2πr) = (2×10⁻⁷·100)/0.02 = 1.0×10⁻³ N/m, attractive.", hint: "Same direction → attract." },
      { q: "An electron moves at 10⁶ m/s perpendicular to a 0.01 T field. Force?", a: "F = qvB = 1.6×10⁻¹⁹·10⁶·0.01 = 1.6×10⁻¹⁵ N.", hint: "F = qvB for v ⊥ B." },
      { q: "Inside a 1000-turn/m solenoid carrying 2 A, what is B?", a: "B = µ₀nI = 4π×10⁻⁷·1000·2 = 2.51×10⁻³ T.", hint: "Solenoid: B = µ₀nI." },
    ],
  },

  "ph-3d-wave-suite": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Two-slit interference: λ = 600 nm, d = 0.20 mm, screen L = 1.0 m",
      steps: [
        { text: "Fringe spacing (small-angle):", math: "Δy = λL/d = (600×10⁻⁹·1.0)/(0.20×10⁻³) = 3.0×10⁻³ m = 3.0 mm" },
        { text: "Path difference at the first bright fringe (m = 1):", math: "δ = mλ = 600 nm → the two paths differ by exactly one wavelength" },
        { text: "Angular position of the first maximum:", math: "sinθ = mλ/d = 600×10⁻⁹/0.2×10⁻³ = 3.0×10⁻³ → θ = 0.172°" },
        { text: "Dark fringe (destructive) condition:", math: "δ = (m + ½)λ → at m = 0, δ = 300 nm → y = 1.5 mm from centre" },
        { text: "Single-slit check: first minimum at a·sinθ = λ with a = 0.050 mm:", math: "sinθ = 600×10⁻⁹/5×10⁻⁵ = 0.012 → θ = 0.688°" },
        { text: "Combined pattern: double-slit fringes modulated by the single-slit envelope:", math: "the 3.0 mm fringes fade where the single-slit envelope has a zero" },
      ],
      takeaway: "Interference is geometry: bright fringes are where the path difference is a whole number of wavelengths, dark ones where it is a half-integer. Everything else is the same rule with d, L and a changed.",
    },
    theory: [
      {
        heading: "Two-slit interference",
        body: "Coherent light through two slits produces a path difference δ = d·sinθ. Constructive interference needs δ = mλ (bright), destructive needs δ = (m+½)λ (dark). On a screen at distance L ≫ d, the position is y = mλL/d, so fringe spacing Δy = λL/d. The pattern is symmetric and equally spaced (for small angles) — which is the experimental evidence that light is a wave.",
      },
      {
        heading: "Single-slit diffraction and the combined pattern",
        body: "A single slit of width a spreads light: minima at a·sinθ = mλ. The central maximum is twice as wide as the side ones. When both effects are present, the double-slit fringes ride on the single-slit envelope — fringes near the centre of the envelope are bright, those under an envelope zero vanish. White light produces coloured fringes because λ varies across the visible band.",
      },
    ],
    confusions: [
      {
        wrong: "Bright fringes are where the waves 'add up to a bigger wave'.",
        right: "Bright fringes are where the two waves arrive IN PHASE, so crests meet crests. The magnitude of the sum depends on phase, not on 'more wave'.",
        why: "'Adding' is read as 'more quantity' instead of 'aligned phase'.",
      },
      {
        wrong: "The fringe spacing depends on the distance to the screen only.",
        right: "Δy = λL/d — it grows with L AND with λ, and shrinks with slit separation d. Three independent knobs.",
        why: "L is the most visible variable, so the other two get forgotten.",
      },
      {
        wrong: "Interference only happens with lasers.",
        right: "Any coherent source works — Young used sunlight. Coherence (a stable phase relationship) is what matters, not the source type.",
        why: "'Laser' is the iconic demo, so it is mistaken for a requirement.",
      },
    ],
    questions: [
      { q: "λ = 500 nm, d = 0.10 mm, L = 2.0 m. Fringe spacing?", a: "Δy = λL/d = (500×10⁻⁹·2)/(1×10⁻⁴) = 10 mm.", hint: "Δy = λL/d." },
      { q: "For the above, where is the third dark fringe?", a: "y = (2 + ½)·Δy = 2.5·10 = 25 mm from centre.", hint: "Dark at (m+½)λ." },
      { q: "Double the slit separation — what happens to the fringes?", a: "Δy halves (10 → 5 mm): the pattern gets finer.", hint: "Δy ∝ 1/d." },
      { q: "White light (400–700 nm) through a double slit with L = 1 m, d = 0.2 mm. Width of the central fringe spread?", a: "Δy_violet = 400e-9·1/2e-4 = 2.0 mm; Δy_red = 7e-7·1/2e-4 = 3.5 mm → a 1.5 mm colour spread per fringe.", hint: "Compute Δy at both ends of the visible band." },
    ],
  },

  "ph-3d-electrostatics": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Two point charges: q₁ = +2 µC at origin, q₂ = −3 µC at x = 0.30 m",
      steps: [
        { text: "Coulomb force on q₂ from q₁:", math: "F = k|q₁q₂|/r² = (9×10⁹·2×10⁻⁶·3×10⁻⁶)/0.30² = 5.4×10⁻²/0.09 = 0.60 N (attractive)" },
        { text: "Field of q₁ at q₂'s position (E = kq₁/r²):", math: "E = (9×10⁹·2×10⁻⁶)/0.09 = 2.0×10⁵ N/C, pointing away from q₁ (+x)" },
        { text: "Force on q₂ via the field:", math: "F = q₂E = 3×10⁻⁶·2.0×10⁵ = 0.60 N ✓ (attractive, toward q₁)" },
        { text: "Potential at the midpoint (0.15 m) — scalar sum, signs matter:", math: "V = kq₁/0.15 + kq₂/0.15 = (9×10⁹/0.15)(2−3)×10⁻⁶ = 6×10¹⁰·(−1×10⁻⁶) = −6.0×10⁴ V" },
        { text: "Field at the midpoint — vector sum, so they add:", math: "E = k(2)/0.15² + k(3)/0.15² = (9×10⁹/0.0225)(5×10⁻⁶) = 2.0×10⁶ N/C (both push +x)" },
        { text: "Energy to assemble the pair:", math: "U = kq₁q₂/r = (9×10⁹·(−6×10⁻¹²))/0.30 = −0.18 J (bound system)" },
      ],
      takeaway: "Potential adds as a signed scalar; field adds as a vector. Opposite charges give a NEGATIVE assembly energy — they are bound, and pulling them apart costs 0.18 J.",
    },
    theory: [
      {
        heading: "Field and potential of point charges",
        body: "Coulomb's law F = kq₁q₂/r² gives the force; the field of a point charge is E = kq/r² pointing away from a positive charge and toward a negative one. Potential is V = kq/r — a signed scalar. Because V is scalar, several charges' potentials add arithmetically; because E is a vector, several charges' fields add component-wise and can cancel even where V does not. Equipotential surfaces are always perpendicular to field lines.",
      },
      {
        heading: "Gauss's law and conductors",
        body: "Gauss's law ∮E·dA = q_enc/ε₀ is the fast route for symmetric charges: a point charge, an infinite line (E = λ/2πε₀r), an infinite plane (E = σ/2ε₀), a sphere (E = kQ/r² outside, 0 inside). Inside a conductor in electrostatic equilibrium E = 0, and all excess charge sits on the surface — which is why a cavity shields its interior.",
      },
    ],
    confusions: [
      {
        wrong: "Where the field is zero, the potential is also zero.",
        right: "They are independent: at the midpoint between +q and −q, E ≠ 0 (they add) while V = 0 (they cancel). At the midpoint between two equal positive charges, E = 0 but V ≠ 0.",
        why: "E and V both 'measure the charge', so students assume they track together.",
      },
      {
        wrong: "Potential is a vector.",
        right: "Potential is a SCALAR with a sign — no direction. Only E is a vector.",
        why: "'Potential energy' feels directional because it depends on position.",
      },
      {
        wrong: "A field line is the path a charge follows.",
        right: "A field line shows the DIRECTION of the force at each point; a charge released at rest follows a curved path that is generally NOT a field line unless the field is straight.",
        why: "In a uniform field the path does coincide, so the distinction hides.",
      },
    ],
    questions: [
      { q: "Field at 0.10 m from a +5 µC point charge?", a: "E = kq/r² = 9×10⁹·5×10⁻⁶/0.01 = 4.5×10⁶ N/C, outward.", hint: "E = kq/r²." },
      { q: "Potential at 0.10 m from the same charge?", a: "V = kq/r = 9×10⁹·5×10⁻⁶/0.10 = 4.5×10⁵ V.", hint: "V = kq/r (note: not r²)." },
      { q: "Two equal +2 µC charges are 0.40 m apart. E at the midpoint?", a: "Zero — equal and opposite contributions cancel exactly.", hint: "Symmetry." },
      { q: "What is the field inside a charged conducting sphere?", a: "Zero everywhere inside; all excess charge is on the surface.", hint: "Gauss's law with a zero enclosed charge." },
    ],
  },

  "ph-3d-gravitation": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Satellite in circular orbit at r = 2R_E (R_E = 6400 km), mass 1000 kg",
      steps: [
        { text: "Gravity at twice the radius falls as 1/r²:", math: "g' = g·(R/r)² = 9.8/4 = 2.45 m/s²" },
        { text: "Orbital speed from gravity = centripetal force, v²/r = g':", math: "v = √(g'·r) = √(2.45·1.28×10⁷) = 5.6 km/s" },
        { text: "Orbital period:", math: "T = 2πr/v = 2π·1.28×10⁷/5600 = 14 360 s ≈ 4.0 h" },
        { text: "Escape speed from this height — √2 times the orbital speed:", math: "v_e = √2·5.6 = 7.92 km/s (vs 11.2 km/s from the surface)" },
        { text: "Energy audit — total orbital energy is NEGATIVE (bound):", math: "E = −GMm/2r = −(3.99×10¹⁴·1000)/(2·1.28×10⁷) = −1.56×10¹⁰ J" },
        { text: "To escape, supply exactly +1.56×10¹⁰ J of kinetic energy — no more, no less.", math: "ΔKE = |E| ✓" },
      ],
      takeaway: "An orbit is freefall that keeps missing the ground: speed falls as 1/√r, the period grows as r^1.5, and the negative total energy is exactly the binding cost.",
    },
    theory: [
      {
        heading: "Newton's law of gravitation and the shell theorem",
        body: "F = GMm/r² is universal — apples and moons obey the same law. A spherical shell attracts an outside mass as if all its mass sat at the centre, but attracts an INSIDE mass with exactly zero net force. That is why g points to Earth's centre everywhere on the surface, and why g falls linearly to zero as you tunnel toward the middle (only the mass inside your radius pulls).",
      },
      {
        heading: "Satellite mechanics and binding energy",
        body: "For a circular orbit, gravity supplies the centripetal force: v = √(GM/r) — independent of satellite mass. Escape speed is √2 times the orbital speed at the same radius because escaping must remove the binding energy GMm/2r. A geostationary satellite must sit at r ≈ 42 200 km so its period matches Earth's rotation (23 h 56 min, not 24 h).",
      },
    ],
    confusions: [
      {
        wrong: "Astronauts float in the ISS because there is no gravity up there.",
        right: "Gravity at the ISS is about 8.7 m/s² — 89% of surface g. They float because they and the station are in continuous freefall around Earth.",
        why: "'No gravity in space' is fed by every zero-g film; the freefall explanation needs the orbit idea first.",
      },
      {
        wrong: "A heavier satellite needs a bigger orbital speed.",
        right: "v = √(GM/r): the satellite's mass cancels. A 1 kg and a 1000 kg satellite at the same radius share the same speed and period.",
        why: "Heavier objects feel a bigger force, and students forget the inertia that exactly cancels it.",
      },
      {
        wrong: "Escape velocity depends on the launch direction.",
        right: "The energy argument (½mv² ≥ GMm/r) is direction-free. Aim anywhere you like; only the SPEED matters (hitting the atmosphere or Moon is a separate navigation problem).",
        why: "Direction dominates most projectile intuitions, so it feels like it should matter here too.",
      },
    ],
    questions: [
      { q: "At what radius must a satellite orbit for geostationary operation (T = 86 164 s)?", a: "r = (GMT²/4π²)^(1/3) = 4.22×10⁷ m ≈ 42 200 km — about 6.6 Earth radii.", hint: "Set T = 2π√(r³/GM) and solve for r." },
      { q: "g at height h = R above the surface?", a: "g' = g·(R/2R)² = 9.8/4 = 2.45 m/s².", hint: "Inverse-square in r, not in h." },
      { q: "Escape speed from the Moon (M = 7.35×10²² kg, R = 1.74×10⁶ m)?", a: "v = √(2GM/R) = √(2·6.67×10⁻¹¹·7.35×10²²/1.74×10⁶) = 2.38 km/s.", hint: "Same formula as Earth with M and R of the Moon." },
    ],
  },

  "ph-3d-lenses": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Converging lens, f = +20 cm, object walked from far away to inside the focus",
      steps: [
        { text: "Object at u = 30 cm (just outside f) — thin lens equation 1/v − 1/u = 1/f:", math: "1/v = 1/20 − 1/30 = 1/60 → v = +60 cm (real, inverted)" },
        { text: "Magnification there:", math: "m = v/|u| = 60/30 = 2×, inverted" },
        { text: "Object exactly at the focus (u = 20 cm):", math: "1/v = 1/20 − 1/20 = 0 → image at infinity (emerging rays parallel)" },
        { text: "Object inside the focus (u = 10 cm):", math: "1/v = 1/20 − 1/10 = −1/20 → v = −20 cm — virtual, erect, on the SAME side" },
        { text: "Now the lens is a magnifier:", math: "m = |v|/u = 20/10 = 2× erect ✓ (that is how a hand lens works)" },
        { text: "Power of this lens:", math: "P = 1/f(m) = 1/0.20 = +5 D" },
      ],
      takeaway: "Slide an object from far away toward a converging lens: the image walks from f to infinity, flips to the other side, and comes back as a magnified virtual image — one equation, four regimes.",
    },
    theory: [
      {
        heading: "The thin-lens equation and its four regimes",
        body: "1/v − 1/u = 1/f (with distances measured from the lens, sign convention applied). For a converging lens: outside 2f gives a diminished real image between f and 2f; at 2f, equal-size inverted; between f and 2f, magnified real beyond 2f; at f, image at infinity; inside f, virtual erect magnified. Diverging lenses (f < 0) always give a diminished erect virtual image inside the focus.",
      },
      {
        heading: "Power, lens-maker's formula and combinations",
        body: "P = 1/f in dioptres (f in metres) is additive for thin lenses in contact: P = P₁ + P₂ ± separation term. The lens-maker's formula 1/f = (n−1)(1/R₁ − 1/R₂) shows focal length is set by curvature AND refractive index — the same glass curved more strongly has a shorter f, and n rises for blue light, so blue focuses closer (chromatic aberration).",
      },
    ],
    confusions: [
      {
        wrong: "A virtual image is an illusion you cannot use.",
        right: "A virtual image is perfectly real light — rays that DIVERGE from its points. It works as an object for the next optical element and your eye focuses it onto the retina as a real image.",
        why: "'Virtual' is read as 'not really there', when it only means the rays do not actually meet there.",
      },
      {
        wrong: "A negative magnification means the image is smaller.",
        right: "The SIGN of m is orientation (− inverted, + erect); the SIZE is |m|. m = −2 is twice as big and upside down.",
        why: "Both orientation and scale ride on one number, so the two meanings blur.",
      },
      {
        wrong: "A thicker lens always has a shorter focal length.",
        right: "What matters is curvature (1/R) and refractive index n — thickness is a third-order effect. A flat-sided thick lens can be weaker than a thin one curved sharply.",
        why: "Thickness is the most visible property, so it gets blamed for optical power.",
      },
    ],
    questions: [
      { q: "Object at 2f from a converging lens — where and how big is the image?", a: "At 2f on the other side, same size, inverted (m = −1).", hint: "Put u = −2f in the thin-lens equation." },
      { q: "Diverging lens f = −25 cm, object at 50 cm. Image?", a: "1/v = −1/25 − 1/50 = −3/50 → v = −16.7 cm, m = 1/3: erect, diminished, virtual — always, for any object distance.", hint: "f negative, u negative." },
      { q: "Two thin lenses in contact: f₁ = +20 cm, f₂ = −60 cm. Combined power?", a: "P = 5 − 1.67 = +3.33 D → f = 30 cm: still converging, weaker.", hint: "Powers add for contact." },
    ],
  },

  "ph-3d-measurement": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Vernier caliper (10 divisions = 9 mm) and micrometer screw gauge on the same steel rod",
      steps: [
        { text: "Vernier least count — 1 main-scale division minus 1 vernier division:", math: "LC = 1 mm − 0.9 mm = 0.1 mm" },
        { text: "Reading: main scale 23 mm, the 6th vernier division coincides:", math: "23 + 6×0.1 = 23.6 mm" },
        { text: "Positive zero error of +0.1 mm (1 division closed on zero) — subtract it:", math: "true = 23.6 − 0.1 = 23.5 mm" },
        { text: "Cross-check with the screw gauge (LC = 0.5 mm/50 = 0.01 mm):", math: "5.5 + 28×0.01 = 5.78 mm — but this is a DIAMETER reading on a different axis" },
        { text: "Relative uncertainty of the caliper reading:", math: "±0.1/23.5 = 0.43% — the least count sets the ceiling on what you can claim" },
        { text: "Timing 20 pendulum swings instead of 1 with a 0.1 s stopwatch:", math: "error on the period = 0.1/20 = 0.005 s — measuring N repetitions divides the error by N" },
      ],
      takeaway: "Every instrument has a least count, every reading can carry a zero error, and repeating a measurement N times divides the random error by N — measurement is error management, not digit collection.",
    },
    theory: [
      {
        heading: "Least count: vernier and screw gauge",
        body: "Least count is the smallest interval an instrument can resolve. Vernier: LC = (1 MSD − 1 VSD), typically 0.1 mm or 0.02 mm (50 divisions on 49 mm). Screw gauge: LC = pitch/number of circular-scale divisions, typically 0.5 mm/50 = 0.01 mm. A reading is main-scale + coinciding-division × LC, corrected for any zero error.",
      },
      {
        heading: "Errors: systematic, random, and how they combine",
        body: "Systematic errors (zero error, calibration, parallax) shift every reading the same way — you must find and subtract them; averaging does not help. Random errors scatter both ways — averaging N readings reduces them as 1/√N. When a result is computed from several measurements (density ρ = m/V), percentage errors ADD: %Δρ = %Δm + %ΔV, so the least precise quantity dominates.",
      },
      {
        heading: "Significant figures and honest reporting",
        body: "Report to the instrument's precision, no further: a caliper reading is 23.5 mm, never 23.50000 mm. Rules: nonzero digits count; zeros between digits count; trailing zeros after a decimal point count. In multiplication/division the result keeps the fewest significant figures of any input; in addition/subtraction it keeps the fewest decimal places.",
      },
    ],
    confusions: [
      {
        wrong: "More decimal places mean a more accurate measurement.",
        right: "Accuracy is capped by the least count. Writing 23.50000 mm from a 0.1 mm caliper invents information that is not in the data.",
        why: "Calculators return many digits, and it feels wasteful to throw them away — but the extra digits are noise.",
      },
      {
        wrong: "A positive zero error means the instrument reads low.",
        right: "Positive zero error means it reads HIGH when it should read zero — so you SUBTRACT it: true = observed − zero error.",
        why: "The word 'positive' gets attached to the correction instead of the error.",
      },
      {
        wrong: "Repeating a measurement removes systematic error.",
        right: "Averaging only shrinks RANDOM scatter. A wrongly-calibrated instrument is wrong the same way every time — no number of repeats fixes it.",
        why: "'More data = better' is true only for the random component.",
      },
    ],
    questions: [
      { q: "A vernier has 50 divisions spanning 49 mm. Least count?", a: "LC = 1 − 49/50 = 0.02 mm.", hint: "LC = 1 MSD − 1 VSD." },
      { q: "Density of a cube: side measured to ±1%, mass to ±2%. Worst % error in ρ?", a: "%Δρ = %Δm + 3·%Δside = 2 + 3 = 5% (side enters THREE times: V = a³).", hint: "V = a³ multiplies the side's error by 3." },
      { q: "Why time 10 swings of a pendulum instead of one?", a: "The 0.1 s stopwatch uncertainty spreads over 10 periods: ±0.01 s per period instead of ±0.1 s.", hint: "Error per period = error / N." },
    ],
  },

  "ph-3d-mirrors": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Concave mirror, R = 40 cm (f = 20 cm), object walked through the regimes",
      steps: [
        { text: "Focal length is half the radius of curvature:", math: "f = R/2 = 20 cm" },
        { text: "Object at u = 30 cm, mirror equation 1/v + 1/u = 1/f (real-positive):", math: "1/v = 1/20 − 1/30 = 1/60 → v = +60 cm — real, in front" },
        { text: "Magnification:", math: "m = −v/u = −2 — inverted and twice as tall (the make-up mirror effect needs object INSIDE f, see below)" },
        { text: "Object inside the focus (u = 10 cm):", math: "1/v = 1/20 − 1/10 = −1/20 → v = −20 cm behind, virtual, m = +2 erect" },
        { text: "Convex mirror of the same |f| = 20, object at 30 cm:", math: "1/v = −1/20 − 1/30 = −1/12 → v = −12 cm, m = 0.4 — erect, diminished, virtual, ALWAYS" },
        { text: "Why vehicles use convex:", math: "|m| < 1 shrinks the image → a wide field of view fits in the small mirror ✓" },
      ],
      takeaway: "Concave mirrors cover every regime from magnified-virtual (cosmetic) to inverted-real (projector); convex mirrors can only do one thing — shrink — and that is exactly why traffic uses them.",
    },
    theory: [
      {
        heading: "The mirror equation and sign discipline",
        body: "1/v + 1/u = 1/f with f = R/2. Using the real-is-positive convention: distances of real objects/images are positive, virtual ones negative; magnification m = −v/u carries the orientation. Concave f > 0, convex f < 0. Every regime follows from where the object sits relative to f and 2f (which equals R).",
      },
      {
        heading: "Where each mirror earns its keep",
        body: "Concave: torch/headlight reflectors (bulb at f → parallel beam), shaving and make-up mirrors (face inside f), solar furnaces and dentist mirrors (converging). Convex: vehicle rear-view mirrors and shop security domes (wide field, erect image), also as the secondary mirror in Newtonian telescopes where the fold-out path matters more than magnification.",
      },
    ],
    confusions: [
      {
        wrong: "Convex mirrors can form real images.",
        right: "A convex mirror always sends reflected rays diverging — the image is always virtual, erect and diminished, wherever the object is.",
        why: "Concave's rich behaviour gets generalised to all curved mirrors.",
      },
      {
        wrong: "f = R for a spherical mirror.",
        right: "f = R/2. The focal point sits halfway between the pole and the centre of curvature.",
        why: "For lenses f and R are related through n and curvature, so learners over-generalise; for mirrors the factor is exactly ½ (paraxial).",
      },
      {
        wrong: "A real image cannot be seen directly — you need a screen.",
        right: "A real image can be caught on a screen OR viewed directly from the right position — the rays really pass through the image points.",
        why: "Classroom demos always project onto screens, so the screen feels mandatory.",
      },
    ],
    questions: [
      { q: "Concave mirror, object at the centre of curvature (u = R). Image?", a: "At C itself: real, inverted, same size (m = −1).", hint: "1/v = 2/R − 1/R = 1/R → v = R." },
      { q: "Convex mirror |f| = 30 cm, object at 45 cm. Image position and size?", a: "1/v = −1/30 − 1/45 = −1/18 → v = −18 cm; m = 18/45 = 0.4: erect, 40% size.", hint: "f = −30 in the real-positive convention." },
      { q: "A headlight bulb sits at the focus of a concave reflector. Why?", a: "Rays from the focus reflect PARALLEL — that is the definition of f — giving a beam instead of a glow.", hint: "Reversibility: focus → parallel is the inverse of parallel → focus." },
    ],
  },

  "ph-3d-prism": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Crown-glass prism, apex angle A = 60°, minimum deviation measured δ_m = 40°",
      steps: [
        { text: "At minimum deviation the path is symmetric: i = e and r₁ = r₂ = A/2:", math: "r = 30°" },
        { text: "Snell at the first face gives the index directly:", math: "n = sin i/sin r, with i = (A + δ_m)/2 = 50° → n = sin50°/sin30° = 0.766/0.5 = 1.532" },
        { text: "Cross-check the deviation relation δ = i + e − A at the symmetric point:", math: "40° = 50° + 50° − 60° ✓" },
        { text: "Grazing limit — total internal reflection inside the prism:", math: "θ_c = arcsin(1/1.532) = 40.7°; r₂ = 30° < 40.7°, so the ray escapes (no TIR at minimum deviation)" },
        { text: "Thin-prism shortcut for A = 5°, same glass:", math: "δ = (n − 1)·A = 0.532·5° = 2.66° — deviation without needing angles at all" },
      ],
      takeaway: "One measurement of minimum deviation pins the refractive index exactly — the symmetric geometry is what turns a messy ray trace into a one-line formula.",
    },
    theory: [
      {
        heading: "Prism geometry: deviation and minimum deviation",
        body: "A ray through a prism is refracted twice and deviates by δ = i + e − A. As the incidence angle changes, δ sweeps through a MINIMUM where the path inside is parallel to the base (r₁ = r₂). At that point n = sin((A + δ_m)/2)/sin(A/2) — the standard lab method for measuring refractive index of a solid or liquid (hollow prism filled with the liquid).",
      },
      {
        heading: "Dispersion: why white light fans out",
        body: "n varies with wavelength (cauchy-like: higher for violet, lower for red), so each colour has its own δ_m. The angular spread between violet and red is the dispersion δ_v − δ_r ≈ (n_v − n_r)·A for a thin prism; the dispersive power ω = (n_v − n_r)/(n − 1) with n the mean index. A flint-glass prism disperses roughly twice as strongly as crown glass — the basis of achromatic combinations.",
      },
    ],
    confusions: [
      {
        wrong: "A ray bends toward the base on entry only.",
        right: "It bends toward the base (the thicker part) at BOTH surfaces — toward the normal entering, away from the normal leaving, and both turns are in the same rotational direction.",
        why: "Diagrams emphasise the first bend, and the second bend 'away from normal' feels like it must undo it.",
      },
      {
        wrong: "Minimum deviation means the light is not bent.",
        right: "δ_m is the SMALLEST deviation, typically tens of degrees — the ray is still turned; it is just the gentlest passage the prism allows.",
        why: "The word 'minimum' is heard as 'zero'.",
      },
      {
        wrong: "A prism creates colours that were not in the light.",
        right: "All wavelengths were present in the white light; the prism only sorts them by their different refractive indices. A second inverted prism recombines them into white.",
        why: "Colour seems to appear out of nowhere at the screen.",
      },
    ],
    questions: [
      { q: "Thin prism A = 5°, n = 1.5. Deviation?", a: "δ = (n − 1)A = 0.5·5° = 2.5°.", hint: "Small angles: use the shortcut." },
      { q: "δ_m = 30°, A = 60°. Refractive index?", a: "n = sin(45°)/sin(30°) = 0.7071/0.5 = 1.414.", hint: "i = (A + δ_m)/2." },
      { q: "n_v = 1.53, n_r = 1.51, thin prism A = 10°. Angular dispersion?", a: "δ_v − δ_r = (n_v − n_r)·A = 0.02·10° = 0.2°.", hint: "Dispersion is the DIFFERENCE of deviations." },
    ],
  },

  "ph-3d-thermodynamics": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "2 mol monatomic ideal gas expands from 10 L to 20 L at T = 300 K — three roads compared",
      steps: [
        { text: "ISOTHERMAL expansion — work done by the gas:", math: "W = nRT·ln(V₂/V₁) = 2·8.314·300·ln2 = 3457 J" },
        { text: "Isothermal means ΔU = 0, so every joule of work came from heat absorbed:", math: "Q = W = +3457 J (the gas 'eats' heat from the bath)" },
        { text: "ADIABATIC expansion — the gas pays with its own internal energy. TV^(γ−1) = const, γ = 5/3:", math: "T₂ = 300·(1/2)^(2/3) = 189 K" },
        { text: "Adiabatic work comes from U:", math: "W = n·C_V·(T₁ − T₂) = 2·(3/2·8.314)·(300 − 189) = 2768 J — and Q = 0" },
        { text: "ISOBARIC doubling of volume at constant P (so T also doubles to 600 K):", math: "W = P·ΔV = nR·ΔT = 2·8.314·300 = 4988 J, but Q = n·C_P·ΔT = 2·20.785·300 = 12 471 J — most heat just pays for the temperature rise" },
        { text: "Work per heat absorbed: isothermal 100%, adiabatic pays nothing in but gets 2768 J from U, isobaric only 4988/12 471 = 40%.", math: "iso > iso-baric in efficiency of heat→work" },
      ],
      takeaway: "Same start, same finish in volume — three different paths give three different W and Q. Path variables (Q, W) depend on the road; state variables (U, T, P, V) do not. That is the whole subject in one comparison.",
    },
    theory: [
      {
        heading: "The first law and the sign bookkeeping",
        body: "ΔU = Q − W with W the work done BY the gas. U of an ideal gas depends only on T (U = n·C_V·T), so ΔT = 0 forces ΔU = 0. Work on a P–V diagram is the area under the curve — which is why 'which path' matters for Q and W but not for U. Compression (V down) does work ON the gas; the signs flip.",
      },
      {
        heading: "The second law, engines, and Carnot's ceiling",
        body: "Heat cannot convert to work at 100% in a cycle — some must be dumped to a colder reservoir. A Carnot engine between T_h and T_c has the maximum possible efficiency η = 1 − T_c/T_h (Kelvin only): 500 K → 300 K gives at most 40%, whatever the working substance. Real engines sit far below Carnot; the gap is friction, finite-rate heat transfer, and non-ideal working fluids.",
      },
    ],
    confusions: [
      {
        wrong: "Isothermal means no heat flows.",
        right: "Isothermal means no TEMPERATURE change. Heat usually flows a lot — it is converted to work 1:1 (Q = W). Adiabatic is the process with no heat flow.",
        why: "Both words start with a prefix about heat/temperature and get swapped.",
      },
      {
        wrong: "Adiabatic expansion keeps the temperature constant.",
        right: "An adiabatic expansion is exactly when temperature FALLS — the gas does work using its own internal energy, so T drops (300 → 189 K above).",
        why: "'No heat' is conflated with 'no temperature change'.",
      },
      {
        wrong: "ΔU = 0 whenever the process is a cycle in volume.",
        right: "ΔU = 0 only when the START and END temperatures are equal. Volume returning to its start says nothing about U.",
        why: "Students anchor on the visible variable (V) instead of the one that controls U (T).",
      },
    ],
    questions: [
      { q: "Carnot engine between 500 K and 300 K: maximum efficiency?", a: "η = 1 − 300/500 = 0.4 = 40%.", hint: "Kelvin, always." },
      { q: "The same gas is compressed isothermally back to 10 L. Work done ON the gas?", a: "W = nRT·ln(V₁/V₂) = 3457 J done on the gas; the same heat is dumped to the bath.", hint: "Log ratio inverts." },
      { q: "C_V and C_P of a monatomic ideal gas?", a: "C_V = 3R/2 = 12.47 J/mol·K; C_P = C_V + R = 5R/2 = 20.79 J/mol·K.", hint: "Mayer relation C_P − C_V = R." },
    ],
  },

  "ph-3d-vectors-full": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "A = 3î + 4ĵ + 12k̂ probed with B = 4î − 3ĵ",
      steps: [
        { text: "Magnitude by Pythagoras in three dimensions:", math: "|A| = √(3² + 4² + 12²) = √169 = 13" },
        { text: "Direction cosines — the cosines of the angles with the three axes:", math: "cos α = 3/13, cos β = 4/13, cos γ = 12/13; check cos²α + cos²β + cos²γ = 1 ✓" },
        { text: "Dot product — component by component:", math: "A·B = 3·4 + 4·(−3) + 12·0 = 12 − 12 + 0 = 0 → A ⊥ B" },
        { text: "Cross product magnitude — locked to the same angle:", math: "|A×B| = |A||B|·sin90° = 13·5 = 65" },
        { text: "Angle of A with the x-axis alone:", math: "α = cos⁻¹(3/13) = 76.7° — a vector can be near-perpendicular to ONE axis while fitting inside the cube of its components" },
      ],
      takeaway: "The dot product is the perpendicularity test (0 ⇔ 90°); the cross product builds the vector that is perpendicular to BOTH; direction cosines convert one vector into three axis-angles that must satisfy the cos² sum = 1.",
    },
    theory: [
      {
        heading: "Two products, two geometries",
        body: "A·B = |A||B|cosθ is a SCALAR — it measures alignment, gives work as F·s, and is maximised when vectors point the same way. A×B = |A||B|sinθ·n̂ is a VECTOR perpendicular to the pair (right-hand rule) — it measures the parallelogram they span, gives torque τ = r×F and magnetic force F = qv×B. Zero dot ⇔ perpendicular; zero cross ⇔ parallel. The two tests are opposite.",
      },
      {
        heading: "Components, resolution, and unit vectors",
        body: "Any vector A = A_xî + A_yĵ + A_zk̂; magnitude |A| = √(A_x² + A_y² + A_z²); the unit vector Â = A/|A| carries pure direction. Resolving a vector along arbitrary axes turns geometry into arithmetic — the reason components are used everywhere from inclined planes (mg·sinθ along slope) to electric fields summed from several charges.",
      },
    ],
    confusions: [
      {
        wrong: "The dot product of two vectors is a vector.",
        right: "It is a scalar — a plain number (work, in joules). Only the cross product returns a vector, and that vector is perpendicular to both inputs.",
        why: "Both are called 'products', so both are assumed to behave like multiplication of numbers.",
      },
      {
        wrong: "Perpendicular vectors have a small cross product.",
        right: "|A×B| = |A||B|sinθ is MAXIMUM at 90°. Perpendicular means dot = 0 AND cross = maximum.",
        why: "'Perpendicular' sounds like 'small' because the dot product does vanish there.",
      },
      {
        wrong: "The three angles a vector makes with the axes add to 180°.",
        right: "The COSINES satisfy cos²α + cos²β + cos²γ = 1; the angles themselves have no such sum (for A above: 76.7° + 72° + 22.6° ≠ 180°).",
        why: "Triangle-angle intuition is imported into direction cosines.",
      },
    ],
    questions: [
      { q: "Work done by F = (2, 3, 1) N over s = (4, 0, −2) m?", a: "W = F·s = 8 + 0 − 2 = 6 J.", hint: "Dot product." },
      { q: "Area of the parallelogram spanned by A = (3,4,12) and B = (4,−3,0)?", a: "|A×B| = |A||B|sin90° = 65 square units.", hint: "Cross-product magnitude IS the area." },
      { q: "Unit vector along A = 3î + 4ĵ + 12k̂?", a: "Â = (3/13, 4/13, 12/13).", hint: "Divide by the magnitude 13." },
    ],
  },

  "ph-3d-vectors-classic": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Boat crossing a 60 m river: boat 4 m/s, current 3 m/s",
      steps: [
        { text: "Resultant velocity over the ground (perpendicular components):", math: "v = √(4² + 3²) = 5 m/s at tan⁻¹(3/4) = 36.9° downstream" },
        { text: "Crossing time — only the PERPENDICULAR component makes progress across:", math: "t = width/v_perp = 60/4 = 15 s" },
        { text: "Drift in that time — the current acts the whole crossing:", math: "drift = 3·15 = 45 m downstream" },
        { text: "Now aim upstream to land straight across: sinθ = current/boat = 3/4:", math: "θ = 48.6° upstream; remaining across-component = 4·cos48.6° = 2.65 m/s" },
        { text: "Crossing time on the straight-across route:", math: "t = 60/2.65 = 22.6 s — LONGER than 15 s" },
        { text: "Both routes verified: the current never changes your across-speed — only the direction of the boat can.", math: "fastest ≠ shortest path ✓" },
      ],
      takeaway: "Perpendicular component sets the crossing time; the current only adds drift. Aiming upstream buys a straight path at the price of time — the classic trade the whole of relative velocity is built on.",
    },
    theory: [
      {
        heading: "Vector addition as the law of superposition of motions",
        body: "Velocities add tip-to-tail: the ground velocity of a boat is its velocity relative to the water PLUS the water's velocity relative to the ground. Components can be handled one at a time because perpendicular motions are independent — the same principle that makes projectile motion split into x and y.",
      },
      {
        heading: "Relative velocity and the subtraction form",
        body: "Velocity of A as seen by B: v_AB = v_A − v_B (vectors). Rain falling straight down appears slanted to a running pedestrian: v_rain,man = v_rain − v_man, and the umbrella must point along the RESULTANT. This one subtraction explains drift, headwinds, and why a bird flying into wind can hover relative to the ground.",
      },
    ],
    confusions: [
      {
        wrong: "Aim upstream to cross in the least time.",
        right: "Least time = aim straight across (maximum perpendicular component). Aiming upstream is for the SHORTEST PATH (zero drift), and it costs time.",
        why: "Both goals are legitimate, so the strategies get mixed; they optimise different things.",
      },
      {
        wrong: "The current slows the boat down.",
        right: "The current does not touch the boat's speed relative to the water (4 m/s throughout) — it only adds a sideways velocity over the ground.",
        why: "Watching from the bank, the boat's path is longer, so it FEELS slower.",
      },
      {
        wrong: "Add speeds like numbers: 4 + 3 = 7 m/s.",
        right: "Velocities add as vectors: √(4² + 3²) = 5 m/s. Plain addition is only correct when they are parallel.",
        why: "Speedometers show scalars, so scalar addition feels natural.",
      },
    ],
    questions: [
      { q: "Rain falls 10 m/s straight down; you run 10 m/s. At what angle hold the umbrella?", a: "45° from the vertical, tilted forward — the rain appears to come at 45° in your frame.", hint: "Equal magnitudes → 45°." },
      { q: "Plane flies 500 km/h north; wind 100 km/h east. Ground speed?", a: "√(500² + 100²) = √260000 ≈ 510 km/h.", hint: "Perpendicular components." },
      { q: "Two forces 3 N and 4 N act at 90°. Resultant and direction?", a: "5 N at tan⁻¹(4/3) = 53° from the 3 N force.", hint: "3-4-5 triangle." },
    ],
  },

  "ph-3d-syllabus-suite": {
    proof: {
      title: "Proof on a specific case — the whole syllabus in one block",
      case: "2 kg block pushed 5 m across a rough floor (µ = 0.2) by F = 20 N horizontal, from rest",
      steps: [
        { text: "MEASUREMENT & KINEMATICS — normal force and friction:", math: "N = mg = 20 N; f = µN = 4 N" },
        { text: "NEWTON'S LAWS — net force and acceleration:", math: "a = (F − f)/m = (20 − 4)/2 = 8 m/s²" },
        { text: "KINEMATICS — speed after 5 m, from rest (v² = 2as):", math: "v = √(2·8·5) = √80 = 8.94 m/s; time t = v/a = 1.12 s" },
        { text: "WORK & ENERGY — the audit that ties it together:", math: "W_F = 100 J, W_friction = −20 J, ΔKE = ½·2·80 = 80 J → 100 = 20 + 80 ✓" },
        { text: "POWER — average rate of doing work:", math: "P = W_F/t = 100/1.12 = 89.4 W" },
        { text: "DIMENSIONS as a sanity check — force is [M L T⁻²], work is [M L² T⁻²]:", math: "J = N·m ✓" },
      ],
      takeaway: "One pushed block walks through measurement, kinematics, Newton's laws, friction, work, energy and power — and the energy audit (100 = 20 + 80) is the consistency check that proves the chain is wired correctly.",
    },
    theory: [
      {
        heading: "The Class 11 mechanics chain",
        body: "NEB mechanics is one story told in five chapters: how motion is described (kinematics), why it changes (Newton's laws + friction), how force over distance stocks energy (work-energy theorem), how fast that energy is delivered (power), and what stays conserved when forces are complicated (momentum, energy). Each chapter re-derives the same block problem with a new tool — mastering the block is mastering the chain.",
      },
      {
        heading: "Graphs are the connective tissue",
        body: "The v–t graph's slope is acceleration and its area is displacement; the F–x graph's area is work. When a problem resists algebra (varying force, curved motion), switch to the graph or to energy — the work-energy theorem never needs the detailed path, only endpoints. That is why energy methods solve problems kinematics cannot.",
      },
    ],
    confusions: [
      {
        wrong: "Friction depends on how much surface area is in contact.",
        right: "Kinetic friction is f = µN — normal force and coefficient only. Area matters only indirectly (via pressure and heating).",
        why: "Wide tyres 'grip better' — but that is rubber compound and temperature, not the area law of solid friction.",
      },
      {
        wrong: "The normal force always equals mg.",
        right: "N = mg only on a level surface with no vertical forces. On an incline N = mg·cosθ; push at an angle and N shifts by that component.",
        why: "Every early example is a flat floor, so N = mg is memorised as a law.",
      },
      {
        wrong: "The net work on an object depends on which path it took.",
        right: "W_net = ΔKE regardless of path — that is the work-energy theorem. Only CONSERVATIVE forces (gravity, springs) allow path shortcuts via potential energy; friction's work is path-dependent.",
        why: "Gravity's path-independence is over-extended to friction.",
      },
    ],
    questions: [
      { q: "Same block pushed up a frictionless 30° incline by a force along the slope: a?", a: "a = F/m − g·sin30° = 10 − 4.9 = 5.1 m/s² for F = 20 N.", hint: "Weight component along slope = mg·sinθ." },
      { q: "A car brakes from 20 m/s: stopping distance at 25 m/s (same braking force)?", a: "4× longer (d ∝ v²): kinetic energy quadruples with speed.", hint: "d = v²/2a." },
      { q: "Dimensions of the spring constant k in F = kx?", a: "k = F/x → [M T⁻²]: N/m.", hint: "Force per unit length." },
    ],
  },
};