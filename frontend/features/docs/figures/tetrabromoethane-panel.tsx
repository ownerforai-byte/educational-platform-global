export function TetrabromoethanePanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Ethyne takes bromine twice</text>
      <rect x="60" y="55" width="240" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="180" y="77" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">HC≡CH + Br₂ → CHBr=CHBr</text>
      <text x="180" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">first addition — still unsaturated</text>
      <line x1="315" y1="82" x2="355" y2="82" stroke="rgb(245 158 11)" strokeWidth="2" markerEnd="url(#ar118d)" />
      <marker id="ar118d" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(245 158 11)" /></marker>
      <text x="335" y="68" fontSize="9" textAnchor="middle" fill="rgb(245 158 11)">+ Br₂</text>
      <rect x="370" y="55" width="230" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="485" y="77" fontSize="12" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">CHBr₂–CHBr₂</text>
      <text x="485" y="97" fontSize="9" textAnchor="middle" fill="rgb(148 163 184)">1,1,2,2-tetrabromoethane</text>
      <rect x="60" y="130" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="152" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Two equivalents consumed — twice the colour loss of ethene.</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">The intermediate dibromoalkene is itself a substrate for addition.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Quantitative tip: alkyne bleeds bromine water twice as fast per mole.</text>
    </svg>
  );
}
