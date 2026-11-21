/** Alcohol prohibition lessons — history's controlled experiment. Well-detailed. Theme-aware. */
export function AlcoholProhibitionLessons({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Alcohol prohibition lessons US 1920 1933 experiment consumption fell organised crime speakeasies bootlegging enforcement difficulty policy history Nepal prohibition states partial bans lessons regulation taxation harm reduction debate">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Prohibition — the natural experiment and its lessons</text>
      {/* the experiment */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-stone-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT HAPPENED (US, 1920–33)</text>
      {[
        "consumption did fall — perhaps",
        "  to half its pre-ban level",
        "but an illicit industry filled",
        "  the gap: speakeasies,",
        "  bootleggers, smuggled liquor",
        "organised crime funded itself",
        "  on the black market",
        "poisoned adulterated liquor",
        "  killed thousands",
        "repealed in 1933 — demand had",
        "  not disappeared, only gone",
        "  underground",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* the lessons */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE LESSONS</text>
      {[
        "bans can cut consumption but",
        "  create black markets that",
        "  outlast the law",
        "enforcement capacity matters as",
        "  much as the statute",
        "partial measures: minimum age,",
        "  taxation, licensing, drunk-",
        "  driving laws, ad restrictions",
        "Nepal's experience: partial",
        "  prohibition in some districts,",
        "  licensing elsewhere",
        "the policy dial is continuous,",
        "  not just on/off",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-stone-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: prohibition cut drinking but built crime — supply-side bans alone rarely succeed; demand and enforcement co-determine outcomes.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Any substance policy must price in the black market it creates.</text>
    </svg>
  );
}
