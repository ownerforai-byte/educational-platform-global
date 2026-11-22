// Solved: mole conversions. Theme-aware.
export function MoleConversionDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 230" className={className} role="img" aria-label="Solved mole conversions for eighteen grams water zero point five mole three point zero one one times ten twenty three molecules and particles">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — everything about 18 g of H₂O</text>
      {[
        ["Moles", "n = 18 ÷ 18 = 1 mol"],
        ["Molecules", "1 × 6.022 × 10²³ = 6.022 × 10²³ molecules"],
        ["Atoms", "3 atoms per molecule → 1.807 × 10²⁴ atoms"],
        ["Volume (as gas at STP)", "1 × 22.4 = 22.4 L (steam)"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x="30" y={40 + i * 44} width="660" height="38" rx="9" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x="46" y={58 + i * 44} fontSize="9" className="fill-current text-sky-600" fontWeight="800">{t}</text>
          <text x="674" y={58 + i * 44} fontSize="9.5" textAnchor="end" className="fill-current text-foreground" fontWeight="800">{d}</text>
        </g>
      ))}
      <rect x="30" y="200" width="660" height="22" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="215" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Classic trap: molecules vs atoms — always multiply by the atoms-per-molecule before reporting "number of atoms".</text>
    </svg>
  );
}
