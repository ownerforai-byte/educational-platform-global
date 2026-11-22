export function FlameComparisonPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Flames as fingerprints</text>
      <circle cx="140" cy="110" r="30" fill="none" stroke="rgb(59 130 246)" strokeWidth="2.5" />
      <text x="140" y="165" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">Alkane</text>
      <text x="140" y="183" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">clean blue</text>
      <circle cx="330" cy="110" r="30" fill="none" stroke="rgb(245 158 11)" strokeWidth="2.5" />
      <text x="330" y="165" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">Alkene</text>
      <text x="330" y="183" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">luminous</text>
      <circle cx="520" cy="110" r="30" fill="none" stroke="rgb(239 68 68)" strokeWidth="2.5" />
      <text x="520" y="165" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">Alkyne</text>
      <text x="520" y="183" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">smoky, luminous</text>
      <text x="330" y="50" fontSize="12" textAnchor="middle" fill="rgb(148 163 184)">Carbon percentage climbs across the families</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Ethyne: ~92% carbon → oxygen-starved flame sheds glowing soot — the torch's signature.</text>
    </svg>
  );
}
