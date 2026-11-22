// CarbonateDecompLadder figure. Theme-aware.
export function CarbonateDecompLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Decomposition temperature ladder of alkaline earth carbonates">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">MCO₃ → MO + CO₂ — the temperature ladder</text>
      {[
        ["BeCO₃", "below 100 °C", 0.06, "rgb(148 163 184)"],
        ["MgCO₃", "~350 °C", 0.24, "rgb(59 130 246)"],
        ["CaCO₃", "~900 °C (lime kiln)", 0.55, "rgb(245 158 11)"],
        ["SrCO₃", "~1290 °C", 0.8, "rgb(234 88 12)"],
        ["BaCO₃", "~1360 °C", 0.92, "rgb(239 68 68)"],
      ].map(([s, note, w, col], i) => (
        <g key={s as string}>
          <text x="55" y={58 + i * 28} fontSize="11" fontWeight="700" className="fill-current text-foreground">{s as string}</text>
          <rect x="130" y={46 + i * 28} width={(w as number) * 380} height="15" rx="4" fill={col as string} opacity="0.6" />
          <text x={140 + (w as number) * 380} y={59 + i * 28} fontSize="9.5" className="fill-current text-muted-foreground">{note as string}</text>
        </g>
      ))}
      <text x="330" y="196" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Stability increases down the group — all give the oxide plus carbon dioxide</text>
      <text x="330" y="218" fontSize="10.5" textAnchor="middle" fill="rgb(139 92 246)">BeCO₃ is so labile it needs a CO₂ atmosphere just to be kept</text>
    </svg>
  );
}
