// RefiningMethodPicker figure. Theme-aware.
export function RefiningMethodPicker({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Decision map choosing a refining method from the metal property">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Pick the refining method by the property</text>
      {[
        ["volatile?", "DISTILLATION", "Zn (907 °C) · Hg · Cd", "rgb(59 130 246)", 30],
        ["low melting?", "LIQUATION", "Sn (232 °C) · Pb — sloping hearth", "rgb(16 185 129)", 250],
        ["oxide in melt?", "POLING", "crude Cu — green wood poles", "rgb(245 158 11)", 470],
      ].map(([q, method, detail, col, x]) => (
        <g key={method as string}>
          <rect x={x as number} y="55" width="180" height="115" rx="10" fill={col as string} opacity="0.1" stroke={col as string} />
          <text x={(x as number) + 90} y="80" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">{q as string}</text>
          <text x={(x as number) + 90} y="104" fontSize="12" fontWeight="800" textAnchor="middle" fill={col as string}>{method as string}</text>
          <text x={(x as number) + 90} y="128" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">{detail as string}</text>
        </g>
      ))}
      <rect x="180" y="180" width="300" height="42" rx="8" fill="rgb(139 92 246)" opacity="0.12" stroke="rgb(139 92 246)" />
      <text x="330" y="198" fontSize="11.5" fontWeight="800" fill="rgb(139 92 246)" textAnchor="middle">need 99.99 %? → ELECTROREFINING</text>
      <text x="330" y="214" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">Cu · Ag · Au · Ni</text>
    </svg>
  );
}
