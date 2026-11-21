/** Spirogyra conjugation — ladder conjugation to zygospore. Theme-aware. */
export function SpirogyraConjugation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Spirogyra ladder conjugation between two filaments with conjugation tubes amoeboid gamete fusion and thick walled zygospore">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Conjugation — sex without flagella</text>

      {/* two filaments */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x="40" y={60 + i * 0} width="0" height="0" />
      ))}
      <g>
        {[0, 1, 2].map((i) => (
          <rect key={i} x="60" y={60 + i * 0} width="0" height="0" />
        ))}
      </g>
      {/* filament A (top) */}
      <rect x="60" y="70" width="240" height="50" rx="25" className="fill-current text-emerald-500/12" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="180" y="100" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">filament A (−) — whole cell content becomes gamete</text>
      {/* filament B (bottom) */}
      <rect x="60" y="170" width="240" height="50" rx="25" className="fill-current text-teal-500/12" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
      <text x="180" y="200" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">filament B (+) — receives the migrating gamete</text>

      {/* conjugation tubes */}
      <g className="stroke-current text-amber-600" strokeWidth="4">
        <line x1="130" y1="120" x2="130" y2="170" /><line x1="230" y1="120" x2="230" y2="170" />
      </g>
      <text x="325" y="128" fontSize="8.5" className="fill-current text-amber-700 dark:text-amber-300" fontWeight="700">conjugation tubes — the 'ladder' appearance</text>

      {/* zygospore */}
      <circle cx="360" cy="200" r="18" className="fill-current text-slate-700/60" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(51 65 85 / 0.9)" }} />
      <text x="395" y="196" fontSize="8.5" className="fill-current text-foreground" fontWeight="700">zygospore (2n)</text>
      <text x="395" y="212" fontSize="8" className="fill-current text-muted-foreground">thick wall, survives drying;</text>
      <text x="395" y="226" fontSize="8" className="fill-current text-muted-foreground">meiosis at germination</text>

      <text x="16" y="248" fontSize="10" className="fill-current text-muted-foreground">No flagella, no eggs: the whole cell contents of one filament crawl across a tube — the simplest sexual act in the plant world.</text>
    </svg>
  );
}
