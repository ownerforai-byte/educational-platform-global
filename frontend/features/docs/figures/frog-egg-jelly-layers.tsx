/** Frog egg jelly layers function — the capsule's jobs. Well-detailed. Theme-aware. */
export function FrogEggJellyLayers({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog egg jelly layers function capsule jobs inner middle outer protection buoyancy camouflage egg mass sun warmth space between eggs water uptake">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Egg jelly — three layers, five jobs</text>
      {/* egg zoom */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ONE EGG, MAGNIFIED</text>
      <circle cx="195" cy="150" r="70" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.7)" }} />
      <circle cx="195" cy="150" r="52" className="fill-current text-sky-500/25" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.8)" }} />
      <circle cx="195" cy="150" r="36" className="fill-current text-sky-500/35" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <circle cx="195" cy="150" r="18" className="fill-current text-amber-500/40" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="154" fontSize="6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">yolk</text>
      <text x="195" y="92" fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">outer jelly</text>
      <text x="258" y="128" fontSize="6" className="fill-current text-muted-foreground">middle</text>
      <text x="258" y="164" fontSize="6" className="fill-current text-muted-foreground">inner</text>
      <text x="195" y="238" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">deposited in a mass — space between eggs lets each breathe</text>
      {/* jobs */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT THE JELLY DOES</text>
      {[
        "cushions against knocks",
        "deters predators — tastes bad",
        "keeps eggs clumped where males",
        "  can find them",
        "lets sunlight warm the mass",
        "holds water around each egg",
        "  so it never dries",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: three jelly layers secreted by the oviduct — protection, buoyancy, spacing and water balance in one capsule.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Eggs are laid in water but depend on the jelly to create their own micro-environment.</text>
    </svg>
  );
}
