/** Vascular tissue bundle — xylem and phloem structure and roles. Theme-aware. */
export function VascularTissueBundle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Vascular bundle with xylem vessels carrying water upward and phloem sieve tubes carrying sugars both ways first true vascular tissue in pteridophytes">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The vascular bundle — plumbing that changed everything</text>

      {/* stem outline */}
      <rect x="230" y="50" width="200" height="150" rx="20" className="fill-current text-emerald-500/8" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />

      {/* xylem */}
      <g>
        {[[270, 90], [270, 120], [270, 150]].map(([x, y], i) => (
          <rect key={i} x={x - 18} y={y - 12} width="36" height="20" rx="4" className="fill-current text-sky-500/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        ))}
        <text x="270" y="70" fontSize="9" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">XYLEM</text>
        <text x="130" y="105" fontSize="8.5" className="fill-current text-muted-foreground">dead, hollow vessels</text>
        <text x="130" y="123" fontSize="8.5" className="fill-current text-muted-foreground">water + minerals ↑</text>
        <text x="130" y="141" fontSize="8.5" className="fill-current text-muted-foreground">also woody support</text>
      </g>

      {/* phloem */}
      <g>
        {[[390, 90], [390, 120], [390, 150]].map(([x, y], i) => (
          <rect key={i} x={x - 18} y={y - 12} width="36" height="20" rx="4" className="fill-current text-amber-500/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        ))}
        <text x="390" y="70" fontSize="9" textAnchor="middle" className="fill-current text-amber-700 dark:text-amber-300" fontWeight="800">PHLOEM</text>
        <text x="500" y="105" fontSize="8.5" className="fill-current text-muted-foreground">living sieve tubes</text>
        <text x="500" y="123" fontSize="8.5" className="fill-current text-muted-foreground">sugars ↑ and ↓</text>
        <text x="500" y="141" fontSize="8.5" className="fill-current text-muted-foreground">two-way flow</text>
      </g>

      <text x="16" y="226" fontSize="10" className="fill-current text-muted-foreground">Pteridophytes are the first plants with this plumbing — which is why they can stand tall while mosses cannot.</text>
    </svg>
  );
}
