export function LiquefactionEasePanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 220" role="img" aria-label="Liquefaction ease follows the van der Waals a value" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Liquefaction Tracks a</text>
      <g transform="translate(70, 45)">
        <rect width="180" height="55" rx="8" className="fill-current opacity-15" />
        <text x="90" y="25" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor">NH3 (a = 4.17)</text>
        <text x="90" y="44" textAnchor="middle" fontSize="10.5" fill="currentColor">liquefies at ~8 atm, 20 C</text>
      </g>
      <g transform="translate(300, 45)">
        <rect width="180" height="55" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.2" />
        <text x="90" y="25" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor">N2 (a = 1.39)</text>
        <text x="90" y="44" textAnchor="middle" fontSize="10.5" fill="currentColor">needs 77 K first</text>
      </g>
      <text x="280" y="135" textAnchor="middle" fontSize="11.5" className="fill-current opacity-75">Strong attraction (polar N-H bonds, hydrogen bonding) lets pressure alone condense NH3</text>
      <text x="280" y="160" textAnchor="middle" fontSize="11" className="fill-current opacity-75">Weak London forces leave N2 gas until temperature does the work</text>
      <text x="280" y="190" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">CO2 (a = 3.59) sits between: ~60 atm at room temperature - fire extinguishers</text>
      <text x="280" y="210" textAnchor="middle" fontSize="10.5" className="fill-current opacity-60">He (a = 0.034) resists to 4 K - the last gas to liquefy</text>
    </svg>
  );
}
