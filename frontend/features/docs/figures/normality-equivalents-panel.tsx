// Normality and equivalents. Theme-aware.
export function NormalityEquivalentsPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Normality equals molarity times n factor with examples sulphuric acid diprotic factor two and sodium hydroxide factor one">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Normality — molarity with a factor</text>
      <rect x="30" y="42" width="660" height="50" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="66" fontSize="11.5" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">N = M × n-factor (H⁺ given or OH⁻ taken per formula unit)</text>
      <text x="360" y="84" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">equivalents = moles × n-factor — the reactive unit count</text>
      {[
        ["HCl → 1 N per 1 M", "n = 1"],
        ["H₂SO₄ → 2 N per 1 M", "n = 2"],
        ["H₃PO₄ → 3 N per 1 M", "n = 3"],
        ["NaOH → 1 N per 1 M", "n = 1"],
      ].map(([t, n], i) => (
        <g key={t}>
          <rect x={30 + (i % 2) * 340} y={104 + Math.floor(i / 2) * 40} width="320" height="32" rx="8" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(16 185 129 / 0.85)" }} />
          <text x={46 + (i % 2) * 340} y={125 + Math.floor(i / 2) * 40} fontSize="9" className="fill-current text-foreground" fontWeight="800">{t}</text>
          <text x={334 + (i % 2) * 340} y={125 + Math.floor(i / 2) * 40} fontSize="8.6" textAnchor="end" className="fill-current text-emerald-600" fontWeight="800">{n}</text>
        </g>
      ))}
      <rect x="30" y="190" width="660" height="12" rx="0" />
      <text x="360" y="202" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Titration shortcut: N₁V₁ = N₂V₂ at the end point — no mole arithmetic needed.</text>
    </svg>
  );
}
