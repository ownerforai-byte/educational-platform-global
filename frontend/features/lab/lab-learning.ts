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
  "ph-th-kinematics": {
    proof: {
      title: "Proof on a specific case — projectile fired at 20 m/s, 30° above horizontal",
      case: "u = 20 m/s, θ = 30°, g = 10 m/s², level ground",
      steps: [
        { text: "Split the launch velocity into independent components:", math: "uₓ = u·cos30° ≈ 17.32 m/s,  u_y = u·sin30° = 10 m/s" },
        { text: "Time of flight — the vertical motion alone decides when it lands:", math: "T = 2u·sinθ / g = 2(10)/10 = 2 s" },
        { text: "Horizontal range — constant horizontal speed × flight time:", math: "R = uₓ·T = 17.32 × 2 ≈ 34.6 m" },
        { text: "Cross-check with the range formula:", math: "R = u²·sin2θ/g = 400 × sin60°/10 ≈ 34.6 m ✓" },
        { text: "Maximum height (vertical velocity momentarily zero):", math: "H = u_y²/2g = 100/20 = 5 m" },
      ],
      takeaway: "Horizontal and vertical motions share only a clock — solve them separately and stitch through time, and every projectile question becomes two easy one-dimensional problems.",
    },
    theory: [
      { heading: "The three equations of motion", body: "For constant acceleration: v = u + at, s = ut + ½at², v² = u² + 2as. They come straight from the definitions of velocity and acceleration. They are valid ONLY for constant acceleration — air drag, engine thrust that varies, or curved paths break them." },
      { heading: "Why the trajectory is a parabola", body: "x grows linearly with time (no horizontal force) while y grows quadratically (constant downward g). Eliminating t between them gives y as a quadratic in x — the geometric definition of a parabola. The steepest descent is at landing, symmetric to the launch ascent." },
      { heading: "Relative velocity as viewpoint arithmetic", body: "v_AB = v_A − v_B means: subtract the observer's own velocity to see the world from their eyes. A boat crossing a river must aim upstream by exactly the drift angle, or the current carries it downstream — the crosswind/crosscurrent correction is the same arithmetic pilots use." },
    ],
    confusions: [
      { wrong: "A projectile's horizontal speed decreases as it rises.", right: "Horizontal velocity stays constant the whole flight — gravity has no horizontal component.", why: "Students picture the whole velocity vector shrinking, but only the vertical part changes." },
      { wrong: "At the top of the flight, acceleration is zero because the projectile stops.", right: "Only the vertical VELOCITY is zero at the top; acceleration is still g downward throughout.", why: "Zero velocity is confused with zero acceleration — the same mistake that says a ball thrown up is forceless at its peak." },
      { wrong: "45° always gives maximum range.", right: "45° is optimal only on level ground in vacuum; on an elevated platform or with air drag the best angle is lower.", why: "The textbook derivation assumes launch and landing at the same height." },
    ],
    questions: [
      { q: "A stone is thrown up at 50 m/s. Max height and total time to return? (g = 10)", a: "H = u²/2g = 125 m. Time up = u/g = 5 s, total = 10 s (ascent and descent are symmetric).", hint: "At the top v = 0; use v² = u² − 2gh." },
      { q: "A ball rolls off a 20 m high table at 5 m/s horizontally. Where does it land? (g = 10)", a: "Fall time t = √(2h/g) = 2 s. Horizontal distance = 5 × 2 = 10 m. Landing speed: v = √(5² + 20²) ≈ 20.6 m/s.", hint: "Vertical fall time is independent of horizontal speed." },
      { q: "A river flows at 3 m/s; a boat can do 4 m/s in still water and heads straight across. Find the crossing drift and the actual velocity.", a: "Drift = (3/4) × width; actual speed = √(3² + 4²) = 5 m/s, angled downstream by tan⁻¹(3/4) ≈ 37°.", hint: "The current adds a vector perpendicular to the boat's effort." },
      { q: "Two trains approach each other at 72 km/h and 54 km/h. A bird flies between them at 30 m/s. What relative speed does each driver see for the bird?",
        a: "Closing speed of trains = 20 + 15 = 35 m/s. Each driver sees the bird at 30 + own speed (30 + 20 = 50 m/s and 30 + 15 = 45 m/s).",
        hint: "Convert km/h first; relative velocity is always observer minus observed." },
    ],
  },
  "ph-th-laws": {
    proof: {
      title: "Proof on a specific case — crate pulled at an angle",
      case: "20 kg crate, rope at 30° above horizontal with 80 N, μ_s = 0.4, μ_k = 0.3, g = 10 m/s²",
      steps: [
        { text: "The angled pull reduces the normal force — resolve first:", math: "N = mg − F·sin30° = 200 − 40 = 160 N" },
        { text: "Maximum static friction available:", math: "f_s,max = μ_s·N = 0.4 × 160 = 64 N" },
        { text: "Horizontal pull component vs friction:", math: "F·cos30° ≈ 69.3 N > 64 N → the crate DOES slide" },
        { text: "Once sliding, kinetic friction takes over:", math: "f_k = μ_k·N = 0.3 × 160 = 48 N" },
        { text: "Second law along the floor:", math: "a = (69.3 − 48)/20 ≈ 1.07 m/s²" },
      ],
      takeaway: "An angled lift makes the box easier to slide by shrinking N — resolve every force before judging friction, and switch from μ_s to μ_k the instant motion begins.",
    },
    theory: [
      { heading: "The three laws as one system", body: "First law defines inertial frames (no net force → no change of velocity). Second law quantifies it: F = ma, or deeper, F = dp/dt. Third law: forces come in equal-opposite pairs acting on DIFFERENT bodies — which is why they never cancel within one free-body diagram." },
      { heading: "Friction is self-adjusting", body: "Static friction equals exactly what is needed to prevent sliding, up to μ_s·N. It is NOT automatically at its maximum. Kinetic friction μ_k·N is roughly constant and smaller — starting is harder than continuing. Friction can also drive motion: it is what pushes a car forward and lets you walk." },
      { heading: "Circular motion needs a real inward force", body: "a = v²/r toward the centre. The centripetal force is a ROLE played by tension, gravity, friction or the normal force — never an extra force to draw. On a banked curve tan θ = v²/rg; on a flat curve the limit is v = √(μ g r), independent of mass." },
    ],
    confusions: [
      { wrong: "Action and reaction cancel, so nothing can ever accelerate.", right: "They act on different bodies; each body feels only the force ON it.", why: "The pair is drawn on one diagram instead of two." },
      { wrong: "Centrifugal force throws you outward in a turn.", right: "In the ground frame there is only inward force; you move outward relative to the car because of inertia.", why: "The rotating car is a non-inertial frame where a pseudo-force must be invented to keep Newton's laws usable." },
      { wrong: "Heavier vehicles skid at higher speed on curves.", right: "v_max = √(μ g r) — mass cancels; a truck and a car skid at the same speed on the same tyres.", why: "Both the required centripetal force and the available friction scale with mg." },
    ],
    questions: [
      { q: "A 60 kg person stands on a scale in a lift accelerating 2 m/s² up, then 2 m/s² down. Scale readings? (g = 10)", a: "Up: N = m(g+a) = 720 N. Down: N = m(g−a) = 480 N. Free fall would read 0.", hint: "The scale reads the normal force, not mg." },
      { q: "Two blocks (3 kg and 2 kg) connect over a frictionless pulley (Atwood). Find a and T.", a: "a = (3−2)g/(3+2) = 2 m/s²; T = 2(g+a) = 24 N.", hint: "Treat the system for a, then one block for T." },
      { q: "A motorcyclist of total mass 60 kg (rider + bike) rides a vertical loop of radius 6 m. Minimum speed at the top? Normal force from the track at the bottom if speed there is 12 m/s? (g = 10)", a: "v_top = √(gr) = √60 ≈ 7.75 m/s. At the bottom: N − mg = mv²/r → N = 60(144/6 + 10) = 60 × 34 = 2040 N.", hint: "At the top gravity alone may supply v²/r; at the bottom the track must both hold and curve." },
      { q: "A 1500 kg car takes a 40 m curve at 72 km/h. Minimum μ to avoid skidding?",
        a: "v = 20 m/s; μ ≥ v²/(gr) = 400/400 = 1.0 — sporty tyres or banking needed.", hint: "Set friction equal to required centripetal force." },
    ],
  },
  "ph-th-work": {
    proof: {
      title: "Proof on a specific case — sled dragged, then the energy ledger",
      case: "12 kg sled, 60 N rope at 30° above ground, 15 m, μ_k = 0.15, g = 10 m/s², starts from rest",
      steps: [
        { text: "Work by the rope (only the horizontal component counts):", math: "W_pull = 60 × 15 × cos30° ≈ 779 J" },
        { text: "Normal force is reduced by the rope's upward part:", math: "N = 120 − 60·sin30° = 90 N → f = μ_k·N = 13.5 N" },
        { text: "Friction removes energy over the whole path:", math: "W_fric = −13.5 × 15 = −202.5 J" },
        { text: "Work–energy theorem gives the final speed directly:", math: "W_net = 779 − 202.5 = 576.5 J = ½·12·v² → v ≈ 9.8 m/s" },
        { text: "Gravity and the normal force did exactly zero — both ⊥ to motion.", math: "W_gravity = W_normal = 0" },
      ],
      takeaway: "You never needed acceleration or time: net work → kinetic energy → speed in one line. That is the whole power of the work–energy theorem.",
    },
    theory: [
      { heading: "Work is a signed dot product", body: "W = F·d·cos θ. θ < 90° adds energy, θ = 90° does nothing, θ > 90° removes it. Work is a scalar: add signed contributions, never vector-add them. For a variable force, work is the area under the F–x graph — which is why a spring's work is ½kx²." },
      { heading: "Conservation of mechanical energy", body: "When only conservative forces act, KE + PE is constant: ½mv² + mgh = constant. A frictionless drop from height h gives v = √(2gh) regardless of mass or path shape. With friction, subtract f·d — the 'lost' mechanical energy reappears as heat, never vanishes." },
      { heading: "Power sets the rate", body: "P = W/t and instantaneously P = F·v. The same climb needs the same work at any speed, but a faster climb demands more power — that trade is what gears do. 1 kWh = 3.6 MJ is ENERGY; the watt is power. Confusing them loses easy marks." },
    ],
    confusions: [
      { wrong: "Holding a heavy box is hard work, so lots of physics work is done.", right: "Zero displacement → zero work, however tired you feel.", why: "Muscle fibres constantly contract and relax, consuming chemical energy — physiological effort is not mechanical work on the box." },
      { wrong: "The normal force does work as a box slides on the floor.", right: "It is perpendicular to the motion, so cos 90° = 0.", why: "Students multiply every force by the distance without checking direction." },
      { wrong: "Doubling the speed doubles the braking distance.", right: "KE ∝ v², so distance quadruples: d = v²/(2μg).", why: "Linear intuition applied to a squared quantity." },
    ],
    questions: [
      { q: "A 0.5 kg ball is thrown up at 20 m/s. Max height and speed halfway up? (g = 10)", a: "H = u²/2g = 20 m. Halfway (10 m): v² = 400 − 2·10·10 = 200 → v ≈ 14.1 m/s.", hint: "One energy equation replaces the whole kinematic story." },
      { q: "A spring k = 800 N/m compressed 0.2 m launches a 0.4 kg ball. Launch speed? Height on a frictionless vertical track?",
        a: "½kx² = 16 J = ½·0.4·v² → v ≈ 8.94 m/s. Then h = v²/2g ≈ 4.08 m.", hint: "Spring PE → KE → PE, one ledger." },
      { q: "A pump lifts 200 kg of water per minute through 12 m. Minimum motor power? (g = 10)", a: "W = mgh = 24,000 J per 60 s → P = 400 W (plus any flow losses).", hint: "Power = energy per second." },
      { q: "A car engine delivers 50 kW at a steady 25 m/s. Total resistive force?",
        a: "P = Fv → F = 50,000/25 = 2000 N — at constant speed the engine force exactly balances all resistance.", hint: "Constant speed means zero net force, not zero engine force." },
    ],
  },
  "ph-th-grav": {
    proof: {
      title: "Proof on a specific case — a satellite at 400 km altitude",
      case: "Earth: M = 6×10²⁴ kg, R = 6.4×10⁶ m; satellite at h = 400 km",
      steps: [
        { text: "Orbit radius measured from Earth's centre:", math: "r = R + h = 6.8×10⁶ m" },
        { text: "Gravity IS the centripetal force — set them equal:", math: "GMm/r² = mv²/r → v = √(GM/r) ≈ 7.6 km/s" },
        { text: "Orbital period from the circumference:", math: "T = 2πr/v ≈ 2π(6.8×10⁶)/7600 ≈ 94 min" },
        { text: "Check the inverse-square field drop at this height:", math: "g_h = g·(R/r)² = 10 × (6.4/6.8)² ≈ 8.9 m/s²" },
        { text: "Escape speed from the surface is independent of launch direction:", math: "v_esc = √(2GM/R) = √2 × 7.9 ≈ 11.2 km/s" },
      ],
      takeaway: "An orbit is free fall that keeps missing the ground: gravity supplies exactly the v²/r the path needs — astronauts are not beyond gravity, they are falling all the time.",
    },
    theory: [
      { heading: "Newton's law of gravitation", body: "F = GMm/r² — every pair of masses attracts, and the same constant G = 6.67×10⁻¹¹ rules an apple and the Moon. Shell theorems make Earth act as a point mass at its centre (for outside points). Weight is just the local case F = mg with g = GM/R²." },
      { heading: "Potential energy is negative", body: "U = −GMm/r, with zero at infinity. The minus sign says masses are BOUND: you must ADD energy to separate them. Escape speed follows from ½mv² − GMm/R = 0 — kinetic energy exactly pays off the gravitational debt." },
      { heading: "Kepler's laws in modern dress", body: "Equal areas in equal times = angular momentum conservation (speeds up near perigee). T² ∝ r³ for everything orbiting the same body — the same law that sets the ISS's ~92 minutes and the Moon's 27.3 days." },
    ],
    confusions: [
      { wrong: "Satellites float because there is no gravity in space.", right: "Gravity at ISS height is ~89% of surface strength; the station and astronauts fall together.", why: "Weightlessness is the absence of a normal force, not the absence of gravity." },
      { wrong: "G and g are the same kind of thing.", right: "G is a universal constant (N·m²/kg²); g is a local field strength (m/s²) that varies with planet and altitude.", why: "Both are 'gravity words' and look interchangeable in exam panic." },
      { wrong: "A geostationary satellite can orbit at any height if the speed is right.", right: "Only r ≈ 42,000 km gives T = 24 h; height and period are locked together by T² ∝ r³.", why: "Speed and radius are not independent for circular orbits." },
    ],
    questions: [
      { q: "How does g change at twice Earth's radius from the centre?", a: "g' = g/4 ≈ 2.45 m/s² — inverse square in r.", hint: "Distance doubled → field quartered." },
      { q: "Find the orbital speed and period for a satellite skimming the surface (r = R). (Take g = 10, R = 6400 km)", a: "v = √(gR) = √(6.4×10⁷) ≈ 8 km/s; T = 2πR/v ≈ 84 min.", hint: "Use GM = gR² to avoid needing G and M separately." },
      { q: "Why does the Moon not crash into Earth, despite gravity pulling it in?",
        a: "It IS falling — but its tangential speed makes Earth's surface curve away exactly as fast as it falls. Falling forever, missing always: that is an orbit.", hint: "Newton's cannonball thought experiment." },
      { q: "A planet has the same surface gravity as Earth but twice the radius. Its escape speed?",
        a: "v_esc = √(2gR) → with R doubled, escape speed × √2 ≈ 15.8 km/s.", hint: "Escape speed depends on g AND R." },
    ],
  },
  "ph-th-thermo": {
    proof: {
      title: "Proof on a specific case — a real engine's energy ledger",
      case: "Heat engine: 800 J absorbed from the hot source, 500 J rejected to the sink",
      steps: [
        { text: "First law for a cycle (ΔU = 0 over one loop):", math: "W = Q_H − Q_C = 800 − 500 = 300 J" },
        { text: "Actual efficiency:", math: "η = W/Q_H = 300/800 = 37.5%" },
        { text: "Carnot ceiling for T_H = 500 K, T_C = 300 K:", math: "η_max = 1 − T_C/T_H = 1 − 300/500 = 40%" },
        { text: "The engine is near the ceiling — only a hotter source or colder sink helps:", math: "η = 1 − T_C/T_H — no design cleverness beats this ratio" },
        { text: "Entropy check on the exchange:", math: "ΔS = −800/500 + 500/300 = −1.6 + 1.67 ≈ +0.07 J/K > 0 ✓" },
      ],
      takeaway: "You cannot turn all heat into work: some must be dumped to a colder sink. Efficiency is decided by the TEMPERATURE RATIO, not by engineering cleverness alone.",
    },
    theory: [
      { heading: "Zeroth and first laws", body: "Zeroth law defines temperature (bodies in equilibrium share it). First law: ΔU = Q − W — energy bookkeeping. Heat in raises internal energy or does work; Q and W are path-dependent but U is not, which is why state functions matter." },
      { heading: "Second law — the one-way street", body: "Heat flows spontaneously hot → cold, never the reverse without work input. Entropy measures energy dispersal: ΔS = Q/T for reversible transfer. All real processes raise TOTAL entropy; machines and living things locally decrease theirs by exporting more disorder elsewhere." },
      { heading: "Practical consequences", body: "A refrigerator moves heat against the gradient by spending work (COP = Q_cold/W). Adiabatic compression in a diesel engine heats fuel enough to ignite — no spark plug. Water's specific heat (4200 J/kg·K, ~5× sand's) is why the sea stays cool in June while sand burns your feet." },
    ],
    confusions: [
      { wrong: "A refrigerator cools the room if you leave its door open.", right: "It heats the room: pumped heat plus the compressor's electrical work is dumped back inside.", why: "People forget the compressor's work input also ends as heat in the room." },
      { wrong: "Temperature and heat are the same.", right: "Temperature is average kinetic energy per particle; heat is energy IN TRANSIT because of a temperature difference.", why: "A spark is hotter than a bathtub, but the bathtub holds far more thermal energy." },
      { wrong: "Efficiency can reach 100% with good lubrication.", right: "The Carnot limit 1 − T_C/T_H binds ANY engine between two temperatures.", why: "Friction is not the fundamental limit — the second law is." },
    ],
    questions: [
      { q: "2 kg of water is heated from 20°C to 70°C (c = 4200 J/kg·K). Heat needed?", a: "Q = mcΔT = 2 × 4200 × 50 = 420 kJ.", hint: "ΔT in °C equals ΔT in K." },
      { q: "A Carnot engine works between 600 K and 300 K and absorbs 1200 J per cycle. Max work output?", a: "η = 0.5 → W = 600 J; 600 J must be rejected to the sink.", hint: "Efficiency first, then the ledger." },
      { q: "Why does blowing on hot soup cool it even though your breath is warm?",
        a: "Moving air sweeps away the saturated boundary layer, boosting evaporation — which takes its latent heat FROM the soup.", hint: "Evaporation beats convection here." },
      { q: "Gas in a cylinder is compressed adiabatically. What happens to its temperature and why?",
        a: "It rises: Q = 0, so work done ON the gas goes entirely into internal energy → temperature climbs (diesel ignition principle).", hint: "Apply the first law with Q = 0." },
    ],
  },
  "ph-th-optics": {
    proof: {
      title: "Proof on a specific case — image through a converging lens",
      case: "Object 30 cm from a converging lens of focal length 20 cm",
      steps: [
        { text: "Lens equation with the standard sign convention:", math: "1/f = 1/v + 1/u → 1/v = 1/20 − 1/30 = 1/60 → v = 60 cm" },
        { text: "Magnification:", math: "m = v/u = 2 → image twice as tall, inverted, real" },
        { text: "Power of the lens:", math: "P = 1/f(metres) = 1/0.20 = +5 dioptres" },
        { text: "Move the object inside f (u = 15 cm) and the role flips:", math: "1/v = 1/20 − 1/15 = −1/60 → v = −60 cm: virtual, upright, magnifying" },
        { text: "That is exactly how a magnifying glass works — object inside the focal length.", math: "Same lens, two behaviours, decided only by where the object sits" },
      ],
      takeaway: "One equation, two regimes: object beyond f gives a real inverted image; object inside f gives the virtual upright magnifier. Every lens and mirror question is this comparison.",
    },
    theory: [
      { heading: "Reflection and mirrors", body: "Angle of incidence = angle of reflection, measured from the NORMAL. A concave mirror converges: parallel rays meet at f = R/2 — a shaving mirror up close, a solar collector far away. A convex mirror always gives a virtual, upright, diminished image — why vehicle mirrors warn 'objects are closer than they appear'." },
      { heading: "Refraction and Snell's law", body: "n₁ sin θ₁ = n₂ sin θ₂; light bends TOWARD the normal entering a denser medium because it slows (v = c/n). Beyond the critical angle θ_c = sin⁻¹(n₂/n₁), total internal reflection traps light — the whole operating principle of optical fibre and the sparkle of diamond (n = 2.42, θ_c ≈ 24°)." },
      { heading: "Real vs virtual — the exam distinction", body: "Real images form where rays actually meet (catchable on a screen); virtual images form where rays only APPEAR to diverge (seen by eye, never on screen). Magnification m = −v/u for mirrors: negative m means inverted." },
    ],
    confusions: [
      { wrong: "Virtual images are 'fake' and cannot be photographed.", right: "A camera can photograph a virtual image — your bathroom-mirror selfie is one.", why: "'Virtual' refers to where rays APPEAR to meet, not to non-existence." },
      { wrong: "Light bends toward the normal whenever it meets glass.", right: "Toward the normal going in (rare → dense), AWAY coming out — and past θ_c it does not exit at all.", why: "Only one direction of travel is usually drawn in textbooks." },
      { wrong: "A concave mirror always magnifies.", right: "Only inside the focal length; beyond the centre of curvature it gives a diminished, inverted real image.", why: "The magnifying-mirror case is over-generalized." },
    ],
    questions: [
      { q: "An object 10 cm tall stands 50 cm from a converging lens, f = 10 cm. Image position, nature and height?",
        a: "1/v = 1/10 − 1/50 = 4/50 → v = 12.5 cm, real, inverted; m = 12.5/50 = 0.25 → 2.5 cm tall.", hint: "Lens equation first, then m = v/u." },
      { q: "Find the critical angle for water (n = 1.33) to air.", a: "θ_c = sin⁻¹(1/1.33) ≈ 48.8° — beyond it, an underwater viewer sees a silver mirror instead of the surface.", hint: "sin θ_c = n₂/n₁." },
      { q: "Why does a pool look shallower than it is?",
        a: "Rays from the bottom bend away from the normal leaving water; tracing them back raises the apparent floor: real depth ≈ apparent depth × 1.33.", hint: "Refraction along the eye's line of sight." },
      { q: "A convex rear-view mirror has R = 4 m. A car 6 m away — image position and nature?",
        a: "f = −2 m (convex). 1/v = −1/2 + 1/6 = −1/3 → v = −3 m: virtual, upright, diminished (m = 0.5).", hint: "Convex mirror f is negative." },
    ],
  },
  "ph-th-electro": {
    proof: {
      title: "Proof on a specific case — three charges, one point of balance",
      case: "Charges: q₁ = +4 μC at x = 0, q₂ = −1 μC at x = 3 m. Where on the axis is E = 0? (k = 9×10⁹)",
      steps: [
        { text: "The zero must lie OUTSIDE the pair, on the side of the weaker charge — between them both fields point the same way.", math: "Let the point sit at x = d > 3 m" },
        { text: "Set the two fields equal:", math: "k(4)/d² = k(1)/(d−3)² → (d−3)² = d²/4" },
        { text: "Solve the quadratic in distance:", math: "d − 3 = d/2 → d = 6 m" },
        { text: "Verify the sense: at 6 m, q₁ pushes test charge +x with 1 k unit; q₂ pulls it +x with 1 k unit... wait — beyond q₂ the −1 μC pulls BACK toward −x.", math: "Recheck: E₁ = 4k/36 = k/9 (+x); E₂ = k/9 toward q₂ (−x) → they cancel ✓" },
        { text: "Potential there (scalar sum, sign included):", math: "V = k(4/6 + (−1)/3)·10⁻⁶ = k(0.667 − 0.333) μ ≠ 0 — E = 0 does NOT mean V = 0" },
      ],
      takeaway: "Fields are vectors (cancel by direction); potential is a signed scalar (adds algebraically). A point of zero field is generally NOT a point of zero potential.",
    },
    theory: [
      { heading: "Coulomb's law and the field idea", body: "F = kq₁q₂/r², k = 9×10⁹ N·m²/C² — the same inverse-square shape as gravity but 10³⁶ times stronger and two-signed. The electric field E = F/q is the force a +1 C probe would feel; field lines leave + charges and enter − ones, never crossing." },
      { heading: "Potential, energy and the electron-volt", body: "V = kq/r (volts), U = qV. Equipotential surfaces are ⊥ to field lines; moving a charge along one costs zero work. The electron-volt: 1 eV = 1.6×10⁻¹⁹ J — the energy an electron gains crossing 1 V, the natural currency of atomic physics." },
      { heading: "Capacitance — stored charge and energy", body: "C = Q/V; parallel-plate C = ε₀A/d. Energy stored U = ½CV². Inserting a dielectric (ε_r) multiplies C — that is exactly what touching a capacitor's plates with your hand or a dielectric slab does. Capacitors in parallel add (more area); in series, reciprocals add (bigger gap effectively)." },
    ],
    confusions: [
      { wrong: "Zero electric field means zero potential.", right: "Independent conditions — mid-way between equal like charges has E = 0 but V > 0.", why: "Field is the GRADIENT of potential; a flat spot on a hill is still on the hill." },
      { wrong: "A bigger capacitor stores more charge at any voltage.", right: "Q = CV — at fixed V, charge scales with C; but the rating V_max also matters.", why: "Capacitance and voltage rating are separate specs." },
      { wrong: "Field lines can cross where fields overlap.", right: "They never cross — one direction of E per point; overlapping fields ADD vectorially into one resultant.", why: "Lines are visualised one field at a time." },
    ],
    questions: [
      { q: "Two +5 μC charges sit 0.2 m apart. Force on each? (k = 9×10⁹)", a: "F = kq²/r² = 9×10⁹ × 25×10⁻¹² / 0.04 = 2.25 N, repulsive.", hint: "Square the charge; divide by r²." },
      { q: "A 12 V battery charges a 470 μF capacitor. Stored charge and energy?",
        a: "Q = CV = 5.64 mC; U = ½CV² = ½ × 470×10⁻⁶ × 144 ≈ 0.034 J.", hint: "Energy has the ½ factor." },
      { q: "An electron accelerates through 500 V. Final kinetic energy in eV and joules?",
        a: "500 eV = 8×10⁻¹⁷ J — starting from rest, KE = qV.", hint: "One volt gives one electron one eV." },
      { q: "Why does a comb charged by hair pick up neutral paper bits?",
        a: "The comb's field induces charge separation in the paper (polarization); the nearer opposite-induced charge is attracted more strongly than the farther like one — net attraction on a neutral body.", hint: "Induced dipoles feel a net force in a non-uniform field." },
    ],
  },
  "ph-th-current": {
    proof: {
      title: "Proof on a specific case — Kirchhoff on a two-loop circuit",
      case: "12 V battery with 2 Ω internal... simpler: two resistors 4 Ω and 6 Ω in parallel across 12 V with a 1 Ω series resistor",
      steps: [
        { text: "Parallel pair first:", math: "R_p = (4×6)/(4+6) = 2.4 Ω" },
        { text: "Total resistance seen by the battery:", math: "R = 1 + 2.4 = 3.4 Ω → I = 12/3.4 ≈ 3.53 A" },
        { text: "Voltage dropped on the series resistor:", math: "V₁ = 3.53 × 1 ≈ 3.53 V" },
        { text: "Remaining voltage across the parallel pair (Kirchhoff loop rule):", math: "V_p = 12 − 3.53 ≈ 8.47 V" },
        { text: "Branch currents (current rule: they must sum to 3.53 A):", math: "I₄ = 8.47/4 ≈ 2.12 A, I₆ = 8.47/6 ≈ 1.41 A; 2.12 + 1.41 ≈ 3.53 ✓" },
      ],
      takeaway: "The loop rule splits voltage; the junction rule splits current. Every circuit, however tangled, yields to these two bookkeeping laws.",
    },
    theory: [
      { heading: "Ohm's law and resistance", body: "V = IR for metallic conductors at steady temperature. R = ρL/A — longer wire resists more, thicker wire less; resistivity ρ is the material property. Metals: ρ rises with temperature (ions vibrate more). Semiconductors: opposite, which is why thermistors make good thermometers." },
      { heading: "Series and parallel in one breath", body: "Series: one path, same current, voltages divide, R adds. Parallel: same voltage, currents divide, 1/R adds — the total is always LESS than the smallest branch (extra path = easier flow). Power P = VI = I²R = V²/R; pick the form that matches what is held constant." },
      { heading: "EMF vs terminal voltage", body: "A real battery is an ideal EMF ε in series with internal resistance r. Terminal V = ε − Ir while delivering current and V = ε + Ir while being charged. A battery reads its EMF on an open circuit but less under load — the classic 'why does my battery sag' question." },
    ],
    confusions: [
      { wrong: "Current gets used up as it flows through resistors.", right: "Current is conserved — charge is never consumed; ENERGY is what converts to heat.", why: "The water analogy ('flow weakens') is misapplied; flow rate is constant in series." },
      { wrong: "Adding a resistor in parallel increases total resistance.", right: "It decreases it — a new path for charge.", why: "Series intuition (R adds) is over-applied." },
      { wrong: "The bigger resistor always dissipates more power.", right: "In series yes (P = I²R, same I); in parallel the SMALLER one wins (P = V²/R, same V).", why: "Pick the P-formula that matches the shared quantity." },
    ],
    questions: [
      { q: "A 6 Ω and 3 Ω resistor are in parallel across 12 V. Total current?",
        a: "R_p = 2 Ω → I = 6 A (4 A through 3 Ω, 2 A through 6 Ω).", hint: "Same voltage on both branches." },
      { q: "A battery of EMF 12 V, internal resistance 0.5 Ω drives a 5.5 Ω load. Terminal voltage?",
        a: "I = 12/6 = 2 A; V_terminal = 12 − 2×0.5 = 11 V.", hint: "Subtract the internal drop under load." },
      { q: "A 60 W and a 100 W bulb, both rated 220 V, are connected in SERIES to 220 V. Which glows brighter?",
        a: "The 60 W one — it has higher resistance (R = V²/P), and in series the higher-R bulb takes more power.", hint: "Rated powers assume parallel operation at 220 V." },
      { q: "Why do all the lights dim briefly when a heavy motor starts?",
        a: "The motor's startup inrush current raises the drop across the shared wiring (series resistance), lowering voltage available to everything downstream.", hint: "Think of the wiring as an unseen series resistor." },
    ],
  },
  "ph-th-emw": {
    proof: {
      title: "Proof on a specific case — building the whole spectrum from one wave",
      case: "An EM wave of wavelength 3 m (FM radio band). c = 3×10⁸ m/s",
      steps: [
        { text: "Frequency from the wave equation:", math: "f = c/λ = 3×10⁸ / 3 = 100 MHz ✓ (FM broadcast band)" },
        { text: "Period:", math: "T = 1/f = 10 ns" },
        { text: "The same equation maps the ENTIRE spectrum:", math: "λ = 500 nm → f = 6×10¹⁴ Hz (green light); λ = 0.1 nm → 3×10¹⁸ Hz (X-ray)" },
        { text: "Energy per photon climbs with frequency:", math: "E = hf = 6.63×10⁻³⁴ × 6×10¹⁴ ≈ 4×10⁻¹⁹ J ≈ 2.5 eV for green light" },
        { text: "Why radio passes walls but light does not:", math: "Wavelength 3 m vs wall features ~cm — diffraction carries radio around/through; 500 nm cannot 'see' a cm-scale gap the same way" },
      ],
      takeaway: "Radio, microwave, light, X-ray are ONE wave family differing only in frequency — c = fλ and E = hf convert between the three ways of naming the same thing.",
    },
    theory: [
      { heading: "What an EM wave is", body: "Oscillating E and B fields, mutually perpendicular and perpendicular to propagation (transverse), self-regenerating — no medium needed, which is why sunlight crosses vacuum. Speed in vacuum c = 1/√(ε₀μ₀) ≈ 3×10⁸ m/s falls out of pure electromagnetism." },
      { heading: "The spectrum by use", body: "Radio (broadcast, MRI), microwave (ovens, radar, Wi-Fi), infrared (remotes, thermal imaging), visible (400–700 nm), UV (sunburn, sterilisation), X-ray (imaging), gamma (cancer radiotherapy). Frequency ↑ ⇒ photon energy ↑ ⇒ ionising ability ↑ — the safety line sits in the UV." },
      { heading: "Polarisation proves transversality", body: "Only transverse waves polarise. Pass light through one polaroid: intensity halves. Through a second at angle θ: Malus's law I = I₀cos²θ — at 90°, nothing. Sound (longitudinal) has no polariser; polarising sunglasses cut glare because reflected light is partially polarised horizontally." },
    ],
    confusions: [
      { wrong: "EM waves need air like sound does.", right: "They are self-sustaining field oscillations — the Sun's light and heat reach us through vacuum.", why: "Sound experience dominates intuition." },
      { wrong: "Microwaves heat food because they are extremely hot.", right: "They make water molecules rotate; friction between rotating molecules converts that motion to heat.", why: "Temperature is a property of matter, not of radiation." },
      { wrong: "X-rays and radio waves are fundamentally different kinds of things.", right: "Same electromagnetic wave; only frequency differs by ~10 orders of magnitude.", why: "Different detectors and names hide the unity." },
    ],
    questions: [
      { q: "A Wi-Fi router works at 2.45 GHz. Wavelength?", a: "λ = c/f = 3×10⁸/2.45×10⁹ ≈ 12.2 cm — sized to resonate with water molecules.", hint: "λ = c/f." },
      { q: "Unpolarised light of intensity I₀ passes two polaroids at 30°. Output intensity?",
        a: "First polaroid: I₀/2. Second: (I₀/2)cos²30° = 3I₀/8.", hint: "Malus's law after the first halving." },
      { q: "Why are gamma rays used to sterilise medical equipment but radio waves never could be?",
        a: "Gamma photons carry MeV energies — enough to destroy microbial DNA regardless of penetration depth; radio photons are a billionth of that and merely warm.", hint: "Ionisation needs eV-scale photons." },
      { q: "Green light (λ = 550 nm) enters glass with n = 1.5. What changes — speed, wavelength, frequency?",
        a: "Speed and wavelength drop by 1.5 (v = 2×10⁸ m/s, λ ≈ 367 nm); frequency NEVER changes — colour is frequency.", hint: "The source sets the frequency; the medium sets the speed." },
    ],
  },
  "ph-th-modern": {
    proof: {
      title: "Proof on a specific case — the photoelectric effect decides light's nature",
      case: "Sodium surface: work function φ = 2.3 eV. Light of λ = 400 nm falls on it",
      steps: [
        { text: "Photon energy:", math: "E = hc/λ = 1240 eV·nm / 400 nm = 3.1 eV" },
        { text: "Einstein's photoelectric equation:", math: "KE_max = E − φ = 3.1 − 2.3 = 0.8 eV" },
        { text: "Threshold wavelength — longer than this, NOTHING is emitted:", math: "λ₀ = 1240/2.3 ≈ 539 nm (green). Red light, however bright, ejects nothing" },
        { text: "Intensity changes the COUNT, not the energy:", math: "Brighter 400 nm light → more electrons, each still at 0.8 eV max" },
        { text: "Stopping voltage to halt the fastest electron:", math: "eV_s = KE_max → V_s = 0.8 V" },
      ],
      takeaway: "One photon acts on one electron. Frequency decides IF electrons leave and how fast; intensity decides HOW MANY. Wave theory fails this — the photoelectric effect is light behaving as particles.",
    },
    theory: [
      { heading: "Photons and the quantum leap", body: "Light energy comes in packets E = hf. Bohr's atom: electrons occupy quantized orbits, and light is emitted only in jumps: hν = E₂ − E₁. This single rule explains discrete line spectra — each element's barcode — and why atoms are stable instead of spiralling into the nucleus." },
      { heading: "Wave–particle duality for matter too", body: "de Broglie: λ = h/p. An electron accelerated through 100 V has λ ≈ 0.12 nm — atomic spacing size, which is exactly why electron microscopes resolve atoms and light microscopes cannot. Diffraction of electrons (Davisson–Germer) proved matter waves are real." },
      { heading: "The nucleus and binding energy", body: "Nucleons are held by the strong force against proton repulsion; mass defect Δm = (Zm_p + Nm_n − M_nucleus) converts via E = Δmc². Fusion powers stars up to iron; fission splits heavy nuclei — both release energy by moving TOWARD iron's binding-energy peak. Half-life is memoryless: N = N₀(½)^(t/T)." },
    ],
    confusions: [
      { wrong: "Brighter red light will eventually eject electrons.", right: "Below threshold frequency, NO intensity ejects anything — energy per photon is what matters.", why: "Wave thinking says amplitude stores the energy; quanta say otherwise." },
      { wrong: "Electrons orbit the nucleus like planets.", right: "They exist as standing-wave probability clouds (orbitals); Bohr's orbits were a stepping stone.", why: "The solar-system diagram is memorable and wrong." },
      { wrong: "Half-life means the material 'wears out' after two half-lives.", right: "After two half-lives 25% remains; decay probability per nucleus per second never changes.", why: "Ageing intuition applied to a memoryless random process." },
    ],
    questions: [
      { q: "Light of λ = 600 nm hits sodium (φ = 2.3 eV). Emitted?",
        a: "E = 1240/600 ≈ 2.07 eV < 2.3 eV → no emission, whatever the intensity.", hint: "Compare photon energy to work function." },
      { q: "Find the wavelengths of hydrogen's 3→2 transition (E₃ = −1.51 eV, E₂ = −3.4 eV) and name the colour.",
        a: "ΔE = 1.89 eV → λ = 1240/1.89 ≈ 656 nm — the red H-alpha line.", hint: "hν = E_high − E_low." },
      { q: "An electron and a proton have the same kinetic energy. Which has the longer de Broglie wavelength?",
        a: "The electron — λ = h/√(2mE), and smaller mass gives longer λ. This is why electron microscopes beat light microscopes.", hint: "λ scales with 1/√m." },
      { q: "A sample's activity falls to 12.5% in 15,000 years. Half-life and age?",
        a: "12.5% = (½)³ → three half-lives → T = 5000 years.", hint: "Count the halvings." },
    ],
  },
  "ch-th-atomic": {
    proof: {
      title: "Proof on a specific case — writing an element's full electronic address",
      case: "Chlorine, Z = 17 — build its configuration and read off its chemistry",
      steps: [
        { text: "Fill by the Aufbau order (1s 2s 2p 3s 3p 4s 3d…):", math: "Cl: 1s² 2s² 2p⁶ 3s² 3p⁵" },
        { text: "Count the valence shell — the chemistry lives here:", math: "n = 3 shell: 3s² 3p⁵ → 7 valence electrons, ONE short of an octet" },
        { text: "That shortage predicts everything:", math: "Cl grabs one electron → Cl⁻, reacts with Na (which has ONE to spare) → NaCl" },
        { text: "Bohr cross-check on the 3rd ionisation energy jump:", math: "Removing e⁻ #8 (from 2p) costs far more than #7 (3p) — shells are real energy steps" },
        { text: "Orbital diagram for 3p⁵ — Hund's rule:", math: "[↑↓][↑↓][↑] three p orbitals, one unpaired → paramagnetic, forms one covalent bond" },
      ],
      takeaway: "Configuration is not memorisation: read the valence count straight off the notation and it PREDICTS the ion charge, the bond count and the position in the periodic table.",
    },
    theory: [
      { heading: "From Bohr to orbitals", body: "Bor fixed spectra with quantized orbits (E_n = −13.6/n² eV for H) but broke on multi-electron atoms. Quantum mechanics replaces orbits with orbitals — probability clouds from the Schrödinger equation, labelled by four quantum numbers: n (size/energy), l (shape s,p,d,f), m_l (orientation), m_s (spin ±½)." },
      { heading: "The three filling rules", body: "Aufbau: fill lowest energy first. Pauli: an orbital holds at most 2 electrons of opposite spin. Hund: degenerate orbitals fill singly with parallel spins before pairing — this maximises unpaired electrons and explains why chromium is [Ar]3d⁵4s¹, not the naive prediction." },
      { heading: "Why the periodic table works", body: "Groups = same outer configuration (all halogens end ns²np⁵, hence identical chemistry). Periods = filling a new shell. Atomic radius shrinks across a period (more nuclear charge, same shell) and grows down a group (new shell) — one trend line that explains ionisation energy, electronegativity and metallic character at a stroke." },
    ],
    confusions: [
      { wrong: "Electrons spin around the nucleus like planets on fixed paths.", right: "Orbitals are standing-wave probability clouds; the 'orbit' picture is a discarded model.", why: "Bohr's diagram survives in every textbook as a stepping stone." },
      { wrong: "4s fills before 3d, so it must also be written before 3d always.", right: "Filling order ≠ removal order: transition metals lose 4s first when ionising.", why: "The Aufbau order is a filling map, not an energy ranking once d electrons arrive." },
      { wrong: "Atoms 'want' a full octet by desire.", right: "Octet stability is an energy consequence — filled shells are lower in energy; anthropomorphic language hides the physics.", why: "School phrasing ('wants') gets taken literally." },
    ],
    questions: [
      { q: "Write the configuration of Fe (Z = 26) and predict its common ion charges.", a: "[Ar]3d⁶4s². Loses 4s first: Fe²⁺ = [Ar]3d⁶; Fe³⁺ = [Ar]3d⁵ — extra stable half-filled d⁵, hence the abundance of Fe³⁺.", hint: "4s electrons leave first." },
      { q: "How many unpaired electrons does nitrogen (Z = 7) have, and what does that predict?",
        a: "2p³ → three unpaired → forms three covalent bonds (NH₃) and is paramagnetic in atomic form.", hint: "Draw the 2p orbital boxes." },
      { q: "Why is the second ionisation energy of sodium enormous compared with the first?",
        a: "Na⁺ already has a noble-gas configuration (2,8); the next electron must be ripped from a complete inner shell against a much stronger net pull.", hint: "Think shell-hopping, not gradual increase." },
      { q: "Hydrogen's Lyman and Balmer series — which lies in the visible range and why?",
        a: "Balmer (transitions ending n = 2) — smaller energy gaps emit longer wavelengths; Lyman (ending n = 1) is deep UV.", hint: "λ = 1240/ΔE(eV) nm." },
    ],
  },
  "ch-th-bonding": {
    proof: {
      title: "Proof on a specific case — predicting shape and polarity of H₂O vs CO₂",
      case: "Two molecules, both with polar bonds — only one is a polar molecule",
      steps: [
        { text: "Count electron domains around each central atom (VSEPR):", math: "C in CO₂: 2 domains → linear 180°. O in H₂O: 4 domains (2 bonds + 2 lone pairs) → tetrahedral electron geometry" },
        { text: "Lone pairs compress the molecular shape:", math: "H₂O: bent, 104.5° (from 109.5°, squeezed by two lone pairs; NH₃ with one LP is 107°)" },
        { text: "Now add bond dipoles as vectors:", math: "CO₂: two equal C=O dipoles pointing opposite → cancel → NONPOLAR" },
        { text: "Water's bent geometry cannot cancel:", math: "Two O–H dipoles at 104.5° → net dipole ≈ 1.85 D toward O → POLAR" },
        { text: "The consequences are enormous:", math: "Polar H₂O dissolves salts, boils at 100 °C (H-bonding), rides solvent of life; nonpolar CO₂ is a gas that slips out of soda" },
      ],
      takeaway: "Shape decides polarity, polarity decides solubility, boiling point and biology. VSEPR is not a diagram exercise — it is the switch that sets all of it.",
    },
    theory: [
      { heading: "The bond spectrum", body: "Ionic (metal + non-metal, ΔEN > ~1.7, electron transferred, high mp, conducts when molten/aqueous), covalent (non-metals share; polar if ΔEN differs), metallic (cation lattice in a delocalised electron sea — mobile electrons explain conductivity, malleability and lustre). They are points on ONE electronegativity continuum, not separate categories." },
      { heading: "VSEPR in four steps", body: "1) Draw the Lewis structure. 2) Count bonding + lone domains (multiple bonds count as ONE domain). 3) Arrange domains to maximise separation. 4) Name the MOLECULAR shape after ignoring lone-pair positions. Lone pairs repel hardest: LP–LP > LP–BP > BP–BP." },
      { heading: "σ, π and why double bonds are rigid", body: "σ bonds form head-on overlap (free rotation allowed); π bonds form side-on overlap of parallel p orbitals and break if twisted — so C=C locks the molecule flat and creates cis–trans isomerism. π electrons are more exposed, which is why alkenes react where alkanes ignore everything." },
    ],
    confusions: [
      { wrong: "Polar bonds always make a polar molecule.", right: "Only if the dipoles do not cancel by symmetry — CO₂'s bonds are polar, the molecule is not.", why: "Bond-level thinking is not extended to molecular geometry." },
      { wrong: "Ionic bonds are stronger than every covalent bond.", right: "C–H (~413 kJ/mol) beats many ionic lattice bonds per bond; compare lattice energy vs bond energy properly.", why: "'Complete transfer feels stronger' is intuition, not energetics." },
      { wrong: "A double bond is just two identical bonds.", right: "One σ + one π — the π pair is weaker, more exposed and locks rotation.", why: "The 'two lines' notation hides two different overlap types." },
    ],
    questions: [
      { q: "Predict the shape and polarity of NH₃ and BF₃.", a: "NH₃: 4 domains, 1 LP → trigonal pyramidal 107°, polar. BF₃: 3 domains, no LP → trigonal planar 120°, dipoles cancel, nonpolar.", hint: "Count domains, then subtract lone pairs for the shape." },
      { q: "Why does diamond melt at 3500 °C while CO₂ is a gas, though both are covalent?",
        a: "Diamond is a giant covalent NETWORK — every C bonded to 4 C in a 3D lattice; CO₂ is small discrete molecules with only weak intermolecular forces to break.", hint: "Intramolecular vs intermolecular strength." },
      { q: "Explain why metals conduct but solid NaCl does not.", a: "Metallic bond = delocalised mobile electrons. Solid NaCl's charges are locked in the lattice; only molten or dissolved NaCl conducts (mobile ions).", hint: "Ask what charge carrier is free to move." },
      { q: "Why can't you rotate around the C=C of a 2-butene?",
        a: "Rotation would break the π bond (side-on p overlap needs parallel orbitals) — so cis and trans isomers are distinct, stable compounds.", hint: "What must happen to the p orbitals to twist?" },
    ],
  },
  "ch-th-eq": {
    proof: {
      title: "Proof on a specific case — computing Kc and reading Le Chatelier",
      case: "N₂(g) + 3H₂(g) ⇌ 2NH₃(g). At equilibrium: [N₂] = 0.5 M, [H₂] = 1.5 M, [NH₃] = 2.0 M",
      steps: [
        { text: "Write Kc from the balanced equation (coefficients become powers):", math: "Kc = [NH₃]²/([N₂][H₂]³) = 4/(0.5 × 3.375) ≈ 2.37" },
        { text: "Compress the mixture to half the volume — concentrations double:", math: "Q = 16/(1 × 27) = 0.59 < Kc → system shifts toward NH₃ (fewer moles)" },
        { text: "Le Chatelier in mole language:", math: "4 mol gas → 2 mol gas: pressure increase favours the side with FEWER gas moles" },
        { text: "Add H₂ at constant volume:", math: "Q drops below Kc → shift consumes the added H₂ — but Kc itself NEVER changes" },
        { text: "Only temperature changes K:", math: "Exothermic forward + heat ⇒ raising T shifts backward and lowers Kc" },
      ],
      takeaway: "Concentration/pressure shifts move the POSITION of equilibrium; temperature moves the VALUE of K. Industrial ammonia synthesis exploits all three at once (high P, moderate T, catalyst for speed).",
    },
    theory: [
      { heading: "Dynamic equilibrium", body: "At equilibrium, forward and reverse rates are EQUAL — not zero. Molecules convert both ways at the same rate, so concentrations stay constant. Kc > 1 means products dominate; Kc < 1 reactants. The double arrow is a statement about rates, not about equal amounts." },
      { heading: "Q versus K — the working tool", body: "Compute the same expression with CURRENT concentrations: Q < K → shifts forward; Q > K → shifts backward; Q = K → at equilibrium. This single comparison answers every 'which way does it shift' question without any new theory." },
      { heading: "Kp and industrial practice", body: "Kp uses partial pressures; Kp = Kc(RT)^Δn for gas reactions. Haber process: N₂ + 3H₂ ⇌ 2NH₃ is exothermic and mole-reducing → high pressure favours NH₃ but high temperature (needed for speed) fights the yield; the compromise is ~450 °C, 200 atm, Fe catalyst." },
    ],
    confusions: [
      { wrong: "A catalyst shifts equilibrium toward products.", right: "It speeds BOTH directions equally — equilibrium arrives faster but at the same composition.", why: "Catalysts are marketed as 'improving' reactions in every sense." },
      { wrong: "At equilibrium the forward and reverse reactions have stopped.", right: "They run at equal rates — dynamic, not dead.", why: "'No change' is read as 'no activity'." },
      { wrong: "Adding an inert gas at constant volume shifts the equilibrium.", right: "Partial pressures of reactants/products are unchanged → no shift (at constant pressure it would dilute and shift toward more moles).", why: "'More gas = more pressure' ignores who the pressure belongs to." },
    ],
    questions: [
      { q: "For H₂ + I₂ ⇌ 2HI, Kc = 50. If Q = 20 right now, which way does it go?",
        a: "Q < K → shifts forward, making more HI until Q rises to 50.", hint: "Compare Q to K, nothing else." },
      { q: "2SO₂ + O₂ ⇌ 2SO₃, ΔH negative. Predict the yield change if temperature rises.",
        a: "Yield falls — exothermic forward means added heat drives the reverse direction, and Kc itself decreases.", hint: "Heat is a 'product' here." },
      { q: "Why does the Haber process use ~450 °C rather than the lower temperatures that would give better yield?",
        a: "Rate matters: too cold and equilibrium is reached too slowly to be industrial; the catalyst plus pressure recovers practical output.", hint: "Equilibrium position vs time-to-equilibrium." },
      { q: "Write Kc for CaCO₃(s) ⇌ CaO(s) + CO₂(g). Why do the solids not appear?",
        a: "Kc = [CO₂] — pure solids have constant 'concentration' folded into K. The equilibrium CO₂ pressure over limestone depends only on temperature.", hint: "Only aqueous/gaseous species enter K." },
    ],
  },
  "ch-th-thermo": {
    proof: {
      title: "Proof on a specific case — Hess's law on a reaction you cannot measure directly",
      case: "Find ΔH for C(s) + ½O₂(g) → CO(g), which cannot be burned cleanly to only CO",
      steps: [
        { text: "Measure (or look up) two reactions that CAN be run:", math: "C + O₂ → CO₂, ΔH₁ = −393.5 kJ/mol" },
        { text: "Second known step:", math: "CO + ½O₂ → CO₂, ΔH₂ = −283.0 kJ/mol" },
        { text: "Reverse the second and add (Hess's law — enthalpy is path-independent):", math: "CO₂ → CO + ½O₂, ΔH₂' = +283.0 kJ/mol" },
        { text: "Sum the equations; CO₂ cancels:", math: "C + ½O₂ → CO, ΔH = −393.5 + 283.0 = −110.5 kJ/mol" },
        { text: "Energy ledger check:", math: "Burning C→CO→CO₂ releases 110.5 + 283.0 = 393.5 kJ — the same as direct burning ✓" },
      ],
      takeaway: "Enthalpy is a state function: only the endpoints matter. Any route you can construct on paper gives the answer — that is the entire power of Hess's law.",
    },
    theory: [
      { heading: "Enthalpy and exo/endothermic", body: "ΔH = H(products) − H(reactants). Negative → heat released (combustion, neutralisation, most formations); positive → absorbed (decomposition, photosynthesis). Bond-breaking always costs energy; bond-making always pays it back — ΔH is the net receipt." },
      { heading: "Entropy — counting the ways", body: "S measures dispersal: gases >> liquids > solids; more particles, more disorder. ΔS is reliably positive on melting, vaporising, dissolving a gas in... careful: dissolving a GAS in water DECREASES S. The second law: total ΔS_universe > 0 for spontaneous change." },
      { heading: "Gibbs free energy — the decider", body: "ΔG = ΔH − TΔS. Spontaneous when ΔG < 0. Four regimes: exothermic + entropy-up = always spontaneous; endothermic + entropy-up = spontaneous only hot; exothermic + entropy-down = spontaneous only cold; both bad = never. Temperature literally switches the verdict — melting ice (ΔH > 0, ΔS > 0) is spontaneous only above 0 °C." },
    ],
    confusions: [
      { wrong: "Exothermic reactions are always spontaneous.", right: "Mostly, but entropy matters: endothermic processes like ice melting happen spontaneously above 0 °C.", why: "ΔH alone is taught first and over-trusted." },
      { wrong: "ΔG = 0 means the reaction is balanced out and finished.", right: "ΔG = 0 means EQUILIBRIUM — forward and reverse rates equal; nothing 'finishes'.", why: "Confusing spontaneity with completion." },
      { wrong: "Spontaneous means fast.", right: "Diamond → graphite is spontaneous (ΔG < 0) but takes geological ages — kinetics, not thermodynamics, sets speed.", why: "The two disciplines answer different questions." },
    ],
    questions: [
      { q: "Given ΔH_f: CO₂ = −393.5, H₂O(l) = −285.8, CH₄ = −74.8 kJ/mol — find ΔH of combustion of CH₄.",
        a: "ΔH = [−393.5 + 2(−285.8)] − [−74.8] = −890.3 kJ/mol.", hint: "Products minus reactants, coefficients included." },
      { q: "ΔH = +50 kJ, ΔS = +150 J/K. Above what temperature is it spontaneous?",
        a: "T > ΔH/ΔS = 50000/150 ≈ 333 K — entropy wins once it is hot enough.", hint: "Set ΔG = 0." },
      { q: "Why does water freezing release heat although it is spontaneous below 0 °C?",
        a: "ΔH < 0 (heat released) but ΔS < 0 (order increases); below 273 K the −TΔS term is small enough that ΔG < 0.", hint: "ΔG = ΔH − TΔS with negative ΔS." },
      { q: "Rank S° for: H₂O(g), H₂O(l), H₂O(s), and justify.", a: "gas > liquid > solid — molecular freedom of dispersal falls as bonding locks particles in place.", hint: "Count the ways to arrange the molecules." },
    ],
  },
  "ch-th-kinetics": {
    proof: {
      title: "Proof on a specific case — finding reaction order from data",
      case: "Rate data for A → products: [A] = 0.1 M → rate 0.01 M/s; [A] = 0.2 M → rate 0.04 M/s; [A] = 0.3 M → rate 0.09 M/s",
      steps: [
        { text: "Test first order (doubling should double rate):", math: "0.1→0.2 doubled [A], rate ×4 — not first order" },
        { text: "Test second order (rate ∝ [A]²):", math: "(0.2/0.1)² = 4 ✓ and (0.3/0.1)² = 9 ✓ → second order" },
        { text: "Rate law:", math: "rate = k[A]²; k = 0.01/(0.1)² = 1.0 M⁻¹s⁻¹" },
        { text: "Predict the rate at [A] = 0.5 M:", math: "rate = 1.0 × 0.25 = 0.25 M/s" },
        { text: "Units of k encode the order:", math: "zero: M·s⁻¹, first: s⁻¹, second: M⁻¹·s⁻¹ — a free exam check" },
      ],
      takeaway: "Order comes from DATA, never from the balanced equation. Compare two experiments, see how rate responds to concentration, and k follows with its tell-tale units.",
    },
    theory: [
      { heading: "Collision theory", body: "Reacting particles must collide with (1) enough energy to reach the transition state and (2) the right orientation. Rate = collision frequency × fraction with E ≥ E_a × orientation factor. Every rate-changing trick works through one of these three doors." },
      { heading: "The Arrhenius equation", body: "k = A·e^(−Ea/RT). Raising T increases the exponentially-small fraction of energetic collisions — a 10 °C rise often doubles or triples rate (food spoils fast, fridges work). A catalyst offers a LOWER Ea pathway: same ΔH, faster reaction, unchanged equilibrium." },
      { heading: "Half-life behaviour", body: "First order: t½ = 0.693/k, independent of concentration — every half-life takes the same time (radioactive decay, drug metabolism). Second order: t½ ∝ 1/[A]₀ — slows as it goes. Zero order: constant rate until reactant runs out." },
    ],
    confusions: [
      { wrong: "The order equals the coefficient in the balanced equation.", right: "Order is experimental; coefficients match only for elementary single-step reactions.", why: "Balanced equations are bookkeeping, not mechanism." },
      { wrong: "A catalyst changes ΔH or the equilibrium position.", right: "It lowers Ea only — same start, same end, same K, just faster.", why: "Energy-diagram 'shortcut' is misread as changing the destination." },
      { wrong: "Temperature affects rate by making particles move 'hotter'.",
        right: "More precisely: it steepens the Maxwell–Boltzmann tail — the fraction of collisions exceeding Ea grows exponentially.", why: "The vague 'hotter molecules' story hides the exponential in k = Ae^(−Ea/RT)." },
    ],
    questions: [
      { q: "A first-order reaction has t½ = 20 min. What fraction remains after 60 min?",
        a: "Three half-lives → (½)³ = 12.5%.", hint: "First-order half-lives stack uniformly." },
      { q: "Rate doubles when T rises from 300 K to 310 K. Estimate Ea.",
        a: "2 = e^(Ea/R × (1/300 − 1/310)) → Ea ≈ 54 kJ/mol.", hint: "Use the two-point Arrhenius form." },
      { q: "Why does finely powdered zinc react faster with HCl than a lump of the same mass?",
        a: "Surface area → more collision sites per second; same Ea, same k per site, more sites.", hint: "Collision frequency door." },
      { q: "A reaction is zero order in a reactant. What happens to its rate as the reactant is consumed?",
        a: "Nothing — rate is independent of its concentration until it runs out entirely (common on saturated catalyst surfaces).", hint: "Zero order means the rate law ignores it." },
    ],
  },
  "ch-th-acid": {
    proof: {
      title: "Proof on a specific case — pH of a weak acid, done properly",
      case: "0.1 M acetic acid, Ka = 1.8×10⁻⁵",
      steps: [
        { text: "Weak acid equilibrium:", math: "CH₃COOH ⇌ H⁺ + CH₃COO⁻" },
        { text: "If it were strong, pH would be 1. It is not — most stays undissociated:", math: "Ka = x²/(0.1 − x) ≈ x²/0.1 → x = √(1.8×10⁻⁶) ≈ 4.24×10⁻³ M" },
        { text: "Only ~4% dissociated (check the approximation: x/0.1 = 4.2% < 5% ✓):", math: "pH = −log(4.24×10⁻³) ≈ 2.37" },
        { text: "Compare a strong acid at the same concentration:", math: "0.1 M HCl → pH = 1.0 — a full 1.4 pH units lower" },
        { text: "Dilution law check:", math: "pH = ½(pKa − log C) = ½(4.74 + 1) = 2.87? Only when x << C — here 2.37 wins; the shortcut fails at 4% ionisation" },
      ],
      takeaway: "Weak ≠ diluted: a weak acid at 0.1 M is still ~4% ionised. Solve the equilibrium, then check your approximation — that habit is the whole skill.",
    },
    theory: [
      { heading: "Three definitions, one ladder", body: "Arrhenius: acid gives H⁺, base gives OH⁻ (water only). Brønsted–Lowry: acid = proton donor, base = proton acceptor (explains NH₃ as a base). Lewis: acid = electron-pair acceptor, base = donor (explains BF₃ + NH₃ with no proton anywhere). Each level covers more reactions." },
      { heading: "pH, Kw and strength", body: "pH = −log[H⁺]; Kw = [H⁺][OH⁻] = 10⁻¹⁴ at 25 °C, so pH + pOH = 14. Strong acids (HCl, H₂SO₄, HNO₃) dissociate ~100%; weak acids sit at equilibrium with Ka. pH of a 10⁻⁸ M HCl solution is NOT 8 — water's own H⁺ dominates; the answer is ≈ 6.98." },
      { heading: "Buffers and titration", body: "A buffer = weak acid + its conjugate base resists pH change (added base is mopped up by the acid, added acid by the base). Henderson–Hasselbalch: pH = pKa + log([salt]/[acid]). Titration of weak acid with strong base has equivalence point ABOVE 7 (conjugate base hydrolyses) — so phenolphthalein, not methyl orange." },
    ],
    confusions: [
      { wrong: "A stronger acid always has higher pH-lowering power regardless of concentration.", right: "pH depends on BOTH strength and concentration — 0.001 M HCl (pH 3) is milder than 1 M acetic acid (pH ≈ 2.4).", why: "Strength (Ka) and amount are conflated." },
      { wrong: "pH 7 means 'no acid present'.",
        right: "It means [H⁺] = [OH⁻] = 10⁻⁷ M — both ions are always present in water.", why: "Neutral is mistaken for empty." },
      { wrong: "The equivalence point of any titration is pH 7.", right: "Only strong–strong. Weak–strong lands above 7, strong–weak below 7.", why: "One titration curve is memorised and generalized." },
    ],
    questions: [
      { q: "pH of 0.01 M HCl?", a: "Strong acid: [H⁺] = 0.01 → pH = 2.", hint: "No equilibrium needed for strong acids." },
      { q: "A buffer has equal moles of CH₃COOH and CH₃COONa. Its pH? (pKa = 4.74)",
        a: "pH = pKa + log(1) = 4.74 — the classic half-neutralisation point.", hint: "log(1) = 0." },
      { q: "Why is an ammonium chloride solution acidic?",
        a: "NH₄⁺ is the conjugate acid of a weak base — it donates a proton to water: NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺ → pH < 7.", hint: "Salt hydrolysis: ask where the ion came from." },
      { q: "During a weak acid–strong base titration, why does pH change slowly near the start then leap at equivalence?",
        a: "Early on the buffer (HA/A⁻ pair) resists change; once the acid is exhausted, added OH⁻ meets no mop and pH jumps several units.", hint: "Buffer capacity has a limit." },
    ],
  },
  "ch-th-redox": {
    proof: {
      title: "Proof on a specific case — assigning oxidation numbers and balancing by half-reactions",
      case: "MnO₄⁻ + Fe²⁺ → Mn²⁺ + Fe³⁺ (acidic solution)",
      steps: [
        { text: "Oxidation numbers: O is −2, so in MnO₄⁻:", math: "Mn + 4(−2) = −1 → Mn = +7" },
        { text: "Track both changes:", math: "Mn: +7 → +2 (gains 5 e⁻, reduced). Fe: +2 → +3 (loses 1 e⁻, oxidised)" },
        { text: "Equalise electrons — 5 Fe²⁺ per MnO₄⁻:", math: "MnO₄⁻ + 5Fe²⁺ → Mn²⁺ + 5Fe³⁺" },
        { text: "Balance O with H₂O and H with H⁺:", math: "MnO₄⁻ + 8H⁺ + 5Fe²⁺ → Mn²⁺ + 4H₂O + 5Fe³⁺" },
        { text: "Charge check (the ultimate validator):", math: "Left: −1 + 8 + 10 = +17. Right: +2 + 15 = +17 ✓" },
      ],
      takeaway: "Oxidation is electron LOSS (OIL RIG). Balance electrons between half-reactions, then charge-check — if charges don't match, the equation is wrong, guaranteed.",
    },
    theory: [
      { heading: "Definitions that never fail", body: "Oxidation = loss of electrons / increase in oxidation number; reduction = gain / decrease. The oxidising agent IS reduced (it takes electrons); the reducing agent IS oxidised. Element → 0; O → −2 (except peroxides); H → +1 (except metal hydrides)." },
      { heading: "Electrochemical cells", body: "Oxidation at the ANODE, reduction at the CATHODE — in BOTH cell types; only the sign labels differ (galvanic: anode is −; electrolytic: anode is +). E°cell = E°cathode − E°anode > 0 for spontaneous cells. Electrons flow anode → cathode through the wire; ions migrate through the salt bridge to keep neutrality." },
      { heading: "Everyday redox", body: "Rusting: Fe → Fe²⁺ → Fe₂O₃·xH₂O, accelerated by salt (better electrolyte) and stopped by galvanising (sacrificial Zn oxidises first) or painting (blocks O₂/H₂O). Batteries, metabolism (glucose oxidation), bleaching and corrosion are all the same electron-transfer bookkeeping." },
    ],
    confusions: [
      { wrong: "Oxidation means adding oxygen only.", right: "That is one historical case; the general definition is electron loss — e.g. Fe²⁺ → Fe³⁺ with no oxygen involved.", why: "The word's origin dominates memory." },
      { wrong: "The reducing agent gets reduced.", right: "It CAUSES reduction by being oxidised itself — it donates the electrons.", why: "Agent and process are swapped." },
      { wrong: "In an electrolytic cell the anode is negative like in a battery.", right: "Anode = oxidation ALWAYS; but in electrolysis the anode is forced positive by the external supply.", why: "Sign labels flip; chemistry labels don't." },
    ],
    questions: [
      { q: "Assign oxidation numbers to S in H₂SO₄ and in SO₃²⁻.",
        a: "H₂SO₄: 2(+1) + S + 4(−2) = 0 → S = +6. SO₃²⁻: S + 3(−2) = −2 → S = +4.", hint: "O is −2, H is +1; the sum equals the charge." },
      { q: "Balance: Cr₂O₇²⁻ + C₂O₄²⁻ → Cr³⁺ + CO₂ (acidic).",
        a: "Cr₂O₇²⁻ + 14H⁺ + 3C₂O₄²⁻ → 2Cr³⁺ + 7H₂O + 6CO₂ (6 e⁻ per dichromate vs 2 e⁻ per oxalate → ×3).", hint: "Equalise electrons first, then H₂O/H⁺." },
      { q: "Why does zinc coating (galvanising) protect steel better than paint once scratched?",
        a: "Zn is more easily oxidised (E° = −0.76 V vs Fe's −0.44 V) — it corrodes sacrificially even where the steel is exposed; paint protects only while intact.", hint: "Compare standard electrode potentials." },
      { q: "A cell has E°cell = −0.46 V. Spontaneous? What does it take to run it?",
        a: "Not spontaneous — needs ≥0.46 V external supply (electrolysis), e.g. charging a battery.", hint: "Positive E°cell ⇔ negative ΔG." },
    ],
  },
  "ch-th-organic": {
    proof: {
      title: "Proof on a specific case — name a compound from scratch and predict its reaction",
      case: "CH₃–CH₂–CH(OH)–CH₃ — name it, class it, predict its oxidation",
      steps: [
        { text: "Find the longest chain containing the highest-priority group (OH):", math: "4 carbons → butane backbone" },
        { text: "Number from the end nearest the OH:", math: "OH on C2 → butan-2-ol (not butan-3-ol)" },
        { text: "Class by the carbon bearing OH:", math: "C2 carries two other carbons → SECONDARY alcohol" },
        { text: "Oxidation prediction follows the class:", math: "2° alcohol + K₂Cr₂O₇/H⁺ → butanone (ketone); a 1° alcohol would give aldehyde → acid" },
        { text: "Dehydration check:", math: "conc. H₂SO₄, heat → but-2-ene major (Zaitsev: more substituted alkene wins) + but-1-ene minor" },
      ],
      takeaway: "Nomenclature is not trivia — the name encodes the class, and the class predicts the oxidation product and the elimination outcome. Read the structure like a recipe.",
    },
    theory: [
      { heading: "Hydrocarbons: the scaffold", body: "Alkanes (CnH2n+2, σ only, substitution reactions, saturated) → alkenes (C=C, π exposed, addition reactions, decolourise bromine water) → alkynes (C≡C) → arenes (benzene's delocalised π ring: substitution preferred, addition destroys aromatic stability)." },
      { heading: "Functional groups are the chemistry", body: "Priority for naming: COOH > ester > amide > nitrile > aldehyde > ketone > alcohol > amine > alkene. Each group is a reaction handle: –OH oxidises/substitutes, C=O adds nucleophiles, –COOH is acidic, esters hydrolyse, amines are basic. Learn the group, predict the reaction." },
      { heading: "Isomerism and homologous series", body: "Structural isomers share formula, differ in skeleton/position (butane vs isobutane; propan-1-ol vs propan-2-ol — different oxidation products!). Geometric (cis/trans) needs a rigid π bond; optical needs a chiral centre — two enantiomers rotate polarised light oppositely and can smell/taste/behave differently as drugs." },
    ],
    confusions: [
      { wrong: "Alkanes and alkenes react in the same way.", right: "Alkanes do substitution (radical halogenation under UV); alkenes do addition across C=C (instant bromine decolourisation).", why: "Both are 'hydrocarbons' in the student's mind." },
      { wrong: "A molecule with polar bonds cannot be nonpolar.", right: "Symmetry can cancel — CCl₄ is nonpolar despite four polar C–Cl bonds.", why: "Bond dipoles are vectors, not scalars." },
      { wrong: "All alcohols oxidise to carboxylic acids.", right: "Only primary ones; secondary stop at ketones, tertiary resist mild oxidation entirely.", why: "One oxidation example is over-generalized." },
    ],
    questions: [
      { q: "Name CH₃–CH(CH₃)–CH₂–CH₃ and draw one positional isomer.",
        a: "2-methylbutane. Isomer: n-pentane CH₃CH₂CH₂CH₂CH₃ (same C₅H₁₂).", hint: "Longest chain first, lowest locants." },
      { q: "How do you distinguish hexane from hex-1-ene in the lab?",
        a: "Bromine water: alkene decolourises it instantly (addition across C=C); hexane needs UV light and hours.", hint: "π bonds are reactive; σ bonds are not." },
      { q: "Propan-1-ol and propan-2-ol both oxidise with acidified dichromate. Products?",
        a: "Propan-1-ol (1°) → propanal → propanoic acid. Propan-2-ol (2°) → propanone, which stops there.", hint: "Class of alcohol decides the destination." },
      { q: "Why does benzene resist addition reactions that alkenes undergo easily?",
        a: "Addition would destroy the delocalised π aromatic ring — a large stability loss. Substitution keeps the ring intact.", hint: "Compare stability before and after." },
    ],
  },
  "bio-th-cell": {
    proof: {
      title: "Proof on a specific case — why the same glucose powers two different engines",
      case: "1 glucose molecule in aerobic vs anaerobic conditions",
      steps: [
        { text: "Glycolysis (cytoplasm, no oxygen needed) is common to both:", math: "1 glucose → 2 pyruvate + 2 ATP + 2 NADH" },
        { text: "Aerobic path — pyruvate enters the mitochondrion:", math: "Krebs cycle + electron transport chain → ~36–38 ATP total" },
        { text: "Anaerobic path — pyruvate is reduced in the cytoplasm:", math: "Muscle: lactate (+2 ATP total). Yeast: ethanol + CO₂ (+2 ATP)" },
        { text: "The 18× difference is the proof of compartmentalisation:", math: "Oxygen lets NADH dump electrons into the ETC — the cristae-packed inner membrane multiplies the yield" },
        { text: "Structural check: bacteria manage only the 2-ATP path on glucose:", math: "No mitochondria → no efficient aerobic ATP factory, despite using oxygen by other means" },
      ],
      takeaway: "Organelles are not decorations — the mitochondrion's membranes and enzymes are what turn 2 ATP into 38. Structure IS function at cellular scale.",
    },
    theory: [
      { heading: "Prokaryote vs eukaryote", body: "Prokaryotes: no nucleus (naked circular DNA in the nucleoid), no membrane organelles, 70S ribosomes, tiny (~1–5 μm), divide by binary fission. Eukaryotes: true nucleus, 80S ribosomes, membrane-bound organelles, mitosis/meiosis. Every antibiotic you have taken exploits one of these differences against bacteria without touching your own cells." },
      { heading: "The organelle division of labour", body: "Nucleus stores and transcribes DNA; ribosomes translate; ER handles synthesis (rough = protein, smooth = lipid/detox); Golgi packages and ships; lysosomes digest (pH ~4.8 inside); mitochondria make ATP; chloroplasts capture light. Membrane transport: diffusion/osmosis passively, active transport spends ATP (the Na⁺/K⁺ pump burns ~20% of your resting energy)." },
      { heading: "Cell cycle and its checkpoints", body: "Interphase (G1 growth, S replication, G2 prep) occupies ~90% of a cell's life; mitosis (prophase→metaphase→anaphase→telophase) is brief. Checkpoints halt the cycle if DNA is damaged — lose them (p53 mutation) and uncontrolled division, i.e. cancer, follows. Meiosis adds crossing-over and independent assortment: the source of genetic variation sex depends on." },
    ],
    confusions: [
      { wrong: "Plant cells have no mitochondria because chloroplasts make energy.", right: "Plants respire 24/7; chloroplasts only work in light. Both organelles coexist.", why: "'Plants make food' is over-extended to 'plants don't burn food'." },
      { wrong: "Osmosis is 'water moving to the saltier side' as a rule.", right: "Water moves down its own potential gradient — toward the LOWER water potential (more solute), but the driver is water potential, not salt love.", why: "The shortcut phrase survives without the potential concept." },
      { wrong: "Mitosis and meiosis both make identical cells.", right: "Mitosis clones (growth/repair); meiosis halves the chromosome number and reshuffles genes (gametes).", why: "Both are 'cell division' until the purpose is examined." },
    ],
    questions: [
      { q: "A cell is placed in distilled water. What happens and why?",
        a: "Water enters by osmosis (outside water potential is higher); an animal cell swells and may lyse; a plant cell becomes turgid — the wall resists bursting.", hint: "Follow the water potential gradient, then ask about the wall." },
      { q: "Why do antibiotics that attack ribosomes not harm your own cells?",
        a: "Bacterial ribosomes are 70S, ours are 80S — the structural difference lets drugs bind one and not the other.", hint: "Compare ribosome sizes." },
      { q: "ATP is called the energy currency. Why currency and not fuel?",
        a: "It is earned by catabolism, spent instantly on specific jobs (pumps, synthesis, movement), and regenerated thousands of times a day — a medium of exchange, not a store.", hint: "What does currency do that fuel does not?" },
      { q: "A cell needs to import glucose against its concentration gradient. Which mechanism and what cost?",
        a: "Active transport (specific carrier + ATP) — diffusion cannot go uphill.", hint: "Direction of gradient decides the mechanism." },
    ],
  },
  "bio-th-genetics": {
    proof: {
      title: "Proof on a specific case — a dihybrid cross decoded with one grid",
      case: "Pure tall yellow (TTYY) pea × pure short green (ttyy); then F₁ × F₁",
      steps: [
        { text: "F₁ genotype and phenotype:", math: "All TtYy — tall yellow (T and Y dominate completely)" },
        { text: "F₁ gametes — independent assortment gives 4 types:", math: "TY, Ty, tY, ty (1:1:1:1)" },
        { text: "16-cell Punnett grid → phenotype ratio:", math: "9 tall yellow : 3 tall green : 3 short yellow : 1 short green" },
        { text: "Test-cross check (TtYy × ttyy) confirms the gametes:", math: "1:1:1:1 phenotype ratio — the classic proof of independent assortment" },
        { text: "Break the 9:3:3:1 and you have discovered linkage:", math: "If genes sit on the same chromosome, parental combos exceed the recombinants — Morgan's fruit flies proved chromosomes carry genes" },
      ],
      takeaway: "Mendel's ratios are arithmetic consequences of meiosis: segregation (alleles separate) and independent assortment (pairs shuffle freely). Any deviation is itself data — linkage, epistasis or lethality.",
    },
    theory: [
      { heading: "DNA — the information molecule", body: "Double helix, antiparallel strands, A–T (2 H-bonds) and G–C (3 H-bonds). Replication is semi-conservative: each old strand templates a new one (Meselson–Stahl proved it). 3 m of DNA fits in a 6 μm nucleus by wrapping on histones into nucleosomes." },
      { heading: "The central dogma", body: "DNA → transcription (RNA polymerase, mRNA from the template strand, codons) → translation (ribosome reads triplets; tRNA anticodons deliver amino acids; start AUG, stops UAA/UAG/UGA). Degenerate code: 64 codons for 20 amino acids — some mutations (wobble position) change nothing, others (frameshift) wreck everything downstream." },
      { heading: "Patterns beyond simple dominance", body: "Incomplete dominance (snapdragon pink = blended phenotype), codominance (AB blood — both antigens expressed), multiple alleles (ABO system), sex linkage (haemophilia, colour blindness on X — males suffer more with one copy), polygenic traits (height, skin tone — continuous variation)." },
    ],
    confusions: [
      { wrong: "Dominant alleles are 'stronger' or more common in a population.", right: "Dominance is about expression in the heterozygote, not frequency or fitness — six fingers is dominant and rare.", why: "The word 'dominant' carries everyday connotations." },
      { wrong: "Mutation always harms the organism.", right: "Most are neutral (silent/wobble), some harmful, a few beneficial — mutation is the raw material of evolution and crop breeding.", why: "Mutation is introduced through disease examples." },
      { wrong: "Genotype ratio and phenotype ratio are the same thing.", right: "Tt × Tt gives 1TT:2Tt:1tt genotypes but 3 tall:1 short phenotypes — heterozygotes hide under the dominant look.", why: "The two ratios coincide in test crosses, inviting the error." },
    ],
    questions: [
      { q: "A colour-blind (X^c Y) man marries a carrier woman (X^C X^c). Predict the children.",
        a: "Daughters: 50% carriers (X^C X^c), 50% normal. Sons: 50% colour-blind (X^c Y), 50% normal — sex-linked traits hit sons hardest because they have only one X.", hint: "Sons always get their single X from the mother." },
      { q: "A child has blood group O while the mother is A and the father is AB. Possible?",
        a: "Yes — mother could be I^A i, contributing i; father contributes i from I^A i... wait, AB gives I^A or I^B only. So NO — with an AB father the child cannot be O. This is the classic paternity-test logic.", hint: "AB parents cannot pass i." },
      { q: "Transcribe and translate: DNA template 3'-TAC GGA ATT-5'. (AUG = Met, GGA = Gly, UAA = stop)",
        a: "mRNA 5'-AUG CCU UAA-3' → Met–Pro–stop. A short peptide of two amino acids.", hint: "mRNA is complementary to the template, same as the coding sense." },
      { q: "Why does a frameshift mutation usually do more damage than a substitution?",
        a: "Insertion/deletion shifts the entire reading frame — every codon downstream changes. A substitution often changes one amino acid or even nothing (degenerate code).", hint: "Think of re-spacing a sentence without spaces." },
    ],
  },
  "bio-th-ecology": {
    proof: {
      title: "Proof on a specific case — tracing energy up a food chain",
      case: "Grass → grasshopper → frog → snake, with 10% ecological efficiency",
      steps: [
        { text: "Start with 10,000 J fixed by the grass:", math: "Grasshopper receives 10,000 × 0.10 = 1,000 J" },
        { text: "Each transfer repeats the loss:", math: "Frog: 100 J → snake: 10 J" },
        { text: "Where did the 99.9% go? Not 'destroyed' — dispersed:", math: "Respiration heat, egestion, death/decay — every joule still exists, just no longer harvestable" },
        { text: "This explains pyramid shape and real limits:", math: "4–5 trophic levels max; big predators are rare; 10 kg of snake meat cost 10,000 kg of grass" },
        { text: "Biomagnification rides the same chain upward:", math: "Non-degradable toxins (DDT, mercury) concentrate ~10× per level — top predators suffer first" },
      ],
      takeaway: "Energy FLOWS (one-way, degrading to heat); matter CYCLES (carbon, nitrogen, water loop forever). Confusing the two is the root of most ecology errors.",
    },
    theory: [
      { heading: "Ecosystem structure", body: "Producers fix solar energy; consumers eat; decomposers return matter. Only ~1–3% of sunlight becomes biomass. Food webs beat food chains for realism — most species have several predators/preys, which buffers the ecosystem against single-species collapse." },
      { heading: "Population growth", body: "Exponential J-curve while resources are unlimited; logistic S-curve as carrying capacity K bites. r-strategists (insects, weeds): many offspring, no care, boom-bust. K-strategists (elephants, oaks): few offspring, heavy investment, stable near K. Human population is still on the exponential shoulder — the sustainability question in one graph." },
      { heading: "Cycles and conservation", body: "Carbon: photosynthesis pulls CO₂ in; respiration/combustion push it out — fossil fuels tip the balance (climate change). Nitrogen: 78% N₂ is unusable until nitrogen-fixing bacteria/Rhizobium convert it; legumes renew soil naturally. Biodiversity hotspots (Nepal's mid-hills are one) prioritise conservation where endemism meets threat." },
    ],
    confusions: [
      { wrong: "Decomposers are at the 'bottom' of the food chain.", right: "They sit OUTSIDE the grazing chain, recycling matter from every level into producers.", why: "Chain diagrams put them last." },
      { wrong: "Energy is recycled in an ecosystem like nutrients.", right: "Energy flows through and degrades to heat; only MATTER cycles.", why: "'Everything is recycled' slogans blur the distinction." },
      { wrong: "More predators always crash prey populations.", right: "Predator–prey numbers oscillate (lynx–hare cycles) — predation often stabilises prey by culling the sick and old.", why: "One-directional thinking about food webs." },
    ],
    questions: [
      { q: "Why does a vegetarian diet support more humans than a meat diet on the same farmland?",
        a: "Eating plants puts humans at trophic level 2 (~10× energy retained) instead of 3+ — the 10% rule at planetary scale.", hint: "Count the trophic steps." },
      { q: "A pesticide concentration doubles at each trophic level. Starting at 0.001 ppm in water, what does a level-4 predator carry?",
        a: "0.001 → 0.01 → 0.1 → 1 → 10 ppm — 10,000× biomagnification.", hint: "Multiply by 10 per level." },
      { q: "Name the process that returns nitrogen to the atmosphere and the bacteria involved.",
        a: "Denitrification — Pseudomonas converts nitrates to N₂ gas, closing the cycle.", hint: "The cycle's 'exit door'." },
      { q: "Why does removing a top predator sometimes INCREASE biodiversity loss?",
        a: "Keystone predators control dominant competitors (sea otter → urchin → kelp forest); without them one species overruns the system.", hint: "Not all predators are equal — some are keystones." },
    ],
  },
  "bio-th-human": {
    proof: {
      title: "Proof on a specific case — one heartbeat, traced end to end",
      case: "A red cell leaving the right ventricle with 5 L/min cardiac output",
      steps: [
        { text: "Pulmonary circuit first (right heart is the low-pressure pump):", math: "Right ventricle → pulmonary artery → lungs: O₂ in, CO₂ out → pulmonary veins → left atrium" },
        { text: "Systemic circuit (left ventricle, the pressure powerhouse):", math: "Left ventricle → aorta (≈120 mmHg) → arteries → capillaries (exchange) → veins → right atrium" },
        { text: "Why the pressure difference matters:", math: "120 vs ~25 mmHg: the left wall is ~3× thicker — structure matches load" },
        { text: "Capillary exchange by the numbers:", math: "Blood velocity falls to ~0.03 cm/s in capillaries (huge total cross-section) — time for diffusion" },
        { text: "Double circulation prevents mixing:", math: "Complete double circulation (birds, mammals) delivers fully oxygenated blood to tissues; amphibians' mixed blood explains their low stamina" },
      ],
      takeaway: "Two pumps in one organ, tuned to two different jobs: low pressure to protect fragile lung capillaries, high pressure to push through the whole body. Form follows pressure.",
    },
    theory: [
      { heading: "Respiration — the breathing chain", body: "Nose (filter/warm/moisten) → trachea → bronchi → bronchioles → alveoli (~300 million, ~70 m² surface). Gas exchange by partial-pressure gradients: O₂ diffuses in (pO₂ 100 vs 40 mmHg), CO₂ out. Breathing is mechanical: diaphragm contracts → volume up → pressure down → air IN. Most O₂ travels bound to haemoglobin (oxyhaemoglobin), not dissolved." },
      { heading: "Digestion — chemistry on a conveyor", body: "Mouth (amylase on starch) → stomach (HCl pH ~2, pepsin on protein, mucus self-defence) → duodenum (bile emulsifies fat, pancreatic lipase/amylase/proteases) → ileum (villi absorb). The liver is the chemical plant: bile production, glycogen storage, detoxification." },
      { heading: "Nervous vs endocrine control", body: "Nerves: fast (ms), specific, electrical. Hormones: slow (s–min), broad, chemical. Reflex arc (receptor → sensory → spinal cord → motor → effector) bypasses the brain for speed. Neurons run on Na⁺/K⁺ action potentials and cross synapses chemically — the synapse is where anaesthetics, venoms and antidepressants all act." },
    ],
    confusions: [
      { wrong: "Arteries carry oxygenated blood, veins deoxygenated.", right: "Arteries carry blood AWAY from the heart — the pulmonary artery carries deoxygenated blood.", why: "The rule is direction, not oxygen content." },
      { wrong: "We breathe to 'get oxygen to the blood' only.", right: "Exhaling CO₂ is equally vital — respiratory acidosis kills faster than hypoxia in many scenarios.", why: "Oxygen-centred teaching hides the CO₂ half." },
      { wrong: "Bile digests fats.", right: "Bile EMULSIFIES (physical) — lipase does the chemical digestion.", why: "Bile arrives with the fat-processing team and gets the credit." },
    ],
    questions: [
      { q: "Why does the left ventricle have a thicker muscular wall?",
        a: "It pumps against systemic resistance (~120 mmHg) vs the right's pulmonary ~25 mmHg — the workload sets the wall.", hint: "Compare the two pressures." },
      { q: "A person's breathing rate rises after exercise even though oxygen demand is already met. What drives it?",
        a: "Blood CO₂ (carbonic acid) — chemoreceptors in the medulla respond to pH, not oxygen.", hint: "The strongest breathing stimulus is dissolved CO₂." },
      { q: "Why are alveoli one-cell thick and wrapped in capillaries?",
        a: "Diffusion rate ∝ surface area / thickness — the anatomy maximises both terms (70 m², ~0.5 μm barrier).", hint: "Fick's law as anatomy." },
      { q: "Trace a glucose molecule from the small intestine to a leg muscle cell.",
        a: "Absorbed at villus → hepatic portal vein → liver (storage/release) → hepatic vein → vena cava → right heart → lungs → left heart → aorta → femoral artery → capillary → muscle cell.", hint: "Every absorbed nutrient tours the liver first." },
    ],
  },
  "bio-th-evolution": {
    proof: {
      title: "Proof on a specific case — natural selection in one bacterial dish",
      case: "A population of 10⁹ bacteria, one mutation conferring antibiotic resistance (frequency 10⁻⁹), then antibiotic added",
      steps: [
        { text: "Before the antibiotic: the resistant cell has NO advantage:", math: "Frequency stays ~10⁻⁹ — variation exists without direction" },
        { text: "Antibiotic added — the environment changes the meaning of the variation:", math: "Susceptible cells die; the resistant cell survives" },
        { text: "Reproduction amplifies the survivor:", math: "20-minute generation time → 10⁹ descendants (all resistant) in ~10 hours" },
        { text: "Selection did not CREATE the resistance:", math: "The mutation arose randomly first; selection merely FILTERED — Lamarck's 'acquired need' is wrong, Darwin's 'pre-existing variety' is right" },
        { text: "Finish the course — why doctors insist:", math: "Partial treatment leaves the semi-resistant survivors to rebuild a resistant population" },
      ],
      takeaway: "Selection is a filter, not a sculptor of intent: variation arises randomly, the environment decides which variants reproduce, and populations — not individuals — evolve.",
    },
    theory: [
      { heading: "Evidence for evolution", body: "Fossil record (transitional forms: Archaeopteryx), homologous structures (same forelimb bones in human/whale/bat — shared ancestry, different jobs vs analogous wings of insect/bird), vestigial organs (appendix, whale pelvis), molecular homology (universal genetic code, cytochrome c similarity tracking relatedness), biogeography (Darwin's finches)." },
      { heading: "Speciation", body: "Allopatric: a geographic barrier splits a population; mutations accumulate independently; reunite them and they may no longer interbreed — a new species. Sympatric: within one area via polyploidy (instant in plants) or behavioural shifts. The species definition is reproductive isolation, not appearance." },
      { heading: "Classification that reflects history", body: "Five kingdoms → three domains (Bacteria, Archaea, Eukarya). Binomial nomenclature (Homo sapiens): genus + species, universal and unambiguous. Modern taxonomy uses cladistics — group by shared derived characters, so the tree mirrors ancestry. The five-kingdom scheme (Monera, Protista, Fungi, Plantae, Animalia) still structures NEB syllabi." },
    ],
    confusions: [
      { wrong: "Evolution means individuals change during their lifetime.", right: "Only POPULATIONS evolve — allele frequencies shift across generations.", why: "Lamarck's giraffe story is intuitive and wrong." },
      { wrong: "Humans descended from modern chimpanzees.", right: "Both share a common ancestor ~6–7 million years ago; chimps are cousins, not ancestors.", why: "Linear 'ladder' thinking instead of a branching tree." },
      { wrong: "Theory means a guess.", right: "In science, a theory is a well-tested explanatory framework (gravity, germ theory, evolution); a guess is a hypothesis.", why: "Everyday and scientific senses of 'theory' collide." },
    ],
    questions: [
      { q: "Wings of a butterfly and a bird: homologous or analogous? Forelimbs of a bat and a whale?",
        a: "Wings: analogous (same function, different origin). Bat/whale forelimbs: homologous (same pentadactyl plan, different function).", hint: "Ask: same structure or same job?" },
      { q: "Why does overuse of antibiotics in livestock farming threaten human medicine?",
        a: "It selects resistant bacteria in animals; resistance genes transfer to human pathogens via plasmids — shared gene pool, shared problem.", hint: "Bacteria swap genes horizontally." },
      { q: "A volcano splits a lizard population into two islands. Describe how two species may form.",
        a: "Allopatric speciation: isolation blocks gene flow; different mutations/drift/selection accumulate; when descendants can no longer interbreed, they are separate species.", hint: "Barrier first, divergence second, isolation test last." },
      { q: "Why are marsupials in Australia so different from placental mammals elsewhere despite similar niches?",
        a: "Convergent evolution from a common marsupial ancestor after geographic isolation — similar pressures, different lineages.", hint: "Same niche ≠ same ancestry." },
    ],
  },
  "bio-th-plant": {
    proof: {
      title: "Proof on a specific case — measuring photosynthesis against the factors that limit it",
      case: "An aquatic plant under varying light and CO₂, bubble-count method",
      steps: [
        { text: "Raise light intensity from zero — bubbles rise steeply:", math: "Light is the limiting factor: rate ∝ intensity" },
        { text: "Above ~compensation point the curve bends flat:", math: "CO₂ or enzymes now limit — more light changes nothing (saturation)" },
        { text: "The compensation point itself is measurable:", math: "Bubbles stop when photosynthesis = respiration — net gas exchange zero" },
        { text: "Add CO₂ at high light — bubbles surge again:", math: "CO₂ was the limiter (only 0.04% of air; greenhouse growers exploit this)" },
        { text: "Temperature test — a sharp optimum then collapse:", math: "Enzyme-driven: rate rises to ~35–40 °C, then denaturation kills it" },
      ],
      takeaway: "Rate is set by the SCARCEST factor, never the average — Liebig's law of the minimum. Every greenhouse, forest and crop yield question is this curve.",
    },
    theory: [
      { heading: "Photosynthesis — two stages, one leaf", body: "Light reactions (thylakoid): light splits water, makes ATP + NADPH, releases O₂. Calvin cycle (stroma): CO₂ fixed by RuBisCO onto RuBP, reduced by that ATP/NADPH to sugar. The two stages are coupled but separable — the 'light-independent' stage still needs the light stage's products." },
      { heading: "Transport — two pipelines", body: "Xylem: dead hollow tubes, unidirectional water + minerals UP, driven by transpiration pull (cohesion-tension — a wettable narrow tube can lift water 10 m; trees exceed it via narrower vessels). Phloem: living sieve tubes, BIDIRECTIONAL sugar flow source→sink, driven by active loading and osmotic pressure (mass flow hypothesis)." },
      { heading: "Hormones and responses", body: "Auxin: apical dominance and phototropism (accumulates on the shaded side, elongates cells — the shoot bends toward light). Gibberellin: stem elongation, germination. Cytokinin: cell division, delays senescence. Abscisic acid: stomatal closure under drought. Ethylene: fruit ripening — one ripe banana in a bag ripens the rest." },
    ],
    confusions: [
      { wrong: "Plants photosynthesise by day and respire only by night.", right: "Respiration runs 24/7; by day photosynthesis simply exceeds it.", why: "'Plants breathe CO₂' is over-simplified." },
      { wrong: "Xylem and phloem both carry water up.", right: "Xylem: water/minerals up, dead tissue, transpiration-driven. Phloem: sugars both ways, living tissue, energy-driven.", why: "Both are 'vascular tubes' until direction and cargo are compared." },
      { wrong: "Transpiration is wasted water loss.", right: "It drives the water column, cools the leaf and delivers minerals — a cost with three payoffs.", why: "Only the water loss is visible." },
    ],
    questions: [
      { q: "A potted plant is kept in the dark for 48 h, then half a leaf is covered with foil and the leaf is iodine-tested. Result and conclusion?",
        a: "Uncovered half turns blue-black (starch present); covered half stays brown (no starch) → light is required for photosynthesis, and destarching proved the starch was newly made.", hint: "The half-leaf design controls for everything but light." },
      { q: "Why do gardeners pinch off the shoot tip of chrysanthemums?",
        a: "Removes apical dominance (auxin source) → lateral buds grow → bushier plant with more flowers.", hint: "Auxin suppresses lateral buds." },
      { q: "On a hot dry day a plant closes its stomata. Immediate cost and benefit?",
        a: "Cost: photosynthesis falls (CO₂ entry blocked). Benefit: water conserved — ABA-mediated survival trade-off.", hint: "Every adaptation is a trade-off." },
      { q: "Why can red light alone support photosynthesis but pure green light barely?",
        a: "Chlorophyll absorbs red (and blue) strongly and reflects green — the reflected colour IS why leaves look green.", hint: "Absorption spectrum = action spectrum." },
    ],
  },
  "math-th-calculus": {
    proof: {
      title: "Proof on a specific case — the derivative as slope, done by first principles",
      case: "f(x) = x² at x = 3 — what is the instantaneous rate of change?",
      steps: [
        { text: "Average rate over a widening gap h:", math: "[f(3+h) − f(3)]/h = [(3+h)² − 9]/h = (6h + h²)/h = 6 + h" },
        { text: "Shrink the gap — the limit is the derivative:", math: "lim(h→0) (6 + h) = 6" },
        { text: "Geometric meaning: the tangent at (3, 9) has slope 6:", math: "y − 9 = 6(x − 3) → y = 6x − 9" },
        { text: "Power rule cross-check:", math: "d/dx x² = 2x → 2(3) = 6 ✓" },
        { text: "The same limit machinery in reverse gives the integral:", math: "∫x²dx = x³/3 + C — and d/dx(x³/3) = x², the Fundamental Theorem" },
      ],
      takeaway: "Derivative = slope of the tangent = instantaneous rate. Integral = accumulated area = anti-derivative. The Fundamental Theorem says these two are inverse operations — the whole subject in one sentence.",
    },
    theory: [
      { heading: "Limits — the foundation", body: "A limit is the value a function approaches, not necessarily reaches. Indeterminate forms (0/0, ∞/∞) demand algebra (factor, rationalise) or L'Hôpital before evaluating. Continuity = limit exists AND equals the value — removable (hole), jump, and infinite discontinuities are the three ways it fails." },
      { heading: "Differentiation as a toolkit", body: "Product rule (uv)' = u'v + uv'; quotient rule; chain rule dy/dx = dy/du · du/dx — the chain rule is why composite functions like sin(x²) differentiate at all. Implicit differentiation handles curves like x² + y² = 25 without solving for y. Higher derivatives describe acceleration (2nd) and curvature shape (3rd)." },
      { heading: "Applications that pay rent", body: "f' > 0 rising, f' = 0 stationary; f'' > 0 convex (min), f'' < 0 concave (max), f'' = 0 possible inflection. Max/min word problems: translate to ONE variable, differentiate, verify with the second derivative. Integrals: area under curves, distance from velocity, work from force — anywhere something accumulates." },
    ],
    confusions: [
      { wrong: "A function differentiable at a point must be continuous there — and vice versa.", right: "Differentiable ⇒ continuous, but NOT the reverse: |x| is continuous at 0 with no derivative (corner).", why: "The one-way implication is memorised backwards." },
      { wrong: "f'(c) = 0 means a maximum or minimum.", right: "It means STATIONARY — x³ at 0 has f' = 0 and neither max nor min (inflection).", why: "The second-derivative test is skipped." },
      { wrong: "∫f(x)dx always needs the +C only in exams.", right: "Without +C you lose an infinite family of antiderivatives — the constant is the vertical shift the derivative cannot see.", why: "Definite integrals hide the constant, so it feels decorative." },
    ],
    questions: [
      { q: "Differentiate y = (3x² + 1)⁵.", a: "Chain rule: dy/dx = 5(3x²+1)⁴ · 6x = 30x(3x²+1)⁴.", hint: "Outer function, inner function, multiply by the inner derivative." },
      { q: "Find the max area of a rectangle with perimeter 40 cm.",
        a: "A = x(20 − x); A' = 20 − 2x = 0 → x = 10 → square, 100 cm² (A'' = −2 < 0 confirms max).", hint: "One variable first, then differentiate." },
      { q: "Evaluate ∫₀² (3x² + 2) dx.", a: "[x³ + 2x]₀² = 8 + 4 = 12 — the area under the curve.", hint: "Antidifferentiate, then subtract boundary values." },
      { q: "A ladder slides down a wall: x² + y² = 25 with dx/dt = 0.4 m/s at x = 3. Find dy/dt.",
        a: "2x(dx/dt) + 2y(dy/dt) = 0 → dy/dt = −(3)(0.4)/4 = −0.3 m/s — related rates, one implicit differentiation.", hint: "Differentiate the constraint with respect to time." },
    ],
  },
  "math-th-trig": {
    proof: {
      title: "Proof on a specific case — solving a real triangle with the identities",
      case: "A 10 m ladder leans at 60° to the ground; find reach, and the angle when the reach is 5 m",
      steps: [
        { text: "Reach up the wall:", math: "h = 10·sin60° = 10 × (√3/2) ≈ 8.66 m" },
        { text: "Distance of the foot from the wall:", math: "d = 10·cos60° = 5 m" },
        { text: "Now invert — reach 5 m, find the angle:", math: "sin θ = 5/10 = 0.5 → θ = 30° (or 150° — reject; a ladder cannot lean past vertical)" },
        { text: "Verify with the identity:", math: "sin²30° + cos²30° = 0.25 + 0.75 = 1 ✓" },
        { text: "General values matter: sin θ = 0.5 has infinitely many solutions:", math: "θ = 30° + 360°n or 150° + 360°n — equations, unlike triangles, repeat" },
      ],
      takeaway: "Trigonometry converts an angle plus one side into every other side — and inverse trig converts a ratio back into an angle. Identities are the grammar that keeps the conversions consistent.",
    },
    theory: [
      { heading: "The unit circle redefines the ratios", body: "Beyond 90°, SOH-CAH-TOA breaks; the unit circle (cos θ = x, sin θ = y) extends everything. Signs by quadrant (ASTC: All, Sin, Tan, Cos). This is why sin(150°) = sin(30°) and why graphs become waves: y = sin θ is the y-coordinate of a point rotating around a circle." },
      { heading: "Identities worth their keep", body: "Pythagorean: sin² + cos² = 1. Compound: sin(A±B) = sinA cosB ± cosA sinB — the engine behind wave addition and the double-angle formulas. sin2A = 2 sinA cosA; cos2A = cos²A − sin²A (three forms). These convert unfamiliar expressions into solvable ones — that is their entire job." },
      { heading: "Graphs, transformations and inverses", body: "y = a·sin(bx + c) + d: amplitude |a|, period 360°/b, phase shift c, midline d — one template for tides, AC circuits and sound. Inverse functions need restricted domains (sin⁻¹ outputs −90°…90°) or the mapping fails the vertical line test." },
    ],
    confusions: [
      { wrong: "sin θ and cos θ are unrelated functions.", right: "cos θ = sin(90° − θ) — cofunctions; one is the other shifted 90°.", why: "They are taught as separate tables." },
      { wrong: "sin⁻¹0.5 = 150° is a valid calculator answer.", right: "The inverse sine RANGE is −90° to 90°, so the calculator gives 30°; 150° is a second solution you find yourself.", why: "Inverse trig outputs are deliberately restricted." },
      { wrong: "sin(A + B) = sin A + sin B.", right: "It equals sinA cosB + cosA sinB — angles do not distribute.", why: "The tempting shortcut fails numerically: sin(90°) = 1 ≠ sin45° + sin45° ≈ 1.41." },
    ],
    questions: [
      { q: "Simplify sin θ cos θ tan θ.", a: "tan θ = sin θ/cos θ → sin θ cos θ · sin θ/cos θ = sin²θ.", hint: "Convert tan first." },
      { q: "Solve 2sin x − 1 = 0 for 0° ≤ x < 360°.", a: "sin x = 0.5 → x = 30°, 150° (two quadrants where sine is positive).", hint: "ASTC tells you which quadrants." },
      { q: "A ship sails 50 km on a bearing of 040°. How far north and east has it gone?",
        a: "North: 50·cos40° ≈ 38.3 km; East: 50·sin40° ≈ 32.1 km.", hint: "Bearings measure from north, clockwise." },
      { q: "Prove cos2A = 1 − 2sin²A and use it for A = 30°.",
        a: "cos2A = cos²A − sin²A = (1 − sin²A) − sin²A = 1 − 2sin²A. At 30°: cos60° = 0.5 = 1 − 2(0.25) ✓.", hint: "Start from the Pythagorean identity." },
    ],
  },
  "math-th-algebra": {
    proof: {
      title: "Proof on a specific case — a 2×2 system solved three ways, all agreeing",
      case: "2x + 3y = 12 and x − y = 1",
      steps: [
        { text: "Substitution:", math: "x = 1 + y → 2(1+y) + 3y = 12 → 5y = 10 → y = 2, x = 3" },
        { text: "Elimination:", math: "Multiply second by 2: 2x − 2y = 2; subtract: 5y = 10 → same answer" },
        { text: "Matrix form AX = B, inverse method:", math: "A = [[2,3],[1,−1]], det A = −2 − 3 = −5 ≠ 0 → unique solution exists" },
        { text: "A⁻¹ = (1/det)[[−1,−3],[−1,2]]; X = A⁻¹B:", math: "X = (1/−5)[[−1,−3],[−1,2]]·[12,1]ᵀ = (1/−5)[−15,−10]ᵀ = [3,2]ᵀ ✓" },
        { text: "The determinant's meaning:", math: "det = 0 ⇒ lines parallel/coincident ⇒ no or infinite solutions — the number that decides solvability" },
      ],
      takeaway: "Substitution, elimination and matrices are three dialects of one language. The determinant is the quick test: non-zero means one crossing point, zero means the lines never (or always) meet.",
    },
    theory: [
      { heading: "Matrices as bookkeeping machines", body: "A matrix is a table; multiplication AB means 'apply transformation B, then A' — which is why AB ≠ BA. Dimension rule: (m×n)(n×p) works, inner numbers must match. Inverses exist only when det ≠ 0; solving AX = B becomes X = A⁻¹B, the same move as dividing both sides." },
      { heading: "Quadratic equations — every tool at once", body: "ax² + bx + c = 0: discriminant D = b² − 4ac decides everything (D > 0 two real roots, D = 0 one repeated, D < 0 complex pair). Sum = −b/a, product = c/a — build an equation from its roots without solving anything. Completing the square gives the vertex form and explains where the formula comes from." },
      { heading: "Complex numbers complete arithmetic", body: "i² = −1 lets every quadratic have roots: x² + 1 = 0 → x = ±i. a + bi behaves like a point (a, b): |z| = √(a²+b²) is the distance, conjugate a − bi reflects across the real axis, and |z₁z₂| = |z₁||z₂|. They are not 'imaginary' — they are the coordinates of rotation and oscillation (AC circuits, signal processing)." },
    ],
    confusions: [
      { wrong: "Matrix multiplication works element by element.", right: "Row × column with sums — and order matters: AB ≠ BA in general.", why: "Addition (which IS element-wise) gets over-extended." },
      { wrong: "A negative discriminant means 'no answer'.",
        right: "No REAL answer — the complex pair still exists and is used in engineering every day.", why: "School stops at real numbers." },
      { wrong: "Squaring both sides of √(x) = −3 gives x = 9, so −3 is a root.", right: "Squaring introduces extraneous roots — always substitute back into the ORIGINAL equation (9 fails: √9 = 3).", why: "The squaring step is not reversible." },
    ],
    questions: [
      { q: "Find k so that x² + kx + 9 has equal roots.", a: "D = k² − 36 = 0 → k = ±6.", hint: "Equal roots ⇔ discriminant zero." },
      { q: "Form the quadratic whose roots are 2 and −5.", a: "Sum = −3, product = −10 → x² + 3x − 10 = 0.", hint: "x² − (sum)x + (product)." },
      { q: "Compute (3 + 4i)(3 − 4i).", a: "9 + 16 = 25 — a complex number times its conjugate is |z|², always real.", hint: "Difference of squares with i² = −1." },
      { q: "If A = [[1,2],[3,4]], find det A and decide invertibility.", a: "det = 1×4 − 2×3 = −2 ≠ 0 → invertible; A⁻¹ = (1/−2)[[4,−2],[−3,1]].", hint: "ad − bc, then swap and negate." },
    ],
  },
  "math-th-stats": {
    proof: {
      title: "Proof on a specific case — mean vs median on one skewed dataset",
      case: "Salaries (in thousands): 20, 22, 24, 26, 28, 250 — one outlier boss",
      steps: [
        { text: "Mean:", math: "(20+22+24+26+28+250)/6 = 370/6 ≈ 61.7 — far above every actual worker" },
        { text: "Median (middle value):", math: "(24+26)/2 = 25 — describes the typical worker honestly" },
        { text: "Why they diverge: the mean chases extreme values:", math: "One 250 drags the mean up 36.7 while moving the median by 1" },
        { text: "Spread tells the rest:", math: "Without the outlier, values span 20–28 (tight). With it, range = 230 — the outlier manufactures fake variability" },
        { text: "Rule of thumb:", math: "Symmetric data → mean; skewed data (income, house prices, hospital stays) → median" },
      ],
      takeaway: "Always ask WHICH average and WHY: the mean is a balance point that outliers own, the median is a position that ignores them. Reporting one without the spread is how statistics lies.",
    },
    theory: [
      { heading: "Dispersion — the second number you owe", body: "Variance σ² = Σ(x−x̄)²/n; standard deviation σ = √variance (back to original units). Coefficient of variation CV = σ/x̄ × 100% compares spread across different scales. Two classes can share a mean of 60 with wildly different σ — 5 (consistent) vs 20 (chaotic); the mean alone hides this." },
      { heading: "Probability — counting done carefully", body: "P(A) = favourable/total (empirical: long-run frequency). Addition: P(A∪B) = P(A) + P(B) − P(A∩B) — subtract the overlap or double-count. Multiplication: independent events multiply (P(A∩B) = P(A)P(B)); without independence you need conditional probability. At least one: P(at least one) = 1 − P(none) — the back-door that saves whole pages of casework." },
      { heading: "Distributions in the wild", body: "Binomial counts successes in n independent yes/no trials: P(X=r) = C(n,r)p^r q^(n−r). Normal distribution: symmetric bell, ~68% within 1σ, 95% within 2σ — heights, errors, averages. Skewness measures asymmetry; Karl Pearson's coefficient links mean, median and mode to detect it." },
    ],
    confusions: [
      { wrong: "A coin has landed heads 5 times, so tails is 'due'.", right: "Independent events have no memory — P(tails) stays 0.5.", why: "The gambler's fallacy feels like balance." },
      { wrong: "P(A or B) = P(A) + P(B), always.", right: "Only for mutually exclusive events; otherwise subtract the intersection.", why: "The clean formula is remembered without its condition." },
      { wrong: "A larger sample changes the probability of a fair coin landing heads.", right: "Sample size changes how CLOSE the observed proportion gets to 0.5 (law of large numbers), not the probability itself.", why: "Convergence is mistaken for correction." },
    ],
    questions: [
      { q: "Find σ for: 2, 4, 6, 8.", a: "Mean 5; deviations −3,−1,1,3 → squares 9,1,1,9 → variance 5 → σ ≈ 2.24.", hint: "Square the deviations, average, then root." },
      { q: "P(A) = 0.6, P(B) = 0.5, independent. P(A and B)? P(A or B)?",
        a: "P(A∩B) = 0.3; P(A∪B) = 0.6 + 0.5 − 0.3 = 0.8.", hint: "Independence lets you multiply; the union still needs the overlap." },
      { q: "A bag has 4 red, 6 blue balls. Two drawn WITHOUT replacement. P(both red)?",
        a: "(4/10)(3/9) = 2/15 — the second draw's denominators shrink.", hint: "Without replacement ⇒ conditional, not independent." },
      { q: "Probability of at least one six in 3 dice rolls?",
        a: "1 − (5/6)³ = 1 − 125/216 = 91/216 ≈ 0.42.", hint: "The 'at least one' back-door." },
    ],
  },
  "math-th-geo": {
    proof: {
      title: "Proof on a specific case — one line, three forms, one circle",
      case: "The line through (1, 2) with slope 2 — and its distance from (4, 5)",
      steps: [
        { text: "Point-slope form:", math: "y − 2 = 2(x − 1) → y = 2x" },
        { text: "General form (needed for the distance formula):", math: "2x − y = 0" },
        { text: "Perpendicular distance from (4, 5):", math: "d = |2(4) − 5|/√(4+1) = 3/√5 ≈ 1.34" },
        { text: "Check by foot of perpendicular:", math: "Foot = (4,5) − d·(2,−1)/√5 ≈ (2.8, 5.6) — verify it lies on y = 2x ✓" },
        { text: "Same machinery gives the circle x² + y² = 25's tangents:", math: "Distance from centre (0,0) to a tangent line = radius 5 — tangency IS a distance condition" },
      ],
      takeaway: "Coordinate geometry converts shapes into equations: a point is a pair, a line is a linear equation, a circle is x²+y²=r², and every geometric question becomes algebra.",
    },
    theory: [
      { heading: "The line and its complete toolkit", body: "Slope m = (y₂−y₁)/(x₂−x₁); parallel ⇔ equal slopes; perpendicular ⇔ m₁m₂ = −1. Angle between lines via tan θ = |(m₁−m₂)/(1+m₁m₂)|. Distance from point (x₁,y₁) to line ax+by+c=0: |ax₁+by₁+c|/√(a²+b²) — the single most reused formula in the chapter." },
      { heading: "Pair of straight lines", body: "A homogeneous second-degree equation ax² + 2hxy + by² = 0 represents two lines through the origin. The angle between them: tan θ = 2√(h²−ab)/|a+b|. Condition for perpendicularity: a + b = 0. Factorise (or use the formula) to split the pair — useful in conic degeneracies and physics of forces." },
      { heading: "Conics as distance conditions", body: "Circle: distance to centre constant. Parabola: distance to focus = distance to directrix (satellite dishes, headlights). Ellipse: sum of distances constant (planetary orbits, whispering galleries). Hyperbola: difference constant (LORAN navigation). One idea — a locus — generates every curve; the general second-degree equation's discriminant B²−4AC sorts them." },
    ],
    confusions: [
      { wrong: "Vertical lines have slope 0.", right: "Horizontal lines have slope 0; vertical lines have UNDEFINED slope (x never changes).", why: "'Flat' and 'upright' get mixed in the formula's division." },
      { wrong: "Perpendicular slopes are equal.", right: "They are negative reciprocals: 2 and −1/2, not 2 and 2.", why: "Only the horizontal/vertical special case (0 and undefined) resembles equality." },
      { wrong: "The distance formula needs the foot of the perpendicular found first.", right: "The point-to-line formula computes it directly — the foot is optional extra work.", why: "Textbook derivations show the long route." },
    ],
    questions: [
      { q: "Find the equation of the line through (2, 3) perpendicular to y = 3x + 1.",
        a: "Perpendicular slope = −1/3 → y − 3 = −(1/3)(x − 2) → x + 3y = 11.", hint: "m₁m₂ = −1." },
      { q: "Distance between the parallel lines 3x + 4y = 7 and 3x + 4y = 22?",
        a: "|22 − 7|/√(9+16) = 15/5 = 3.", hint: "Same coefficients → point-to-line formula on one line with a point from the other." },
      { q: "Does the point (3, 4) lie inside, on, or outside x² + y² = 25?",
        a: "3² + 4² = 25 → ON the circle. (Compare with 25: less = inside, more = outside.)", hint: "Substitute and compare with r²." },
      { q: "Find the condition for ax² + 2hxy + by² = 0 to represent perpendicular lines.",
        a: "a + b = 0 (coefficient condition), e.g. x² − y² = 0 → x = ±y.", hint: "Perpendicular pair ⇔ a + b = 0." },
    ],
  },
};

