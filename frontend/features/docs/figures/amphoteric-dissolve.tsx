// AmphotericDissolve figure. Theme-aware.
export function AmphotericDissolve({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Zinc hydroxide dissolving in excess sodium hydroxide to form sodium zincate">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Amphoteric — dissolves in its own precipitant</text>
      <rect x="60" y="70" width="200" height="80" rx="10" fill="rgb(148 163 184)" opacity="0.2" stroke="rgb(148 163 184)" />
      <text x="160" y="100" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Zn(OH)₂ white ppt</text>
      <text x="160" y="122" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">from ZnSO₄ + 2NaOH</text>
      <path d="M 265 110 L 340 110" stroke="rgb(16 185 129)" strokeWidth="2.5" markerEnd="url(#ad-a)" />
      <text x="302" y="100" fontSize="9.5" textAnchor="middle" fill="rgb(16 185 129)">+ excess NaOH</text>
      <rect x="345" y="70" width="230" height="80" rx="10" fill="rgb(16 185 129)" opacity="0.12" stroke="rgb(16 185 129)" />
      <text x="460" y="100" fontSize="11" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">clear solution again</text>
      <text x="460" y="122" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">Zn(OH)₂ + 2NaOH → Na₂ZnO₂ + 2H₂O</text>
      <text x="460" y="140" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">sodium zincate</text>
      <defs>
        <marker id="ad-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker>
      </defs>
      <text x="330" y="190" fontSize="10.5" textAnchor="middle" fill="rgb(239 68 68)">Cu(OH)₂ refuses — not amphoteric, stays pale blue</text>
      <text x="330" y="212" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Same for Al(OH)₃ → NaAlO₂ and Pb(OH)₂</text>
    </svg>
  );
}
