// Conservation of mass from postulate 5. Theme-aware.
export function ConservationFromPostulate({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Conservation of mass from Dalton postulate five atoms rearranged not destroyed hydrogen plus oxygen water mass balance example">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Postulate 5 → the law of conservation of mass</text>
      <rect x="30" y="44" width="200" height="70" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="130" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Before</text>
      <text x="130" y="90" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">2H₂ + O₂</text>
      <text x="130" y="106" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">4 g H + 32 g O = 36 g total</text>
      <text x="248" y="84" fontSize="13" className="fill-current text-amber-500" fontWeight="800">→</text>
      <rect x="270" y="44" width="200" height="70" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="370" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">After</text>
      <text x="370" y="90" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">2H₂O</text>
      <text x="370" y="106" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">36 g water — nothing lost</text>
      <rect x="490" y="44" width="200" height="70" rx="10" className="fill-current text-violet-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="590" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-violet-600" fontWeight="800">Why</text>
      <text x="590" y="90" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">atoms are only rearranged,</text>
      <text x="590" y="106" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">never created or destroyed</text>
      <rect x="30" y="128" width="660" height="80" rx="10" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="46" y="150" fontSize="8.6" className="fill-current text-foreground" fontWeight="800">Exam-grade logic chain:</text>
      <text x="46" y="168" fontSize="8" className="fill-current text-muted-foreground">atoms indestructible (postulate) → total atom count fixed → total mass fixed → balancing an equation is bookkeeping, not belief.</text>
      <text x="46" y="188" fontSize="8" className="fill-current text-muted-foreground">This is why every stoichiometry problem starts from a balanced equation.</text>
    </svg>
  );
}
