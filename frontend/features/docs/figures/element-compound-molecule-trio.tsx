// Element, compound, molecule trio. Theme-aware.
export function ElementCompoundMoleculeTrio({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Element compound and molecule comparison one kind of atom fixed ratio of different atoms and groups of bonded atoms with examples">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Element · compound · molecule — three words, one test each</text>
      <rect x="30" y="44" width="220" height="110" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="140" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Element</text>
      {[[100, 96], [140, 96], [180, 96]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="9" className="fill-current text-sky-500" style={{ color: "rgb(14 165 233 / 0.85)" }} />
      ))}
      <text x="140" y="132" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">one kind of atom only — Fe, O₂, S₈</text>
      <text x="140" y="146" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">cannot be broken by chemistry</text>
      <rect x="260" y="44" width="220" height="110" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="370" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">Compound</text>
      <circle cx="340" cy="96" r="9" className="fill-current text-sky-500" style={{ color: "rgb(14 165 233 / 0.85)" }} />
      <circle cx="368" cy="96" r="7" className="fill-current text-rose-500" style={{ color: "rgb(244 63 94 / 0.85)" }} />
      <circle cx="394" cy="96" r="7" className="fill-current text-rose-500" style={{ color: "rgb(244 63 94 / 0.85)" }} />
      <text x="370" y="132" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">different atoms, fixed ratio — H₂O, CO₂</text>
      <text x="370" y="146" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">properties unlike its elements</text>
      <rect x="490" y="44" width="200" height="110" rx="10" className="fill-current text-violet-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="590" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-violet-600" fontWeight="800">Molecule</text>
      <circle cx="560" cy="96" r="8" className="fill-current text-violet-500" style={{ color: "rgb(139 92 246 / 0.85)" }} />
      <circle cx="586" cy="96" r="8" className="fill-current text-violet-500" style={{ color: "rgb(139 92 246 / 0.85)" }} />
      <line x1="568" y1="96" x2="578" y2="96" className="stroke-current" strokeWidth="2" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="590" y="132" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">a bonded group — of one element</text>
      <text x="590" y="146" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">(O₂) or several (H₂O, C₆H₁₂O₆)</text>
      <rect x="30" y="168" width="660" height="40" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="186" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Water is the standard proof: hydrogen burns, oxygen feeds burning, water puts fires out — a compound is a new substance.</text>
      <text x="360" y="200" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Every compound is a pure substance; every molecule is not necessarily a compound (O₂ is not).</text>
    </svg>
  );
}
