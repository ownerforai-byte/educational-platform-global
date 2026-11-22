// Solved: molecular from empirical formula. Theme-aware.
export function MolecularFromEmpiricalDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Solved molecular formula empirical CH2O molar mass sixty molecular mass formula mass equals two formaldehyde">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — empirical CH₂O, M = 60</text>
      {[
        ["Empirical formula mass", "12 + 2(1) + 16 = 30"],
        ["Multiplier", "n = 60 ÷ 30 = 2"],
        ["Molecular formula", "CH₂O × 2 = C₂H₄O₂ (acetic acid)"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x="30" y={40 + i * 44} width="660" height="38" rx="9" className="fill-current text-violet-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(139 92 246 / 0.85)" }} />
          <text x="46" y={58 + i * 44} fontSize="9" className="fill-current text-violet-600" fontWeight="800">{t}</text>
          <text x="674" y={58 + i * 44} fontSize="9.5" textAnchor="end" className="fill-current text-foreground" fontWeight="800">{d}</text>
        </g>
      ))}
      <rect x="30" y="176" width="660" height="34" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="194" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Same data, different M: M = 180 gives C₆H₁₂O₆ (glucose) — the empirical formula alone never identifies a compound.</text>
      <text x="360" y="204" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Always finish with a mass check: subscripts × atomic masses must rebuild the given M.</text>
    </svg>
  );
}
