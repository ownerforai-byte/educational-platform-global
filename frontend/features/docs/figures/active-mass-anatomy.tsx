// Active mass anatomy: what counts, what does not. Theme-aware.
export function ActiveMassAnatomy({ className }: { className?: string }) {
  const rows: [string, string, string, string][] = [
    ["Gases", "active mass = molar concentration, varies", "in Kc", "rgb(14 165 233)"],
    ["Solutes in solution", "active mass = mol/L, varies", "in Kc", "rgb(14 165 233)"],
    ["Pure solids", "active mass constant (= 1)", "omitted", "rgb(148 163 184)"],
    ["Pure liquids", "active mass constant (= 1)", "omitted", "rgb(148 163 184)"],
  ];
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Active mass is molar concentration for gases and solutes, constant unity for pure solids and liquids which are omitted from Kc">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Active mass: who speaks in Kc</text>
      {rows.map(([t, s, tag, c], i) => (
        <g key={i}>
          <rect x="40" y={48 + i * 50} width="440" height="40" rx="8" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="58" y={73 + i * 50} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{t}</text>
          <text x="200" y={73 + i * 50} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
          <rect x="500" y={54 + i * 50} width="110" height="28" rx="14" className="fill-current" style={{ color: c }} opacity="0.3" />
          <text x="555" y={73 + i * 50} fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{tag}</text>
        </g>
      ))}
      <text x="330" y="270" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Only species whose concentration can change carry information into the constant</text>
    </svg>
  );
}
