export function MarkovnikovRulePanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Markovnikov's rule — the negative part chooses</text>
      <text x="120" y="60" fontSize="13" textAnchor="middle" fill="currentColor" fontWeight="600">CH₃–CH=CH₂</text>
      <text x="120" y="80" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">propene</text>
      <line x1="210" y1="55" x2="250" y2="55" stroke="rgb(59 130 246)" strokeWidth="2" markerEnd="url(#ar115a)" />
      <marker id="ar115a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(59 130 246)" /></marker>
      <text x="230" y="42" fontSize="10" textAnchor="middle" fill="rgb(59 130 246)">+HBr</text>
      <text x="300" y="60" fontSize="12" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">CH₃–CHBr–CH₃</text>
      <text x="300" y="80" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">2-bromopropane (major)</text>
      <rect x="60" y="100" width="540" height="55" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="122" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">The negative part (Br⁻) attaches to the carbon bearing FEWER hydrogens;</text>
      <text x="330" y="142" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">H⁺ goes to the carbon already holding more H — via the stabler carbocation.</text>
      <rect x="60" y="170" width="540" height="40" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="330" y="192" fontSize="11" textAnchor="middle" fill="rgb(59 130 246)">Every Markovnikov question is a carbocation-stability question in disguise.</text>
    </svg>
  );
}
