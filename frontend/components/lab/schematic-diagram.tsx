"use client";

import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Info,
  Layers,
  HelpCircle,
  Eye,
  EyeOff,
  GraduationCap,
  Play,
  RotateCcw,
  Sliders,
  Zap,
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

  // Interactive controls state
  const [projectileAngle, setProjectileAngle] = useState<number>(45); // 30, 45, 60
  const [ydseWavelength, setYdseWavelength] = useState<"red" | "blue">("red");
  const [galvanicConnected, setGalvanicConnected] = useState<boolean>(true);
  const [tangentPos, setTangentPos] = useState<number>(430); // 350 to 510

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
    const u = (unitId || "").toLowerCase();

    // ─────────────────────────────────────────────────────────────
    // 1. BIOLOGY
    // ─────────────────────────────────────────────────────────────
    if (normalizedSubject === "biology") {
      // 1A. Nephron & Excretory Physiology
      if (t.includes("nephron") || t.includes("kidney") || t.includes("excret") || title.includes("nephron")) {
        return {
          title: `Nephron Ultrastructure & Filtration Schematic: ${topicTitle}`,
          subtitle: "Malpighian Body, Glomerular Ultrafiltration (NFP = 10 mmHg) & Countercurrent Multiplier",
          viewBox: "0 0 900 520",
          annotations: [
            {
              id: "glomerulus",
              label: "Glomerulus & Bowman's Capsule",
              formulaOrValue: "NFP = GHP - (BCOP + CHP) = 10 mmHg",
              examNote: "CEE: Afferent arteriole is wider than efferent arteriole, creating high hydrostatic pressure for ultrafiltration.",
              labelX: 130,
              labelY: 70,
              targetX: 380,
              targetY: 150,
              controlX: 250,
              controlY: 90,
              color: "#ef4444",
            },
            {
              id: "pct",
              label: "Proximal Convoluted Tubule (PCT)",
              formulaOrValue: "70–80% Electrolyte & H₂O Reabsorption",
              examNote: "CEE: 100% of glucose and amino acids reabsorbed here via Na⁺-cotransporters with brush border microvilli.",
              labelX: 770,
              labelY: 70,
              targetX: 470,
              targetY: 160,
              controlX: 680,
              controlY: 100,
              color: "#38bdf8",
            },
            {
              id: "loop_desc",
              label: "Descending Limb of Loop of Henle",
              formulaOrValue: "Permeable to H₂O, Impermeable to NaCl",
              examNote: "NEB: Medullary osmolarity increases progressively from 300 to 1200 mOsm/L towards the hairpin turn.",
              labelX: 130,
              labelY: 310,
              targetX: 410,
              targetY: 340,
              controlX: 240,
              controlY: 320,
              color: "#10b981",
            },
            {
              id: "loop_asc",
              label: "Ascending Limb of Loop of Henle",
              formulaOrValue: "Active NaCl Pump (Impermeable to H₂O)",
              examNote: "CEE: Dilutes tubular fluid while concentrating renal medulla (Countercurrent Multiplier).",
              labelX: 770,
              labelY: 310,
              targetX: 460,
              targetY: 320,
              controlX: 670,
              controlY: 320,
              color: "#f59e0b",
            },
            {
              id: "duct",
              label: "Distal Tubule & Collecting Duct",
              formulaOrValue: "Facultative H₂O Reabsorption (ADH / Vasopressin)",
              examNote: "CEE TRAP: Aldosterone increases Na⁺ reabsorption and K⁺ excretion; ADH inserts aquaporin-2 channels.",
              labelX: 770,
              labelY: 460,
              targetX: 520,
              targetY: 400,
              controlX: 690,
              controlY: 440,
              color: "#a855f7",
            },
          ] as DiagramAnnotation[],
          renderSvg: () => (
            <g>
              {/* Bowman's Capsule Cup */}
              <path
                d="M 350 120 C 330 150, 330 180, 360 200 C 390 220, 410 190, 410 160 C 410 130, 380 110, 350 120"
                fill="#fca5a5"
                fillOpacity="0.2"
                stroke="#ef4444"
                strokeWidth="3"
              />
              {/* Glomerulus Capillary Tuft inside */}
              <circle cx="375" cy="155" r="22" fill="#ef4444" fillOpacity="0.4" stroke="#dc2626" strokeWidth="2.5" />
              <path d="M 365 145 Q 380 160 375 170 T 390 155" fill="none" stroke="#fee2e2" strokeWidth="2.5" />
              {/* Afferent & Efferent vessels */}
              <line x1="320" y1="135" x2="355" y2="148" stroke="#dc2626" strokeWidth="5" markerEnd="url(#arrow-red)" />
              <line x1="365" y1="165" x2="330" y2="185" stroke="#ef4444" strokeWidth="3" />

              {/* PCT Convolutions */}
              <path
                d="M 400 185 C 440 140, 470 210, 480 170 C 490 140, 450 120, 430 160"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="5"
                strokeLinecap="round"
              />

              {/* Loop of Henle descending & ascending hairpin */}
              <path
                d="M 430 160 L 415 380 C 415 420, 455 420, 455 380 L 470 230"
                fill="none"
                stroke="#10b981"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Osmotic Gradient Flow arrows */}
              <path d="M 405 280 L 385 280" stroke="#34d399" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#arrow-emerald)" />
              <text x="360" y="284" fill="#34d399" fontSize="10" fontWeight="bold">H₂O</text>
              <path d="M 465 310 L 490 310" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#arrow-amber)" />
              <text x="495" y="314" fill="#fbbf24" fontSize="10" fontWeight="bold">NaCl</text>

              {/* Collecting Duct Vertical Trunk */}
              <line x1="515" y1="180" x2="515" y2="440" stroke="#a855f7" strokeWidth="6" strokeLinecap="round" />
              <path d="M 470 230 C 490 210, 500 240, 515 230" fill="none" stroke="#f59e0b" strokeWidth="4" />
              <text x="525" y="435" fill="#c084fc" fontSize="11" fontWeight="bold">Urine to Bladder</text>
            </g>
          ),
        };
      }

      // 1B. Cell Ultrastructure
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
              <ellipse cx="450" cy="270" rx="250" ry="170" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="6 3" opacity="0.8" />
              <ellipse cx="450" cy="270" rx="242" ry="162" fill="#10b981" fillOpacity="0.04" />
              <ellipse cx="410" cy="240" rx="70" ry="60" fill="#0284c7" fillOpacity="0.18" stroke="#38bdf8" strokeWidth="3" />
              <ellipse cx="425" cy="230" rx="24" ry="20" fill="#38bdf8" fillOpacity="0.4" />
              <g transform="translate(560, 205) rotate(25)">
                <ellipse cx="0" cy="0" rx="42" ry="22" fill="#d97706" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="2.5" />
                <path d="M -30 0 Q -20 -12 -10 0 T 10 0 T 30 0" fill="none" stroke="#fbbf24" strokeWidth="2" />
              </g>
              <path d="M 330 210 Q 300 240 320 280 T 340 310" fill="none" stroke="#a855f7" strokeWidth="3" />
              <circle cx="315" cy="235" r="3" fill="#c084fc" />
              <circle cx="310" cy="265" r="3" fill="#c084fc" />
              <circle cx="330" cy="295" r="3" fill="#c084fc" />
              <path d="M 520 300 Q 560 305 570 330" fill="none" stroke="#ec4899" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 515 315 Q 555 320 565 345" fill="none" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
              <circle cx="585" cy="335" r="5" fill="#f472b6" />
            </g>
          ),
        };
      }

      // 1C. Default Biology: Neuron Synapse
      return {
        title: `Physiological Synaptic Transmission: ${topicTitle}`,
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
            <path
              d="M 330 60 L 330 140 C 330 230, 570 230, 570 140 L 570 60"
              fill="#0284c7"
              fillOpacity="0.12"
              stroke="#38bdf8"
              strokeWidth="3.5"
            />
            <circle cx="390" cy="170" r="12" fill="#ec4899" fillOpacity="0.7" stroke="#f472b6" strokeWidth="2" />
            <circle cx="430" cy="185" r="10" fill="#ec4899" fillOpacity="0.7" stroke="#f472b6" strokeWidth="2" />
            <circle cx="480" cy="175" r="11" fill="#ec4899" fillOpacity="0.7" stroke="#f472b6" strokeWidth="2" />
            <circle cx="520" cy="160" r="12" fill="#ec4899" fillOpacity="0.7" stroke="#f472b6" strokeWidth="2" />
            <circle cx="415" cy="255" r="4" fill="#10b981" />
            <circle cx="445" cy="265" r="4" fill="#10b981" />
            <circle cx="485" cy="260" r="4" fill="#10b981" />
            <circle cx="510" cy="270" r="4" fill="#10b981" />
            <path
              d="M 300 310 C 400 330, 500 330, 600 310 L 600 420 L 300 420 Z"
              fill="#10b981"
              fillOpacity="0.1"
              stroke="#10b981"
              strokeWidth="3.5"
            />
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
      // 2A. Electrochemical Galvanic / Daniell Cell
      if (t.includes("electro") || t.includes("cell") || t.includes("daniell") || t.includes("redox") || title.includes("cell")) {
        return {
          title: `Electrochemical Daniell Galvanic Cell Schematic: ${topicTitle}`,
          subtitle: "Zn Anode (-), Cu Cathode (+), Salt Bridge & Standard EMF E° = +1.10 V",
          viewBox: "0 0 900 520",
          annotations: [
            {
              id: "anode",
              label: "Zinc Anode (Oxidation)",
              formulaOrValue: "Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76 V)",
              examNote: "CEE: Anode is negatively charged in galvanic cell. Zinc rod loses mass as Zn dissolves into ZnSO₄.",
              labelX: 130,
              labelY: 80,
              targetX: 350,
              targetY: 260,
              controlX: 230,
              controlY: 110,
              color: "#ef4444",
            },
            {
              id: "cathode",
              label: "Copper Cathode (Reduction)",
              formulaOrValue: "Cu²⁺(aq) + 2e⁻ → Cu(s) (E° = +0.34 V)",
              examNote: "NEB: Cathode is positively charged. Cu²⁺ ions deposit onto the copper rod, increasing its thickness.",
              labelX: 770,
              labelY: 80,
              targetX: 550,
              targetY: 260,
              controlX: 680,
              controlY: 110,
              color: "#38bdf8",
            },
            {
              id: "bridge",
              label: "Salt Bridge (KCl / KNO₃ in Agar)",
              formulaOrValue: "Maintains Electrical Neutrality",
              examNote: "CEE: Prevents accumulation of positive charge at anode and negative charge at cathode; eliminates liquid junction potential.",
              labelX: 450,
              labelY: 60,
              targetX: 450,
              targetY: 230,
              controlX: 450,
              controlY: 130,
              color: "#a855f7",
            },
            {
              id: "voltmeter",
              label: "External Circuit & EMF Display",
              formulaOrValue: "E°_cell = E°_cathode - E°_anode = +1.10 V",
              examNote: "CEE TRAP: Electrons flow from Zn (anode) to Cu (cathode); conventional current flows from Cu to Zn!",
              labelX: 130,
              labelY: 440,
              targetX: 450,
              targetY: 120,
              controlX: 250,
              controlY: 360,
              color: "#f59e0b",
            },
            {
              id: "electrolyte",
              label: "Electrolyte Solutions (1.0 M)",
              formulaOrValue: "1M ZnSO₄(aq) || 1M CuSO₄(aq)",
              examNote: "NEB: Standard state condition requires 1.0 M concentration at 298 K (25°C) and 1 atm pressure.",
              labelX: 770,
              labelY: 440,
              targetX: 570,
              targetY: 360,
              controlX: 680,
              controlY: 420,
              color: "#10b981",
            },
          ] as DiagramAnnotation[],
          renderSvg: () => (
            <g>
              {/* Left Beaker (ZnSO4) */}
              <rect x="280" y="220" width="140" height="170" rx="8" fill="#38bdf8" fillOpacity="0.08" stroke="#64748b" strokeWidth="3" />
              <rect x="284" y="260" width="132" height="126" rx="4" fill="#38bdf8" fillOpacity="0.2" />
              <text x="350" y="375" fill="#38bdf8" textAnchor="middle" fontSize="11" fontWeight="bold">1M ZnSO₄</text>

              {/* Right Beaker (CuSO4) */}
              <rect x="480" y="220" width="140" height="170" rx="8" fill="#0284c7" fillOpacity="0.12" stroke="#64748b" strokeWidth="3" />
              <rect x="484" y="260" width="132" height="126" rx="4" fill="#0284c7" fillOpacity="0.3" />
              <text x="550" y="375" fill="#7dd3fc" textAnchor="middle" fontSize="11" fontWeight="bold">1M CuSO₄</text>

              {/* Zinc Electrode (Grey) */}
              <rect x="335" y="170" width="30" height="140" rx="3" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="2.5" />
              <text x="350" y="205" fill="#0f172a" textAnchor="middle" fontSize="11" fontWeight="bold">Zn (-)</text>

              {/* Copper Electrode (Red-Brown) */}
              <rect x="535" y="170" width="30" height="140" rx="3" fill="#d97706" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="550" y="205" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold">Cu (+)</text>

              {/* Inverted U-tube Salt Bridge */}
              <path
                d="M 390 280 L 390 200 C 390 170, 510 170, 510 200 L 510 280"
                fill="none"
                stroke="#a855f7"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0.8"
              />
              <path
                d="M 390 280 L 390 200 C 390 170, 510 170, 510 200 L 510 280"
                fill="none"
                stroke="#d8b4fe"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* External Wire & Voltmeter */}
              <path d="M 350 170 L 350 120 L 415 120" fill="none" stroke="#f59e0b" strokeWidth="3" />
              <path d="M 485 120 L 550 120 L 550 170" fill="none" stroke="#f59e0b" strokeWidth="3" />
              {/* Voltmeter Dial */}
              <circle cx="450" cy="120" r="24" fill="#0f172a" stroke="#f59e0b" strokeWidth="3" />
              <text x="450" y="125" fill="#fbbf24" textAnchor="middle" fontSize="12" fontWeight="bold">
                {galvanicConnected ? "1.10V" : "0.00V"}
              </text>

              {/* Animated Electron Flow Arrow */}
              {galvanicConnected && (
                <g>
                  <line x1="370" y1="110" x2="420" y2="110" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-cyan)" />
                  <text x="395" y="103" fill="#38bdf8" textAnchor="middle" fontSize="10" fontWeight="bold">2e⁻ flow →</text>
                </g>
              )}
            </g>
          ),
        };
      }

      // 2B. Default Chemistry: Bohr Atom & Quantum Shells
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
            <circle cx="450" cy="260" r="50" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5 3" opacity="0.6" />
            <circle cx="450" cy="260" r="100" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.7" />
            <circle cx="450" cy="260" r="155" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.5" />
            <circle cx="450" cy="260" r="22" fill="#ef4444" fillOpacity="0.3" />
            <circle cx="450" cy="260" r="14" fill="#dc2626" stroke="#f87171" strokeWidth="2.5" />
            <text x="450" y="264" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Z⁺</text>
            <circle cx="500" cy="260" r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="400" cy="260" r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="350" cy="260" r="6" fill="#34d399" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="550" cy="260" r="6" fill="#34d399" stroke="#ffffff" strokeWidth="1.5" />
            <path d="M 500 254 Q 540 210 580 200" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 3" />
          </g>
        ),
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 3. MATHEMATICS
    // ─────────────────────────────────────────────────────────────
    if (normalizedSubject === "mathematics") {
      // 3A. Conic Section: Parabola & Focus-Directrix
      if (t.includes("parabola") || t.includes("conic") || t.includes("ellipse") || title.includes("parabola")) {
        return {
          title: `Analytical Conic Geometry (Parabola y² = 4ax): ${topicTitle}`,
          subtitle: "Focus S(a, 0), Directrix x = -a, Latus Rectum = 4a & SP = PM Geometric Invariant",
          viewBox: "0 0 900 520",
          annotations: [
            {
              id: "focus",
              label: "Focus S(a, 0)",
              formulaOrValue: "Coordinates: (a, 0)",
              examNote: "NEB: All rays parallel to the axis of symmetry reflect precisely through the focus.",
              labelX: 770,
              labelY: 80,
              targetX: 520,
              targetY: 260,
              controlX: 680,
              controlY: 120,
              color: "#f59e0b",
            },
            {
              id: "directrix",
              label: "Directrix Line",
              formulaOrValue: "Equation: x = -a",
              examNote: "CEE: Ratio of distance from focus to distance from directrix is the eccentricity: e = SP / PM = 1.0.",
              labelX: 130,
              labelY: 80,
              targetX: 320,
              targetY: 160,
              controlX: 230,
              controlY: 100,
              color: "#ef4444",
            },
            {
              id: "vertex",
              label: "Vertex V(0, 0)",
              formulaOrValue: "Midpoint of Focus & Directrix Foot",
              examNote: "NEB: Tangent at vertex is the y-axis (x = 0).",
              labelX: 130,
              labelY: 310,
              targetX: 420,
              targetY: 260,
              controlX: 240,
              controlY: 300,
              color: "#38bdf8",
            },
            {
              id: "latus",
              label: "Latus Rectum Chord",
              formulaOrValue: "Length = 4a (Ends: (a, 2a) and (a, -2a))",
              examNote: "CEE: Focal chord perpendicular to major axis; focal distance of any point P(x, y) is x + a.",
              labelX: 770,
              labelY: 350,
              targetX: 520,
              targetY: 180,
              controlX: 680,
              controlY: 300,
              color: "#a855f7",
            },
          ] as DiagramAnnotation[],
          renderSvg: () => (
            <g>
              {/* Axes */}
              <line x1="260" y1="260" x2="680" y2="260" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#arrow)" />
              <line x1="420" y1="440" x2="420" y2="80" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#arrow)" />
              <text x="685" y="265" fill="#94a3b8" fontSize="12" fontWeight="bold">x</text>
              <text x="420" y="70" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">y</text>

              {/* Directrix x = -a (x=320) */}
              <line x1="320" y1="90" x2="320" y2="430" stroke="#ef4444" strokeWidth="3" strokeDasharray="6 3" />
              <text x="310" y="105" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="end">Directrix x = -a</text>

              {/* Parabola Curve y^2 = 4ax opening to the right from vertex (420, 260) */}
              <path
                d="M 640 100 Q 420 180 420 260 Q 420 340 640 420"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Focus S(a, 0) at (520, 260) */}
              <circle cx="520" cy="260" r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
              <text x="525" y="280" fill="#f59e0b" fontSize="11" fontWeight="bold">S(a, 0)</text>

              {/* Latus Rectum Chord through Focus */}
              <line x1="520" y1="160" x2="520" y2="360" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="4 4" />
              <circle cx="520" cy="160" r="5" fill="#c084fc" />
              <circle cx="520" cy="360" r="5" fill="#c084fc" />

              {/* Point P on parabola with SP = PM leader */}
              <circle cx="570" cy="140" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
              <text x="580" y="135" fill="#10b981" fontSize="11" fontWeight="bold">P(x, y)</text>
              <line x1="520" y1="260" x2="570" y2="140" stroke="#10b981" strokeWidth="2" />
              <line x1="570" y1="140" x2="320" y2="140" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
            </g>
          ),
        };
      }

      // 3B. Calculus: Tangent Slope & Integral Area
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
            targetX: tangentPos,
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
            <line x1="240" y1="380" x2="680" y2="380" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#arrow)" />
            <line x1="270" y1="410" x2="270" y2="100" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#arrow)" />
            <text x="685" y="385" fill="#94a3b8" fontSize="12" fontWeight="bold">x</text>
            <text x="270" y="88" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">y</text>
            <path d="M 350 380 L 350 290 Q 430 190 530 220 L 530 380 Z" fill="#a855f7" fillOpacity="0.12" />
            <path d="M 290 350 Q 370 290 430 200 T 630 190" fill="none" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
            {/* Dynamic Tangent line based on tangentPos */}
            <line
              x1={tangentPos - 100}
              y1={200 + (tangentPos - 430) * 0.4 + 90}
              x2={tangentPos + 100}
              y2={200 + (tangentPos - 430) * 0.4 - 90}
              stroke="#f59e0b"
              strokeWidth="2.5"
              strokeDasharray="6 3"
            />
            <circle cx={tangentPos} cy={200} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <text x={tangentPos + 10} y="195" fill="#f59e0b" fontSize="11" fontWeight="bold">P(x₀, y₀)</text>
          </g>
        ),
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 4. PHYSICS
    // ─────────────────────────────────────────────────────────────

    // 4A. Projectile Motion
    if (t.includes("projectile") || t.includes("kinematic") || title.includes("projectile")) {
      // Compute range and height based on angle
      const rad = (projectileAngle * Math.PI) / 180;
      const rScale = Math.sin(2 * rad); // max 1 at 45 deg
      const hScale = Math.sin(rad) * Math.sin(rad); // max 0.75 at 60 deg

      const startX = 280;
      const startY = 380;
      const apexX = startX + 180 * rScale;
      const apexY = startY - 180 * hScale;
      const endX = startX + 360 * rScale;

      return {
        title: `Kinematics & Two-Dimensional Projectile Motion: ${topicTitle}`,
        subtitle: `Launch Angle θ = ${projectileAngle}° | Parabolic Trajectory, Velocity Vector Components & Range`,
        viewBox: "0 0 900 520",
        annotations: [
          {
            id: "launch",
            label: `Launch Velocity u (θ = ${projectileAngle}°)`,
            formulaOrValue: "u_x = u·cos(θ), u_y = u·sin(θ)",
            examNote: "CEE: Horizontal velocity u_x remains constant throughout flight; vertical velocity changes by g·t.",
            labelX: 130,
            labelY: 70,
            targetX: startX + 30,
            targetY: startY - 40,
            controlX: 200,
            controlY: 90,
            color: "#10b981",
          },
          {
            id: "apex",
            label: "Apex / Maximum Height H",
            formulaOrValue: "H = (u²·sin²θ) / (2g)",
            examNote: "NEB: At highest point, vertical velocity v_y = 0, but v_x = u·cos(θ) ≠ 0! Velocity and acceleration are strictly perpendicular.",
            labelX: 450,
            labelY: 60,
            targetX: apexX,
            targetY: apexY,
            controlX: 450,
            controlY: 110,
            color: "#38bdf8",
          },
          {
            id: "range",
            label: "Horizontal Range R",
            formulaOrValue: "R = (u²·sin 2θ) / g",
            examNote: "CEE TRAP: Maximum range occurs at θ = 45°. Complementary angles (θ and 90°-θ) produce identical horizontal ranges!",
            labelX: 770,
            labelY: 70,
            targetX: endX,
            targetY: startY,
            controlX: 740,
            controlY: 150,
            color: "#f59e0b",
          },
          {
            id: "gravity",
            label: "Gravitational Acceleration (g)",
            formulaOrValue: "a_y = -g = -9.8 m/s² (Constant)",
            examNote: "NEB: The only force acting on the projectile in flight (ignoring air resistance) is downward gravity.",
            labelX: 130,
            labelY: 380,
            targetX: apexX + 30,
            targetY: apexY + 40,
            controlX: 240,
            controlY: 380,
            color: "#ef4444",
          },
        ] as DiagramAnnotation[],
        renderSvg: () => (
          <g>
            {/* Ground Line */}
            <line x1="240" y1={startY} x2="720" y2={startY} stroke="#64748b" strokeWidth="3" />

            {/* Parabolic Trajectory */}
            <path
              d={`M ${startX} ${startY} Q ${apexX} ${apexY - 30} ${endX} ${startY}`}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Launch velocity vector arrow */}
            <line
              x1={startX}
              y1={startY}
              x2={startX + 60 * Math.cos(rad)}
              y2={startY - 60 * Math.sin(rad)}
              stroke="#10b981"
              strokeWidth="3.5"
              markerEnd="url(#arrow-emerald)"
            />

            {/* Apex Velocity vector (purely horizontal) */}
            <line
              x1={apexX}
              y1={apexY}
              x2={apexX + 50}
              y2={apexY}
              stroke="#10b981"
              strokeWidth="3"
              markerEnd="url(#arrow-emerald)"
            />
            <circle cx={apexX} cy={apexY} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />

            {/* Gravity vector at apex */}
            <line
              x1={apexX + 30}
              y1={apexY + 10}
              x2={apexX + 30}
              y2={apexY + 60}
              stroke="#ef4444"
              strokeWidth="3"
              markerEnd="url(#arrow-red)"
            />

            {/* Range dimension line */}
            <line x1={startX} y1={startY + 20} x2={endX} y2={startY + 20} stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 4" />
            <text x={(startX + endX) / 2} y={startY + 38} fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
              Range R ({projectileAngle === 45 ? "MAXIMUM" : "Sub-optimal"})
            </text>
          </g>
        ),
      };
    }

    // 4B. Wave Optics / Young's Double Slit Experiment
    if (t.includes("wave") || t.includes("optics") || t.includes("slit") || t.includes("interference")) {
      const beamColor = ydseWavelength === "red" ? "#ef4444" : "#38bdf8";
      const fringeWidthText = ydseWavelength === "red" ? "Wider Fringes (λ_red ~ 700 nm)" : "Narrower Fringes (λ_blue ~ 450 nm)";

      return {
        title: `Wave Optics & Young's Double Slit Interference: ${topicTitle}`,
        subtitle: `Coherent Wavefront Division | ${fringeWidthText} | Fringe Width β = λ·D / d`,
        viewBox: "0 0 900 520",
        annotations: [
          {
            id: "slits",
            label: "Coherent Double Slits (S₁, S₂)",
            formulaOrValue: "Slit Separation: d",
            examNote: "CEE: Division of wavefront produces mutually coherent sources with constant phase difference.",
            labelX: 130,
            labelY: 70,
            targetX: 370,
            targetY: 230,
            controlX: 230,
            controlY: 100,
            color: "#38bdf8",
          },
          {
            id: "central",
            label: "Central Bright Fringe (Zero Order)",
            formulaOrValue: "Path Difference Δx = 0",
            examNote: "NEB: Central fringe is ALWAYS bright and achromatic (white if white light is used).",
            labelX: 770,
            labelY: 70,
            targetX: 620,
            targetY: 260,
            controlX: 700,
            controlY: 120,
            color: "#10b981",
          },
          {
            id: "fringe",
            label: "Fringe Width (β)",
            formulaOrValue: "β = λ·D / d",
            examNote: "CEE: Fringe width is directly proportional to wavelength (β_red > β_violet) and inversely proportional to slit separation d.",
            labelX: 770,
            labelY: 340,
            targetX: 620,
            targetY: 200,
            controlX: 700,
            controlY: 280,
            color: "#f59e0b",
          },
          {
            id: "screen",
            label: "Observation Screen",
            formulaOrValue: "Distance from Slits: D",
            examNote: "NEB: If entire apparatus is immersed in water (μ = 4/3), fringe width decreases by factor of μ: β' = β / μ.",
            labelX: 130,
            labelY: 440,
            targetX: 620,
            targetY: 410,
            controlX: 250,
            controlY: 420,
            color: "#a855f7",
          },
        ] as DiagramAnnotation[],
        renderSvg: () => (
          <g>
            {/* Slit Barrier */}
            <line x1="370" y1="120" x2="370" y2="220" stroke="#64748b" strokeWidth="6" />
            <line x1="370" y1="240" x2="370" y2="280" stroke="#64748b" strokeWidth="6" />
            <line x1="370" y1="300" x2="370" y2="400" stroke="#64748b" strokeWidth="6" />
            {/* Slit points */}
            <circle cx="370" cy="230" r="4" fill={beamColor} />
            <circle cx="370" cy="290" r="4" fill={beamColor} />
            <text x="350" y="235" fill="#94a3b8" fontSize="10" fontWeight="bold">S₁</text>
            <text x="350" y="295" fill="#94a3b8" fontSize="10" fontWeight="bold">S₂</text>

            {/* Screen */}
            <line x1="620" y1="100" x2="620" y2="420" stroke="#cbd5e1" strokeWidth="4" />

            {/* Ray lines to screen */}
            <line x1="370" y1="230" x2="620" y2="260" stroke={beamColor} strokeWidth="2" strokeDasharray="5 3" />
            <line x1="370" y1="290" x2="620" y2="260" stroke={beamColor} strokeWidth="2" strokeDasharray="5 3" />
            <line x1="370" y1="230" x2="620" y2="190" stroke={beamColor} strokeWidth="2" opacity="0.6" />
            <line x1="370" y1="290" x2="620" y2="190" stroke={beamColor} strokeWidth="2" opacity="0.6" />

            {/* Interference Pattern on Screen */}
            <rect x="622" y="250" width="16" height="20" fill={beamColor} opacity="0.9" />
            <rect x="622" y="180" width="14" height="18" fill={beamColor} opacity="0.8" />
            <rect x="622" y="320" width="14" height="18" fill={beamColor} opacity="0.8" />
          </g>
        ),
      };
    }

    // 4C. Default Physics: Inclined Plane Vector Resolution
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
          <polygon points="240,360 660,360 660,180" fill="#64748b" fillOpacity="0.08" stroke="#64748b" strokeWidth="3" />
          <path d="M 280 360 A 40 40 0 0 0 274 346" fill="none" stroke="#fbbf24" strokeWidth="2" />
          <text x="290" y="352" fill="#fbbf24" fontSize="11" fontWeight="bold">θ</text>
          <g transform="translate(430, 240) rotate(-23)">
            <rect x="-35" y="-25" width="70" height="50" rx="6" fill="#3b82f6" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="3" />
            <text x="0" y="5" fill="#ffffff" textAnchor="middle" fontSize="12" fontWeight="bold">Mass m</text>
          </g>
          <line x1="430" y1="240" x2="400" y2="170" stroke="#38bdf8" strokeWidth="3.5" markerEnd="url(#arrow-cyan)" />
          <line x1="430" y1="240" x2="540" y2="190" stroke="#10b981" strokeWidth="3.5" markerEnd="url(#arrow-emerald)" />
          <line x1="430" y1="240" x2="430" y2="330" stroke="#ef4444" strokeWidth="3.5" markerEnd="url(#arrow-red)" />
          <line x1="430" y1="240" x2="350" y2="275" stroke="#f59e0b" strokeWidth="3.5" markerEnd="url(#arrow-amber)" />
        </g>
      ),
    };
  }, [
    normalizedSubject,
    topicSlug,
    topicTitle,
    unitId,
    projectileAngle,
    ydseWavelength,
    galvanicConnected,
    tangentPos,
  ]);

  return (
    <div className={`rounded-3xl border border-blue-900/40 bg-[#070b16] shadow-xl overflow-hidden ${className}`}>
      {/* Header bar */}
      <div className="px-6 py-4 border-b border-blue-900/40 bg-[#090e1f]/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
              Interactive Schematic
            </span>
            <h3 className="text-sm md:text-base font-bold text-white">
              {diagramData.title}
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{diagramData.subtitle}</p>
        </div>

        {/* Action Toggles & Controls */}
        <div className="flex items-center gap-2 text-xs flex-wrap">
          {/* Projectile angle slider toggle */}
          {topicSlug.includes("projectile") && (
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-700/80 text-xs">
              <span className="text-slate-400 text-[10px] font-bold">Angle:</span>
              {[30, 45, 60].map((deg) => (
                <button
                  key={deg}
                  onClick={() => setProjectileAngle(deg)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all ${
                    projectileAngle === deg
                      ? "bg-primary text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {deg}°
                </button>
              ))}
            </div>
          )}

          {/* YDSE wavelength toggle */}
          {topicSlug.includes("wave") && (
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-700/80 text-xs">
              <span className="text-slate-400 text-[10px] font-bold">Light:</span>
              <button
                onClick={() => setYdseWavelength("red")}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                  ydseWavelength === "red" ? "bg-red-500 text-white" : "text-slate-400"
                }`}
              >
                Red (700nm)
              </button>
              <button
                onClick={() => setYdseWavelength("blue")}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                  ydseWavelength === "blue" ? "bg-sky-500 text-white" : "text-slate-400"
                }`}
              >
                Blue (450nm)
              </button>
            </div>
          )}

          {/* Galvanic cell switch toggle */}
          {(topicSlug.includes("cell") || topicSlug.includes("electro")) && (
            <button
              onClick={() => setGalvanicConnected(!galvanicConnected)}
              className={`px-2.5 py-1 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 ${
                galvanicConnected
                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                  : "bg-slate-800 border-slate-700 text-slate-400"
              }`}
            >
              <Zap className="h-3 w-3" />
              <span>{galvanicConnected ? "Circuit Closed (1.10V)" : "Circuit Open"}</span>
            </button>
          )}

          <button
            onClick={() => setShowFormulas(!showFormulas)}
            className={`px-2.5 py-1 rounded-xl border text-xs font-semibold transition-all ${
              showFormulas
                ? "bg-primary/20 border-primary/40 text-primary"
                : "bg-slate-800 border-slate-700 text-slate-400"
            }`}
          >
            <span>Formulas</span>
          </button>
          <button
            onClick={() => setShowExamNotes(!showExamNotes)}
            className={`px-2.5 py-1 rounded-xl border text-xs font-semibold transition-all ${
              showExamNotes
                ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                : "bg-slate-800 border-slate-700 text-slate-400"
            }`}
          >
            <span>CEE Traps</span>
          </button>
        </div>
      </div>

      {/* Main SVG Canvas Area with LONG LEADER LINES */}
      <div className="relative w-full aspect-[16/9] min-h-[440px] max-h-[580px] bg-[#070b16] p-2 select-none overflow-hidden">
        {/* Subtle engineering grid dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255, 255, 255, 0.25) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <svg
          viewBox={diagramData.viewBox}
          className="w-full h-full"
          style={{ overflow: "visible" }}
        >
          <defs>
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

          {/* 1. Base Geometry */}
          {diagramData.renderSvg()}

          {/* 2. LONG SVG LEADER LINES */}
          {diagramData.annotations.map((ann) => {
            const isHovered = activeAnnotationId === ann.id;
            const cColor = ann.color || "#38bdf8";

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
                {/* Glow underlay */}
                {isHovered && (
                  <path
                    d={pathD}
                    fill="none"
                    stroke={cColor}
                    strokeWidth="7"
                    strokeOpacity="0.3"
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
                  r={isHovered ? "6.5" : "4.5"}
                  fill={cColor}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}
        </svg>

        {/* 3. HTML OVERLAY LABELS AT LONG ANCHORS (Non-overlapping) */}
        {diagramData.annotations.map((ann) => {
          const isHovered = activeAnnotationId === ann.id;
          const cColor = ann.color || "#38bdf8";

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
              className={`absolute z-20 max-w-[210px] md:max-w-[260px] p-2.5 rounded-2xl border backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg ${
                isHovered
                  ? "bg-[#0f172a] border-primary ring-2 ring-primary/40 scale-105"
                  : "bg-[#090e1f]/90 border-slate-800 hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: cColor }}
                />
                <h4 className="text-xs font-bold text-white leading-tight">{ann.label}</h4>
              </div>

              {showFormulas && ann.formulaOrValue && (
                <div className="mt-1 font-mono text-[10px] text-primary font-semibold px-1.5 py-0.5 rounded bg-primary/10 truncate">
                  {ann.formulaOrValue}
                </div>
              )}

              {showExamNotes && ann.examNote && (
                <p className="mt-1 text-[10px] text-slate-300 leading-relaxed line-clamp-2">
                  {ann.examNote}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom active detail bar */}
      <div className="px-6 py-3 border-t border-blue-900/40 bg-[#090e1f]/80 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5 text-primary" />
          <span>Hover any label or long leader line to highlight the exact target feature.</span>
        </span>
        <span className="text-[11px] font-semibold text-emerald-400">
          NEB &amp; CEE Verified
        </span>
      </div>
    </div>
  );
}
