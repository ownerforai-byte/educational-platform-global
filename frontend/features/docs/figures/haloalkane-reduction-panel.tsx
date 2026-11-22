export function HaloalkaneReductionPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Haloalkane → alkane: three reducing hands</text>
      <text x="120" y="55" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">RX</text>
      <line x1="190" y1="55" x2="240" y2="55" stroke="rgb(59 130 246)" strokeWidth="2" />
      <text x="215" y="45" fontSize="10" textAnchor="middle" fill="rgb(59 130 246)">LiAlH₄</text>
      <line x1="190" y1="75" x2="240" y2="75" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="215" y="95" fontSize="10" textAnchor="middle" fill="rgb(16 185 129)">Zn/HCl</text>
      <line x1="190" y1="95" x2="240" y2="95" stroke="rgb(245 158 11)" strokeWidth="2" />
      <text x="215" y="115" fontSize="10" textAnchor="middle" fill="rgb(245 158 11)">H₂/Pt</text>
      <text x="280" y="72" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">RH</text>
      <rect x="330" y="45" width="140" height="40" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="400" y="62" fontSize="11" textAnchor="middle" fill="currentColor">LiAlH₄ (ether)</text>
      <rect x="330" y="95" width="140" height="40" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="1.5" />
      <text x="400" y="112" fontSize="11" textAnchor="middle" fill="currentColor">Zn + conc. HCl</text>
      <rect x="330" y="145" width="140" height="40" rx="6" fill="none" stroke="rgb(245 158 11)" strokeWidth="1.5" />
      <text x="400" y="162" fontSize="11" textAnchor="middle" fill="currentColor">H₂ over Ni/Pt</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Each agent simply hands the carbon its hydrogen back — X⁻ departs as HX or salt.</text>
    </svg>
  );
}
