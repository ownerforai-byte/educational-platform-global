export function FourSolidTypesGrid({ className }: { className?: string }) {
  const types = [
    { t: "Ionic", e: "NaCl, MgO", p: "hard, brittle, conducts molten" },
    { t: "Molecular", e: "ice, I2", p: "soft, low mp" },
    { t: "Covalent network", e: "diamond, SiO2", p: "hardest, highest mp" },
    { t: "Metallic", e: "Cu, Al", p: "malleable, conducting" },
  ];
  return (
    <svg viewBox="0 0 560 240" role="img" aria-label="Four types of crystalline solids by bonding" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Four Solid Families</text>
      {types.map((t, i) => (
        <g key={i} transform={`translate(${30 + (i % 2) * 265}, ${40 + Math.floor(i / 2) * 92})`}>
          <rect width="245" height="80" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1" />
          <text x="122" y="24" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="currentColor">{t.t}</text>
          <text x="122" y="44" textAnchor="middle" fontSize="10.5" fill="currentColor">{t.e}</text>
          <text x="122" y="63" textAnchor="middle" fontSize="10" className="fill-current opacity-70">{t.p}</text>
        </g>
      ))}
      <text x="280" y="230" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Read the bonding, predict hardness, melting, conduction and brittleness</text>
    </svg>
  );
}
