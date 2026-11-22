// Solved: number of particles numerical. Theme-aware.
export function NumberOfParticlesDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Solved number of molecules in four point four grams carbon dioxide zero point one mole times avogadro six point zero two two times ten twenty two molecules">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — molecules in 4.4 g of CO₂</text>
      {[
        ["Step 1 — moles", "n = 4.4 ÷ 44 = 0.1 mol"],
        ["Step 2 — molecules", "N = 0.1 × 6.022 × 10²³ = 6.022 × 10²² molecules"],
        ["Step 3 — atoms (if asked)", "3 atoms per molecule → 1.807 × 10²³ atoms"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x="30" y={40 + i * 44} width="660" height="38" rx="9" className="fill-current text-violet-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(139 92 246 / 0.85)" }} />
          <text x="46" y={58 + i * 44} fontSize="9" className="fill-current text-violet-600" fontWeight="800">{t}</text>
          <text x="674" y={58 + i * 44} fontSize="9.5" textAnchor="end" className="fill-current text-foreground" fontWeight="800">{d}</text>
        </g>
      ))}
      <rect x="30" y="176" width="660" height="34" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="194" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Compare with O₂: 4.4 g O₂ = 0.1375 mol → 8.28 × 10²² molecules — same mass, different count; the mole normalises it.</text>
      <text x="360" y="204" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Answer discipline: write the particle word (molecules/atoms/ions), not just the number.</text>
    </svg>
  );
}
