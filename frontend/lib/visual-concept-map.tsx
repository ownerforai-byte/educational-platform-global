/**
 * Unit Concept Registry — the per-unit "what this chapter is really about" data
 * that makes the Visual Workspace topic-aware.
 *
 * BEFORE: every topic inside a unit saw the same 5-branch subject-level mindmap
 * and one of only ~9 hand-drawn schematics; most topics fell back to the
 * constant inclined-plane drawing. AFTER: both the Interactive Schematic and
 * the Clear Mindmap derive their content from THIS registry, keyed by the
 * exact syllabus unit id (lib/syllabus.ts), with topic-keyword refinement on
 * top.
 *
 * Shape is deliberately simple:
 *  - schematic: an annotated concept sketch (label chips + leader lines +
 *    exam pointers rendered by SchematicDiagram).
 *  - branches: 3–5 mindmap branches, each with sub-branches and leaf nodes
 *    (formula, KaTeX, derivation snippet, exam fact) rendered by TopicMindMap.
 */

import type { ConceptAnnotation } from "@/components/lab/schematic-concepts";
import type { MindMapBranch } from "@/components/lab/topic-mindmap";

export interface UnitConcept {
  /** Human name shown in the schematic status line. */
  name: string;
  /** One-line "what this drawing shows". */
  summary: string;
  annotations: ConceptAnnotation[];
  /** Plain-SVG sketch (rendered inside the 900×520 viewBox). */
  renderSvg: () => React.ReactNode;
  /** Mindmap branches for the same unit. */
  branches: MindMapBranch[];
}

const C = {
  red: "#ef4444",
  blue: "#38bdf8",
  purple: "#a855f7",
  green: "#10b981",
  amber: "#f59e0b",
  gray: "#94a3b8",
  slate: "#64748b",
};

/** Shared color helper so branch objects stay terse. */
function br(
  id: string,
  category: string,
  color: string,
  angle: number,
  orderIndex: number,
  subBranches: MindMapBranch["subBranches"],
  classLevel: "Class 11" | "Class 12" = "Class 11",
): MindMapBranch {
  return {
    id,
    category,
    color,
    bgColor: `${color}26`,
    borderColor: color,
    angle,
    classLevel,
    orderIndex,
    subBranches,
    nodes: [],
  };
}

/** Leaf helper. */
function leaf(
  id: string,
  title: string,
  description: string,
  formula: string,
  examFact: string,
  orderIndex: number,
  formulaLatex?: string,
  highYield = true,
) {
  return {
    id,
    title,
    description,
    formula,
    formulaLatex,
    examFact,
    highYield,
    orderIndex,
  };
}

/** Sub-branch helper. */
function sub(id: string, title: string, description: string, nodes: ReturnType<typeof leaf>[], orderIndex = 1) {
  return { id, title, description, nodes, orderIndex };
}

