// OrganicPropertySix figure. Theme-aware.
export function OrganicPropertySix({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Six characteristic properties of organic compounds">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Six signatures of an organic compound</text>
      {[
        ["covalent molecules", "low m.p./b.p.", "rgb(59 130 246)", 40, 55],
        ["flammable", "burn to CO₂ + H₂O", "rgb(239 68 68)", 240, 55],
        ["non-conductors", "no ions to carry charge", "rgb(245 158 11)", 440, 55],
        ["organic-solvent soluble", "water-insoluble mostly", "rgb(16 185 129)", 40, 125],
        ["isomerism", "one formula, many compounds", "rgb(139 92 246)", 240, 125],
        ["slow reactions", "molecular, need catalysts", "rgb(20 184 166)", 440, 125],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="180" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y={(y as number) + 24} fontSize="10.5" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 44} fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">All six trace back to covalent molecular structure — quote the cause, not just the list</text>
    </svg>
  );
}
