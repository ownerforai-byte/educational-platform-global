/** Anaemia iron deficiency — the hidden hunger. Well-detailed. Theme-aware. */
export function AnaemiaIronDeficiency({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Anaemia iron deficiency hidden hunger haemoglobin women adolescents pregnancy prevalence causes hookworm blood loss menstruation poor diet symptoms fatigue pallor pale conjunctiva iron rich foods sources absorption vitamin C tea tannins inhibitors supplementation fortification deworming Nepal women children statistics">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Anaemia — the hidden hunger in plain sight</text>
      {/* causes */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY IRON RUNS SHORT</text>
      {[
        "diet: too little iron-rich food",
        "  — and the iron present may be",
        "  poorly absorbed",
        "losses: menstruation, hookworm,",
        "  other chronic bleeding",
        "demands: pregnancy and",
        "  adolescent growth multiply",
        "  iron needs",
        "the symptoms: fatigue, pallor",
        "  (check the conjunctiva),",
        "  breathlessness, poor school",
        "  concentration",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* fix */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FIXES</text>
      {[
        "iron-rich foods: liver, meat,",
        "  leafy greens, legumes",
        "absorption trick: vitamin C",
        "  (lemon, amla) with the meal;",
        "  tea's tannins block iron —",
        "  tea with meals is a quiet",
        "  saboteur",
        "programmes: iron-folic acid",
        "  tablets for pregnant women",
        "  and adolescent girls,",
        "  deworming, food fortification",
        "scale: roughly one in three",
        "  women worldwide is anaemic —",
        "  Nepal's women and children",
        "  are no exception",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: three causes (diet, loss, demand) + the vitamin C absorption trick + tea as inhibitor — a complete answer.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Anaemia is called hidden hunger because it hides inside a full stomach.</text>
    </svg>
  );
}
