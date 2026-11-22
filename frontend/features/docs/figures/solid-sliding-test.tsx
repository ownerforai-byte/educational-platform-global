export function SolidSlidingTest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 220" role="img" aria-label="Sliding layer test distinguishing ionic and metallic solids" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">The Sliding Test</text>
      <g transform="translate(60, 45)">
        <rect width="190" height="50" rx="6" className="fill-current opacity-15" />
        <text x="95" y="30" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="currentColor">+ - + - layer</text>
        <rect width="190" height="50" rx="6" className="fill-current opacity-15" transform="translate(30, 60)" />
        <text x="125" y="90" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="currentColor">- + - + shifted</text>
        <text x="95" y="140" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="currentColor">NaCl: SHATTERS</text>
        <text x="95" y="157" textAnchor="middle" fontSize="10" className="fill-current opacity-70">like charges meet</text>
      </g>
      <g transform="translate(310, 45)">
        <rect width="190" height="50" rx="6" className="fill-current opacity-15" />
        <text x="95" y="30" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="currentColor">metal layer</text>
        <rect width="190" height="50" rx="6" className="fill-current opacity-15" transform="translate(30, 60)" />
        <text x="125" y="90" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="currentColor">layer slides on</text>
        <text x="95" y="140" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="currentColor">Cu: BENDS</text>
        <text x="95" y="157" textAnchor="middle" fontSize="10" className="fill-current opacity-70">electron sea re-adjusts</text>
      </g>
      <text x="280" y="200" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Same displacement, opposite outcomes - bonding decides brittleness</text>
    </svg>
  );
}
