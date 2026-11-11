/**
 * Lab Learning Packs — the standard content structure rendered below every
 * lab animation, everywhere in the Lab.
 *
 * Every lab page shows, under its animation:
 *   1. Non-General Proof — a worked PROOF on a specific case/numbers
 *      (not the general symbolic proof — the concrete one that builds belief)
 *   2. Theory — concise conceptual backbone
 *   3. Confusion Clarity — misconception vs reality pairs
 *   4. Practice Questions — with click-to-reveal answers
 */

import { CLASS11_LEARNING } from "@/lib/lab-learning-class11";

export type LabProofStep = {
  text: string;
  math?: string;
};

export type LabProof = {
  /** e.g. "Proof on a specific case: 2 kg block, 30° incline" */
  title: string;
  /** The concrete case being proven */
  case: string;
  steps: LabProofStep[];
  /** One-line takeaway connecting the case back to the general law */
  takeaway: string;
};

export type LabTheoryBlock = {
  heading: string;
  body: string;
};

export type LabConfusion = {
  /** what students wrongly believe */
  wrong: string;
  /** what is actually true */
  right: string;
  /** why the confusion happens */
  why: string;
};

export type LabQuestion = {
  q: string;
  a: string;
  hint?: string;
};

export type LabLearningPack = {
  proof: LabProof;
  theory: LabTheoryBlock[];
  confusions: LabConfusion[];
  questions: LabQuestion[];
};

/**
 * Registry of learning packs keyed by lab id (see lib/lab-registry.tsx).
 * Labs without an entry yet render the section with a graceful placeholder.
 */
