export function WatersOfCrystallisation({ className }: { className?: string }) {
  const rows = [
    { f: "CuSO4.5H2O", n: "blue vitriol", w: "5" },
    { f: "FeSO4.7H2O", n: "green vitriol", w: "7" },
    { f: "Na2CO3.10H2O", n: "washing soda", w: "10" },
    { f: "CaSO4.2H2O", n: "gypsum", w: "2" },
    { f: "MgSO4.7H2O", n: "Epsom salt", w: "7" },
  ];
  return (
    <svg viewBox="0 0 560 240" role="img" aria-label="Waters of crystallisation in common hydrated salts" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Waters of Crystallisation</text>
      {rows.map((r, i) => (
        <g key={i} transform={`translate(50, ${40 + i * 36})`}>
          <rect width="460" height="30" rx="6" className="fill-current opacity-5" />
          <text x="14" y="20" fontSize="11.5" fontWeight="600" fill="currentColor">{r.f}</text>
          <text x="180" y="20" fontSize="10.5" className="fill-current opacity-70">{r.n}</text>
          <text x="446" y="21" textAnchor="end" fontSize="12" fontWeight="700" fill="currentColor">{r.w} H2O</text>
        </g>
      ))}
      <text x="280" y="230" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Stoichiometric lattice water - not surface wetness</text>
    </svg>
  );
}
