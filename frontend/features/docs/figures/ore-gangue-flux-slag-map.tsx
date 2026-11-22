// OreGangueFluxSlagMap figure. Theme-aware.
export function OreGangueFluxSlagMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Flow map from ore with gangue through flux addition to floating slag and purified metal">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Gangue in, slag out</text>
      <rect x="30" y="60" width="150" height="90" rx="10" fill="rgb(148 163 184)" opacity="0.2" stroke="rgb(148 163 184)" />
      <text x="105" y="88" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">ORE</text>
      <text x="105" y="108" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">wanted mineral</text>
      <text x="105" y="126" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">+ gangue (sand, clay)</text>
      <path d="M 185 105 L 240 105" stroke="rgb(245 158 11)" strokeWidth="2.5" markerEnd="url(#ogf-a)" />
      <rect x="245" y="60" width="150" height="90" rx="10" fill="rgb(245 158 11)" opacity="0.12" stroke="rgb(245 158 11)" />
      <text x="320" y="88" fontSize="12" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">+ FLUX</text>
      <text x="320" y="108" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">binds the gangue</text>
      <text x="320" y="126" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">acidic ↔ basic pairing</text>
      <path d="M 400 105 L 455 105" stroke="rgb(16 185 129)" strokeWidth="2.5" markerEnd="url(#ogf-a)" />
      <rect x="460" y="60" width="170" height="90" rx="10" fill="rgb(16 185 129)" opacity="0.12" stroke="rgb(16 185 129)" />
      <text x="545" y="88" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">SLAG floats</text>
      <text x="545" y="108" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">fusible, immiscible, lighter</text>
      <text x="545" y="126" fontSize="10" textAnchor="middle" className="fill-current text-foreground">CaO + SiO₂ → CaSiO₃</text>
      <defs>
        <marker id="ogf-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
      <text x="330" y="195" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The flux never reduces anything — it only chemically carries the gangue away</text>
    </svg>
  );
}
