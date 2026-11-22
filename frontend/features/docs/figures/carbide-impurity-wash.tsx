export function CarbideImpurityWash({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Technical carbide — wash the gas before use</text>
      <rect x="40" y="55" width="200" height="55" rx="6" fill="none" stroke="rgb(245 158 11)" strokeWidth="1.5" />
      <text x="140" y="77" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">Crude ethyne</text>
      <text x="140" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">PH₃ + H₂S impurities</text>
      <line x1="255" y1="82" x2="295" y2="82" stroke="rgb(59 130 246)" strokeWidth="2" markerEnd="url(#ar116g)" />
      <marker id="ar116g" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(59 130 246)" /></marker>
      <text x="275" y="68" fontSize="10" textAnchor="middle" fill="rgb(59 130 246)">wash</text>
      <rect x="310" y="55" width="150" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="385" y="77" fontSize="11" textAnchor="middle" fill="currentColor">acid / CuCl</text>
      <text x="385" y="97" fontSize="9" textAnchor="middle" fill="rgb(148 163 184)">ammoniacal wash</text>
      <line x1="475" y1="82" x2="515" y2="82" stroke="rgb(16 185 129)" strokeWidth="2" markerEnd="url(#ar116g)" />
      <marker id="ar116g" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(16 185 129)" /></marker>
      <rect x="525" y="55" width="105" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="577" y="77" fontSize="11" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">Pure</text>
      <text x="577" y="97" fontSize="11" textAnchor="middle" fill="rgb(16 185 129)">C₂H₂</text>
      <rect x="60" y="130" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="152" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Ca₃P₂ and CaS in technical carbide hydrolyse to PH₃ and H₂S.</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Impure acetylene is not just smelly — PH₃ is spontaneously flammable.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Pure ethyne's garlic note comes from residual phosphine — wash it out.</text>
    </svg>
  );
}
