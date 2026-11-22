// CyanideLeachingLoop figure. Theme-aware.
export function CyanideLeachingLoop({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Cyanide leaching of gold followed by zinc displacement with both equations">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Gold by hydrometallurgy — the cyanide route</text>
      <rect x="30" y="55" width="270" height="110" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="165" y="80" fontSize="12.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">1 · LEACH</text>
      <text x="165" y="104" fontSize="11" textAnchor="middle" className="fill-current text-foreground">2Au + 4CN⁻ + O₂ + 2H₂O →</text>
      <text x="165" y="124" fontSize="11" textAnchor="middle" className="fill-current text-foreground">2[Au(CN)₂]⁻ + 4OH⁻</text>
      <text x="165" y="148" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">dilute NaCN, air blown in; 1 g per tonne dissolves</text>
      <path d="M 305 110 L 355 110" stroke="rgb(245 158 11)" strokeWidth="2.5" markerEnd="url(#cll-a)" />
      <text x="330" y="100" fontSize="10" textAnchor="middle" fill="rgb(245 158 11)">Zn</text>
      <rect x="360" y="55" width="270" height="110" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="495" y="80" fontSize="12.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">2 · DISPLACE</text>
      <text x="495" y="104" fontSize="11" textAnchor="middle" className="fill-current text-foreground">2[Au(CN)₂]⁻ + Zn →</text>
      <text x="495" y="124" fontSize="11" textAnchor="middle" className="fill-current text-foreground">2Au↓ + [Zn(CN)₄]²⁻</text>
      <text x="495" y="148" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">zinc shavings; gold cemented out, melted to a button</text>
      <defs>
        <marker id="cll-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
      <text x="330" y="200" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Tonnes of rock in — one button of gold out</text>
    </svg>
  );
}
