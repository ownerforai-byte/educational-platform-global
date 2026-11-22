// N2 preparation routes panel. Theme-aware.
export function N2PreparationRoutes({ className }: { className?: string }) {
  const routes: [string, string, string][] = [
    ["air (industrial)", "fractional distillation of liquid air; N₂ boils at −196 °C", "rgb(59 130 246)"],
    ["air (lab, crude)", "burn P or pass over hot Cu - removes O₂, leaves N₂ + noble gases", "rgb(245 158 11)"],
    ["NH₄Cl + NaNO₂", "NH₄Cl + NaNO₂ → N₂ + 2H₂O + NaCl (pure, lab)", "rgb(16 185 129)"],
    ["(NH₄)₂Cr₂O₇ heat", "(NH₄)₂Cr₂O₇ → N₂ + Cr₂O₃ + 4H₂O", "rgb(148 163 184)"],
  ];
  return (
    <svg viewBox="0 0 660 270" className={className} role="img" aria-label="Four routes to prepare nitrogen with purity notes">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Getting N₂: cheap vs pure</text>
      {routes.map(([t, s, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 46} width="580" height="38" rx="9" className="fill-current" style={{ color: c }} opacity="0.13" />
          <text x="58" y={62 + i * 46} fontSize="12" fontWeight="800" className="fill-current text-foreground">{t}</text>
          <text x="58" y={79 + i * 46} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="256" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Air routes give 'nitrogen' with argon; ammonium salt routes give the pure gas</text>
    </svg>
  );
}
