/** Arboreal gripping adaptations — the tree climber's kit. Well-detailed. Theme-aware. */
export function ArborealGrippingAdaptations({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Arboreal gripping adaptations claws prehensile tail opposable thumb binocular vision padded feet balance squirrel monkey tree frog climbing branch life three dimensions">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Arboreal adaptations — the climber's kit</text>
      {/* grip anatomy */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">GRIPPING HARDWARE</text>
      {/* branch + hand */}
      <path d="M70 140 q80 -20 240 -6" className="fill-none stroke-current" strokeWidth="12" strokeLinecap="round" style={{ color: "rgb(120 113 108 / 0.6)" }} />
      <path d="M120 138 q10 -22 26 -8 q14 12 2 22 q-14 10 -24 -2" className="fill-current text-emerald-500/25" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="140" y="104" fontSize="6" textAnchor="middle" className="fill-current text-emerald-700" fontWeight="700">opposable thumb grips around</text>
      <path d="M220 140 q6 -18 20 -10" className="fill-none stroke-current" strokeWidth="4" strokeLinecap="round" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="230" y="112" fontSize="6" textAnchor="middle" className="fill-current text-emerald-700" fontWeight="700">curved claws anchor</text>
      <path d="M300 136 q30 8 40 34 q-24 12 -40 -6" className="fill-current text-sky-500/25" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="340" y="192" fontSize="6" textAnchor="middle" className="fill-current text-sky-600" fontWeight="700">prehensile tail = fifth limb</text>
      <text x="195" y="222" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">padded, roughened footpads add friction on wet bark</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">LIFE IN 3D</text>
      {[
        "trees are a three-dimensional",
        "  habitat — falling is the risk",
        "depth vision matters more than",
        "  speed: eyes face forward",
        "low centre of gravity, strong",
        "  grip, and a balancing tail",
        "light skeleton beats heavy",
        "  muscle on thin branches",
        "squirrels leap with tail as",
        "  rudder; monkeys swing below",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: arboreal = tree life — opposable digits, claws, prehensile tail, forward eyes, padded feet.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The same kit later made human hands possible — climbing was the rehearsal.</text>
    </svg>
  );
}
