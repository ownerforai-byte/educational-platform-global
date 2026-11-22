export function KolbeAnodeCathode({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Kolbe electrolysis — the anode is the workshop</text>
      <rect x="60" y="55" width="240" height="60" rx="6" fill="none" stroke="rgb(239 68 68)" strokeWidth="2" />
      <text x="180" y="80" fontSize="13" textAnchor="middle" fill="rgb(239 68 68)" fontWeight="600">ANODE (+)</text>
      <text x="180" y="102" fontSize="10" textAnchor="middle" fill="currentColor">RCOO⁻ → R· + CO₂ + e⁻</text>
      <text x="180" y="112" fontSize="9" textAnchor="middle" fill="rgb(148 163 184)">radicals couple → product</text>
      <rect x="360" y="55" width="240" height="60" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="2" />
      <text x="480" y="80" fontSize="13" textAnchor="middle" fill="rgb(59 130 246)" fontWeight="600">CATHODE (−)</text>
      <text x="480" y="102" fontSize="10" textAnchor="middle" fill="currentColor">2H₂O + 2e⁻ → H₂ + 2OH⁻</text>
      <text x="480" y="112" fontSize="9" textAnchor="middle" fill="rgb(148 163 184)">H₂ gas + NaOH forms</text>
      <line x1="300" y1="85" x2="360" y2="85" stroke="rgb(148 163 184)" strokeWidth="2" strokeDasharray="4 3" />
      <rect x="60" y="135" width="540" height="45" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="157" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Every C–C bond of the product is forged at the anode — the cathode merely makes hydrogen.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Putting the product at the cathode is the classic error — oxidation happens at the anode.</text>
    </svg>
  );
}
