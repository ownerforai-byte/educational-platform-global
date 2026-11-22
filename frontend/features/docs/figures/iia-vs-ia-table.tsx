// IiaVsIaTable figure. Theme-aware.
export function IiaVsIaTable({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Comparison table of alkali metals and alkaline earth metals">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">IA vs IIA — two electrons change everything</text>
      <line x1="40" y1="50" x2="620" y2="50" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["BASIS", "IA (ns¹)", "IIA (ns²)"],
        ["hardness / mp", "soft, low mp", "harder, higher mp (no trend in IIA)"],
        ["water", "violent even for K", "gentler; Be/Mg need heat"],
        ["oxides", "M₂O / M₂O₂ / KO₂", "MO basic (BeO amphoteric)"],
        ["carbonates", "all soluble", "decreasing down; MgCO₃ sparingly"],
        ["flame", "all coloured", "Be/Mg none; Ca/Sr/Ba coloured"],
        ["nitrides", "only Li₃N", "all M₃N₂"]].map((row, i) => (
        <g key={i}>
          {[0, 1, 2].map((c) => (
            <text key={c} x={45 + c * 195} y={70 + i * 25} fontSize={i ? "10" : "10"} fontWeight={i ? (c ? "400" : "700") : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[c]}</text>
          ))}
          <line x1="40" y1={78 + i * 25} x2="620" y2={78 + i * 25} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
    </svg>
  );
}
