/** Earthworm economic importance — vermicomposting and soil health. Theme-aware. */
export function EarthwormEconomicImportance({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Earthworm economic importance with vermicomposting cycle soil aeration nitrogen fixation of casts and uses as fish bait and medicine">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Farmers' friend — the earthworm's economic ledger</text>

      {/* vermicompost cycle */}
      <g>
        {[
          { x: 90, y: 80, c: "rgb(16 185 129 / 0.9)", t: "organic waste in", s: "leaves, peels, dung" },
          { x: 330, y: 80, c: "rgb(190 90 90 / 0.9)", t: "worms digest it", s: "gizzard grinds, gut enriches" },
          { x: 530, y: 80, c: "rgb(245 158 11 / 0.9)", t: "casts out", s: "vermicompost — rich in N, P, K" },
          { x: 330, y: 190, c: "rgb(22 163 74 / 0.9)", t: "crops grow better", s: "soil structure + fertility up" },
        ].map((n) => (
          <g key={n.t}>
            <rect x={n.x - 70} y={n.y - 22} width="140" height="44" rx="10" style={{ color: n.c }} className="fill-current opacity-12" strokeWidth="2.5" stroke="currentColor" />
            <text x={n.x} y={n.y - 4} fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
            <text x={n.x} y={n.y + 12} fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          </g>
        ))}
        <g className="stroke-current text-muted-foreground" strokeWidth="2.5">
          <line x1="162" y1="80" x2="258" y2="80" /><polygon points="250,74 264,80 250,86" className="fill-current text-muted-foreground" />
          <line x1="402" y1="80" x2="458" y2="80" /><polygon points="450,74 464,80 450,86" className="fill-current text-muted-foreground" />
          <path d="M530 104 Q530 190 402 190" fill="none" /><polygon points="410,184 396,190 410,196" className="fill-current text-muted-foreground" />
          <path d="M258 190 Q120 190 96 104" fill="none" strokeDasharray="6 3" />
        </g>
      </g>

      {/* other uses */}
      <text x="16" y="238" fontSize="9.5" className="fill-current text-muted-foreground">Also: soil aeration & drainage by burrows · Darwin's estimate — an acre of soil passes through worm guts many tonnes per year · fish bait · folk medicine (dried worm powder).</text>
      <text x="16" y="256" fontSize="9.5" className="fill-current text-muted-foreground">Harmful side: intermediate host of parasites (Monocystis); can damage seedlings in nurseries.</text>
    </svg>
  );
}
