export function RealGasCompressDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 220" role="img" aria-label="Comparing compression of ideal and real gases" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Compression Test - Ideal vs Real</text>
      <g transform="translate(60, 45)">
        <rect width="180" height="80" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.5" />
        {[0, 1, 2, 3, 4, 5].map((j) => (<circle key={j} cx={35 + (j % 3) * 55} cy={25 + Math.floor(j / 3) * 35} r="8" className="fill-current opacity-50" />))}
        <text x="90" y="100" textAnchor="middle" fontSize="10.5" fill="currentColor">ideal: points shrink to nothing</text>
      </g>
      <g transform="translate(320, 45)">
        <rect width="180" height="80" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.5" />
        {[0, 1, 2, 3, 4, 5].map((j) => (<circle key={j} cx={35 + (j % 3) * 55} cy={25 + Math.floor(j / 3) * 35} r="12" className="fill-current opacity-40" />))}
        <text x="90" y="100" textAnchor="middle" fontSize="10.5" fill="currentColor">real: molecules have size (b)</text>
      </g>
      <line x1="250" y1="85" x2="310" y2="85" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrRc)" />
      <defs><marker id="arrRc" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor" /></marker></defs>
      <text x="280" y="160" textAnchor="middle" fontSize="11" className="fill-current opacity-75">High P: real gas resists more (Z &gt; 1). Low T: attraction helps compression (Z &lt; 1)</text>
      <text x="280" y="185" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">H2 and He never dip below Z = 1 - their a is too small</text>
      <text x="280" y="207" textAnchor="middle" fontSize="10.5" className="fill-current opacity-60">The dip-then-rise Z curve is the signature of a real gas</text>
    </svg>
  );
}
