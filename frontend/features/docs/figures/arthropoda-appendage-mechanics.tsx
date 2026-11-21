/** Arthropoda jointed appendage mechanics — lever and moult. Well-detailed. Theme-aware. */
export function ArthropodaAppendageMechanics({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Arthropoda jointed appendage mechanics lever hinge segments chitin exoskeleton moult ecdysis growth limit versatility legs mouthparts antennae">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Jointed appendages — levers with hinges</text>
      {/* leg segments */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ONE LEG, MANY JOINTS</text>
      <path d="M80 200 L130 150 L170 170 L210 130 L250 150" className="fill-none stroke-current" strokeWidth="5" strokeLinecap="round" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      {[[130, 150], [170, 170], [210, 130]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" className="fill-current text-foreground" />
      ))}
      <text x="195" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">each hinge lets the segment swing one way —</text>
      <text x="195" y="212" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">combined, they walk, dig, swim, groom, taste</text>
      <text x="195" y="228" fontSize="6.4" textAnchor="middle" className="fill-current text-amber-600">same blueprint → legs, mouthparts, antennae</text>
      {/* moult */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE MOULT TAX</text>
      {[
        "chitinous exoskeleton cannot stretch",
        "growth = ecdysis: shed, expand,",
        "  harden again",
        "vulnerable hours after each moult",
        "size is capped — no arthropod",
        "  ever grew as big as a mammal",
        "the jointed plan trades size for",
        "  unmatched versatility",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: 'jointed appendages' is the phylum's name in Greek (arthron + podos) — say the etymology and the mark is yours.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Most species on Earth are arthropods — versatility won the numbers game.</text>
    </svg>
  );
}
