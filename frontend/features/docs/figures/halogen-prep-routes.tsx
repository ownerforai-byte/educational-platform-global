// Halogen preparation routes. Theme-aware.
export function HalogenPrepRoutes({ className }: { className?: string }) {
  const routes: [string, string, string][] = [
    ["Cl₂ lab", "MnO₂ + 4HCl(conc) → MnCl₂ + Cl₂ + 2H₂O", "rgb(59 130 246)"],
    ["Cl₂ industry", "brine electrolysis; Deacon: 4HCl + O₂ →(CuCl₂, 450 °C) 2Cl₂ + 2H₂O", "rgb(14 165 233)"],
    ["Br₂", "Cl₂ into seawater MgBr₂ — displacement", "rgb(245 158 11)"],
    ["I₂", "kelp/brine + Cl₂; or 2CuSO₄ + 4KI → 2CuI + I₂", "rgb(124 58 237)"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Preparation routes for chlorine bromine and iodine in laboratory and industry">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Making the halogens</text>
      {routes.map(([t, eq, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.12" />
          <text x="58" y={63 + i * 48} fontSize="12" fontWeight="800" style={{ fill: c }}>{t}</text>
          <text x="58" y={80 + i * 48} fontSize="10.5" className="fill-current text-muted-foreground">{eq}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Every heavier halogen is won by displacement from its salt</text>
    </svg>
  );
}
