// Amorphous carbon adsorption power. Theme-aware.
export function AmorphousAdsorptionPower({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Activated charcoal with enormous internal surface area about 1000 square metres per gram adsorbing gases and impurities">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">A tennis court folded into a sugar cube</text>
      <rect x="120" y="60" width="120" height="90" rx="10" className="fill-current" style={{ color: "rgb(51 65 85)" }} opacity="0.5" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle key={i} cx={140 + (i % 3) * 40} cy={80 + Math.floor(i / 3) * 40} r="8" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
      ))}
      <text x="180" y="170" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">pore-riddled charcoal</text>
      <text x="400" y="90" fontSize="13" fontWeight="800" fill="rgb(16 185 129)">≈ 1000 m²/g</text>
      <text x="400" y="114" fontSize="11" className="fill-current text-muted-foreground">gas molecules held on pore walls</text>
      <text x="400" y="136" fontSize="11" className="fill-current text-muted-foreground">gas masks · sugar decolourising · water filters</text>
      <text x="330" y="204" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Amorphous carbon works by surface capture, not by reaction</text>
    </svg>
  );
}
