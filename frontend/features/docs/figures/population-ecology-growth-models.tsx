/** Population ecology growth models — the equations behind the curves. Well-detailed. Theme-aware. */
export function PopulationEcologyGrowthModels({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Population ecology growth models equations exponential dN dt rN logistic dN dt rN K minus N over K r intrinsic rate b and d birth death rates immigration emigration open closed populations population density quadrat mark recapture Lincoln index sampling methods carrying capacity K environmental resistance r selected versus K selected species examples bacteria deer">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Growth models — the two equations that run population ecology</text>
      {/* equations */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE EQUATIONS</text>
      {[
        ["Exponential", "dN/dt = rN", "unlimited growth; r = intrinsic rate (births − deaths)", 120],
        ["Logistic", "dN/dt = rN × (K − N)/K", "growth slows as N approaches K; zero growth at K", 175],
        ["Change in N", "(B + I) − (D + E)", "births + immigration − deaths − emigration", 225],
      ].map(([k, eq, v, y], i) => (
        <g key={k}>
          <text x="60" y={(y as number) - 4} fontSize="6.8" className="fill-current text-sky-600" fontWeight="800">{k}</text>
          <text x="60" y={(y as number) + 8} fontSize="6.6" className="fill-current text-foreground" fontWeight="700">{eq}</text>
          <text x="60" y={(y as number) + 20} fontSize="5.8" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      {/* r vs K selection */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">r- vs K-STRATEGISTS</text>
      {[
        ["r-selected", "many small offspring, no care, boom-bust — bacteria, weeds, mice", 120],
        ["K-selected", "few large offspring, heavy care, stable near K — elephants, oaks, humans", 175],
        ["sampling", "quadrats for plants; mark-recapture (Lincoln index) for mobile animals", 225],
      ].map(([k, v, y], i) => (
        <g key={k as string}>
          <text x="406" y={(y as number) - 4} fontSize="6.8" className="fill-current text-emerald-600" fontWeight="800">{k as string}</text>
          <text x="406" y={(y as number) + 8} fontSize="6" className="fill-current text-muted-foreground">{(v as string).slice(0, 46)}</text>
          <text x="406" y={(y as number) + 20} fontSize="6" className="fill-current text-muted-foreground">{(v as string).slice(46, 92)}</text>
        </g>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: write both equations, define r and K, and classify two organisms — the four-part population-ecology answer.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The logistic equation's message: growth is self-limiting — the (K − N)/K term is the environment's brake, built into the maths.</text>
    </svg>
  );
}
