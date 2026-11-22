// OrganicClassificationTree figure. Theme-aware.
export function OrganicClassificationTree({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Complete classification tree of organic compounds">
      <text x="20" y="24" fontSize="14" fontWeight="800" className="fill-current text-foreground">The family tree of organic compounds</text>
      <rect x="260" y="38" width="140" height="30" rx="8" fill="rgb(59 130 246)" opacity="0.15" stroke="rgb(59 130 246)" />
      <text x="330" y="58" fontSize="11" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">ORGANIC</text>
      <line x1="330" y1="68" x2="150" y2="95" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <line x1="330" y1="68" x2="510" y2="95" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <rect x="60" y="95" width="180" height="26" rx="7" fill="rgb(16 185 129)" opacity="0.13" stroke="rgb(16 185 129)" />
      <text x="150" y="113" fontSize="10.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">OPEN CHAIN (aliphatic)</text>
      <rect x="420" y="95" width="180" height="26" rx="7" fill="rgb(245 158 11)" opacity="0.13" stroke="rgb(245 158 11)" />
      <text x="510" y="113" fontSize="10.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">CLOSED CHAIN (cyclic)</text>
      <line x1="150" y1="121" x2="60" y2="150" stroke="rgb(148 163 184)" strokeWidth="1" />
      <line x1="150" y1="121" x2="240" y2="150" stroke="rgb(148 163 184)" strokeWidth="1" />
      <line x1="510" y1="121" x2="420" y2="150" stroke="rgb(148 163 184)" strokeWidth="1" />
      <line x1="510" y1="121" x2="600" y2="150" stroke="rgb(148 163 184)" strokeWidth="1" />
      {[
        ["saturated (alkanes)", "CH₄, C₃H₈", 40, "rgb(16 185 129)"],
        ["unsaturated", "CH₂=CH₂, HC≡CH", 190, "rgb(16 185 129)"],
        ["alicyclic", "cyclohexane", 390, "rgb(245 158 11)"],
        ["aromatic", "benzene, toluene", 545, "rgb(245 158 11)"],
      ].map(([h, d, x, col]) => (
        <g key={h as string}>
          <rect x={x as number} y="150" width="130" height="40" rx="7" fill={col as string} opacity="0.1" stroke={col as string} />
          <text x={(x as number) + 65} y="166" fontSize="9.5" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 65} y="182" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <rect x="250" y="205" width="160" height="30" rx="7" fill="rgb(139 92 246)" opacity="0.12" stroke="rgb(139 92 246)" />
      <text x="330" y="218" fontSize="9.5" fontWeight="800" fill="rgb(139 92 246)" textAnchor="middle">HETEROCYCLIC (ring has N/O/S)</text>
      <text x="330" y="231" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">pyridine · furan · pyrrole</text>
    </svg>
  );
}
