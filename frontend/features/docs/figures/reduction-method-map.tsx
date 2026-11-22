// ReductionMethodMap figure. Theme-aware.
export function ReductionMethodMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Table matching metals to their reduction method with the reason">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Which reductant for which metal?</text>
      <line x1="40" y1="50" x2="620" y2="50" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["METAL", "REDUCTANT", "WHY"],
        ["Fe Zn Pb Cu", "C / CO (furnace)", "oxide reducible at furnace temperature"],
        ["Cr Mn", "Al — thermite", "coke gives carbides; Al is the stronger lover of O"],
        ["Na K Mg Ca", "electrolysis of molten salt", "ΔG too negative for carbon to ever win"],
        ["Al", "electrolysis in cryolite", "2000 °C needed + Al₄C₃ forms with coke"]].map((row, i) => (
        <g key={i}>
          <text x="45" y={72 + i * 34} fontSize={i ? "11" : "10.5"} fontWeight={i ? "700" : "800"} className="fill-current text-foreground">{row[0]}</text>
          <text x="185" y={72 + i * 34} fontSize={i ? "11" : "10.5"} fontWeight={i ? "400" : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[1]}</text>
          <text x="360" y={72 + i * 34} fontSize="10" className="fill-current text-muted-foreground">{row[2]}</text>
          <line x1="40" y1={80 + i * 34} x2="620" y2={80 + i * 34} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
    </svg>
  );
}
