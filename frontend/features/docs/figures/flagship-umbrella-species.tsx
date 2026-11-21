/** Flagship umbrella species — conservation by mascot. Well-detailed. Theme-aware. */
export function FlagshipUmbrellaSpecies({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Flagship umbrella species tiger umbrella habitat keystone panda flagship mascot fundraising indicator species concept comparison conservation marketing umbrella protects co-species Nepal tiger example">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Flagship and umbrella species — conservation by mascot</text>
      {/* concepts */}
      <rect x="30" y="44" width="660" height="150" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      {[
        ["Flagship", "charisma raises funds and laws: tiger, panda, rhino", 130],
        ["Umbrella", "protecting its habitat shelters everything under it", 300],
        ["Keystone", "its removal restructures the whole community", 470],
        ["Indicator", "its presence or absence measures ecosystem health", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          <text x={x as number} y="146" fontSize="5.6" textAnchor="middle" className="fill-current" fontWeight="700" style={{ color: "rgb(217 119 6)" }}>{["tiger", "tiger", "wolf/otter", "mayfly/lichen"][i]}</text>
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the tiger is all four at once in Nepal: flagship face, umbrella roof, keystone predator, forest-health indicator</text>
      {/* limits */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The catch: mascots can skew budgets — ugly but vital species (frogs, fungi, insects) miss the fundraising bandwagon.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: flagship = fundraising power; umbrella = habitat shelter; keystone = ecosystem engineer; indicator = health gauge.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Four labels, four functions — most exam confusion comes from mixing flagship with umbrella.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Charisma is a conservation tool — as long as the umbrella actually covers the others.</text>
    </svg>
  );
}
