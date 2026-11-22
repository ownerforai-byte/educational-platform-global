export function AmmoniacalCopperTest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Ammoniacal Cu₂Cl₂ — the red verdict</text>
      <rect x="60" y="55" width="260" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="190" y="77" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">HC≡CH + 2[Cu(NH₃)₂]⁺</text>
      <text x="190" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">ammoniacal cuprous chloride</text>
      <line x1="335" y1="82" x2="375" y2="82" stroke="rgb(239 68 68)" strokeWidth="2" markerEnd="url(#ar117f)" />
      <marker id="ar117f" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(239 68 68)" /></marker>
      <rect x="390" y="55" width="230" height="55" rx="6" fill="none" stroke="rgb(239 68 68)" strokeWidth="2" />
      <text x="505" y="77" fontSize="12" textAnchor="middle" fill="rgb(239 68 68)" fontWeight="600">Cu₂C₂ ↓ (red)</text>
      <text x="505" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">copper acetylide</text>
      <rect x="60" y="130" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="152" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Same chemistry as the silver test — different metal, different colour.</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">White with Ag, red with Cu: two witnesses, one terminal ≡C–H.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">These precipitates separate ethyne from ethene — bromine water cannot.</text>
    </svg>
  );
}
