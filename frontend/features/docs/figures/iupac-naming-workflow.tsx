// IupacNamingWorkflow figure. Theme-aware.
export function IupacNamingWorkflow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="IUPAC naming workflow from structure to name">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">IUPAC naming — the five-step workflow</text>
      {[
        ["1. Find the longest chain", "parent hydrocarbon", "rgb(59 130 246)", 40, 55],
        ["2. Number for lowest locants", "start at the nearer substituent", "rgb(16 185 129)", 240, 55],
        ["3. Name substituents", "alkyl prefixes, di/tri", "rgb(245 158 11)", 440, 55],
        ["4. Add the suffix", "functional group ending", "rgb(139 92 246)", 140, 130],
        ["5. Assemble alphabetically", "substituents before parent", "rgb(20 184 166)", 340, 130],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="180" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y={(y as number) + 24} fontSize="10.5" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 44} fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Every IUPAC name is built by the same five moves — up to six carbons or beyond</text>
    </svg>
  );
}
