/**
 * Mitochondrion cutaway — outer and inner membranes, cristae, matrix with
 * circular DNA and 70S ribosomes. Theme-aware via currentColor.
 */
export function MitochondrionCutaway({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 340" className={className} role="img" aria-label="Cutaway of a mitochondrion showing the smooth outer membrane, folded inner membrane forming cristae, the matrix containing circular DNA and ribosomes, and the intermembrane space">
      <text x="16" y="28" fontSize="14" className="fill-current text-foreground" fontWeight="800">Mitochondrion — the ATP power-house, cut open</text>

      {/* outer membrane */}
      <ellipse cx="320" cy="180" rx="270" ry="120" fill="none" strokeWidth="4" className="stroke-current text-sky-500" />
      {/* inner membrane with cristae */}
      <ellipse cx="320" cy="180" rx="250" ry="100" fill="none" strokeWidth="3.5" className="stroke-current text-rose-500" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      {/* cristae folds */}
      <g className="stroke-current text-rose-500" strokeWidth="3.5" fill="none" style={{ color: "rgb(244 63 94 / 0.9)" }}>
        <path d="M140 180 q40 -50 80 0 q40 50 80 0 q40 -50 80 0 q40 50 80 0 q40 -50 80 0" />
        <path d="M150 216 q36 -40 72 0 q36 40 72 0 q36 -40 72 0 q36 40 72 0" />
      </g>

      {/* matrix */}
      <text x="250" y="132" fontSize="12" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="800">matrix</text>
      <text x="216" y="300" fontSize="10.5" className="fill-current text-muted-foreground">matrix — Krebs cycle enzymes, circular DNA, 70S ribosomes</text>

      {/* circular DNA */}
      <circle cx="420" cy="150" r="18" fill="none" strokeWidth="3" className="stroke-current text-violet-600" style={{ color: "rgb(124 58 237)" }} />
      <text x="446" y="146" fontSize="10" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="700">own circular DNA</text>
      <text x="446" y="160" fontSize="9" className="fill-current text-muted-foreground">(endosymbiotic legacy)</text>

      {/* ribosomes */}
      <g className="fill-current text-slate-500">
        <circle cx="360" cy="200" r="4" /><circle cx="380" cy="212" r="4" /><circle cx="300" cy="196" r="4" /><circle cx="470" cy="196" r="4" />
      </g>
      <text x="352" y="232" fontSize="10" className="fill-current text-muted-foreground" fontWeight="700">70S ribosomes</text>

      {/* labels */}
      <text x="90" y="86" fontSize="11" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">outer membrane — smooth, permeable to small molecules</text>
      <text x="98" y="260" fontSize="11" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">inner membrane — folds into cristae; electron-transport chain sits here</text>
      <text x="98" y="276" fontSize="9.5" className="fill-current text-muted-foreground">cristae multiply the surface area → more ATP synthase per mitochondrion</text>
      <text x="16" y="324" fontSize="10" className="fill-current text-muted-foreground">Intermembrane space (between the two membranes) accumulates H⁺ for chemiosmosis. Glucose + O₂ → CO₂ + H₂O + ~30–32 ATP per glucose.</text>
    </svg>
  );
}
