/** Earthworm regeneration halves — the myth and the truth. Well-detailed. Theme-aware. */
export function EarthwormRegenerationHalves({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Earthworm regeneration halves myth truth head half regrows tail tail half dies segments lost reproductive organs garden fork damage">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Cut in half — the myth and the truth</text>
      {/* myth vs truth */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE MYTH</text>
      <path d="M110 130 h170 M110 170 h170" className="stroke-current" strokeWidth="12" strokeLinecap="round" style={{ color: "rgb(244 63 94 / 0.4)" }} />
      <text x="195" y="106" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">"two worms from one cut"</text>
      <text x="195" y="216" fontSize="6.8" textAnchor="middle" className="fill-current text-rose-600" fontWeight="700">false — the tail half has no brain,</text>
      <text x="195" y="232" fontSize="6.8" textAnchor="middle" className="fill-current text-rose-600" fontWeight="700">no head, no way to rebuild one</text>
      <rect x="390" y="44" width="300" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE TRUTH</text>
      {[
        "the head end can regrow a tail",
        "  and some lost segments",
        "regeneration is limited — organs",
        "  behind the cut (gizzard, hearts)",
        "  are not rebuilt",
        "a worm cut behind segment 20",
        "  may survive and still reproduce",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The real danger: most vital organs sit in the anterior third — a spade through segment 10 is fatal, through segment 40 is survivable.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: head half survives with limited regrowth; tail half dies. Correct the myth in one sentence.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Garden-fork damage is a real conservation concern for compost worms.</text>
    </svg>
  );
}
