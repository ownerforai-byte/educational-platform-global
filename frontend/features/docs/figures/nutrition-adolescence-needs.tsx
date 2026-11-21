/** Nutrition adolescence needs — the growth spurt's demands. Well-detailed. Theme-aware. */
export function NutritionAdolescenceNeeds({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Nutrition adolescence needs growth spurt energy iron anaemia girls calcium bones protein requirements doubled hunger snacks junk food anaemia prevalence Nepal teenagers dietary needs chart comparison boys girls menstruation blood loss">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Adolescent nutrition — the growth spurt's bill</text>
      {/* needs */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT SPIRTS DEMAND</text>
      {[
        "energy needs peak — teenagers",
        "  may out-eat their parents",
        "iron: menstruating girls lose",
        "  blood monthly; anaemia is",
        "  common and treatable",
        "calcium and vitamin D: peak",
        "  bone mass is built now —",
        "  the skeleton's one chance",
        "protein for the muscle and",
        "  height surge",
        "skipping meals for junk snacks",
        "  misses every one of these",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* girls' double burden */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE GIRLS' DOUBLE BURDEN</text>
      {[
        "adolescent girls face their own",
        "  growth AND future pregnancy",
        "  demands",
        "anaemia in Nepali adolescent",
        "  girls is widespread — iron",
        "  tablets are distributed in",
        "  schools for this reason",
        "early pregnancy stacks a foetus's",
        "  needs on an unfinished body —",
        "  the mother's growth loses",
        "malnutrition in adolescence",
        "  echoes into the next",
        "  generation",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: adolescence = the second-fastest growth period after infancy — iron, calcium, protein, energy all peak.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Bone mass built by the early twenties is the skeleton's lifetime deposit — after that, only maintenance.</text>
    </svg>
  );
}
