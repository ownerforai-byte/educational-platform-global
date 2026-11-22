// Flip and scale rules for Kc. Theme-aware.
export function FlipScaleRules({ className }: { className?: string }) {
  const rules: [string, string, string][] = [
    ["reverse the equation", "Kc becomes 1/Kc", "rgb(239 68 68)"],
    ["double all coefficients", "Kc becomes (Kc)^2", "rgb(245 158 11)"],
    ["halve all coefficients", "Kc becomes sqrt(Kc)", "rgb(14 165 233)"],
    ["change temperature", "entirely new Kc", "rgb(16 185 129)"],
  ];
  return (
    <svg viewBox="0 0 660 290" className={className} role="img" aria-label="Four operations on an equation and their effect on the equilibrium constant: reversing inverts, doubling squares, halving square-roots, temperature replaces">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Rewrite the equation, rewrite the constant</text>
      {rules.map(([op, eff, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 54} width="270" height="42" rx="8" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="58" y={72 + i * 54} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{op}</text>
          <path d="M 320 67 L 360 67" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" markerEnd="url(#arrf)" />
          <rect x="370" y={46 + i * 54} width="250" height="42" rx="8" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ color: c }} />
          <text x="495" y={72 + i * 54} fontSize="12.5" fontWeight="800" textAnchor="middle" style={{ fill: c }}>{eff}</text>
        </g>
      ))}
      <defs><marker id="arrf" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="currentColor" className="text-muted-foreground" /></marker></defs>
      <text x="330" y="280" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Kc is married to the equation exactly as written</text>
    </svg>
  );
}
