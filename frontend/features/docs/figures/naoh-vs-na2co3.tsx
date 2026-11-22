// NaohVsNa2co3 figure. Theme-aware.
export function NaohVsNa2co3({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Comparison of sodium hydroxide and sodium carbonate as bases">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Caustic soda vs washing soda</text>
      <line x1="40" y1="50" x2="620" y2="50" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["BASIS", "NaOH (caustic)", "Na₂CO₃ (washing)"],
        ["strength", "strong base — free OH⁻", "mild base — hydrolysis of CO₃²⁻"],
        ["NH₄⁺ salt (warm)", "liberates NH₃", "no NH₃ — the distinguishing test"],
        ["air uptake", "CO₂ + H₂O → Na₂CO₃ crust", "already carbonate"],
        ["pH (0.1 M)", "~13", "~11"]].map((row, i) => (
        <g key={i}>
          {[0, 1, 2].map((c) => (
            <text key={c} x={45 + c * 195} y={70 + i * 28} fontSize={i ? "10.5" : "10"} fontWeight={i ? (c ? "400" : "700") : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[c]}</text>
          ))}
          <line x1="40" y1={78 + i * 28} x2="620" y2={78 + i * 28} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
      <text x="330" y="210" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">One is a delivered hydroxide; the other manufactures hydroxide by hydrolysis</text>
    </svg>
  );
}
