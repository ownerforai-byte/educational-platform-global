/** Decomposer role — the recycling crew. Well-detailed. Theme-aware. */
export function DecomposerRoleCycle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Decomposer role bacteria fungi break dead matter saprophytic enzymes nutrients released soil recycling detritus humus mineralisation cycle">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Decomposers — the recycling crew</text>

      {/* cycle */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      {/* producers */}
      <rect x="70" y="80" width="90" height="40" rx="8" className="fill-current text-emerald-600/25" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="115" y="104" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground">plants</text>
      {/* consumers */}
      <rect x="270" y="80" width="90" height="40" rx="8" className="fill-current text-sky-600/25" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="315" y="104" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground">animals</text>
      {/* dead matter */}
      <rect x="170" y="170" width="120" height="40" rx="8" className="fill-current text-stone-600/30" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="230" y="194" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground">dead matter</text>
      {/* decomposers */}
      <rect x="70" y="230" width="290" height="26" rx="8" className="fill-current text-amber-600/25" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(180 130 40 / 0.9)" }} />
      <text x="215" y="247" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground">decomposers — bacteria + fungi</text>
      {/* arrows */}
      <line x1="165" y1="100" x2="265" y2="100" className="stroke-current text-emerald-700" strokeWidth="2" style={{ color: "rgb(5 122 85 / 0.9)" }} markerEnd="url(#arrhl)" />
      <line x1="315" y1="124" x2="245" y2="166" className="stroke-current text-stone-500" strokeWidth="2" markerEnd="url(#arrhl)" />
      <line x1="200" y1="214" x2="160" y2="228" className="stroke-current text-amber-700" strokeWidth="2" style={{ color: "rgb(180 130 40 / 0.9)" }} markerEnd="url(#arrhl)" />
      <line x1="115" y1="124" x2="170" y2="166" className="stroke-current text-stone-500" strokeWidth="2" markerEnd="url(#arrhl)" />
      <text x="340" y="180" fontSize="6.8" className="fill-current text-amber-700">enzymes digest outside the body,</text>
      <text x="340" y="194" fontSize="6.8" className="fill-current text-amber-700">minerals return to the soil</text>

      {/* why it matters */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY NOTHING ROTS FOREVER</text>
      {[
        "saprophytic digestion — enzymes",
        "  secreted onto dead matter",
        "release C, N, P back to soil",
        "make humus and topsoil",
        "without them: dead bodies pile",
        "  up, nutrients lock away forever",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <text x="466" y="212" fontSize="7" className="fill-current text-emerald-600">Energy flows one way, but nutrients</text>
      <text x="466" y="226" fontSize="7" className="fill-current text-emerald-600">circle only because decomposers</text>
      <text x="466" y="240" fontSize="7" className="fill-current text-emerald-600">close the loop.</text>
      <text x="466" y="262" fontSize="7" className="fill-current text-muted-foreground">Exam hook: decomposers are the</text>
      <text x="466" y="276" fontSize="7" className="fill-current text-muted-foreground">bridge between biotic and abiotic.</text>
    </svg>
  );
}
