export function ZFactorCurve({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 240" role="img" aria-label="Compressibility factor versus pressure" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Z = PV/nRT vs Pressure</text>
      <line x1="60" y1="180" x2="530" y2="180" stroke="currentColor" strokeWidth="1.5" />
      <line x1="60" y1="180" x2="60" y2="40" stroke="currentColor" strokeWidth="1.5" />
      <line x1="60" y1="110" x2="520" y2="110" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" className="opacity-50" />
      <text x="524" y="114" fontSize="10.5" fill="currentColor">Z=1</text>
      <path d="M65,110 C140,140 200,150 260,135 C340,115 420,70 510,50" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <text x="150" y="165" fontSize="10.5" className="fill-current opacity-75">Z &lt; 1: attraction wins (low T effect)</text>
      <text x="380" y="45" fontSize="10.5" className="fill-current opacity-75">Z &gt; 1: volume effect wins (high P)</text>
      <text x="295" y="205" textAnchor="middle" fontSize="11.5" fill="currentColor">pressure</text>
      <text x="50" y="45" fontSize="10.5" fill="currentColor">Z</text>
      <text x="280" y="228" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Dip then rise: attraction first, exclusion later - N2 at room temperature</text>
    </svg>
  );
}
