// Solution components and concentration idea. Theme-aware.
export function SolutionComponentsPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Solution components solute dissolved in solvent forming homogeneous solution with saturated unsaturated states">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Anatomy of a solution</text>
      <rect x="60" y="48" width="360" height="100" rx="12" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <circle key={i} cx={100 + (i % 3) * 130} cy={78 + Math.floor(i / 3) * 34} r="5" className="fill-current text-emerald-500" style={{ color: "rgb(16 185 129 / 0.85)" }} />
      ))}
      <text x="240" y="164" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">solute particles spread evenly through the solvent — one phase</text>
      <rect x="460" y="48" width="230" height="100" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="575" y="70" fontSize="9" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">Vocabulary</text>
      <text x="575" y="92" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">solute — the dissolved substance</text>
      <text x="575" y="110" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">solvent — the dissolving medium</text>
      <text x="575" y="128" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">saturated — holds all it can at that T</text>
      <rect x="30" y="174" width="660" height="26" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="191" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Exam pairing: solution (homogeneous) vs suspension (heterogeneous, settles) vs colloid (heterogeneous, does not settle).</text>
    </svg>
  );
}
