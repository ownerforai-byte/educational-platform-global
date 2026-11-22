export function StateLadderPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">States across the carbon ladder</text>
      <rect x="60" y="50" width="160" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="2" />
      <text x="140" y="72" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">C₁–C₄</text>
      <text x="140" y="92" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">gases</text>
      <rect x="250" y="50" width="160" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="330" y="72" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">C₅–C₁₇</text>
      <text x="330" y="92" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">liquids</text>
      <rect x="440" y="50" width="160" height="55" rx="6" fill="none" stroke="rgb(245 158 11)" strokeWidth="2" />
      <text x="520" y="72" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">C₁₈+</text>
      <text x="520" y="92" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">waxy solids</text>
      <rect x="60" y="125" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="147" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Longer chains → more contact surface → stronger dispersion forces.</text>
      <text x="330" y="167" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">All three families obey the same ladder — unsaturation barely shifts it.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Pure members are odourless; fuel smells come from additives and impurities.</text>
    </svg>
  );
}
