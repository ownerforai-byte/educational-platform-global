export function BpLadderPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Boiling points at equal carbon (C₃+)</text>
      <line x1="80" y1="170" x2="600" y2="170" stroke="rgb(148 163 184)" strokeWidth="2" />
      <rect x="100" y="90" width="90" height="80" rx="6" fill="rgba(59 130 246 / 0.25)" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="145" y="80" fontSize="10" textAnchor="middle" fill="currentColor">alkane</text>
      <text x="145" y="105" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">lowest</text>
      <rect x="290" y="75" width="90" height="95" rx="6" fill="rgba(16 185 129 / 0.25)" stroke="rgb(16 185 129)" strokeWidth="1.5" />
      <text x="335" y="65" fontSize="10" textAnchor="middle" fill="currentColor">alkene</text>
      <text x="335" y="90" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">middle</text>
      <rect x="480" y="60" width="90" height="110" rx="6" fill="rgba(245 158 11 / 0.25)" stroke="rgb(245 158 11)" strokeWidth="1.5" />
      <text x="525" y="50" fontSize="10" textAnchor="middle" fill="currentColor">alkyne</text>
      <text x="525" y="75" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">highest</text>
      <text x="330" y="200" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">π electrons polarise more easily → stronger dispersion attraction</text>
      <text x="330" y="220" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">C₂ anomaly: ethene (−104 °C) boils below ethane (−89 °C) — trust the ladder from C₃.</text>
    </svg>
  );
}
