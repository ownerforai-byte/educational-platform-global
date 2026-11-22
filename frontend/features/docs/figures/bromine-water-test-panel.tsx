export function BromineWaterTestPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Bromine water — the instant confession</text>
      <rect x="60" y="50" width="240" height="55" rx="6" fill="none" stroke="rgb(245 158 11)" strokeWidth="1.5" />
      <text x="180" y="72" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">Br₂(aq) red-brown</text>
      <text x="180" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">in the dark, cold</text>
      <line x1="315" y1="77" x2="355" y2="77" stroke="rgb(16 185 129)" strokeWidth="2" markerEnd="url(#ar118a)" />
      <marker id="ar118a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(16 185 129)" /></marker>
      <rect x="370" y="50" width="230" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="485" y="72" fontSize="12" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">colour gone</text>
      <text x="485" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">= π bond present</text>
      <rect x="40" y="125" width="280" height="50" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="180" y="147" fontSize="10" textAnchor="middle" fill="currentColor" fontWeight="600">CH₂=CH₂ + Br₂ → BrCH₂CH₂Br</text>
      <text x="180" y="165" fontSize="9" textAnchor="middle" fill="rgb(148 163 184)">1,2-dibromoethane (1 eq)</text>
      <rect x="340" y="125" width="280" height="50" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="480" y="147" fontSize="10" textAnchor="middle" fill="currentColor" fontWeight="600">HC≡CH + 2Br₂ → CHBr₂CHBr₂</text>
      <text x="480" y="165" fontSize="9" textAnchor="middle" fill="rgb(148 163 184)">tetrabromoethane (2 eq)</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Addition, not substitution — which is why it must happen in the dark.</text>
    </svg>
  );
}
