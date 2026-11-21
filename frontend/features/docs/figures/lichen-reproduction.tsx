/** Lichen reproduction — soredia, isidia, fragmentation. Theme-aware. */
export function LichenReproduction({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Lichen reproduction by soredia packets of algal cells with fungal hyphae isidia outgrowths and thallus fragmentation">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Reproducing a two-in-one body</text>

      {/* soredia */}
      <g>
        <rect x="30" y="60" width="190" height="140" rx="12" className="fill-current text-lime-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(132 204 22 / 0.9)" }} />
        <text x="125" y="86" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SOREDIA</text>
        {[[95, 116], [125, 108], [155, 118], [110, 140], [145, 138]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="7" className="fill-current text-amber-500/40" />
            <circle cx={x} cy={y} r="3" className="fill-current text-emerald-500/80" />
          </g>
        ))}
        <text x="125" y="172" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">alga cell wrapped in hyphae —</text>
        <text x="125" y="186" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">a ready-made symbiosis, blown away</text>
      </g>

      {/* isidia */}
      <g>
        <rect x="240" y="60" width="190" height="140" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <text x="335" y="86" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ISIDIA</text>
        <path d="M260 160 q70 -20 150 0" fill="none" strokeWidth="8" strokeLinecap="round" className="stroke-current text-lime-600/50" />
        {[[290, 140], [335, 132], [380, 140]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="7" ry="10" className="fill-current text-lime-600/80" />
        ))}
        <text x="335" y="176" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">warty outgrowths on the thallus —</text>
        <text x="335" y="190" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">break off whole (rain, animals)</text>
      </g>

      {/* fragmentation */}
      <g>
        <rect x="450" y="60" width="190" height="140" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
        <text x="545" y="86" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FRAGMENTATION</text>
        <path d="M470 150 q30 -14 60 0" fill="none" strokeWidth="6" strokeLinecap="round" className="stroke-current text-lime-600/60" />
        <path d="M545 150 q30 -14 60 0" fill="none" strokeWidth="6" strokeLinecap="round" className="stroke-current text-lime-600/60" />
        <text x="545" y="172" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">any broken piece carrying</text>
        <text x="545" y="186" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">both partners regrows</text>
      </g>
      <text x="16" y="226" fontSize="10" className="fill-current text-muted-foreground">All three carry BOTH partners together — a lichen cannot colonise new ground unless fungus and alga travel as one.</text>
    </svg>
  );
}
