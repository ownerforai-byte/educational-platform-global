/** Earthworm male vs female organs compared — side-by-side table. Theme-aware. */
export function EarthwormMaleFemaleOrgans({ className }: { className?: string }) {
  const row = (y: number, a: string, b: string, k: string) => (
    <g key={k}>
      <text x="40" y={y} fontSize="9" className="fill-current text-muted-foreground">{a}</text>
      <text x="360" y={y} fontSize="9" className="fill-current text-muted-foreground">{b}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Earthworm male versus female reproductive organs compared testes seminal vesicles spermathecae prostate versus ovaries oviduct and segments">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Male kit vs female kit — the same worm carries both</text>

      <rect x="20" y="44" width="300" height="26" rx="6" className="fill-current text-sky-500/15" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="170" y="62" fontSize="10" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">MALE SYSTEM</text>
      <rect x="340" y="44" width="300" height="26" rx="6" className="fill-current text-rose-500/15" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="490" y="62" fontSize="10" textAnchor="middle" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="800">FEMALE SYSTEM</text>

      {row(96, "2 testes (segments 10, 11)", "1 pair of ovaries (segment 13)", "r1")}
      {row(120, "2 seminal vesicles (11, 12)", "oviducal funnels near ovary", "r2")}
      {row(144, "2 vasa deferentia", "2 oviducts", "r3")}
      {row(168, "prostate glands (17–19)", "no prostate — ovisac stores eggs", "r4")}
      {row(192, "spermathecae ×4 (segments 6–9)", "female pore on segment 14", "r5")}
      {row(216, "male pores on segment 18", "eggs shed into the coelom first", "r6")}

      <text x="16" y="246" fontSize="10" className="fill-current text-muted-foreground">Self-fertilisation is avoided: male pores (18) sit far from the worm's own spermathecae (6–9) — cross-fertilisation is built into the anatomy.</text>
    </svg>
  );
}
