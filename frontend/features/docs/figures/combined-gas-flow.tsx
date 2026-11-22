export function CombinedGasFlow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 230" role="img" aria-label="Combined gas equation solving flow" className={className}>
      <text x="280" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Combined Gas Equation - the State Changer</text>
      <rect x="130" y="48" width="300" height="44" rx="8" className="fill-current opacity-10" stroke="currentColor" strokeWidth="1.5" />
      <text x="280" y="76" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">P1V1 / T1 = P2V2 / T2</text>
      <g transform="translate(60, 120)">
        <rect width="200" height="40" rx="6" className="fill-current opacity-5" />
        <text x="100" y="17" textAnchor="middle" fontSize="10.5" fill="currentColor">T fixed? use Boyle</text>
        <text x="100" y="32" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">P1V1 = P2V2</text>
      </g>
      <g transform="translate(300, 120)">
        <rect width="200" height="40" rx="6" className="fill-current opacity-5" />
        <text x="100" y="17" textAnchor="middle" fontSize="10.5" fill="currentColor">P fixed? use Charles</text>
        <text x="100" y="32" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">V1/T1 = V2/T2</text>
      </g>
      <text x="280" y="185" textAnchor="middle" fontSize="11" className="fill-current opacity-75">NEB 2021: 500 cm3 at 300 K to 400 K gives 666.7 cm3</text>
      <text x="280" y="207" textAnchor="middle" fontSize="10.5" className="fill-current opacity-60">Kelvin first - always</text>
    </svg>
  );
}
