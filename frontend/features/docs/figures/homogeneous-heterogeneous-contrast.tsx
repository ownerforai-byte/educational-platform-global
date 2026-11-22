// Homogeneous vs heterogeneous mixtures. Theme-aware.
export function HomogeneousHeterogeneousContrast({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Homogeneous mixture uniform salt solution versus heterogeneous mixture sand and water with visible boundary and phases">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Homogeneous vs heterogeneous — one look decides</text>
      <rect x="30" y="44" width="320" height="110" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <circle key={i} cx={70 + (i % 4) * 70} cy={80 + Math.floor(i / 4) * 40} r="6" className="fill-current text-sky-500" style={{ color: "rgb(14 165 233 / 0.6)" }} />
      ))}
      <text x="190" y="130" fontSize="9.5" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Homogeneous — one phase, uniform throughout</text>
      <text x="190" y="148" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">salt solution · air · brass · sugar in tea</text>
      <rect x="370" y="44" width="320" height="110" rx="10" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <rect x="400" y="60" width="120" height="70" rx="4" className="fill-current text-amber-500/25" />
      <rect x="520" y="60" width="120" height="70" rx="4" className="fill-current text-slate-500/30" />
      <text x="460" y="100" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">water layer</text>
      <text x="580" y="100" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">sand layer</text>
      <text x="530" y="130" fontSize="9.5" textAnchor="middle" className="fill-current text-amber-600" fontWeight="800">Heterogeneous — visible boundary, many phases</text>
      <text x="530" y="148" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">sand + water · oil + water · iron filings + sulphur</text>
      <rect x="30" y="168" width="660" height="40" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="186" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Trick question in exams: fog and smoke look uniform but are heterogeneous (droplets/particles in a different phase).</text>
      <text x="360" y="200" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Solutions are always homogeneous mixtures — that is the definition, not an observation.</text>
    </svg>
  );
}
