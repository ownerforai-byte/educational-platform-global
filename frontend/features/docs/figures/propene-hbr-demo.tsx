export function PropeneHbrDemo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Propene + HBr — the carbocation fork</text>
      <text x="140" y="55" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">CH₂=CH–CH₃</text>
      <text x="140" y="75" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">C1: 2H · C2: 1H</text>
      <line x1="230" y1="50" x2="270" y2="40" stroke="rgb(59 130 246)" strokeWidth="2" markerEnd="url(#ar115b)" />
      <marker id="ar115b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(59 130 246)" /></marker>
      <text x="250" y="30" fontSize="9" textAnchor="middle" fill="rgb(59 130 246)">H⁺ → C1</text>
      <line x1="230" y1="60" x2="270" y2="80" stroke="rgb(148 163 184)" strokeWidth="2" markerEnd="url(#ar115b)" />
      <marker id="ar115b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(148 163 184)" /></marker>
      <text x="250" y="95" fontSize="9" textAnchor="middle" fill="rgb(148 163 184)">H⁺ → C2</text>
      <circle cx="310" cy="38" r="14" fill="none" stroke="rgb(239 68 68)" strokeWidth="2" />
      <text x="310" y="42" fontSize="10" textAnchor="middle" fill="rgb(239 68 68)" fontWeight="600">2°</text>
      <text x="390" y="42" fontSize="10" textAnchor="middle" fill="currentColor">CH₃–C⁺H–CH₃</text>
      <circle cx="310" cy="85" r="14" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="310" y="89" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">1°</text>
      <text x="390" y="89" fontSize="10" textAnchor="middle" fill="currentColor">CH₂⁺–CH₂–CH₃</text>
      <text x="330" y="120" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">secondary carbocation wins → Br⁻ attacks C2</text>
      <rect x="120" y="140" width="420" height="45" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="330" y="162" fontSize="12" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">CH₃–CH=CH₂ + HBr → CH₃–CHBr–CH₃</text>
      <text x="330" y="178" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">2-bromopropane — the Markovnikov product</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">1-bromopropane would need the unstable 1° cation — it barely forms.</text>
    </svg>
  );
}
