// MetallurgyThreeRoutes figure. Theme-aware.
export function MetallurgyThreeRoutes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Three branches of metallurgy hydrometallurgy pyrometallurgy and electrometallurgy with example equations">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Metallurgy — three routes to the metal</text>
      {[
        ["HYDRO", "aqueous chemistry", "2Au + 4CN⁻ + O₂ + 2H₂O →", "2[Au(CN)₂]⁻ + 4OH⁻", "rgb(59 130 246)", 30],
        ["PYRO", "heat + coke", "Fe₂O₃ + 3CO → 2Fe + 3CO₂", "blast furnace, 1500 °C", "rgb(239 68 68)", 250],
        ["ELECTRO", "molten salt + current", "2NaCl(l) → 2Na + Cl₂", "Downs cell, 600 °C", "rgb(16 185 129)", 470],
      ].map(([tag, sub, eq1, eq2, col, x]) => (
        <g key={tag as string}>
          <rect x={x as number} y="50" width="180" height="120" rx="10" fill="none" stroke={col as string} strokeWidth="2" />
          <text x={(x as number) + 90} y="76" fontSize="14" fontWeight="800" textAnchor="middle" fill={col as string}>{tag as string}</text>
          <text x={(x as number) + 90} y="94" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">{sub as string}</text>
          <text x={(x as number) + 90} y="122" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">{eq1 as string}</text>
          <text x={(x as number) + 90} y="140" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">{eq2 as string}</text>
          <text x={(x as number) + 90} y="160" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">Au · Ag · Cu</text>
        </g>
      ))}
      <text x="330" y="200" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Route chosen by height in the activity series: top → electrolysis, middle → coke, bottom → leaching</text>
    </svg>
  );
}
