// Ch2IncrementRule figure. Theme-aware.
export function Ch2IncrementRule({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Successive homologues differing by a CH2 unit of 14 mass units">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The CH₂ (14 u) rule</text>
      {["CH₃OH (32)", "+ CH₂ →", "C₂H₅OH (46)", "+ CH₂ →", "C₃H₇OH (60)"].map((t, i) => (
        <g key={i}>
          <text x={40 + i * 125} y="110" fontSize={i % 2 ? "11" : "11.5"} fontWeight={i % 2 ? "400" : "800"} textAnchor="middle" className={i % 2 ? "fill-current text-muted-foreground" : "fill-current text-foreground"}>{t}</text>
        </g>
      ))}
      <text x="330" y="150" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">successive members differ by exactly 14 mass units</text>
      <text x="330" y="180" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">the arithmetic progression that first revealed homologous series</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">same functional group throughout — only the skeleton grows</text>
    </svg>
  );
}
