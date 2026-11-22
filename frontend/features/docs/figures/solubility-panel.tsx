export function SolubilityPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Like dissolves like</text>
      <rect x="60" y="55" width="240" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="180" y="77" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">Water (polar, H-bonded)</text>
      <text x="180" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">hydrocarbons insoluble — they float</text>
      <rect x="360" y="55" width="240" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="1.5" />
      <text x="480" y="77" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">Benzene, ether, CCl₄</text>
      <text x="480" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">hydrocarbons soluble</text>
      <rect x="60" y="130" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="152" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Dissolving in water would break H-bonds with no compensating attraction.</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">In organic solvents, dispersion simply trades solute–solute for solute–solvent.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">All three families: density &lt; 1 g/cm³, oil-on-water physics.</text>
    </svg>
  );
}
