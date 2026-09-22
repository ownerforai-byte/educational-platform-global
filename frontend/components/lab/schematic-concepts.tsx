/**
 * Concept Schematic Registry
 * --------------------------
 * Each entry maps a subject + keyword set to its OWN schematic diagram
 * (SVG + labelled annotations). Used by SchematicDiagram so that a topic
 * no longer falls back to a single constant inclined-plane diagram — instead
 * the schematic reflects the topic's actual concept.
 *
 * SVG content is rendered inside the parent <svg viewBox="0 0 900 520"> and may
 * reference the shared arrow markers: #arrow, #arrow-cyan, #arrow-emerald,
 * #arrow-red, #arrow-amber.
 */

import type React from "react";

export interface ConceptAnnotation {
  id: string;
  label: string;
  formulaOrValue?: string;
  examNote: string;
  labelX: number;
  labelY: number;
  targetX: number;
  targetY: number;
  controlX?: number;
  controlY?: number;
  color?: string;
}

export interface ConceptSchematic {
  subject: string;
  name: string;
  keywords: string[];
  annotations: ConceptAnnotation[];
  renderSvg: () => React.ReactNode;
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

export const CONCEPT_SCHEMATICS: ConceptSchematic[] = [
  /* ═══════════════ MATHEMATICS ═══════════════ */
  {
    subject: "mathematics",
    name: "Quadratic Equation & Nature of Roots",
    keywords: ["quadratic", "discriminant", "nature-of-roots", "roots-of-equation"],
    annotations: [
      { id: "root1", label: "Root x₁ = (−b − √Δ)/2a", formulaOrValue: "Left x-intercept of the parabola", examNote: "NEB: Number of real x-intercepts = number of real roots; both come from the discriminant sign.", labelX: 300, labelY: 470, targetX: 360, targetY: 300, controlX: 330, controlY: 390, color: C.green },
      { id: "root2", label: "Root x₂ = (−b + √Δ)/2a", formulaOrValue: "Right x-intercept of the parabola", examNote: "CEE: Vieta — x₁+x₂ = −b/a and x₁x₂ = c/a; no need to find individual roots first.", labelX: 560, labelY: 470, targetX: 540, targetY: 300, controlX: 550, controlY: 390, color: C.green },
      { id: "vertex", label: "Vertex (−b/2a, f(−b/2a))", formulaOrValue: "Turning point; x-axis of symmetry", examNote: "NEB: Vertex x-coordinate = −b/(2a); opening direction set by sign of a (up if a>0).", labelX: 430, labelY: 90, targetX: 450, targetY: 210, controlX: 450, controlY: 150, color: C.amber },
      { id: "disc", label: "Discriminant Δ = b² − 4ac", formulaOrValue: "Δ>0 two roots · Δ=0 equal · Δ<0 complex", examNote: "CEE: The single number that decides the nature of roots — the most-examined quantity in this topic.", labelX: 660, labelY: 150, targetX: 540, targetY: 300, controlX: 620, controlY: 220, color: C.red },
      { id: "axis", label: "x = 0 (y-axis)", formulaOrValue: "y-intercept is c", examNote: "NEB: The curve crosses the y-axis at (0, c) — a fast check when verifying a sketch.", labelX: 200, labelY: 150, targetX: 430, targetY: 200, controlX: 320, controlY: 160, color: C.blue },
    ],
    renderSvg: () => (
      <g>
        <line x1="200" y1="300" x2="700" y2="300" stroke={C.gray} strokeWidth="1.6" markerEnd="url(#arrow)" />
        <line x1="430" y1="60" x2="430" y2="470" stroke={C.gray} strokeWidth="1.6" markerEnd="url(#arrow)" />
        <text x="705" y="295" fill={C.gray} fontSize="11">x</text>
        <text x="438" y="58" fill={C.gray} fontSize="11">f(x)</text>
        {/* parabola (upward) */}
        <path d="M 300 430 Q 450 40 600 430" fill="none" stroke={C.blue} strokeWidth="3" />
        <circle cx="360" cy="300" r="5" fill={C.green} stroke="#fff" strokeWidth="1.5" />
        <circle cx="540" cy="300" r="5" fill={C.green} stroke="#fff" strokeWidth="1.5" />
        <circle cx="450" cy="115" r="5" fill={C.amber} stroke="#fff" strokeWidth="1.5" />
        <line x1="450" y1="90" x2="450" y2="430" stroke={C.amber} strokeWidth="1.2" strokeDasharray="4 4" opacity="0.6" />
      </g>
    ),
  },
  {
    subject: "mathematics",
    name: "Unit Circle & Trigonometric Ratios",
    keywords: ["trigonometric-ratio", "unit-circle", "trigonometry", "sin", "cos", "tan"],
    annotations: [
      { id: "cos", label: "cos θ = x-coordinate", formulaOrValue: "Adjacent side / hypotenuse", examNote: "NEB: On the unit circle the foot of the perpendicular gives cos θ directly.", labelX: 150, labelY: 130, targetX: 300, targetY: 200, controlX: 220, controlY: 170, color: C.green },
      { id: "sin", label: "sin θ = y-coordinate", formulaOrValue: "Opposite side / hypotenuse", examNote: "CEE: sin θ is the height of the point on the circle; 0 ≤ sin θ ≤ 1.", labelX: 640, labelY: 130, targetX: 500, targetY: 200, controlX: 570, controlY: 170, color: C.red },
      { id: "tan", label: "tan θ = sin θ / cos θ", formulaOrValue: "Height / base of the reference triangle", examNote: "NEB: tan θ is undefined at θ = 90° (cos θ = 0) — a frequent trap.", labelX: 640, labelY: 380, targetX: 500, targetY: 320, controlX: 570, controlY: 380, color: C.amber },
      { id: "angle", label: "Angle θ in standard position", formulaOrValue: "Measured from +x-axis, anticlockwise", examNote: "CEE: Negative angles go clockwise; reference angle decides the quadrant signs.", labelX: 300, labelY: 430, targetX: 400, targetY: 300, controlX: 350, controlY: 400, color: C.blue },
      { id: "r", label: "Radius r = 1 (unit circle)", formulaOrValue: "Hypotenuse = 1 → ratios simplify", examNote: "NEB: The whole circle has radius 1 so cos²θ + sin²θ = 1 reads straight off the diagram.", labelX: 150, labelY: 300, targetX: 300, targetY: 320, controlX: 210, controlY: 330, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <line x1="150" y1="300" x2="700" y2="300" stroke={C.gray} strokeWidth="1.6" markerEnd="url(#arrow)" />
        <line x1="400" y1="60" x2="400" y2="470" stroke={C.gray} strokeWidth="1.6" markerEnd="url(#arrow)" />
        <circle cx="400" cy="300" r="160" fill="none" stroke={C.purple} strokeWidth="2.5" />
        <path d="M 500 200 L 400 300" stroke={C.blue} strokeWidth="3" markerEnd="url(#arrow-cyan)" />
        <line x1="500" y1="200" x2="500" y2="300" stroke={C.red} strokeWidth="2.5" />
        <line x1="400" y1="300" x2="500" y2="300" stroke={C.green} strokeWidth="2.5" />
        <path d="M 450 300 A 50 50 0 0 0 440 275" fill="none" stroke={C.amber} strokeWidth="2.5" />
        <text x="455" y="290" fill={C.amber} fontSize="12" fontWeight="bold">θ</text>
      </g>
    ),
  },
  {
    subject: "mathematics",
    name: "Law of Parallelogram of Vectors",
    keywords: ["parallelogram", "law-of-parallelogram", "resultant-vector", "resolution-of-forces"],
    annotations: [
      { id: "a", label: "Vector a⃗ (first side)", formulaOrValue: "Represents one co-terminal force", examNote: "NEB: Adjacent sides from the same point represent the two vectors to be added.", labelX: 200, labelY: 120, targetX: 420, targetY: 300, controlX: 300, controlY: 220, color: C.blue },
      { id: "b", label: "Vector b⃗ (second side)", formulaOrValue: "The other co-terminal force", examNote: "CEE: Draw both from the same origin O so the parallelogram closes correctly.", labelX: 620, labelY: 130, targetX: 500, targetY: 250, controlX: 580, controlY: 200, color: C.red },
      { id: "R", label: "Resultant R = a⃗ + b⃗", formulaOrValue: "R = √(a²+b²+2ab·cosθ)", examNote: "NEB: The DIAGONAL through O gives both magnitude and direction of the resultant.", labelX: 430, labelY: 450, targetX: 460, targetY: 330, controlX: 450, controlY: 400, color: C.green },
      { id: "theta", label: "Angle θ between a⃗ and b⃗", formulaOrValue: "θ=0°→R=a+b · θ=180°→R=|a−b|", examNote: "CEE: Maximum resultant at 0°, minimum at 180°; perpendicular gives √(a²+b²).", labelX: 250, labelY: 360, targetX: 430, targetY: 300, controlX: 340, controlY: 330, color: C.amber },
      { id: "diagonal", label: "Second diagonal (non-resultant)", formulaOrValue: "Represents a⃗ − b⃗ (difference)", examNote: "NEB: Only the diagonal starting at O is the resultant; the other gives the difference.", labelX: 620, labelY: 420, targetX: 520, targetY: 300, controlX: 590, controlY: 380, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <polygon points="400,300 560,220 620,380 460,460" fill={C.blue} fillOpacity="0.06" stroke={C.gray} strokeWidth="1.5" />
        <line x1="400" y1="300" x2="560" y2="220" stroke={C.blue} strokeWidth="3.5" markerEnd="url(#arrow-cyan)" />
        <line x1="400" y1="300" x2="460" y2="460" stroke={C.red} strokeWidth="3.5" markerEnd="url(#arrow-red)" />
        <line x1="400" y1="300" x2="620" y2="380" stroke={C.green} strokeWidth="3.5" markerEnd="url(#arrow-emerald)" />
        <line x1="560" y1="220" x2="620" y2="380" stroke={C.gray} strokeWidth="1.5" strokeDasharray="5 4" />
        <line x1="460" y1="460" x2="620" y2="380" stroke={C.gray} strokeWidth="1.5" strokeDasharray="5 4" />
        <circle cx="400" cy="300" r="4" fill={C.amber} />
      </g>
    ),
  },
  {
    subject: "mathematics",
    name: "Limit & Continuity (Removable Discontinuity)",
    keywords: ["limit", "continuity", "discontinuity", "removable", "left-hand-limit", "right-hand-limit", "standard-limits"],
    annotations: [
      { id: "hole", label: "Hole at x = a (open circle)", formulaOrValue: "f(a) is undefined but the limit exists", examNote: "NEB: An open circle marks a REMOVABLE discontinuity — the two sides still agree.", labelX: 460, labelY: 110, targetX: 450, targetY: 250, controlX: 470, controlY: 190, color: C.red },
      { id: "LHL", label: "Left-hand limit (LHL)", formulaOrValue: "x → a⁻ approaches from below", examNote: "CEE: Trace the curve from the left; the arrow height is the LHL.", labelX: 200, labelY: 340, targetX: 380, targetY: 280, controlX: 290, controlY: 320, color: C.blue },
      { id: "RHL", label: "Right-hand limit (RHL)", formulaOrValue: "x → a⁺ approaches from above", examNote: "CEE: The RHL must equal the LHL for the limit to exist at a.", labelX: 620, labelY: 340, targetX: 520, targetY: 280, controlX: 590, controlY: 320, color: C.green },
      { id: "val", label: "Value of the limit L", formulaOrValue: "LHL = RHL = L", examNote: "NEB: L is the shared height of both one-sided approaches — the y-coordinate of the hole.", labelX: 200, labelY: 150, targetX: 450, targetY: 250, controlX: 320, controlY: 210, color: C.amber },
      { id: "f(a)", label: "f(a) shown separately", formulaOrValue: "A dot below the curve → not continuous", examNote: "CEE: Continuity fails when the filled point ≠ the limit; redefining f(a)=L fixes it.", labelX: 620, labelY: 450, targetX: 450, targetY: 420, controlX: 560, controlY: 430, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <line x1="180" y1="330" x2="720" y2="330" stroke={C.gray} strokeWidth="1.6" markerEnd="url(#arrow)" />
        <line x1="450" y1="90" x2="450" y2="470" stroke={C.gray} strokeWidth="1.6" markerEnd="url(#arrow)" />
        <line x1="450" y1="120" x2="450" y2="460" stroke={C.red} strokeWidth="1.4" strokeDasharray="5 4" opacity="0.5" />
        <path d="M 220 360 Q 450 180 680 360" fill="none" stroke={C.blue} strokeWidth="3" />
        <circle cx="450" cy="255" r="7" fill="none" stroke={C.red} strokeWidth="3" />
        <circle cx="450" cy="420" r="5" fill={C.purple} stroke="#fff" strokeWidth="1.5" />
        <line x1="360" y1="255" x2="450" y2="255" stroke={C.amber} strokeWidth="1.4" strokeDasharray="3 3" />
        <line x1="450" y1="255" x2="560" y2="255" stroke={C.amber} strokeWidth="1.4" strokeDasharray="3 3" />
      </g>
    ),
  },
  {
    subject: "mathematics",
    name: "Matrix, Determinant & Cramer's Rule",
    keywords: ["matrix", "determinant", "cramer", "inverse-matrix", "adjoint"],
    annotations: [
      { id: "a11", label: "a₁₁ = 2", formulaOrValue: "Top-left element", examNote: "NEB: Elements read as a-row-column; the main diagonal a₁₁, a₂₂ leads the determinant.", labelX: 560, labelY: 130, targetX: 600, targetY: 190, controlX: 580, controlY: 160, color: C.blue },
      { id: "det", label: "Determinant |A| = ad − bc", formulaOrValue: "0 → singular (no inverse)", examNote: "CEE: A 2×2 matrix is invertible only when ad − bc ≠ 0 (non-singular).", labelX: 620, labelY: 430, targetX: 560, targetY: 300, controlX: 600, controlY: 380, color: C.red },
      { id: "inv", label: "Inverse A⁻¹ = adj A / |A|", formulaOrValue: "Verify A·A⁻¹ = I", examNote: "NEB: adj A swaps the main diagonal and changes signs of the other two entries.", labelX: 220, labelY: 430, targetX: 380, targetY: 300, controlX: 300, controlY: 380, color: C.green },
      { id: "cramer", label: "Cramer's Rule", formulaOrValue: "x = D₁/D , y = D₂/D", examNote: "CEE: Solve two linear equations by replacing each column with the constant vector.", labelX: 220, labelY: 130, targetX: 360, targetY: 190, controlX: 300, controlY: 160, color: C.amber },
      { id: "diag", label: "Main diagonal", formulaOrValue: "a₁₁ and a₂₂ (top-left to bottom-right)", examNote: "NEB: The determinant is the difference of the two diagonal products (ad − bc).", labelX: 640, labelY: 250, targetX: 470, targetY: 320, controlX: 560, controlY: 300, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        {/* matrix A */}
        <text x="320" y="180" fill={C.gray} fontSize="13">A =</text>
        <line x1="360" y1="170" x2="360" y2="330" stroke={C.slate} strokeWidth="4" />
        <line x1="360" y1="170" x2="540" y2="170" stroke={C.slate} strokeWidth="4" />
        <line x1="360" y1="330" x2="540" y2="330" stroke={C.slate} strokeWidth="4" />
        <line x1="450" y1="170" x2="450" y2="330" stroke={C.gray} strokeWidth="1" />
        <line x1="360" y1="250" x2="540" y2="250" stroke={C.gray} strokeWidth="1" />
        <text x="395" y="220" fill={C.blue} fontSize="22" fontWeight="bold">a</text>
        <text x="480" y="220" fill={C.gray} fontSize="22">b</text>
        <text x="395" y="310" fill={C.gray} fontSize="22">c</text>
        <text x="480" y="310" fill={C.green} fontSize="22" fontWeight="bold">d</text>
        <line x1="368" y1="178" x2="532" y2="322" stroke={C.purple} strokeWidth="1.4" strokeDasharray="5 4" opacity="0.7" />
        {/* determinant */}
        <text x="600" y="290" fill={C.red} fontSize="18" fontWeight="bold">|A| = ad − bc</text>
      </g>
    ),
  },
  /* ═══════════════ PHYSICS ═══════════════ */
  {
    subject: "physics",
    name: "Simple Harmonic Motion & Oscillation",
    keywords: ["simple-harmonic", "harmonic-motion", "oscillation", "periodic-motion", "shm"],
    annotations: [
      { id: "eq", label: "Equilibrium position O", formulaOrValue: "a = 0, v = maximum", examNote: "NEB: At the mean position the restoring force and acceleration vanish; speed is maximum.", labelX: 400, labelY: 470, targetX: 450, targetY: 260, controlX: 430, controlY: 380, color: C.gray },
      { id: "amp", label: "Amplitude A (max displacement)", formulaOrValue: "x = A sin(ωt + φ)", examNote: "CEE: Total energy is constant and proportional to A²; turning points are at ±A.", labelX: 650, labelY: 120, targetX: 640, targetY: 260, controlX: 660, controlY: 190, color: C.red },
      { id: "omega", label: "Angular frequency ω", formulaOrValue: "ω = √(k/m) for a spring", examNote: "NEB: For a SHM the restoring force is F = −kx — proportional and opposite to displacement.", labelX: 200, labelY: 120, targetX: 260, targetY: 260, controlX: 220, controlY: 190, color: C.blue },
      { id: "wave", label: "Displacement–time graph (sine)", formulaOrValue: "Sine curve, period T = 2π/ω", examNote: "CEE: The graph is sinusoidal; one complete cycle takes time T, the period.", labelX: 650, labelY: 430, targetX: 560, targetY: 380, controlX: 620, controlY: 420, color: C.green },
      { id: "force", label: "Restoring force F = −kx", formulaOrValue: "Directed toward O (Hooke's law)", examNote: "NEB: The negative sign is essential — it always points back to equilibrium.", labelX: 200, labelY: 430, targetX: 320, targetY: 380, controlX: 250, controlY: 420, color: C.amber },
    ],
    renderSvg: () => (
      <g>
        <line x1="300" y1="260" x2="620" y2="260" stroke={C.gray} strokeWidth="1.4" strokeDasharray="4 4" />
        <rect x="280" y="230" width="14" height="60" fill={C.slate} />
        <path d="M 294 260 L 320 240 L 350 280 L 380 240 L 410 280 L 440 260" fill="none" stroke={C.blue} strokeWidth="2.5" />
        <rect x="440" y="235" width="44" height="50" rx="6" fill={C.blue} fillOpacity="0.25" stroke={C.blue} strokeWidth="2.5" />
        <text x="452" y="266" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">m</text>
        <line x1="450" y1="200" x2="450" y2="235" stroke={C.red} strokeWidth="2.5" markerEnd="url(#arrow-red)" />
        <text x="455" y="195" fill={C.red} fontSize="11" fontWeight="bold">+A</text>
        {/* displacement-time inset */}
        <line x1="380" y1="400" x2="700" y2="400" stroke={C.gray} strokeWidth="1" />
        <line x1="380" y1="330" x2="380" y2="470" stroke={C.gray} strokeWidth="1" />
        <path d="M 380 400 Q 460 340 540 400 Q 620 460 700 400" fill="none" stroke={C.green} strokeWidth="2.5" />
        <text x="705" y="405" fill={C.gray} fontSize="10">t</text>
        <text x="360" y="326" fill={C.gray} fontSize="10">x</text>
      </g>
    ),
  },
  {
    subject: "physics",
    name: "Electromagnetic Induction & Lenz's Law",
    keywords: ["electromagnetic-induction", "induction", "lenz", "faraday", "mutual-induction", "self-induction"],
    annotations: [
      { id: "magnet", label: "Magnetic pole N moving in", formulaOrValue: "Changing flux through the coil", examNote: "NEB: Induction requires a CHANGE in magnetic flux, not a static field.", labelX: 400, labelY: 90, targetX: 450, targetY: 160, controlX: 430, controlY: 120, color: C.red },
      { id: "coil", label: "Coil / solenoid", formulaOrValue: "N turns multiply the induced emf", examNote: "CEE: emf ∝ N × rate of change of flux linkage.", labelX: 650, labelY: 250, targetX: 520, targetY: 300, controlX: 600, controlY: 280, color: C.blue },
      { id: "emf", label: "Induced emf (Faraday)", formulaOrValue: "ε = −N dΦ/dt", examNote: "NEB: Faraday's first law — a changing flux produces an emf proportional to that rate.", labelX: 200, labelY: 300, targetX: 380, targetY: 300, controlX: 290, controlY: 300, color: C.green },
      { id: "lenz", label: "Lenz's Law (the − sign)", formulaOrValue: "Induced current opposes the change", examNote: "CEE: The minus sign enforces energy conservation — the effect opposes its cause.", labelX: 200, labelY: 440, targetX: 400, targetY: 360, controlX: 300, controlY: 420, color: C.amber },
      { id: "meter", label: "Galvanometer deflection", formulaOrValue: "Affects the sign of the deflection", examNote: "NEB: The direction of deflection reverses as the pole reverses direction.", labelX: 650, labelY: 440, targetX: 480, targetY: 400, controlX: 580, controlY: 420, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <rect x="410" y="90" width="80" height="46" rx="4" fill={C.red} fillOpacity="0.25" stroke={C.red} strokeWidth="2.5" />
        <text x="450" y="118" fill={C.red} fontSize="16" fontWeight="bold" textAnchor="middle">N</text>
        <line x1="450" y1="140" x2="450" y2="190" stroke={C.red} strokeWidth="2.5" markerEnd="url(#arrow-red)" />
        {/* coil */}
        {Array.from({ length: 7 }).map((_, i) => (
          <ellipse key={i} cx={380 + i * 14} cy="300" rx="12" ry="40" fill="none" stroke={C.blue} strokeWidth="2.5" />
        ))}
        <line x1="380" y1="260" x2="380" y2="410" stroke={C.slate} strokeWidth="2.5" />
        <line x1="518" y1="260" x2="518" y2="410" stroke={C.slate} strokeWidth="2.5" />
        <circle cx="450" cy="410" r="24" fill="#0f172a" stroke={C.gray} strokeWidth="2.5" />
        <text x="450" y="406" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">G</text>
        <text x="450" y="420" fill={C.green} fontSize="9" textAnchor="middle">deflect</text>
      </g>
    ),
  },
  {
    subject: "physics",
    name: "Capacitor & RC Discharge",
    keywords: ["capacitor", "capacitance", "rc-circuit", "discharge", "charging-circuit", "parallel-plate"],
    annotations: [
      { id: "plates", label: "Parallel-plate capacitor", formulaOrValue: "C = ε₀A/d (vacuum)", examNote: "NEB: Capacitance ∝ plate area and ∝ 1/dielectric separation.", labelX: 430, labelY: 110, targetX: 450, targetY: 180, controlX: 450, controlY: 145, color: C.blue },
      { id: "Q", label: "Stored charge Q = CV", formulaOrValue: "Energy = ½CV² = ½QV", examNote: "CEE: Doubling V doubles Q but quadruples the stored energy.", labelX: 640, labelY: 180, targetX: 480, targetY: 200, controlX: 580, controlY: 200, color: C.red },
      { id: "v", label: "Applied voltage V", formulaOrValue: "Charges the two plates to ±Q", examNote: "NEB: The cell pushes electrons onto one plate and off the other, building the potential difference.", labelX: 200, labelY: 180, targetX: 380, targetY: 200, controlX: 280, controlY: 200, color: C.amber },
      { id: "decay", label: "Exponential discharge V = V₀e^(−t/RC)", formulaOrValue: "Time constant τ = RC", examNote: "CEE: After one τ the voltage/charge fall to 37%; after 5τ it is essentially zero.", labelX: 640, labelY: 430, targetX: 500, targetY: 400, controlX: 590, controlY: 420, color: C.green },
      { id: "R", label: "Resistor R (discharge path)", formulaOrValue: "Larger R → slower discharge", examNote: "NEB: With R shorted the discharge is fast; in open circuit no current flows.", labelX: 200, labelY: 430, targetX: 400, targetY: 400, controlX: 290, controlY: 420, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <line x1="430" y1="180" x2="430" y2="205" stroke={C.slate} strokeWidth="3" />
        <line x1="470" y1="180" x2="470" y2="205" stroke={C.slate} strokeWidth="3" />
        <line x1="410" y1="205" x2="490" y2="205" stroke={C.blue} strokeWidth="3" />
        <line x1="410" y1="217" x2="490" y2="217" stroke={C.blue} strokeWidth="3" />
        <text x="405" y="185" fill={C.red} fontSize="14" fontWeight="bold">+</text>
        <text x="497" y="227" fill={C.red} fontSize="14" fontWeight="bold">−</text>
        <line x1="430" y1="180" x2="300" y2="180" stroke={C.slate} strokeWidth="2.5" />
        <line x1="470" y1="212" x2="600" y2="212" stroke={C.slate} strokeWidth="2.5" />
        {/* cell */}
        <line x1="280" y1="160" x2="280" y2="200" stroke={C.slate} strokeWidth="2.5" />
        <line x1="292" y1="172" x2="292" y2="188" stroke={C.slate} strokeWidth="2.5" />
        <text x="240" y="185" fill={C.amber} fontSize="12">V</text>
        {/* discharge curve */}
        <line x1="400" y1="400" x2="720" y2="400" stroke={C.gray} strokeWidth="1" />
        <line x1="400" y1="330" x2="400" y2="440" stroke={C.gray} strokeWidth="1" />
        <path d="M 400 340 Q 470 360 560 385 Q 660 400 720 402" fill="none" stroke={C.green} strokeWidth="2.5" />
        <text x="725" y="405" fill={C.gray} fontSize="10">t</text>
        <text x="384" y="332" fill={C.gray} fontSize="10">V</text>
      </g>
    ),
  },
  {
    subject: "physics",
    name: "Thermodynamics & Carnot Cycle",
    keywords: ["thermodynamics", "carnot", "heat-engine", "entropy", "first-law", "second-law", "work-done-by-gas"],
    annotations: [
      { id: "isoH", label: "Isothermal expansion (hot)", formulaOrValue: "Q_H absorbed at T_H, W = nRT_H ln(V₂/V₁)", examNote: "NEB: During an isothermal step the gas stays at constant temperature while it does work.", labelX: 640, labelY: 150, targetX: 640, targetY: 180, controlX: 660, controlY: 165, color: C.red },
      { id: "adH", label: "Adiabatic expansion", formulaOrValue: "No heat; T falls to T_C", examNote: "CEE: Adiabatic = no heat exchange; expansion cools the gas.", labelX: 660, labelY: 330, targetX: 560, targetY: 300, controlX: 620, controlY: 330, color: C.amber },
      { id: "isoC", label: "Isothermal compression (cold)", formulaOrValue: "Q_C rejected at T_C", examNote: "NEB: The gas gives heat to the cold reservoir while being compressed.", labelX: 250, labelY: 380, targetX: 340, targetY: 360, controlX: 300, controlY: 380, color: C.blue },
      { id: "eta", label: "Efficiency η = 1 − T_C/T_H", formulaOrValue: "Area inside the loop = net work", examNote: "CEE: Carnot efficiency depends only on the two temperatures, not the working fluid.", labelX: 200, labelY: 130, targetX: 400, targetY: 240, controlX: 300, controlY: 180, color: C.green },
      { id: "adC", label: "Adiabatic compression", formulaOrValue: "T rises back to T_H (cycle closes)", examNote: "NEB: Compression adiabatically reheats the gas to complete the cycle.", labelX: 660, labelY: 460, targetX: 480, targetY: 400, controlX: 590, controlY: 440, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <line x1="250" y1="440" x2="700" y2="440" stroke={C.gray} strokeWidth="1.6" markerEnd="url(#arrow)" />
        <line x1="250" y1="440" x2="250" y2="80" stroke={C.gray} strokeWidth="1.6" markerEnd="url(#arrow)" />
        <text x="705" y="445" fill={C.gray} fontSize="11">V</text>
        <text x="235" y="78" fill={C.gray} fontSize="11">P</text>
        <path d="M 340 180 C 560 160 640 220 620 300 C 560 360 420 380 340 360 C 300 340 300 200 340 180 Z" fill={C.green} fillOpacity="0.08" stroke={C.slate} strokeWidth="2.5" />
        <circle cx="340" cy="180" r="5" fill={C.red} />
        <circle cx="620" cy="300" r="5" fill={C.amber} />
        <circle cx="340" cy="360" r="5" fill={C.blue} />
        <circle cx="620" cy="230" r="5" fill={C.purple} />
      </g>
    ),
  },
  {
    subject: "physics",
    name: "Wave Propagation",
    keywords: ["wave", "transverse-wave", "longitudinal-wave", "wavelength", "frequency", "wave-motion"],
    annotations: [
      { id: "crest", label: "Crest (maximum displacement)", formulaOrValue: "Highest point of the wave", examNote: "NEB: A transverse wave displaces the medium perpendicular to its travel direction.", labelX: 640, labelY: 120, targetX: 600, targetY: 200, controlX: 640, controlY: 165, color: C.red },
      { id: "trough", label: "Trough (minimum displacement)", formulaOrValue: "Lowest point of the wave", examNote: "CEE: The distance from crest to adjacent crest is one wavelength λ.", labelX: 250, labelY: 430, targetX: 300, targetY: 380, controlX: 260, controlY: 410, color: C.blue },
      { id: "lambda", label: "Wavelength λ", formulaOrValue: "One full cycle of the wave", examNote: "NEB: v = fλ links speed, frequency and wavelength for any periodic wave.", labelX: 430, labelY: 470, targetX: 450, targetY: 300, controlX: 450, controlY: 420, color: C.amber },
      { id: "v", label: "Wave travels in +x", formulaOrValue: "Medium oscillates, energy is carried", examNote: "CEE: In a transverse wave the particles do not travel with the wave — they only oscillate.", labelX: 650, labelY: 440, targetX: 560, targetY: 340, controlX: 620, controlY: 420, color: C.green },
      { id: "eq", label: "Equilibrium line", formulaOrValue: "Midline of the oscillation", examNote: "NEB: Amplitude is the maximum distance from this midline.", labelX: 200, labelY: 150, targetX: 300, targetY: 290, controlX: 240, controlY: 220, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <line x1="180" y1="300" x2="720" y2="300" stroke={C.gray} strokeWidth="1.4" strokeDasharray="4 4" />
        <path d="M 200 300 Q 275 190 350 300 T 500 300 T 650 300" fill="none" stroke={C.green} strokeWidth="3" />
        <line x1="350" y1="300" x2="500" y2="300" stroke={C.amber} strokeWidth="2" markerEnd="url(#arrow-amber)" markerStart="url(#arrow-amber)" />
        <circle cx="450" cy="215" r="5" fill={C.red} />
        <circle cx="525" cy="385" r="5" fill={C.blue} />
      </g>
    ),
  },
  /* ═══════════════ CHEMISTRY ═══════════════ */
  {
    subject: "chemistry",
    name: "Chemical Equilibrium & Le Chatelier's Principle",
    keywords: ["chemical-equilibrium", "equilibrium", "le-chatelier", "reaction-quotient", "equilibrium-constant"],
    annotations: [
      { id: "fwd", label: "Forward reaction (→ products)", formulaOrValue: "Speeds up when reactants are added", examNote: "NEB: At equilibrium the forward and reverse rates are equal — but neither is zero.", labelX: 200, labelY: 180, targetX: 380, targetY: 250, controlX: 300, controlY: 220, color: C.blue },
      { id: "rev", label: "Reverse reaction (← reactants)", formulaOrValue: "Favoured when products accumulate", examNote: "CEE: Equilibrium is DYNAMIC — both directions keep occurring.", labelX: 640, labelY: 340, targetX: 480, targetY: 300, controlX: 590, controlY: 320, color: C.red },
      { id: "K", label: "Equilibrium constant K_c", formulaOrValue: "K = [products]/[reactants] (powers)", examNote: "NEB: K depends only on temperature; changing concentration shifts position but not K.", labelX: 640, labelY: 150, targetX: 480, targetY: 250, controlX: 590, controlY: 200, color: C.green },
      { id: "pressure", label: "Le Chatelier — pressure", formulaOrValue: "Shifts toward fewer gas moles", examNote: "CEE: Raising pressure favours the side with fewer moles of gas.", labelX: 200, labelY: 440, targetX: 400, targetY: 320, controlX: 300, controlY: 400, color: C.amber },
      { id: "temp", label: "Le Chatelier — temperature", formulaOrValue: "Heat acts as a 'reactant' (endothermic side)", examNote: "NEB: Raising temperature favours the endothermic direction; K changes with T.", labelX: 640, labelY: 440, targetX: 480, targetY: 320, controlX: 590, controlY: 400, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <line x1="300" y1="300" x2="600" y2="300" stroke={C.slate} strokeWidth="2.5" />
        <line x1="450" y1="300" x2="450" y2="360" stroke={C.slate} strokeWidth="3" />
        <line x1="360" y1="360" x2="540" y2="360" stroke={C.slate} strokeWidth="3" />
        <line x1="330" y1="285" x2="330" y2="200" stroke={C.slate} strokeWidth="2.5" />
        <line x1="570" y1="285" x2="570" y2="200" stroke={C.slate} strokeWidth="2.5" />
        <circle cx="330" cy="240" r="40" fill={C.blue} fillOpacity="0.2" stroke={C.blue} strokeWidth="2.5" />
        <text x="330" y="245" fill={C.blue} fontSize="13" fontWeight="bold" textAnchor="middle">Reactants</text>
        <circle cx="570" cy="240" r="40" fill={C.red} fillOpacity="0.2" stroke={C.red} strokeWidth="2.5" />
        <text x="570" y="245" fill={C.red} fontSize="13" fontWeight="bold" textAnchor="middle">Products</text>
        <path d="M 370 250 L 520 250 M 520 250 L 505 242 M 520 250 L 505 258" stroke={C.blue} strokeWidth="3" fill="none" markerEnd="url(#arrow-cyan)" />
        <path d="M 530 300 L 380 300 M 380 300 L 395 292 M 380 300 L 395 308" stroke={C.red} strokeWidth="3" fill="none" markerEnd="url(#arrow-red)" />
      </g>
    ),
  },
  {
    subject: "chemistry",
    name: "Standard Electrode Potential & Electrochemical Series",
    keywords: ["electrode-potential", "standard-potential", "electrochemical-series", "emf", "redox", "cell-potential"],
    annotations: [
      { id: "top", label: "Stronger reducing agent (top)", formulaOrValue: "More negative E° → oxidised easily", examNote: "NEB: The top of the series (most negative E°) is the strongest reducing agent.", labelX: 640, labelY: 110, targetX: 520, targetY: 130, controlX: 600, controlY: 120, color: C.red },
      { id: "bottom", label: "Stronger oxidising agent (bottom)", formulaOrValue: "More positive E° → reduced easily", examNote: "CEE: The bottom (most positive E°) is the strongest oxidising agent.", labelX: 640, labelY: 430, targetX: 520, targetY: 410, controlX: 600, controlY: 420, color: C.blue },
      { id: "scale", label: "E° scale (V)", formulaOrValue: "From negative (top) to positive (bottom)", examNote: "NEB: A species above can reduce a species below it in the series.", labelX: 200, labelY: 270, targetX: 360, targetY: 270, controlX: 290, controlY: 270, color: C.green },
      { id: "pair", label: "Redox couples (M²⁺/M)", formulaOrValue: "Each line is a reversible couple", examNote: "CEE: Writing the couple shows the two forms the element can exist in.", labelX: 200, labelY: 150, targetX: 380, targetY: 150, controlX: 300, controlY: 150, color: C.amber },
      { id: "emf", label: "Cell emf = E°(cathode) − E°(anode)", formulaOrValue: "Positive emf → spontaneous", examNote: "NEB: A positive standard emf means the reaction as written is spontaneous.", labelX: 200, labelY: 430, targetX: 380, targetY: 410, controlX: 300, controlY: 420, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <line x1="400" y1="120" x2="400" y2="420" stroke={C.slate} strokeWidth="2.5" markerEnd="url(#arrow)" />
        <text x="392" y="110" fill={C.red} fontSize="11" textAnchor="end">−</text>
        <text x="392" y="435" fill={C.blue} fontSize="11" textAnchor="end">+</text>
        <line x1="400" y1="400" x2="560" y2="400" stroke={C.gray} strokeWidth="1.4" strokeDasharray="4 4" />
        <line x1="400" y1="270" x2="560" y2="270" stroke={C.gray} strokeWidth="1.4" strokeDasharray="4 4" />
        <line x1="400" y1="140" x2="560" y2="140" stroke={C.gray} strokeWidth="1.4" strokeDasharray="4 4" />
        <text x="430" y="137" fill={C.red} fontSize="12" fontWeight="bold">strongest Red</text>
        <text x="430" y="267" fill={C.green} fontSize="12" fontWeight="bold">M²⁺/M couple</text>
        <text x="430" y="397" fill={C.blue} fontSize="12" fontWeight="bold">strongest Ox</text>
      </g>
    ),
  },
  {
    subject: "chemistry",
    name: "VSEPR Theory & Molecular Shape",
    keywords: ["vsepr", "molecular-shape", "shape-of-molecule", "lone-pair", "bond-angle", "hybridisation"],
    annotations: [
      { id: "central", label: "Central atom (A)", formulaOrValue: "Count total electron domains", examNote: "NEB: VSEPR arranges electron domains to minimise repulsion around the central atom.", labelX: 430, labelY: 470, targetX: 450, targetY: 320, controlX: 450, controlY: 400, color: C.blue },
      { id: "bp", label: "Bonding pairs (A–X)", formulaOrValue: "Shared electron pairs to each atom", examNote: "CEE: Each terminal atom X supplies one bonding pair; count these as the 'AX' term.", labelX: 200, labelY: 150, targetX: 380, targetY: 280, controlX: 290, controlY: 210, color: C.green },
      { id: "lp", label: "Lone pairs (n)", formulaOrValue: "Non-bonding pairs on the central atom", examNote: "NEB: Lone pairs repel more strongly and compress the bond angles.", labelX: 640, labelY: 150, targetX: 500, targetY: 300, controlX: 600, controlY: 200, color: C.red },
      { id: "angle", label: "Bond angle (ideal)", formulaOrValue: "e.g. 109.5° (tetra), 104.5° (H₂O)", examNote: "CEE: H₂O is 104.5° and NH₃ is 107° — both compressed from 109.5° by lone-pair repulsion.", labelX: 640, labelY: 430, targetX: 500, targetY: 350, controlX: 600, controlY: 410, color: C.amber },
      { id: "axn", label: "AXₙEₘ notation", formulaOrValue: "A=central, X=bonded, E=lone pair", examNote: "NEB: The AXE notation (e.g. AX₂E₂) directly names the molecular shape.", labelX: 200, labelY: 430, targetX: 400, targetY: 350, controlX: 300, controlY: 410, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <circle cx="450" cy="320" r="42" fill={C.blue} fillOpacity="0.25" stroke={C.blue} strokeWidth="2.5" />
        <text x="450" y="326" fill="#fff" fontSize="18" fontWeight="bold" textAnchor="middle">A</text>
        <line x1="450" y1="320" x2="300" y2="270" stroke={C.green} strokeWidth="4" />
        <circle cx="285" cy="265" r="20" fill={C.green} fillOpacity="0.3" stroke={C.green} strokeWidth="2" />
        <line x1="450" y1="320" x2="600" y2="270" stroke={C.green} strokeWidth="4" />
        <circle cx="615" cy="265" r="20" fill={C.green} fillOpacity="0.3" stroke={C.green} strokeWidth="2" />
        <ellipse cx="450" cy="392" rx="14" ry="26" fill="none" stroke={C.red} strokeWidth="2.5" strokeDasharray="4 3" />
        <path d="M 400 300 A 60 60 0 0 0 500 300" fill="none" stroke={C.amber} strokeWidth="2" />
        <text x="455" y="288" fill={C.amber} fontSize="11">θ</text>
      </g>
    ),
  },
  {
    subject: "chemistry",
    name: "Periodic Trends — Atomic Radius & Ionisation",
    keywords: ["periodic-trend", "atomic-radius", "ionization-energy", "ionisation", "electronegativity", "periodic-table", "periodicity"],
    annotations: [
      { id: "down", label: "Atomic radius increases down a group", formulaOrValue: "Extra shells → larger atom", examNote: "NEB: Down a group each period adds a shell, so the radius grows.", labelX: 200, labelY: 440, targetX: 300, targetY: 400, controlX: 250, controlY: 430, color: C.blue },
      { id: "right", label: "Atomic radius decreases across a period", formulaOrValue: "More protons pull the shell in", examNote: "CEE: Moving right, nuclear charge rises while the shell stays the same → smaller radius.", labelX: 640, labelY: 150, targetX: 540, targetY: 190, controlX: 600, controlY: 170, color: C.red },
      { id: "ie", label: "Ionisation energy rises across a period", formulaOrValue: "Tighter hold on outer electron", examNote: "NEB: IE follows the same direction as the decreasing radius (across a period).", labelX: 200, labelY: 150, targetX: 360, targetY: 190, controlX: 280, controlY: 170, color: C.green },
      { id: "en", label: "Electronegativity highest at F", formulaOrValue: "Maximised at the top-right (Fluorine)", examNote: "CEE: Electronegativity increases left→right and bottom→top; F is the most electronegative.", labelX: 640, labelY: 430, targetX: 560, targetY: 400, controlX: 600, controlY: 420, color: C.amber },
      { id: "z", label: "Effective nuclear charge Z_eff", formulaOrValue: "Drives every periodic trend", examNote: "NEB: Z_eff rises across a period and is the root cause of all four trends above.", labelX: 430, labelY: 470, targetX: 450, targetY: 340, controlX: 450, controlY: 420, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <line x1="240" y1="440" x2="680" y2="440" stroke={C.gray} strokeWidth="1.6" markerEnd="url(#arrow)" />
        <line x1="240" y1="440" x2="240" y2="90" stroke={C.gray} strokeWidth="1.6" markerEnd="url(#arrow)" />
        <text x="685" y="445" fill={C.gray} fontSize="10">period →</text>
        <text x="228" y="85" fill={C.gray} fontSize="10" textAnchor="end">group ↓</text>
        <path d="M 280 400 L 620 200" stroke={C.blue} strokeWidth="3" markerEnd="url(#arrow-cyan)" opacity="0.8" />
        <text x="430" y="280" fill={C.blue} fontSize="11">radius ↓ across, ↑ down</text>
        <path d="M 300 190 L 620 380" stroke={C.green} strokeWidth="2.5" markerEnd="url(#arrow-emerald)" opacity="0.8" strokeDasharray="5 4" />
      </g>
    ),
  },
  {
    subject: "chemistry",
    name: "Organic Reaction Mechanism (SN1 / SN2)",
    keywords: ["organic-chemistry", "substitution", "sn1", "sn2", "mechanism", "nucleophile", "functional-group"],
    annotations: [
      { id: "substrate", label: "Substrate R–X (alkyl halide)", formulaOrValue: "The carbon bears the leaving group X", examNote: "NEB: X⁻ is the leaving group; the carbon with the C–X bond is the reaction centre.", labelX: 430, labelY: 470, targetX: 450, targetY: 330, controlX: 450, controlY: 400, color: C.blue },
      { id: "nucl", label: "Nucleophile :Nu⁻ (electron-rich)", formulaOrValue: "Attacks the δ⁺ carbon", examNote: "CEE: The nucleophile carries a lone pair or negative charge and seeks positive charge.", labelX: 200, labelY: 150, targetX: 380, targetY: 300, controlX: 290, controlY: 220, color: C.green },
      { id: "carbon", label: "δ⁺ electrophilic carbon", formulaOrValue: "Partially positive due to C–X", examNote: "NEB: The polar C–X bond makes the carbon electrophilic — the target of attack.", labelX: 640, labelY: 150, targetX: 520, targetY: 310, controlX: 600, controlY: 220, color: C.red },
      { id: "tg", label: "Transition state / intermediate", formulaOrValue: "SN2 one-step; SN1 via carbocation", examNote: "CEE: SN2 is concerted (backside attack); SN1 forms a carbocation first.", labelX: 640, labelY: 430, targetX: 500, targetY: 350, controlX: 600, controlY: 410, color: C.amber },
      { id: "rate", label: "Rate law", formulaOrValue: "SN2 ∝[R–X][Nu] · SN1 ∝[R–X]", examNote: "NEB: The rate equation reveals whether one or two species are in the rate-determining step.", labelX: 200, labelY: 430, targetX: 400, targetY: 350, controlX: 300, controlY: 410, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <circle cx="450" cy="330" r="46" fill={C.blue} fillOpacity="0.22" stroke={C.blue} strokeWidth="2.5" />
        <text x="450" y="336" fill={C.blue} fontSize="20" fontWeight="bold" textAnchor="middle">C</text>
        <line x1="450" y1="284" x2="450" y2="230" stroke={C.slate} strokeWidth="3" />
        <circle cx="450" cy="220" r="20" fill={C.red} fillOpacity="0.25" stroke={C.red} strokeWidth="2" />
        <text x="450" y="226" fill={C.red} fontSize="14" fontWeight="bold" textAnchor="middle">X</text>
        <path d="M 300 250 Q 380 300 420 320" fill="none" stroke={C.green} strokeWidth="3" markerEnd="url(#arrow-emerald)" />
        <text x="270" y="245" fill={C.green} fontSize="13" fontWeight="bold">:Nu⁻</text>
        <path d="M 450 376 L 450 430 M 450 430 L 435 422 M 450 430 L 465 422" stroke={C.red} strokeWidth="2.5" fill="none" markerEnd="url(#arrow-red)" />
      </g>
    ),
  },
  /* ═══════════════ BIOLOGY ═══════════════ */
  {
    subject: "biology",
    name: "Heart Structure & Cardiac Cycle",
    keywords: ["heart", "cardiac", "double-circulation", "blood-vessel", "pulse"],
    annotations: [
      { id: "ra", label: "Right Atrium (RA)", formulaOrValue: "Receives deoxygenated blood from body", examNote: "NEB: The right side of the heart deals with deoxygenated (body) blood.", labelX: 300, labelY: 110, targetX: 380, targetY: 190, controlX: 340, controlY: 150, color: C.red },
      { id: "la", label: "Left Atrium (LA)", formulaOrValue: "Receives oxygenated blood from lungs", examNote: "CEE: The left side is separated from the right by the interventricular septum.", labelX: 600, labelY: 110, targetX: 520, targetY: 190, controlX: 560, controlY: 150, color: C.blue },
      { id: "rv", label: "Right Ventricle (RV)", formulaOrValue: "Pumps to the lungs (low pressure)", examNote: "NEB: RV walls are thinner than LV walls — it only pumps to the lungs.", labelX: 300, labelY: 450, targetX: 380, targetY: 340, controlX: 340, controlY: 400, color: C.red },
      { id: "lv", label: "Left Ventricle (LV)", formulaOrValue: "Pumps to the body (high pressure)", examNote: "CEE: The LV has the thickest wall — it drives the systemic circuit.", labelX: 600, labelY: 450, targetX: 520, targetY: 340, controlX: 560, controlY: 400, color: C.blue },
      { id: "valve", label: "Valves (bicuspid/tricuspid)", formulaOrValue: "Prevent backflow of blood", examNote: "NEB: AV valves keep blood moving forward; their closure makes the 'lub' heart sound.", labelX: 450, labelY: 270, targetX: 450, targetY: 260, controlX: 450, controlY: 240, color: C.green },
    ],
    renderSvg: () => (
      <g>
        <path d="M 450 160 C 340 160 320 300 400 380 L 450 430 L 500 380 C 580 300 560 160 450 160 Z" fill={C.red} fillOpacity="0.08" stroke={C.slate} strokeWidth="3" />
        <line x1="450" y1="180" x2="450" y2="410" stroke={C.gray} strokeWidth="2" strokeDasharray="4 3" />
        <line x1="380" y1="270" x2="520" y2="270" stroke={C.gray} strokeWidth="2" strokeDasharray="4 3" />
        <path d="M 400 150 Q 380 120 400 100" fill="none" stroke={C.amber} strokeWidth="2.5" />
        <path d="M 500 150 Q 520 120 500 100" fill="none" stroke={C.amber} strokeWidth="2.5" />
      </g>
    ),
  },
  {
    subject: "biology",
    name: "Neuron & Reflex Arc",
    keywords: ["nerve", "neuron", "reflex-arc", "impulse", "neuro", "nervous"],
    annotations: [
      { id: "receptor", label: "Receptor (sensory)", formulaOrValue: "Detects the stimulus", examNote: "NEB: Sensory receptors are the entry point of a reflex arc — e.g. in the skin.", labelX: 150, labelY: 150, targetX: 250, targetY: 260, controlX: 200, controlY: 190, color: C.green },
      { id: "sensory", label: "Sensory (afferent) neuron", formulaOrValue: "Carries the impulse TO the CNS", examNote: "CEE: Afferent fibres bring information toward the central nervous system.", labelX: 300, labelY: 120, targetX: 400, targetY: 260, controlX: 350, controlY: 180, color: C.blue },
      { id: "cns", label: "Integration centre (spinal cord)", formulaOrValue: "Interneurons relay the signal", examNote: "NEB: In a reflex, the spinal cord coordinates the response without waiting for the brain.", labelX: 450, labelY: 440, targetX: 470, targetY: 300, controlX: 470, controlY: 380, color: C.amber },
      { id: "motor", label: "Motor (efferent) neuron", formulaOrValue: "Carries the impulse AWAY to the effector", examNote: "CEE: Efferent fibres leave the CNS to reach a muscle or gland.", labelX: 600, labelY: 120, targetX: 560, targetY: 260, controlX: 580, controlY: 180, color: C.red },
      { id: "effector", label: "Effector (muscle / gland)", formulaOrValue: "Produces the response", examNote: "NEB: The effector is where the reflex actually happens (e.g. withdrawal of the hand).", labelX: 700, labelY: 440, targetX: 620, targetY: 300, controlX: 670, controlY: 380, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <circle cx="250" cy="260" r="18" fill={C.green} fillOpacity="0.3" stroke={C.green} strokeWidth="2.5" />
        <line x1="268" y1="260" x2="430" y2="300" stroke={C.blue} strokeWidth="3" markerEnd="url(#arrow-cyan)" />
        <circle cx="470" cy="300" r="34" fill={C.amber} fillOpacity="0.25" stroke={C.amber} strokeWidth="2.5" />
        <text x="470" y="305" fill={C.amber} fontSize="12" fontWeight="bold" textAnchor="middle">CNS</text>
        <line x1="505" y1="300" x2="640" y2="270" stroke={C.red} strokeWidth="3" markerEnd="url(#arrow-red)" />
        <circle cx="640" cy="270" r="18" fill={C.purple} fillOpacity="0.3" stroke={C.purple} strokeWidth="2.5" />
      </g>
    ),
  },
  {
    subject: "biology",
    name: "Cell Division — Mitosis / Meiosis",
    keywords: ["cell-division", "mitosis", "meiosis", "cell-cycle", "chromosome"],
    annotations: [
      { id: "interphase", label: "Interphase (DNA replication)", formulaOrValue: "Each chromosome → two sister chromatids", examNote: "NEB: The S-phase duplicates DNA, so each centromere holds two chromatids before division.", labelX: 180, labelY: 130, targetX: 300, targetY: 260, controlX: 230, controlY: 190, color: C.blue },
      { id: "metaphase", label: "Metaphase (alignment)", formulaOrValue: "Chromosomes line up at the equator", examNote: "CEE: In mitosis the pairs align single; in meiosis-I the homologues pair (bivalent).", labelX: 450, labelY: 90, targetX: 450, targetY: 250, controlX: 450, controlY: 170, color: C.green },
      { id: "anaphase", label: "Anaphase (separation)", formulaOrValue: "Chromatids / homologues are pulled apart", examNote: "NEB: Spindle fibres shorten and drag the separated chromosomes to opposite poles.", labelX: 720, labelY: 130, targetX: 600, targetY: 260, controlX: 670, controlY: 190, color: C.red },
      { id: "spindle", label: "Spindle / centrioles", formulaOrValue: "Microtubules from the poles", examNote: "CEE: The spindle is what actually moves the chromosomes; it forms from the poles.", labelX: 450, labelY: 440, targetX: 450, targetY: 330, controlX: 450, controlY: 390, color: C.amber },
      { id: "result", label: "Result — 4 haploid / 2 diploid", formulaOrValue: "Meiosis halves; mitosis copies", examNote: "NEB: Meiosis gives 4 haploid cells (recombination); mitosis gives 2 identical diploid cells.", labelX: 450, labelY: 470, targetX: 450, targetY: 380, controlX: 450, controlY: 430, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <ellipse cx="450" cy="300" rx="240" ry="150" fill="none" stroke={C.slate} strokeWidth="3" />
        <line x1="450" y1="150" x2="450" y2="450" stroke={C.gray} strokeWidth="1.4" strokeDasharray="4 4" />
        <path d="M 420 250 L 420 350 M 420 300 L 440 260 M 420 300 L 440 340" stroke={C.green} strokeWidth="4" fill="none" />
        <path d="M 480 250 L 480 350 M 480 300 L 460 260 M 480 300 L 460 340" stroke={C.red} strokeWidth="4" fill="none" />
        <circle cx="210" cy="300" r="12" fill={C.blue} />
        <circle cx="690" cy="300" r="12" fill={C.blue} />
      </g>
    ),
  },
  {
    subject: "biology",
    name: "Angiosperm Flower & Double Fertilisation",
    keywords: ["flower", "angiosperm", "pollination", "fertilisation", "seed-formation", "reproductive-parts"],
    annotations: [
      { id: "stigma", label: "Stigma (receives pollen)", formulaOrValue: "Sticky tip of the female organ", examNote: "NEB: The stigma captures pollen; a pollen tube then grows down the style.", labelX: 640, labelY: 110, targetX: 500, targetY: 150, controlX: 590, controlY: 130, color: C.green },
      { id: "style", label: "Style (pollen-tube path)", formulaOrValue: "Tube grows to the ovule", examNote: "CEE: The pollen tube carries two male nuclei down to the ovule.", labelX: 200, labelY: 130, targetX: 420, targetY: 200, controlX: 300, controlY: 170, color: C.blue },
      { id: "ovary", label: "Ovary (houses ovules)", formulaOrValue: "Develops into the fruit", examNote: "NEB: After fertilisation the ovary becomes the fruit and the ovule the seed.", labelX: 640, labelY: 440, targetX: 500, targetY: 380, controlX: 600, controlY: 420, color: C.amber },
      { id: "ovule", label: "Ovule (female gamete)", formulaOrValue: "Has egg cell + polar nucleus", examNote: "CEE: Double fertilisation — one sperm fuses with the egg, one with the polar nucleus.", labelX: 200, labelY: 440, targetX: 420, targetY: 380, controlX: 300, controlY: 420, color: C.red },
      { id: "anther", label: "Anther (produces pollen)", formulaOrValue: "Male organ — microspores", examNote: "NEB: The anther is the source of the male gametes (pollen grains).", labelX: 450, labelY: 90, targetX: 450, targetY: 130, controlX: 450, controlY: 110, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <path d="M 450 130 L 450 420" stroke={C.blue} strokeWidth="3" />
        <path d="M 450 130 Q 520 130 500 200 M 450 130 Q 380 130 400 200" fill="none" stroke={C.green} strokeWidth="2.5" />
        <path d="M 420 420 Q 400 470 460 480 Q 520 470 500 420 Z" fill={C.amber} fillOpacity="0.25" stroke={C.amber} strokeWidth="2.5" />
        <ellipse cx="450" cy="380" rx="46" ry="34" fill="none" stroke={C.red} strokeWidth="2.5" />
        <circle cx="450" cy="380" r="8" fill={C.red} fillOpacity="0.3" stroke={C.red} strokeWidth="1.5" />
        <circle cx="450" cy="126" r="8" fill={C.purple} fillOpacity="0.3" stroke={C.purple} strokeWidth="2" />
        <circle cx="505" cy="150" r="7" fill={C.green} stroke={C.green} strokeWidth="2" />
      </g>
    ),
  },
  {
    subject: "biology",
    name: "Small Intestine — Digestion & Absorption",
    keywords: ["digestion", "small-intestine", "absorption", "villus", "pancreas", "liver", "amylase"],
    annotations: [
      { id: "villus", label: "Villus (absorption site)", formulaOrValue: "Finger-like projection ↑ surface area", examNote: "NEB: Villi make the inner wall enormously large for nutrient absorption.", labelX: 640, labelY: 130, targetX: 520, targetY: 220, controlX: 600, controlY: 180, color: C.green },
      { id: "capillary", label: "Capillaries (to liver)", formulaOrValue: "Carry absorbed sugar/amino acids", examNote: "CEE: Absorbed nutrients reach the hepatic portal vein before the general circulation.", labelX: 200, labelY: 130, targetX: 380, targetY: 260, controlX: 290, controlY: 200, color: C.red },
      { id: "lacteal", label: "Lacteal (to lymph)", formulaOrValue: "Absorbs fats as chylomicrons", examNote: "NEB: Fat is absorbed into the central lacteal, not the blood capillaries.", labelX: 450, labelY: 450, targetX: 450, targetY: 360, controlX: 450, controlY: 410, color: C.blue },
      { id: "secre", label: "Enzymes (trypsin, amylase)", formulaOrValue: "Pancreatic & brush-border enzymes", examNote: "CEE: Proteins → amino acids (pepsin, trypsin); starch → glucose (amylase).", labelX: 640, labelY: 440, targetX: 520, targetY: 360, controlX: 600, controlY: 410, color: C.amber },
      { id: "wall", label: "Inner mucosa (mucus)", formulaOrValue: "Goblet cells protect the wall", examNote: "NEB: Goblet cells secrete mucus that coats and protects the intestinal lining.", labelX: 200, labelY: 440, targetX: 380, targetY: 360, controlX: 290, controlY: 410, color: C.purple },
    ],
    renderSvg: () => (
      <g>
        <path d="M 350 460 L 350 180 Q 450 120 550 180 L 550 460" fill={C.green} fillOpacity="0.06" stroke={C.slate} strokeWidth="3" />
        <line x1="450" y1="180" x2="450" y2="460" stroke={C.blue} strokeWidth="3" />
        <line x1="410" y1="200" x2="410" y2="440" stroke={C.red} strokeWidth="2" />
        <line x1="490" y1="200" x2="490" y2="440" stroke={C.red} strokeWidth="2" />
        <path d="M 380 240 L 400 240 M 380 300 L 400 300 M 380 360 L 400 360" stroke={C.red} strokeWidth="1.5" />
        <path d="M 520 240 L 500 240 M 520 300 L 500 300 M 520 360 L 500 360" stroke={C.red} strokeWidth="1.5" />
        <ellipse cx="450" cy="360" rx="14" ry="24" fill={C.blue} fillOpacity="0.4" />
      </g>
    ),
  },
];

export function matchConceptSchematic(
  normalizedSubject: string,
  topicSlug: string,
  topicTitle: string,
  unitId: string,
): ConceptSchematic | undefined {
  const hay = (topicSlug + " " + topicTitle + " " + (unitId || "")).toLowerCase();
  for (const entry of CONCEPT_SCHEMATICS) {
    if (entry.subject !== normalizedSubject) continue;
    if (entry.keywords.some((k) => hay.includes(k))) return entry;
  }
  return undefined;
}
