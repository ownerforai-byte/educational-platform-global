// BondLineConventions figure. Theme-aware.
export function BondLineConventions({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Four conventions for reading bond line skeletal formulas">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Bond-line rules of the road</text>
      {[
        ["1", "every line end / vertex = a carbon atom", "rgb(59 130 246)", 55],
        ["2", "H on carbon is implied (valency 4) — never drawn", "rgb(16 185 129)", 95],
        ["3", "hetero atoms (O, N, S, X) shown, with their H (O–H, N–H)", "rgb(239 68 68)", 135],
        ["4", "double / triple bonds drawn as 2 / 3 parallel lines", "rgb(245 158 11)", 175],
      ].map(([n, d, col, y]) => (
        <g key={n as string}>
          <circle cx="62" cy={(y as number) + 14} r="13" fill={col as string} opacity="0.2" />
          <text x="62" y={(y as number) + 19} fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{n as string}</text>
          <text x="88" y={(y as number) + 19} fontSize="10.5" className="fill-current text-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="220" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">a five-point zig-zag reads as pentane; the same skeleton ending in –OH reads as pentan-1-ol</text>
    </svg>
  );
}
