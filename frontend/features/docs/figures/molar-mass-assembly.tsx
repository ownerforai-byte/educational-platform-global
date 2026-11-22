// Molar mass assembly from formula. Theme-aware.
export function MolarMassAssembly({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Molar mass assembly worked examples water eighteen ammonia seventeen sulphuric acid ninety eight with atomic mass table">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Assembling molar mass, compound by compound</text>
      {[
        ["H₂O", "2(1) + 16", "= 18 g/mol"],
        ["NH₃", "14 + 3(1)", "= 17 g/mol"],
        ["H₂SO₄", "2(1) + 32 + 4(16)", "= 98 g/mol"],
        ["CaCO₃", "40 + 12 + 3(16)", "= 100 g/mol"],
      ].map(([f, calc, ans], i) => (
        <g key={f}>
          <rect x="30" y={40 + i * 32} width="660" height="26" rx="7" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x="46" y={58 + i * 32} fontSize="9.5" className="fill-current text-foreground" fontWeight="800">{f}</text>
          <text x="180" y={58 + i * 32} fontSize="9" className="fill-current text-muted-foreground">{calc}</text>
          <text x="674" y={58 + i * 32} fontSize="9.5" textAnchor="end" className="fill-current text-emerald-600" fontWeight="800">{ans}</text>
        </g>
      ))}
      <rect x="30" y="172" width="660" height="28" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="190" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Hydrate trap: CuSO₄·5H₂O adds 5 × 18 = 90 to the anhydrous 160 → 250 g/mol. Water of crystallisation counts.</text>
    </svg>
  );
}