export const UNIT_CONCEPTS: Record<string, UnitConcept> = {
  /* ═══════════════ PHYSICS · CLASS 11 ═══════════════ */

  "physical-quantities": {
    name: "Measurement, Dimensions & Significant Figures",
    summary: "Base quantities, dimensional analysis and the error-propagation chain",
    annotations: [
      { id: "base", label: "7 Base Quantities (SI)", formulaOrValue: "m, kg, s, A, K, mol, cd", examNote: "CEE: Everything else is derived — know all 7 base units cold.", labelX: 130, labelY: 90, targetX: 330, targetY: 200, controlX: 220, controlY: 140, color: C.blue },
      { id: "derived", label: "Derived Quantity", formulaOrValue: "e.g. force = MLT⁻²", examNote: "NEB: Express any derived unit as a product of base powers.", labelX: 640, labelY: 90, targetX: 480, targetY: 190, controlX: 560, controlY: 130, color: C.green },
      { id: "dim", label: "Dimensional Homogeneity", formulaOrValue: "[LHS] = [RHS] in every valid equation", examNote: "CEE: Checking homogeneity can reject wrong formulas in MCQs instantly.", labelX: 100, labelY: 340, targetX: 360, targetY: 290, controlX: 210, controlY: 330, color: C.amber },
      { id: "conver", label: "Unit Conversion Factor", formulaOrValue: "1 N = 10⁵ dyne · n₂ = n₁(u₁/u₂)", examNote: "NEB: Numerical value inversely proportional to unit size.", labelX: 660, labelY: 340, targetX: 520, targetY: 290, controlX: 600, controlY: 330, color: C.purple },
      { id: "sig", label: "Significant Figures", formulaOrValue: "Result keeps the least precise count", examNote: "CEE: 0.00650 → 3 sig figs; multiply/divide → fewest sig figs wins.", labelX: 430, labelY: 460, targetX: 430, targetY: 350, controlX: 430, controlY: 410, color: C.red },
    ],
    renderSvg: () => (
      <g>
        <rect x="330" y="160" width="240" height="90" rx="10" fill={C.blue} fillOpacity="0.08" stroke={C.blue} strokeWidth="2.5" />
        <text x="450" y="200" fill="#e2e8f0" textAnchor="middle" fontSize="13" fontWeight="bold">PHYSICAL QUANTITY</text>
        <text x="450" y="222" fill={C.gray} textAnchor="middle" fontSize="10">= number × unit</text>
        {[330, 480].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="250" x2={x === 330 ? 360 : 520} y2="285" stroke={i === 0 ? C.amber : C.purple} strokeWidth="2" />
            <rect x={x === 330 ? 300 : 470} y="285" width="120" height="46" rx="8" fill="none" stroke={i === 0 ? C.amber : C.purple} strokeWidth="2" />
            <text x={x === 330 ? 360 : 530} y="313" fill="#e2e8f0" textAnchor="middle" fontSize="10">{i === 0 ? "Measurement" : "Conversion"}</text>
          </g>
        ))}
        <ellipse cx="430" cy="345" rx="0" ry="0" />
        <rect x="330" y="345" width="200" height="40" rx="8" fill={C.red} fillOpacity="0.1" stroke={C.red} strokeWidth="2" />
        <text x="430" y="370" fill="#e2e8f0" textAnchor="middle" fontSize="10">Precision & accuracy</text>
      </g>
    ),
    branches: [
      br("uc-pq-base", "Base & Derived Quantities", C.blue, -60, 1, [
        sub("uc-pq-base-1", "The SI Base Seven", "m, kg, s, A, K, mol, cd — the irreducible vocabulary.", [
          leaf("uc-pq-1", "Base units", "Seven independent SI standards", "7 base units", "CEE: Planck constant h has dimensions of angular momentum ML²T⁻¹.", 1),
          leaf("uc-pq-2", "Derived units", "Products of base powers", "[F] = MLT⁻²", "NEB: Pressure = ML⁻¹T⁻² — same as energy density.", 2),
        ]),
      ]),
      br("uc-pq-dim", "Dimensional Analysis", C.green, 0, 2, [
        sub("uc-pq-dim-1", "Checking & Deriving Formulas", "Homogeneity test and the exponent method.", [
          leaf("uc-pq-3", "Homogeneity", "LHS and RHS dimensions must match", "[LHS] = [RHS]", "CEE: Rejects wrong formulas without any calculation.", 1),
          leaf("uc-pq-4", "Exponent method", "Find how T depends on l and g", "T = k√(l/g)", "NEB: Pendulum period derivation is the classic example.", 2),
        ]),
      ]),
      br("uc-pq-err", "Errors & Significant Figures", C.amber, 60, 3, [
        sub("uc-pq-err-1", "Propagation Rules", "How errors add, multiply and raise to powers.", [
          leaf("uc-pq-5", "Error propagation", "Relative errors add for products", "ΔZ/Z = ΔA/A + ΔB/B", "CEE: Power n multiplies the relative error n-fold.", 1),
          leaf("uc-pq-6", "Sig-fig rounding", "Least precise measurement governs", "0.00650 → 3 s.f.", "NEB: Trailing zeros after a decimal count; leading zeros never.", 2),
        ]),
      ]),
    ],
  },

  "vectors": {
    name: "Vector Algebra & Resolution",
    summary: "Addition, resolution, dot & cross products with the parallelogram construction",
    annotations: [
      { id: "res", label: "Resultant R = P + Q", formulaOrValue: "R = √(P² + Q² + 2PQ cos θ)", examNote: "CEE: Minimum resultant |P − Q|, maximum P + Q — both asked every year.", labelX: 120, labelY: 100, targetX: 430, targetY: 240, controlX: 250, controlY: 160, color: C.green },
      { id: "comp", label: "Components (x, y)", formulaOrValue: "Aₓ = A cos θ, A_y = A sin θ", examNote: "NEB: Resolution replaces every 2-D vector problem with two scalar ones.", labelX: 660, labelY: 100, targetX: 520, targetY: 210, controlX: 600, controlY: 150, color: C.blue },
      { id: "dot", label: "Scalar (Dot) Product", formulaOrValue: "A·B = AB cos θ = AₓBₓ + A_yB_y", examNote: "CEE: Zero dot product ⟺ perpendicular; work is a dot product.", labelX: 120, labelY: 400, targetX: 380, targetY: 320, controlX: 220, controlY: 380, color: C.amber },
      { id: "cross", label: "Vector (Cross) Product", formulaOrValue: "|A × B| = AB sin θ (right-hand rule)", examNote: "NEB: Zero cross product ⟺ parallel; torque and magnetic force are cross products.", labelX: 660, labelY: 400, targetX: 500, targetY: 320, controlX: 600, controlY: 380, color: C.red },
      { id: "unitv", label: "Unit Vector Â", formulaOrValue: "Â = A/|A| (direction only)", examNote: "CEE: Divide by √(Aₓ² + A_y²) — 3-4-5 triples are common.", labelX: 430, labelY: 460, targetX: 450, targetY: 350, controlX: 440, controlY: 410, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <line x1="430" y1="280" x2="620" y2="180" stroke={C.blue} strokeWidth="3.5" markerEnd="url(#arrow-cyan)" />
        <text x="630" y="175" fill={C.blue} fontSize="12" fontWeight="bold">A</text>
        <line x1="620" y1="180" x2="700" y2="280" stroke={C.blue} strokeWidth="3" strokeDasharray="6 4" />
        <line x1="430" y1="280" x2="700" y2="280" stroke={C.green} strokeWidth="3.5" markerEnd="url(#arrow-emerald)" />
        <text x="708" y="285" fill={C.green} fontSize="12" fontWeight="bold">R</text>
        <line x1="430" y1="280" x2="560" y2="345" stroke={C.amber} strokeWidth="3.5" markerEnd="url(#arrow-amber)" />
        <text x="565" y="355" fill={C.amber} fontSize="12" fontWeight="bold">B</text>
        <line x1="620" y1="180" x2="620" y2="280" stroke={C.gray} strokeWidth="1.4" strokeDasharray="4 4" />
        <path d="M 470 280 A 42 42 0 0 0 462 258" fill="none" stroke={C.purple} strokeWidth="2" />
        <text x="482" y="268" fill={C.purple} fontSize="11" fontWeight="bold">θ</text>
      </g>
    ),
    branches: [
      br("uc-vec-add", "Addition & Resultant", C.green, -60, 1, [
        sub("uc-vec-add-1", "Triangle & Parallelogram Laws", "Head-to-tail and the diagonal construction.", [
          leaf("uc-vec-1", "Resultant magnitude", "Law of cosines on the vector triangle", "R = √(P²+Q²+2PQ cos θ)", "CEE: Equal forces at 120° give R = F — the staple MCQ.", 1),
          leaf("uc-vec-2", "Subtraction", "Add the reversed vector", "A − B = A + (−B)", "NEB: Minimum resultant is |P − Q| at θ = 180°.", 2),
        ]),
      ]),
      br("uc-vec-res", "Resolution & Components", C.blue, 0, 2, [
        sub("uc-vec-res-1", "Rectangular Components", "Split along perpendicular axes.", [
          leaf("uc-vec-3", "Components", "Adjacent = cos, opposite = sin", "Aₓ = A cos θ, A_y = A sin θ", "NEB: tan θ = A_y/Aₓ gives the direction.", 1),
          leaf("uc-vec-4", "Unit vectors", "Direction carriers of magnitude 1", "Â = A/|A|", "CEE: î + ĵ + k̂ has magnitude √3 — not 1.", 2),
        ]),
      ]),
      br("uc-vec-prod", "Products of Vectors", C.red, 60, 3, [
        sub("uc-vec-prod-1", "Dot vs Cross", "Scalar projection vs oriented area.", [
          leaf("uc-vec-5", "Dot product", "AB cos θ — work, power, flux", "A·B = AₓBₓ + A_yB_y", "CEE: A·B = 0 with both nonzero ⟺ perpendicular.", 1),
          leaf("uc-vec-6", "Cross product", "AB sin θ — torque, force on charge", "|A × B| = AB sin θ", "NEB: Direction by right-hand rule; î × ĵ = k̂.", 2),
        ]),
      ]),
    ],
  },

  "work-energy-and-power": {
    name: "Work, Energy, Conservation & Power",
    summary: "Work–energy theorem, PE curves, conservation of mechanical energy and power",
    annotations: [
      { id: "w", label: "Work W = F·d·cos θ", formulaOrValue: "Area under F–x graph", examNote: "CEE: Force perpendicular to displacement does zero work (circular motion).", labelX: 120, labelY: 90, targetX: 360, targetY: 200, controlX: 220, controlY: 140, color: C.blue },
      { id: "ket", label: "Work–Energy Theorem", formulaOrValue: "W_net = ΔKE = ½mv² − ½mu²", examNote: "NEB: Holds even with friction — net work includes it.", labelX: 660, labelY: 90, targetX: 520, targetY: 200, controlX: 590, controlY: 140, color: C.green },
      { id: "pe", label: "Potential Energy Curve", formulaOrValue: "F = −dU/dx (slope reads force)", examNote: "CEE: Equilibrium where slope = 0; stable where U is minimum.", labelX: 120, labelY: 400, targetX: 380, targetY: 310, controlX: 220, controlY: 380, color: C.amber },
      { id: "cons", label: "Conservation of ME", formulaOrValue: "KE + PE = constant (no friction)", examNote: "NEB: Only conservative forces — otherwise ME leaks to heat.", labelX: 660, labelY: 400, targetX: 500, targetY: 310, controlX: 590, controlY: 380, color: C.red },
      { id: "pow", label: "Power P = F·v", formulaOrValue: "1 hp = 746 W · P = W/t", examNote: "CEE: Instantaneous power is F·v, not W/t, when v varies.", labelX: 430, labelY: 460, targetX: 440, targetY: 360, controlX: 435, controlY: 410, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <line x1="200" y1="380" x2="700" y2="380" stroke={C.gray} strokeWidth="2" />
        <line x1="200" y1="380" x2="200" y2="120" stroke={C.gray} strokeWidth="2" />
        <path d="M 200 160 Q 330 340 450 340 Q 570 340 700 160" fill="none" stroke={C.amber} strokeWidth="3" />
        <text x="210" y="140" fill={C.amber} fontSize="11" fontWeight="bold">U(x)</text>
        <line x1="450" y1="340" x2="450" y2="380" stroke={C.green} strokeWidth="2" strokeDasharray="4 3" />
        <circle cx="450" cy="340" r="6" fill={C.green} />
        <text x="450" y="405" fill={C.green} fontSize="10" textAnchor="middle">stable equilibrium</text>
        <line x1="200" y1="160" x2="240" y2="212" stroke={C.red} strokeWidth="3" markerEnd="url(#arrow-red)" />
        <text x="246" y="230" fill={C.red} fontSize="10">F = −slope</text>
      </g>
    ),
    branches: [
      br("uc-wep-work", "Work & Kinetic Energy", C.blue, -60, 1, [
        sub("uc-wep-work-1", "The Work–Energy Theorem", "Net work changes kinetic energy.", [
          leaf("uc-wep-1", "Work by constant force", "W = Fd cos θ", "W = F·d·cos θ", "CEE: Zero work when θ = 90° — uniform circular motion.", 1),
          leaf("uc-wep-2", "Graphical work", "Area under F–x curve", "W = ∫F dx", "NEB: Variable-force problems are area problems.", 2),
        ]),
      ]),
      br("uc-wep-energy", "Energy Conservation", C.green, 0, 2, [
        sub("uc-wep-energy-1", "Mechanical Energy", "KE + PE constant without friction.", [
          leaf("uc-wep-3", "Conservation", "Exchange between KE and PE", "KE + PE = const", "NEB: Falling bodies, pendulums, springs — the standard trio.", 1),
          leaf("uc-wep-4", "Spring PE", "Elastic energy storage", "U = ½kx²", "CEE: Quadruple x → 16× energy; watch option traps.", 2),
        ]),
      ]),
      br("uc-wep-power", "Power & Efficiency", C.amber, 60, 3, [
        sub("uc-wep-power-1", "Rate of Doing Work", "Average vs instantaneous.", [
          leaf("uc-wep-5", "Instantaneous power", "P = F·v cos θ", "P = F·v", "CEE: A pump lifting water — P = mgH/t classic numerical.", 1),
          leaf("uc-wep-6", "Efficiency", "Useful out over total in", "η = P_out/P_in × 100%", "NEB: Machines never exceed 100% — friction eats the rest.", 2),
        ]),
      ]),
    ],
  },

  "dc-circuits": {
    name: "DC Circuits — Ohm, Kirchhoff & Networks",
    summary: "Series/parallel networks, Kirchhoff's laws, Wheatstone bridge and cell combinations",
    annotations: [
      { id: "ohm", label: "Ohm's Law V = IR", formulaOrValue: "Holds for metallic conductors at constant T", examNote: "CEE: V–I graph straight through origin — slope is R.", labelX: 120, labelY: 90, targetX: 340, targetY: 210, controlX: 210, controlY: 140, color: C.blue },
      { id: "kcl", label: "Junction Rule (KCL)", formulaOrValue: "ΣI(in) = ΣI(out) — charge conservation", examNote: "NEB: Apply at every node before writing loop equations.", labelX: 660, labelY: 90, targetX: 560, targetY: 210, controlX: 610, controlY: 140, color: C.green },
      { id: "kvl", label: "Loop Rule (KVL)", formulaOrValue: "Σ(±V) = 0 around any closed loop — energy conservation", examNote: "CEE: Sign discipline (rise +, drop −) decides the answer.", labelX: 120, labelY: 420, targetX: 340, targetY: 330, controlX: 210, controlY: 390, color: C.amber },
      { id: "bridge", label: "Wheatstone Bridge", formulaOrValue: "Balanced when P/Q = R/S (Ig = 0)", examNote: "NEB: In a balanced bridge the galvanometer arm can be removed.", labelX: 660, labelY: 420, targetX: 560, targetY: 330, controlX: 610, controlY: 390, color: C.red },
      { id: "cell", label: "Real Cell: ε, r", formulaOrValue: "V = ε − Ir (discharging)", examNote: "CEE: Terminal voltage < emf while discharging; equal at open circuit.", labelX: 430, labelY: 460, targetX: 450, targetY: 360, controlX: 440, controlY: 410, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <rect x="300" y="180" width="320" height="180" rx="8" fill="none" stroke={C.slate} strokeWidth="3" />
        <rect x="380" y="120" width="160" height="34" rx="6" fill={C.purple} fillOpacity="0.15" stroke={C.purple} strokeWidth="2.5" />
        <text x="460" y="142" fill="#e2e8f0" textAnchor="middle" fontSize="11">cell ε, r</text>
        <rect x="280" y="230" width="50" height="80" rx="6" fill={C.blue} fillOpacity="0.12" stroke={C.blue} strokeWidth="2.5" />
        <text x="305" y="275" fill="#e2e8f0" textAnchor="middle" fontSize="10">R₁</text>
        <rect x="590" y="230" width="50" height="80" rx="6" fill={C.green} fillOpacity="0.12" stroke={C.green} strokeWidth="2.5" />
        <text x="615" y="275" fill="#e2e8f0" textAnchor="middle" fontSize="10">R₂</text>
        <circle cx="460" cy="270" r="18" fill="none" stroke={C.amber} strokeWidth="2.5" />
        <text x="460" y="275" fill={C.amber} fontSize="9" textAnchor="middle">G</text>
        <text x="460" y="395" fill={C.gray} fontSize="10" textAnchor="middle">Wheatstone network</text>
      </g>
    ),
    branches: [
      br("uc-dc-ohm", "Ohm's Law & Resistance", C.blue, -60, 1, [
        sub("uc-dc-ohm-1", "V–I Characteristics", "Linear conductors and resistivity factors.", [
          leaf("uc-dc-1", "Ohm's law", "V ∝ I at constant temperature", "V = IR", "CEE: Resistance ∝ L/A — stretch a wire 2×, R quadruples.", 1),
          leaf("uc-dc-2", "Resistivity", "Material property, not geometry", "ρ = RA/L", "NEB: Metals: ρ rises with T; semiconductors fall.", 2),
        ]),
      ]),
      br("uc-dc-kirch", "Kirchhoff's Laws", C.green, 0, 2, [
        sub("uc-dc-kirch-1", "Network Analysis", "Node and loop rules for any circuit.", [
          leaf("uc-dc-3", "Junction rule", "Charge conservation at a node", "ΣI = 0", "NEB: Currents in = currents out, always.", 1),
          leaf("uc-dc-4", "Loop rule", "Energy conservation per loop", "Σ ε = Σ IR", "CEE: Traverse rises as +, drops as −, consistently.", 2),
        ]),
      ]),
      br("uc-dc-cells", "Cells & Bridges", C.amber, 60, 3, [
        sub("uc-dc-cells-1", "EMF, Internal Resistance, Bridges", "Real sources and balanced networks.", [
          leaf("uc-dc-5", "Terminal voltage", "What the external circuit sees", "V = ε − Ir", "CEE: Max power transfer when R = r.", 1),
          leaf("uc-dc-6", "Wheatstone balance", "No galvanometer current", "P/Q = R/S", "NEB: Basis of the metre-bridge and potentiometer.", 2),
        ]),
      ]),
    ],
  },

  /* ═══════════════ CHEMISTRY ═══════════════ */

  "stoichiometry": {
    name: "Mole Concept & Stoichiometric Calculations",
    summary: "Mole, molar mass, limiting reagent, per cent yield and gas volumes at STP",
    annotations: [
      { id: "mole", label: "The Mole", formulaOrValue: "n = m/M = N/N_A = V/22.4 (STP gas)", examNote: "CEE: 22.4 L/mol only at STP — the perennial trap.", labelX: 120, labelY: 90, targetX: 340, targetY: 200, controlX: 210, controlY: 140, color: C.blue },
      { id: "na", label: "Avogadro's Number", formulaOrValue: "N_A = 6.022 × 10²³ particles/mol", examNote: "NEB: 1 mole of any gas holds the same number of molecules.", labelX: 660, labelY: 90, targetX: 540, targetY: 200, controlX: 600, controlY: 140, color: C.green },
      { id: "limit", label: "Limiting Reagent", formulaOrValue: "Reactant fully consumed first", examNote: "CEE: Divide moles by coefficient — smallest quotient is limiting.", labelX: 120, labelY: 400, targetX: 340, targetY: 310, controlX: 210, controlY: 380, color: C.red },
      { id: "yield", label: "% Yield", formulaOrValue: "actual/theoretical × 100%", examNote: "NEB: Theoretical yield comes from the limiting reagent, not excess.", labelX: 660, labelY: 400, targetX: 540, targetY: 310, controlX: 600, controlY: 380, color: C.amber },
      { id: "eqn", label: "Balanced Equation", formulaOrValue: "Coefficients = mole ratios", examNote: "CEE: Never set up mole ratios on an unbalanced equation.", labelX: 430, labelY: 460, targetX: 440, targetY: 360, controlX: 435, controlY: 410, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <rect x="300" y="160" width="300" height="80" rx="10" fill={C.blue} fillOpacity="0.08" stroke={C.blue} strokeWidth="2.5" />
        <text x="450" y="195" fill="#e2e8f0" textAnchor="middle" fontSize="13" fontWeight="bold">MOLE — the chemist's dozen</text>
        <text x="450" y="220" fill={C.gray} textAnchor="middle" fontSize="10">mass ↔ particles ↔ gas volume</text>
        {[{x: 220, c: C.green}, {x: 450, c: C.amber}, {x: 680, c: C.red}].map((p, i) => (
          <g key={i}>
            <line x1="450" y1="240" x2={p.x} y2="310" stroke={p.c} strokeWidth="2" />
            <rect x={p.x - 70} y="310" width="140" height="44" rx="8" fill="none" stroke={p.c} strokeWidth="2" />
            <text x={p.x} y="337" fill="#e2e8f0" textAnchor="middle" fontSize="9.5">{["m = n × M", "N = n × N_A", "V = n × 22.4 L"][i]}</text>
          </g>
        ))}
      </g>
    ),
    branches: [
      br("uc-st-mole", "Mole & Molar Mass", C.blue, -60, 1, [
        sub("uc-st-mole-1", "Counting by Weighing", "Mass ↔ particles conversion.", [
          leaf("uc-st-1", "Mole definition", "Amount with N_A particles", "n = m/M", "CEE: Moles in 11.2 L gas at STP = 0.5.", 1),
          leaf("uc-st-2", "Molar volume", "22.4 L per mole at STP", "V = n × 22.4", "NEB: Applies to gases only, at STP only.", 2),
        ]),
      ]),
      br("uc-st-limit", "Limiting Reagent", C.red, 0, 2, [
        sub("uc-st-limit-1", "Who Runs Out First", "Coefficients decide the cap.", [
          leaf("uc-st-3", "Identifying the limit", "Smallest mole/coefficient ratio", "nᵢ/cᵢ minimal", "CEE: Everything else is excess — compute yield from it.", 1),
          leaf("uc-st-4", "Percent yield", "Real vs perfect world", "% = actual/theoretical × 100", "NEB: Losses lower yield; impurities lower purity.", 2),
        ]),
      ]),
      br("uc-st-conc", "Concentration Measures", C.amber, 60, 3, [
        sub("uc-st-conc-1", "Solutions in Numbers", "Molarity, molality and dilution.", [
          leaf("uc-st-5", "Molarity", "Moles per litre of solution", "M = n/V(L)", "CEE: Dilution M₁V₁ = M₂V₂ — moles unchanged.", 1),
          leaf("uc-st-6", "Molality", "Moles per kg of solvent", "m = n/kg", "NEB: Temperature-independent, unlike molarity.", 2),
        ]),
      ]),
    ],
  },

  "chemical-bonding-and-shapes-of-molecules": {
    name: "Chemical Bonding, VSEPR & Hybridisation",
    summary: "Ionic vs covalent bonds, VSEPR shapes, hybrid orbitals and molecular polarity",
    annotations: [
      { id: "ionic", label: "Ionic Bond", formulaOrValue: "Metal → non-metal electron transfer", examNote: "CEE: High m.p., conduct when molten/aqueous — NaCl the model.", labelX: 120, labelY: 90, targetX: 340, targetY: 200, controlX: 210, controlY: 140, color: C.red },
      { id: "cov", label: "Covalent Bond", formulaOrValue: "Shared electron pair(s)", examNote: "NEB: σ head-on, π sidewise; π bonds break first in addition.", labelX: 660, labelY: 90, targetX: 540, targetY: 200, controlX: 600, controlY: 140, color: C.blue },
      { id: "vsepr", label: "VSEPR Repulsion Order", formulaOrValue: "lp–lp > lp–bp > bp–bp", examNote: "CEE: Lone pairs squeeze bond angles — 104.5° in water.", labelX: 120, labelY: 400, targetX: 340, targetY: 310, controlX: 210, controlY: 380, color: C.amber },
      { id: "hyb", label: "Hybridisation", formulaOrValue: "sp³/sp²/sp → 109.5°/120°/180°", examNote: "NEB: Count σ bonds + lone pairs on the central atom.", labelX: 660, labelY: 400, targetX: 540, targetY: 310, controlX: 600, controlY: 380, color: C.green },
      { id: "polar", label: "Molecular Polarity", formulaOrValue: "Symmetric dipoles cancel (CO₂) or add (H₂O)", examNote: "CEE: Shape decides polarity even with polar bonds.", labelX: 430, labelY: 460, targetX: 440, targetY: 360, controlX: 435, controlY: 410, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <circle cx="450" cy="260" r="42" fill={C.blue} fillOpacity="0.12" stroke={C.blue} strokeWidth="2.5" />
        <text x="450" y="265" fill="#e2e8f0" textAnchor="middle" fontSize="12" fontWeight="bold">A</text>
        {[0, 1, 2, 3].map((i) => {
          const ang = [-45, 45, 135, 225][i];
          const rad = (ang * Math.PI) / 180;
          const x = 450 + 110 * Math.cos(rad);
          const y = 260 + 110 * Math.sin(rad);
          return (
            <g key={i}>
              <line x1="450" y1="260" x2={x} y2={y} stroke={C.slate} strokeWidth="3.5" />
              <circle cx={x} cy={y} r="14" fill={C.amber} fillOpacity="0.2" stroke={C.amber} strokeWidth="2" />
            </g>
          );
        })}
        <text x="450" y="420" fill={C.gray} fontSize="10" textAnchor="middle">tetrahedral sp³ — 109.5°</text>
      </g>
    ),
    branches: [
      br("uc-cb-ionic", "Ionic & Covalent Bonds", C.red, -60, 1, [
        sub("uc-cb-ionic-1", "How Electrons Bind", "Transfer vs sharing.", [
          leaf("uc-cb-1", "Ionic bond", "Electrostatic lattice of ions", "Na → Cl : Na⁺Cl⁻", "CEE: Lattice energy explains high melting points.", 1),
          leaf("uc-cb-2", "Covalent σ/π", "Head-on and sidewise overlap", "σ stronger than π", "NEB: Double bond = σ + π; π electron clouds are reactive.", 2),
        ]),
      ]),
      br("uc-cb-vsepr", "VSEPR Shapes", C.amber, 0, 2, [
        sub("uc-cb-vsepr-1", "Electron-Pair Geometry", "Repulsion dictates angles.", [
          leaf("uc-cb-3", "Repulsion order", "lp–lp strongest", "lp–lp > lp–bp > bp–bp", "CEE: NH₃ 107°, H₂O 104.5° — both below 109.5°.", 1),
          leaf("uc-cb-4", "Common shapes", "Linear → tetrahedral → octahedral", "AB₂, AB₃, AB₄…", "NEB: Name the shape AND the angle for full marks.", 2),
        ]),
      ]),
      br("uc-cb-hyb", "Hybridisation & Polarity", C.green, 60, 3, [
        sub("uc-cb-hyb-1", "Mixing Orbitals", "New equivalent hybrids.", [
          leaf("uc-cb-5", "Hybrid count", "σ bonds + lone pairs", "sp³ = 4 regions", "CEE: C₂H₂ is sp (180°); C₂H₄ is sp² (120°).", 1),
          leaf("uc-cb-6", "Dipole moments", "Vector sum over the shape", "μ = q × d", "NEB: CO₂ nonpolar despite polar bonds — symmetry cancels.", 2),
        ]),
      ]),
    ],
  },

  /* ═══════════════ BIOLOGY ═══════════════ */

  "biomolecules-and-cell-biology": {
    name: "Cell Structure, Organelles & Biomolecules",
    summary: "Prokaryote vs eukaryote, the organelle map, and the four biomolecule families",
    annotations: [
      { id: "nuc", label: "Nucleus (control centre)", formulaOrValue: "Double membrane, nucleolus, chromatin", examNote: "NEB: Contains hereditary material; nucleolus makes rRNA.", labelX: 120, labelY: 90, targetX: 430, targetY: 220, controlX: 250, controlY: 140, color: C.purple },
      { id: "mito", label: "Mitochondrion", formulaOrValue: "Cristae × surface area; own circular DNA", examNote: "CEE: Powerhouse with 70S ribosomes — semi-autonomous.", labelX: 660, labelY: 90, targetX: 520, targetY: 210, controlX: 600, controlY: 140, color: C.red },
      { id: "ribo", label: "Ribosomes (80S)", formulaOrValue: "60S + 40S subunits on rough ER", examNote: "NEB: Protein factories; 70S inside organelles — the numbers trap.", labelX: 120, labelY: 420, targetX: 380, targetY: 300, controlX: 220, controlY: 390, color: C.blue },
      { id: "mem", label: "Fluid-Mosaic Membrane", formulaOrValue: "~7.5 nm bilayer + integral proteins", examNote: "CEE: Singer–Nicolson 1972; fluidity from unsaturated tails.", labelX: 660, labelY: 420, targetX: 520, targetY: 300, controlX: 600, controlY: 390, color: C.green },
      { id: "bio", label: "4 Biomolecule Families", formulaOrValue: "Carbohydrate · Lipid · Protein · Nucleic acid", examNote: "NEB: Monomers: glucose, glycerol+FA, amino acids, nucleotides.", labelX: 430, labelY: 460, targetX: 450, targetY: 360, controlX: 440, controlY: 410, color: C.amber },
    ],
    renderSvg: () => (
      <g>
        <ellipse cx="450" cy="260" rx="230" ry="150" fill={C.green} fillOpacity="0.05" stroke={C.slate} strokeWidth="3" />
        <circle cx="430" cy="230" r="52" fill={C.purple} fillOpacity="0.15" stroke={C.purple} strokeWidth="2.5" />
        <circle cx="430" cy="230" r="16" fill={C.purple} fillOpacity="0.3" />
        <ellipse cx="560" cy="290" rx="52" ry="26" fill={C.red} fillOpacity="0.15" stroke={C.red} strokeWidth="2.5" />
        <path d="M 520 290 q 10 -14 20 0 q 10 14 20 0 q 10 -14 20 0" fill="none" stroke={C.red} strokeWidth="1.5" />
        <g stroke={C.blue} strokeWidth="2.4">
          <line x1="330" y1="300" x2="390" y2="300" /><line x1="330" y1="310" x2="390" y2="310" /><line x1="330" y1="320" x2="390" y2="320" />
        </g>
        <text x="450" y="440" fill={C.gray} fontSize="10" textAnchor="middle">eukaryotic cell — cutaway</text>
      </g>
    ),
    branches: [
      br("uc-cell-org", "Organelles & Their Jobs", C.purple, -60, 1, [
        sub("uc-cell-1", "Compartmentalised Work", "Each membrane-bound organelle specialises.", [
          leaf("uc-cell-1a", "Nucleus & nucleolus", "Stores DNA; builds rRNA", "2 membranes, pores", "NEB: Nucleolus = rRNA factory, not the DNA store.", 1),
          leaf("uc-cell-1b", "Mitochondrion", "ATP via respiration; semi-autonomous", "70S ribosome, circular DNA", "CEE: Cristae multiply the inner-membrane area.", 2),
        ]),
      ]),
      br("uc-cell-mem", "Membrane Structure", C.green, 0, 2, [
        sub("uc-cell-2", "Fluid Mosaic Model", "Bilayer plus a mosaic of proteins.", [
          leaf("uc-cell-2a", "Phospholipid bilayer", "Hydrophilic heads out, tails in", "~7.5 nm thick", "CEE: Unsaturated tails keep the membrane fluid in cold.", 1),
          leaf("uc-cell-2b", "Transport proteins", "Channels and carriers", "Facilitated diffusion", "NEB: Aquaporins for water; Na⁺/K⁺ pump active.", 2),
        ]),
      ]),
      br("uc-cell-bio", "Biomolecule Families", C.amber, 60, 3, [
        sub("uc-cell-3", "Monomers & Polymers", "Four families, four monomers.", [
          leaf("uc-cell-3a", "Carbohydrates & lipids", "Fuel and storage", "Cₙ(H₂O)ₙ; glycerol + 3 FA", "CEE: Fats yield ~9 kcal/g vs 4 for carbs.", 1),
          leaf("uc-cell-3b", "Proteins & nucleic acids", "Workers and information", "AA peptide bonds; A-T/G-C", "NEB: 20 amino acids; DNA bases pair A=T, G≡C.", 2),
        ]),
      ]),
    ],
  },

  "heredity-and-evolution": {
    name: "Mendelian Genetics, DNA & Evolution",
    summary: "Punnett logic, the chromosome theory, DNA as information and Darwinian evolution",
    annotations: [
      { id: "seg", label: "Law of Segregation", formulaOrValue: "Alleles separate in anaphase I", examNote: "CEE: Monohybrid F₂ = 3:1; testcross reveals genotype.", labelX: 120, labelY: 90, targetX: 340, targetY: 200, controlX: 210, controlY: 140, color: C.green },
      { id: "ind", label: "Independent Assortment", formulaOrValue: "Dihybrid F₂ = 9:3:3:1", examNote: "NEB: Only for genes on different chromosomes.", labelX: 660, labelY: 90, targetX: 540, targetY: 200, controlX: 600, controlY: 140, color: C.blue },
      { id: "dna", label: "DNA — the Information Molecule", formulaOrValue: "Double helix; A=T, G≡C base pairing", examNote: "CEE: Semi-conservative replication (Meselson–Stahl).", labelX: 120, labelY: 400, targetX: 340, targetY: 310, controlX: 210, controlY: 380, color: C.red },
      { id: "mut", label: "Mutation & Variation", formulaOrValue: "Raw material of evolution", examNote: "NEB: Sickle-cell shows heterozygote advantage in malaria zones.", labelX: 660, labelY: 400, targetX: 540, targetY: 310, controlX: 600, controlY: 380, color: C.amber },
      { id: "sel", label: "Natural Selection", formulaOrValue: "Differential survival of heritable variants", examNote: "CEE: Darwin 1859; homology evidences common ancestry.", labelX: 430, labelY: 460, targetX: 440, targetY: 360, controlX: 435, controlY: 410, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <path d="M 380 140 C 380 180 520 180 520 220 C 520 260 380 260 380 300 C 380 340 520 340 520 380" fill="none" stroke={C.red} strokeWidth="4" />
        <path d="M 520 140 C 520 180 380 180 380 220 C 380 260 520 260 520 300 C 520 340 380 340 380 380" fill="none" stroke={C.blue} strokeWidth="4" />
        {[150, 190, 230, 270, 310, 350].map((y, i) => (
          <line key={i} x1="380" y1={y} x2="520" y2={y} stroke={C.gray} strokeWidth="2.5" />
        ))}
        <text x="450" y="430" fill={C.gray} fontSize="10" textAnchor="middle">double helix — A=T · G≡C</text>
      </g>
    ),
    branches: [
      br("uc-gen-mendel", "Mendel's Laws", C.green, -60, 1, [
        sub("uc-gen-1", "Segregation & Assortment", "How alleles travel into gametes.", [
          leaf("uc-gen-1a", "Segregation", "Allele pairs split at meiosis I", "F₂ 3:1", "CEE: Anaphase I disjunction IS the law in action.", 1),
          leaf("uc-gen-1b", "Independent assortment", "Non-homologues align freely", "9:3:3:1", "NEB: Metaphase-I orientation produces the ratio.", 2),
        ]),
      ]),
      br("uc-gen-dna", "DNA & Inheritance", C.red, 0, 2, [
        sub("uc-gen-2", "Molecular Genetics", "Structure to replication.", [
          leaf("uc-gen-2a", "Double helix", "Antiparallel complementary strands", "A=T, G≡C", "CEE: Chargaff: %A = %T in every organism.", 1),
          leaf("uc-gen-2b", "Semi-conservative replication", "Each daughter keeps one old strand", "Meselson–Stahl 1958", "NEB: Helicase unwinds; polymerase builds 5'→3'.", 2),
        ]),
      ]),
      br("uc-gen-evo", "Evolution", C.purple, 60, 3, [
        sub("uc-gen-3", "From Variation to Species", "Selection acting on mutation.", [
          leaf("uc-gen-3a", "Natural selection", "Fit phenotypes leave more offspring", "Darwin, 1859", "CEE: Homologous organs = divergent evolution.", 1),
          leaf("uc-gen-3b", "Evidence", "Fossils, homology, embryos", "Common ancestry", "NEB: Miller–Urey: amino acids from a reducing spark.", 2),
        ]),
      ]),
    ],
  },

  /* ═══════════════ MATHEMATICS ═══════════════ */

  "calculus": {
    name: "Limits, Derivatives & Their Geometry",
    summary: "The limit machine, tangent slopes, maxima–minima and the derivative toolkit",
    annotations: [
      { id: "lim", label: "Limit Definition", formulaOrValue: "f′(x) = lim(h→0) [f(x+h) − f(x)]/h", examNote: "CEE: The first-principles derivative of x², sin x, eˣ are exam favourites.", labelX: 120, labelY: 90, targetX: 350, targetY: 190, controlX: 220, controlY: 130, color: C.blue },
      { id: "tang", label: "Tangent Slope", formulaOrValue: "dy/dx = gradient of the tangent line", examNote: "NEB: Normal slope = −1/(dy/dx).", labelX: 660, labelY: 90, targetX: 520, targetY: 190, controlX: 600, controlY: 130, color: C.green },
      { id: "max", label: "Maxima & Minima", formulaOrValue: "f′ = 0, then f″ < 0 max · f″ > 0 min", examNote: "CEE: Second-derivative test settles which one it is.", labelX: 120, labelY: 410, targetX: 350, targetY: 320, controlX: 220, controlY: 390, color: C.amber },
      { id: "chain", label: "Chain / Product / Quotient", formulaOrValue: "(uv)′ = u′v + uv′ · (u/v)′ = (u′v − uv′)/v²", examNote: "NEB: Chain rule inside out: d/dx f(g(x)) = f′(g)·g′.", labelX: 660, labelY: 410, targetX: 520, targetY: 320, controlX: 600, controlY: 390, color: C.red },
      { id: "cont", label: "Continuity First", formulaOrValue: "Differentiable ⟹ continuous (not conversely)", examNote: "CEE: |x| at 0 — continuous, not differentiable.", labelX: 430, labelY: 460, targetX: 440, targetY: 370, controlX: 435, controlY: 415, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <line x1="200" y1="360" x2="700" y2="360" stroke={C.gray} strokeWidth="2" />
        <line x1="200" y1="360" x2="200" y2="110" stroke={C.gray} strokeWidth="2" />
        <path d="M 220 330 Q 400 90 690 180" fill="none" stroke={C.blue} strokeWidth="3.5" />
        <line x1="380" y1="205" x2="500" y2="128" stroke={C.amber} strokeWidth="2.5" />
        <circle cx="440" cy="166" r="6" fill={C.amber} />
        <text x="512" y="122" fill={C.amber} fontSize="10.5" fontWeight="bold">tangent, slope f′</text>
      </g>
    ),
    branches: [
      br("uc-calc-lim", "Limits & Continuity", C.blue, -60, 1, [
        sub("uc-calc-1", "Approaching Values", "The engine under every derivative.", [
          leaf("uc-calc-1a", "Standard limits", "sin x/x → 1 at 0", "lim(x→0) sin x/x = 1", "CEE: (1 + 1/n)ⁿ → e is the growth twin.", 1),
          leaf("uc-calc-1b", "Continuity", "Limit = value at the point", "f(a⁻) = f(a⁺) = f(a)", "NEB: Differentiable ⟹ continuous; corners break only slope.", 2),
        ]),
      ]),
      br("uc-calc-deriv", "Derivatives & Rules", C.green, 0, 2, [
        sub("uc-calc-2", "The Differentiation Toolkit", "Product, quotient, chain.", [
          leaf("uc-calc-2a", "Product & quotient", "Two-term rule pairs", "(uv)′ = u′v + uv′", "CEE: d/dx(x ln x) = ln x + 1 — forget nothing.", 1),
          leaf("uc-calc-2b", "Chain rule", "Outside first, times inside", "dy/dx = f′(g)·g′", "NEB: e^(2x) differentiates to 2e^(2x).", 2),
        ]),
      ]),
      br("uc-calc-app", "Applications", C.amber, 60, 3, [
        sub("uc-calc-3", "Shape of a Function", "Slope, extrema, concavity.", [
          leaf("uc-calc-3a", "Monotonicity", "Rising where f′ > 0", "f′ > 0 up, f′ < 0 down", "CEE: Critical points at f′ = 0 first.", 1),
          leaf("uc-calc-3b", "Second-derivative test", "Curvature decides max/min", "f″ < 0 max · f″ > 0 min", "NEB: Inflection where f″ changes sign.", 2),
        ]),
      ]),
    ],
  },

  "trigonometry": {
    name: "Trigonometric Ratios, Identities & Equations",
    summary: "Unit-circle ratios, the identity family, compound angles and general solutions",
    annotations: [
      { id: "uc", label: "Unit Circle", formulaOrValue: "sin θ = y, cos θ = x, tan θ = y/x", examNote: "CEE: ASTC decides sign; radius 1 makes ratios coordinates.", labelX: 120, labelY: 90, targetX: 360, targetY: 200, controlX: 220, controlY: 140, color: C.blue },
      { id: "pyth", label: "Pythagorean Identities", formulaOrValue: "sin²θ + cos²θ = 1 · 1 + tan²θ = sec²θ", examNote: "NEB: Divide the first by cos²θ to generate the second.", labelX: 660, labelY: 90, targetX: 540, targetY: 200, controlX: 600, controlY: 140, color: C.green },
      { id: "comp", label: "Compound Angles", formulaOrValue: "sin(A ± B) = sinA cosB ± cosA sinB", examNote: "CEE: sin 15° = sin(45° − 30°) — the expansion classic.", labelX: 120, labelY: 400, targetX: 340, targetY: 320, controlX: 210, controlY: 380, color: C.amber },
      { id: "multiple", label: "Multiple Angles", formulaOrValue: "sin2θ = 2 sinθ cosθ · cos2θ = 1 − 2sin²θ", examNote: "NEB: cos2θ has three forms — pick by what the problem holds.", labelX: 660, labelY: 400, targetX: 540, targetY: 320, controlX: 600, controlY: 380, color: C.red },
      { id: "gen", label: "General Solutions", formulaOrValue: "sinθ = 0 → nπ · sinθ = sinα → nπ + (−1)ⁿα", examNote: "CEE: Forgetting (−1)ⁿ is the #1 mark-killer here.", labelX: 430, labelY: 460, targetX: 440, targetY: 360, controlX: 435, controlY: 410, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <circle cx="450" cy="260" r="120" fill="none" stroke={C.slate} strokeWidth="2.5" />
        <line x1="310" y1="260" x2="590" y2="260" stroke={C.gray} strokeWidth="1.6" />
        <line x1="450" y1="140" x2="450" y2="380" stroke={C.gray} strokeWidth="1.6" />
        <line x1="450" y1="260" x2="535" y2="175" stroke={C.blue} strokeWidth="3.5" markerEnd="url(#arrow-cyan)" />
        <line x1="535" y1="175" x2="535" y2="260" stroke={C.amber} strokeWidth="2" strokeDasharray="4 3" />
        <text x="545" y="255" fill={C.amber} fontSize="10">sin θ</text>
        <text x="470" y="300" fill={C.green} fontSize="10">cos θ</text>
        <text x="480" y="200" fill={C.blue} fontSize="11" fontWeight="bold">θ</text>
      </g>
    ),
    branches: [
      br("uc-trig-ratios", "Ratios & the Unit Circle", C.blue, -60, 1, [
        sub("uc-trig-1", "Six Ratios, One Circle", "Coordinates of a rotating arm.", [
          leaf("uc-trig-1a", "Primary ratios", "sin, cos, tan from the arm", "sin θ = y, cos θ = x", "CEE: Sign follows the quadrant (ASTC).", 1),
          leaf("uc-trig-1b", "Reciprocals", "cosec, sec, cot", "csc θ = 1/sin θ", "NEB: Undefined where the parent is zero.", 2),
        ]),
      ]),
      br("uc-trig-id", "Identities", C.green, 0, 2, [
        sub("uc-trig-2", "The Identity Family", "Pythagorean → compound → multiple.", [
          leaf("uc-trig-2a", "Pythagorean set", "Three square identities", "sin²+cos² = 1", "CEE: Divide by cos² to build the tan/sec pair.", 1),
          leaf("uc-trig-2b", "Compound & multiple", "sin(A±B), sin2θ, cos2θ", "sin2θ = 2 sinθ cosθ", "NEB: cos2θ = 1 − 2sin²θ = 2cos²θ − 1.", 2),
        ]),
      ]),
      br("uc-trig-eq", "Equations & Solutions", C.amber, 60, 3, [
        sub("uc-trig-3", "Solving Trig Equations", "Principal value → general family.", [
          leaf("uc-trig-3a", "Principal solutions", "One period's answers", "0 ≤ θ < 2π", "CEE: Sketch the graph to count roots.", 1),
          leaf("uc-trig-3b", "General solutions", "The (−1)ⁿ formula set", "θ = nπ + (−1)ⁿα", "NEB: n ∈ ℤ — the infinite family.", 2),
        ]),
      ]),
    ],
  },
};

/** Resolver: exact unit id first, then topic-keyword refinement across all entries. */
export function getUnitConcept(
  unitId: string,
  topicSlug = "",
  topicTitle = "",
): UnitConcept | undefined {
  const direct = UNIT_CONCEPTS[unitId];
  if (direct) return direct;

  // Keyword pass: a topic may sit in a unit we haven't authored but share a
  // concept with an authored one (e.g. unit aliases, merged units).
  const hay = `${topicSlug} ${topicTitle} ${unitId}`.toLowerCase();
  const KEY_HINTS: Record<string, string[]> = {
    "physical-quantities": ["dimension", "significant", "measurement", "precision", "unit"],
    vectors: ["vector", "resultant", "scalar", "resolution"],
    "work-energy-and-power": ["work", "energy", "power", "conservation"],
    "dc-circuits": ["kirchhoff", "ohm", "wheatstone", "circuit", "resistance"],
    stoichiometry: ["mole", "stoichio", "avogadro", "limiting", "yield"],
    "chemical-bonding-and-shapes-of-molecules": ["bond", "vsepr", "hybrid", "shape", "polar"],
    "biomolecules-and-cell-biology": ["cell", "organelle", "biomolecule", "membrane", "mitochondri"],
    "heredity-and-evolution": ["heredity", "mendel", "dna", "evolution", "genetic"],
    calculus: ["limit", "derivative", "differenti", "maxima", "minima"],
    trigonometry: ["trigonometr", "sin", "cos", "identity", "angle"],
  };
  for (const [uid, hints] of Object.entries(KEY_HINTS)) {
    if (UNIT_CONCEPTS[uid] && hints.some((h) => hay.includes(h))) {
      return UNIT_CONCEPTS[uid];
    }
  }
  return undefined;
}
