export function DaltonPartialSum({ className }: { className?: string }) {
  const gases = [
    { g: "N2", p: "0.78", h: 78 },
    { g: "O2", p: "0.21", h: 21 },
    { g: "Ar + CO2", p: "0.01", h: 6 },
  ];
  return (
    <svg viewBox="0 0 560 240" role="img" aria-label="Dalton's law of partial pressures applied to air" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Dalton's Law - Air Adds Up to 1 atm</text>
      {gases.map((g, i) => (
        <g key={i} transform={`translate(50, ${40 + i * 42})`}>
          <rect width={g.h * 5.4} height="28" rx="5" className="fill-current opacity-25" />
          <text x="-8" y="19" textAnchor="end" fontSize="12" fontWeight="600" fill="currentColor">{g.g}</text>
          <text x={g.h * 5.4 + 10} y="19" fontSize="11.5" fill="currentColor">{g.p} atm</text>
        </g>
      ))}
      <g transform="translate(50, 178)">
        <rect width="421" height="30" rx="5" className="fill-current opacity-10" stroke="currentColor" strokeWidth="1.5" />
        <text x="210" y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="currentColor">P(total) = 0.78 + 0.21 + 0.01 = 1.00 atm</text>
      </g>
      <text x="280" y="228" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Non-reacting mixture: each gas acts as if alone</text>
    </svg>
  );
}
