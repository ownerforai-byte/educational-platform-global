export function AmmoniacalSilverTest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Ammoniacal AgNO₃ — the white verdict</text>
      <rect x="60" y="55" width="260" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="190" y="77" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">HC≡CH + 2[Ag(NH₃)₂]⁺</text>
      <text x="190" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">Tollens-type reagent</text>
      <line x1="335" y1="82" x2="375" y2="82" stroke="rgb(16 185 129)" strokeWidth="2" markerEnd="url(#ar117e)" />
      <marker id="ar117e" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(16 185 129)" /></marker>
      <rect x="390" y="55" width="230" height="55" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="2" />
      <text x="505" y="77" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">Ag₂C₂ ↓ (white)</text>
      <text x="505" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">silver acetylide</text>
      <rect x="60" y="130" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="152" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">The acidic ≡C–H proton is replaced by Ag — direct proof of acidity.</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Only TERMINAL alkynes respond; internal ones have no ≡C–H.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Dry heavy-metal acetylides are explosive — keep wet, destroy after test.</text>
    </svg>
  );
}
