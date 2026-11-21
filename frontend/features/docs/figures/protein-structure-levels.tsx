/**
 * Protein structure — primary → secondary (α-helix / β-sheet) →
 * tertiary → quaternary. Theme-aware via currentColor.
 */
export function ProteinStructureLevels({ className }: { className?: string }) {
  const bead = (x: number, y: number, c: string) => <circle key={`${x}${y}`} cx={x} cy={y} r="6" style={{ color: c }} className="fill-current" />;
  return (
    <svg viewBox="0 0 660 320" className={className} role="img" aria-label="Four levels of protein structure: primary amino acid sequence, secondary alpha helix and beta sheet, tertiary folded globular shape and quaternary assembly of multiple subunits">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Protein structure — four levels of folding</text>

      {/* 1 primary */}
      <text x="16" y="58" fontSize="11.5" className="fill-current text-sky-600 dark:text-sky-400" fontWeight="800">1 · Primary — amino-acid sequence (peptide bonds)</text>
      {["A", "V", "L", "G", "S", "K", "T"].map((a, i) => (
        <g key={a}>
          <circle cx={60 + i * 34} cy={82} r="11" className="fill-current text-sky-500/25" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
          <text x={60 + i * 34} y={86} fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{a}</text>
        </g>
      ))}

      {/* 2 secondary */}
      <text x="16" y="130" fontSize="11.5" className="fill-current text-violet-600 dark:text-violet-400" fontWeight="800">2 · Secondary — α-helix &amp; β-pleated sheet (H-bonds)</text>
      <g className="stroke-current text-violet-500" strokeWidth="3" fill="none" style={{ color: "rgb(139 92 246 / 0.9)" }}>
        <path d="M60 150 q10 -12 20 0 q10 12 20 0 q10 -12 20 0 q10 12 20 0 q10 -12 20 0" />
      </g>
      <text x="70" y="176" fontSize="9.5" className="fill-current text-muted-foreground">α-helix (coil)</text>
      <g className="stroke-current text-violet-500" strokeWidth="3" style={{ color: "rgb(139 92 246 / 0.9)" }}>
        <line x1="230" y1="146" x2="290" y2="146" /><line x1="230" y1="160" x2="290" y2="160" />
        <line x1="238" y1="146" x2="238" y2="160" strokeWidth="1.5" /><line x1="262" y1="146" x2="262" y2="160" strokeWidth="1.5" /><line x1="284" y1="146" x2="284" y2="160" strokeWidth="1.5" />
      </g>
      <text x="238" y="176" fontSize="9.5" className="fill-current text-muted-foreground">β-pleated sheet</text>

      {/* 3 tertiary */}
      <text x="16" y="212" fontSize="11.5" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="800">3 · Tertiary — 3-D globular shape (R-group interactions)</text>
      <path d="M400 250 q-46 -8 -44 -46 q2 -34 40 -36 q40 -2 42 38 q2 36 -38 44 Z" className="fill-current text-rose-500/15" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="356" y="256" fontSize="9.5" className="fill-current text-muted-foreground">one polypeptide, folded</text>

      {/* 4 quaternary */}
      <text x="16" y="292" fontSize="11.5" className="fill-current text-emerald-600 dark:text-emerald-400" fontWeight="800">4 · Quaternary — 2+ subunits assemble (e.g. haemoglobin = 4)</text>
      <g>
        <circle cx="480" cy="262" r="20" className="fill-current text-emerald-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
        <circle cx="524" cy="262" r="20" className="fill-current text-emerald-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
        <circle cx="502" cy="228" r="20" className="fill-current text-emerald-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
        <circle cx="546" cy="228" r="20" className="fill-current text-emerald-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
        <text x="586" y="250" fontSize="9.5" className="fill-current text-muted-foreground">4 subunits</text>
      </g>
      <text x="16" y="314" fontSize="10" className="fill-current text-muted-foreground">Sequence determines fold; fold determines function. Heat/pH denaturation destroys 2°–4° but not 1°.</text>
    </svg>
  );
}
