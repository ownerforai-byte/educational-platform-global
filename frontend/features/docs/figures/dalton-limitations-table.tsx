// Dalton postulate vs modern correction table. Theme-aware.
export function DaltonLimitationsTable({ className }: { className?: string }) {
  const rows: [string, string][] = [
    ["Atoms are indivisible", "electron, proton, neutron discovered — atoms have parts"],
    ["Atoms of an element are identical", "isotopes differ in mass (³⁵Cl, ³⁷Cl)"],
    ["No mention of isobars", "different elements can share a mass number"],
    ["Combination always in simple ratios", "non-stoichiometric compounds exist (FeO₀.₉₅)"],
    ["Atom is the smallest reactive unit", "subatomic particles react (free radicals, electrons)"],
  ];
  return (
    <svg viewBox="0 0 720 260" className={className} role="img" aria-label="Dalton postulate versus modern correction table indivisibility isotopes isobars nonstoichiometry subatomic reactivity">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Dalton said / modern chemistry says</text>
      <rect x="30" y="36" width="300" height="24" rx="6" className="fill-current text-sky-500/15" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="180" y="53" fontSize="9" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Dalton's claim</text>
      <rect x="390" y="36" width="300" height="24" rx="6" className="fill-current text-rose-500/15" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="53" fontSize="9" textAnchor="middle" className="fill-current text-rose-500" fontWeight="800">Modern correction</text>
      {rows.map(([d, m], i) => (
        <g key={d}>
          <rect x="30" y={66 + i * 36} width="300" height="30" rx="6" className="fill-current text-foreground/5" stroke="currentColor" strokeWidth="1" style={{ color: "rgb(14 165 233 / 0.7)" }} />
          <text x="180" y={85 + i * 36} fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{d}</text>
          <rect x="390" y={66 + i * 36} width="300" height="30" rx="6" className="fill-current text-foreground/5" stroke="currentColor" strokeWidth="1" style={{ color: "rgb(244 63 94 / 0.7)" }} />
          <text x="540" y={85 + i * 36} fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{m.slice(0, 48)}</text>
        </g>
      ))}
      <text x="360" y="254" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Still valid today: conservation in reactions, simple ratios in most compounds, atoms as the identity unit of an element.</text>
    </svg>
  );
}
