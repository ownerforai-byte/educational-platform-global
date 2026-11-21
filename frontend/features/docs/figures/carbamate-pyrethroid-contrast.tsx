/** Carbamate pyrethroid contrast — the modern pair. Well-detailed. Theme-aware. */
export function CarbamatePyrethroidContrast({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Carbamate pyrethroid contrast comparison table carbaryl nerve poison reversible chrysanthemum pyrethrum synthetic fast knockdown low mammal toxicity bee harm breakdown comparison">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Carbamates vs pyrethroids — the modern pair compared</text>
      {/* comparison table */}
      <rect x="30" y="40" width="150" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="105" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FEATURE</text>
      <rect x="180" y="40" width="260" height="26" rx="6" className="fill-current text-violet-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="310" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CARBAMATES</text>
      <rect x="440" y="40" width="250" height="26" rx="6" className="fill-current text-emerald-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="565" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PYRETHROIDS</text>
      {[
        ["Origin", "synthetic (carbaryl)", "modelled on chrysanthemum extract"],
        ["Target", "acetylcholinesterase (reversible)", "sodium channels in nerve membrane"],
        ["Speed", "moderate knockdown", "very fast knockdown"],
        ["Persistence", "days", "days, breaks in sunlight"],
        ["Main risk", "bee and fish toxicity", "extremely toxic to fish and bees"],
      ].map(([feat, carb, pyr], i) => {
        const y = 74 + i * 34;
        return (
          <g key={feat}>
            <text x="46" y={y + 14} fontSize="6.8" className="fill-current text-foreground" fontWeight="700">{feat}</text>
            <text x="194" y={y + 8} fontSize="6.4" className="fill-current text-muted-foreground">{carb.slice(0, 40)}</text>
            <text x="194" y={y + 20} fontSize="6.4" className="fill-current text-muted-foreground">{carb.slice(40, 80)}</text>
            <text x="454" y={y + 8} fontSize="6.4" className="fill-current text-muted-foreground">{pyr.slice(0, 40)}</text>
            <text x="454" y={y + 20} fontSize="6.4" className="fill-current text-muted-foreground">{pyr.slice(40, 80)}</text>
          </g>
        );
      })}
      <rect x="30" y="248" width="660" height="44" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="266" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Both are improvements over DDT — shorter lives, lower mammal toxicity — but neither spares pollinators.</text>
      <text x="360" y="284" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: carbamates block the enzyme reversibly; pyrethroids jam sodium channels — two mechanisms, one lesson.</text>
    </svg>
  );
}
