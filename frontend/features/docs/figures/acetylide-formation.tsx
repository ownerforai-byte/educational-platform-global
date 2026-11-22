export function AcetylideFormation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Acetylides — salts from a hydrocarbon</text>
      <rect x="40" y="55" width="230" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="155" y="77" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">HC≡CH + NaNH₂</text>
      <text x="155" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">liquid ammonia</text>
      <line x1="285" y1="82" x2="325" y2="82" stroke="rgb(16 185 129)" strokeWidth="2" markerEnd="url(#ar117d)" />
      <marker id="ar117d" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(16 185 129)" /></marker>
      <rect x="340" y="55" width="200" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="440" y="77" fontSize="12" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">HC≡C⁻ Na⁺</text>
      <text x="440" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">sodium acetylide</text>
      <rect x="40" y="130" width="580" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="152" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">With Na metal: HC≡CH + 2Na → 2NaC≡CH... hydrogen gas bubbles out.</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">The acetylide anion is a carbon nucleophile — C–C bond builder in synthesis.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Deprotonating a hydrocarbon with a base — possible only in the sp family.</text>
    </svg>
  );
}
