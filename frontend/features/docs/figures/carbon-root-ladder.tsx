// CarbonRootLadder figure. Theme-aware.
export function CarbonRootLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="IUPAC root names from meth to hex for one to six carbons">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Root names: count the carbons</text>
      {[
        ["C1", "meth-", "rgb(59 130 246)"], ["C2", "eth-", "rgb(16 185 129)"], ["C3", "prop-", "rgb(245 158 11)"],
        ["C4", "but-", "rgb(239 68 68)"], ["C5", "pent-", "rgb(139 92 246)"], ["C6", "hex-", "rgb(20 184 166)"],
      ].map(([c, r, col], i) => (
        <g key={c as string}>
          <rect x={40 + (i as number) * 98} y="55" width="88" height="80" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={84 + (i as number) * 98} y="88" fontSize="12" fontWeight="800" textAnchor="middle" fill={col as string}>{c as string}</text>
          <text x={84 + (i as number) * 98} y="112" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{r as string}</text>
        </g>
      ))}
      <text x="330" y="170" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">root + ane = alkane · root + ene = alkene · root + yne = alkyne</text>
      <text x="330" y="196" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">methane, ethane, propane, butane, pentane, hexane — the six-carbon ladder of the syllabus</text>
    </svg>
  );
}
