import type { LucideIcon } from "lucide-react";
import {
  Atom,
  BookOpen,
  Calculator,
  CalendarCheck,
  Dna,
  FileText,
  FlaskConical,
  GitBranch,
  GraduationCap,
  Highlighter,
  Languages,
  Lightbulb,
  Microscope,
  Network,
  PenLine,
  Ruler,
  ScrollText,
  Sigma,
  Waypoints,
  Workflow,
} from "lucide-react";

/**
 * The six subject rails that stream across the home page.
 *
 * Owner request 2026-10-05: "6 new interfaces on home where slides animate
 * continuously … in horizontal position … like going continuously through the
 * end, and those slides are of the 6 subjects — hints for exam, solved pyqs,
 * formulas, diagrams of biology … in their respective place".
 *
 * Extended the same day: "make them fully academic and filled with details —
 * a concept, its formula, special cases with conditions, formula-solved
 * examples, limitations, knowledge, derivations (full), its shortcuts,
 * pyqs-application … more of grade 11 for now, for 12 will be added later".
 *
 * Every card is a self-contained Class 11 knowledge card with eight labelled
 * rows running Concept → Formula → Conditions → Special cases → Solved example
 * → Limitation → Derivation → Exam shortcut → Board application. Rows carry
 * `kind: "formula"` when they must render as a monospace equation block, so a
 * नेपाली card can show "सूत्र / अपवाद / उदाहरण" in the same layout as
 * "Formula / Limit / Solved".
 *
 * Pure data — `components/home/subject-rails.tsx` renders the marquee and
 * `components/home/home-subject-rails.tsx` fills `statKey` slots with counts
 * read from the platform. Every `href` is a route that already ships. Class 12
 * arrives as one "coming next" teaser per rail.
 */

export interface SubjectSlideRow {
  /** Row label: "Formula", "Conditions", "Solved", "सूत्र", "अपवाद" … */
  label: string;
  text: string;
  /** `formula` renders the row as a monospace equation block. */
  kind?: "formula" | "text";
}

export interface HomeSubjectSlide {
  /** Unit / section chip: "Dynamics", "Stoichiometry", "भाषा र व्याकरण". */
  tag: string;
  /** The concept this card teaches. */
  title: string;
  /** Ordered academic rows — seven or eight per card, never a link blurb. */
  rows: SubjectSlideRow[];
  href: string;
  icon: LucideIcon;
  /** Key into the `stats` map (`formula:<slug>` / `pyq:<slug>`). */
  statKey?: string;
  /** Class 12 placeholder card — the promise row, no academic rows. */
  teaser?: boolean;
}

export interface HomeSubjectAccent {
  icon: string;
  soft: string;
  chip: string;
  border: string;
  glow: string;
  text: string;
}

export interface HomeSubjectRail {
  slug: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  accent: HomeSubjectAccent;
  /** One full pass of the rail, e.g. "58s" — also sets the scroll speed. */
  duration: string;
  slides: HomeSubjectSlide[];
}

const PHYSICS: HomeSubjectAccent = {
  icon: "text-sky-500",
  soft: "bg-sky-500/15",
  chip: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  border: "border-sky-500/30 hover:border-sky-500/70 hover:bg-sky-500/5",
  glow: "bg-sky-500/25",
  text: "text-sky-600 dark:text-sky-400",
};

const CHEMISTRY: HomeSubjectAccent = {
  icon: "text-amber-500",
  soft: "bg-amber-500/15",
  chip: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  border: "border-amber-500/30 hover:border-amber-500/70 hover:bg-amber-500/5",
  glow: "bg-amber-500/25",
  text: "text-amber-600 dark:text-amber-400",
};

const BIOLOGY: HomeSubjectAccent = {
  icon: "text-emerald-500",
  soft: "bg-emerald-500/15",
  chip: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  border: "border-emerald-500/30 hover:border-emerald-500/70 hover:bg-emerald-500/5",
  glow: "bg-emerald-500/25",
  text: "text-emerald-600 dark:text-emerald-400",
};

const MATHEMATICS: HomeSubjectAccent = {
  icon: "text-violet-500",
  soft: "bg-violet-500/15",
  chip: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  border: "border-violet-500/30 hover:border-violet-500/70 hover:bg-violet-500/5",
  glow: "bg-violet-500/25",
  text: "text-violet-600 dark:text-violet-400",
};

const ENGLISH: HomeSubjectAccent = {
  icon: "text-blue-500",
  soft: "bg-blue-500/15",
  chip: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  border: "border-blue-500/30 hover:border-blue-500/70 hover:bg-blue-500/5",
  glow: "bg-blue-500/25",
  text: "text-blue-600 dark:text-blue-400",
};

const NEPALI: HomeSubjectAccent = {
  icon: "text-rose-500",
  soft: "bg-rose-500/15",
  chip: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  border: "border-rose-500/30 hover:border-rose-500/70 hover:bg-rose-500/5",
  glow: "bg-rose-500/25",
  text: "text-rose-600 dark:text-rose-400",
};

/**
 * Icon names agents may reference in `rails/*.rail.json` (`card.icon`).
 * The server wrapper (`home-subject-rails.tsx`) resolves these to components
 * — Lucide components can never cross into JSON, so agents pick names only.
 * Unknown names fall back to the rail's own icon.
 */
export const HOME_RAIL_ICONS: Record<string, LucideIcon> = {
  Atom,
  BookOpen,
  Calculator,
  CalendarCheck,
  Dna,
  FileText,
  FlaskConical,
  GitBranch,
  GraduationCap,
  Highlighter,
  Languages,
  Lightbulb,
  Microscope,
  Network,
  PenLine,
  Ruler,
  ScrollText,
  Sigma,
  Waypoints,
  Workflow,
};

/** The one Class 12 card per rail — content for it lands later (owner note). */
const classTwelveTeaser = (name: string): HomeSubjectSlide => ({
  tag: "Class 12",
  title: `${name} Class 12 cards — next in this rail`,
  teaser: true,
  icon: GraduationCap,
  href: "/class-12-notes",
  rows: [
    {
      label: "Status",
      text: `Being authored now in the same eight-row format for the Class 12 ${name.toLowerCase()} syllabus: concept, formula, conditions, special cases, a worked example, the limitation, the full derivation and the board question.`,
    },
    {
      label: "Meanwhile",
      text: "Class 12 notes, theory and PYQs are already readable in the Class 12 track — these Class 11 cards keep streaming until the new ones join them here.",
    },
  ],
});

