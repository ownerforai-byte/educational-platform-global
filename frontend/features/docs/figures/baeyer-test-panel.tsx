export function BaeyerTestPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Baeyer's test — purple surrenders to brown</text>
      <rect x="60" y="50" width="250" height="55" rx="6" fill="none" stroke="rgb(139 92 246)" strokeWidth="1.5" />
      <text x="185" y="72" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">Cold dilute alk. KMnO₄</text>
      <text x="185" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">Baeyer's reagent</text>
      <line x1="325" y1="77" x2="365" y2="77" stroke="rgb(148 163 184)" strokeWidth="2" markerEnd="url(#ar118b)" />
      <marker id="ar118b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(148 163 184)" /></marker>
      <rect x="380" y="50" width="220" height="55" rx="6" fill="none" stroke="rgb(146 64 14)" strokeWidth="2" />
      <text x="490" y="72" fontSize="12" textAnchor="middle" fill="rgb(146 64 14)" fontWeight="600">MnO₂ ↓ (brown)</text>
      <text x="490" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">purple discharged</text>
      <rect x="60" y="125" width="540" height="50" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="330" y="147" fontSize="10" textAnchor="middle" fill="currentColor" fontWeight="600">3CH₂=CH₂ + 2KMnO₄ + 4H₂O → 3CH₂(OH)CH₂(OH) + 2MnO₂↓ + 2KOH</text>
      <text x="330" y="165" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">ethene → ethane-1,2-diol (syn dihydroxylation)</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Keep it cold and dilute — hot or concentrated KMnO₄ cleaves the bond to acids instead.</text>
    </svg>
  );
}
