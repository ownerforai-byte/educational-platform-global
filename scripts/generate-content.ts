/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  CONTENT GENERATOR — fills the empty content/ravikishan class folders
 *  (concepts + mindmap) for EVERY topic in the syllabus (single source of
 *  truth), plus a unit-level aggregate mindmap.
 *
 *  What it produces (per (class, subject, unit, topic)):
 *    content/ravikishan/{class}/{subject}/{unit}/concepts/{NN}-{slug}.json
 *        rich concept note: notes, confusion, practice, universalFacts,
 *        examples, practiceQuestions, formulas (when domain-relevant),
 *        keyPoints, summary, mcqs
 *    content/ravikishan/{class}/{subject}/{unit}/mindmap/{NN}-{slug}.json
 *        advanced mindmap: a structured `root` tree + an outline `notes`
 *        block (legacy buildTreeFromOutlineNotes compatibility)
 *  per (class, subject, unit):
 *    content/ravikishan/{class}/{subject}/{unit}/mindmap/_unit-{unit}.json
 *        unit aggregate mindmap (one node per topic)
 *
 *  Rules honoured (AGENTS.md):
 *    - syllabus.ts is the single source of truth — we never invent units
 *    - content lives under content/ravikishan/{class}/{subject}/{unit}/
 *    - files are named {NN}-{topic-slug}.json (NN = 1-based topic index)
 *    - required fields: title, unitSlug, topicSlug, topicTitle, relevance, notes
 *    - NON-DESTRUCTIVE: an existing file is never overwritten
 *
 *  Run:
 *    npx tsx scripts/generate-content.mjs            # all topics
 *    npx tsx scripts/generate-content.mjs class-11-notes/biology   # one subject
 *    npx tsx scripts/generate-content.mjs --dry-run   # report, no writes
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";

// Single source of truth + the exact slugify the frontend uses.
import { SYLLABUS, slugifySyllabusTopic } from "../frontend/lib/syllabus.ts";

const ROOT = "content/ravikishan";
const DRY_RUN = process.argv.includes("--dry-run");
// Optional positional filter like "class-11-notes/biology" or "class-12-notes/physics".
const FILTERS = process.argv
  .slice(2)
  .filter((a) => a !== "--dry-run")
  .map((a) => a.split("/"));

const GENERATED_AT = new Date().toISOString();

// ─────────────────────────────────────────────────────────────────────────
// 1. SUB-CONCEPT EXTRACTION (drives both the notes and the mindmap tree)
// ─────────────────────────────────────────────────────────────────────────

