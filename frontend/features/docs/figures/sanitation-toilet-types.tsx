/** Sanitation toilet types — the latrine spectrum. Well-detailed. Theme-aware. */
export function SanitationToiletTypes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Sanitation toilet types open defecation pit latrine pour flush septic tank twin pit composting ecological sanitation sanitation ladder coverage Nepal open defecation free declaration health ground water contamination fly chain faecal oral diseases">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The sanitation ladder — from open field to eco-toilet</text>
      {/* ladder */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      {[
        ["Open defecation", "the zero rung: every disease risk active", 220, "rgb(244 63 94)"],
        ["Simple pit latrine", "basic barrier; fly and groundwater issues", 250, "rgb(217 119 6)"],
        ["Pour-flush with pit", "water seal blocks odour and flies", 280, "rgb(2 132 199)"],
        ["Twin-pit / eco-san", "composts waste into safe soil", 310, "rgb(16 185 129)"],
        ["Sewered + treatment", "the full system, needs the whole chain", 340, "rgb(22 163 74)"],
      ].map(([name, detail, w, rgb], i) => {
        const y = 66 + i * 30;
        const width = w as number;
        return (
          <g key={name as string}>
            <rect x={240 - width / 2} y={y} width={width} height="22" rx="6" className="fill-current" style={{ color: `${rgb as string} / 0.35` }} stroke="currentColor" strokeWidth="1.3" />
            <text x="240" y={y + 15} fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{name as string}</text>
            <text x="404" y={y + 15} fontSize="5.6" className="fill-current text-muted-foreground">{detail as string}</text>
          </g>
        );
      })}
      {/* facts */}
      <rect x="420" y="44" width="270" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="555" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY THE LADDER MATTERS</text>
      {[
        "faecal-oral diseases (cholera,",
        "  typhoid, worms) travel the",
        "  open-defecation route",
        "Nepal declared itself open-",
        "  defecation-free in 2019 —",
        "  a genuine milestone",
        "the next battle: safely managed",
        "  sanitation — what happens",
        "  after the flush matters too",
        "a toilet without safe sludge",
        "  disposal just moves the",
        "  problem downstream",
      ].map((t, i) => (
        <text key={t} x="436" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: order the sanitation ladder and name one disease blocked at each rung.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The water seal is the smallest invention with the biggest health return.</text>
    </svg>
  );
}
