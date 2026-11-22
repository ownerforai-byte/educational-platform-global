// Deductions from Avogadro's law. Theme-aware.
export function AvogadroDeductionsLadder({ className }: { className?: string }) {
  const ded: [string, string][] = [
    ["Molar volume", "1 mol of any gas = 22.4 L at STP"],
    ["Molecular mass from density", "M = d × 22.4 (d in g/L at STP)"],
    ["Molecular mass from VD", "M = 2 × vapour density"],
    ["Gas formulae are diatomic/polyatomic", "H₂, O₂, N₂, Cl₂ — volume data forces pairing"],
    ["Gay-Lussac explained", "volume ratios = molecule ratios"],
  ];
  return (
    <svg viewBox="0 0 720 240" className={className} role="img" aria-label="Five deductions from Avogadro law molar volume molecular mass from density vapour density diatomic gases gay lussac explanation">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Five deductions — list them and you own the topic</text>
      {ded.map(([t, d], i) => (
        <g key={t}>
          <circle cx="58" cy={50 + i * 38} r="13" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
          <text x="58" y={55 + i * 38} fontSize="10" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">{i + 1}</text>
          <text x="86" y={48 + i * 38} fontSize="9.2" className="fill-current text-foreground" fontWeight="800">{t}</text>
          <text x="86" y={62 + i * 38} fontSize="7.8" className="fill-current text-muted-foreground">{d}</text>
        </g>
      ))}
      <rect x="30" y="222" width="660" height="12" rx="0" />
      <text x="360" y="234" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Deduction 4 is the deepest: without Avogadro, chemistry could not decide whether O was O or O₂.</text>
    </svg>
  );
}
