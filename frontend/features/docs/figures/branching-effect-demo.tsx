export function BranchingEffectDemo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Branching lowers the boiling point</text>
      <rect x="60" y="55" width="240" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="180" y="77" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">n-Butane (straight)</text>
      <text x="180" y="97" fontSize="11" textAnchor="middle" fill="rgb(245 158 11)">b.p. −0.5 °C</text>
      <rect x="360" y="55" width="240" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="1.5" />
      <text x="480" y="77" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">Isobutane (branched)</text>
      <text x="480" y="97" fontSize="11" textAnchor="middle" fill="rgb(245 158 11)">b.p. −11.7 °C</text>
      <rect x="60" y="130" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="152" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Same formula C₄H₈ — the branched sphere offers less contact surface.</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Less surface → weaker dispersion → easier to boil apart.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Branching can outweigh unsaturation: shape matters as much as π bonds.</text>
    </svg>
  );
}
