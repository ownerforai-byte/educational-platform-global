// ReactionSpeedContrast figure. Theme-aware.
export function ReactionSpeedContrast({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Slow molecular organic reactions versus fast ionic inorganic reactions">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Fast ions, slow molecules</text>
      <rect x="40" y="55" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="180" y="82" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">IONIC (inorganic)</text>
      <text x="180" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">Ag⁺ + Cl⁻ → AgCl↓ instantly</text>
      <text x="180" y="132" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">ions meet in solution, react at once</text>
      <text x="180" y="154" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">no bonds to break inside particles</text>
      <rect x="340" y="55" width="280" height="120" rx="10" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" />
      <text x="480" y="82" fontSize="12" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">MOLECULAR (organic)</text>
      <text x="480" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">C–H / C–C bonds must first break</text>
      <text x="480" y="132" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">high activation barrier → slow, heated,</text>
      <text x="480" y="154" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">often catalysed; mechanisms matter</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Slow ≠ weak: the products are perfectly stable — the barrier is the point</text>
    </svg>
  );
}
