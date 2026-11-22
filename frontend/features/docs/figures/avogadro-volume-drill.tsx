export function AvogadroVolumeDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 220" role="img" aria-label="Avogadro's law equal volumes equal molecules at STP" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Avogadro's Law - Equal V, Equal Molecules</text>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${60 + i * 160}, 50)`}>
          <rect width="110" height="100" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.5" />
          {[0, 1, 2, 3, 4, 5].map((j) => (
            <circle key={j} cx={25 + (j % 3) * 30} cy={30 + Math.floor(j / 3) * 35} r="7" className="fill-current opacity-50" />
          ))}
          <text x="55" y="125" textAnchor="middle" fontSize="11" fill="currentColor">{["H2", "O2", "CO2"][i]}</text>
        </g>
      ))}
      <text x="280" y="165" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="currentColor">22.4 L each at STP (0 C, 1 atm) - same n, same V</text>
      <text x="280" y="190" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">V proportional to n at constant T and P - the mole's volume badge</text>
      <text x="280" y="210" textAnchor="middle" fontSize="10.5" className="fill-current opacity-60">Different molecules, identical count per litre</text>
    </svg>
  );
}
