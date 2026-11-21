/** Smog formation chemistry — London vs Los Angeles. Well-detailed. Theme-aware. */
export function SmogFormationChemistry({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Smog formation chemistry London type coal smoke sulphur fog winter versus Los Angeles photochemical smog nitrogen oxides sunlight ozone vehicles summer haze inversion">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Two smogs, two chemistries</text>
      {/* London smog */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-stone-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">LONDON (CLASSICAL) SMOG</text>
      {[
        "recipe: coal smoke + sulphur",
        "  dioxide + winter fog",
        "chemistry: SO₂ dissolves in fog",
        "  droplets → sulphurous acid",
        "weather: cold, damp, still air",
        "victims: the 1952 Great Smog",
        "  killed thousands in days",
        "fix: clean air acts, less coal",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* LA smog */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PHOTOCHEMICAL SMOG</text>
      {[
        "recipe: vehicle exhaust (NOₓ +",
        "  unburnt fuel) + strong sunlight",
        "chemistry: UV drives NOₓ and",
        "  hydrocarbons into ozone and",
        "  eye-stinging PANs",
        "weather: hot, sunny, trapped by",
        "  temperature inversions",
        "victims: asthma, stinging eyes,",
        "  damaged crops",
        "Kathmandu's winter haze blends",
        "  both types — smoke + sun",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="240" width="330" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Exam hook: classical = coal + fog (reducing); photochemical = exhaust + sunlight (oxidising).</text>
      <text x="195" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">One is sulphur chemistry, the other nitrogen chemistry — name the gases and the season.</text>
      <text x="195" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Both need stagnant air — inversions are the lid that traps them.</text>
    </svg>
  );
}
