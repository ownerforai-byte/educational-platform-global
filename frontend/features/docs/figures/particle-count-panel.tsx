// Particles per mole comparisons. Theme-aware.
export function ParticleCountPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Particle counts in one mole of hydrogen oxygen and sodium all same number different masses two thirty two and twenty three grams">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Same count, different luggage</text>
      {[
        ["1 mol H₂", "2 g", "6.022 × 10²³ molecules"],
        ["1 mol O₂", "32 g", "6.022 × 10²³ molecules"],
        ["1 mol Na", "23 g", "6.022 × 10²³ atoms"],
      ].map(([t, m, c], i) => (
        <g key={t}>
          <rect x={30 + i * 230} y="44" width="210" height="86" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x={135 + i * 230} y="68" fontSize="10" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">{t}</text>
          <text x={135 + i * 230} y="92" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{m}</text>
          <text x={135 + i * 230} y="116" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">{c}</text>
        </g>
      ))}
      <rect x="30" y="144" width="660" height="56" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="166" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">Mass differs 16× between H₂ and O₂, yet each box holds exactly the same number of molecules — the mole counts, grams weigh.</text>
      <text x="360" y="186" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Electrons version: 1 mol of electrons carries 96,500 C (the Faraday) — same logic, different particle.</text>
    </svg>
  );
}
