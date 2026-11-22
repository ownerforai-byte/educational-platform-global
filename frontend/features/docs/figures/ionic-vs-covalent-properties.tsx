// Ionic versus covalent compound property contrast. Theme-aware.
export function IonicVsCovalentProperties({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["Melting point", "High (NaCl 801 C)", "Low (Cl2 -101 C); diamond is the giant exception"],
    ["State at room temp", "Crystalline solid", "Gas, liquid or soft solid"],
    ["Solubility", "Water yes, hexane no", "Hexane yes, water often no"],
    ["Conduction", "Molten or dissolved only", "Non-conductor (graphite excepted)"],
    ["Bond type", "Electrostatic between ions", "Shared pairs between atoms"],
  ];
  return (
    <svg viewBox="0 0 700 320" className={className} role="img" aria-label="Ionic versus covalent compound properties comparison with melting point state solubility conduction and bond type rows">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Ionic vs covalent compounds - property contrast</text>
      <text x="220" y="50" fontSize="12" className="fill-current text-foreground" fontWeight="800">Ionic</text>
      <text x="460" y="50" fontSize="12" className="fill-current text-foreground" fontWeight="800">Covalent</text>
      {rows.map(([prop, a, b], i) => (
        <g key={i}>
          <rect x="20" y={62 + i * 50} width="660" height="42" rx="8" className="fill-current" opacity="0.05" />
          <text x="34" y={88 + i * 50} fontSize="11.5" className="fill-current text-foreground" fontWeight="700">{prop}</text>
          <text x="220" y={88 + i * 50} fontSize="10.5" className="fill-current text-muted-foreground">{a}</text>
          <text x="460" y={88 + i * 50} fontSize="10.5" className="fill-current text-muted-foreground">{b}</text>
        </g>
      ))}
    </svg>
  );
}
