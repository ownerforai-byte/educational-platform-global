// Excess reactant leftover panel. Theme-aware.
export function ExcessLeftoverPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Excess reactant leftover calculation initial amount minus consumed amount equals remaining excess">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Leftovers — the part students forget to report</text>
      <rect x="30" y="42" width="660" height="54" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="66" fontSize="11" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">leftover = initial amount − amount consumed</text>
      <text x="360" y="86" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">convert consumed amount through the equation ratio before subtracting</text>
      {[
        ["Mole units", "3 mol O₂ start, 2 mol used → 1 mol left"],
        ["Mass units", "96 g O₂ start, 64 g used → 32 g left"],
        ["Never", "subtract a mole figure from a mass figure"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x={30 + (i % 2) * 340} y={108 + Math.floor(i / 2) * 44} width="320" height="38" rx="9" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(16 185 129 / 0.85)" }} />
          <text x={46 + (i % 2) * 340} y={132 + Math.floor(i / 2) * 44} fontSize="8.6" className="fill-current text-foreground" fontWeight="800">{t}</text>
          <text x={334 + (i % 2) * 340} y={132 + Math.floor(i / 2) * 44} fontSize="8.6" textAnchor="end" className="fill-current text-muted-foreground">{d}</text>
        </g>
      ))}
      <rect x="30" y="196" width="660" height="8" rx="0" />
      <text x="360" y="206" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">"How much of the excess remains?" is a standard 1m add-on — budget one line for it.</text>
    </svg>
  );
}
