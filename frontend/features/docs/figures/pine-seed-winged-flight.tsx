/** Winged seed flight — dispersal mechanics. Well-detailed. Theme-aware. */
export function PineSeedWingedFlight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Pine winged seed dispersal two wings autorotation helicopter spin wind carries seed away from parent shade competition germination">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The winged seed — a one-way helicopter</text>

      {/* seed anatomy */}
      <rect x="30" y="44" width="280" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="170" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ANATOMY OF ONE SEED</text>
      {/* wing */}
      <path d="M90 140 q60 -34 120 -10 q-60 20 -120 10" className="fill-current text-amber-200/40" stroke="currentColor" strokeWidth="2.2" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="150" y="118" fontSize="7.4" className="fill-current text-amber-700" fontWeight="700">papery wing (one or two)</text>
      {/* seed body */}
      <ellipse cx="96" cy="146" rx="14" ry="10" className="fill-current text-stone-700/50" stroke="currentColor" strokeWidth="1.8" />
      <text x="40" y="170" fontSize="7.2" className="fill-current text-muted-foreground">seed at the wing's base</text>
      <text x="40" y="192" fontSize="7.2" className="fill-current text-muted-foreground">wing off-centre → spins as it falls</text>
      <text x="40" y="208" fontSize="7.2" className="fill-current text-muted-foreground">autorotation slows descent, wind extends range</text>

      {/* flight scene */}
      <rect x="330" y="44" width="360" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="510" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">AWAY FROM THE PARENT'S SHADE</text>
      {/* parent tree */}
      <path d="M370 200 l10 -28 l10 28 Z M380 200 l12 -34 l12 34 Z" className="fill-current text-emerald-700/50" />
      <text x="390" y="216" fontSize="7" textAnchor="middle" className="fill-current text-emerald-800">parent</text>
      {/* wind arrows */}
      {[[470, 90], [500, 110], [530, 130]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} q14 -6 28 0`} className="fill-none stroke-current text-sky-500" strokeWidth="2" markerEnd="url(#arrhl)" />
      ))}
      {/* spinning seeds */}
      {[[480, 130], [520, 150], [560, 168], [610, 178]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x} ${y} q16 -10 30 -2 q-16 10 -30 2`} className="fill-current text-amber-300/50" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(217 119 6 / 0.9)" }} />
          <ellipse cx={x} cy={y + 2} rx="4" ry="3" className="fill-current text-stone-700/60" />
        </g>
      ))}
      <text x="510" y="208" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">farther from the parent → less shade, less competition</text>

      {/* footer */}
      <rect x="30" y="240" width="660" height="48" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="50" y="260" fontSize="7.8" className="fill-current text-foreground" fontWeight="700">Two years in the making: pollination in spring of year one, fertilisation twelve months later, winged seeds shed that autumn.</text>
      <text x="50" y="278" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: gymnosperm seeds are exposed on the scale, then released bare — no fruit ever wraps them.</text>
    </svg>
  );
}
