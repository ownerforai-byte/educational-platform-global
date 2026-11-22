// Gallery of Kc expressions for common equilibria. Theme-aware.
export function ExpressionGalleryEq({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["N2 + 3H2 = 2NH3", "[NH3]^2 / ([N2][H2]^3)", "rgb(59 130 246)"],
    ["N2O4 = 2NO2", "[NO2]^2 / [N2O4]", "rgb(16 185 129)"],
    ["PCl5 = PCl3 + Cl2", "[PCl3][Cl2] / [PCl5]", "rgb(245 158 11)"],
    ["CaCO3(s) = CaO(s) + CO2(g)", "[CO2]  (solids omitted)", "rgb(148 163 184)"],
  ];
  return (
    <svg viewBox="0 0 660 290" className={className} role="img" aria-label="Gallery of equilibrium constant expressions for ammonia synthesis, nitrogen dioxide, phosphorus pentachloride and calcium carbonate decomposition">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The expression gallery</text>
      {rows.map(([eq, k, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 54} width="250" height="42" rx="8" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="56" y={72 + i * 54} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{eq}</text>
          <rect x="310" y={46 + i * 54} width="310" height="42" rx="8" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ color: c }} />
          <text x="465" y={72 + i * 54} fontSize="13" fontWeight="700" textAnchor="middle" style={{ fill: c }}>Kc = {k}</text>
        </g>
      ))}
      <text x="330" y="280" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Coefficients become powers; pure solids never appear</text>
    </svg>
  );
}
