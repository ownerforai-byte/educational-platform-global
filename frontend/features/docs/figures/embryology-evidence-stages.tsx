/** Embryology evidence stages — von Baer's law. Well-detailed. Theme-aware. */
export function EmbryologyEvidenceStages({ className }: { className?: string }) {
  const animals = ["fish", "salamander", "chick", "human"];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Embryology evidence stages early embryos fish salamander chick human gill pouches tail notochord von Baer law diverge later">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Embryos agree early, argue late</text>
      {animals.map((a, i) => {
        const x = 60 + i * 160;
        return (
          <g key={a}>
            {/* early embryo */}
            <ellipse cx={x} cy="100" rx="34" ry="26" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(2 132 199 / 0.9)" }} />
            <path d={`M${x - 30} 92 q6 -8 12 0 q6 -8 12 0 q6 -8 12 0`} className="fill-none stroke-current" strokeWidth="1.4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
            <path d={`M${x + 20} 100 q14 4 20 14`} className="fill-none stroke-current" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.9)" }} />
            <text x={x} y="146" fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{a}</text>
            <text x={x} y="160" fontSize="6.2" textAnchor="middle" className="fill-current text-emerald-600">early: look alike</text>
            {/* late embryo */}
            <ellipse cx={x} cy="212" rx="30" ry="22" className="fill-current text-amber-500/15" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(217 119 6 / 0.9)" }} />
            <text x={x} y="252" fontSize="6.2" textAnchor="middle" className="fill-current text-rose-600">late: own identity</text>
          </g>
        );
      })}
      <rect x="30" y="44" width="660" height="14" rx="4" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="55" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">shared early features: gill pouches (pharyngeal arches), tail, notochord</text>
      <rect x="30" y="170" width="660" height="14" rx="4" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="181" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">specialised later forms: fins, limbs, wings, brain</text>
      <rect x="30" y="266" width="660" height="26" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="278" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">von Baer: general characters (notochord, gill pouches) appear before special ones — never the reverse.</text>
      <text x="360" y="289" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: shared embryonic stages are a fingerprint of common ancestry.</text>
    </svg>
  );
}
