export function EthyneIdentityPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Ethyne = acetylene — one molecule, two names</text>
      <rect x="60" y="55" width="240" height="60" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="180" y="80" fontSize="15" textAnchor="middle" fill="currentColor" fontWeight="600">HC≡CH</text>
      <text x="180" y="102" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">IUPAC: ethyne</text>
      <rect x="360" y="55" width="240" height="60" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="1.5" />
      <text x="480" y="80" fontSize="15" textAnchor="middle" fill="currentColor" fontWeight="600">C₂H₂</text>
      <text x="480" y="102" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">trivial: acetylene</text>
      <rect x="60" y="135" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="157" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">sp carbons · 50% s-character · linear 180° · pKa ≈ 25</text>
      <text x="330" y="177" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">the only hydrocarbon family with acidic C–H bonds</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Oxy-acetylene flame: ~3300 °C — hot enough to cut steel.</text>
    </svg>
  );
}
