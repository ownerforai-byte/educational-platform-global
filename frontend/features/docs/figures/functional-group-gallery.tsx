// FunctionalGroupGallery figure. Theme-aware.
export function FunctionalGroupGallery({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Gallery of common functional groups with their families">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The reactive patches</text>
      {[
        ["–OH", "alcohol", "rgb(59 130 246)", 40, 55],
        ["–CHO", "aldehyde", "rgb(16 185 129)", 240, 55],
        [">C=O", "ketone", "rgb(245 158 11)", 440, 55],
        ["–COOH", "acid", "rgb(239 68 68)", 40, 125],
        ["–X", "halide", "rgb(139 92 246)", 240, 125],
        ["–NH₂", "amine", "rgb(20 184 166)", 440, 125],
      ].map(([g, f, col, x, y]) => (
        <g key={f as string}>
          <rect x={x as number} y={y as number} width="180" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y={(y as number) + 26} fontSize="13" fontWeight="800" textAnchor="middle" fill={col as string}>{g as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 46} fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">{f as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The C–C/C–H skeleton is inert; the group carries the chemistry — one group, one family</text>
    </svg>
  );
}
