/** Gill cross-section zoom — hymenium, basidia, basidiospores. Well-detailed. Theme-aware. */
export function MushroomGillZoom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Mushroom gill cross-section zoom hymenium layer basidia basidiospores discharge lamella trama spore production mushroom reproduction">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Inside a gill — the spore factory</text>

      {/* two gill faces with hymenium */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      {/* gill trama bodies */}
      <path d="M60 90 q170 30 340 0 L400 220 q-170 30 -340 0 Z" className="fill-current text-amber-700/20" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(180 130 40 / 0.8)" }} />
      <text x="230" y="160" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">trama (inner tissue)</text>
      {/* hymenium lines */}
      <path d="M60 90 q170 30 340 0" className="fill-none stroke-current text-rose-500" strokeWidth="4" />
      <path d="M60 220 q170 30 340 0" className="fill-none stroke-current text-rose-500" strokeWidth="4" />
      <text x="410" y="88" fontSize="8" className="fill-current text-rose-500" fontWeight="700">hymenium</text>
      {/* basidia + spores on upper face */}
      {[100, 140, 180, 220, 260, 300, 340].map((x) => (
        <g key={x}>
          <line x1={x} y1="97" x2={x} y2="78" className="stroke-current text-amber-600" strokeWidth="2" style={{ color: "rgb(180 130 40 / 0.9)" }} />
          <circle cx={x} cy="74" r="3.4" className="fill-current text-sky-500/70" />
        </g>
      ))}
      {[100, 140, 180, 220, 260, 300, 340].map((x) => (
        <circle key={`l${x}`} cx={x} cy="238" r="3.4" className="fill-current text-sky-500/70" />
      ))}
      <text x="410" y="72" fontSize="7.4" className="fill-current text-sky-600">basidiospores</text>
      <text x="410" y="244" fontSize="7.4" className="fill-current text-muted-foreground">each basidium → 4 spores</text>
      <text x="50" y="252" fontSize="7.2" className="fill-current text-muted-foreground">A single cap can release millions of spores a day — gills maximise the spore-bearing surface.</text>

      {/* zoom card */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ZOOM: one basidium</text>
      <line x1="570" y1="90" x2="570" y2="140" className="stroke-current text-amber-600" strokeWidth="4" style={{ color: "rgb(180 130 40 / 0.9)" }} />
      {[-34, -12, 12, 34].map((dx) => (
        <g key={dx}>
          <line x1="570" y1="90" x2={570 + dx} y2="70" className="stroke-current text-amber-600" strokeWidth="1.6" style={{ color: "rgb(180 130 40 / 0.9)" }} />
          <circle cx={570 + dx} cy="66" r="4" className="fill-current text-sky-500/70" />
        </g>
      ))}
      <text x="570" y="158" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">club-shaped basidium</text>
      <text x="570" y="170" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">with 4 basidiospores</text>
      <text x="466" y="196" fontSize="7.2" className="fill-current text-muted-foreground">• hymenium = spore-bearing layer</text>
      <text x="466" y="212" fontSize="7.2" className="fill-current text-muted-foreground">• gills, pores or teeth carry it</text>
      <text x="466" y="228" fontSize="7.2" className="fill-current text-muted-foreground">• spore colour = spore print ID</text>
      <text x="466" y="244" fontSize="7.2" className="fill-current text-muted-foreground">• exam: gills → Basidiomycetes</text>
    </svg>
  );
}
