// Quick molar mass reference table. Theme-aware.
export function MolarMassTablePanel({ className }: { className?: string }) {
  const rows: [string, string, string, string][] = [
    ["O₂", "32", "H₂SO₄", "98"],
    ["NaCl", "58.5", "Na₂CO₃", "106"],
    ["CaCO₃", "100", "Fe₂O₃", "160"],
    ["NH₄NO₃", "80", "CuSO₄·5H₂O", "250"],
  ];
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Molar mass quick reference table common compounds water carbon dioxide sodium chloride calcium carbonate sulphuric acid copper sulphate pentahydrate">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Molar masses worth memorising</text>
      {rows.map(([a, b, c, d], i) => (
        <g key={a}>
          <rect x="30" y={40 + i * 34} width="320" height="28" rx="7" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.1" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x="46" y={59 + i * 34} fontSize="9.5" className="fill-current text-foreground" fontWeight="800">{a}</text>
          <text x="334" y={59 + i * 34} fontSize="9.5" textAnchor="end" className="fill-current text-emerald-600" fontWeight="800">{b} g/mol</text>
          <rect x="370" y={40 + i * 34} width="320" height="28" rx="7" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.1" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x="386" y={59 + i * 34} fontSize="9.5" className="fill-current text-foreground" fontWeight="800">{c}</text>
          <text x="674" y={59 + i * 34} fontSize="9.5" textAnchor="end" className="fill-current text-emerald-600" fontWeight="800">{d} g/mol</text>
        </g>
      ))}
      <rect x="30" y="180" width="660" height="22" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="195" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">These eight cover most NEB numericals — seconds saved here become marks earned elsewhere.</text>
    </svg>
  );
}
