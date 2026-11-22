// CarbonateHydrolysisPh figure. Theme-aware.
export function CarbonateHydrolysisPh({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="pH ladder from carbonate hydrolysis comparing sodium carbonate and bicarbonate">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Alkaline without any OH⁻ in the formula</text>
      <text x="330" y="52" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">CO₃²⁻ + H₂O ⇌ HCO₃⁻ + OH⁻</text>
      {[
        ["NaOH", "pH ~13", "rgb(239 68 68)", 90],
        ["Na₂CO₃ 0.1 M", "pH ~11", "rgb(245 158 11)", 250],
        ["NaHCO₃", "pH ~8.3", "rgb(16 185 129)", 410],
        ["pure water", "pH 7", "rgb(59 130 246)", 540],
      ].map(([s, v, col, x]) => (
        <g key={s as string}>
          <rect x={x as number} y="80" width={(x as number) > 400 ? 90 : 150} height="40" rx="8" fill={col as string} opacity="0.15" stroke={col as string} />
          <text x={(x as number) + ((x as number) > 400 ? 45 : 75)} y="98" fontSize="10.5" fontWeight="800" textAnchor="middle" fill={col as string}>{s as string}</text>
          <text x={(x as number) + ((x as number) > 400 ? 45 : 75)} y="113" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">{v as string}</text>
        </g>
      ))}
      <text x="330" y="160" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">HCO₃⁻ is an extremely weak acid (pKa ≈ 10.3) — so CO₃²⁻ grabs protons from water</text>
      <text x="330" y="182" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">HCO₃⁻ hydrolyses less (conjugate of the stronger H₂CO₃, pKa ≈ 6.4) — hence only pH 8.3</text>
    </svg>
  );
}
