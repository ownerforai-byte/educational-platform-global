// Mole triangle: mass, volume, particles. Theme-aware.
export function MoleConceptTriangle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 240" className={className} role="img" aria-label="Mole concept triangle one mole connects molar mass grams twenty two point four litres at STP and six point zero two two times ten twenty three particles">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">One mole, three doors out</text>
      <rect x="270" y="40" width="180" height="40" rx="10" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="60" fontSize="10" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">1 MOLE</text>
      <text x="360" y="74" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">the counting unit</text>
      {[
        ["molar mass (g)", "mass ÷ molar mass = n", 60, 150, "rgb(16 185 129 / 0.9)"],
        ["22.4 L at STP", "volume ÷ 22.4 = n", 270, 150, "rgb(245 158 11 / 0.9)"],
        ["6.022 × 10²³ particles", "particles ÷ Nₐ = n", 480, 150, "rgb(139 92 246 / 0.9)"],
      ].map(([t, d, x, y, c]) => (
        <g key={String(t)}>
          <line x1="360" y1="80" x2={Number(x) + 90} y2="150" className="stroke-current text-muted-foreground" strokeWidth="1.3" />
          <rect x={Number(x)} y={Number(y)} width="180" height="56" rx="10" className="fill-current" style={{ color: String(c) }} opacity="0.1" />
          <rect x={Number(x)} y={Number(y)} width="180" height="56" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: String(c) }} />
          <text x={Number(x) + 90} y={Number(y) + 22} fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{String(t)}</text>
          <text x={Number(x) + 90} y={Number(y) + 40} fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">{String(d)}</text>
        </g>
      ))}
      <rect x="30" y="216" width="660" height="16" rx="0" />
      <text x="360" y="230" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Every stoichiometry numerical is a walk through this triangle: convert given → moles → ratio → asked.</text>
    </svg>
  );
}
