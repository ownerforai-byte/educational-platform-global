export function WaterVapourGradient({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 220" role="img" aria-label="Water migrates from higher to lower vapour pressure" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">The Deciding Rule: Water Flows High to Low VP</text>
      <g transform="translate(60, 55)">
        <rect width="200" height="70" rx="8" className="fill-current opacity-15" />
        <text x="100" y="30" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="currentColor">Hydrate VP &gt; air moisture</text>
        <text x="100" y="52" textAnchor="middle" fontSize="10.5" fill="currentColor">water leaves crystal</text>
        <text x="100" y="92" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">EFFLORESCENCE</text>
      </g>
      <g transform="translate(300, 55)">
        <rect width="200" height="70" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.2" />
        <text x="100" y="30" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="currentColor">Solution VP &lt; air moisture</text>
        <text x="100" y="52" textAnchor="middle" fontSize="10.5" fill="currentColor">water enters, dissolves</text>
        <text x="100" y="92" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">DELIQUESCENCE</text>
      </g>
      <line x1="265" y1="90" x2="295" y2="90" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrWv)" markerStart="url(#arrWv)" />
      <defs><marker id="arrWv" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor" /></marker></defs>
      <text x="280" y="165" textAnchor="middle" fontSize="11" className="fill-current opacity-75">In between: absorbs but stays solid - HYGROSCOPIC</text>
      <text x="280" y="195" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Same vapour-pressure logic that drives evaporation and drying agents</text>
    </svg>
  );
}
