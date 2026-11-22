export function DiamondGraphiteContrast({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 230" role="img" aria-label="Diamond versus graphite structure and properties" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Same Carbon, Opposite Worlds</text>
      <g transform="translate(60, 45)">
        <rect width="190" height="120" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.2" />
        {[[55, 35], [105, 35], [80, 65], [55, 95], [105, 95]].map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="8" className="fill-current opacity-50" />
        ))}
        <line x1="55" y1="35" x2="105" y2="35" stroke="currentColor" strokeWidth="1.5" className="opacity-60" />
        <line x1="55" y1="35" x2="80" y2="65" stroke="currentColor" strokeWidth="1.5" className="opacity-60" />
        <line x1="105" y1="35" x2="80" y2="65" stroke="currentColor" strokeWidth="1.5" className="opacity-60" />
        <line x1="80" y1="65" x2="55" y2="95" stroke="currentColor" strokeWidth="1.5" className="opacity-60" />
        <line x1="80" y1="65" x2="105" y2="95" stroke="currentColor" strokeWidth="1.5" className="opacity-60" />
        <line x1="55" y1="95" x2="105" y2="95" stroke="currentColor" strokeWidth="1.5" className="opacity-60" />
        <text x="95" y="140" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">DIAMOND sp3</text>
      </g>
      <g transform="translate(310, 45)">
        <rect width="190" height="120" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.2" />
        {[0, 1, 2].map((j) => (
          <line key={j} x1="30" y1={30 + j * 30} x2="160" y2={30 + j * 30} stroke="currentColor" strokeWidth="3" className="opacity-50" />
        ))}
        <text x="95" y="140" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">GRAPHITE sp2</text>
      </g>
      <text x="155" y="185" textAnchor="middle" fontSize="10" className="fill-current opacity-70">hardest, insulator</text>
      <text x="405" y="185" textAnchor="middle" fontSize="10" className="fill-current opacity-70">lubricant, conductor</text>
      <text x="280" y="215" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">3-D sigma network vs sliding sheets with delocalised pi electrons</text>
    </svg>
  );
}
