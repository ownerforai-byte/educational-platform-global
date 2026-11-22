export function SuccinateElectrolysisFlow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Potassium succinate → ethyne</text>
      <rect x="40" y="50" width="250" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="165" y="72" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">KOOC–CH₂–CH₂–COOK</text>
      <text x="165" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">both ends decarboxylate</text>
      <line x1="305" y1="77" x2="345" y2="77" stroke="rgb(245 158 11)" strokeWidth="2" markerEnd="url(#ar120d)" />
      <marker id="ar120d" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(245 158 11)" /></marker>
      <text x="325" y="64" fontSize="9" textAnchor="middle" fill="rgb(245 158 11)">−2CO₂</text>
      <rect x="360" y="50" width="130" height="55" rx="6" fill="none" stroke="rgb(139 92 246)" strokeWidth="1.5" />
      <text x="425" y="72" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">·CH₂–CH₂·</text>
      <text x="425" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">diradical pair</text>
      <line x1="505" y1="77" x2="545" y2="77" stroke="rgb(239 68 68)" strokeWidth="2" markerEnd="url(#ar120d)" />
      <marker id="ar120d" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(239 68 68)" /></marker>
      <text x="525" y="64" fontSize="9" textAnchor="middle" fill="rgb(239 68 68)">−2H</text>
      <rect x="60" y="125" width="540" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="330" y="147" fontSize="11" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">KOOC–CH₂–CH₂–COOK + 2KOH → HC≡CH + 2K₂CO₃ + 2H₂</text>
      <text x="330" y="167" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">the succinate's own skeleton becomes the triple bond — intramolecular coupling</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">One molecule, two anodic exits, one alkyne — no partner molecule needed.</text>
    </svg>
  );
}
