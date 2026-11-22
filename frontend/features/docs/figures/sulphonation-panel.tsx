export function SulphonationPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Sulphonation — a long-chain privilege</text>
      <rect x="60" y="55" width="240" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="180" y="77" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">C₁₆H₃₄ (hexane)</text>
      <text x="180" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">long-chain alkane</text>
      <line x1="315" y1="82" x2="360" y2="82" stroke="rgb(245 158 11)" strokeWidth="2" markerEnd="url(#ar113e)" />
      <marker id="ar113e" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(245 158 11)" /></marker>
      <text x="337" y="68" fontSize="10" textAnchor="middle" fill="rgb(245 158 11)">fuming H₂SO₄</text>
      <rect x="375" y="55" width="240" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="495" y="77" fontSize="12" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">C₁₆H₃₃SO₃H</text>
      <text x="495" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">sulphonic acid</text>
      <rect x="60" y="130" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="152" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Methane, ethane, propane refuse — the –SO₃H needs a stable enough carbon framework.</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Only higher alkanes (C₆ onward) accept the sulphonic group.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Product = arene-sulphonic-acid analogue of the alkyl chain: water-soluble surfactant chemistry.</text>
    </svg>
  );
}
