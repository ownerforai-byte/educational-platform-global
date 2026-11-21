/** Malaria vaccine progress — RTS,S and beyond. Well-detailed. Theme-aware. */
export function MalariaVaccineProgress({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Malaria vaccine progress RTS S sporozoite circumsporozoite protein partial protection doses children rolling out hardest parasite vaccine target">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The vaccine frontier — RTS,S and what comes next</text>
      {/* how RTS,S works */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HOW RTS,S WORKS</text>
      {[
        "target: the circumsporozoite protein",
        "  that coats the sporozoite",
        "vaccinated immune systems block",
        "  sporozoites before they reach the",
        "  liver — the earliest possible strike",
        "given as several doses to young",
        "  children in endemic areas",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 18} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* reality check */}
      <rect x="390" y="44" width="300" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE HONEST LEDGER</text>
      {[
        "protection is partial — roughly a",
        "  third to half of severe cases",
        "it complements, not replaces,",
        "  nets and drugs",
        "malaria's complex life cycle gives",
        "  the parasite many disguises",
        "a vaccine against it took decades —",
        "  the hardest target in medicine",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 18} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Why it was so hard: the parasite changes costume four times (sporozoite → liver → RBC stages → gametocyte), each with its own antigens.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: RTS,S targets the sporozoite stage — the first and shortest-lived stage, but the only one a pre-liver vaccine can hit.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Add it to the control triangle: treatment + vector control + (now) vaccination.</text>
    </svg>
  );
}