/**
 * Extra packs for the labs that originally shipped without content.
 * Split by subject; `getLabLearning` merges them as fallback sources.
 */
import { EXTRA_LEARNING as EXTRA_LEARNING_PHYSICS } from "./lab-learning-extra-physics";
import { EXTRA_LEARNING_PHYSICS_TOOLS } from "./lab-learning-extra-physics-tools";
import { EXTRA_LEARNING_CHEMISTRY } from "./lab-learning-extra-chemistry";
import { EXTRA_LEARNING_BIOLOGY } from "./lab-learning-extra-biology";
import { EXTRA_LEARNING_MATH } from "./lab-learning-extra-math";

const EXTRA_LEARNING: Record<string, LabLearningPack> = {
  ...EXTRA_LEARNING_PHYSICS,
  ...EXTRA_LEARNING_PHYSICS_TOOLS,
  ...EXTRA_LEARNING_CHEMISTRY,
  ...EXTRA_LEARNING_BIOLOGY,
  ...EXTRA_LEARNING_MATH,
};

/** Returns the learning pack for a lab id (main registry + class11 module + extras). */
export function getLabLearning(labId: string): LabLearningPack | undefined {
  return LAB_LEARNING[labId] ?? CLASS11_LEARNING[labId] ?? EXTRA_LEARNING[labId];
}
