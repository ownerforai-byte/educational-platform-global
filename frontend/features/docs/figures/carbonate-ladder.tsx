// CarbonateLadder figure. Theme-aware.
export function CarbonateLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Falling solubility ladder of alkaline earth carbonates">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Carbonates — sinking gently</text>
      {[
        ["MgCO₃", "most soluble of the four (magnesite)", 0.75, "rgb(16 185 129)"],
        ["CaCO₃", "sparingly — limestone, scale", 0.4, "rgb(245 158 11)"],
        ["SrCO₃", "less", 0.2, "rgb(234 88 12)"],
        ["BaCO₃", "practically insoluble", 0.08, "rgb(239 68 68)"],
      ].map(([s, note, w, col], i) => (
        <g key={s as string}>
          <text x="60" y={62 + i * 34} fontSize="11.5" fontWeight="700" className="fill-current text-foreground">{s as string}</text>
          <rect x="170" y={50 + i * 34} width={(w as number) * 320} height="16" rx="4" fill={col as string} opacity="0.6" />
          <text x={180 + (w as number) * 320} y={63 + i * 34} fontSize="9.5" className="fill-current text-muted-foreground">{note as string}</text>
        </g>
      ))}
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Same large-anion logic as sulphates — and the same falling stability ladder follows (next topic)</text>
    </svg>
  );
}
