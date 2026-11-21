// Emission vs absorption spectrum contrast panel. Theme-aware.
export function EmissionVsAbsorption({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 240" className={className} role="img" aria-label="Emission spectrum bright lines on dark background versus absorption spectrum dark lines on continuous background with electron jump directions">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Emission vs absorption — same lines, opposite journeys</text>
      <rect x="30" y="40" width="320" height="60" rx="8" className="fill-current text-slate-900" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(120 120 130 / 0.8)" }} />
      {[100, 170, 240, 310].map((x, i) => (
        <line key={x} x1={x} y1="40" x2={x} y2="100" className="stroke-current" strokeWidth="5" style={{ color: ["rgb(239 68 68 / 0.95)", "rgb(16 185 129 / 0.95)", "rgb(59 130 246 / 0.95)", "rgb(139 92 246 / 0.95)"][i] }} />
      ))}
      <text x="190" y="118" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Emission — bright lines on dark background</text>
      <text x="190" y="132" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Excited atoms fall down (n₂ → n₁) and release photons</text>
      <rect x="370" y="40" width="320" height="60" rx="8" className="fill-current text-amber-200/80" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(120 120 130 / 0.8)" }} />
      {[400, 470, 540, 610].map((x) => (
        <line key={x} x1={x} y1="40" x2={x} y2="100" className="stroke-current" strokeWidth="5" style={{ color: "rgb(30 30 40 / 0.9)" }} />
      ))}
      <text x="530" y="118" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Absorption — dark lines on continuous background</text>
      <text x="530" y="132" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Cool gas jumps up (n₁ → n₂) and removes matching photons</text>
      <text x="190" y="160" fontSize="9" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">Jump: down — energy out</text>
      <text x="530" y="160" fontSize="9" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Jump: up — energy in</text>
      <rect x="30" y="180" width="660" height="44" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="198" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">The line wavelengths are identical in both spectra — the level gaps do not change. Only the direction of the jump differs.</text>
      <text x="360" y="214" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: the sun's Fraunhofer dark lines are absorption lines — the same physics reads the composition of stars.</text>
    </svg>
  );
}
