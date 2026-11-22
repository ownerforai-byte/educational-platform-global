// ActivitySeriesRouting figure. Theme-aware.
export function ActivitySeriesRouting({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Activity series ladder routing each metal to its extraction route">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">One ladder, three doors</text>
      {["Na", "K", "Ca", "Mg", "Al", "Zn", "Fe", "Pb", "Cu", "Ag", "Au"].map((m, i) => (
        <g key={m}>
          <text x="60" y={48 + i * 16} fontSize="11" fontWeight="700" className="fill-current text-foreground">{m}</text>
          <rect x="90" y={38 + i * 16} width="120" height="12" rx="3" fill="rgb(59 130 246)" opacity={i < 5 ? 0.75 : 0.15} />
        </g>
      ))}
      <rect x="230" y="40" width="180" height="76" rx="8" fill="rgb(16 185 129)" opacity="0.12" />
      <text x="320" y="62" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">Electrometallurgy</text>
      <text x="320" y="80" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">molten-salt electrolysis</text>
      <text x="320" y="96" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Na · Mg · Ca · Al</text>
      <rect x="230" y="120" width="180" height="56" rx="8" fill="rgb(239 68 68)" opacity="0.12" />
      <text x="320" y="142" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">Pyrometallurgy</text>
      <text x="320" y="160" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">coke / CO reduction: Zn Fe Pb Cu</text>
      <rect x="230" y="180" width="180" height="52" rx="8" fill="rgb(59 130 246)" opacity="0.12" />
      <text x="320" y="200" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">Hydrometallurgy</text>
      <text x="320" y="218" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">leaching + displacement: Ag Au</text>
      <text x="520" y="70" fontSize="10.5" className="fill-current text-muted-foreground">ΔG of oxide decides:</text>
      <text x="520" y="88" fontSize="10.5" className="fill-current text-muted-foreground">the more negative,</text>
      <text x="520" y="106" fontSize="10.5" className="fill-current text-muted-foreground">the harder coke must fight —</text>
      <text x="520" y="124" fontSize="10.5" className="fill-current text-muted-foreground">electrons replace coke.</text>
    </svg>
  );
}