export const LAB_LEARNING: Record<string, LabLearningPack> = {
  "ph-3d-dynamics": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "2 kg block on a 30° frictionless incline, g = 10 m/s²",
      steps: [
        { text: "Weight splits into two components on the incline:", math: "W∥ = mg·sin30° = 10 N,  W⊥ ≈ 17.3 N" },
        { text: "No friction, so net force along the slope is just W∥:", math: "F_net = 10 N" },
        { text: "Newton's second law along the slope:", math: "a = 10 / 2 = 5 m/s²" },
        { text: "Check against the general formula:", math: "a = g·sinθ = 5 m/s² ✓" },
        { text: "Energy cross-check after 1 m: v² = 2·a·s = 10 → v ≈ 3.16 m/s; matches mgh = ½mv² with h = 0.5 m." },
      ],
      takeaway: "The general law a = g·sinθ survives the concrete case — one verified case beats a memorized formula.",
    },
    theory: [
      { heading: "Newton's second law on inclines", body: "Resolve gravity into components parallel and perpendicular to the surface. Only the parallel component accelerates the block when frictionless; the perpendicular one is cancelled by the normal force." },
      { heading: "Momentum in collisions", body: "Total momentum is always conserved: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂. Kinetic energy is fully conserved only in elastic collisions — in inelastic ones the deficit becomes heat, sound and deformation." },
    ],
    confusions: [
      { wrong: "A heavier block slides down faster.", right: "Acceleration is independent of mass (a = g·sinθ) — mass cancels.", why: "Daily life conflates 'heavier = more force' with 'heavier = faster'; the extra force comes with exactly proportional extra inertia." },
      { wrong: "Normal force always equals mg.", right: "On an incline N = mg·cosθ — only on flat ground is N = mg.", why: "Flat-ground intuition is over-generalized to all surfaces." },
      { wrong: "Momentum is lost when a ball stops after hitting a wall.", right: "Momentum transfers to the wall + Earth, effectively immovable.", why: "The recoiling partner is too massive to notice, so students conclude momentum vanished." },
    ],
    questions: [
      { q: "A 4 kg block rests on a 30° incline with μ = 0.5. Does it slide? (g = 10)", a: "Driving = mg·sin30° = 20 N. Max friction = μmg·cos30° ≈ 17.3 N. 20 > 17.3 → slides (barely).", hint: "Compare mg·sinθ against μmg·cosθ." },
      { q: "Why does the blue cart rebound higher off the elastic wall than the clay blob?", a: "The elastic wall reverses momentum (elastic bounce); clay deforms and sticks (inelastic), turning kinetic energy into heat and deformation.", hint: "Where does the kinetic energy go?" },
      { q: "Two identical carts collide head-on and stop dead. Where did the momentum go?", a: "Nowhere — total was zero before (equal and opposite) and zero after. Momentum is a vector.", hint: "Momentum has direction." },
    ],
  },
  "ph-3d-wave": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Wave of frequency 2 Hz, wavelength 1.5 m, amplitude 0.2 m",
      steps: [
        { text: "Wave speed from v = fλ:", math: "v = 2 × 1.5 = 3 m/s" },
        { text: "A crest travels one wavelength in one period:", math: "T = 1/f = 0.5 s → 1.5 m per 0.5 s = 3 m/s ✓" },
        { text: "Number of oscillations per metre — inverse wavelength:", math: "k = 2π/λ = 2π/1.5 = 4.19 rad/m" },
        { text: "Energy check: doubling amplitude quadruples transported power (P ∝ A²):", math: "A=0.2 m → P ∝ 0.04; A=0.4 m → P ∝ 0.16 = 4 × ✓" },
        { text: "Mass-flow sanity on a rope: a 0.1 kg/m rope carrying this wave at 150 m/s transports:", math: "P ≈ ½·μ·ω²·A²·v = ½·0.1·(4π)²·0.04·150 ≈ 47.4 W" },
      ],
      takeaway: "v = fλ is not a definition to memorize — it is what you get when you track one crest for one period.",
    },
    theory: [
      { heading: "What a wave transports", body: "A mechanical wave transports energy and momentum through a medium — the medium itself only oscillates in place. Watch a marker on the ribbon: it bobs while the crest pattern races away." },
      { heading: "Superposition", body: "Overlapping waves add displacement point-by-point. In-phase → constructive; anti-phase → destructive cancellation. This one rule explains interference, standing waves and beats." },
    ],
    confusions: [
      { wrong: "Waves carry the water (or the rope) along with them.", right: "Only the disturbance travels; medium particles oscillate in place.", why: "Floating objects bob and drift slightly, masquerading as transport." },
      { wrong: "Doubling frequency doubles the wave speed.", right: "v is fixed by the medium; doubling f halves λ, so v = fλ is unchanged.", why: "v = fλ tempts students to see v as caused by f alone." },
      { wrong: "Amplitude affects wave speed.", right: "Amplitude carries energy, not speed — bigger waves do not arrive sooner.", why: "Louder/higher looks 'stronger', and stronger is misread as faster." },
    ],
    questions: [
      { q: "A wave has v = 3 m/s and f = 2 Hz. How long between crests at a fixed point?", a: "T = 1/f = 0.5 s — the point bobs twice per second even though the pattern moves at 3 m/s.", hint: "Period is the inverse of frequency." },
      { q: "Two speakers emit λ = 1.7 m in phase. You stand 3.4 m farther from one. Loud or quiet?", a: "Path difference 3.4 m = 2λ exactly → constructive → LOUD.", hint: "How many wavelengths fit in 3.4 m?" },
      { q: "In damped mode the wave dies with distance. What is conserved and what decays?", a: "Frequency stays constant (set by the source); amplitude decays as the medium dissipates energy.", hint: "Source dictates time behavior; the medium eats amplitude." },
    ],
  },
  "ph-3d-advanced": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "1 kg body falls 5 m from rest under gravity, g = 10 m/s²",
      steps: [
        { text: "Work done by gravity over 5 m drop:", math: "W = m·g·h = 1·10·5 = 50 J" },
        { text: "By work-energy theorem, all 50 J becomes kinetic energy:", math: "½·m·v² = 50 → v² = 100" },
        { text: "Speed at impact:", math: "v = sqrt(2·g·h) = sqrt(100) = 10 m/s" },
        { text: "Electromagnetic waves cross-check — light carries 1 g of mass equivalent:", math: "E = m·c² = 0.001·(3·10⁸)² = 9·10¹³ J" },
        { text: "Nuclear decay step: a 1 g sample losing 0.1% mass liberates:", math: "ΔE = 0.000001·9·10¹⁶ = 9·10¹⁰ J ≈ 21.5 kton TNT ✓" },
        { text: "Energy in 50 J of fall could lift 50 kg by 0.102 m — the same joule, very different feel." },
      ],
      takeaway: "mgh and ½mv² are the same energy in two costumes; E = mc² just sets the unit price of mass itself.",
    },
    theory: [
      { heading: "Work-energy theorem", body: "Net work done on a body equals its change in kinetic energy: W_net = ½mv² − ½mu². For a free fall from rest, every joule of mgh becomes a joule of ½mv² — there is nowhere else for the energy to go (ignoring air drag)." },
      { heading: "Mass-energy equivalence", body: "E = mc² says 1 kg of matter holds 9·10¹⁶ J — the entire annual electricity use of the world (≈ 2.5·10¹³ J) per ~0.28 g of mass. Nuclear reactions tap this; chemical reactions touch only the outer electrons and release eV-scale energies per atom." },
    ],
    confusions: [
      { wrong: "A heavier body has more kinetic energy when it falls the same distance.", right: "v is independent of mass (v = sqrt(2gh)), so heavier body has proportionally more KE — same per kg.", why: "Intuition mixes 'more force' with 'more energy'; the bigger weight pays for itself with bigger inertia." },
      { wrong: "E = mc² means matter turns into energy in any reaction.", right: "Only nuclear/annihilation processes convert detectable mass to energy; chemical reactions rearrange electrons — mass change is unmeasurably small.", why: "Pop-science frames 'mass becomes energy' as universal, blurring nuclear vs chemical scales." },
      { wrong: "Electromagnetic waves need a medium to travel.", right: "EM waves are oscillations of the electromagnetic field itself — they propagate through vacuum at c = 3·10⁸ m/s.", why: "Mechanical-wave intuition (sound needs air) is wrongly transplanted to light." },
    ],
    questions: [
      { q: "A 2 kg brick falls 5 m from rest (g = 10). What is its KE at impact?", a: "KE = mgh = 2·10·5 = 100 J; v = 10 m/s. ½·2·10² = 100 J ✓", hint: "Use W = ΔKE." },
      { q: "How much mass must fully convert to energy to power a 100 W bulb for 1 year?", a: "Energy needed = 100·365·24·3600 ≈ 3.15·10⁹ J. m = E/c² ≈ 3.5·10⁻⁸ kg = 35 micrograms.", hint: "c² is huge — even tiny mass carries enormous energy." },
      { q: "Why does sunlight warm a black panel more than a mirror?", a: "Black absorbs EM energy (high absorption, low reflection); mirror reflects most of it away. Same incident flux, very different absorption coefficients.", hint: "Consider what happens to incoming photons on each surface." },
    ],
  },
  "ph-3d-vectors": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Walk 3 m east, then 4 m north",
      steps: [
        { text: "Represent as vectors:", math: "A = (3, 0),  B = (0, 4)" },
        { text: "Resultant magnitude:", math: "R = sqrt(3² + 4²) = sqrt(25) = 5 m" },
        { text: "Direction (angle north of east):", math: "θ = arctan(4/3) = 53.13°" },
        { text: "Dot product cross-check with F = (20, 0) along d = (3, 0):", math: "W = F·d = 20·3 + 0·0 = 60 J" },
        { text: "Unit vector along A:", math: "û = A/|A| = (3/3, 0) = (1, 0)" },
      ],
      takeaway: "The 3-4-5 triangle is the simplest Pythagorean proof you can carry in your pocket — magnitude uses squares, work uses the dot product, direction uses arctan.",
    },
    theory: [
      { heading: "Vector addition", body: "Two vectors add head-to-tail or component-wise. Magnitude: |A + B| = sqrt(Ax+Bx)² + (Ay+By)². Direction: θ = arctan(Ay/Ax) relative to a chosen axis. The 3-4-5 right triangle is the canonical example because 3² + 4² = 5² exactly." },
      { heading: "Dot product and work", body: "A·B = |A|·|B|·cosθ = Ax·Bx + Ay·By. Work done by a constant force is W = F·d — only the component of force along the displacement does work. A force perpendicular to motion (cos90° = 0) does zero work." },
    ],
    confusions: [
      { wrong: "Walking 3 m east then 4 m north means you walked 7 m.", right: "Total displacement is 5 m (vector sum); path length is 7 m (scalar sum). They are different quantities.", why: "Daily speech uses 'distance' for both; physics must distinguish scalar path from vector displacement." },
      { wrong: "If F and d are large, W is large — dot product is just multiplication.", right: "W = F·d·cosθ; a 10 N force perpendicular to a 10 m motion does 0 J of work, not 100 J.", why: "Scalar arithmetic on magnitudes forgets the angle dependence." },
      { wrong: "A unit vector has length 1 so it has 'no direction'.", right: "A unit vector encodes pure direction — it has no magnitude information but points exactly along an axis.", why: "Students read 'unit = 1' as 'unit-less' or 'neutral', missing that direction is the entire content." },
    ],
    questions: [
      { q: "A = (3, 4) and B = (1, 2). What is A + B?", a: "(4, 6). Magnitude = sqrt(16+36) = sqrt(52) ≈ 7.21. Angle = arctan(6/4) ≈ 56.31°.", hint: "Add components, then take magnitude." },
      { q: "Force F = (10, 0) N pushes an object through d = (3, 4) m. How much work?", a: "W = F·d = 10·3 + 0·4 = 30 J. Only the x-component of displacement contributes because F is purely along x.", hint: "Dot product selects the parallel component." },
      { q: "Two unit vectors at 60°: what is their dot product?", a: "û·v̂ = 1·1·cos60° = 0.5. Geometrically, half of each projects onto the other.", hint: "A·B = |A||B|cosθ." },
    ],
  },
  "ph-3d-optics": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Light at 60° incidence on (a) plane mirror, (b) air→glass interface (n = 1.5), (c) thin lens with f = 0.25 m",
      steps: [
        { text: "Reflection on plane mirror — angle of incidence equals angle of reflection:", math: "θᵢ = 60° → θᵣ = 60°" },
        { text: "Refraction air → glass with Snell's law:", math: "n₁·sinθ₁ = n₂·sinθ₂ → 1·sin60° = 1.5·sinθ₂" },
        { text: "Solve for θ₂:", math: "sinθ₂ = 0.8660/1.5 ≈ 0.5774 → θ₂ = 35.26°" },
        { text: "Lens power from focal length:", math: "P = 1/f = 1/0.25 = +4 D" },
        { text: "Cross-check — image distance for object at 0.5 m, f = 0.25 m:", math: "1/v = 1/f − 1/u = 4 − 2 = 2 → v = 0.5 m ✓ (real, inverted, same size as object)" },
      ],
      takeaway: "Same incident angle, three different stories: bounce equals angle, Snell bends toward the denser medium, and a thin lens with f = 0.25 m packs a +4 diopter punch.",
    },
    theory: [
      { heading: "Reflection and refraction", body: "At any interface, the angle of incidence equals the angle of reflection (θᵢ = θᵣ). Refraction across media follows Snell's law n₁·sinθ₁ = n₂·sinθ₂ — light bends toward the normal when entering a denser medium (n₂ > n₁) and away when leaving." },
      { heading: "Thin lenses and power", body: "A thin lens of focal length f has power P = 1/f (in meters → diopters). Converging lenses have positive f and P; diverging lenses have negative. The lens equation 1/f = 1/v − 1/u (with sign convention) locates the image." },
    ],
    confusions: [
      { wrong: "A 60° incident ray reflects at 30° because the angles 'share' 90°.", right: "Reflection is symmetric about the normal: θᵢ = θᵣ = 60° exactly. The 30° figure would put the ray inside the mirror.", why: "Confusing the angle from the normal with the angle from the surface flips the number by accident." },
      { wrong: "Light slows down in glass, so it bends away from the normal.", right: "Slower speed means shorter wavelength, so the wavefront pivots and the ray bends TOWARD the normal in a denser medium.", why: "Slower → 'more lazy' is the wrong intuition; shorter wavelength on the glass side forces the kink toward the normal." },
      { wrong: "A stronger lens (higher diopter) always gives a bigger image.", right: "Higher P (smaller f) gives bigger angular magnification for a given object distance, but image size also depends on object distance and image-formation geometry.", why: "Power and magnification are linked but not identical; one is a lens property, the other a setup result." },
    ],
    questions: [
      { q: "Light goes from glass (n = 1.5) to air at 30°. Refracted angle?", a: "1.5·sin30° = 1·sinθ₂ → sinθ₂ = 0.75 → θ₂ = 48.59°. Since 30° < critical 41.81°, ray exits.", hint: "Solve Snell for θ₂; check TIR." },
      { q: "A lens has f = 0.5 m. What is its power and type?", a: "P = 1/0.5 = +2 D. Positive → converging.", hint: "Sign of f encodes lens type." },
      { q: "Why does a swimming pool look shallower than it is?", a: "Light from the bottom bends away from the normal leaving water (n = 1.33), so the eye traces it back along a straight line that meets the surface at a shallower apparent depth: d_apparent = d_real / n ≈ 0.75·d_real.", hint: "Apply Snell at the water-air interface." },
    ],
  },
  "ph-3d-refraction": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Water (n = 4/3) to air, with rainbow dispersion",
      steps: [
        { text: "Snell for water → air, exit ray:", math: "(4/3)·sinθ_water = 1·sinθ_air → sinθ_air = 1.333·sinθ_water" },
        { text: "Critical angle when sinθ_air = 1:", math: "sinθ_c = 1/(4/3) = 3/4 = 0.75" },
        { text: "Critical angle value:", math: "θ_c = arcsin(0.75) ≈ 48.59°" },
        { text: "Above 48.59° inside water: sinθ_air would exceed 1 — impossible, so the ray reflects internally (TIR):", math: "100% reflection ✓" },
        { text: "Rainbow check — red (n ≈ 1.331) vs violet (n ≈ 1.344) critical angles:", math: "θ_c,red ≈ 48.65°,  θ_c,violet ≈ 48.05° — a 0.6° spread produces the visible arc." },
      ],
      takeaway: "TIR is geometry, not magic: any ray hitting the water-air boundary above 48.59° from the normal bounces back inside, and tiny dispersion in n splits white sunlight into a rainbow.",
    },
    theory: [
      { heading: "Snell's law and total internal reflection", body: "When light goes from a denser medium (higher n) to a less dense one, sinθ_air = n·sinθ_dense. Beyond the critical angle sinθ_c = 1/n, no refracted ray exists — all energy reflects back inside. TIR underlies fiber optics, mirages, and the sparkle of a diamond." },
      { heading: "Dispersion and the rainbow", body: "Refractive index depends slightly on wavelength: n_red < n_violet for most glasses and water. A white ray entering a raindrop refracts, internally reflects once, and refracts again on exit — the wavelength-dependent bending separates colors. The classic 42° primary bow is the angle between incoming sunlight and the returning ray at the observer." },
    ],
    confusions: [
      { wrong: "TIR happens because the second medium is 'too thin' to carry the wave.", right: "TIR is purely a consequence of geometry + Snell: above θ_c, no real θ_air satisfies sinθ_air ≤ 1, so the refracted ray is evanescent and 100% of the energy reflects.", why: "Students reach for material explanations when the math alone forbids the transmitted ray." },
      { wrong: "A rainbow is a single color arc; the others are reflections or tricks.", right: "A rainbow is a continuous spread of angles — red at the outer edge (~42°), violet at the inner (~40°), because each color has its own n and hence its own exit angle.", why: "Memory of 'rainbow = 7 colors' as discrete bands hides the smooth angular dispersion." },
      { wrong: "Diamonds sparkle because they reflect light off their surface.", right: "Diamond's high n ≈ 2.42 gives θ_c ≈ 24.4°, so almost all light entering undergoes many internal bounces before exiting — total internal reflection does the sparkling, not surface reflection.", why: "Surface reflection (Fresnel losses) is small compared to the trapped light bouncing inside." },
    ],
    questions: [
      { q: "Light inside glass (n = 1.5) hits the glass-air boundary at 35°. Does it exit?", a: "θ_c = arcsin(1/1.5) ≈ 41.81°. Since 35° < 41.81°, ray refracts and exits: sinθ_air = 1.5·sin35° ≈ 0.860 → θ_air ≈ 59.4°.", hint: "Compare incident angle to critical angle." },
      { q: "Why does a straw in a water glass look bent at the surface?", a: "Light from the submerged part refracts at the water-air interface; the eye extrapolates straight back, displacing the apparent position. The angular shift is set by Snell with n = 4/3.", hint: "Apply Snell and trace rays back." },
      { q: "Which color appears on the OUTER edge of a primary rainbow?", a: "Red — it has the smaller n, hence the larger critical angle (~42°), so its returning ray makes the largest angle with the original sun direction.", hint: "Smaller n → larger θ_c → wider bow." },
    ],
  },
  "ph-3d-quantum": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Hydrogen atom: electron transitions from n = 2 to n = 1, emitting a photon",
      steps: [
        { text: "Bohr energy levels for hydrogen (E_n = −13.6/n² eV):", math: "E₁ = −13.6/1² = −13.6 eV;   E₂ = −13.6/4 = −3.4 eV" },
        { text: "Energy of the emitted photon (E₂ − E₁):", math: "ΔE = (−3.4) − (−13.6) = +10.2 eV" },
        { text: "Convert to joules (1 eV = 1.602·10⁻¹⁹ J):", math: "ΔE = 10.2 · 1.602·10⁻¹⁹ ≈ 1.63·10⁻¹⁸ J" },
        { text: "Wavelength from E = hc/λ with h = 6.626·10⁻³⁴ J·s, c = 3·10⁸ m/s:", math: "λ = hc/E = (6.626·10⁻³⁴ · 3·10⁸) / 1.63·10⁻¹⁸ ≈ 1.216·10⁻⁷ m = 121.6 nm" },
        { text: "Cross-check — this is Lyman-α, the first line of the Lyman UV series ✓", math: "λ_theory(Ly-α) = 121.567 nm" },
        { text: "Orbital/superposition angle: the n = 2 state is a superposition of the 2s and 2p orbitals — measuring the photon's polarization collapses the angular-momentum state.", math: "L = ħ·sqrt(ℓ(ℓ+1)),  ℓ = 0 or 1" },
      ],
      takeaway: "Hydrogen's n=2→1 transition is the cleanest quantum number ↔ energy ↔ wavelength pipeline: −13.6 eV ground state, 10.2 eV photon, 121.6 nm ultraviolet light — a single number, three different costumes.",
    },
    theory: [
      { heading: "Bohr model and photon energy", body: "Electrons in atoms occupy quantized energy levels. For hydrogen, E_n = −13.6/n² eV — the minus sign means the electron is bound; escaping to n = ∞ requires +13.6 eV (ionization). A transition from level m to level n releases a photon of energy ΔE = |E_m − E_n| = hf = hc/λ. The n=2→1 (10.2 eV) line is Lyman-α; n=3→2 (1.89 eV) is H-α in red." },
      { heading: "Wavefunctions and superposition", body: "Quantum objects are described by wavefunctions ψ — complex-valued functions whose magnitude squared gives probability density. Before measurement, a system can be in a superposition of basis states (e.g. n = 2 = α·|2s⟩ + β·|2p⟩ with |α|²+|β|² = 1). Measurement collapses ψ onto one outcome. Orbital angular momentum is quantized: L² = ℓ(ℓ+1)ħ², with ℓ = 0, 1, 2, … for s, p, d, f sub-shells." },
    ],
    confusions: [
      { wrong: "The electron orbits the nucleus like a tiny planet, losing energy as it spirals in.", right: "In the Bohr picture the electron stays at a fixed radius without radiating; classical radiation only happens DURING a discrete jump between levels, when one photon is emitted.", why: "Mixing classical EM (accelerating charges radiate) with quantum jumps produces the wrong picture — stationary orbits do not radiate." },
      { wrong: "A photon of 10.2 eV carries 'a lot' of energy.", right: "10.2 eV is tiny in everyday units (≈ 1.63·10⁻¹⁸ J). Photons are emitted/absorbed one at a time at this scale; 'brightness' is photon rate, not single-photon energy.", why: "eV units feel large next to 1 J, hiding how small one quantum event actually is." },
      { wrong: "Superposition means the electron is in two places at once.", right: "Superposition is a statement about the wavefunction coefficients — the electron has a probability distribution over positions until measurement, when one outcome is observed.", why: "Pop-sci 'two places at once' mixes mathematical superposition with definite classical location." },
    ],
    questions: [
      { q: "What is the wavelength of the photon emitted in the n = 3 → n = 2 transition of hydrogen?", a: "ΔE = −1.51 − (−3.4) = 1.89 eV → λ = hc/ΔE ≈ (6.626·10⁻³⁴·3·10⁸)/(1.89·1.602·10⁻¹⁹) ≈ 656 nm (H-α, red).", hint: "Use E_n = −13.6/n² eV and E = hc/λ." },
      { q: "An electron in hydrogen is in the n = 2 state. What is its ionization energy?", a: "E₂ = −3.4 eV; ionization energy = 0 − (−3.4) = 3.4 eV ≈ 5.45·10⁻¹⁹ J.", hint: "Ionization = energy to reach n = ∞." },
      { q: "Why can't we say an electron in a 2p orbital is 'moving' along a definite circle?", a: "The 2p orbital is a stationary probability cloud |ψ|² = probability density. The electron has no well-defined trajectory; momentum is also spread out (Δx·Δp ≥ ħ/2).", hint: "Heisenberg + Born rule: position is a distribution, not a path." },
    ],
  },
  "ph-3d-classic": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Mass m = 0.5 kg on a spring of constant k = 2 N/m, amplitude A = 0.4 m",
      steps: [
        { text: "Angular frequency of the SHO:", math: "ω = sqrt(k/m) = sqrt(2/0.5) = sqrt(4) = 2 rad/s" },
        { text: "Period:", math: "T = 2π/ω = 2π/2 = π ≈ 3.14 s ✓" },
        { text: "Frequency:", math: "f = 1/T = 1/π ≈ 0.318 Hz" },
        { text: "Maximum energy stored in the spring at amplitude:", math: "E_max = ½·k·A² = ½·2·0.4² = 0.5·0.16 = 0.16 J" },
        { text: "Momentum cross-check — at x = 0 (equilibrium) all energy is kinetic:", math: "p_max = sqrt(2·m·E) = sqrt(2·0.5·0.16) = sqrt(0.16) = 0.4 kg·m/s" },
        { text: "Newton cross-check — max restoring force at A:", math: "F_max = k·A = 2·0.4 = 0.8 N; a_max = F/m = 1.6 m/s² ✓" },
      ],
      takeaway: "A 0.5 kg / 2 N/m system oscillates every 3.14 s with at most 0.16 J of mechanical energy — bigger amplitude squares the energy, bigger mass only slows the clock.",
    },
    theory: [
      { heading: "Simple harmonic motion", body: "For F = −kx, the displacement is x(t) = A·cos(ωt + φ) with ω = sqrt(k/m). Period T = 2π/ω is independent of amplitude (isochronism). Energy swaps between kinetic ½mv² and potential ½kx²; total E = ½kA² is conserved in the absence of damping. Real springs and pendulums are linear only for small displacements — large amplitudes see higher-order terms and the period drifts." },
      { heading: "Momentum and impulse", body: "Linear momentum p = mv; for a system of particles, total p is conserved when the net external force is zero. Impulse J = ∫F dt = Δp. The impulse-momentum theorem gives a quick way to estimate peak forces in collisions: F_avg·Δt = m·Δv. Energy and momentum are different currencies: a perfectly inelastic collision conserves p but dissipates KE into heat/deformation." },
    ],
    confusions: [
      { wrong: "Doubling the amplitude doubles the period of an oscillator.", right: "T = 2π·sqrt(m/k) is independent of A (for an ideal linear SHO). Energy scales as A², but the timing does not change.", why: "Students mix 'more energy' with 'slower swing' — large-amplitude pendulums DO slow down only because they leave the small-angle regime." },
      { wrong: "Heavier mass means more total kinetic energy at the same speed.", right: "KE = ½mv² scales linearly with mass; heavier objects carry more KE at the same speed, but v itself is set by the setup, not by m.", why: "The KE-vs-m relationship is correct, but 'more mass → more KE' is sometimes read as 'mass causes KE' — speed is the input here." },
      { wrong: "Momentum is conserved in every collision.", right: "Total momentum is conserved when no net external force acts; energy may or may not be conserved (elastic vs inelastic).", why: "Pop-physics calls every bounce 'elastic' — in reality most macroscopic collisions dissipate KE as heat or sound." },
    ],
    questions: [
      { q: "A 0.2 kg mass on a 8 N/m spring oscillates. What is the period?", a: "T = 2π·sqrt(0.2/8) = 2π·sqrt(0.025) = 2π·0.1581 ≈ 0.993 s.", hint: "ω = sqrt(k/m)." },
      { q: "A 2 kg ball moving at 3 m/s hits a wall and bounces back at 2 m/s. What impulse did the wall deliver?", a: "Δp = m·(v_f − v_i) = 2·(−2 − 3) = −10 kg·m/s; impulse magnitude = 10 N·s (opposite to incoming motion).", hint: "J = Δp; mind the sign of the reversed velocity." },
      { q: "A pendulum of length 1 m has small-angle period about 2 s. On the Moon (g ≈ 1.62 m/s²), what is the period?", a: "T = 2π·sqrt(L/g) = 2π·sqrt(1/1.62) ≈ 2π·0.7857 ≈ 4.94 s — slower because weaker gravity reduces the restoring force.", hint: "Pendulum period scales with 1/sqrt(g)." },
    ],
  },
  "ch-3d-advanced": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Methane (CH₄): tetrahedral sp³ geometry, vs NaCl ionic lattice",
      steps: [
        { text: "Methane: 1 C + 4 H, 4 equivalent C–H bonds pointing to the corners of a tetrahedron. Bond angle:", math: "∠(H–C–H) = 109.5°" },
        { text: "Bond length and bond energy per C–H:", math: "r(C–H) = 1.09 Å = 1.09·10⁻¹⁰ m;   E_bond = 413 kJ/mol" },
        { text: "Total bond energy of one CH₄ molecule:", math: "4 · 413 = 1652 kJ/mol" },
        { text: "Hybridization: carbon's 2s and three 2p orbitals mix into four equivalent sp³ hybrids (tetrahedral angle from cos⁻¹(−1/3) = 109.47°).", math: "sp³ ✓" },
        { text: "Compare to NaCl — purely ionic, no directional bonds. Lattice energy (Madelung + Born):", math: "U_NaCl ≈ 787 kJ/mol" },
        { text: "Cross-check: NaCl's much higher lattice energy reflects the strong, non-directional Coulomb attraction of alternating ions, while CH₄'s bond energy is shared across 4 weaker covalent C–H bonds.", math: "787 vs 1652 kJ/mol — different currencies: lattice vs total covalent ✓" },
      ],
      takeaway: "CH₄ spreads 1652 kJ/mol across 4 directional sp³ bonds at 109.5°; NaCl concentrates ~787 kJ/mol into one Coulomb lattice with no preferred angle — covalent geometry vs ionic packing.",
    },
    theory: [
      { heading: "sp³ hybridization and VSEPR", body: "Carbon's ground state is 1s² 2s² 2p² — only two unpaired electrons, but methane has four equivalent bonds. Hybridization promotes one 2s electron to 2p and mixes all four into four sp³ hybrids, each with 25% s and 75% p character. They point to the corners of a tetrahedron (109.47°) so that the four hybrids are as far apart as possible — VSEPR's 'minimum repulsion' rule gives the same answer." },
      { heading: "Ionic vs covalent bonding", body: "Covalent bonds share electrons between two atoms; directionality arises from orbital overlap. Ionic bonds transfer electrons; the resulting ions attract via Coulomb's law in a 3D lattice (NaCl = rock salt, fcc). Lattice energy U scales as e²/r per ion pair, modified by the Madelung constant (~1.748 for NaCl). Covalent bonds typically have energies of 200–1000 kJ/mol; ionic lattice energies are similar but nondirectional and produce brittle crystals with high melting points." },
    ],
    confusions: [
      { wrong: "Methane's bonds are at 90° because the p-orbitals are perpendicular.", right: "Pure p-orbitals would give 90°, but sp³ hybridization mixes s and p into four equivalent hybrids at 109.5° — the actual H–C–H angle.", why: "Skipping hybridization in the mental picture leaves raw p-orbitals at 90°, which is the geometry of, say, sulfur hexafluoride edge labels, not methane." },
      { wrong: "Ionic bonds are stronger than covalent bonds.", right: "Strength depends on the system. NaCl lattice energy ≈ 787 kJ/mol is comparable to CH₄'s per-bond energy (413 kJ/mol) — different physical quantities, not a strict ranking.", why: "Comparing 'one bond' to 'an entire lattice' mixes denominators; bond energy and lattice energy are different definitions." },
      { wrong: "NaCl molecules exist as discrete Na–Cl pairs in solution.", right: "Solid NaCl is a continuous lattice; in water it dissociates into free Na⁺ and Cl⁻ ions. Only in the gas phase at low pressure do isolated NaCl molecules appear.", why: "Solid-state diagrams drawn as Na–Cl pairs suggest discrete molecules where in reality each Na⁺ touches six Cl⁻ and vice versa." },
    ],
    questions: [
      { q: "What is the H–C–H angle in methane, and why?", a: "109.5°. sp³ hybridization on carbon produces four equivalent hybrids pointing to the corners of a tetrahedron, minimizing electron-pair repulsion (VSEPR).", hint: "Mix s + 3p into 4 hybrids; geometry follows from symmetry." },
      { q: "Compare the bond energy of one C–H bond to the total atomization energy of CH₄.", a: "One C–H bond ≈ 413 kJ/mol; four bonds ≈ 1652 kJ/mol to fully atomize CH₄ into 1 C + 4 H.", hint: "Atomization sums all bond energies." },
      { q: "Why does NaCl have a high melting point (~801 °C) while CH₄ melts at −182 °C?", a: "NaCl's ionic lattice requires breaking many strong Coulomb interactions; CH₄ is held together only by weak London dispersion forces between neutral molecules — no ions, no directional bonds between molecules.", hint: "Intermolecular vs intramolecular forces." },
    ],
  },
  "bio-3d-evolution": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Hardy–Weinberg equilibrium for two alleles A (p) and a (q) with p = 0.7, q = 0.3",
      steps: [
        { text: "Allele frequencies must sum to 1 (every allele is A or a):", math: "p + q = 0.7 + 0.3 = 1.0 ✓" },
        { text: "Genotype frequencies under HW (no selection, mutation, drift, migration, random mating):", math: "p² (AA) = 0.7² = 0.49" },
        { text: "Heterozygote frequency:", math: "2pq = 2·0.7·0.3 = 0.42" },
        { text: "Homozygous recessive:", math: "q² (aa) = 0.3² = 0.09" },
        { text: "Check the HW identity:", math: "p² + 2pq + q² = 0.49 + 0.42 + 0.09 = 1.00 ✓ (it's just (p+q)²)" },
        { text: "Cross-check — number of recessive individuals in a town of 10,000:", math: "10,000 · 0.09 = 900 aa individuals ✓" },
      ],
      takeaway: "Hardy–Weinberg is just (p+q)² expanded — allele frequencies p, q are conserved across generations under ideal conditions, and genotype frequencies follow predictably. Real populations drift away from these numbers only when evolution happens.",
    },
    theory: [
      { heading: "Hardy–Weinberg equilibrium", body: "In an ideal population (random mating, infinite size, no selection/mutation/migration), allele frequencies remain constant across generations and genotype frequencies settle to p² (AA), 2pq (Aa), q² (aa). It is the null model of population genetics — any deviation from p²+2pq+q² = 1 signals that some evolutionary force is at work. Because p² + 2pq + q² = (p+q)² = 1, knowing p immediately gives every genotype frequency." },
      { heading: "Evolutionary forces", body: "Five forces change allele frequencies: (1) Natural selection — differential reproduction by fitness; (2) Genetic drift — random fluctuations in small populations; (3) Mutation — slow introduction of new alleles; (4) Gene flow — migration between populations; (5) Non-random mating — e.g. assortative mating shifts genotype frequencies but not allele frequencies. Together they explain adaptation, speciation, and the patterns of genetic variation seen in real populations." },
    ],
    confusions: [
      { wrong: "If the recessive phenotype is rare, the recessive allele is also rare.", right: "Even a tiny q gives many carriers: q² individuals express the trait, but 2pq carriers carry it hidden. For q = 0.1, only 1% show the trait but 18% are heterozygous carriers.", why: "Phenotype frequency (q²) hides allele frequency (q); carriers dominate when q is small." },
      { wrong: "Hardy–Weinberg says allele frequencies never change.", right: "HW is the null case. Real populations almost always violate at least one assumption, so allele frequencies DO change — that change is evolution.", why: "Reading 'equilibrium' as 'eternally stable' ignores that equilibrium is conditional on ideal assumptions, which are almost never all met." },
      { wrong: "Evolution means organisms are always getting stronger or smarter.", right: "Evolution is just change in allele frequencies across generations; it has no goal or direction. Traits can become simpler (e.g. loss of eyes in cave fish) just as easily as more complex.", why: "Teleological 'ladder of progress' framing is a pre-Darwinian leftover that conflates change with improvement." },
    ],
    questions: [
      { q: "If q² = 0.04 in a population, what fraction are heterozygous carriers?", a: "q = 0.2, p = 0.8. Carriers = 2pq = 2·0.8·0.2 = 0.32 = 32% — eight times the affected individuals.", hint: "q = sqrt(q²); carriers = 2pq." },
      { q: "Cystic fibrosis affects ~1 in 2,500 newborns of European descent. Estimate carrier frequency.", a: "q² = 1/2500 → q = 1/50 = 0.02; 2pq ≈ 2·0.98·0.02 ≈ 0.039 ≈ 1 in 25 carriers.", hint: "Take q from the square root of the disease frequency." },
      { q: "Why doesn't natural selection eliminate a lethal recessive allele entirely?", a: "Selection acts on phenotypes. Heterozygous carriers are unaffected and reproduce normally, so the recessive allele is 'hidden' from selection and persists at low frequency determined by mutation–selection balance.", hint: "Carriers (2pq) are phenotypically normal." },
    ],
  },
  "bio-3d-advanced": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Glucose metabolism — 1 C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + ≈38 ATP",
      steps: [
        { text: "Glycolysis (glucose → 2 pyruvate) in cytosol yields:", math: "2 ATP (net) + 2 NADH" },
        { text: "Link reaction + Krebs cycle (2 acetyl-CoA) yields:", math: "2 ATP (GTP) + 8 NADH + 2 FADH₂" },
        { text: "ETC oxidative phosphorylation (10 NADH + 2 FADH₂ → ATP synthase):", math: "≈34 ATP" },
        { text: "Total ATP yield:", math: "2 + 2 + 34 ≈ 38 ATP" },
        { text: "Energy per ATP hydrolysis:", math: "≈ 30.5 kJ/mol" },
        { text: "Energy efficiency cross-check: 38 ATP × 30.5 kJ/mol ≈ 1159 kJ captured out of ~2870 kJ/mol glucose — about 40%.", math: "40% efficiency ✓" },
      ],
      takeaway: "One glucose molecule fuels ~38 ATP through three coupled stages — glycolysis (2), Krebs (2), and ETC (34) — at roughly 30.5 kJ/mol per ATP, demonstrating how cells harvest chemical energy stepwise.",
    },
    theory: [
      { heading: "Cellular respiration stages", body: "Glycolysis splits glucose in the cytosol, yielding 2 ATP and 2 NADH. Pyruvate enters mitochondria, links to acetyl-CoA, and runs the Krebs cycle producing 2 more ATP (GTP) plus electron carriers. The electron transport chain (ETC) uses NADH and FADH₂ to pump protons, creating a gradient that drives ATP synthase — this oxidative phosphorylation makes the bulk (~34 ATP) of the yield." },
      { heading: "Energy currency and efficiency", body: "ATP stores ~30.5 kJ/mol under cellular conditions. Glucose oxidation releases ~2870 kJ/mol. The ~40% efficiency is high for a chemical process; the rest dissipates as heat. This is why metabolism warms organisms — thermoregulation is a byproduct of energy harvesting." },
    ],
    confusions: [
      { wrong: "ATP is the 'energy source' that cells burn up.", right: "ATP is the energy carrier — it is continuously regenerated by oxidative phosphorylation and consumed by work, cycling through ADP + Pi.", why: "'Burning' sounds like a one-way fuel tank; cells recycle ADP and Pi back to ATP using the energy from food." },
      { wrong: "Oxygen is only needed at the end for the final electron acceptor.", right: "Oxygen is the terminal electron acceptor in the ETC; without it, the chain backs up, NADH cannot unload electrons, and aerobic ATP production stops.", why: "Students may see O₂ as passive 'air' rather than the critical bottleneck that defines aerobic metabolism." },
      { wrong: "Glycolysis requires oxygen.", right: "Glycolysis is anaerobic — it works without oxygen and produces only 2 ATP. The rest of respiration (Krebs + ETC) is aerobic.", why: "Fermentation and glycolysis are conflated; glycolysis alone is universal in all cells." },
    ],
    questions: [
      { q: "If glycolysis yields 2 ATP and the ETC yields 34, why is the total only ~38 and not 36?", a: "2 NADH from glycolysis cost 2 ATP (via shuttle transport into mitochondria) — net is still ~38 in most textbooks, but exact count varies by cell type and shuttle.", hint: "Transport across mitochondrial membranes has an energy cost." },
      { q: "Why does anaerobic exercise produce lactic acid while aerobic exercise does not?", a: "Without oxygen, pyruvate accepts electrons from NADH via lactate dehydrogenase, regenerating NAD⁺ so glycolysis continues — but only 2 ATP per glucose and lactate accumulates.", hint: "NAD⁺ must be regenerated for glycolysis to keep running." },
      { q: "A cell uses 1 mol of ATP per second for work. How many glucose molecules must it oxidize per second (at 38 ATP/glucose)?", a: "1/38 ≈ 0.0263 mol/s ≈ 1.58 mol/min. At 180 g/mol glucose that is ~284 g/min.", hint: "Reverse the ATP yield ratio." },
    ],
  },
  "bio-3d-ecology": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Logistic growth — K = 500, r = 0.8/yr, N = 300 → dN/dt = rN(1−N/K)",
      steps: [
        { text: "Compute the fraction of carrying capacity remaining:", math: "1 − N/K = 1 − 300/500 = 1 − 0.6 = 0.4" },
        { text: "Plug into logistic equation:", math: "dN/dt = 0.8 · 300 · 0.4" },
        { text: "Multiply:", math: "0.8 · 300 = 240;  240 · 0.4 = 96" },
        { text: "Growth rate:", math: "dN/dt = 96 individuals/year" },
        { text: "Cross-check — exponential growth would be:", math: "rN = 0.8·300 = 240/yr; but competition reduces it by factor (1−N/K) = 0.4 → 240·0.4 = 96/yr ✓" },
      ],
      takeaway: "At N = 300 (60% of K), the logistic model gives dN/dt = 96/yr — far below the exponential ceiling of 240/yr because density-dependent competition clips growth by the factor (1−0.6).",
    },
    theory: [
      { heading: "The logistic model", body: "dN/dt = rN(1 − N/K) captures how populations grow exponentially when small (N ≪ K) and slow to zero as they approach carrying capacity K. The term (1 − N/K) is the fraction of unused resources — it acts as a density-dependent brake. r is the intrinsic growth rate (per capita); K is the environment's maximum sustainable population." },
      { heading: "Carrying capacity and r/K selection", body: "K is not a hard ceiling but an equilibrium where births ≈ deaths. Environments with stable resources favor K-strategists (long life, few offspring); unpredictable ones favor r-strategists (many offspring, fast turnover). Real populations fluctuate around K due to environmental noise, time lags, and age structure." },
    ],
    confusions: [
      { wrong: "dN/dt = rN is always true for any population.", right: "Exponential growth (dN/dt = rN) only holds when resources are unlimited; logistic growth adds the (1−N/K) term to model density dependence.", why: "Textbooks often introduce exponential first, and students carry it as the default." },
      { wrong: "If N > K, the population instantly crashes.", right: "When N > K, dN/dt becomes negative — the population declines back toward K. If overshoot is large, resources may degrade (overshoot-and-crash dynamics).", why: "Overshoot produces oscillations or spirals, not an instantaneous reset." },
      { wrong: "K is a fixed property of the species.", right: "K is set by the environment (food, space, predation, disease). The same species has different K in different habitats.", why: "Carrying capacity sounds like an organism trait, but it is an ecosystem property." },
    ],
    questions: [
      { q: "If r = 1.2/yr and K = 1000, what is dN/dt when N = 800?", a: "dN/dt = 1.2·800·(1 − 800/1000) = 960·0.2 = 192/yr.", hint: "Compute 1 − N/K first." },
      { q: "Why does the logistic curve flatten at K instead of continuing straight?", a: "As N approaches K, (1 − N/K) → 0, so growth rate per capita drops to zero — births and deaths balance.", hint: "Set N = K in the equation." },
      { q: "A fish population with K = 500 is harvested down to N = 100. Is the growth rate now faster or slower than at N = 300?", a: "At N = 100: dN/dt = 0.8·100·0.8 = 64/yr. At N = 300: 96/yr. Growth is slower at N = 100 because rN is smaller even though the per-capita rate is higher.", hint: "Compare total dN/dt, not the fraction (1−N/K)." },
    ],
  },
  "bio-3d-human": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Cardiac output — resting: HR = 70/min, SV = 70 ml; exercise: HR = 140/min, SV = 110 ml",
      steps: [
        { text: "Resting cardiac output:", math: "CO = HR · SV = 70 · 70 = 4900 ml/min ≈ 4.9 L/min" },
        { text: "Exercise cardiac output:", math: "CO = 140 · 110 = 15 400 ml/min ≈ 15.4 L/min" },
        { text: "Increase factor:", math: "15.4 / 4.9 ≈ 3.14×" },
        { text: "Oxygen delivery arc — resting O₂ consumption (VO₂) at 250 ml/min:", math: "O₂ delivery = CO · (a-v O₂ diff)" },
        { text: "Assume (a-v O₂ diff) rises from 50 to 140 ml/L during exercise:", math: "Resting: 4.9 L/min × 50 ml/L = 245 ml/min ✓" },
        { text: "Exercise O₂ delivery:", math: "15.4 L/min × 140 ml/L = 2156 ml/min ≈ 2.16 L/min — about 8.8× increase via both flow and extraction. Total O₂ arc ✓" },
      ],
      takeaway: "Cardiac output triples during intense exercise (4.9 → 15.4 L/min) via faster HR and larger SV, and oxygen delivery jumps ~9× because blood flow and tissue extraction both expand.",
    },
    theory: [
      { heading: "Cardiac output and its determinants", body: "CO = HR × SV. Heart rate is set by the SA node and autonomic tone; stroke volume depends on preload (filling), contractility, and afterload. During exercise, sympathetic drive increases HR and contractility, while skeletal muscle pump boosts venous return (preload) — Frank-Starling mechanism stretches the heart for a bigger SV." },
      { heading: "Oxygen delivery and the Fick principle", body: "VO₂ = CO × (CaO₂ − CvO₂). The body increases oxygen delivery by raising both CO and the arterial-venous O₂ difference. At rest, muscles extract ~25% of delivered O₂; during maximal exercise they extract ~80%. This two-lever system (flow + extraction) gives a huge dynamic range." },
    ],
    confusions: [
      { wrong: "SV increases linearly with exercise intensity forever.", right: "SV plateaus at moderate intensity (~40–60% VO₂max) because filling time shortens at very high HR and the heart cannot fill fully between beats.", why: "The 'more is better' intuition misses the time constraint imposed by diastole." },
      { wrong: "A higher HR always means more cardiac output.", right: "CO = HR × SV — if SV falls sharply (e.g. dehydration, tachycardia beyond optimal), CO can drop despite very high HR.", why: "SV is not constant; it is coupled to HR through filling time and contractility." },
      { wrong: "O₂ delivery is limited only by lung capacity.", right: "Delivery depends on CO, hemoglobin concentration, capillary density, and mitochondrial function — not just alveolar ventilation.", why: "Focus on 'breathing harder' ignores the cardiovascular and muscular sides of the chain." },
    ],
    questions: [
      { q: "If HR = 90/min and SV = 80 ml, what is CO in L/min?", a: "90 × 80 = 7200 ml/min = 7.2 L/min.", hint: "Divide by 1000 to convert ml to L." },
      { q: "Why does SV not keep increasing indefinitely with exercise?", a: "At high HR, diastolic filling time shortens; the heart cannot fill fully, so SV plateaus or even falls. Contractility also peaks.", hint: "Think about the time between beats." },
      { q: "A trained athlete has a resting HR of 45 bpm and SV of 90 ml. What is resting CO?", a: "45 × 90 = 4050 ml/min ≈ 4.05 L/min — similar to untrained at rest, but achieved with a slower HR and larger SV (more efficient pump).", hint: "Same CO can come from different HR/SV combinations." },
    ],
  },
  "math-3d-advanced": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Derivative of f(x) = x³ at x = 2; volume of sphere radius 3",
      steps: [
        { text: "Derivative by power rule:", math: "f'(x) = 3x²" },
        { text: "Evaluate at x = 2:", math: "f'(2) = 3·2² = 12" },
        { text: "Slope of tangent at x = 2 is 12 — for every +1 step in x, y rises ≈12:", math: "dy/dx = 12 ✓" },
        { text: "Tangent-line equation at (2, 8) with slope 12:", math: "y − 8 = 12(x − 2) → y = 12x − 16" },
        { text: "Volume of sphere radius r = 3:", math: "V = (4/3)·π·r³ = (4/3)·π·27 = 36π" },
        { text: "Numerical value:", math: "V ≈ 36·3.1416 ≈ 113.1 cubic units ✓" },
      ],
      takeaway: "f(x) = x³ has instantaneous slope 12 at x = 2 (tangent y = 12x − 16), and a sphere of radius 3 encloses 36π ≈ 113.1 cubic units — one algebraic rule, two completely different geometric quantities.",
    },
    theory: [
      { heading: "Derivatives and tangent lines", body: "The derivative f'(x) is the instantaneous rate of change — the slope of the curve at a point. For f(x) = x³, f'(x) = 3x². At x = 2 the tangent has slope 12 and passes through (2, 8); the line equation is y − y₀ = m(x − x₀). The derivative turns geometry into slope, optimization, and motion into one operator." },
      { heading: "Volume of revolution and the sphere", body: "A sphere of radius r has volume V = (4/3)πr³. It can be derived by rotating a semicircle y = sqrt(r² − x²) about the x-axis and integrating πy²dx from −r to r, or by Cavalieri's principle stacking disks. The factor 4/3/3 emerges from the integral; it is not an arbitrary constant." },
    ],
    confusions: [
      { wrong: "The derivative at a point is the slope of a tiny secant line nearby.", right: "The derivative is the limit of secant slopes as the two points merge into one — it is the slope of the actual tangent line, not a small chord.", why: "Secant intuition with finite h gives approximate slopes; the limit is exact." },
      { wrong: "f'(2) = 12 means the function increases by exactly 12 units when x increases by 1.", right: "f'(2) = 12 is an instantaneous rate — the actual increase over Δx = 1 is f(3) − f(2) = 27 − 8 = 19, because the curve is curving.", why: "Instantaneous slope equals average slope only for straight lines." },
      { wrong: "Sphere volume is (4/3)πr³ because someone measured it experimentally.", right: "It follows from integration or Cavalieri's principle — the formula is provable from geometry, not an empirical fit.", why: "Treating formulas as memorized numbers misses the reasoning behind the shape." },
    ],
    questions: [
      { q: "What is the derivative of f(x) = x³ at x = −1, and what is the tangent equation there?", a: "f'(-1) = 3·1 = 3. Point is (−1, −1). Tangent: y + 1 = 3(x + 1) → y = 3x + 2.", hint: "Power rule gives f'(x) = 3x²; use point-slope form." },
      { q: "If a sphere has volume 288π, what is its radius?", a: "(4/3)πr³ = 288π → r³ = 216 → r = 6.", hint: "Cancel π and solve r³." },
      { q: "A cube and a sphere both have 'radius' 2 (half-side for cube). Which has larger volume?", a: "Cube: 4³ = 64. Sphere: (4/3)π·8 ≈ 33.5. Cube is bigger — sphere is the most volume-efficient shape, but here 'radius' comparison is apples to oranges.", hint: "Make sure you use the correct formula for each shape." },
    ],
  },
};

/** Returns the learning pack for a lab id (main registry + class11 module). */
export function getLabLearning(labId: string): LabLearningPack | undefined {
  return LAB_LEARNING[labId] ?? CLASS11_LEARNING[labId];
}
