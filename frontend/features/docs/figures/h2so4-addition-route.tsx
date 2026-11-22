export function H2so4AdditionRoute({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">H₂SO₄ addition — the two-step detour</text>
      <rect x="40" y="55" width="180" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="130" y="77" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">CH₂=CH₂</text>
      <text x="130" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">ethene</text>
      <line x1="235" y1="82" x2="275" y2="82" stroke="rgb(245 158 11)" strokeWidth="2" markerEnd="url(#ar115e)" />
      <marker id="ar115e" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(245 158 11)" /></marker>
      <text x="255" y="68" fontSize="10" textAnchor="middle" fill="rgb(245 158 11)">H₂SO₄</text>
      <rect x="290" y="55" width="180" height="55" rx="6" fill="none" stroke="rgb(139 92 246)" strokeWidth="1.5" />
      <text x="380" y="77" fontSize="10" textAnchor="middle" fill="currentColor" fontWeight="600">CH₃CH₂OSO₃H</text>
      <text x="380" y="97" fontSize="9" textAnchor="middle" fill="rgb(148 163 184)">ethyl hydrogen sulphate</text>
      <line x1="485" y1="82" x2="525" y2="82" stroke="rgb(16 185 129)" strokeWidth="2" markerEnd="url(#ar115e)" />
      <marker id="ar115e" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(16 185 129)" /></marker>
      <text x="505" y="68" fontSize="10" textAnchor="middle" fill="rgb(16 185 129)">H₂O</text>
      <rect x="525" y="55" width="110" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="580" y="77" fontSize="11" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">C₂H₅OH</text>
      <text x="580" y="97" fontSize="9" textAnchor="middle" fill="rgb(148 163 184)">ethanol</text>
      <rect x="60" y="130" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="152" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">The acid is a reactant in step 1 and a catalyst overall — regenerated in step 2.</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Direct water addition is too slow; the sulphate ester is the fast lane.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">This is the same chemistry the hydration panel summarises — here in slow motion.</text>
    </svg>
  );
}
