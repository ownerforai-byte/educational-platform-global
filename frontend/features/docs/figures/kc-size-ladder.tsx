// Kc size ladder and what it means for extent. Theme-aware.
export function KcSizeLadder({ className }: { className?: string }) {
  const tiers: [string, string, string, string][] = [
    ["Kc >> 1 (10^5 and up)", "products dominate - nearly complete", "H2O formation", "rgb(16 185 129)"],
    ["Kc ~ 1", "both sides appreciable - true contest", "HI formation", "rgb(14 165 233)"],
    ["Kc << 1 (10^-5 and down)", "reactants dominate - negligible yield", "NO from N2 + O2 at 25 C", "rgb(239 68 68)"],
  ];
  return (
    <svg viewBox="0 0 660 270" className={className} role="img" aria-label="Ladder of equilibrium constant sizes from product-dominated through balanced to reactant-dominated with examples">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">What the number says</text>
      {tiers.map(([k, mean, ex, c], i) => (
        <g key={i}>
          <rect x="40" y={48 + i * 66} width="580" height="54" rx="9" className="fill-current" style={{ color: c }} opacity="0.15" />
          <text x="58" y={70 + i * 66} fontSize="13" fontWeight="800" style={{ fill: c }}>{k}</text>
          <text x="58" y={90 + i * 66} fontSize="11.5" className="fill-current text-foreground">{mean}</text>
          <text x="480" y={90 + i * 66} fontSize="10.5" className="fill-current text-muted-foreground">{ex}</text>
        </g>
      ))}
      <text x="330" y="258" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Big constant, big harvest - the constant grades the yield</text>
    </svg>
  );
}
