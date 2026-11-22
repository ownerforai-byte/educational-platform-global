export function CalciumCarbideTwoStep({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Calcium carbide — two equations, in order</text>
      <rect x="40" y="50" width="220" height="55" rx="6" fill="none" stroke="rgb(245 158 11)" strokeWidth="1.5" />
      <text x="150" y="72" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">CaO + 3C</text>
      <text x="150" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">electric furnace ~2000 °C</text>
      <line x1="275" y1="77" x2="315" y2="77" stroke="rgb(148 163 184)" strokeWidth="2" markerEnd="url(#ar116b)" />
      <marker id="ar116b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(148 163 184)" /></marker>
      <rect x="330" y="50" width="130" height="55" rx="6" fill="none" stroke="rgb(139 92 246)" strokeWidth="1.5" />
      <text x="395" y="72" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">CaC₂ + CO</text>
      <text x="395" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">carbide</text>
      <line x1="475" y1="77" x2="515" y2="77" stroke="rgb(59 130 246)" strokeWidth="2" markerEnd="url(#ar116b)" />
      <marker id="ar116b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(59 130 246)" /></marker>
      <text x="495" y="64" fontSize="10" textAnchor="middle" fill="rgb(59 130 246)">H₂O</text>
      <rect x="40" y="130" width="580" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="330" y="152" fontSize="13" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">CaC₂ + 2H₂O → HC≡CH + Ca(OH)₂</text>
      <text x="330" y="172" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">ethyne + slaked lime — strongly exothermic</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">C₂²⁻ is the acetylide dianion — water simply protonates it twice.</text>
    </svg>
  );
}
