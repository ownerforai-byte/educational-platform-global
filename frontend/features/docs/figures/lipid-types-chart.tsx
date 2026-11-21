/** Lipid types chart — triglyceride, phospholipid, wax, steroid. Well-detailed. Theme-aware. */
export function LipidTypesChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 320" className={className} role="img" aria-label="Lipid types triglyceride glycerol with three fatty acid chains phospholipid with phosphate head and two tails wax long chain ester steroid four fused rings cholesterol classification by hydrophobicity">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The lipid family — four structural classes</text>

      {/* triglyceride */}
      <rect x="20" y="44" width="330" height="120" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="185" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TRIGLYCERIDE (neutral fat)</text>
      <circle cx="90" cy="95" r="10" className="fill-none stroke-current text-amber-600" strokeWidth="2.5" />
      <text x="90" y="99" fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">G</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path d={`M100 ${85 + i * 12} h30`} strokeWidth="2" className="stroke-current text-amber-600" />
          <path d={`M130 ${85 + i * 12} q10 -6 20 0 t20 0 t20 0 t20 0`} className="fill-none stroke-current text-amber-600" strokeWidth="2" />
          <text x="215" y={88 + i * 12} fontSize="6.5" className="fill-current text-muted-foreground">fatty acid tail {i + 1}</text>
        </g>
      ))}
      <text x="90" y="128" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">glycerol + 3 esters</text>
      <text x="90" y="146" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">energy store: 9 kcal/g</text>

      {/* phospholipid */}
      <rect x="370" y="44" width="330" height="120" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="535" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PHOSPHOLIPID (membrane)</text>
      <circle cx="430" cy="95" r="12" className="fill-current text-sky-500/40" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="430" y="120" fontSize="7" textAnchor="middle" className="fill-current text-sky-600" fontWeight="700">polar head</text>
      <text x="430" y="134" fontSize="6.5" textAnchor="middle" className="fill-current text-muted-foreground">phosphate + glycerol</text>
      <path d="M442 90 q20 -4 40 0 t40 0 t40 0" className="fill-none stroke-current text-sky-600" strokeWidth="2" />
      <path d="M442 102 q20 4 40 0 t40 0 t40 0" className="fill-none stroke-current text-sky-600" strokeWidth="2" />
      <text x="565" y="88" fontSize="6.5" className="fill-current text-muted-foreground">two hydrophobic tails</text>
      <text x="565" y="108" fontSize="6.5" className="fill-current text-muted-foreground">amphipathic → bilayers</text>

      {/* wax */}
      <rect x="20" y="180" width="330" height="110" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="185" y="200" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WAX (protective ester)</text>
      <path d="M50 240 h40 m10 0 h40 m10 0 h40 m10 0 h40" strokeWidth="2.5" className="stroke-current text-emerald-600" />
      <text x="110" y="232" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">long-chain alcohol + long-chain fatty acid</text>
      <text x="110" y="262" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">cuticle wax, beeswax, waterproofing</text>

      {/* steroid */}
      <rect x="370" y="180" width="330" height="110" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="535" y="200" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">STEROID (4 fused rings)</text>
      {[[470, 250], [500, 232], [530, 250], [500, 268]].map(([x, y], i) => (
        <rect key={i} x={x - 14} y={y - 14} width="28" height="28" rx="4" className="fill-none stroke-current text-rose-500" strokeWidth="2.5" />
      ))}
      <text x="565" y="245" fontSize="7" className="fill-current text-muted-foreground">cholesterol, testosterone,</text>
      <text x="565" y="259" fontSize="7" className="fill-current text-muted-foreground">oestrogen, vitamin D</text>
      <text x="535" y="286" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">no fatty acids — not a true ester</text>
    </svg>
  );
}
