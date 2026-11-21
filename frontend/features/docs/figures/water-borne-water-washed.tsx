/** Water borne vs water washed diseases — the two water problems. Well-detailed. Theme-aware. */
export function WaterBorneWaterWashed({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Water borne vs water washed diseases distinction waterborne ingestion cholera typhoid hepatitis A giardia versus water washed scarcity hygiene trachoma scabies skin infections louse typhus quantity versus quality both need sanitation faecal oral diagram prevention different interventions more water better than cleaner water alone Bradley classification">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Two water problems — waterborne vs water-washed</text>
      {/* contrast */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WATERBORNE (drunk)</text>
      {[
        "the pathogen rides in the water",
        "  you swallow",
        "cholera, typhoid, hepatitis A,",
        "  giardia, polio",
        "fix: make the water safe —",
        "  treatment, protected sources",
        "the trap: treating water while",
        "  hands and food stay dirty",
        "  still leaves other routes open",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* water washed */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WATER-WASHED (scarce)</text>
      {[
        "the disease spreads because",
        "  there isn't enough water to",
        "  wash with",
        "trachoma (eye infection),",
        "  scabies, skin and eye",
        "  infections, louse-borne typhus",
        "fix: MORE water, even if not",
        "  perfectly clean — quantity",
        "  beats quality here",
        "the classic exam trap: these are",
        "  hygiene diseases, not",
        "  ingestion diseases",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: waterborne = swallowed (cholera); water-washed = unwashed (trachoma) — one example each is the full answer.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The Bradley classification adds water-based (via skin, e.g. schistosomiasis) and insect-vector water diseases — know all four if asked.</text>
    </svg>
  );
}
