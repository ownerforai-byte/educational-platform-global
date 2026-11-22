// Duet rule: hydrogen, helium and lithium cation. Theme-aware.
export function DuetRulePanel({ className }: { className?: string }) {
  const cells: [string, string, string][] = [
    ["H", "1 electron, wants 2", "shares one pair in H2"],
    ["He", "2 electrons, full", "no bonding needed"],
    ["Li+", "2 electrons after loss", "copies helium"],
  ];
  return (
    <svg viewBox="0 0 640 240" className={className} role="img" aria-label="Duet rule panel showing hydrogen helium and lithium cation each achieving a full first shell of two electrons">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The duet rule: the first shell holds only two</text>
      {cells.map(([sym, note, ex], i) => (
        <g key={i}>
          <rect x={40 + i * 196} y="52" width="176" height="140" rx="10" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.10" />
          <rect x={40 + i * 196} y="52" width="176" height="140" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text x={128 + i * 196} y="92" fontSize="20" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{sym}</text>
          <text x={128 + i * 196} y="122" fontSize="11" textAnchor="middle" className="fill-current text-foreground">{note}</text>
          <text x={128 + i * 196} y="146" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">{ex}</text>
        </g>
      ))}
      <text x="320" y="222" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Hydrogen stops at a pair, not an octet - the smallest exception to Kossel and Lewis</text>
    </svg>
  );
}
