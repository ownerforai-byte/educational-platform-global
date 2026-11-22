export function LindlarCatalystPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Lindlar — the poisoned catalyst stops on time</text>
      <rect x="60" y="55" width="200" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="160" y="77" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">HC≡CH + H₂</text>
      <text x="160" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">alkyne</text>
      <line x1="275" y1="82" x2="320" y2="82" stroke="rgb(16 185 129)" strokeWidth="2" markerEnd="url(#ar114e)" />
      <marker id="ar114e" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(16 185 129)" /></marker>
      <text x="297" y="68" fontSize="10" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">Lindlar</text>
      <rect x="335" y="55" width="240" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="455" y="77" fontSize="12" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">CH₂=CH₂</text>
      <text x="455" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">alkene only</text>
      <rect x="60" y="130" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="152" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Pd/BaSO₄ poisoned with quinoline — weaker by design.</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Full Ni would sail past the alkene to the alkane; Lindlar brakes exactly once.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Alkyne → alkene is thus the controlled step; alkane needs the unpoisoned metal.</text>
    </svg>
  );
}
