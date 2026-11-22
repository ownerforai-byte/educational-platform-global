// CatenationChainTypes figure. Theme-aware.
export function CatenationChainTypes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Straight branched and cyclic chains formed by carbon catenation">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Catenation: chains, branches, rings</text>
      <rect x="40" y="55" width="180" height="90" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="130" y="78" fontSize="11" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">STRAIGHT</text>
      {[70, 105, 140, 175].map((cx) => (
        <g key={cx}><circle cx={cx} cy="115" r="9" fill="rgb(59 130 246)" opacity="0.4" />{cx > 70 && <line x1={cx - 35} y1="115" x2={cx - 9} y2="115" stroke="rgb(59 130 246)" strokeWidth="2.5" />}</g>
      ))}
      <text x="130" y="160" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">n-pentane skeleton</text>
      <rect x="240" y="55" width="180" height="90" rx="10" fill="rgb(16 185 129)" opacity="0.08" stroke="rgb(16 185 129)" />
      <text x="330" y="78" fontSize="11" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">BRANCHED</text>
      <circle cx="300" cy="120" r="9" fill="rgb(16 185 129)" opacity="0.4" /><circle cx="335" cy="105" r="9" fill="rgb(16 185 129)" opacity="0.4" />
      <circle cx="335" cy="135" r="9" fill="rgb(16 185 129)" opacity="0.4" /><circle cx="370" cy="120" r="9" fill="rgb(16 185 129)" opacity="0.4" />
      <line x1="309" y1="116" x2="326" y2="108" stroke="rgb(16 185 129)" strokeWidth="2.5" /><line x1="309" y1="124" x2="326" y2="132" stroke="rgb(16 185 129)" strokeWidth="2.5" />
      <line x1="344" y1="108" x2="361" y2="116" stroke="rgb(16 185 129)" strokeWidth="2.5" /><line x1="344" y1="132" x2="361" y2="124" stroke="rgb(16 185 129)" strokeWidth="2.5" />
      <text x="330" y="160" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">isopentane skeleton</text>
      <rect x="440" y="55" width="180" height="90" rx="10" fill="rgb(245 158 11)" opacity="0.08" stroke="rgb(245 158 11)" />
      <text x="530" y="78" fontSize="11" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">CYCLIC</text>
      <polygon points="530,95 558,112 548,142 512,142 502,112" fill="none" stroke="rgb(245 158 11)" strokeWidth="2.5" />
      <text x="530" y="160" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">cyclopentane skeleton</text>
      <text x="330" y="180" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">strong C–C bonds (≈348 kJ/mol) + small atoms + tetravalency = unlimited self-linking</text>
      <text x="330" y="202" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">silicon tries and fails: Si–Si ≈ 226 kJ/mol → silanes stop at a few units</text>
      <text x="330" y="224" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">every chain carbon still has valencies free for H or functional groups</text>
    </svg>
  );
}
