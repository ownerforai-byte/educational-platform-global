export function OzonolysisProductMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Ozonolysis products — read the fragments</text>
      <rect x="40" y="50" width="180" height="50" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="130" y="70" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">CH₂=CH₂</text>
      <text x="130" y="90" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">ethene</text>
      <text x="250" y="75" fontSize="14" textAnchor="middle" fill="currentColor">→</text>
      <text x="310" y="75" fontSize="12" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">2 HCHO</text>
      <text x="310" y="92" fontSize="9" textAnchor="middle" fill="rgb(148 163 184)">formaldehyde</text>
      <rect x="370" y="50" width="180" height="50" rx="6" fill="none" stroke="rgb(245 158 11)" strokeWidth="1.5" />
      <text x="460" y="70" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">CH₃CH=CHCH₃</text>
      <text x="460" y="90" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">but-2-ene</text>
      <text x="580" y="75" fontSize="14" textAnchor="middle" fill="currentColor">→</text>
      <rect x="40" y="130" width="180" height="50" rx="6" fill="none" stroke="rgb(239 68 68)" strokeWidth="1.5" />
      <text x="130" y="150" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">CH₃CH=CH₂</text>
      <text x="130" y="170" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">propene</text>
      <text x="250" y="155" fontSize="14" textAnchor="middle" fill="currentColor">→</text>
      <text x="305" y="155" fontSize="11" textAnchor="middle" fill="currentColor">HCHO +</text>
      <text x="360" y="155" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">CH₃CHO</text>
      <rect x="420" y="130" width="200" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="520" y="150" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">Terminal =CH₂ → HCHO</text>
      <text x="520" y="170" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">symmetric internal → 2 same</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Two identical fragments = symmetric alkene; two different = reconstruct the bond site.</text>
    </svg>
  );
}
