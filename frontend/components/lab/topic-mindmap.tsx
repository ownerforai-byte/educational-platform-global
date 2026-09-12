"use client";

import React, { useState, useMemo } from "react";
import {
  Workflow,
  Sparkles,
  Info,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  Filter,
} from "lucide-react";

export interface MindMapBranch {
  id: string;
  category: string;
  color: string;
  bgColor: string;
  borderColor: string;
  angle: number; // in degrees from center
  nodes: Array<{
    id: string;
    title: string;
    description: string;
    formula?: string;
    examFact?: string;
  }>;
}

interface TopicMindMapProps {
  subjectSlug: string;
  topicSlug: string;
  topicTitle: string;
  unitId?: string;
  className?: string;
}

export function TopicMindMap({
  subjectSlug,
  topicSlug,
  topicTitle,
  unitId,
  className = "",
}: TopicMindMapProps) {
  const [activeBranchId, setActiveBranchId] = useState<string | null>(null);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Determine branches and educational facts based on subject and topic
  const branches: MindMapBranch[] = useMemo(() => {
    const s = subjectSlug.toLowerCase();
    const t = topicSlug.toLowerCase();

    // ─────────────────────────────────────────────────────────────
    // 1. BIOLOGY TOPICS
    // ─────────────────────────────────────────────────────────────
    if (s.includes("bio")) {
      return [
        {
          id: "branch-fundamentals",
          category: "Structural Anatomy & Cell Type",
          color: "#10b981", // Emerald
          bgColor: "rgba(16, 185, 129, 0.15)",
          borderColor: "#10b981",
          angle: -60,
          nodes: [
            {
              id: "bio-1",
              title: "Cellular Organization",
              description: "Eukaryotic compartmentalization with double-membrane bound organelles.",
              examFact: "NEB: 80S ribosomes in cytoplasm; 70S ribosomes inside mitochondria & plastids.",
            },
            {
              id: "bio-2",
              title: "Plasma Membrane Fluidity",
              description: "Fluid Mosaic Model (Singer & Nicolson, 1972) with lipid bilayer & integral proteins.",
              formula: "Thickness: ~7.5 nm (75 Å)",
              examFact: "CEE: Phospholipids are amphipathic; polar head is hydrophilic, fatty acid tails hydrophobic.",
            },
          ],
        },
        {
          id: "branch-physiology",
          category: "Biochemical Pathways & Energy",
          color: "#0ea5e9", // Sky Cyan
          bgColor: "rgba(14, 165, 233, 0.15)",
          borderColor: "#0ea5e9",
          angle: 0,
          nodes: [
            {
              id: "bio-3",
              title: "Cellular Respiration & ATP",
              description: "Glycolysis in cytosol followed by Krebs Cycle in mitochondrial matrix.",
              formula: "Net Yield: 36–38 ATP per Glucose molecule",
              examFact: "CEE: Oxygen acts as the final electron acceptor in the Electron Transport System (ETS).",
            },
            {
              id: "bio-4",
              title: "Enzyme Catalysis",
              description: "Proteinaceous biocatalysts lowering activation energy without altering equilibrium.",
              formula: "Michaelis-Menten: v = (Vmax · [S]) / (Km + [S])",
              examFact: "NEB: Km is the substrate concentration at which velocity is half of Vmax.",
            },
          ],
        },
        {
          id: "branch-genetics",
          category: "Genetic Code & Molecular Biology",
          color: "#8b5cf6", // Purple
          bgColor: "rgba(139, 92, 246, 0.15)",
          borderColor: "#8b5cf6",
          angle: 60,
          nodes: [
            {
              id: "bio-5",
              title: "DNA Double Helix",
              description: "Antiparallel strands connected by hydrogen bonds between complementary base pairs.",
              formula: "Chargaff's Rule: [A] = [T] and [G] = [C]",
              examFact: "CEE: 2 H-bonds between A=T; 3 H-bonds between G≡C. Pitch of B-DNA is 3.4 nm (10 bp/turn).",
            },
            {
              id: "bio-6",
              title: "Central Dogma",
              description: "Unidirectional flow of genetic information: DNA → mRNA (transcription) → Polypeptide (translation).",
              examFact: "NEB: Reverse transcriptase (Temin & Baltimore) violates strict forward Central Dogma.",
            },
          ],
        },
        {
          id: "branch-traps",
          category: "CEE / Entrance Traps & High-Yield Exceptions",
          color: "#f59e0b", // Amber
          bgColor: "rgba(245, 158, 11, 0.15)",
          borderColor: "#f59e0b",
          angle: 120,
          nodes: [
            {
              id: "bio-7",
              title: "Organelle DNA Traps",
              description: "Mitochondria and Chloroplasts possess maternal inheritance and divide by binary fission.",
              examFact: "TRAP: Mature mammalian RBCs and sieve tube elements lack a nucleus, but are metabolically active!",
            },
            {
              id: "bio-8",
              title: "Mitosis vs Meiosis Crossing-over",
              description: "Recombination nodules and crossing-over occur exclusively in Pachytene stage of Prophase I.",
              examFact: "CEE TRAP: Synaptonemal complex forms in Zygotene; Chiasmata become visible in Diplotene!",
            },
          ],
        },
        {
          id: "branch-applications",
          category: "Clinical Pathology & Biotechnology",
          color: "#f43f5e", // Rose
          bgColor: "rgba(244, 63, 94, 0.15)",
          borderColor: "#f43f5e",
          angle: 180,
          nodes: [
            {
              id: "bio-9",
              title: "Recombinant DNA & PCR",
              description: "In vitro amplification of DNA fragments using Taq Polymerase from Thermus aquaticus.",
              formula: "PCR Cycle: Denaturation (94°C) → Annealing (55°C) → Extension (72°C)",
              examFact: "CEE: Taq polymerase is heat-stable and lacks 3'→5' proofreading exonuclease activity.",
            },
          ],
        },
      ];
    }

    // ─────────────────────────────────────────────────────────────
    // 2. CHEMISTRY TOPICS
    // ─────────────────────────────────────────────────────────────
    if (s.includes("chem")) {
      return [
        {
          id: "branch-fundamentals",
          category: "Atomic Structure & Periodic Properties",
          color: "#10b981", // Emerald
          bgColor: "rgba(16, 185, 129, 0.15)",
          borderColor: "#10b981",
          angle: -60,
          nodes: [
            {
              id: "ch-1",
              title: "Electronic Configuration Rules",
              description: "Aufbau principle, Hund's Rule of maximum multiplicity, and Pauli exclusion principle.",
              formula: "Energy Order: (n + l) rule",
              examFact: "CEE: Chromium (Z=24): [Ar] 3d⁵ 4s¹ and Copper (Z=29): [Ar] 3d¹⁰ 4s¹ due to exchange energy of half/full subshells.",
            },
            {
              id: "ch-2",
              title: "Periodic Trends & Shielding",
              description: "Electronegativity, electron affinity, and atomic radius governed by effective nuclear charge (Z_eff).",
              formula: "Z_eff = Z - σ (Slater's Screening Constant)",
              examFact: "NEB: First ionization energy of Nitrogen (N: 2p³) is greater than Oxygen (O: 2p⁴) due to half-filled p-orbital.",
            },
          ],
        },
        {
          id: "branch-bonding",
          category: "Chemical Bonding & Molecular Shapes",
          color: "#0ea5e9", // Sky Cyan
          bgColor: "rgba(14, 165, 233, 0.15)",
          borderColor: "#0ea5e9",
          angle: 0,
          nodes: [
            {
              id: "ch-3",
              title: "VSEPR & Hybridization",
              description: "Electron-pair repulsions minimize potential energy to dictate bond angles and stereochemistry.",
              formula: "Steric No = 1/2 [V + M - C + A]",
              examFact: "CEE: XeF₄ is sp³d² (square planar, 2 lone pairs); NH₃ is sp³ (trigonal pyramidal, 107°); H₂O is sp³ (bent, 104.5°).",
            },
            {
              id: "ch-4",
              title: "Hydrogen Bonding & Dipoles",
              description: "Intermolecular electrostatic force between H bonded to high electronegativity atoms (F, O, N).",
              examFact: "NEB: H₂O is liquid but H₂S is gas due to extensive intermolecular hydrogen bonding in water.",
            },
          ],
        },
        {
          id: "branch-thermo",
          category: "Thermodynamics & Equilibrium",
          color: "#8b5cf6", // Purple
          bgColor: "rgba(139, 92, 246, 0.15)",
          borderColor: "#8b5cf6",
          angle: 60,
          nodes: [
            {
              id: "ch-5",
              title: "Gibbs Free Energy & Spontaneity",
              description: "Criterion for spontaneous physical or chemical change at constant temperature and pressure.",
              formula: "ΔG = ΔH - T·ΔS (Spontaneous if ΔG < 0)",
              examFact: "CEE: At standard equilibrium, ΔG° = -2.303·R·T·log(K_eq). If K > 1, ΔG° is negative.",
            },
            {
              id: "ch-6",
              title: "Le Chatelier's Principle",
              description: "System at dynamic equilibrium shifts to counteract external stress in temperature, pressure, or concentration.",
              examFact: "NEB: In Haber's process (N₂ + 3H₂ ⇌ 2NH₃, ΔH < 0), high pressure and moderate temperature maximize yield.",
            },
          ],
        },
        {
          id: "branch-traps",
          category: "High-Yield Entrance Traps & Speed Hacks",
          color: "#f59e0b", // Amber
          bgColor: "rgba(245, 158, 11, 0.15)",
          borderColor: "#f59e0b",
          angle: 120,
          nodes: [
            {
              id: "ch-7",
              title: "Inert Pair Effect Traps",
              description: "Reluctance of valence s-electrons to participate in bonding in heavier p-block elements (Tl, Pb, Bi).",
              examFact: "CEE TRAP: Pb⁴⁺ is a powerful oxidizing agent because Pb²⁺ is much more stable than Pb⁴⁺. Tl⁺ is more stable than Tl³⁺!",
            },
            {
              id: "ch-8",
              title: "Amphoteric Oxides & Hydroxides",
              description: "Oxides that react with both strong acids and strong bases to yield salt and water.",
              formula: "ZnO + 2NaOH → Na₂ZnO₂ + H₂O",
              examFact: "CEE TRAP: Zn, Al, Sn, Pb, Be form amphoteric oxides. Both Zn and Al dissolve in conc. NaOH releasing H₂ gas!",
            },
          ],
        },
        {
          id: "branch-applications",
          category: "Industrial Synthesis & Metallurgy",
          color: "#f43f5e", // Rose
          bgColor: "rgba(244, 63, 94, 0.15)",
          borderColor: "#f43f5e",
          angle: 180,
          nodes: [
            {
              id: "ch-9",
              title: "Extraction of Iron & Copper",
              description: "Blast furnace reduction of Hematite (Fe₂O₃) with coke and limestone flux; Bessemerization of Copper matte.",
              formula: "Slag Formation: CaO + SiO₂ → CaSiO₃",
              examFact: "NEB: Slag is less dense than molten iron and floats on top, preventing re-oxidation of iron by blast air.",
            },
          ],
        },
      ];
    }

    // ─────────────────────────────────────────────────────────────
    // 3. MATHEMATICS TOPICS
    // ─────────────────────────────────────────────────────────────
    if (s.includes("math")) {
      return [
        {
          id: "branch-fundamentals",
          category: "Definitions & Core Axioms",
          color: "#10b981", // Emerald
          bgColor: "rgba(16, 185, 129, 0.15)",
          borderColor: "#10b981",
          angle: -60,
          nodes: [
            {
              id: "math-1",
              title: "Limits & Continuity",
              description: "Rigorous definition of convergence: limit of f(x) as x approaches c equals L.",
              formula: "ε-δ Definition: 0 < |x - c| < δ ⟹ |f(x) - L| < ε",
              examFact: "NEB: A function is continuous at x=c iff Left Hand Limit = Right Hand Limit = f(c).",
            },
            {
              id: "math-2",
              title: "First Principles of Derivatives",
              description: "Instantaneous rate of change derived from the secant limit.",
              formula: "f'(x) = lim_{h → 0} [f(x + h) - f(x)] / h",
              examFact: "IOE: Geometric meaning of derivative is the slope of the tangent line to the curve at point (x, y).",
            },
          ],
        },
        {
          id: "branch-calculus",
          category: "Differential & Integral Theorems",
          color: "#0ea5e9", // Sky Cyan
          bgColor: "rgba(14, 165, 233, 0.15)",
          borderColor: "#0ea5e9",
          angle: 0,
          nodes: [
            {
              id: "math-3",
              title: "Mean Value Theorem (Lagrange's MVT)",
              description: "If f(x) is continuous on [a, b] and differentiable on (a, b), there exists c ∈ (a, b) where tangent is parallel to secant.",
              formula: "f'(c) = [f(b) - f(a)] / (b - a)",
              examFact: "CEE: Rolle's Theorem is the special case of LMVT where f(a) = f(b), resulting in f'(c) = 0.",
            },
            {
              id: "math-4",
              title: "Fundamental Theorem of Calculus",
              description: "Connects differentiation and integration as reciprocal operations for area computation.",
              formula: "d/dx [∫ₐˣ f(t) dt] = f(x) and ∫ₐᵇ f(x) dx = F(b) - F(a)",
              examFact: "NEB: Leibnitz Rule for differentiating under the integral sign is widely tested in Class 12.",
            },
          ],
        },
        {
          id: "branch-vectors",
          category: "Vector Spaces & 3D Geometry",
          color: "#8b5cf6", // Purple
          bgColor: "rgba(139, 92, 246, 0.15)",
          borderColor: "#8b5cf6",
          angle: 60,
          nodes: [
            {
              id: "math-5",
              title: "Dot & Cross Products",
              description: "Scalar product yields projection; vector product yields orthogonal normal vector with area magnitude.",
              formula: "a · b = |a||b| cos θ ; a × b = |a||b| sin θ n̂",
              examFact: "IOE: Condition for perpendicularity: a · b = 0; Condition for collinearity/parallelism: a × b = 0.",
            },
            {
              id: "math-6",
              title: "Shortest Distance Between Skew Lines",
              description: "Perpendicular distance between non-intersecting, non-parallel lines in three dimensions.",
              formula: "d = |(a₂ - a₁) · (b₁ × b₂)| / |b₁ × b₂|",
              examFact: "NEB 5-Mark Question: If lines intersect, shortest distance d = 0.",
            },
          ],
        },
        {
          id: "branch-traps",
          category: "IOE / CEE Exam Traps & Short Tricks",
          color: "#f59e0b", // Amber
          bgColor: "rgba(245, 158, 11, 0.15)",
          borderColor: "#f59e0b",
          angle: 120,
          nodes: [
            {
              id: "math-7",
              title: "L'Hôpital's Rule Traps",
              description: "Applicable ONLY to indeterminate forms 0/0 or ∞/∞.",
              formula: "lim [f(x)/g(x)] = lim [f'(x)/g'(x)]",
              examFact: "TRAP: Do NOT use quotient rule! Differentiate numerator and denominator independently!",
            },
            {
              id: "math-8",
              title: "Definite Integral Symmetry Shortcuts",
              description: "King's property and odd/even function shortcuts eliminate lengthy trigonometric integration.",
              formula: "∫₋ₐᵃ f(x) dx = 0 (if odd) ; 2∫₀ᵃ f(x) dx (if even)",
              examFact: "IOE SPEED HACK: King's rule ∫₀ᵃ f(x) dx = ∫₀ᵃ f(a - x) dx solves 90% of periodic fraction integrals in 30 seconds!",
            },
          ],
        },
        {
          id: "branch-applications",
          category: "Engineering & Applied Modelling",
          color: "#f43f5e", // Rose
          bgColor: "rgba(244, 63, 94, 0.15)",
          borderColor: "#f43f5e",
          angle: 180,
          nodes: [
            {
              id: "math-9",
              title: "Differential Equations of Growth & Decay",
              description: "First-order linear ODEs governing radioactive decay, Newton's law of cooling, and RC circuits.",
              formula: "dy/dt = k·y ⟹ y(t) = y₀ · e^(kt)",
              examFact: "NEB: Integrating factor for dy/dx + P(x)y = Q(x) is I.F. = e^(∫P dx).",
            },
          ],
        },
      ];
    }

    // ─────────────────────────────────────────────────────────────
    // 4. PHYSICS TOPICS (Default)
    // ─────────────────────────────────────────────────────────────
    return [
      {
        id: "branch-fundamentals",
        category: "Fundamental Laws & Free-Body Principles",
        color: "#10b981", // Emerald
        bgColor: "rgba(16, 185, 129, 0.15)",
        borderColor: "#10b981",
        angle: -60,
        nodes: [
          {
            id: "ph-1",
            title: "Newton's 2nd Law & Momentum",
            description: "Net external force is the time rate of change of linear momentum in an inertial reference frame.",
            formula: "F_net = dp/dt = m(dv/dt) = m·a",
            examFact: "NEB: Impulse = Δp = ∫ F dt = Area under Force-time graph. Conservation of momentum applies when F_ext = 0.",
          },
          {
            id: "ph-2",
            title: "Normal Reaction & Friction",
            description: "Electromagnetic contact forces resolving perpendicular and parallel to the contact interface.",
            formula: "f_static ≤ μ_s · N ; f_kinetic = μ_k · N (μ_k < μ_s)",
            examFact: "CEE: Friction is independent of apparent contact area; Angle of repose equals angle of friction: tan(θ) = μ_s.",
          },
        ],
      },
      {
        id: "branch-energy",
        category: "Work-Energy Theorem & Conservative Fields",
        color: "#0ea5e9", // Sky Cyan
        bgColor: "rgba(14, 165, 233, 0.15)",
        borderColor: "#0ea5e9",
        angle: 0,
        nodes: [
          {
            id: "ph-3",
            title: "Work-Kinetic Energy Theorem",
            description: "Work done by all forces (conservative, non-conservative, external) equals the change in kinetic energy.",
            formula: "W_total = ΔK = 1/2 m(v² - u²)",
            examFact: "IOE: Conservative forces (gravity, electrostatic, spring) do zero work around any closed path: ∮ F·dr = 0.",
          },
          {
            id: "ph-4",
            title: "Potential Energy & Force Relationship",
            description: "Force is the negative spatial gradient of potential energy function.",
            formula: "F = -dU/dx (Stable equilibrium when d²U/dx² > 0)",
            examFact: "CEE: At stable equilibrium potential energy is minimum; at unstable equilibrium potential energy is maximum.",
          },
        ],
      },
      {
        id: "branch-dynamics",
        category: "Circular Dynamics & Rotational Mechanics",
        color: "#8b5cf6", // Purple
        bgColor: "rgba(139, 92, 246, 0.15)",
        borderColor: "#8b5cf6",
        angle: 60,
        nodes: [
          {
            id: "ph-5",
            title: "Centripetal Acceleration & Banking",
            description: "Inward radial acceleration changing velocity direction in uniform circular motion.",
            formula: "a_c = v² / r = ω²·r ; tan(θ) = v² / (r·g)",
            examFact: "NEB Derivation: Optimum speed on banked road without friction is v = √(r·g·tan θ).",
          },
          {
            id: "ph-6",
            title: "Moment of Inertia & Torque",
            description: "Rotational inertia resisting angular acceleration about a fixed axis.",
            formula: "τ = I·α = dL/dt ; L = I·ω",
            examFact: "CEE: Parallel axis theorem: I = I_cm + M·d²; Perpendicular axis theorem applies only to planar laminae (I_z = I_x + I_y).",
          },
        ],
      },
      {
        id: "branch-traps",
        category: "High-Yield CEE / IOE Traps & Velocity Thresholds",
        color: "#f59e0b", // Amber
        bgColor: "rgba(245, 158, 11, 0.15)",
        borderColor: "#f59e0b",
        angle: 120,
        nodes: [
          {
            id: "ph-7",
            title: "Vertical Circular Motion Critical Velocities",
            description: "Minimum speed required to prevent slack in string during vertical loop.",
            formula: "Bottom: v_min = √(5gr) | Top: v_min = √(gr)",
            examFact: "TRAP: If vertical loop uses a LIGHT ROD instead of a string, velocity at highest point can be zero, so v_bottom = √(4gr)!",
          },
          {
            id: "ph-8",
            title: "Elastic vs Inelastic Collisions",
            description: "Total momentum is conserved in ALL collisions. Kinetic energy is conserved ONLY in perfectly elastic collisions.",
            formula: "Coefficient of Restitution: e = (v₂ - v₁) / (u₁ - u₂)",
            examFact: "CEE TRAP: In perfectly inelastic collision (e=0), bodies stick together, producing MAXIMUM possible kinetic energy loss!",
          },
        ],
      },
      {
        id: "branch-applications",
        category: "Astrophysics, Orbital Mechanics & SHM",
        color: "#f43f5e", // Rose
        bgColor: "rgba(244, 63, 94, 0.15)",
        borderColor: "#f43f5e",
        angle: 180,
        nodes: [
          {
            id: "ph-9",
            title: "Escape Velocity & Orbital Satellites",
            description: "Minimum velocity to project a body from celestial surface to escape its gravitational influence.",
            formula: "v_escape = √(2GM/R) = √(2gR) ≈ 11.2 km/s (Earth)",
            examFact: "CEE: Escape velocity is independent of the mass of the projected body and the projection angle (unless air resistance is counted)!",
          },
        ],
      },
    ];
  }, [subjectSlug, topicSlug]);

  const activeBranch = branches.find((b) => b.id === activeBranchId) ?? null;
  const activeNode =
    branches
      .flatMap((b) => b.nodes)
      .find((n) => n.id === activeNodeId) ?? null;

  // Center coordinate on 1000 x 600 canvas
  const centerX = 500;
  const centerY = 300;
  const branchRadius = 240;

  return (
    <div className={`rounded-3xl border border-border/80 bg-[#090d16] text-slate-100 shadow-xl overflow-hidden ${className}`}>
      {/* ── Top Header Toolbar ── */}
      <div className="px-6 py-4 border-b border-slate-800 bg-[#0d1322] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-sm">
            <Workflow className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Non-Confusable Branch Architecture
              </span>
              <h3 className="text-sm md:text-base font-bold text-white tracking-tight">
                Interactive Knowledge Mindmap: {topicTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              High-contrast blueprint canvas with isolated multi-color branch pathways &amp; examination facts
            </p>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
            className="p-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
            className="p-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              setZoomLevel(1);
              setActiveBranchId(null);
              setActiveNodeId(null);
            }}
            className="p-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reset Canvas"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Category Legend Pill Bar ── */}
      <div className="px-6 py-2.5 border-b border-slate-800/80 bg-[#090e1a] flex flex-wrap items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
          <Filter className="h-3 w-3" />
          Branches:
        </span>
        {branches.map((b) => {
          const isSelected = activeBranchId === b.id;
          return (
            <button
              key={b.id}
              onClick={() => {
                setActiveBranchId(isSelected ? null : b.id);
                setActiveNodeId(null);
              }}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                isSelected
                  ? "shadow-md scale-105"
                  : "opacity-80 hover:opacity-100 hover:scale-102"
              }`}
              style={{
                backgroundColor: isSelected ? b.bgColor : "rgba(15, 23, 42, 0.6)",
                borderColor: b.color,
                color: b.color,
              }}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: b.color }} />
              <span>{b.category}</span>
            </button>
          );
        })}
      </div>

      {/* ── Main Canvas (DARK BLUEPRINT / NON-WHITE) ── */}
      <div className="relative w-full aspect-[16/10] min-h-[440px] max-h-[640px] bg-[#070b14] overflow-hidden select-none">
        {/* Subtle Engineering Blueprint Background Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `radial-gradient(rgba(148, 163, 184, 0.2) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div
          className="w-full h-full transition-transform duration-300 ease-out origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg viewBox="0 0 1000 600" className="w-full h-full" style={{ overflow: "visible" }}>
            <defs>
              {/* Dynamic Glow Filters for Colored Connectors */}
              <filter id="branch-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* 1. Branch Curved Connectors from Central Core to Branch Centers */}
            {branches.map((b, i) => {
              // Calculate branch anchor point
              const rad = (b.angle * Math.PI) / 180;
              const bx = centerX + branchRadius * Math.cos(rad);
              const by = centerY + branchRadius * Math.sin(rad);

              const isBranchActive = activeBranchId === null || activeBranchId === b.id;

              // Quadratic bezier control point for elegant curved trunk
              const cx = centerX + (branchRadius * 0.45) * Math.cos(rad + 0.15);
              const cy = centerY + (branchRadius * 0.45) * Math.sin(rad + 0.15);

              const trunkPath = `M ${centerX} ${centerY} Q ${cx} ${cy} ${bx} ${by}`;

              return (
                <g key={`trunk-${b.id}`} opacity={isBranchActive ? 1 : 0.2} className="transition-opacity duration-300">
                  {/* Outer glow trace */}
                  <path
                    d={trunkPath}
                    fill="none"
                    stroke={b.color}
                    strokeWidth="8"
                    strokeOpacity="0.18"
                    strokeLinecap="round"
                  />
                  {/* Distinct Core Branch Trunk */}
                  <path
                    d={trunkPath}
                    fill="none"
                    stroke={b.color}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Secondary leaves connected to Branch Trunk */}
                  {b.nodes.map((node, nodeIdx) => {
                    const nodeSpread = (nodeIdx === 0 ? -1 : 1) * 38;
                    const nx = bx + Math.cos(rad) * 90 + Math.sin(rad) * nodeSpread;
                    const ny = by + Math.sin(rad) * 90 - Math.cos(rad) * nodeSpread;

                    const leafPath = `M ${bx} ${by} Q ${(bx + nx) / 2} ${(by + ny) / 2 - 15} ${nx} ${ny}`;
                    const isNodeActive = activeNodeId === node.id;

                    return (
                      <g key={`leaf-path-${node.id}`}>
                        <path
                          d={leafPath}
                          fill="none"
                          stroke={b.color}
                          strokeWidth={isNodeActive ? "3" : "1.8"}
                          strokeDasharray={isNodeActive ? "none" : "4 2"}
                          strokeOpacity={isNodeActive ? 1 : 0.75}
                        />
                        <circle cx={nx} cy={ny} r={isNodeActive ? "6" : "4"} fill={b.color} />
                      </g>
                    );
                  })}
                </g>
              );
            })}

            {/* 2. Central Root Node */}
            <g
              transform={`translate(${centerX}, ${centerY})`}
              className="cursor-pointer"
              onClick={() => {
                setActiveBranchId(null);
                setActiveNodeId(null);
              }}
            >
              {/* Outer pulsing ring */}
              <circle r="52" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="6 3" />
              <circle r="44" fill="#0f172a" stroke="#3b82f6" strokeWidth="3" />
              <text textAnchor="middle" y="-6" fill="#60a5fa" fontSize="12" fontWeight="bold">
                ROOT CONCEPT
              </text>
              <text textAnchor="middle" y="14" fill="#ffffff" fontSize="13" fontWeight="extrabold">
                {topicTitle.length > 18 ? topicTitle.slice(0, 16) + "..." : topicTitle}
              </text>
            </g>
          </svg>

          {/* 3. HTML Nodes Overlaid at Exact Coordinates */}
          {branches.map((b) => {
            const rad = (b.angle * Math.PI) / 180;
            const bx = centerX + branchRadius * Math.cos(rad);
            const by = centerY + branchRadius * Math.sin(rad);

            const isBranchActive = activeBranchId === null || activeBranchId === b.id;

            return (
              <React.Fragment key={`html-${b.id}`}>
                {/* Branch Head Capsule */}
                <div
                  style={{
                    left: `${(bx / 1000) * 100}%`,
                    top: `${(by / 600) * 100}%`,
                    transform: "translate(-50%, -50%)",
                    borderColor: b.color,
                    boxShadow: activeBranchId === b.id ? `0 0 25px ${b.color}50` : "none",
                  }}
                  onClick={() => {
                    setActiveBranchId(b.id);
                    setActiveNodeId(null);
                  }}
                  className={`absolute z-20 cursor-pointer rounded-2xl border-2 px-3.5 py-2 backdrop-blur-md transition-all duration-200 ${
                    isBranchActive ? "opacity-100 scale-105" : "opacity-30 scale-95"
                  } bg-[#0c1220]/95 hover:scale-110`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: b.color }} />
                    <span className="text-xs font-bold text-white whitespace-nowrap">{b.category}</span>
                  </div>
                </div>

                {/* Child Nodes */}
                {b.nodes.map((node, nodeIdx) => {
                  const nodeSpread = (nodeIdx === 0 ? -1 : 1) * 38;
                  const nx = bx + Math.cos(rad) * 90 + Math.sin(rad) * nodeSpread;
                  const ny = by + Math.sin(rad) * 90 - Math.cos(rad) * nodeSpread;

                  const isNodeSelected = activeNodeId === node.id;

                  return (
                    <div
                      key={`child-${node.id}`}
                      style={{
                        left: `${(nx / 1000) * 100}%`,
                        top: `${(ny / 600) * 100}%`,
                        transform: "translate(-50%, -50%)",
                        borderColor: isNodeSelected ? b.color : "rgba(148, 163, 184, 0.2)",
                      }}
                      onClick={() => {
                        setActiveBranchId(b.id);
                        setActiveNodeId(node.id);
                      }}
                      className={`absolute z-30 cursor-pointer rounded-xl border p-2 max-w-[170px] backdrop-blur-md transition-all duration-200 ${
                        isNodeSelected
                          ? "bg-slate-900 border-2 ring-2 scale-105 shadow-xl"
                          : "bg-slate-950/90 hover:border-slate-500 hover:scale-102"
                      }`}
                    >
                      <h4 className="text-[11px] font-bold text-white leading-tight truncate">
                        {node.title}
                      </h4>
                      {node.formula && (
                        <div
                          className="mt-1 font-mono text-[9px] font-semibold px-1 rounded truncate"
                          style={{ backgroundColor: `${b.color}20`, color: b.color }}
                        >
                          {node.formula}
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── Fact & Exam Insight Drawer (Shows upon clicking node/branch) ── */}
      <div className="p-5 border-t border-slate-800 bg-[#0c1220] min-h-[120px] transition-all">
        {activeNode ? (
          <div className="space-y-2 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: activeBranch?.color || "#38bdf8" }}
                />
                <h4 className="text-sm font-extrabold text-white">{activeNode.title}</h4>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {activeBranch?.category}
                </span>
              </div>
              <button
                onClick={() => setActiveNodeId(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close Fact Box
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{activeNode.description}</p>

            {activeNode.formula && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs text-cyan-300">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Governing Formula:</span>
                <span>{activeNode.formula}</span>
              </div>
            )}

            {activeNode.examFact && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300">CEE / NEB High-Yield Exam Pointer: </span>
                  <span>{activeNode.examFact}</span>
                </div>
              </div>
            )}
          </div>
        ) : activeBranch ? (
          <div className="space-y-1.5 animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: activeBranch.color }} />
              <h4 className="text-sm font-bold text-white">{activeBranch.category}</h4>
            </div>
            <p className="text-xs text-slate-400">
              This branch isolates {activeBranch.nodes.length} core concepts. Click any node above to inspect its exact mathematical derivation, real-world mechanism, and entrance examination traps.
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <Info className="h-4 w-4 text-indigo-400" />
              <span>Click any colored branch or leaf capsule to inspect formulas, principles, and CEE examination traps.</span>
            </span>
            <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
              Blueprint Mode &bull; 5 Distinct Pathways
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
