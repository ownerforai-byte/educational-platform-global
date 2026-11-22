// CisTransPropertyContrast figure. Theme-aware.
export function CisTransPropertyContrast({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Physical property contrast between cis and trans but-2-ene">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">cis vs trans — measurable differences</text>
      {[
        ["boiling point", "cis higher (+3.7 °C)", "trans lower", "rgb(59 130 246)", 40],
        ["dipole moment", "cis: net dipole", "trans: zero (symmetry)", "rgb(139 92 246)", 240],
        ["stability", "cis less stable", "trans more stable", "rgb(16 185 129)", 440],
      ].map(([row, c, t, col, x]) => (
        <g key={row as string}>
          <rect x={x as number} y="55" width="180" height="100" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y="80" fontSize="10.5" fontWeight="800" textAnchor="middle" fill={col as string}>{row as string}</text>
          <text x={(x as number) + 90} y="106" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground">cis: {c as string}</text>
          <text x={(x as number) + 90} y="130" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground">trans: {t as string}</text>
        </g>
      ))}
      <text x="330" y="190" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">cis: dipoles add (polar, higher b.p.) · trans: dipoles cancel (nonpolar, packs better)</text>
    </svg>
  );
}
