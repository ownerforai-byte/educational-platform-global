export function KolbeCarbonRule({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">The carbon rule — count R, not the salt</text>
      <rect x="60" y="50" width="240" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="180" y="72" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">Product carbons = 2 × (R carbons)</text>
      <text x="180" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">carboxyl carbons always leave as CO₂</text>
      <rect x="40" y="125" width="180" height="45" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="130" y="147" fontSize="10" textAnchor="middle" fill="currentColor" fontWeight="600">acetate: R=C₁</text>
      <text x="130" y="162" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">→ ethane C₂</text>
      <rect x="240" y="125" width="180" height="45" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="1.5" />
      <text x="330" y="147" fontSize="10" textAnchor="middle" fill="currentColor" fontWeight="600">propionate: R=C₂</text>
      <text x="330" y="162" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">→ butane C₄</text>
      <rect x="440" y="125" width="180" height="45" rx="6" fill="none" stroke="rgb(245 158 11)" strokeWidth="1.5" />
      <text x="530" y="147" fontSize="10" textAnchor="middle" fill="currentColor" fontWeight="600">succinate: 2×C₁</text>
      <text x="530" y="162" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">→ ethyne C₂</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">One counting rule predicts every Kolbe product — check it before balancing.</text>
    </svg>
  );
}
