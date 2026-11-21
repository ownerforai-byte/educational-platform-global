/** Swim bladder buoyancy — the fish's internal diving vest. Well-detailed. Theme-aware. */
export function SwimBladderBuoyancy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Swim bladder buoyancy gas sac adjusts density fish rises sinks neutral buoyancy without swimming effort gas gland rete mirabile depth control">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The swim bladder — a diving vest built from gas</text>
      {/* fish with bladder */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NEUTRAL BUOYANCY</text>
      <ellipse cx="195" cy="150" rx="90" ry="42" className="fill-current text-sky-500/20" stroke="currentColor" strokeWidth="2.2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <ellipse cx="195" cy="148" rx="46" ry="16" className="fill-current text-amber-500/30" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="152" fontSize="6.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">swim bladder (gas sac)</text>
      <circle cx="262" cy="140" r="6" className="fill-current text-slate-600/60" style={{ color: "rgb(71 85 105 / 0.9)" }} />
      <text x="195" y="212" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">gas volume up → fish rises; gas volume down → fish sinks;</text>
      <text x="195" y="228" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">matched exactly, the fish hangs motionless at any depth — no effort</text>
      {/* how it adjusts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HOW GAS IS ADDED</text>
      {[
        "gas gland secretes gas (mainly",
        "  oxygen) into the bladder",
        "the rete mirabile — a counter-",
        "  current capillary net — keeps",
        "  the gas from diffusing back out",
        "to descend, gas is reabsorbed",
        "  into the blood",
        "physostome fishes (carp) also",
        "  gulp air via the oesophagus",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: the swim bladder saves the energy a shark spends swimming to stay level — sharks, lacking one, must keep moving or sink.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Buoyancy without effort = more energy for swimming and feeding.</text>
    </svg>
  );
}
