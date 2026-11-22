// MagnesiaPanel figure. Theme-aware.
export function MagnesiaPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Magnesia preparation from magnesite and its refractory and antacid uses">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Magnesia — MgO</text>
      <rect x="40" y="55" width="280" height="125" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="180" y="80" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">MAKE</text>
      <text x="180" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">MgCO₃ → MgO + CO₂ (magnesite)</text>
      <text x="180" y="128" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">MgCl₂ + Ca(OH)₂ → Mg(OH)₂↓ + CaCl₂</text>
      <text x="180" y="150" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">Mg(OH)₂ → MgO + H₂O</text>
      <text x="180" y="170" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">two routes, same white refractory powder</text>
      <rect x="340" y="55" width="280" height="125" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="80" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">USE — mp ~2850 °C</text>
      <text x="480" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">basic refractory lining of steel furnaces</text>
      <text x="480" y="128" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">milk of magnesia — Mg(OH)₂ suspension</text>
      <text x="480" y="150" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">antacid: mild because insoluble</text>
      <text x="480" y="170" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Sorel cement: MgO + MgCl₂ paste</text>
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">A suspension, not a solution — its mildness is its insolubility</text>
    </svg>
  );
}
