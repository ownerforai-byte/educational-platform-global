/** Worm infection lifecycle — the roundworm's route through us. Well-detailed. Theme-aware. */
export function WormInfectionLifecycle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Worm infection lifecycle roundworm Ascaris eggs contaminated soil hands food ingestion intestine larvae migration lungs cough swallow adult worm eggs faeces reinfection sanitation deworming prevention cycle Nepal prevalence">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Roundworm (Ascaris) — the lifecycle through a child</text>
      {/* cycle */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      {[
        ["1. Eggs in soil", "passed in faeces; survive months", 130],
        ["2. Swallowed", "dirty hands, food, water", 300],
        ["3. Larvae migrate", "gut → blood → lungs → coughed, reswallowed", 470],
        ["4. Adults in gut", "mature, mate, lay ~200,000 eggs/day", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
          <text x={x as number} y="90" fontSize="6.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="110" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="124" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(217 119 6 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the lung detour is the exam favourite: larvae climb the windpipe, get coughed up, and are swallowed again</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The cost: anaemia, malnutrition, stunted growth — worms compete for the child's food before the child gets it.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The break points: latrines, handwashing, clean water, deworming tablets, and shoes (for hookworm).</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name the lung migration stage — it distinguishes Ascaris from pinworm, which stays in the gut.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Nepal runs school-based deworming twice yearly — treating the whole class breaks the cycle at scale.</text>
    </svg>
  );
}
