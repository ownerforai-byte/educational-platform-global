// Ionic compound properties with values. Theme-aware.
export function IonicPropertyTable({ className }: { className?: string }) {
  const rows: [string, string][] = [
    ["Melting point", "High - NaCl melts at 801 C, MgO at 2852 C"],
    ["Hardness", "Hard but brittle - layers shift, like charges meet, crystal cracks"],
    ["Conduction", "Solid: no. Molten or aqueous: yes - ions become mobile"],
    ["Solubility", "Dissolve in polar solvents like water, not in hexane"],
    ["Volatility", "Non-volatile - strong electrostatic lattice holds ions"],
  ];
  return (
    <svg viewBox="0 0 680 320" className={className} role="img" aria-label="Properties of ionic compounds table with melting point hardness conduction solubility and volatility examples">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Properties of ionic compounds, with numbers</text>
      {rows.map(([head, body], i) => (
        <g key={i}>
          <rect x="24" y={44 + i * 54} width="632" height="46" rx="8" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.08" />
          <rect x="24" y={44 + i * 54} width="632" height="46" rx="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <text x="40" y={64 + i * 54} fontSize="12" className="fill-current text-foreground" fontWeight="800">{head}</text>
          <text x="40" y={82 + i * 54} fontSize="11" className="fill-current text-muted-foreground">{body}</text>
        </g>
      ))}
    </svg>
  );
}
