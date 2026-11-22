export function HydrogenationSurface({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Catalytic hydrogenation — a surface story</text>
      <rect x="60" y="60" width="180" height="50" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="150" y="80" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">CH₂=CH₂ + H₂</text>
      <text x="150" y="98" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">ethene</text>
      <line x1="255" y1="85" x2="300" y2="85" stroke="rgb(16 185 129)" strokeWidth="2" markerEnd="url(#ar112e)" />
      <marker id="ar112e" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(16 185 129)" /></marker>
      <text x="277" y="72" fontSize="12" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">Ni</text>
      <rect x="315" y="60" width="180" height="50" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="405" y="80" fontSize="12" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">CH₃–CH₃</text>
      <text x="405" y="98" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">ethane</text>
      <rect x="60" y="130" width="540" height="60" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="152" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Both reactants adsorb onto the metal surface → H–H bond splits</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">H atoms add one to each carbon → alkane desorbs</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Temperature: 200–300 °C — the metal does in seconds what heat alone does never.</text>
    </svg>
  );
}
