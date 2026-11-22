// Concentration shift map: add/remove reactant or product. Theme-aware.
export function ConcentrationShiftMap({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["add reactant", "shifts forward - consumes the addition", "rgb(16 185 129)"],
    ["remove product", "shifts forward - replaces the loss", "rgb(16 185 129)"],
    ["add product", "shifts backward - consumes the addition", "rgb(239 68 68)"],
    ["remove reactant", "shifts backward - replaces the loss", "rgb(239 68 68)"],
  ];
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Concentration changes and their equilibrium shifts: adding reactant or removing product drives forward, adding product or removing reactant drives backward">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Concentration levers</text>
      {rows.map(([ch, eff, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 52} width="240" height="40" rx="8" className="fill-current" style={{ color: c }} opacity="0.16" />
          <text x="56" y={71 + i * 52} fontSize="12.5" fontWeight="800" style={{ fill: c }}>{ch}</text>
          <path d="M 292 66 L 330 66" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" markerEnd="url(#arrc)" />
          <text x="345" y={71 + i * 52} fontSize="12" fontWeight="700" className="fill-current text-foreground">{eff}</text>
        </g>
      ))}
      <defs><marker id="arrc" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="currentColor" className="text-muted-foreground" /></marker></defs>
      <text x="330" y="268" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The fraction Qc falls below or rises above Kc - motion restores it</text>
    </svg>
  );
}
