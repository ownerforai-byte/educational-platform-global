"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Atom,
  FlaskConical,
  Dna,
  Calculator,
  ArrowRight,
  Play,
  Layers,
  Sparkles,
  Zap,
  Flame,
  Thermometer,
  Compass,
  Search,
  ExternalLink,
} from "lucide-react";

type LabDomain = "physics" | "chemistry" | "biology" | "mathematics";

interface LabCardData {
  title: string;
  description: string;
  href: string;
  badge: "3D Suite" | "Simulator" | "Solver" | "Experiment";
  badgeColor: string;
}

const LABS_DATA: Record<LabDomain, LabCardData[]> = {
  physics: [
    {
      title: "Mechanics Suite 3D",
      description: "Newtonian dynamics, projectile trajectories, kinematics & rotational inertia in 3D.",
      href: "/lab/physics/physics-mechanics-suite-3d",
      badge: "3D Suite",
      badgeColor: "bg-sky-500/15 text-sky-500 border-sky-500/30",
    },
    {
      title: "Electricity & Circuits 3D",
      description: "Coulomb fields, potential surfaces, DC circuits, capacitor charging & Ohm's law.",
      href: "/lab/physics/physics-electricity-suite-3d",
      badge: "3D Suite",
      badgeColor: "bg-sky-500/15 text-sky-500 border-sky-500/30",
    },
    {
      title: "Magnetism & EMI 3D",
      description: "Magnetic fields of currents, Biot-Savart, Lorentz force, Faraday induction & Lenz's law.",
      href: "/lab/physics/physics-magnetism-emi-suite-3d",
      badge: "3D Suite",
      badgeColor: "bg-sky-500/15 text-sky-500 border-sky-500/30",
    },
    {
      title: "Wave Optics Suite 3D",
      description: "Huygens wavelets, Young's double slit interference, diffraction grating & polarization.",
      href: "/lab/physics/physics-wave-optics-suite-3d",
      badge: "3D Suite",
      badgeColor: "bg-sky-500/15 text-sky-500 border-sky-500/30",
    },
    {
      title: "Elasticity & Gas Suite 3D",
      description: "Stress-strain curves, Young's modulus, kinetic theory of gases & Maxwell distribution.",
      href: "/lab/physics/physics-elasticity-gas-suite-3d",
      badge: "3D Suite",
      badgeColor: "bg-sky-500/15 text-sky-500 border-sky-500/30",
    },
    {
      title: "Modern Physics 3D",
      description: "Photoelectric effect, Bohr's atom, radioactive decay chains & energy band theory.",
      href: "/lab/physics/physics-modern-suite-3d",
      badge: "3D Suite",
      badgeColor: "bg-sky-500/15 text-sky-500 border-sky-500/30",
    },
    {
      title: "Heat Determinations Lab",
      description: "Searle's Bar, Lee's Disc for thermal conductivity, Newton's law of cooling & expansion.",
      href: "/lab/physics/heat-determinations",
      badge: "Experiment",
      badgeColor: "bg-amber-500/15 text-amber-500 border-amber-500/30",
    },
    {
      title: "Double Pendulum Chaos Simulator",
      description: "Simulate non-linear chaotic motion with real-time Poincaré trajectory plots.",
      href: "/lab/physics/ph-calc-double-pendulum",
      badge: "Simulator",
      badgeColor: "bg-violet-500/15 text-violet-500 border-violet-500/30",
    },
    {
      title: "Projectile & Gravity Simulator",
      description: "Calculate launch velocity, angle, air resistance, max height & horizontal range.",
      href: "/lab/physics/ph-calc-projectile",
      badge: "Simulator",
      badgeColor: "bg-violet-500/15 text-violet-500 border-violet-500/30",
    },
    {
      title: "Optics Ray & Lens Calculator",
      description: "Convex/concave mirrors, thin lens formula, focal lengths & magnification diagrams.",
      href: "/lab/physics/ph-calc-optics",
      badge: "Solver",
      badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    },
    {
      title: "Pi-Collisions Elastic Solver",
      description: "Galperin's elastic collision simulation calculating Pi through kinetic energy exchange.",
      href: "/lab/physics/ph-calc-pi-collisions",
      badge: "Simulator",
      badgeColor: "bg-violet-500/15 text-violet-500 border-violet-500/30",
    },
    {
      title: "Three-Body Gravitational Orbit",
      description: "Simulate N-body celestial gravitational interactions with customizable orbital masses.",
      href: "/lab/physics/ph-calc-threebody",
      badge: "Simulator",
      badgeColor: "bg-violet-500/15 text-violet-500 border-violet-500/30",
    },
  ],
  chemistry: [
    {
      title: "3D Molecular Builder",
      description: "Construct 3D molecular structures, examine VSEPR geometry, bond angles & valence.",
      href: "/lab/chemistry/molecular-builder",
      badge: "3D Suite",
      badgeColor: "bg-amber-500/15 text-amber-500 border-amber-500/30",
    },
    {
      title: "3D Interactive Periodic Table",
      description: "Explore electronegativity, electron configurations, ionization energy & periodicity.",
      href: "/lab/chemistry/ch-3d-periodic",
      badge: "3D Suite",
      badgeColor: "bg-amber-500/15 text-amber-500 border-amber-500/30",
    },
    {
      title: "Microscopic Molecular Reactions",
      description: "Atomic scale collision theory, activated complex formation & activation energies.",
      href: "/lab/chemistry/ch-3d-micro",
      badge: "3D Suite",
      badgeColor: "bg-amber-500/15 text-amber-500 border-amber-500/30",
    },
    {
      title: "Gas Laws Computational Simulator",
      description: "Boyle's, Charles's, and Ideal Gas Law (PV=nRT) with interactive pressure and temp controls.",
      href: "/lab/chemistry/ch-calc-gas",
      badge: "Simulator",
      badgeColor: "bg-violet-500/15 text-violet-500 border-violet-500/30",
    },
    {
      title: "Titration Curve Simulator",
      description: "Simulate strong/weak acid-base titrations, buffer plateaus & equivalence point pH.",
      href: "/lab/chemistry/ch-calc-titration",
      badge: "Simulator",
      badgeColor: "bg-violet-500/15 text-violet-500 border-violet-500/30",
    },
    {
      title: "pH & Buffer Solution Calculator",
      description: "Calculate hydronium ion concentration, Henderson-Hasselbalch buffer capacity & pKa.",
      href: "/lab/chemistry/ch-calc-ph",
      badge: "Solver",
      badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    },
    {
      title: "Stoichiometry & Yield Solver",
      description: "Calculate limiting reagents, theoretical yield, molar ratios & reaction excess.",
      href: "/lab/chemistry/ch-calc-stoich",
      badge: "Solver",
      badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    },
    {
      title: "Chemical Bonding & VSEPR Theory",
      description: "Deep dive into Ionic, Covalent, Hybridization (sp, sp2, sp3) and Molecular Orbitals.",
      href: "/lab/chemistry/ch-th-bonding",
      badge: "Experiment",
      badgeColor: "bg-sky-500/15 text-sky-500 border-sky-500/30",
    },
    {
      title: "Chemical Thermodynamics & Hess's Law",
      description: "Enthalpy of reaction, entropy, Gibbs free energy & spontaneity criteria calculations.",
      href: "/lab/chemistry/ch-th-thermo",
      badge: "Experiment",
      badgeColor: "bg-sky-500/15 text-sky-500 border-sky-500/30",
    },
    {
      title: "Organic Reaction Mechanisms Suite",
      description: "Nucleophilic substitutions (SN1/SN2), electrophilic additions & Markovnikov rules.",
      href: "/lab/chemistry/ch-th-organic",
      badge: "3D Suite",
      badgeColor: "bg-amber-500/15 text-amber-500 border-amber-500/30",
    },
  ],
  biology: [
    {
      title: "3D Cell Anatomy (Plant & Animal)",
      description: "Examine nucleus, mitochondria, chloroplasts, endoplasmic reticulum & ribosomes.",
      href: "/lab/biology/cell-3d",
      badge: "3D Suite",
      badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    },
    {
      title: "DNA Double Helix & Genetics 3D",
      description: "Interactive double helix with base pairing (A-T, G-C), transcription & replication.",
      href: "/lab/biology/bio-3d-dna",
      badge: "3D Suite",
      badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    },
    {
      title: "Cell Division 3D (Mitosis & Meiosis)",
      description: "Step through Prophase, Metaphase, Anaphase & Telophase with spindle chromosome tracking.",
      href: "/lab/biology/cell-division-3d",
      badge: "3D Suite",
      badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    },
    {
      title: "Biomolecules 3D (Proteins & Lipids)",
      description: "Explore polypeptide secondary & tertiary folding, phospholipids & carbohydrate chains.",
      href: "/lab/biology/biomolecules-3d",
      badge: "3D Suite",
      badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    },
    {
      title: "Ecology & Biota Conservation 3D",
      description: "Explore Nepal's biodiversity, food web dynamics, ecological pyramids & conservation.",
      href: "/lab/biology/ecology-3d",
      badge: "3D Suite",
      badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    },
    {
      title: "Punnett Square Genetics Solver",
      description: "Solve monohybrid & dihybrid genetic crosses, calculate genotypic & phenotypic ratios.",
      href: "/lab/biology/bio-calc-punnett",
      badge: "Solver",
      badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    },
    {
      title: "Photosynthesis Rate Calculator",
      description: "Model Light and Dark (Calvin Cycle) reactions with light intensity & CO2 variables.",
      href: "/lab/biology/bio-calc-photosynthesis",
      badge: "Simulator",
      badgeColor: "bg-violet-500/15 text-violet-500 border-violet-500/30",
    },
    {
      title: "Population Growth Dynamics Model",
      description: "Simulate exponential (Malthusian) vs logistic carrying capacity models with birth/death rates.",
      href: "/lab/biology/bio-calc-population",
      badge: "Simulator",
      badgeColor: "bg-violet-500/15 text-violet-500 border-violet-500/30",
    },
    {
      title: "Human Organ Systems 3D",
      description: "Interactive circulatory, nervous, digestive, and excretory physiological models.",
      href: "/lab/biology/bio-3d-human",
      badge: "3D Suite",
      badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    },
  ],
  mathematics: [
    {
      title: "Symbolic Equation Solver",
      description: "Solve linear systems, polynomial roots, algebraic factoring & symbolic substitutions.",
      href: "/lab/math/equation-solver",
      badge: "Solver",
      badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    },
    {
      title: "3D Multivariable Geometry & Surfaces",
      description: "Visualize paraboloids, hyperboloids, ellipsoid surfaces, saddle points & tangent planes.",
      href: "/lab/math/math-3d-geometry",
      badge: "3D Suite",
      badgeColor: "bg-violet-500/15 text-violet-500 border-violet-500/30",
    },
    {
      title: "Fourier Transform & Wave Harmonics",
      description: "Decompose complex signals into sinusoidal harmonic frequencies with interactive Fourier bars.",
      href: "/lab/math/math-3d-fourier",
      badge: "3D Suite",
      badgeColor: "bg-violet-500/15 text-violet-500 border-violet-500/30",
    },
    {
      title: "Calculus Derivative Calculator",
      description: "Step-by-step differentiation: product rule, quotient rule, chain rule & implicit derivatives.",
      href: "/lab/math/math-calc-deriv",
      badge: "Solver",
      badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    },
    {
      title: "Limit Evaluator & L'Hôpital Solver",
      description: "Evaluate one-sided limits, infinite limits & indeterminate forms (0/0, inf/inf).",
      href: "/lab/math/math-calc-limit",
      badge: "Solver",
      badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    },
    {
      title: "Matrix Operations & Inverses Suite",
      description: "Matrix multiplication, determinants, inverses, eigenvalues & Cramer's rule systems.",
      href: "/lab/math/math-calc-matrix",
      badge: "Solver",
      badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    },
    {
      title: "Vector Cross & Dot Product Suite",
      description: "Calculate dot products, vector cross products, projections, and parallel/coplanar checks.",
      href: "/lab/math/math-calc-vectors",
      badge: "Solver",
      badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    },
    {
      title: "Series, Sequences & Binomial Solver",
      description: "Arithmetic/geometric progressions, infinite series convergence tests & binomial expansion.",
      href: "/lab/math/math-calc-series",
      badge: "Solver",
      badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    },
    {
      title: "Mathematical Notation & Symbols Reference",
      description: "Complete index of mathematical logic, calculus, linear algebra & set theory notations.",
      href: "/lab/math/symbols-math",
      badge: "Experiment",
      badgeColor: "bg-sky-500/15 text-sky-500 border-sky-500/30",
    },
  ],
};

