/** Learned behaviour stages — how experience builds behaviour. Well-detailed. Theme-aware. */
export function LearnedBehaviourStages({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Learned behaviour stages habituation imprinting conditioning trial error insight examples dog bell Pavlov sea anemone clownfish crow vulture Krishna chital learning types ladder">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Learning — four ways behaviour changes with experience</text>
      {/* four stages */}
      <rect x="30" y="44" width="660" height="170" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {[
        ["Habituation", "ignore the pointless: a crow stops fleeing a scarecrow that never moves", 130],
        ["Imprinting", "a critical-window bond: goslings follow the first mover they see", 300],
        ["Conditioning", "associate two things: Pavlov's dog links bell to food and salivates", 470],
        ["Trial & error", "reward stamps the act in: a cat learns which latch opens the door", 610],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 78} y="70" width="156" height="104" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
          <text x={x as number} y="90" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name as string}</text>
          <text x={x as number} y="108" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 32)}</text>
          <text x={x as number} y="120" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(32, 64)}</text>
          <text x={x as number} y="132" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(64, 96)}</text>
          {i < 3 && <path d={`M${(x as number) + 80} 122 h${((x as number) + 140) - (x as number) - 80 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.4" style={{ color: "rgb(16 185 129 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="200" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">each type adds flexibility: from ignoring noise, to bonding, to prediction, to problem-solving</text>
      {/* facts */}
      <rect x="30" y="228" width="660" height="64" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="248" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Learning needs a nervous system worth training — that is why flatworms barely learn and mammals never stop.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: habituation, imprinting, conditioning, trial-and-error — four names with one example each.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Imprinting is time-locked: miss the window and the bond never forms — Lorenz's geese proved it.</text>
    </svg>
  );
}
