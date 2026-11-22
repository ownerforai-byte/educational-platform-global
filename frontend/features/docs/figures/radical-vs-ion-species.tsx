// RadicalVsIonSpecies figure. Theme-aware.
export function RadicalVsIonSpecies({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Free radical carbocation and carbanion compared">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Three intermediates, three personalities</text>
      {[
        ["free radical", "Cl·", "neutral · 7 e⁻ · unpaired", "from homolysis", "rgb(16 185 129)", 40],
        ["carbocation", "CH₃⁺", "positive · 6 e⁻ · electron-poor", "electrophile", "rgb(239 68 68)", 240],
        ["carbanion", "CH₃⁻", "negative · 8 e⁻ · electron-rich", "nucleophile", "rgb(59 130 246)", 440],
      ].map(([h, f, d, o, col, x]) => (
        <g key={h as string}>
          <rect x={x as number} y="55" width="180" height="110" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y="80" fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y="104" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{f as string}</text>
          <text x={(x as number) + 90} y="128" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
          <text x={(x as number) + 90} y="150" fontSize="9" fontWeight="800" textAnchor="middle" fill={col as string}>{o as string}</text>
        </g>
      ))}
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">count the electrons and the charge — the behaviour follows automatically</text>
    </svg>
  );
}