const DOMAIN_INFO: Record<LabDomain, { label: string; icon: React.ComponentType<{ className?: string }>; color: string; count: string }> = {
  physics:     { label: "Physics Laboratories",     icon: Atom,         color: "text-sky-400",     count: "32+ Tools" },
  chemistry:   { label: "Chemistry & Reactions",   icon: FlaskConical, color: "text-amber-400",   count: "22+ Tools" },
  biology:     { label: "Biology & Life Sciences", icon: Dna,          color: "text-emerald-400", count: "24+ Tools" },
  mathematics: { label: "Mathematics & Solvers",   icon: Calculator,   color: "text-violet-400",  count: "28+ Tools" },
};

export function VirtualLabsCatalog() {
  const [activeDomain, setActiveDomain] = useState<LabDomain>("physics");

  const currentLabs = LABS_DATA[activeDomain];
  const domainMeta = DOMAIN_INFO[activeDomain];

  return (
    <section id="section-labs" className="mx-auto max-w-7xl px-4 py-12 scroll-mt-16 border-t border-border/60">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border/60">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
            <FlaskConical className="h-4 w-4" />
            <span>Interactive Virtual Laboratories</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            Explore 96+ 3D Simulations &amp; Computational Suites
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Each subject is powered by specialized 3D virtual environments, mathematical equation solvers, real-time physics simulators, and molecular chemistry builders.
          </p>
        </div>

        <Link
          href="/lab"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-primary-foreground text-xs font-bold shadow-md hover:bg-primary/90 transition-all self-start md:self-auto"
        >
          <span>Open Universal Lab Hub</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Domain Navigation Tabs */}
      <div className="mt-8 flex flex-wrap gap-2.5">
        {(Object.keys(DOMAIN_INFO) as LabDomain[]).map((domainKey) => {
          const info = DOMAIN_INFO[domainKey];
          const Icon = info.icon;
          const isActive = activeDomain === domainKey;

          return (
            <button
              key={domainKey}
              onClick={() => setActiveDomain(domainKey)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                isActive
                  ? "border-primary bg-primary/10 text-primary shadow-sm"
                  : "border-border/70 bg-card hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-primary" : info.color}`} />
              <span>{info.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                {info.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Labs Cards Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {currentLabs.map((lab) => (
          <div
            key={lab.href + lab.title}
            className="group relative flex flex-col justify-between rounded-3xl border border-border/70 bg-card p-5 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5"
          >
            <div>
              {/* Badge & Title */}
              <div className="flex items-start justify-between gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${lab.badgeColor}`}>
                  {lab.badge}
                </span>
                <span className="text-muted-foreground group-hover:text-primary transition-colors">
                  <Play className="h-4 w-4 fill-current opacity-60 group-hover:opacity-100" />
                </span>
              </div>

              <h3 className="text-base font-bold text-foreground mt-3 group-hover:text-primary transition-colors">
                {lab.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
                {lab.description}
              </p>
            </div>

            {/* Launch Action */}
            <div className="mt-5 pt-3 border-t border-border/50 flex items-center justify-between">
              <span className="text-[11px] font-medium text-muted-foreground">Interactive Module</span>
              <Link
                href={lab.href}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                Launch Simulator <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Lab Footer Banner */}
      <div className="mt-8 rounded-3xl border border-border/70 bg-muted/20 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">Looking for class-specific practical demonstrations?</p>
            <p className="text-[11px] text-muted-foreground">Visit the Practical syllabus section with step-by-step apparatus, procedures, and experiment writeups.</p>
          </div>
        </div>
        <Link
          href="/practical"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline shrink-0"
        >
          View Practical Manuals <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