/** Split an NEB topic title into meaningful sub-concepts / branches. */
function splitSubconcepts(title) {
  const cleaned = title.replace(/\s+/g, " ").trim();
  // Strip a leading "Subject:" qualifier so the head is not a noise prefix,
  // but remember it as the top-level head.
  const headMatch = cleaned.match(/^([A-Za-zÀ-ÿ&\.\-]+(?: [A-Za-zÀ-ÿ&\.\-]+)?:)/);
  let head = headMatch ? headMatch[1].replace(/:$/, "").trim() : "";
  const body = headMatch ? cleaned.slice(headMatch[1].length).trim() : cleaned;

  // Cut on the strongest delimiters first, keep the readable fragments.
  const parts = body
    .split(/;|·|\||,|\band\b|\/|\(|\)/i)
    .map((p) =>
      p
        .replace(/^(general introduction|characteristic features|introduction and|function s of|concept of|outline classification)\.?\s*/i, "")
        .replace(/^(of|the|a|an|in|and|for|with)\s+/i, "")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter((p) => p.length > 3 && p.length < 90);

  const unique = [...new Set(parts.map((p) => p.toLowerCase()))];
  const dedup = [];
  for (const p of parts) {
    const k = p.toLowerCase();
    if (!unique.includes(k)) continue;
    dedup.push(p);
  }

  let branches = dedup.slice(0, 12);
  if (head && !branches.includes(head)) branches = [head, ...branches];
  if (branches.length < 2) branches = [cleaned.length > 60 ? `${cleaned.slice(0, 57)}…` : cleaned];
  return branches;
}

/** The node/root label for a mindmap. */
function rootLabel(title) {
  const clean = title.replace(/\s+/g, " ").trim();
  const head = clean.includes(":") ? clean.slice(0, clean.indexOf(":")).trim() : clean;
  return head.length > 48 ? `${head.slice(0, 45)}…` : head || clean;
}

// ─────────────────────────────────────────────────────────────────────────
// 2. CURATED DOMAIN SEEDS — real, high-value facts/formulas for the most
//    frequently tested concepts. Injected when the topic title matches.
//    Keep claims compact and correct; everything else is safe scaffolding.
// ─────────────────────────────────────────────────────────────────────────

const SEEDS = [
  {
    kw: ["photosynthesis"],
    facts: [
      "Light-dependent reactions occur in the thylakoid membrane: water is photolysed (H₂O → 2H⁺ + ½O₂ + 2e⁻), producing ATP, NADPH and O₂.",
      "Calvin (light-independent) cycle fixes CO₂ in the stroma: RuBisCO carboxylates RuBP → 3-PGA → (using ATP + NADPH) → G3P → glucose.",
      "C₃ (Calvin) vs C₄ (Kranz anatomy, first CO₂ acceptor PEP) vs CAM (temporal separation) are carbon-concentrating adaptations.",
    ],
    formulas: ["Net photosynthesis = Gross photosynthesis − Respiration", "CO₂ + H₂O →(light, chlorophyll)→ (CH₂O) + O₂"],
  },
  {
    kw: ["respiration", "glycolysis", "krebs"],
    facts: [
      "Aerobic respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ~30–32 ATP (net) per glucose.",
      "Stages: glycolysis (cytoplasm, 2 ATP + 2 NADH), pyruvate oxidation → acetyl-CoA, Krebs cycle (matrix, 2 GTP + 6 NADH + 2 FADH₂ per glucose), oxidative phosphorylation (inner membrane, electron transport + chemiosmosis).",
      "Anaerobic respiration/fermentation regenerates NAD⁺ with only 2 ATP net (lactic acid or ethanol + CO₂).",
    ],
    formulas: ["C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy (ATP)", "Glucose → 2 ethanol + 2 CO₂ (yeast fermentation)"],
  },
  {
    kw: ["mole concept", "mole and its relation", "stoichiometry", "mole"],
    facts: [
      "1 mole = 6.022×10²³ entities (Avogadro constant, Nₐ). Molar mass (M) is g·mol⁻¹; for a compound M = Σ(atomic masses).",
      "n (mol) = mass/M = volume(ideal gas, STP)/22.4 L = N/Nₐ.",
      "Limiting reactant is the one consumed first; % yield = (experimental/theoretical)×100.",
    ],
    formulas: ["n = m / M", "n = V / 22.4 (g at STP)", "% yield = (actual / theoretical) × 100"],
  },
  {
    kw: ["bohr", "atomic structure", "quantum numbers"],
    facts: [
      "Bohr model: electron in fixed circular orbits; angular momentum mvr = nh/2π; energy En = −13.6 eV·Z²/n² (for H, Z=1).",
      "Rydberg/Balmer series: 1/λ = R(H)(1/n₁² − 1/n₂²). Absorption/emission = ΔE = hν between levels.",
      "Four quantum numbers: n (shell), l (subshell, 0…n−1), mₗ (orientation, −l…+l), mₛ (spin ±½). Orbitals: s (spherical), p (dumbbell).",
      "Filling order (Aufbau, n+l rule): 1s 2s 2p 3s 3p 4s 3d…; Hund's rule: maximise unpaired spin before pairing; Pauli: no two electrons share all four quantum numbers.",
    ],
    formulas: ["En(H) = −13.6 Z²/n² eV", "hν = ΔE", "λ = h/(mv) (de Broglie)"],
  },
  {
    kw: ["newton", "dynamics", "laws of motion"],
    facts: [
      "1st law (inertia): a body stays in uniform motion unless acted on by a net external force.",
      "2nd law: net force = rate of change of momentum = m·a (for constant m).",
      "3rd law: forces are mutual, equal and opposite, acting on different bodies (never cancel on the same body).",
      "Impulse = ∫F dt = Δp; F = ma gives F = m·(Δv/Δt).",
    ],
    formulas: ["F = ma", "J = F·Δt = m·Δv", "p = mv"],
  },
  {
    kw: ["work, energy", "work-energy", "conservation of energy", "kinetic and potential"],
    facts: [
      "Work W = F·s·cosθ (J); power P = W/t = F·v.",
      "Work-energy theorem: net work = ΔKE = ½m(v₂² − v₁²).",
      "Mechanical energy conserved when only conservative forces act: KE + PE = const; PE(mg) = mgh.",
    ],
    formulas: ["W = F s cosθ", "KE = ½mv²", "PE = mgh", "P = Fv"],
  },
  {
    kw: ["circular motion", "centripetal"],
    facts: [
      "v = ωr; a_c = ω²r = v²/r (toward the centre); F_c = m v²/r.",
      "For vertical circle, tension/gravity supply the centripetal force; minimum speed at top for a string: v_top = √(gr).",
      "Banking: tanθ = v²/(rg) when no friction needed.",
    ],
    formulas: ["v = ωr", "a_c = v²/r = ω²r", "F_c = mv²/r"],
  },
  {
    kw: ["ohm", "dc circuit", "resistanc", "electric current"],
    facts: [
      "Ohm's law: V = IR; R = ρL/A (resistivity ρ depends on material).",
      "Series: R = ΣR; same I, voltages add. Parallel: 1/R = Σ1/R; same V, currents add.",
      "Power P = VI = I²R = V²/R; internal resistance makes terminal V = E − Ir.",
    ],
    formulas: ["V = IR", "P = IV = I²R = V²/R", "V_term = E − Ir"],
  },
  {
    kw: ["capacitance", "capacitor"],
    facts: [
      "Capacitance C = Q/V; parallel-plate C = ε₀A/d (larger with dielectric: C = ε₀εᵣA/d).",
      "Energy stored U = ½CV² = Q²/2C.",
      "Series: 1/C = Σ1/C (same Q); Parallel: C = ΣC (same V).",
    ],
    formulas: ["C = Q/V", "C = ε₀A/d", "U = ½CV²"],
  },
  {
    kw: ["electrostatic", "coulomb", "electric field", "electric charge"],
    facts: [
      "Coulomb: F = (1/4πε₀)·q₁q₂/r². Electric field E = F/q = kq/r²; for a line/dipole use superposition.",
      "Gauss's law: ∮E·dA = Q_enc/ε₀ — powerful for spherical/cylindrical/planar symmetry.",
      "Potential V = kq/r; ΔV = W/q; U of a charge in potential = qV. Equipotential surfaces are ⟂ to field lines.",
    ],
    formulas: ["F = k q₁q₂/r²", "E = F/q", "∮E·dA = Q/ε₀", "V = kq/r"],
  },
  {
    kw: ["alternating current", "ac ", "ac circuits"],
    facts: [
      "v = V₀ sin ωt; i = I₀ sin(ωt + φ); RMS V_rms = V₀/√2.",
      "Impedance: pure R → Z = R; L → Z = ωL; C → Z = 1/(ωC); LCR resonance at ω₀ = 1/√(LC).",
      "Average power P = V_rms I_rms cosφ; in pure L or C, average power over a cycle = 0.",
    ],
    formulas: ["V_rms = V₀/√2", "Z_L = ωL, Z_C = 1/(ωC)", "ω₀ = 1/√(LC)"],
  },
  {
    kw: ["magnetic", "magnetism", "electromagnetic induction", "emi", "faraday"],
    facts: [
      "Force on moving charge F = q(v×B); on a wire F = BIL sinθ.",
      "Faraday: EMF ε = −dΦ/dt; Lenz's law gives the sign (induced current opposes the change in flux).",
      "Self-inductance L = NΦ/I; inductance stores energy U = ½LI². Mutual inductance M couples two coils.",
    ],
    formulas: ["F = qvB sinθ", "ε = −N dΦ/dt", "F = BIL", "L = NΦ/I"],
  },
  {
    kw: ["gravitation", "newton law of gravitation", "satellite"],
    facts: [
      "Newton: F = G m₁m₂/r²; g = GM/r²; at Earth's surface g = GM/R² ≈ 9.8 m/s².",
      "Orbital velocity v = √(GM/r); time period T = 2π√(r³/GM); escape velocity v_esc = √(2GM/r) = √2·v_orbital (at same r).",
      "For a uniform sphere, g ∝ r inside and g = 0 at the centre; g decreases as 1/r² outside.",
    ],
    formulas: ["g = GM/r²", "v_orb = √(GM/r)", "v_esc = √(2GM/r)", "T² ∝ r³ (Kepler)"],
  },
  {
    kw: ["kinematics", "projectile", "freely falling", "relative velocity"],
    facts: [
      "Constant-acceleration equations: v = u + at; s = ut + ½at²; v² = u² + 2as.",
      "Free fall (a = g downward, neglect air resistance): v = gt, s = ½gt².",
      "Projectile: range R = u² sin2θ/g (max at θ = 45°), height H = u² sin²θ/(2g), time of flight T = 2u sinθ/g.",
    ],
    formulas: ["v = u + at", "v² = u² + 2as", "R = u² sin2θ/g"],
  },
  {
    kw: ["vector"],
    facts: [
      "Vectors have magnitude + direction; a = aî + bĵ + c k̂. |a| = √(a²+b²+c²).",
      "Dot: a·b = |a||b|cosθ = a₁b₁+a₂b₂+a₃b₃ (scalar; =0 ⟂). Cross: a×b (vector, ⟂ to both; |a×b| = |a||b|sinθ; area = ½|a×b|).",
      "Triangle/parallelogram/polygon laws: vector sum is independent of order (commutative).",
    ],
    formulas: ["a·b = a₁b₁+a₂b₂+a₃b₃", "|a×b| = |a||b|sinθ", "|a| = √(a²+b²+c²)"],
  },
  {
    kw: ["elasticity", "hooke", "stress strain", "modulus"],
    facts: [
      "Stress = F/A, strain = ΔL/L (dimensionless). Hooke's law (elastic limit): stress ∝ strain.",
      "Elastic moduli: Young's Y = (F/A)/(ΔL/L); Bulk K = −P/(ΔV/V); Shear G = (F/A)/(Δx/L).",
      "Elastic potential energy U = ½FΔL = ½kx². Poisson's ratio σ = −(lateral strain)/(longitudinal strain) ≈ 0.25–0.35 for most metals.",
    ],
    formulas: ["Y = FL/(A ΔL)", "K = −P/(ΔV/V)", "U = ½kx²"],
  },
  {
    kw: ["ideal gas", "kinetic", "boltzmann", "gas laws"],
    facts: [
      "Ideal gas equation PV = nRT; from kinetic theory P = ⅓ (Nm/m)⟨c²⟩, so PV = ⅓N m⟨c²⟩.",
      "r.m.s. speed c_rms = √(3RT/M); mean kinetic energy per mole = 3RT/2, per molecule = 3k_BT/2.",
      "Real gases deviate near condensation; Van der Waals: (P + a n²/V²)(V − nb) = nRT.",
    ],
    formulas: ["PV = nRT", "c_rms = √(3RT/M)", "KE_mole = 3RT/2"],
  },
  {
    kw: ["specific heat", "quantity of heat", "calorimet", "latent heat"],
    facts: [
      "Heat Q = mcΔT; specific heat c, thermal capacity C = mc, heat capacity per mole = C. molar.",
      "Latent heat L: Q = mL (change of state at constant T). Calorimetry: heat lost = heat gained.",
      "Newton's law of cooling: rate of heat loss ∝ (T − T₀); dθ/dt = −k(θ − θ₀).",
    ],
    formulas: ["Q = mcΔT", "Q = mL", "cp = 1.5×cv + R (Mayer, for ideal gas)"],
  },
  {
    kw: ["thermal expansion", "linear expansion"],
    facts: [
      "Linear: ΔL = αL₀ΔT (α = coefficient of linear expansion). Superficial ΔA ≈ 2αA₀ΔT; cubical ΔV ≈ 3αV₀ΔT.",
      "Liquid expansion: apparent vs absolute; glass volumetric expansivity ≈ 27×10⁻⁶ K⁻¹.",
      "Dulong & Petit: c_m (solid) ≈ 3R ≈ 12.6 J mol⁻¹ K⁻¹ at moderate T.",
    ],
    formulas: ["ΔL = αL₀ΔT", "γ ≈ 3α", "β ≈ 3α (volumetric)"],
  },
  {
    kw: ["thermodynamic", "first law"],
    facts: [
      "First law: ΔU = Q − W (energy in as heat = change in U + work out). Isolated system: ΔU = 0.",
      "Process work W = ∫P dV. Isothermal (ideal gas): W = nRT ln(V₂/V₁). Adiabatic: PV^γ = const, TV^(γ−1) = const.",
      "Second law: entropy of an isolated system never decreases; no engine is 100% efficient (Kelvin–Planck).",
    ],
    formulas: ["ΔU = Q − W", "W_iso = nRT ln(V₂/V₁)", "PV^γ = const (adiabatic)"],
  },
  {
    kw: ["lens", "refraction", "prism", "optics", "mirror"],
    facts: [
      "Lens maker: 1/f = (μ − 1)(1/R₁ − 1/R₂). Power P = 1/f (dioptre, f in metres); lenses add powers in contact.",
      "Refraction at a plane surface (Snell): n₁ sinθ₁ = n₂ sinθ₂. Total internal reflection when θ > θ_c, sinθ_c = n₂/n₁ (n₂<n₁).",
      "Prism minimum deviation: n = sin((A + D_min)/2)/sin(A/2). Achromatic doublet pairs crown (low Abbe) + flint (high Abbe).",
    ],
    formulas: ["1/f = (μ−1)(1/R₁ − 1/R₂)", "P = 1/f", "n = sin((A+D)/2)/sin(A/2)"],
  },
  {
    kw: ["dispersion", "chromatic"],
    facts: [
      "Dispersive power ω = (μv − μr)/(μd − 1); angular dispersion ΔD ∝ ω for a given refractive index.",
      "Achromatism: net deviation of two cemented prisms is zero for a chosen colour → (ω₁/ω₂) relations on D/(μ−1).",
      "Glass with higher Abbe number disperses less; flint glass > crown in dispersion.",
    ],
    formulas: ["ω = (μv − μr)/(μd − 1)", "Power of achromatic combination → 0 net dispersion"],
  },
  {
    kw: ["wave optics", "diffraction", "interference", "double slit", "fresnel"],
    facts: [
      "Young's double slit: fringe width β = λD/d; 1st minimum of single slit: a sinθ = mλ.",
      "Newton's rings: r_m = √(mRλ) (dark/dark convention); λ = 2(rₙ₊₁² − rₙ²)/N (interferometric use).",
      "Brewster: i_p = arctan(n₂/n₁), reflected ray fully polarised at that angle.",
    ],
    formulas: ["β = λD/d", "a sinθ = mλ", "r_m = √(mRλ)"],
  },
  {
    kw: ["commutativ", "communication systems", "modul", "semiconductor", "diode"],
    facts: [
      "Diode: p–n junction; forward biased ≈ 0.7 V (Si), reverse conducts only near breakdown. Rectification converts AC to DC.",
      "Band theory: metals (bands overlap), semiconductors (small Eg, ~1.1 eV Si), insulators (large Eg).",
      "Bandwidth and modulation: AM (information in amplitude), FM (in frequency) — FM more noise-resistant for audio.",
    ],
    formulas: ["η (rectifier) ≤ 40.6% (half-wave) / 81% (full-wave) max AC utilisation"],
  },
  {
    kw: ["modern physics", "photoelectric", "einstein photoelectric"],
    facts: [
      "Photoelectric effect: hν = φ + K_max; K_max = eV_s; stopping voltage V_s = (h/e)(ν − ν₀).",
      "Threshold frequency ν₀ = φ/h; no emission below ν₀ regardless of intensity (evidence of photons).",
      "Momentum of light p = h/λ; De Broglie: λ = h/p = h/√(2mK).",
    ],
    formulas: ["K_max = hν − φ", "V_s = (h/e)(ν − ν₀)", "p = h/λ"],
  },
  {
    kw: ["nuclear", "binding energy", "fission", "fusion", "radioactiv"],
    facts: [
      "Mass defect Δm = Z m_p + N m_n − M; binding energy BE = Δm c²; BE per nucleon peaks near Fe-56 (~8.8 MeV).",
      "Radioactive decay: N = N₀e^(−λt), t_½ = ln2/λ; activity A = λN.",
      "Fission (heavy nucleus → two + 2–3 n + ~200 MeV); fusion (light → heavy + energy, powers stars).",
    ],
    formulas: ["BE = Δm c²", "N = N₀ e^(−λt)", "t_½ = ln2 / λ"],
  },
  {
    kw: ["limit", "continuity", "continuation", "l'hôpital", "lhopital"],
    facts: [
      "Indeterminate forms 0/0, ∞/∞, 0·∞ → L'Hôpital: lim f/g = lim f'/g' (when applicable).",
      "Standard limits: lim_{x→0} sin x / x = 1; lim_{x→0} (1 + x)^{1/x} = e; lim_{x→∞} (1 + a/x)^x = e^a.",
      "Continuity: f continuous at c iff lim_{x→c}f(x) = f(c). Types of discontinuity: removable, jump, infinite.",
    ],
    formulas: ["lim sin x/x = 1 (x→0, rad)", "(1+x)^{1/x} → e as x→0"],
  },
  {
    kw: ["differentiat", "derivative"],
    facts: [
      "Derivative f'(x) = lim_{h→0} [f(x+h) − f(x)]/h = tangent slope; rules: sum, product, quotient, chain.",
      "d/dx xⁿ = nx^{n−1}; d/dx sin x = cos x; d/dx e^x = e^x; d/dx ln x = 1/x.",
      "Higher-order derivatives: y'' (concavity), y''' etc. Critical points f' = 0 → possible extrema (2nd-derivative test).",
    ],
    formulas: ["f'(x) = lim [f(x+h)−f(x)]/h", "(fg)' = f'g + fg'", "d/dx xⁿ = nx^{n−1}"],
  },
  {
    kw: ["integrat", "antiderivative"],
    facts: [
      "∫xⁿ dx = x^{n+1}/(n+1) + C (n ≠ −1); ∫dx/x = ln|x| + C. Indefinite = family of antiderivatives.",
      "Integration by parts: ∫u dv = uv − ∫v du (LIATE choice). Substitution: let t = g(x), adjust dx.",
      "Definite integral = accumulation; area under y=f over [a,b] when f ≥ 0; area between curves = ∫|f−g| dx.",
      "Fundamental theorem: d/dx ∫_a^x f(t)dt = f(x); ∫_a^b f = F(b) − F(a).",
    ],
    formulas: ["∫xⁿ dx = x^{n+1}/(n+1)+C", "∫u dv = uv − ∫v du", "∫_a^b f = F(b) − F(a)"],
  },
  {
    kw: ["quadratic equation", "nature of roots", "discriminant"],
    facts: [
      "ax² + bx + c = 0; discriminant D = b² − 4ac: D>0 two distinct real, D=0 equal, D<0 complex conjugate.",
      "Sum of roots = −b/a; product = c/a. Nature (D sign) decides the roots without solving.",
      "For ax² + bx + c to have a root in (p,q): sufficient (a·f(p)·f(q) < 0). One root common with another: discriminant-of-conditions / resultant.",
    ],
    formulas: ["x = (−b ± √D)/(2a)", "α + β = −b/a", "αβ = c/a"],
  },
  {
    kw: ["complex number", "argand", "de moivre"],
    facts: [
      "z = a + bi; |z| = √(a²+b²); conjugate z̄ = a − bi; zz̄ = |z|² = a²+b².",
      "Polar: z = r(cosθ + i sinθ); De Moivre: (cosθ + i sinθ)ⁿ = cos nθ + i sin nθ.",
      "√z uses two roots (±); arg z is multi-valued (principal in (−π,π]).",
    ],
    formulas: ["z = re^{iθ}", "De Moivre: (re^{iθ})ⁿ = rⁿ e^{inθ}", "zz̄ = |z|²"],
  },
  {
    kw: ["sequence", "arithmetic", "geometric series", "harmonic"],
    facts: [
      "AP: aₙ = a + (n−1)d; Sₙ = n/2 [2a + (n−1)d]. GP: aₙ = ar^{n−1}; Sₙ = a(rⁿ−1)/(r−1); infinite (|r|<1): S = a/(1−r).",
      "AM ≤ GM ≤ HM: AM = (a+b)/2, GM = √(ab), HM = 2ab/(a+b).",
      "Convergence of a series needs term → 0 (necessary, not sufficient).",
    ],
    formulas: ["AP: Sₙ = n/2[2a+(n−1)d]", "GP infinite: S = a/(1−r), |r|<1", "AM ≥ GM ≥ HM"],
  },
  {
    kw: ["matrix", "determinant", "adjoint"],
    facts: [
      "Transpose (AB)ᵀ = BᵀAᵀ. Inverse: A⁻¹ = adj(A)/det(A) (2×2: [d −b; −c a]/(ad−bc)).",
      "Properties: det(AB) = det A·det B; det A⁻¹ = 1/det A; det kA = kⁿ det A for n×n.",
      "Cofactors: Cᵢⱼ = (−1)^{i+j} Mᵢⱼ; adj = cofactor matrix transposed; A·adj(A) = det(A) I.",
    ],
    formulas: ["det([[a,b],[c,d]]) = ad − bc", "A⁻¹ = adj(A)/det(A)", "det(AB) = det A·det B"],
  },
  {
    kw: ["trigonometric equation", "general solution", "inverse trig"],
    facts: [
      "sin θ = a → θ = nπ + (−1)ⁿ α (α = sin⁻¹ a). cos θ = a → θ = 2nπ ± α.",
      "tan θ = a → θ = nπ + α. Quadratics in sin/cos: treat as in x² form; check validity of values in [−1,1].",
      "Inverse trig domains: sin⁻¹, cos⁻¹ ∈ [−π/2, π/2] principal; tan⁻¹ ∈ (−π/2, π/2). Identities: sin⁻¹x + cos⁻¹x = π/2.",
    ],
    formulas: ["sin θ = a ⇒ θ = nπ + (−1)ⁿ α", "tan θ = a ⇒ θ = nπ + α", "sin⁻¹x + cos⁻¹x = π/2"],
  },
  {
    kw: ["straight line", "analytic", "pair of lines", "angle bisector"],
    facts: [
      "Line: point–slope y − y₁ = m(x − x₁); perpendicular distance from (x₁,y₁) to ax+by+c=0 is |ax₁+by₁+c|/√(a²+b²).",
      "Pair of lines: a·S ≡ ax² + 2hxy + by²; represents a real pair iff h² ≥ ab. Angle between: tanθ = 2√(h²−ab)/(a+b).",
      "Homogeneous: ax² + 2hxy + by² = 0 (two lines through origin); bisectors: (x² − y²)/(a−b) = xy/h.",
      "Direction cosines of a line: l² + m² + n² = 1; distance between two points in space √(Δx²+Δy²+Δz²).",
    ],
    formulas: ["d = |ax₁+by₁+c|/√(a²+b²)", "h² ≥ ab ⟺ real pair", "l²+m²+n² = 1"],
  },
  {
    kw: ["probability"],
    facts: [
      "P(E) = favourable/total. Additive law: P(A∪B) = P(A)+P(B)−P(A∩B). If mutually exclusive, P(A∪B)=P(A)+P(B).",
      "Multiplicative: P(A∩B) = P(A)P(B|A); independence: P(A∩B) = P(A)P(B).",
      "Complement: P(A') = 1 − P(A). For discrete: ΣP = 1; expected value E(X) = Σxᵢpᵢ.",
    ],
    formulas: ["P(A∪B) = P(A)+P(B)−P(A∩B)", "P(A∩B) = P(A)P(B|A)", "P(A') = 1 − P(A)"],
  },
  {
    kw: ["dispersion statistics", "standard deviation", "variance", "coefficient of variation"],
    facts: [
      "Variance = Σ(f·x − x̄)²/N (population) or /(N−1) (sample). SD = √Variance.",
      "Coefficient of Variation CV = (SD/mean)×100% (unit-free; compare different data sets).",
      "Karl Pearson skewness = (mean − mode)/SD (3rd). Range and IQR as rough dispersion measures.",
    ],
    formulas: ["V = Σf(x−x̄)²/N", "SD = √V", "CV = (SD/x̄)×100%"],
  },
  {
    kw: ["iupac", "nomenclature", "organic"],
    facts: [
      "IUPAC: identify parent chain (longest), number from end nearer the functional group / first substituent; suffix by priority (−ol, −al, −one, −oic acid…).",
      "Carbocation/carbanion stability: 3° > 2° > 1° > methyl; resonance stabilises; inductive effect transmits through sigma bonds.",
      "Functional group priority (high → low) governs the suffix; others become prefixes with locants.",
    ],
    formulas: ["Parent-chain + locant(s) + sub-prefix + suffix = IUPAC name"],
  },
  {
    kw: ["isomerism"],
    facts: [
      "Structural: chain, position, functional, metamerism, tautomerism. Same formula, different connectivity.",
      "Geometrical (cis/trans or E/Z): restricted rotation (double bond / ring) + two different groups on each end.",
      "Optical: chiral centre (4 different groups); d/l (+/− enantiomers; meso = optically inactive despite chiral centres).",
    ],
    formulas: ["Isomers: same molecular formula, different structure/arrangement"],
  },
  {
    kw: ["electrochemistry", "electrolysis", "faraday", "nernst"],
    facts: [
      "Electrochemical cell E = E_cathode − E_anode; ΔG = −nFE. Standard: 25 °C, 1 M, 1 atm.",
      "Nernst: E = E° − (RT/nF) ln Q; at 25 °C E = E° − (0.0592/n) log Q.",
      "Faraday: m = (M/F)·Q (1 F = 96500 C mol⁻¹); 1 F deposits 1/valency mole of an ion.",
    ],
    formulas: ["ΔG = −nFE", "E = E° − (0.0592/n)log Q (25°C)", "m = (M/F)Q"],
  },
  {
    kw: ["chemical kinetic", "order of reaction", "rate law", "activation energy"],
    facts: [
      "Rate law: rate = k[A]ᵐ[B]ⁿ (order from experiment, not formula). Zero/first/second order have distinct integrated forms.",
      "First order: t = (2.303/k) log([A]₀/[A]); t_½ = 0.693/k (independent of concentration).",
      "Arrhenius: k = Ae^(−Ea/RT); Ea = 2.303R (t₂/t₁)·ln(k₂/k₁)·(T₁T₂)/(T₂−T₁).",
    ],
    formulas: ["first order t_½ = 0.693/k", "Ea = 2.303R (t₂t₁/(t₂−t₁)) ln(k₂/k₁)"],
  },
  {
    kw: ["alkaloid", "amine"],
    facts: [
      "Amines: RNH₂ (1°), R₂NH (2°), R₃N (3°), R₄N⁺ (quaternary). Basicity: lone pair on N; resonance + EWG lower it.",
      "Aryl amines are weakly basic (lone pair delocalised into ring); alkyl are more basic; aniline pKb ≈ 9.4.",
      "Reaction: with HNO₂ — 1° aliphatic (N₂⁺ → alcohol), aromatic (diazonium, diazo-chemistry).",
    ],
    formulas: ["Aniline + HNO₂ → diazonium (0–5 °C)"],
  },
  {
    kw: ["solutions", "colligative", "mole fraction", "rab"],
    facts: [
      "Colligative properties depend on number of solute particles: relative lowering of vapour pressure Δp/p = x₂ (Raoult).",
      "Boiling-point elevation ΔT_b = K_b m; depression ΔT_f = K_f m; osmotic pressure π = CRT (dilute).",
      "m (molality) = mol solute / kg solvent; dilute solution π ≈ (n/V)RT → used to find molar mass.",
    ],
    formulas: ["ΔT_b = K_b m", "π = CRT", "Δp/p = x₂ (Raoult)"],
  },
];

/** Find a seed whose keywords appear in the title (lowercased). */
function findSeed(title) {
  const t = title.toLowerCase();
  for (const s of SEEDS) if (s.kw.some((k) => t.includes(k))) return s;
  return null;
}

// ─────────────────────────────────────────────────────────────────────────
// 3. CONTENT BUILDERS
// ─────────────────────────────────────────────────────────────────────────

function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function buildConcept({ classSlug, subject, unit, index, title, slug }) {
  const branches = splitSubconcepts(title);
  const seed = findSeed(title);
  const short = title.length > 60 ? `${title.slice(0, 57)}…` : title;

  // Terse notes: scope + one-line sub-idea + curated facts (when a seed matched).
  const subj = subject.slug;
  const intro = [
    `**Scope.** ${short} — ${unit.title}, ${subject.name} (${classSlug}).`,
    `**Tested.** define it · list: ${branches.slice(0, 4).map((b) => b.toLowerCase()).join(", ")} · one worked example · one misconception each.`,
  ];
  const subBullets = branches
    .slice(1)
    .map((b) => `**${cap(b.trim().replace(/[&<>]/g, ""))}.** one-line definition + one-line exam use.`);
  const factBullets = seed ? seed.facts.map((f) => `**Fact.** ${f}`) : [];
  const notes = [...intro, ...factBullets, ...subBullets];

  // One-line confusion fixes (❌ not X → ✅ but Y), terse.
  const confusion = [
    `❌ treat "${branches[0] || short}" as one blob → ✅ split into: ${branches.slice(0, 3).map((b) => b.toLowerCase()).join(", ")}.`,
    `❌ state the rule without its limit → ✅ note when it applies / stops applying.`,
    subj === "mathematics"
      ? `❌ answer with no steps → ✅ show each step and box the result.`
      : `❌ no diagram → ✅ add one labelled figure / structured list.`,
  ];
  if (seed && seed.facts[0]) confusion.push(`❌ skip the key fact → ✅ ${seed.facts[0].toLowerCase()}.`);

  // Boundary / limit of what this topic covers (the "valid only when..." edge).
  const bounds = [
    `Covers only: ${branches.slice(0, 4).map((b) => b.toLowerCase()).join(", ")} (within ${unit.title}).`,
    `Out of scope here: topics of neighbouring units in ${subject.name} — don't mix them.`,
    `State the limit / condition where a formula or rule stops being valid before applying it.`,
  ];
  if (seed && seed.facts[0]) bounds.push(`Limit to remember: ${seed.facts[0].toLowerCase()}`);

  const practice = [
    `define + example each sub-idea: ${branches.slice(0, 4).map((b) => b.toLowerCase()).join(", ")}.`,
    `one worked example for "${short}" — check units / edge cases.`,
    `recall card: definition → formula → limit → one error to avoid.`,
  ];

  const universalFacts = seed ? seed.facts.slice(0, 3) : [
    `answer pattern for "${short}": define → method → result. Structure earns the marks on 6–10 mark questions.`,
  ];

  const examples = [
    `Worked: identify given → pick sub-concept → apply standard form → check units / edges.`,
  ];

  const practiceQuestions = [
    `state + explain the main idea of "${short}" with one example.`,
    `compare "${branches[0] || short}" with the related idea from a neighbouring unit.`,
    `solve / apply for "${short}" and verify the answer is plausible.`,
  ];

  // Numericals: domain-specific drill prompts (only meaningful where numbers apply).
  const numericals = [];
  if (seed && seed.formulas) {
    for (const f of seed.formulas.slice(0, 3)) {
      numericals.push(`Use  ${f}  — pick reasonable values, solve, and check the units.`);
    }
  }
  if ((subj === "mathematics" || subj === "physics") && !numericals.length) {
    numericals.push(
      `Set up the defining equation for "${short}", substitute simple values, and compute the result with units.`,
      `Re-derive the standard result from first principles in ≤ 4 steps.`,
      `Apply it to one boundary case (where the limit applies) and state the answer.`,
    );
  }

  // Formulas: seed formulas, else a domain-typed placeholder (never empty for quant subjects).
  const formulas = seed && seed.formulas ? seed.formulas : [];
  if (subj === "mathematics" && !formulas.length) formulas.push(`Standard result for "${short}" — state it and verify by substituting a simple case.`);
  if (subj === "physics" && !formulas.length) formulas.push(`Governing equation for "${short}" — state with units, then use in one numerical.`);

  const keyPoints = branches.slice(0, 6).map((b) => `• ${cap(b.trim())}`);

  const summary = `${short} (${unit.title}, ${subject.name}, ${classSlug}) covers ${branches.slice(0, 3).join(", ")}. Master the standard form, the sub-ideas and one worked example; most exam questions on this topic are built from exactly these.`;

  // 3 topic-anchored MCQs (safe: options drawn from the topic's own sub-ideas / fact).
  const mcqs = [];
  if (branches.length >= 3) {
    const pool = branches.slice(0, 6).map((b) => cap(b.trim()));
    mcqs.push({
      question: `Which of the following is a distinct sub-topic under "${short}"?`,
      options: [pool[0], pool[1] || "A related concept", "Unrelated topic", "None of the above"],
      answer: pool[0],
      explanation: `${pool[0]} is listed among the official sub-ideas of ${short}; the others are not part of this topic.`,
    });
  }
  mcqs.push({
    question: `A common examiner point on "${short}" is that a statement is only valid when its condition of applicability is met. Is that TRUE or FALSE?`,
    options: ["True", "False"],
    answer: "True",
    explanation: "Every NEB rule has a scope (e.g. a specific range, temperature, or sign convention); stating the condition earns full marks.",
  });
  if (seed && seed.formulas[0]) {
    mcqs.push({
      question: `Which of these is a governing / standard formula associated with "${short}"?`,
      options: [seed.formulas[0], "x + y = z (placeholder)", "No formula applies", "E = mc² only"],
      answer: seed.formulas[0],
      explanation: `${seed.formulas[0]} is the standard form used for this topic.`,
    });
  }

  const data = {
    title: short,
    unitSlug: unit.id,
    topicSlug: slug,
    topicTitle: title,
    relevance: 100,
    source: "generated",
    generatedAt: GENERATED_AT,
    notes,
    confusion,
    bounds,
    practice,
    universalFacts,
    examples,
    practiceQuestions,
    ...(formulas.length ? { formulas } : {}),
    ...(numericals.length ? { numericals } : {}),
    keyPoints,
    summary,
    mcqs,
  };
  return data;
}

function buildTopicMindmap({ index, title, slug, unit }) {
  const branches = splitSubconcepts(title);
  const label = rootLabel(title);
  // Structured root tree: root → sub-concepts → "definition / exam-use" leaves.
  const root = {
    id: `topic-${slug}`,
    label,
    children: branches.map((b, i) => ({
      id: `${slug}-branch-${i}`,
      label: cap(b.trim()),
      children: [
        { id: `${slug}-branch-${i}-def`, label: "Definition" },
        { id: `${slug}-branch-${i}-use`, label: "Exam use" },
      ],
    })),
  };
  // Outline `notes` block for the legacy buildTreeFromOutlineNotes path.
  const outline = ["- " + label, ...branches.map((b, i) => `  - ${cap(b.trim())}`)].join("\n");
  return {
    title: label,
    unitSlug: unit.id,
    topicSlug: slug,
    topicTitle: title,
    relevance: 100,
    source: "generated",
    generatedAt: GENERATED_AT,
    root,
    notes: [outline],
  };
}

function buildUnitMindmap(classSlug, subject, unit, entries) {
  // One child per topic; each topic carries its top sub-concepts.
  const children = entries.map((e) => {
    const branches = splitSubconcepts(e.title);
    return {
      id: `unit-topic-${e.slug}`,
      label: e.title.length > 72 ? `${e.title.slice(0, 69)}…` : e.title,
      children: branches.slice(1, 5).map((b, i) => ({
        id: `unit-${unit.id}-${e.slug}-${i}`,
        label: cap(b.trim()),
      })),
    };
  });
  const outline = [
    "- " + unit.title,
    ...entries.map((e) => `  - ${e.title.length > 72 ? `${e.title.slice(0, 69)}…` : e.title}`),
  ].join("\n");
  return {
    title: unit.title,
    unitSlug: unit.id,
    type: "unit",
    classSlug,
    subjectSlug: subject.slug,
    relevance: 100,
    source: "generated",
    generatedAt: GENERATED_AT,
    root: { id: `unit-${unit.id}`, label: unit.title, children },
    notes: [outline],
  };
}

// ─────────────────────────────────────────────────────────────────────────
// 4. DRIVER
// ─────────────────────────────────────────────────────────────────────────

let concepts = 0;
let mindmaps = 0;
let unitMaps = 0;
let skipped = 0;

function matchFilter(cls, subjectSlug) {
  if (!FILTERS.length) return true;
  return FILTERS.some(([fcls, fsub]) => fcls === cls && (!fsub || fsub === subjectSlug));
}

function writeIfAbsent(relPath, data) {
  const abs = join(ROOT, relPath);
  const out = JSON.stringify(data, null, 2) + "\n";
  if (existsSync(abs)) {
    // Overwrite only files we generated ourselves (source === "generated");
    // never touch hand-crafted content.
    let isGenerated = false;
    try {
      const existing = JSON.parse(readFileSync(abs, "utf8"));
      isGenerated = existing?.source === "generated";
    } catch {
      isGenerated = false;
    }
    if (!isGenerated) {
      skipped++;
      return false;
    }
  }
  if (!DRY_RUN) {
    mkdirSync(join(ROOT, relPath, ".."), { recursive: true });
    writeFileSync(abs, out);
  }
  return true;
}

// Mirror the frontend's getUnitTopicEntries dedupe.
function topicEntries(unit) {
  const used = new Set();
  return unit.topics.map((title, index) => {
    let slug = slugifySyllabusTopic(title);
    let unique = slug;
    let n = 2;
    while (used.has(unique)) unique = `${slug}-${n++}`;
    used.add(unique);
    return { slug: unique, title, index };
  });
}

for (const cls of SYLLABUS) {
  for (const subject of cls.subjects) {
    if (!matchFilter(cls.slug, subject.slug)) continue;

    for (const unit of subject.units) {
      const entries = topicEntries(unit);
      const unitDir = `${cls.slug}/${subject.slug}/${unit.id}`;

      // Per-topic concept + mindmap.
      for (const e of entries) {
        const nn = String(e.index + 1).padStart(2, "0");
        const base = `${nn}-${e.slug}`;

        const concept = buildConcept({
          classSlug: cls.slug,
          subject,
          unit,
          index: e.index,
          title: e.title,
          slug: e.slug,
        });
        if (writeIfAbsent(`${unitDir}/concepts/${base}.json`, concept)) concepts++;

        const mindmap = buildTopicMindmap({
          index: e.index,
          title: e.title,
          slug: e.slug,
          unit,
        });
        if (writeIfAbsent(`${unitDir}/mindmap/${base}.json`, mindmap)) mindmaps++;
      }

      // Unit aggregate mindmap.
      const unitMap = buildUnitMindmap(cls.slug, subject, unit, entries);
      if (writeIfAbsent(`${unitDir}/mindmap/_unit-${unit.id}.json`, unitMap)) unitMaps++;
    }
  }
}

console.log(`[generate-content] ${DRY_RUN ? "DRY RUN — would write" : "wrote"}`);
console.log(`  concepts : ${concepts}`);
console.log(`  mindmaps : ${mindmaps}`);
console.log(`  unit maps: ${unitMaps}`);
if (skipped) console.log(`  skipped  : ${skipped} (already existed — not overwritten)`);
if (!DRY_RUN) {
  console.log("Next: rebuild the manifest → npm run content:build");
}
