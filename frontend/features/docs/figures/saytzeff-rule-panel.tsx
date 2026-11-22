export function SaytzeffRulePanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Saytzeff — hydrogen leaves the poorer side</text>
      <text x="150" y="60" fontSize="11" textAnchor="middle" fill="currentColor">CH₃</text>
      <text x="215" y="60" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">CHBr</text>
      <text x="280" y="60" fontSize="11" textAnchor="middle" fill="currentColor">CH₂–CH₃</text>
      <text x="215" y="80" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">2-bromobutane</text>
      <line x1="240" y1="90" x2="240" y2="115" stroke="rgb(148 163 184)" strokeWidth="2" />
      <text x="240" y="132" fontSize="10" textAnchor="middle" fill="rgb(245 158 11)">alc. KOH</text>
      <text x="105" y="160" fontSize="10" textAnchor="middle" fill="rgb(59 130 246)">H from C1</text>
      <line x1="150" y1="155" x2="190" y2="155" stroke="rgb(59 130 246)" strokeWidth="2" markerEnd="url(#ar114d)" />
      <marker id="ar114d" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(59 130 246)" /></marker>
      <text x="255" y="160" fontSize="11" textAnchor="middle" fill="currentColor">but-1-ene</text>
      <text x="255" y="178" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">minor</text>
      <text x="320" y="160" fontSize="10" textAnchor="middle" fill="rgb(16 185 129)">H from C3</text>
      <line x1="365" y1="155" x2="405" y2="155" stroke="rgb(16 185 129)" strokeWidth="2" markerEnd="url(#ar114d)" />
      <marker id="ar114d" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(16 185 129)" /></marker>
      <text x="470" y="160" fontSize="11" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">but-2-ene</text>
      <text x="470" y="178" fontSize="10" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">MAJOR</text>
      <rect x="60" y="190" width="540" height="35" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="212" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">The more substituted (stabler) alkene wins — hydrogen departs from the carbon that already has fewer H.</text>
    </svg>
  );
}
