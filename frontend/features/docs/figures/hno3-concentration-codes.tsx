// HNO3 concentration dependent products. Theme-aware.
export function Hno3ConcentrationCodes({ className }: { className?: string }) {
  const codes: [string, string, string][] = [
    ["conc. HNO₃", "NO₂ (brown gas)", "rgb(239 68 68)"],
    ["dil. HNO₃", "NO (colourless)", "rgb(148 163 184)"],
    ["very dil. + Mg/Mn", "NH₄NO₃ (N reduced to −3!)", "rgb(16 185 129)"],
  ];
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Nitric acid reduction products depend on concentration: nitrogen dioxide, nitric oxide or ammonium nitrate">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The concentration code</text>
      {codes.map(([c, p, col], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 50} width="250" height="40" rx="9" className="fill-current" style={{ color: col }} opacity="0.16" />
          <text x="165" y={71 + i * 50} fontSize="12.5" fontWeight="800" textAnchor="middle" style={{ fill: col }}>{c}</text>
          <text x="320" y={71 + i * 50} fontSize="12.5" fontWeight="700" className="fill-current text-foreground">→ {p}</text>
        </g>
      ))}
      <text x="330" y="206" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Diluter acid reduces nitrogen further - very dilute acid with active metals reaches NH₄⁺</text>
    </svg>
  );
}
