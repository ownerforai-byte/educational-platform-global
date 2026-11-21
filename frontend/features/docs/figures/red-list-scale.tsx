/** IUCN Red List scale — 42,000 species, Nepal 27 mammals. Theme-aware. */
export function RedListScale({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 200" className={className} role="img" aria-label="IUCN Red List scale more than 42000 species threatened with extinction globally and Nepal has 27 mammal species listed as threatened">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The Red List in numbers</text>
      <text x="16" y="46" fontSize="9" className="fill-current text-muted-foreground">The IUCN Red List is the world's most comprehensive inventory of global conservation status.</text>

      <g>
        <rect x="40" y="66" width="280" height="90" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        <text x="180" y="106" fontSize="24" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">42,000+</text>
        <text x="180" y="128" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">species threatened with extinction worldwide</text>
      </g>
      <g>
        <rect x="340" y="66" width="280" height="90" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        <text x="480" y="106" fontSize="24" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">27</text>
        <text x="480" y="128" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">mammal species listed as threatened in Nepal</text>
      </g>
      <text x="16" y="182" fontSize="9.5" className="fill-current text-muted-foreground">Maintained by the International Union for Conservation of Nature — assessment categories run from EX to NE.</text>
    </svg>
  );
}
