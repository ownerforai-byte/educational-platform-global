// Solved: molarity numerical. Theme-aware.
export function MolarityDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Solved molarity of four gram sodium hydroxide in five hundred millilitres solution zero point two molar">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — molarity of 4 g NaOH in 500 mL</text>
      {[
        ["Step 1 — moles", "n = 4 ÷ 40 = 0.1 mol"],
        ["Step 2 — volume in litres", "500 mL = 0.5 L"],
        ["Step 3 — molarity", "M = 0.1 ÷ 0.5 = 0.2 M"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x="30" y={40 + i * 44} width="660" height="38" rx="9" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x="46" y={58 + i * 44} fontSize="9" className="fill-current text-sky-600" fontWeight="800">{t}</text>
          <text x="674" y={58 + i * 44} fontSize="9.5" textAnchor="end" className="fill-current text-foreground" fontWeight="800">{d}</text>
        </g>
      ))}
      <rect x="30" y="176" width="660" height="34" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="194" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Shortcut worth knowing: M = (mass ÷ molar mass) × 1000 ÷ volume(mL) — same arithmetic, fewer lines.</text>
      <text x="360" y="204" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Unit trap: grams must be grams and volume must be litres — mixing units is the top mark-loser here.</text>
    </svg>
  );
}
