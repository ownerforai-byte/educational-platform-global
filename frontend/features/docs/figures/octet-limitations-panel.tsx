// Five limitations of the octet rule. Theme-aware.
export function OctetLimitationsPanel({ className }: { className?: string }) {
  const rows: [string, string][] = [
    ["Incomplete octet", "BeCl2 (4 around Be), BF3 (6 around B) - stable anyway"],
    ["Expanded octet", "PCl5 (10 around P), SF6 (12 around S) - third shell fits more"],
    ["Odd electrons", "NO and NO2 carry an unpaired electron - no octet possible"],
    ["Noble gases bond", "XeF2 and XeOF4 exist - the rule is not a law of nature"],
    ["Shape-blind", "The rule says nothing about geometry - VSEPR is needed"],
  ];
  return (
    <svg viewBox="0 0 680 320" className={className} role="img" aria-label="Five limitations of the octet rule with examples beryllium chloride boron trifluoride phosphorus pentachloride sulphur hexafluoride nitric oxide and xenon difluoride">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Where the octet rule breaks down</text>
      {rows.map(([head, body], i) => (
        <g key={i}>
          <rect x="24" y={44 + i * 54} width="632" height="46" rx="8" className="fill-current" style={{ color: "rgb(244 63 94)" }} opacity="0.08" />
          <rect x="24" y={44 + i * 54} width="632" height="46" rx="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <text x="40" y={64 + i * 54} fontSize="12" className="fill-current text-foreground" fontWeight="800">{head}</text>
          <text x="40" y={82 + i * 54} fontSize="11" className="fill-current text-muted-foreground">{body}</text>
        </g>
      ))}
    </svg>
  );
}
