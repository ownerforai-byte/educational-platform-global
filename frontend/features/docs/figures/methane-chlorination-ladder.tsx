export function MethaneChlorinationLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Methane + Cl₂: the substitution ladder</text>
      <text x="60" y="50" fontSize="13" textAnchor="middle" fill="currentColor" fontWeight="600">CH₄</text>
      <line x1="100" y1="46" x2="150" y2="46" stroke="rgb(59 130 246)" strokeWidth="2" markerEnd="url(#ar113a)" />
      <marker id="ar113a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(59 130 246)" /></marker>
      <text x="125" y="36" fontSize="10" textAnchor="middle" fill="rgb(59 130 246)">Cl₂/hν</text>
      <text x="180" y="50" fontSize="12" textAnchor="middle" fill="currentColor">CH₃Cl</text>
      <line x1="220" y1="46" x2="270" y2="46" stroke="rgb(59 130 246)" strokeWidth="2" markerEnd="url(#ar113a)" />
      <marker id="ar113a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(59 130 246)" /></marker>
      <text x="245" y="36" fontSize="10" textAnchor="middle" fill="rgb(59 130 246)">Cl₂/hν</text>
      <text x="300" y="50" fontSize="12" textAnchor="middle" fill="currentColor">CH₂Cl₂</text>
      <line x1="340" y1="46" x2="390" y2="46" stroke="rgb(59 130 246)" strokeWidth="2" markerEnd="url(#ar113a)" />
      <marker id="ar113a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(59 130 246)" /></marker>
      <text x="365" y="36" fontSize="10" textAnchor="middle" fill="rgb(59 130 246)">Cl₂/hν</text>
      <text x="420" y="50" fontSize="12" textAnchor="middle" fill="currentColor">CHCl₃</text>
      <line x1="440" y1="46" x2="490" y2="46" stroke="rgb(59 130 246)" strokeWidth="2" markerEnd="url(#ar113a)" />
      <marker id="ar113a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(59 130 246)" /></marker>
      <text x="465" y="36" fontSize="10" textAnchor="middle" fill="rgb(59 130 246)">Cl₂/hν</text>
      <text x="520" y="50" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">CCl₄</text>
      <text x="180" y="75" fontSize="9" textAnchor="middle" fill="rgb(148 163 184)">chloromethane</text>
      <text x="300" y="75" fontSize="9" textAnchor="middle" fill="rgb(148 163 184)">dichloro-</text>
      <text x="420" y="75" fontSize="9" textAnchor="middle" fill="rgb(148 163 184)">chloroform</text>
      <text x="520" y="75" fontSize="9" textAnchor="middle" fill="rgb(148 163 184)">carbon tet.</text>
      <rect x="60" y="95" width="540" height="55" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="118" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Each step swaps ONE H for ONE Cl; sunlight (hν) or 250–400 °C drives it.</text>
      <text x="330" y="138" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Uncontrolled → all four chlorides at once; control ratio/conditions to favour one.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">The ladder never stops on its own — every product is still a substrate.</text>
    </svg>
  );
}
