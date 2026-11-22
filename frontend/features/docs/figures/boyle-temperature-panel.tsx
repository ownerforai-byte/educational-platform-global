export function BoyleTemperaturePanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 220" role="img" aria-label="Boyle temperature where a and b effects cancel" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Boyle Temperature - the Cancellation Point</text>
      <line x1="70" y1="170" x2="520" y2="170" stroke="currentColor" strokeWidth="1.5" />
      <line x1="70" y1="170" x2="70" y2="40" stroke="currentColor" strokeWidth="1.5" />
      <line x1="290" y1="170" x2="290" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="opacity-60" />
      <text x="290" y="42" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">T(Boyle)</text>
      <text x="290" y="190" textAnchor="middle" fontSize="10.5" fill="currentColor">temperature</text>
      <text x="150" y="130" fontSize="10.5" className="fill-current opacity-75">below: attraction wins, Z &lt; 1</text>
      <text x="420" y="130" fontSize="10.5" className="fill-current opacity-75">above: volume wins, Z &gt; 1</text>
      <text x="290" y="215" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">At T(Boyle) the a and b effects cancel - Z stays near 1 over a wide P range</text>
      <text x="290" y="60" textAnchor="middle" fontSize="10" className="fill-current opacity-60">N2 about 323 K, He about 23 K</text>
    </svg>
  );
}
