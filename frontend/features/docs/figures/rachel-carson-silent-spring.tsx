/** Rachel Carson silent spring — the book that changed policy. Well-detailed. Theme-aware. */
export function RachelCarsonSilentSpring({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Rachel Carson Silent Spring 1962 book pesticide DDT bird decline eggshell thinning environmental movement EPA ban policy change science writer evidence">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Silent Spring — evidence that changed the law</text>
      {/* book story */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE EVIDENCE CHAIN</text>
      {[
        "1962: marine biologist Rachel",
        "  Carson publishes Silent Spring",
        "her case: DDT persists, magnifies",
        "  up food chains, and silences",
        "  bird song in sprayed areas",
        "key data: thin eggshells in",
        "  falcons and eagles; dying",
        "  songbirds after spraying",
        "industry attacked her science —",
        "  the data held",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* policy result */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT CHANGED</text>
      {[
        "US banned agricultural DDT in",
        "  1972; most nations followed",
        "EPA created (1970) — pollution",
        "  got a regulator",
        "bird populations recovered:",
        "  falcons and eagles came back",
        "the template: publish evidence →",
        "  public pressure → legal ban",
        "the cautionary echo: persistent",
        "  chemicals still need this same",
        "  scrutiny today",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: Silent Spring (1962) → DDT ban (1972) — one book, one decade, one pesticide, one recovery.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Carson's method — follow the chemical through the food chain — is still how ecotoxicology works.</text>
    </svg>
  );
}
