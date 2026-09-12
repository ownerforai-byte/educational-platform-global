"use client";

import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Info,
  Maximize2,
  Minimize2,
  Layers,
  HelpCircle,
  Eye,
  EyeOff,
  GraduationCap,
} from "lucide-react";

export interface DiagramAnnotation {
  id: string;
  label: string;
  formulaOrValue?: string;
  examNote: string;
  // Label anchor coordinate on screen/viewbox
  labelX: number;
  labelY: number;
  // Target tip coordinate pointing to the feature
  targetX: number;
  targetY: number;
  // Bezier control point for the long curved leader line
  controlX?: number;
  controlY?: number;
  color?: string;
}

export interface SchematicDiagramProps {
  subjectSlug: string;
  topicSlug: string;
  topicTitle: string;
  unitId?: string;
  className?: string;
}

export function SchematicDiagram({
  subjectSlug,
  topicSlug,
  topicTitle,
  unitId,
  className = "",
}: SchematicDiagramProps) {
  const [activeAnnotationId, setActiveAnnotationId] = useState<string | null>(null);
  const [showFormulas, setShowFormulas] = useState(true);
  const [showExamNotes, setShowExamNotes] = useState(true);

  // Normalize subject
  const normalizedSubject = useMemo(() => {
    const s = subjectSlug.toLowerCase();
    if (s.includes("physic")) return "physics";
    if (s.includes("chem")) return "chemistry";
    if (s.includes("bio")) return "biology";
    if (s.includes("math")) return "mathematics";
    return "general";
  }, [subjectSlug]);

  // Determine diagram schema based on subject and topic keywords
  const diagramData = useMemo(() => {
    const t = topicSlug.toLowerCase();
    const title = topicTitle.toLowerCase();

    // ─────────────────────────────────────────────────────────────
    // 1. BIOLOGY
    // ─────────────────────────────────────────────────────────────
    if (normalizedSubject === "biology") {
      if (t.includes("cell") || t.includes("organelle") || title.includes("cell")) {
        return {
          title: `Cellular Ultrastructure & Organelle Map: ${topicTitle}`,
          subtitle: "Eukaryotic Cell Architecture with Cytoplasmic Organelles & Metabolic Sites",
          viewBox: "0 0 900 520",
          annotations: [
            {
              id: "nucleus",
              label: "Nucleus & Chromatin",
              formulaOrValue: "DNA-Histone Complex",
              examNote: "NEB: Governs replication & transcription. Contains nucleolus (ribosomal RNA synthesis site).",
              labelX: 130,
              labelY: 70,
              targetX: 420,
              targetY: 230,
              controlX: 250,
              controlY: 100,
              color: "#38bdf8",
            },
            {
              id: "mito",
              label: "Mitochondria (Cristae)",
              formulaOrValue: "ATP Synthase F0-F1",
              examNote: "CEE: Semi-autonomous organelle with 70S ribosomes & circular DNA. Powerhouse of the cell.",
              labelX: 770,
              labelY: 80,
              targetX: 580,
              targetY: 220,
              controlX: 700,
              controlY: 140,
              color: "#f59e0b",
            },
            {
              id: "er",
              label: "Rough Endoplasmic Reticulum",
              formulaOrValue: "Ribosome studded (80S)",
              examNote: "NEB: Site of translation & protein processing; continuous with outer nuclear envelope.",
              labelX: 110,
              labelY: 300,
              targetX: 330,
              targetY: 260,
              controlX: 200,
              controlY: 280,
              color: "#a855f7",
            },
            {
              id: "golgi",
              label: "Golgi Apparatus (Dictyosome)",
              formulaOrValue: "Cis & Trans Faces",
              examNote: "CEE: Modifies, sorts, and packages glycoproteins into secretory vesicles.",
              labelX: 770,
              labelY: 340,
              targetX: 540,
              targetY: 320,
              controlX: 680,
              controlY: 350,
              color: "#ec4899",
            },
            {
              id: "membrane",
              label: "Plasma Membrane",
              formulaOrValue: "Fluid Mosaic Bilayer (~7.5 nm)",
              examNote: "Singer & Nicolson model: Phospholipid bilayer with integral and peripheral transport proteins.",
              labelX: 130,
              labelY: 460,
              targetX: 270,
              targetY: 380,
              controlX: 180,
              controlY: 420,
              color: "#10b981",
            },
          ] as DiagramAnnotation[],
          renderSvg: () => (
            <g>
              {/* Outer Cell Membrane */}
              <ellipse cx="450" cy="270" rx="250" ry="170" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="6 3" opacity="0.8" />
              <ellipse cx="450" cy="270" rx="242" ry="162" fill="#10b981" fillOpacity="0.04" />

              {/* Cytosol Flow Paths */}
              <path d="M 280 200 Q 320 150 400 160 T 550 180" fill="none" stroke="#10b981" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />
              <path d="M 320 340 Q 420 380 540 350" fill="none" stroke="#10b981" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />

              {/* Central Nucleus */}
              <ellipse cx="410" cy="240" rx="70" ry="60" fill="#0284c7" fillOpacity="0.18" stroke="#38bdf8" strokeWidth="3" />
              <ellipse cx="425" cy="230" rx="24" ry="20" fill="#38bdf8" fillOpacity="0.4" />
              <path d="M 380 220 Q 410 210 420 240 T 450 250" fill="none" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" />

              {/* Mitochondria */}
              <g transform="translate(560, 205) rotate(25)">
                <ellipse cx="0" cy="0" rx="42" ry="22" fill="#d97706" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="2.5" />
                <path d="M -30 0 Q -20 -12 -10 0 T 10 0 T 30 0" fill="none" stroke="#fbbf24" strokeWidth="2" />
              </g>

              {/* Rough ER folds */}
              <path d="M 330 210 Q 300 240 320 280 T 340 310" fill="none" stroke="#a855f7" strokeWidth="3" />
              <circle cx="315" cy="235" r="3" fill="#c084fc" />
              <circle cx="310" cy="265" r="3" fill="#c084fc" />
              <circle cx="330" cy="295" r="3" fill="#c084fc" />

              {/* Golgi Stacks */}
              <path d="M 520 300 Q 560 305 570 330" fill="none" stroke="#ec4899" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 515 315 Q 555 320 565 345" fill="none" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
              <circle cx="585" cy="335" r="5" fill="#f472b6" />
            </g>
          ),
        };
      }

      // Default Biology: Neuron Synapse / Biomolecules
      return {
        title: `Physiological Schematic: ${topicTitle}`,
        subtitle: "Synaptic Transmission, Signal Transduction & Neurochemical Architecture",
        viewBox: "0 0 900 520",
        annotations: [
          {
            id: "axon",
            label: "Presynaptic Terminal (Axon Button)",
            formulaOrValue: "Ca²⁺ Voltage Gated Influx",
            examNote: "CEE: Action potential depolarizes terminal; Ca²⁺ triggers exocytosis of acetylcholine.",
            labelX: 130,
            labelY: 70,
            targetX: 370,
            targetY: 180,
            controlX: 230,
            controlY: 100,
            color: "#38bdf8",
          },
          {
            id: "vesicles",
            label: "Synaptic Vesicles (ACh)",
            formulaOrValue: "Quanta: ~10,000 ACh Molecules",
            examNote: "NEB: Fuse with presynaptic membrane upon phosphorylation via synapsin proteins.",
            labelX: 770,
            labelY: 70,
            targetX: 430,
            targetY: 190,
            controlX: 650,
            controlY: 110,
            color: "#ec4899",
          },
          {
            id: "cleft",
            label: "Synaptic Cleft",
            formulaOrValue: "Width: 20–30 nm",
            examNote: "CEE: Neurotransmitters diffuse across extracellular gap in <0.5 milliseconds (synaptic delay).",
            labelX: 130,
            labelY: 280,
            targetX: 450,
            targetY: 270,
            controlX: 250,
            controlY: 280,
            color: "#10b981",
          },
          {
            id: "receptors",
            label: "Postsynaptic Ligand-Gated Receptors",
            formulaOrValue: "Nicotinic AChR (Na⁺ influx)",
            examNote: "NEB: Generates Excitatory Postsynaptic Potential (EPSP) driving threshold depolarization.",
            labelX: 770,
            labelY: 350,
            targetX: 490,
            targetY: 330,
            controlX: 680,
            controlY: 360,
            color: "#f59e0b",
          },
          {
            id: "enzyme",
            label: "Acetylcholinesterase (AChE)",
            formulaOrValue: "ACh → Acetate + Choline",
            examNote: "CEE: Rapidly breaks down ACh preventing continuous tetanic muscular contraction.",
            labelX: 140,
            labelY: 450,
            targetX: 390,
            targetY: 310,
            controlX: 240,
            controlY: 410,
            color: "#8b5cf6",
          },
        ] as DiagramAnnotation[],
        renderSvg: () => (
          <g>
            {/* Presynaptic Bouton Bulb */}
            <path
              d="M 330 60 L 330 140 C 330 230, 570 230, 570 140 L 570 60"
              fill="#0284c7"
              fillOpacity="0.12"
              stroke="#38bdf8"
              strokeWidth="3.5"
            />
            {/* Synaptic Vesicles */}
            <circle cx="390" cy="170" r="12" fill="#ec4899" fillOpacity="0.7" stroke="#f472b6" strokeWidth="2" />
            <circle cx="430" cy="185" r="10" fill="#ec4899" fillOpacity="0.7" stroke="#f472b6" strokeWidth="2" />
            <circle cx="480" cy="175" r="11" fill="#ec4899" fillOpacity="0.7" stroke="#f472b6" strokeWidth="2" />
            <circle cx="520" cy="160" r="12" fill="#ec4899" fillOpacity="0.7" stroke="#f472b6" strokeWidth="2" />

            {/* Neurotransmitter Molecules in Cleft */}
            <circle cx="415" cy="255" r="4" fill="#10b981" />
            <circle cx="445" cy="265" r="4" fill="#10b981" />
            <circle cx="485" cy="260" r="4" fill="#10b981" />
            <circle cx="510" cy="270" r="4" fill="#10b981" />

            {/* Postsynaptic Membrane */}
            <path
              d="M 300 310 C 400 330, 500 330, 600 310 L 600 420 L 300 420 Z"
              fill="#10b981"
              fillOpacity="0.1"
              stroke="#10b981"
              strokeWidth="3.5"
            />
            {/* Receptors embedded */}
            <rect x="380" y="308" width="18" height="12" rx="3" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.5" />
            <rect x="440" y="318" width="18" height="12" rx="3" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.5" />
            <rect x="500" y="312" width="18" height="12" rx="3" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.5" />
          </g>
        ),
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 2. CHEMISTRY
    // ─────────────────────────────────────────────────────────────
    if (normalizedSubject === "chemistry") {
      return {
        title: `Chemical & Molecular Architecture: ${topicTitle}`,
        subtitle: "Orbital Mechanics, Electron Probability Density & Reaction Energetics",
        viewBox: "0 0 900 520",
        annotations: [
          {
            id: "nucleus",
            label: "Dense Positively Charged Nucleus",
            formulaOrValue: "Z·e (Protons + Neutrons)",
            examNote: "NEB: Rutherford alpha-scattering confirmed nuclear radius ~10⁻¹⁵ m vs atomic radius ~10⁻¹⁰ m.",
            labelX: 130,
            labelY: 70,
            targetX: 450,
            targetY: 260,
            controlX: 270,
            controlY: 110,
            color: "#ef4444",
          },
          {
            id: "k_shell",
            label: "Principal Quantum Level n=1 (K Shell)",
            formulaOrValue: "2n² = 2 Electrons Max",
            examNote: "CEE: Most tightly bound electrons with maximum binding energy and lowest principal radius.",
            labelX: 770,
            labelY: 70,
            targetX: 510,
            targetY: 240,
            controlX: 670,
            controlY: 120,
            color: "#3b82f6",
          },
          {
            id: "valence",
            label: "Valence Shell Orbitals (n=2 / n=3)",
            formulaOrValue: "sp³ Hybridized / Octet",
            examNote: "NEB: Dictates chemical reactivity, ionization potential, and electronegativity gradient.",
            labelX: 130,
            labelY: 330,
            targetX: 300,
            targetY: 260,
            controlX: 200,
            controlY: 310,
            color: "#10b981",
          },
          {
            id: "transitions",
            label: "Electronic Transition & Emission",
            formulaOrValue: "ΔE = h·ν = h·c / λ",
            examNote: "CEE: Bohr frequency condition. Balmer series transitions fall in the visible spectrum.",
            labelX: 770,
            labelY: 340,
            targetX: 580,
            targetY: 200,
            controlX: 700,
            controlY: 270,
            color: "#f59e0b",
          },
          {
            id: "lattice",
            label: "Bonding Overlap & Wavefunction",
            formulaOrValue: "ψ_bonding = c₁ψ_A + c₂ψ_B",
            examNote: "CEE: Linear Combination of Atomic Orbitals (LCAO) generates bonding and antibonding states.",
            labelX: 140,
            labelY: 460,
            targetX: 450,
            targetY: 390,
            controlX: 260,
            controlY: 440,
            color: "#a855f7",
          },
        ] as DiagramAnnotation[],
        renderSvg: () => (
          <g>
            {/* Energy Level Shells */}
            <circle cx="450" cy="260" r="50" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5 3" opacity="0.6" />
            <circle cx="450" cy="260" r="100" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.7" />
            <circle cx="450" cy="260" r="155" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.5" />

            {/* Electron Probability Wave Clouds */}
            <ellipse cx="450" cy="260" rx="90" ry="35" fill="#3b82f6" fillOpacity="0.08" transform="rotate(30 450 260)" />
            <ellipse cx="450" cy="260" rx="90" ry="35" fill="#10b981" fillOpacity="0.08" transform="rotate(-30 450 260)" />

            {/* Central Nucleus with Positive Glow */}
            <circle cx="450" cy="260" r="22" fill="#ef4444" fillOpacity="0.3" />
            <circle cx="450" cy="260" r="14" fill="#dc2626" stroke="#f87171" strokeWidth="2.5" />
            <text x="450" y="264" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Z⁺</text>

            {/* Orbiting Electrons */}
            <circle cx="500" cy="260" r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="400" cy="260" r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="350" cy="260" r="6" fill="#34d399" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="550" cy="260" r="6" fill="#34d399" stroke="#ffffff" strokeWidth="1.5" />

            {/* Quantum Leap Arrow */}
            <path d="M 500 254 Q 540 210 580 200" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 3" />
          </g>
        ),
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 3. MATHEMATICS
    // ─────────────────────────────────────────────────────────────
    if (normalizedSubject === "mathematics") {
      return {
        title: `Analytical Mathematical Geometry: ${topicTitle}`,
        subtitle: "Vector Calculus, Coordinate Frames & Derivative Tangent Systems",
        viewBox: "0 0 900 520",
        annotations: [
          {
            id: "tangent",
            label: "Tangent Line at Point P(x₀, y₀)",
            formulaOrValue: "Slope m = f'(x₀) = dy/dx",
            examNote: "NEB: Geometric interpretation of the derivative. Represents instantaneous rate of change.",
            labelX: 130,
            labelY: 70,
            targetX: 430,
            targetY: 200,
            controlX: 250,
            controlY: 100,
            color: "#f59e0b",
          },
          {
            id: "curve",
            label: "Continuous Curve y = f(x)",
            formulaOrValue: "Domain: [a, b], C¹ Smooth",
            examNote: "CEE: Rolle's & Mean Value Theorem guarantee at least one c where f'(c) equals secant slope.",
            labelX: 770,
            labelY: 80,
            targetX: 560,
            targetY: 180,
            controlX: 680,
            controlY: 120,
            color: "#38bdf8",
          },
          {
            id: "secant",
            label: "Secant Line Approximating Limit",
            formulaOrValue: "m_sec = [f(x+h) - f(x)] / h",
            examNote: "NEB First Principle of Differentiation: Limit as h → 0 yields the derivative f'(x).",
            labelX: 130,
            labelY: 300,
            targetX: 370,
            targetY: 270,
            controlX: 230,
            controlY: 280,
            color: "#10b981",
          },
          {
            id: "integral",
            label: "Definite Integral Area under Curve",
            formulaOrValue: "A = ∫ₐᵇ f(x) dx = F(b) - F(a)",
            examNote: "CEE: Fundamental Theorem of Calculus connects integration as antiderivative to area evaluation.",
            labelX: 770,
            labelY: 350,
            targetX: 470,
            targetY: 310,
            controlX: 660,
            controlY: 350,
            color: "#a855f7",
          },
          {
            id: "axes",
            label: "Orthogonal Coordinate Axes",
            formulaOrValue: "Origin (0, 0), R² Plane",
            examNote: "NEB: Sign convention in four quadrants determines trigonometric and derivative signs.",
            labelX: 140,
            labelY: 450,
            targetX: 260,
            targetY: 380,
            controlX: 180,
            controlY: 430,
            color: "#94a3b8",
          },
        ] as DiagramAnnotation[],
        renderSvg: () => (
          <g>
            {/* Coordinate System */}
            <line x1="240" y1="380" x2="680" y2="380" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#arrow)" />
            <line x1="270" y1="410" x2="270" y2="100" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#arrow)" />
            <text x="685" y="385" fill="#94a3b8" fontSize="12" fontWeight="bold">x</text>
            <text x="270" y="88" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">y</text>

            {/* Shaded Integral Area */}
            <path
              d="M 350 380 L 350 290 Q 430 190 530 220 L 530 380 Z"
              fill="#a855f7"
              fillOpacity="0.12"
            />

            {/* Smooth Curve f(x) */}
            <path
              d="M 290 350 Q 370 290 430 200 T 630 190"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Tangent Line at x=430 */}
            <line x1="330" y1="290" x2="530" y2="110" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6 3" />
            <circle cx="430" cy="200" r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <text x="440" y="195" fill="#f59e0b" fontSize="11" fontWeight="bold">P(x₀, y₀)</text>

            {/* Secant Point */}
            <circle cx="510" cy="210" r="5" fill="#10b981" />
          </g>
        ),
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 4. PHYSICS (Default)
    // ─────────────────────────────────────────────────────────────
    return {
      title: `Physical Vector & Dynamical Field Schematic: ${topicTitle}`,
      subtitle: "Force Resolution, Free-Body Diagram & Kinematic Vector System",
      viewBox: "0 0 900 520",
      annotations: [
        {
          id: "normal",
          label: "Normal Contact Reaction (N)",
          formulaOrValue: "N = m·g·cos(θ)",
          examNote: "NEB: Perpendicular to incline surface. Zero normal reaction defines loss of contact.",
          labelX: 130,
          labelY: 70,
          targetX: 430,
          targetY: 180,
          controlX: 250,
          controlY: 90,
          color: "#38bdf8",
        },
        {
          id: "driving",
          label: "Applied Force / Velocity Vector (v)",
          formulaOrValue: "v = u + a·t | F = m·a",
          examNote: "CEE: Instantaneous velocity tangent to trajectory; acceleration directs along net force.",
          labelX: 770,
          labelY: 70,
          targetX: 560,
          targetY: 190,
          controlX: 680,
          controlY: 110,
          color: "#10b981",
        },
        {
          id: "gravity",
          label: "Gravitational Weight Vector (W)",
          formulaOrValue: "W = m·g (Acting Downward)",
          examNote: "NEB: Resolves into mg·sin(θ) along incline and mg·cos(θ) perpendicular to incline.",
          labelX: 130,
          labelY: 340,
          targetX: 450,
          targetY: 330,
          controlX: 240,
          controlY: 340,
          color: "#ef4444",
        },
        {
          id: "friction",
          label: "Opposing Frictional Force (f_s)",
          formulaOrValue: "f_max = μ_s · N",
          examNote: "CEE: Static friction self-adjusts up to limiting value. Angle of repose: tan(θ) = μ_s.",
          labelX: 770,
          labelY: 340,
          targetX: 360,
          targetY: 260,
          controlX: 650,
          controlY: 350,
          color: "#f59e0b",
        },
        {
          id: "incline",
          label: "Inclined Plane Surface",
          formulaOrValue: "Inclination Angle θ",
          examNote: "NEB: Acceleration down a smooth incline: a = g·sin(θ); on rough incline: a = g(sin θ - μ cos θ).",
          labelX: 140,
          labelY: 460,
          targetX: 280,
          targetY: 350,
          controlX: 200,
          controlY: 420,
          color: "#a855f7",
        },
      ] as DiagramAnnotation[],
      renderSvg: () => (
        <g>
          {/* Inclined Plane Triangle */}
          <polygon
            points="240,360 660,360 660,180"
            fill="#64748b"
            fillOpacity="0.08"
            stroke="#64748b"
            strokeWidth="3"
          />
          {/* Angle theta arc */}
          <path d="M 280 360 A 40 40 0 0 0 274 346" fill="none" stroke="#fbbf24" strokeWidth="2" />
          <text x="290" y="352" fill="#fbbf24" fontSize="11" fontWeight="bold">θ</text>

          {/* Mass Block on Incline */}
          <g transform="translate(430, 240) rotate(-23)">
            <rect x="-35" y="-25" width="70" height="50" rx="6" fill="#3b82f6" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="3" />
            <text x="0" y="5" fill="#ffffff" textAnchor="middle" fontSize="12" fontWeight="bold">Mass m</text>
          </g>

          {/* Normal Force Arrow (perpendicular to incline) */}
          <line x1="430" y1="240" x2="400" y2="170" stroke="#38bdf8" strokeWidth="3.5" markerEnd="url(#arrow-cyan)" />

          {/* Driving / Tangent Arrow */}
          <line x1="430" y1="240" x2="540" y2="190" stroke="#10b981" strokeWidth="3.5" markerEnd="url(#arrow-emerald)" />

          {/* Gravity Arrow (straight down) */}
          <line x1="430" y1="240" x2="430" y2="330" stroke="#ef4444" strokeWidth="3.5" markerEnd="url(#arrow-red)" />

          {/* Friction Arrow (up the incline) */}
          <line x1="430" y1="240" x2="350" y2="275" stroke="#f59e0b" strokeWidth="3.5" markerEnd="url(#arrow-amber)" />
        </g>
      ),
    };
  }, [normalizedSubject, topicSlug, topicTitle]);

  return (
    <div className={`rounded-3xl border border-border/80 bg-card shadow-sm overflow-hidden ${className}`}>
      {/* Header bar */}
      <div className="px-6 py-4 border-b border-border/60 bg-muted/20 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              High-Resolution Schematic
            </span>
            <h3 className="text-sm md:text-base font-bold text-foreground">
              {diagramData.title}
            </h3>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{diagramData.subtitle}</p>
        </div>

        {/* Action Toggles */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setShowFormulas(!showFormulas)}
            className={`px-2.5 py-1 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 ${
              showFormulas
                ? "bg-primary/15 border-primary/30 text-primary"
                : "bg-background border-border text-muted-foreground"
            }`}
          >
            <span>Formulas</span>
          </button>
          <button
            onClick={() => setShowExamNotes(!showExamNotes)}
            className={`px-2.5 py-1 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 ${
              showExamNotes
                ? "bg-amber-500/15 border-amber-500/30 text-amber-500"
                : "bg-background border-border text-muted-foreground"
            }`}
          >
            <span>CEE Traps</span>
          </button>
        </div>
      </div>

      {/* Main SVG Canvas Area with LONG LEADER LINES */}
      <div className="relative w-full aspect-[16/9] min-h-[420px] max-h-[580px] bg-background/60 p-2 select-none overflow-hidden">
        <svg
          viewBox={diagramData.viewBox}
          className="w-full h-full"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Arrowhead Markers */}
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 Z" fill="#64748b" />
            </marker>
            <marker id="arrow-cyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 Z" fill="#38bdf8" />
            </marker>
            <marker id="arrow-emerald" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 Z" fill="#10b981" />
            </marker>
            <marker id="arrow-red" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 Z" fill="#ef4444" />
            </marker>
            <marker id="arrow-amber" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 Z" fill="#f59e0b" />
            </marker>
          </defs>

          {/* 1. Base Physical / Chemical / Biological Geometry */}
          {diagramData.renderSvg()}

          {/* 2. LONG SVG LEADER LINES */}
          {diagramData.annotations.map((ann) => {
            const isHovered = activeAnnotationId === ann.id;
            const cColor = ann.color || "#38bdf8";

            // Default control point for long curve if not specified
            const cx = ann.controlX ?? (ann.labelX + ann.targetX) / 2;
            const cy = ann.controlY ?? Math.min(ann.labelY, ann.targetY) - 30;

            const pathD = `M ${ann.labelX} ${ann.labelY} Q ${cx} ${cy} ${ann.targetX} ${ann.targetY}`;

            return (
              <g
                key={ann.id}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setActiveAnnotationId(ann.id)}
                onMouseLeave={() => setActiveAnnotationId(null)}
              >
                {/* Glow underlay when active */}
                {isHovered && (
                  <path
                    d={pathD}
                    fill="none"
                    stroke={cColor}
                    strokeWidth="7"
                    strokeOpacity="0.25"
                    strokeLinecap="round"
                  />
                )}

                {/* Long curved SVG leader line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={cColor}
                  strokeWidth={isHovered ? "3.2" : "2"}
                  strokeOpacity={isHovered ? 1 : 0.85}
                  strokeLinecap="round"
                />

                {/* Pinpoint Target Dot at Feature */}
                <circle
                  cx={ann.targetX}
                  cy={ann.targetY}
                  r={isHovered ? "6" : "4.5"}
                  fill={cColor}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}
        </svg>

        {/* 3. HTML OVERLAY LABELS AT LONG ANCHORS (Avoids geometry overlap) */}
        {diagramData.annotations.map((ann) => {
          const isHovered = activeAnnotationId === ann.id;
          const cColor = ann.color || "#38bdf8";

          // Calculate percentage coordinates relative to 900x520 viewBox
          const leftPct = (ann.labelX / 900) * 100;
          const topPct = (ann.labelY / 520) * 100;

          const isRightSide = ann.labelX > 500;

          return (
            <div
              key={ann.id}
              style={{
                left: `${leftPct}%`,
                top: `${topPct}%`,
                transform: isRightSide ? "translate(-10%, -50%)" : "translate(-90%, -50%)",
              }}
              onMouseEnter={() => setActiveAnnotationId(ann.id)}
              onMouseLeave={() => setActiveAnnotationId(null)}
              className={`absolute z-20 max-w-[210px] md:max-w-[260px] p-2.5 rounded-2xl border backdrop-blur-md transition-all duration-200 cursor-pointer shadow-sm ${
                isHovered
                  ? "bg-card border-primary ring-2 ring-primary/40 shadow-lg scale-105"
                  : "bg-card/90 border-border/80 hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: cColor }}
                />
                <h4 className="text-xs font-bold text-foreground leading-tight">{ann.label}</h4>
              </div>

              {showFormulas && ann.formulaOrValue && (
                <div className="mt-1 font-mono text-[10px] text-primary font-semibold px-1.5 py-0.5 rounded bg-primary/10 truncate">
                  {ann.formulaOrValue}
                </div>
              )}

              {showExamNotes && ann.examNote && (
                <p className="mt-1 text-[10px] text-muted-foreground leading-relaxed line-clamp-2">
                  {ann.examNote}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom active detail bar */}
      <div className="px-6 py-3 border-t border-border/60 bg-muted/10 flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5 text-primary" />
          <span>Hover any label or long leader line to highlight the exact target feature.</span>
        </span>
        <span className="text-[11px] font-semibold text-primary">
          NEB &amp; CEE Verified
        </span>
      </div>
    </div>
  );
}
