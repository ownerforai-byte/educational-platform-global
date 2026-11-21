/** Immunity types map — active passive natural artificial. Well-detailed. Theme-aware. */
export function ImmunityTypesMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Immunity types map active passive natural artificial four quadrants matrix antibodies own produced borrowed examples infection vaccine placenta antitoxin duration speed comparison classification immunology basics">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Immunity's four quadrants — one map, no confusion</text>
      {/* quadrants */}
      <rect x="30" y="44" width="660" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {/* axis labels */}
      <text x="360" y="62" fontSize="7" textAnchor="middle" className="fill-current text-emerald-700" fontWeight="800">ACTIVE (your own antibodies) ← top row</text>
      <text x="360" y="212" fontSize="7" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">PASSIVE (borrowed antibodies) ← bottom row</text>
      {[
        ["Natural active", "infection → recovery → memory", "measles, chickenpox", 130, 80],
        ["Artificial active", "vaccine trains the system", "MMR, BCG, COVID-19", 500, 80],
        ["Natural passive", "placenta + breast milk antibodies", "a newborn's first months", 130, 170],
        ["Artificial passive", "injected ready-made antibodies", "tetanus antitoxin, antivenom", 500, 170],
      ].map(([name, how, ex, x, y], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 130} y={(y as number) - 24} width="260" height="66" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: i < 2 ? "rgb(16 185 129 / 0.9)" : "rgb(2 132 199 / 0.9)" }} />
          <text x={x as number} y={(y as number) - 6} fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y={(y as number) + 8} fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{how as string}</text>
          <text x={x as number} y={(y as number) + 24} fontSize="5.8" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="700">{ex as string}</text>
        </g>
      ))}
      {/* facts */}
      <rect x="30" y="232" width="660" height="60" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="252" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The rule: active = slow to build, long to last; passive = instant, temporary — borrowed antibodies fade in weeks.</text>
      <text x="360" y="270" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name all four with one example each — the standard full-mark answer.</text>
      <text x="360" y="284" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Snakebite antivenom is passive immunity in its purest form — no time to train, borrow ready-made.</text>
    </svg>
  );
}
