// Solved: volume at STP numerical. Theme-aware.
export function StpVolumeDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Solved STP volume of eight point eight grams carbon dioxide moles zero point two volume four point four eight litres">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — volume of 8.8 g CO₂ at STP</text>
      {[
        ["Step 1 — moles", "n = 8.8 ÷ 44 = 0.2 mol"],
        ["Step 2 — molar volume", "1 mol occupies 22.4 L at STP"],
        ["Step 3 — volume", "V = 0.2 × 22.4 = 4.48 L"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x="30" y={40 + i * 44} width="660" height="38" rx="9" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(16 185 129 / 0.85)" }} />
          <text x="46" y={58 + i * 44} fontSize="9" className="fill-current text-emerald-600" fontWeight="800">{t}</text>
          <text x="674" y={58 + i * 44} fontSize="9.5" textAnchor="end" className="fill-current text-foreground" fontWeight="800">{d}</text>
        </g>
      ))}
      <rect x="30" y="176" width="660" height="34" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="194" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Reverse drill: 11.2 L of a gas at STP = 0.5 mol; if it weighs 22 g, M = 44 g/mol.</text>
      <text x="360" y="204" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Non-STP conditions first need PV = nRT — do not use 22.4 L blindly.</text>
    </svg>
  );
}
