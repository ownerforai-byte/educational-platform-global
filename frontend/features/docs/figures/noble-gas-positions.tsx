// Noble gas positions and the zero group. Theme-aware.
export function NobleGasPositions({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Noble gases at the end of each period helium group eighteen formerly zero group with filled outer shells explaining inertness">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Noble gases — the table's punctuation marks</text>
      {["He", "Ne", "Ar", "Kr", "Xe", "Rn", "Og"].map((sym, i) => (
        <g key={sym}>
          <rect x={60 + i * 88} y="52" width="70" height="64" rx="8" className="fill-current text-emerald-500/15" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
          <text x={95 + i * 88} y="92" fontSize="11" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">{sym}</text>
        </g>
      ))}
      <text x="360" y="140" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">Every period ends with a noble gas — closed outer shell (ns² np⁶, or 1s² for helium)</text>
      <rect x="30" y="156" width="660" height="44" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="174" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Mendeleev's table had no place for them — they were added later as the "zero group" for their valence of 0.</text>
      <text x="360" y="192" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Modern numbering makes them group 18; their inertness is the cleanest evidence that valence-shell filling drives chemistry.</text>
    </svg>
  );
}
