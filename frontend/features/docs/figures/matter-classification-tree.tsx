// Classification of matter tree. Theme-aware.
export function MatterClassificationTree({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 240" className={className} role="img" aria-label="Classification of matter tree matter divides into pure substances elements and compounds and mixtures homogeneous and heterogeneous">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">One tree sorts every sample of matter</text>
      <rect x="290" y="38" width="140" height="32" rx="8" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="60" fontSize="10" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">MATTER</text>
      <line x1="360" y1="70" x2="180" y2="100" className="stroke-current text-muted-foreground" strokeWidth="1.4" />
      <line x1="360" y1="70" x2="540" y2="100" className="stroke-current text-muted-foreground" strokeWidth="1.4" />
      <rect x="90" y="100" width="180" height="30" rx="7" className="fill-current text-emerald-500/15" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="180" y="120" fontSize="9" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">Pure substances — fixed composition</text>
      <rect x="450" y="100" width="180" height="30" rx="7" className="fill-current text-amber-500/15" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="540" y="120" fontSize="9" textAnchor="middle" className="fill-current text-amber-600" fontWeight="800">Mixtures — variable composition</text>
      {[
        ["Element — one kind of atom (Fe, O₂)", 60, "rgb(16 185 129 / 0.85)"],
        ["Compound — bonded, fixed ratio (H₂O)", 60, "rgb(16 185 129 / 0.85)"],
      ].map(([t, x, c], i) => (
        <g key={String(t)}>
          <line x1="180" y1="130" x2="150" y2={158 + i * 34} className="stroke-current" strokeWidth="1.2" style={{ color: String(c) }} />
          <rect x={Number(x)} y={148 + i * 34} width="240" height="26" rx="6" fill="none" stroke="currentColor" strokeWidth="1.3" style={{ color: String(c) }} />
          <text x={Number(x) + 10} y={165 + i * 34} fontSize="7.8" className="fill-current text-foreground" fontWeight="700">{String(t)}</text>
        </g>
      ))}
      {[
        ["Homogeneous — uniform throughout (air, brass, salt solution)", 420, "rgb(245 158 11 / 0.85)"],
        ["Heterogeneous — visibly separate parts (sand + water)", 420, "rgb(245 158 11 / 0.85)"],
      ].map(([t, x, c], i) => (
        <g key={String(t)}>
          <line x1="540" y1="130" x2="510" y2={158 + i * 34} className="stroke-current" strokeWidth="1.2" style={{ color: String(c) }} />
          <rect x={Number(x)} y={148 + i * 34} width="260" height="26" rx="6" fill="none" stroke="currentColor" strokeWidth="1.3" style={{ color: String(c) }} />
          <text x={Number(x) + 10} y={165 + i * 34} fontSize="7.8" className="fill-current text-foreground" fontWeight="700">{String(t)}</text>
        </g>
      ))}
      <text x="360" y="228" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Test to quote: fixed composition and one set of properties = pure substance; anything separable by physical means = mixture.</text>
    </svg>
  );
}
