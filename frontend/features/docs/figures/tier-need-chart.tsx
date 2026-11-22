// TierNeedChart figure. Theme-aware.
export function TierNeedChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Daily requirement comparison of bulk macro and trace elements on a log scale">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The requirement spans seven orders of magnitude</text>
      {[
        ["bulk (C,H,O,N)", "kg/day", 6.4, "rgb(59 130 246)"],
        ["macro-minerals", "grams/day", 5.0, "rgb(16 185 129)"],
        ["Fe, Zn, Cu", "mg/day", 3.2, "rgb(245 158 11)"],
        ["iodine", "150 µg/day", 2.0, "rgb(239 68 68)"],
      ].map(([s, v, w, col], i) => (
        <g key={s as string}>
          <text x="60" y={62 + i * 34} fontSize="11.5" fontWeight="700" className="fill-current text-foreground">{s as string}</text>
          <rect x="230" y={50 + i * 34} width={(w as number) * 58} height="16" rx="4" fill={col as string} opacity="0.6" />
          <text x={240 + (w as number) * 58} y={63 + i * 34} fontSize="9.5" className="fill-current text-muted-foreground">{v as string}</text>
        </g>
      ))}
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Log scale — each step is ×100. Trace means tiny, not trivial</text>
    </svg>
  );
}