/** Order matters: it is the order the rails stack in on the home page. */
export const HOME_SUBJECT_RAILS: HomeSubjectRail[] = [
  // ─────────────────────────────── PHYSICS ───────────────────────────────
  {
    slug: "physics",
    name: "Physics",
    tagline: "Mechanics to electronics — laws, derivations and every mark-bearing numerical",
    icon: Atom,
    accent: PHYSICS,
    duration: "58s",
    slides: [
      {
        tag: "Dynamics",
        title: "Newton's second law — F = ma, and why it holds",
        icon: Workflow,
        href: "/derivations/class-11-notes/physics",
        rows: [
          {
            label: "Concept",
            text: "The net external force on a body equals the rate of change of its momentum. It tells you how motion changes and defines mass as the measure of inertia.",
          },
          {
            label: "Formula",
            kind: "formula",
            text: "F = dp/dt = ma    (p = mv;  1 N = 1 kg·m·s⁻²)",
          },
          {
            label: "Conditions",
            text: "Valid in an inertial (non-accelerating) frame, for constant mass, with force and acceleration in the same direction; “net force” means the vector sum of all forces.",
          },
          {
            label: "Special cases",
            text: "F = 0 → a = 0 (first law). Force parallel to velocity changes only speed; force perpendicular changes only direction — that gives F = mv²/r in circular motion.",
          },
          {
            label: "Solved",
            text: "F = 12 N on m = 4 kg → a = 3 m/s². From rest, in t = 5 s: v = at = 15 m/s and s = ½at² = 37.5 m.",
          },
          {
            label: "Limit",
            text: "Breaks down at v → c (relativity) and at atomic scale (quantum); inside an accelerating lift it fails unless you add the pseudo-force −ma.",
          },
          {
            label: "Derivation",
            kind: "formula",
            text: "p = mv ⇒ F = dp/dt = m(dv/dt) = ma  [m constant] ⇒ a = F/m;  variable mass: F_ext = v_rel(dm/dt) + m(dv/dt)",
          },
          {
            label: "Trick",
            text: "On a v–t graph: slope = a, area = displacement. With friction under a pull F at angle θ: a = (F cos θ − μR)/m, where R = mg + F sin θ.",
          },
          {
            label: "Board use",
            text: "Section C, 5 marks: “State and prove F = ma” then a friction numerical — answer as law → formula → derivation → units → substituted example.",
          },
        ],
      },
      {
        tag: "Work, Energy and Power",
        title: "Work–energy theorem and the stopping-distance family",
        icon: Ruler,
        href: "/formulas/physics",
        statKey: "formula:physics",
        rows: [
          {
            label: "Concept",
            text: "Work is energy transferred by a force; kinetic energy is the work accumulated in setting a body in motion, and power is how fast that transfer happens.",
          },
          {
            label: "Formula",
            kind: "formula",
            text: "W = Fs cos θ;   KE = ½mv²;   W_net = ΔKE;   P = W/t = Fv;   PE = mgh",
          },
          {
            label: "Conditions",
            text: "Constant force for W = Fs cos θ, with θ between force and displacement; a conservative force gives path-independent work; g = 9.8 m/s² near the surface.",
          },
          {
            label: "Special cases",
            text: "θ = 90° → W = 0 (centripetal force and tension do no work); friction gives W < 0; rolling without slipping: static friction does no work.",
          },
          {
            label: "Solved",
            text: "Car m = 1000 kg at u = 20 m/s → KE = ½(1000)(400) = 2 × 10⁵ J. Braking force 5000 N → a = 5 m/s² → s = u²/2a = 40 m.",
          },
          {
            label: "Limit",
            text: "KE = ½mv² is non-relativistic, and work itself depends on the observer's frame — say which frame you used in a discussion answer.",
          },
          {
            label: "Derivation",
            kind: "formula",
            text: "W = ∫F·ds = ∫ma ds;  with a = v(dv/ds) ⇒ ∫ mv dv = ½mv_b² − ½mv_a² = ΔKE",
          },
          {
            label: "Trick",
            text: "Net work = area under the F–s graph. Stopping distance is always u²/(2a): when friction fixes a, distance does not depend on mass.",
          },
          {
            label: "Board use",
            text: "5 marks: “State and prove the work–energy theorem”, then a 4-mark stopping-distance or power numerical — carry units through every step.",
          },
        ],
      },
      {
        tag: "Gravitation",
        title: "Universal gravitation, orbital and escape speed",
        icon: Atom,
        href: "/class-11-notes/physics",
        rows: [
          {
            label: "Concept",
            text: "Every mass attracts every other mass; gravitational field strength is force per unit mass, and an orbit is simply free fall given a sideways start.",
          },
          {
            label: "Formula",
            kind: "formula",
            text: "F = Gm₁m₂/r² (G = 6.67×10⁻¹¹);  g = GM/R²;  v₀ = √(GM/r);  v_e = √(2gR);  T² ∝ r³",
          },
          {
            label: "Conditions",
            text: "Point masses or spherically symmetric bodies, r measured centre to centre; g ≈ 9.8 m/s² only near the surface where h ≪ R.",
          },
          {
            label: "Special cases",
            text: "At depth d: g′ = g(1 − d/R). At height h: g′ ≈ g(1 − 2h/R). A satellite still feels g — it only seems weightless because it free-falls continuously.",
          },
          {
            label: "Solved",
            text: "Moon g = 1.62 m/s². A 60 kg student weighs 588 N on Earth → 60 × 1.62 ≈ 97 N on the Moon, while mass stays 60 kg.",
          },
          {
            label: "Limit",
            text: "Newton's law cannot explain Mercury's perihelion shift (general relativity does) and is unreliable inside irregular mass distributions.",
          },
          {
            label: "Derivation",
            kind: "formula",
            text: "GmM/r² = mv²/r ⇒ v = √(GM/r);  then T = 2πr/v ⇒ T² = (4π²/GM)r³  (Kepler III)",
          },
          {
            label: "Trick",
            text: "Ratio method: g₂/g₁ = (M₂/M₁)(R₁/R₂)². Escape speed is always √2 × orbital speed at the same radius — remember √2, not two formulas.",
          },
          {
            label: "Board use",
            text: "5 marks: derive v₀ = √(GM/r) and the height expression, or a 4-mark g-at-height numerical — sketch the orbit diagram first.",
          },
        ],
      },
      {
        tag: "Current Electricity",
        title: "Ohm's law, drift velocity and network reduction",
        icon: Calculator,
        href: "/knowledge/numerical-physics",
        rows: [
          {
            label: "Concept",
            text: "A potential difference drives charge; resistance is the opposition a conductor offers, set by its material, length and area.",
          },
          {
            label: "Formula",
            kind: "formula",
            text: "I = nAev_d;  V = IR;  R = ρL/A;  P = VI = I²R = V²/R;  I = ε/(R + r)",
          },
          {
            label: "Conditions",
            text: "Ohm's law holds only for ohmic conductors at constant temperature with steady current; ρ is the resistivity of the material at that temperature.",
          },
          {
            label: "Special cases",
            text: "n identical resistors → R/n in parallel, nR in series. Terminal voltage V = ε − Ir; power in R is maximum when R = r.",
          },
          {
            label: "Solved",
            text: "3 Ω ∥ 6 Ω = (3×6)/(3+6) = 2 Ω. With ε = 12 V, r = 1 Ω: I = 12/3 = 4 A, V_term = 12 − 4 = 8 V, P_R = I²R = 32 W.",
          },
          {
            label: "Limit",
            text: "Fails for diodes, electrolytes and semiconductors (non-linear V–I) and whenever the conductor's temperature changes during measurement.",
          },
          {
            label: "Derivation",
            kind: "formula",
            text: "I = nAev_d, E = V/L, v_d = eEτ/m ⇒ I = (ne²Aτ/m)(V/L) ⇒ R = ρL/A,  ρ = m/(ne²τ)",
          },
          {
            label: "Trick",
            text: "Potential divider for a variable voltage. At Wheatstone balance no current flows in the galvanometer: P/Q = R/S — that is the meter bridge.",
          },
          {
            label: "Board use",
            text: "4-mark meter-bridge or internal-resistance numerical, plus 5 marks for “relate current with drift velocity” — derive, then substitute.",
          },
        ],
      },
      {
        tag: "Lenses",
        title: "Lens maker's formula and thin-lens image formation",
        icon: GitBranch,
        href: "/class-11-notes/physics/theory",
        statKey: "pyq:physics",
        rows: [
          {
            label: "Concept",
            text: "A lens bends light at two spherical surfaces; a convex lens converges in a rarer medium, a concave lens diverges, and power is 1/f in metres.",
          },
          {
            label: "Formula",
            kind: "formula",
            text: "1/f = (μ − 1)(1/R₁ − 1/R₂);   1/v − 1/u = 1/f;   m = v/u;   P = 1/f (dioptre)",
          },
          {
            label: "Conditions",
            text: "Thin lens, paraxial rays, same medium on both sides, Cartesian sign convention (direction of incident light taken positive).",
          },
          {
            label: "Special cases",
            text: "Lens in water: μ_rel = 1.5/1.33 → f grows. Equiconvex with both radii R: f = R/[2(μ − 1)]. Contact combination: 1/F = Σ1/f.",
          },
          {
            label: "Solved",
            text: "R₁ = +20 cm, R₂ = −20 cm, μ = 1.5 → 1/f = 0.5(1/20 + 1/20) = 1/20 → f = 20 cm. For u = −30 cm: v = 60 cm, m = +2.",
          },
          {
            label: "Limit",
            text: "The thin-lens formula ignores thickness and aberrations — real lenses give chromatic blur and spherical edge error (NEB only asks you to name these).",
          },
          {
            label: "Derivation",
            kind: "formula",
            text: "Surface 1: μ/v₁ − 1/u = (μ − 1)/R₁;  surface 2: 1/v − μ/v₁ = (μ − 1)/R₂;  add ⇒ 1/v − 1/u = (μ − 1)(1/R₁ − 1/R₂)",
          },
          {
            label: "Trick",
            text: "Draw the ray diagram first — it decides every sign. Convert f to metres before using power, and check whether the answer asks length or power.",
          },
          {
            label: "Board use",
            text: "5 marks: “Derive the lens maker's formula” + a 4-mark image numerical; a lens placed in water is the usual twist.",
          },
        ],
      },
      classTwelveTeaser("Physics"),
    ],
  },

  // ────────────────────────────── CHEMISTRY ──────────────────────────────
  {
    slug: "chemistry",
    name: "Chemistry",
    tagline: "Physical, inorganic and organic — mole, bonding, equilibrium and every exception",
    icon: FlaskConical,
    accent: CHEMISTRY,
    duration: "62s",
    slides: [
      {
        tag: "Stoichiometry",
        title: "The mole concept — the bridge between mass and particles",
        icon: Calculator,
        href: "/formulas/chemistry",
        statKey: "formula:chemistry",
        rows: [
          {
            label: "Concept",
            text: "The mole is a counting unit (like a dozen) that lets you weigh atoms: one mole holds 6.022 × 10²³ particles and equals the atomic mass in grams.",
          },
          {
            label: "Formula",
            kind: "formula",
            text: "n = w/M = N/N_A = V/22.4 L (STP, gas);  Molarity = mol/L;  % yield = actual/theoretical × 100",
          },
          {
            label: "Conditions",
            text: "22.4 L applies to gases at STP (0 °C, 1 atm) with ideal behaviour; molarity shifts with temperature, molality does not.",
          },
          {
            label: "Special cases",
            text: "The limiting reagent sets the yield; hydrated salts must count water of crystallisation; 1 u = 1/N_A g exactly.",
          },
          {
            label: "Solved",
            text: "8 g O₂ → n = 8/32 = 0.25 mol → 0.25 × 6.022×10²³ = 1.51×10²³ molecules, and at STP V = 0.25 × 22.4 = 5.6 L.",
          },
          {
            label: "Limit",
            text: "22.4 L fails for real gases at high pressure or low temperature, and mass converts to particles only when the formula unit is known.",
          },
          {
            label: "Derivation",
            kind: "formula",
            text: "12 g ¹²C ≡ 6.022×10²³ atoms ⇒ 1 u = 1/N_A g ⇒ w grams = (w/M) × N_A particles",
          },
          {
            label: "Trick",
            text: "Set every problem on a mole triangle: mass ↔ n ↔ particles ↔ volume; divide by the n-factor (valence) for redox equivalents.",
          },
          {
            label: "Board use",
            text: "Section B, 4 marks: find moles, identify the limiting reagent and get percentage yield — balance the equation before any arithmetic.",
          },
        ],
      },
      {
        tag: "Atomic Structure",
        title: "Bohr energy levels, line spectra and de Broglie",
        icon: FlaskConical,
        href: "/class-11-notes/chemistry/theory",
        statKey: "pyq:chemistry",
        rows: [
          {
            label: "Concept",
            text: "Electrons sit in quantised levels; a photon is emitted or absorbed only when a jump happens — which is why line spectra are sharp, not continuous.",
          },
          {
            label: "Formula",
            kind: "formula",
            text: "E = hν = hc/λ;  Eₙ = −13.6Z²/n² eV;  1/λ = R(1/n₁² − 1/n₂²);  λ = h/mv",
          },
          {
            label: "Conditions",
            text: "Bohr's model is exact only for hydrogen-like (one-electron) species; R = 1.097×10⁷ m⁻¹; h = 6.63×10⁻³⁴ J·s.",
          },
          {
            label: "Special cases",
            text: "Ionisation of level n = 13.6Z²/n² eV. Lyman → UV, Balmer → visible, Paschen → IR. Larger Z pulls every level much deeper (−13.6Z²).",
          },
          {
            label: "Solved",
            text: "H at n = 3: E₃ = −13.6/9 = −1.51 eV. Transition 3 → 2 releases 1.89 eV → λ = 656 nm, the red H-α line of the Balmer series.",
          },
          {
            label: "Limit",
            text: "Cannot explain splitting in a magnetic field or multi-electron spectra; Heisenberg forbids exact position and momentum together — hence orbitals, not orbits.",
          },
          {
            label: "Derivation",
            kind: "formula",
            text: "mv r = nh/2π and mv²/r = Ze²/(4πε₀r²) ⇒ r = 0.529n²/Z Å,  v = 2.18×10⁶Z/n,  E = −13.6Z²/n² eV",
          },
          {
            label: "Trick",
            text: "For hydrogen, λ(Å) = 1216.3 × n₁²n₂²/(n₂² − n₁²). Sign check: emitted photon energy = E_high − E_low, always positive.",
          },
          {
            label: "Board use",
            text: "4 marks: compute a transition energy or de Broglie wavelength, then compare with a macroscopic object to show why matter waves go unseen.",
          },
        ],
      },
      {
        tag: "Chemical Bonding",
        title: "VSEPR shapes and hybridisation — predicting geometry",
        icon: Network,
        href: "/class-11-notes/chemistry",
        rows: [
          {
            label: "Concept",
            text: "Bonding and lone pairs around a central atom repel and spread out; the steric number (σ bonds + lone pairs) fixes both shape and hybridisation.",
          },
          {
            label: "Formula",
            kind: "formula",
            text: "SN = σ bonds + lone pairs;  SN 2→sp (180°), 3→sp² (120°), 4→sp³ (109.5°), 5→sp³d, 6→sp³d²;  bond order = (N_b − N_a)/2",
          },
          {
            label: "Conditions",
            text: "VSEPR assumes repulsion order lp–lp > lp–bp > bp–bp, and always starts from a correctly drawn Lewis structure.",
          },
          {
            label: "Special cases",
            text: "CH₄ tetrahedral 109.5°; NH₃ pyramidal 107°; H₂O bent 104.5° (lone-pair compression); SF₆ octahedral 90°; XeF₄ square planar.",
          },
          {
            label: "Solved",
            text: "CO₂: SN = 2 → linear 180°, sp. BF₃: SN = 3 → trigonal planar, sp². O₂ bond order = (8 − 4)/2 = 2 and it is paramagnetic.",
          },
          {
            label: "Limit",
            text: "It is a model: heavy central atoms, d-orbital participation and strongly electronegative substituents break it — quote the exception instead of forcing it.",
          },
          {
            label: "Method",
            kind: "formula",
            text: "Count valence e⁻ → draw Lewis → σ bonds + lone pairs = SN → electron-pair geometry → drop lone pairs for the molecular shape",
          },
          {
            label: "Trick",
            text: "Lone pairs live in hybrid orbitals but are never named in the shape: electron-pair geometry includes them, molecular shape does not.",
          },
          {
            label: "Board use",
            text: "4 marks: “Predict shape and hybridisation of XeF₄ / SF₆ / NH₃ and explain the angles” — SN first, shape second, angle reasoning third.",
          },
        ],
      },
      {
        tag: "Chemical Equilibrium",
        title: "Kp, Kc and Le Chatelier's principle",
        icon: Workflow,
        href: "/knowledge/numerical-chemistry",
        rows: [
          {
            label: "Concept",
            text: "At equilibrium forward and reverse rates are equal, so concentrations stay constant even though the reaction never actually stops.",
          },
          {
            label: "Formula",
            kind: "formula",
            text: "K_p = K_c(RT)^Δn;  K_c = [C]^c[D]^d/([A]^a[B]^b);  α = √(K/C) (Ostwald, small α);  Q compared with K",
          },
          {
            label: "Conditions",
            text: "Closed system at constant temperature; pure solids and liquids stay out of K; R = 0.0821 L·atm/mol·K when volumes are in litres.",
          },
          {
            label: "Special cases",
            text: "Δn = 0 → K_p = K_c. Inert gas at constant volume → no shift; at constant pressure → shift toward the side with more gas moles.",
          },
          {
            label: "Solved",
            text: "N₂ + 3H₂ ⇌ 2NH₃: Δn = 2 − 4 = −2 → K_p = K_c(RT)⁻². Q < K → runs forward; Q > K → runs backward.",
          },
          {
            label: "Limit",
            text: "K belongs to one stated temperature and says nothing about rate — a large K can still need a catalyst and time to reach.",
          },
          {
            label: "Derivation",
            kind: "formula",
            text: "PV = nRT ⇒ P = (n/V)RT = CRT;  so K_p = Π(P_i)^ν = Π(C_i RT)^ν = K_c(RT)^Δn",
          },
          {
            label: "Trick",
            text: "Compare Q with K before any arithmetic; for degree-of-dissociation problems build an ICE table — the “x is small” shortcut saves time.",
          },
          {
            label: "Board use",
            text: "5 marks: “Derive the relation between Kp and Kc” + a 4-mark Le Chatelier numerical on pressure or concentration change.",
          },
        ],
      },
      {
        tag: "Basic Concepts of Organic Chemistry",
        title: "Inductive effect, acidity order and IUPAC naming",
        icon: Highlighter,
        href: "/class-11-notes/chemistry/mindmap",
        rows: [
          {
            label: "Concept",
            text: "Electron-displacement effects explain reactivity: an electronegative group pulls σ-electrons (−I), an alkyl group pushes them (+I) — acidity and stability follow.",
          },
          {
            label: "Order",
            kind: "formula",
            text: "−NO₂ > −F > −Cl > −Br > −I > −OR > −OH > −C≡CH > −C₆H₅ > −CH₃ (+I series runs the other way)",
          },
          {
            label: "Conditions",
            text: "The inductive effect travels only through σ bonds and dies within three or four atoms; resonance (−R) and hyperconjugation can override it.",
          },
          {
            label: "Special cases",
            text: "−I stabilises the carboxylate ion so acidity rises with withdrawing groups; +I destabilises it, so alkyl-substituted acids are weaker.",
          },
          {
            label: "Solved",
            text: "Acidity: HCOOH > ClCH₂COOH > CH₃COOH. Naming: longest chain → lowest locants → substituents in alphabetical order.",
          },
          {
            label: "Limit",
            text: "Inductive effect alone cannot rank every molecule — steric hindrance, solvation and resonance often decide instead.",
          },
          {
            label: "Method",
            kind: "formula",
            text: "Longest chain → principal functional group gets the lowest locant → substituents alphabetically → suffix of the highest-priority group",
          },
          {
            label: "Trick",
            text: "For acidity, draw the conjugate base: the more stable the anion, the stronger the acid. That one sketch settles most 4-mark questions.",
          },
          {
            label: "Board use",
            text: "Section B: IUPAC naming (2 marks) + “effect of substituents on acidity” (4 marks) — draw structures; prose alone loses marks.",
          },
        ],
      },
      classTwelveTeaser("Chemistry"),
    ],
  },
  // ─────────────────────────────── BIOLOGY ───────────────────────────────
  {
    slug: "biology",
    name: "Biology",
    tagline: "Cells to conservation — labelled diagrams, laws, processes and the marks-point answers",
    icon: Dna,
    accent: BIOLOGY,
    duration: "66s",
    slides: [
      {
        tag: "Biomolecules and Cell Biology",
        title: "Cell structure — the labelled diagram every paper asks",
        icon: PenLine,
        href: "/knowledge/biology-diagrams",
        rows: [
          {
            label: "Concept",
            text: "The cell is the structural and functional unit of life; organelles split the work so that incompatible reactions (digestion vs building) run at once.",
          },
          {
            label: "Key numbers",
            kind: "formula",
            text: "Human RBC 7.5 μm (no nucleus); membrane 7.5 nm trilaminar; mitochondrion 1–10 μm; ribosome 15–20 nm; light microscope limit 0.2 μm",
          },
          {
            label: "Conditions",
            text: "Values are for a typical human/eukaryotic cell; anything finer than 0.2 μm needs an electron microscope, not a light one.",
          },
          {
            label: "Special case",
            text: "Mature RBC loses nucleus and mitochondria (it carries O₂ instead); prokaryotes have no membrane-bound organelles; plant cells add wall, chloroplast, large vacuole.",
          },
          {
            label: "Diagram labels",
            text: "Membrane → cytoplasm → nucleus (nucleolus, chromatin, nuclear membrane) → mitochondria → RER/SER → Golgi → lysosome → ribosome; add wall, plastid, vacuole for the plant cell.",
          },
          {
            label: "Limit",
            text: "A light-microscope drawing cannot show membranes or ribosomes — only describe what that magnification can genuinely contain.",
          },
          {
            label: "Evidence",
            text: "Endosymbiotic theory: mitochondria carry their own DNA, 70S ribosomes and a double membrane — the exact signature of an engulfed bacterium.",
          },
          {
            label: "Trick",
            text: "Answer as a labelled figure plus two functions per organelle; examiners tick labels and functions on separate lines, so never draw without leader lines.",
          },
          {
            label: "Board use",
            text: "5 marks: “Draw and label a fully enlarged animal cell with the function of each organelle” + a 4-mark prokaryote/eukaryote table.",
          },
        ],
      },
      {
        tag: "Heredity and Evolution",
        title: "Mendel's laws — monohybrid, dihybrid and test cross",
        icon: Waypoints,
        href: "/class-11-notes/biology/theory",
        statKey: "pyq:biology",
        rows: [
          {
            label: "Concept",
            text: "Traits pass as discrete factors (alleles) that separate in gamete formation and recombine independently — inheritance is particulate, not blended.",
          },
          {
            label: "Ratios",
            kind: "formula",
            text: "Monohybrid 3:1 (phenotype), 1:2:1 (genotype);  Dihybrid 9:3:3:1;  Test cross 1:1;  Back cross to one of the parents",
          },
          {
            label: "Conditions",
            text: "Independent assortment holds for genes on different chromosomes (or far apart); gametes and offspring must be equally viable; dominance complete.",
          },
          {
            label: "Special cases",
            text: "Incomplete dominance (snapdragon red × white → 1:2:1); codominance (blood groups Iᴬ, Iᴮ, i); colour blindness is X-linked and commoner in males.",
          },
          {
            label: "Solved",
            text: "Tt × Tt → TT, Tt, Tt, tt → 3 tall : 1 dwarf. Test cross tt × TT → all Tt (100 % tall) — that is how the F₁ genotype is proved.",
          },
          {
            label: "Limit",
            text: "Linked genes, polygenic traits, epistasis and cytoplasmic inheritance all break the classic ratios — say so when the question hints at exceptions.",
          },
          {
            label: "Derivation",
            kind: "formula",
            text: "Tt → gametes T, t → 4 squares → 1 TT : 2 Tt : 1 tt → phenotype (T dominant) = 3 : 1",
          },
          {
            label: "Trick",
            text: "Ladder to memorise: 3:1 (mono) → 1:2:1 (genotypic) → 9:3:3:1 (di) → 1:1 (test). Write the gametes on the axes, then fill the squares.",
          },
          {
            label: "Board use",
            text: "5 marks: “Define back cross and test cross, then work out a dihybrid cross with the phenotypic ratio” — the ratio is the final line.",
          },
        ],
      },
      {
        tag: "Ecology",
        title: "Energy flow, Lindeman's 10 % law and ecological pyramids",
        icon: GitBranch,
        href: "/graphs",
        rows: [
          {
            label: "Concept",
            text: "Sunlight is fixed by producers and passed up trophic levels, losing most of it as heat at every step — which is why food chains stay short.",
          },
          {
            label: "Law",
            kind: "formula",
            text: "Only ~10 % of energy transfers upward;  GPP − R = NPP;  NPP of the producer = energy available to the herbivore",
          },
          {
            label: "Conditions",
            text: "The 10 % law applies to energy transfer between trophic levels (Lindeman); energy pyramids are ALWAYS upright because energy is lost as heat.",
          },
          {
            label: "Special cases",
            text: "Pyramid of biomass inverts in a pond (phytoplankton turn over fast); pyramid of number inverts under one tree hosting many insects.",
          },
          {
            label: "Solved",
            text: "Producer 10,000 kJ → primary consumer 1000 → secondary 100 → tertiary 10 kJ. Each step is ×0.1; write Eₙ = E₁(0.1)ⁿ⁻¹.",
          },
          {
            label: "Limit",
            text: "10 % is an average (some transfers reach 20 %) and it applies to energy only — nutrient cycles are closed loops, energy flow is not.",
          },
          {
            label: "Derivation",
            kind: "formula",
            text: "GPP = total photosynthesis;  NPP = GPP − R;  herbivore intake = NPP × 0.1, then × 0.1 again per level",
          },
          {
            label: "Trick",
            text: "Always draw the energy pyramid upright. In numericals, one line of Eₙ = E₁(0.1)ⁿ⁻¹ earns the method mark before any calculation.",
          },
          {
            label: "Board use",
            text: "5 marks: “Explain the 10 % law with an energy pyramid and calculate the energy available at the third trophic level.”",
          },
        ],
      },
      {
        tag: "Biotechnology",
        title: "rDNA technology — insulin, PCR and the five steps",
        icon: Microscope,
        href: "/class-11-notes/biology",
        rows: [
          {
            label: "Concept",
            text: "A gene of interest is cut, pasted into a vector and expressed in a host — the same toolkit makes human insulin, Bt traits and diagnostic probes.",
          },
          {
            label: "Sequence",
            kind: "formula",
            text: "Isolate DNA → cut (restriction enzyme, EcoRI) → ligate (DNA ligase) → vector (pBR322) → host (E. coli) → select (ampᴿ/tetᴿ)",
          },
          {
            label: "Conditions",
            text: "PCR needs known flanking sequences; Taq polymerase survives 94 °C; sticky ends (EcoRI) ligate far better than blunt ends.",
          },
          {
            label: "Special cases",
            text: "Denature 94 °C → anneal 55 °C → extend 72 °C, ×30 cycles → ~10⁹ copies. Plants use Agrobacterium; animal cells use retroviral vectors.",
          },
          {
            label: "Solved",
            text: "Insulin: gene cut with BamH1 → ligated into pBR322 → transformed E. coli → replica plating on ampicillin selects recombinants → insulin harvested.",
          },
          {
            label: "Limit",
            text: "Antibiotic-resistance markers raise containment concerns, delivery into human cells is inefficient, and GMO release is regulated, not free.",
          },
          {
            label: "Process",
            kind: "formula",
            text: "Central dogma: DNA →(transcription)→ mRNA →(translation)→ protein;  reverse transcriptase builds cDNA from mRNA",
          },
          {
            label: "Trick",
            text: "Mnemonic for the rDNA steps: I-C-L-V-H (Isolate, Cut, Ligate, Vector, Host). Name the enzyme at every cut and paste — that is where marks hide.",
          },
          {
            label: "Board use",
            text: "5 marks: “Describe the production of human insulin in E. coli” or “Explain PCR with its temperature steps” — diagram plus labelled stages.",
          },
        ],
      },
      {
        tag: "Evolutionary Biology",
        title: "Hardy–Weinberg equilibrium and carrier frequency",
        icon: Calculator,
        href: "/derivations/class-11-notes/biology",
        rows: [
          {
            label: "Concept",
            text: "Allele and genotype frequencies stay constant across generations when no evolutionary force acts — the baseline against which evolution is measured.",
          },
          {
            label: "Formula",
            kind: "formula",
            text: "p + q = 1;  p² + 2pq + q² = 1;  p = dominant-allele frequency, q = recessive;  carriers = 2pq",
          },
          {
            label: "Conditions",
            text: "No mutation, no selection, random mating, no migration, infinitely large population — all five must hold at once.",
          },
          {
            label: "Special cases",
            text: "If q = 0.01 then affected (q²) is only 0.01 %, but carriers (2pq) ≈ 2 % — rare diseases hide mainly in healthy carriers.",
          },
          {
            label: "Solved",
            text: "Albinism q² = 0.0009 → q = 0.03, p = 0.97 → carriers 2pq = 0.058 = 5.8 %; affected 0.09 % of births.",
          },
          {
            label: "Limit",
            text: "Its assumptions are never fully met, so real frequencies drift under selection — the model is a reference point, not a prediction.",
          },
          {
            label: "Derivation",
            kind: "formula",
            text: "(p + q) = 1 ⇒ (p + q)² = p² + 2pq + q² = 1 — expanding the random-mating pool gives genotype frequencies",
          },
          {
            label: "Trick",
            text: "Start from what you are given: affected count → q²; carriers asked → 2pq; “is the disease vanishing?” → check whether q rose or fell.",
          },
          {
            label: "Board use",
            text: "5 marks: “State the Hardy–Weinberg assumptions and calculate the carrier frequency of a recessive trait” — show the square-root step.",
          },
        ],
      },
      classTwelveTeaser("Biology"),
    ],
  },

  // ───────────────────────────── MATHEMATICS ─────────────────────────────
  {
    slug: "mathematics",
    name: "Mathematics",
    tagline: "Algebra to calculus — every proof, identity and the step-marking behind it",
    icon: Sigma,
    accent: MATHEMATICS,
    duration: "60s",
    slides: [
      {
        tag: "Calculus · Differentiation",
        title: "Differentiation — first principles to maxima and minima",
        icon: Workflow,
        href: "/derivations/class-11-notes/mathematics",
        rows: [
          {
            label: "Concept",
            text: "The derivative is the instantaneous rate of change and the slope of the tangent at a point; a zero slope locates stationary points.",
          },
          {
            label: "Formula",
            kind: "formula",
            text: "d/dx(xⁿ) = nxⁿ⁻¹;  (uv)′ = uv′ + vu′;  (u/v)′ = (vu′ − uv′)/v²;  d(sinx) = cosx dx;  dy/dx = (dy/dt)/(dx/dt)",
          },
          {
            label: "Conditions",
            text: "Differentiable at x ⇒ continuous at x (the converse is false); chain rule whenever one function sits inside another; radians for trig.",
          },
          {
            label: "Special cases",
            text: "f(x) = |x| is continuous but not differentiable at 0 (corner). Parametric curves use the ratio dy/dt ÷ dx/dt.",
          },
          {
            label: "Solved",
            text: "y = x³ − 3x → dy/dx = 3x² − 3 = 0 at x = ±1; d²y/dx² = 6x: at −1 it is −6 → max y = 2; at +1 it is +6 → min y = −2.",
          },
          {
            label: "Limit",
            text: "Derivatives fail at cusps, corners and discontinuities, and a stationary point is not a max/min without the second-derivative test.",
          },
          {
            label: "Derivation",
            kind: "formula",
            text: "f′(x) = lim_{h→0} [(x+h)ⁿ − xⁿ]/h;  expand (x+h)ⁿ = xⁿ + nxⁿ⁻¹h + … ⇒ h cancels ⇒ nxⁿ⁻¹",
          },
          {
            label: "Trick",
            text: "Three or more factors/quotients → take logs first. Always name the rule you apply in the margin; step marks follow the named rule.",
          },
          {
            label: "Board use",
            text: "Section C: differentiate from first principles (5 marks) + a max/min word problem (4 marks) — state the domain, then conclude with d²y/dx².",
          },
        ],
      },
      {
        tag: "Trigonometry",
        title: "Compound and multiple angles — the identity toolkit",
        icon: Sigma,
        href: "/formulas/mathematics",
        statKey: "formula:mathematics",
        rows: [
          {
            label: "Concept",
            text: "Compound-angle identities split any angle you can build from standard ones, and they are the proof engine of every trigonometric question.",
          },
          {
            label: "Formula",
            kind: "formula",
            text: "sin(A ± B) = sinA cosB ± cosA sinB;  cos(A ± B) = cosA cosB ∓ sinA sinB;  tan(A ± B) = (tanA ± tanB)/(1 ∓ tanA tanB)",
          },
          {
            label: "Conditions",
            text: "They hold for all defined angles; identities are equalities, not equations — substitute freely, but check for extraneous roots after squaring.",
          },
          {
            label: "Special cases",
            text: "sin(90° − θ) = cosθ; 2sinAcosB = sin(A+B) + sin(A−B); maximum of a sinθ + b cosθ = √(a² + b²).",
          },
          {
            label: "Solved",
            text: "sin75° = sin(45° + 30°) = (√6 + √2)/4 ≈ 0.9659. Solve 2sin²θ = 1 → sinθ = ±1/√2 → θ = 45°, 135°, … (give the interval asked).",
          },
          {
            label: "Limit",
            text: "Dividing by cosθ assumes cosθ ≠ 0, and squaring adds false solutions — substitute back before finalising your answer set.",
          },
          {
            label: "Derivation",
            kind: "formula",
            text: "cos(A − B) = cosA cosB + sinA sinB from the unit-circle distance identity ⇒ set B = A ⇒ cos2A = 1 − 2sin²A",
          },
          {
            label: "Trick",
            text: "Sum of two angles → expand; products of sin/cos of different angles → sum-to-product; sin² or cos² → reduce the power first.",
          },
          {
            label: "Board use",
            text: "4–5 marks: “Prove tan(45° + θ) = (1 + tanθ)/(1 − tanθ)” plus a general-solution equation — finish with the required interval.",
          },
        ],
      },
      {
        tag: "Analytic Geometry",
        title: "Straight line — slope, angle and distance forms",
        icon: GitBranch,
        href: "/graphs",
        rows: [
          {
            label: "Concept",
            text: "A line is fixed by a point and a direction; slope measures inclination, and every form of the equation is those two facts rearranged.",
          },
          {
            label: "Formula",
            kind: "formula",
            text: "y = mx + c;  m = tanθ = (y₂ − y₁)/(x₂ − x₁);  y − y₁ = m(x − x₁);  x/a + y/b = 1;  d = |ax₁ + by₁ + c|/√(a² + b²)",
          },
          {
            label: "Conditions",
            text: "Slope exists only for non-vertical lines; m₁m₂ = −1 for perpendiculars; parallel lines share m; distance needs normalised coefficients.",
          },
          {
            label: "Special cases",
            text: "Vertical line x = k (slope undefined). Angle between lines: tanθ = |(m₂ − m₁)/(1 + m₁m₂)| — undefined exactly when they are perpendicular.",
          },
          {
            label: "Solved",
            text: "Through (2, 3), ⊥ to y = 2x + 1 → m = −½ → y − 3 = −½(x − 2) → x + 2y − 8 = 0. Distance from origin = 8/√5 ≈ 3.58.",
          },
          {
            label: "Limit",
            text: "Slope reasoning breaks for vertical lines — convert to general form ax + by + c = 0 before any distance or intersection work.",
          },
          {
            label: "Derivation",
            kind: "formula",
            text: "θ = θ₂ − θ₁ ⇒ tanθ = (tanθ₂ − tanθ₁)/(1 + tanθ₁tanθ₂) = (m₂ − m₁)/(1 + m₁m₂)",
          },
          {
            label: "Trick",
            text: "Intersection: put both lines in y = mx + c and set them equal — one substitution finishes it; always sketch the figure first.",
          },
          {
            label: "Board use",
            text: "4 marks: an equation through a point with a parallel/perpendicular condition plus a distance question — figure, then computation.",
          },
        ],
      },
      {
        tag: "Vectors",
        title: "Dot and cross product — projection, angle, area",
        icon: Calculator,
        href: "/class-11-notes/mathematics/theory",
        statKey: "pyq:mathematics",
        rows: [
          {
            label: "Concept",
            text: "The dot product measures how far two vectors point alike; the cross product gives a vector perpendicular to both, sized by the area they span.",
          },
          {
            label: "Formula",
            kind: "formula",
            text: "a·b = |a||b|cosθ;  |a×b| = |a||b|sinθ;  proj_b a = (a·b/|b|)b̂;  triangle area = ½|a×b|",
          },
          {
            label: "Conditions",
            text: "Dot is commutative, cross anti-commutative (a×b = −b×a); a×b follows the right-hand rule; both vectors start from the same point.",
          },
          {
            label: "Special cases",
            text: "Parallel → sinθ = 0 → cross = 0. Perpendicular → cosθ = 0 → dot = 0. Crosses with i, j, k cycle the components.",
          },
          {
            label: "Solved",
            text: "a = 2i + 3j − k, b = i − j + 2k → a·b = 2 − 3 − 2 = −3; |a| = √14, |b| = √6 → cosθ = −3/√84 → θ ≈ 109.1°.",
          },
          {
            label: "Limit",
            text: "The cross product of the zero vector has no direction, and angle formulas need non-zero vectors — check |a|, |b| ≠ 0 before dividing.",
          },
          {
            label: "Derivation",
            kind: "formula",
            text: "|a|²|b|² − (a·b)² = |a|²|b|²(1 − cos²θ) ⇒ |a×b|² = |a|²|b|² − (a·b)²  (Lagrange)",
          },
          {
            label: "Trick",
            text: "Put vectors in component form first, then decide: angle/alignment → dot; perpendicular, area, moment → cross.",
          },
          {
            label: "Board use",
            text: "5 marks: “Show that the cross product is perpendicular to each factor” + a numerical — write the component expansion line out fully.",
          },
        ],
      },
      {
        tag: "Statistics and Probability",
        title: "Probability — addition rule, independence, Bayes",
        icon: CalendarCheck,
        href: "/class-11-notes/mathematics",
        rows: [
          {
            label: "Concept",
            text: "Probability quantifies uncertainty from equally likely outcomes, and conditional probability revises it once new information arrives.",
          },
          {
            label: "Formula",
            kind: "formula",
            text: "P(A∪B) = P(A) + P(B) − P(A∩B);  independent: P(A∩B) = P(A)P(B);  P(A|B) = P(A∩B)/P(B);  P(A′) = 1 − P(A)",
          },
          {
            label: "Conditions",
            text: "Mutually exclusive events give P(A∩B) = 0; independence means neither event changes the other's probability — a different idea entirely.",
          },
          {
            label: "Special cases",
            text: "Two dice: P(sum 7) = 6/36 = 1/6. P(A)=0.6, P(B)=0.5 independent → both 0.30; if mutually exclusive → P(A∪B) = 1.10, impossible, so exclusivity fails.",
          },
          {
            label: "Solved",
            text: "Card drawn: P(face card) = 12/52 = 3/13. Both kings: with replacement (4/52)²; without replacement (4/52)(3/51) — check the wording first.",
          },
          {
            label: "Limit",
            text: "Independence and mutual exclusivity cannot both hold for events with positive probability; empirical probabilities shift with sample size.",
          },
          {
            label: "Derivation",
            kind: "formula",
            text: "count(A∪B) = count A + count B − count(A∩B) ⇒ divide by n(S) ⇒ the addition rule",
          },
          {
            label: "Trick",
            text: "Many cases → use the complement in one line; reverse wording (“given a positive test”) → Bayes with the total-probability denominator.",
          },
          {
            label: "Board use",
            text: "4 marks: a conditional-probability question with a tree diagram — draw the tree and label every branch before computing.",
          },
        ],
      },
      classTwelveTeaser("Mathematics"),
    ],
  },
  // ─────────────────────────────── ENGLISH ───────────────────────────────
  {
    slug: "english",
    name: "English",
    tagline: "Grammar, writing and literature — the rules, the format and the error traps",
    icon: BookOpen,
    accent: ENGLISH,
    duration: "64s",
    slides: [
      {
        tag: "Grammar · Tenses",
        title: "The twelve tenses — structure, use and time markers",
        icon: FileText,
        href: "/knowledge/grammar",
        rows: [
          {
            label: "Skill",
            text: "Tense choice fixes the time and the completeness of an action — the single biggest scorer in Section A.",
          },
          {
            label: "Pattern",
            kind: "formula",
            text: "Simple / Continuous / Perfect / Perfect-continuous × Present · Past · Future → 12 forms (has been living = pres. perf. cont.)",
          },
          {
            label: "Conditions",
            text: "Continuous needs a verb that can run over time; state verbs (know, believe, own, seem) stay simple; duration takes “for”, a point in time takes “since”.",
          },
          {
            label: "Example",
            text: "“He has been living here for five years.” — started earlier, still true, and a duration word is present, so present perfect continuous.",
          },
          {
            label: "Error trap",
            text: "✗ “I am knowing him.” → ✓ “I know him.”   ✗ “He has gone to school yesterday.” → ✓ “He went to school yesterday.”",
          },
          {
            label: "Method",
            kind: "formula",
            text: "Find the time marker → finished or continuing? → pick the tense → apply subject agreement (has/have, is/are) → check negative/question form",
          },
          {
            label: "Shortcut",
            text: "just / already / yet / ever → present perfect; ago → past simple; by next year → future perfect; this time tomorrow → future continuous.",
          },
          {
            label: "Board use",
            text: "Section A, 4–5 marks: fill in the blanks and correct wrong sentences — one wrong form costs a full mark, so underline your choice.",
          },
        ],
      },
      {
        tag: "Grammar · Voice and Narration",
        title: "Passive voice and indirect speech without losing marks",
        icon: ScrollText,
        href: "/class-11-notes/english/theory",
        statKey: "pyq:english",
        rows: [
          {
            label: "Skill",
            text: "Both transformations test the same control — verb forms, pronouns and tense sequence — under time pressure.",
          },
          {
            label: "Pattern",
            kind: "formula",
            text: "Active: S + V + O → Passive: O + be + V₃ + by + S;  Reported: “I am tired.” → He said (that) he was tired.",
          },
          {
            label: "Conditions",
            text: "Only transitive verbs take a passive; a past reporting verb backshifts one tense, while universal truths and modal meaning stay put.",
          },
          {
            label: "Example",
            text: "“The teacher is writing a note.” → “A note is being written by the teacher.”  “Do it now,” said the officer → The officer ordered him to do it at once.",
          },
          {
            label: "Error trap",
            text: "✗ “was hit by he” → ✓ “by him”; never make sleep/go/happen passive; keep the backshift consistent — mixing tenses is a double error.",
          },
          {
            label: "Method",
            kind: "formula",
            text: "Find the object → make it the subject → choose be + V₃ → fix pronouns → shift tense → keep “by …” only if the agent matters",
          },
          {
            label: "Shortcut",
            text: "Imperative → told/ordered/asked + to-infinitive; question → asked whether/if; reporting verb already past? every finite verb steps back one tense.",
          },
          {
            label: "Board use",
            text: "4 marks each: “Change into passive” and “Rewrite in indirect speech” — give the final sentence as one clean line.",
          },
        ],
      },
      {
        tag: "Writing and Composition",
        title: "Essay and paragraph structure that earns full marks",
        icon: PenLine,
        href: "/knowledge/writing",
        rows: [
          {
            label: "Skill",
            text: "Organisation is graded before vocabulary: a clear shape with one idea per paragraph beats beautiful sentences in a heap.",
          },
          {
            label: "Pattern",
            kind: "formula",
            text: "Title → Introduction (hook + thesis) → Body 1/2/3 (topic sentence + example + link) → Conclusion (summary + remark) · 250–350 words",
          },
          {
            label: "Conditions",
            text: "Formal register for essays, reports and official letters; respect the word limit; the address/date block appears only in letters.",
          },
          {
            label: "Example",
            text: "Outline “Education”: intro (why it matters) → access → quality → dropout → conclusion (shared responsibility); 2–3 sentences per point.",
          },
          {
            label: "Error trap",
            text: "A new idea inside the conclusion, repeated opening lines, and missing connectors — link with however, moreover, therefore, in addition.",
          },
          {
            label: "Method",
            kind: "formula",
            text: "5 minutes planning → topic sentences first → support each with an example → finish → 2 minutes proofreading for tense and articles",
          },
          {
            label: "Shortcut",
            text: "Open with a question or a quotation; one idea per paragraph; end the conclusion by circling back to your opening line.",
          },
          {
            label: "Board use",
            text: "Section D, 8 marks: “Write an essay in about 350 words” — headings/structure and a counted word count are visible marks.",
          },
        ],
      },
      {
        tag: "Critical Thinking",
        title: "Claims, evidence and the fallacies they ask you to spot",
        icon: Lightbulb,
        href: "/class-11-notes/english",
        rows: [
          {
            label: "Skill",
            text: "Separate a claim from its evidence and its assumptions, then judge whether the support actually follows — this is the objective-type scorer.",
          },
          {
            label: "Pattern",
            kind: "formula",
            text: "Deduction: premises → conclusion (must follow).  Induction: examples → generalisation (probable).  Abduction: best explanation.",
          },
          {
            label: "Conditions",
            text: "Evidence must be relevant and sufficient, and the conclusion must not be wider than the evidence that supports it.",
          },
          {
            label: "Example",
            text: "“He cannot be honest — he failed an exam.” = ad hominem (attacks the person, not the claim). “It rained after the yagya, so the yagya caused rain.” = post hoc.",
          },
          {
            label: "Error trap",
            text: "Correlation is not causation; a hasty generalisation hides in absolute words (always, never, everyone); circular reasoning restates the claim.",
          },
          {
            label: "Method",
            kind: "formula",
            text: "Read → underline the claim → list the evidence → check the assumption → test the leap → name the fallacy (or judge it sound)",
          },
          {
            label: "Shortcut",
            text: "See “always/never/everyone” → suspect hasty generalisation; see an insult instead of a reason → ad hominem; see the claim repeated → begging the question.",
          },
          {
            label: "Board use",
            text: "2–4 marks: “Identify the fallacy in the following” — one word plus a half-sentence of reasoning, no paragraph needed.",
          },
        ],
      },
      {
        tag: "Grammar and Vocabulary",
        title: "Word formation, idioms and the pairs that trap everyone",
        icon: BookOpen,
        href: "/class-11-notes/english/chapters",
        rows: [
          {
            label: "Skill",
            text: "Decode unknown words from roots and affixes, and choose the exact word the sentence's collocation demands.",
          },
          {
            label: "Pattern",
            kind: "formula",
            text: "prefix + root + suffix (un-, re-, -tion, -ment, -ness);  Phrasal verbs shift meaning with the particle: pick up = lift / collect / improve",
          },
          {
            label: "Conditions",
            text: "Context decides the sense of a phrasal verb, and register decides the synonym — “slender” for people, “thin” for objects.",
          },
          {
            label: "Example",
            text: "give up = surrender; look after = care for; break down = fail/analyse. Effective (adjective) vs affect (verb) — position in the sentence tells them apart.",
          },
          {
            label: "Error trap",
            text: "affect/effect, their/there/they're, advice/advise, loose/lose — the commonest Section A losses; also avoid double negatives.",
          },
          {
            label: "Method",
            kind: "formula",
            text: "Read the whole sentence → locate the gap's role (noun/verb/adjective) → eliminate mismatched options → check the collocation",
          },
          {
            label: "Shortcut",
            text: "Root word plus affixes unlocks most paper words; for idioms, picture the action — a literal meaning is usually the distractor.",
          },
          {
            label: "Board use",
            text: "Section A, 4 marks: “Choose the correct word / idiomatic expression” — decide by part of speech first, meaning second.",
          },
        ],
      },
      classTwelveTeaser("English"),
    ],
  },

  // ──────────────────────────────── NEPALI ────────────────────────────────
  {
    slug: "nepali",
    name: "Nepali",
    tagline: "व्याकरण, सन्धि, अलंकार र लेखन — कारकदेखि निबन्धसम्म, प्रश्नपत्रको ढाँचामा",
    icon: Languages,
    accent: NEPALI,
    duration: "68s",
    slides: [
      {
        tag: "भाषा र व्याकरण",
        title: "कारक — छ वटै कारक र चिन्ने उपाय",
        icon: ScrollText,
        href: "/knowledge/byakaran",
        rows: [
          {
            label: "विषय",
            text: "वाक्यको क्रिया कसले, केलाई, कसका लागि, कसले कसरी गर्‍यो भन्ने सम्बन्ध बुझाउने अंग नै कारक हो — विश्लेषणको आधार।",
          },
          {
            label: "सूत्र",
            kind: "formula",
            text: "कर्ता (ले/लँगा/सँग) · कर्म (लाई) · सम्प्रदान (लाई/को लागि) · करण (ले/बाट) · सम्बन्ध (को/का) · अधिकरण (मा)",
          },
          {
            label: "अपवाद",
            text: "केही क्रियामा एउटै शब्दले दुई कारक बोक्छ; नपुगेको कर्तालाई अपूर्वको रूपमा वा संकेतबाट बुझ्नुपर्छ (जस्तै: भो उपसर्ग)।",
          },
          {
            label: "उदाहरण",
            text: "“रामले पुस्तक छिटो पढ्‍यो।” → राम = कर्ता, पुस्तक = कर्म, छिटो = करण, रामको क्रिया भएको = अधिकरण।",
          },
          {
            label: "विधि",
            kind: "formula",
            text: "वाक्य पढ्नुहोस् → “कसले केगर्‍यो?” प्रश्न बनाउनुहोस् → उत्तर दिने शब्द = कर्ता → क्रियाको प्रत्यक्ष पात्र = कर्म",
          },
          {
            label: "छिटो",
            text: "“ले” देखिए → कर्ता/करण, “लाई” देखिए → कर्म/सम्प्रदान, “मा” देखिए → अधिकरण — तर वाक्यको अर्थ अन्तिम प्रमाण हो।",
          },
          {
            label: "परीक्षा प्रयोग",
            text: "प्रायः ३–४ अंक: “कारक चिनाउनुहोस्” वा वाक्य विश्लेषण — विश्लेषणमा साधन (अपूर्व/उपपद/कारक) पनि लेख्नु बिर्सनु हुँदैन।",
          },
        ],
      },
      {
        tag: "भाषा र व्याकरण",
        title: "सन्धि — स्वर र व्यंजनको मेल, विच्छेद र नियम",
        icon: Highlighter,
        href: "/class-11-notes/nepali/theory",
        statKey: "pyq:nepali",
        rows: [
          {
            label: "विषय",
            text: "अर्थ नबिग्रन्दै दुई ध्वनिको मिलापलाई सन्धि भनिन्छ — लेख्दा जोड्ने, पढ्दा फाड्ने, दुवै दिमागमा हुनुपर्छ।",
          },
          {
            label: "सूत्र",
            kind: "formula",
            text: "स्वर सन्धि: दीर्घ (आ/ई/उ/ऊ), गुण (अ+इ=ए), वृद्धि, यण् (इ/ई+अ=य), शेष · व्यंजन सन्धि: विसर्ग/स्वर बदलिन्छ",
          },
          {
            label: "अपवाद",
            text: "हलन्त वा विसर्ग अगाडिको रूपमा यण्/गुण जस्ता नियम भिन्न लाग्न सक्छन् — जस्तै विद् + या = विद्या, व्यंजन सन्धि नै बढी प्रयोग हुन्छ।",
          },
          {
            label: "उदाहरण",
            text: "विद्या + आलय = विद्यालय (यण्) · हिम + आलय = हिमालय (दीर्घ) · तत् + त्वम् = तत्त्वम् (व्यंजन) · स्वर्ग + इन्द्र = स्वर्गेन्द्र (यण्)",
          },
          {
            label: "विधि",
            kind: "formula",
            text: "शब्द छुट्याउनुहोस् → पछिल्लो स्वर र अगाडिल्लो प्रत्यय हेर्नुहोस् → लागू नियम (दीर्घ/गुण/वृद्धि/यण्) → विच्छेद लेख्नुहोस्",
          },
          {
            label: "छिटो",
            text: "दुई स्वर भेटे → दीर्घ/गुण खोज्नुहोस्; शब्द छुट्टिएपछि स्वर बदलियो → यण्/वृद्धि; जोडीवाक्य परीक्षण गर्ने सजिलो मार्ग हो।",
          },
          {
            label: "परीक्षा प्रयोग",
            text: "प्रायः ३–४ अंक: “सन्धि विच्छेद गर्नुहोस्” वा “सन्धि गरी लेख्नुहोस्” — विच्छेदको साथै लागू नियमको नाम लेख्ने बानी राख्नुहोस्।",
          },
        ],
      },
      {
        tag: "भाषा र व्याकरण",
        title: "अलंकार — उपमा, रूपक, यमक, अनुप्रास चिन्ने तरिका",
        icon: Highlighter,
        href: "/class-11-notes/nepali/mindmap",
        rows: [
          {
            label: "विषय",
            text: "अलंकारले कथावाचनलाई भाव र रूप दिन्छ; प्रश्नमा पहिचान र उदाहरण दुवै चाहिन्छ, अर्थ मात्र गर्दा आधा नम्बर जान्छ।",
          },
          {
            label: "सूत्र",
            kind: "formula",
            text: "उपमा = उपमेय + उपमान + साधारण धर्म · रूपक = साधारण धर्म लोप भएको उपमा · यमक = अर्थ दोहोरिने · अनुप्रास = अक्षर दोहोरिने",
          },
          {
            label: "अपवाद",
            text: "उपमामा तीनवटै अंग अनिवार्य; रूपकमा धर्म नै हटिन्छ; अनुप्रास पनि विभक्ति/शब्द शुद्धिसँग जोडेर पढ्नुपर्छ।",
          },
          {
            label: "उदाहरण",
            text: "“मुख चन्द्रजस्तो गोरो” = उपमा (उपमेय मुख, उपमान चन्द्र, धर्म गोरो) · “मुख चन्द्र भयो” = रूपक · “सरस्वती, सरल, सुन्दर” = अनुप्रास।",
          },
          {
            label: "विधि",
            kind: "formula",
            text: "पंक्ति पढ्नुहोस् → “जस्तो” छ कि छैन हेर्नुहोस् → जस्तो छ र धर्म छ → उपमा; जस्तो छैन तर बुझाइ एउटै → रूपक",
          },
          {
            label: "छिटो",
            text: "जड़मा “जस्तो/सरह” देखिए → उपमा; कर्म वा विषयसँग समान बनाइयो → रूपक; शुरुको अक्षर दोहोरियो → अनुप्रास।",
          },
          {
            label: "परीक्षा प्रयोग",
            text: "३–४ अंक: “अलंकार चिनाउनुहोस् र उदाहरण दिनुहोस्” — पहिले अलंकारको नाम, त्यसपछि वाक्यको भाग हराउँदै संलग्न गर्नुहोस्।",
          },
        ],
      },
      {
        tag: "लेखन र रचना",
        title: "निबन्ध लेखन — ढाँचा, शब्दसीमा र गल्तीहरू",
        icon: PenLine,
        href: "/class-11-notes/nepali/chapters",
        rows: [
          {
            label: "विषय",
            text: "निबन्धमा सामग्रीभन्दा पहिले संरचना हेरिन्छ — स्पष्ट ढाँचा राख्नेले पूरा नम्बर पाउँछ, तर प्रसंग छरिएर अर्धा।",
          },
          {
            label: "सूत्र",
            kind: "formula",
            text: "शीर्षक → भूमिका (१५%) → विषय विस्तार अनुच्छेद (७०%) → निष्कर्ष (१५%)  ·  शब्दसीमा ३००–४००",
          },
          {
            label: "अपवाद",
            text: "रिपोर्ट/पत्रमा ठाडो सम्बोधन र मिति चाहिन्छ, निबन्धमा होइन; एउटै विचार दोहोर्याउँदा निष्कर्ष फेरि लेख्नु गल्ती हो।",
          },
          {
            label: "उदाहरण",
            text: "“विद्यार्थी र अनुशासन”: भूमिका (अनुशासन किन) → घर/विद्यालय/समाज यी तीन अनुच्छेद → निष्कर्ष (साझा जिम्मेवारी)।",
          },
          {
            label: "विधि",
            kind: "formula",
            text: "पाँच मिनेट रूपरेखा → अनुच्छेद शीर्षक राख्नुहोस् → एक अनुच्छेदमा एउटा विचार → संयोजक शब्द → पढेर शुद्धि",
          },
          {
            label: "छिटो",
            text: "सुरुमा उद्धरण वा प्रश्न राख्नेले पहिलो भाग बलियो बनाउँछ; प्रत्येक अनुच्छेद अन्त्यमा अर्को अनुच्छेनसँग जोड्ने एक पङ्क्ति राख्नुहोस्।",
          },
          {
            label: "परीक्षा प्रयोग",
            text: "८ अंक: “३०० शब्दमा निबन्ध लेख्नुहोस्” — शीर्षक, अनुच्छेद विभाजन र निष्कर्ष तीनवटै नम्बरका हुन्।",
          },
        ],
      },
      {
        tag: "साहित्यिक विधा",
        title: "कविता, गीत, कथा, उपन्यास र निबन्धको भेद",
        icon: BookOpen,
        href: "/class-11-notes/nepali",
        rows: [
          {
            label: "विषय",
            text: "विधाभेद पहिचान्नु साहित्य खण्डको सजिलो नम्बर हो — रूप, विषयवस्तु र पठनशैली तीनवटैबाट छुट्याइन्छ।",
          },
          {
            label: "सूत्र",
            kind: "formula",
            text: "कविता = भावनात्मक, छन्दबद्ध  ·  गीत = स्वरबद्ध, गाइने  ·  कथा/उपन्यास = कथानक, पात्र  ·  निबन्ध = विचार, तर्क",
          },
          {
            label: "अपवाद",
            text: "कथा उपन्यासभन्दा सानो र एउटै घटनाक्रममा सीमित; कविता पनि गीत बन्न सक्छ — गीत भनेको गाइने भएकाले स्वर निर्णायक हुन्छ।",
          },
          {
            label: "उदाहरण",
            text: "गीत र कविताको भेद: गीत स्वर र तालसहित गाइन्छ, कविता मुग्ध हुँदै पढिन्छ; उपन्यासमा नायक, वातावरण र विस्तृत विवरण हुन्छ।",
          },
          {
            label: "विधि",
            kind: "formula",
            text: "शीर्षक हेर्नुहोस् → पठन शैली (गाइने/पढिने/कथा) → पात्र र घटना छ या छैन → विधा र त्यसको परिभाषा लेख्नुहोस्",
          },
          {
            label: "छिटो",
            text: "छन्द र पङ्क्ति छँदै → कविता; पात्र र संवाद छ → कथा; विषयवस्तु र निर्णायक विचार → निबन्ध।",
          },
          {
            label: "परीक्षा प्रयोग",
            text: "२–३ अंक: “यस अंशको विधा भन्नुहोस् र कारण लेख्नुहोस्” — विधा लेखेपछि एक पङ्क्ति कारण अनिवार्य छ।",
          },
        ],
      },
      classTwelveTeaser("Nepali"),
    ],
  },
];
