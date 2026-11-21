/** Greenhouse effect mechanism — the one-way heat valve. Well-detailed. Theme-aware. */
export function GreenhouseEffectMechanism({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Greenhouse effect mechanism shortwave solar radiation passes longwave infrared absorbed re emitted greenhouse gases blanket analogy natural enhanced difference 33 degrees warmer minus 18 celsius energy balance diagram arrows wavelength">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The greenhouse effect — a one-way valve for heat</text>
      {/* mechanism diagram */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE ENERGY BALANCE</text>
      {/* sun arrow in */}
      <path d="M70 100 L170 160" className="fill-none stroke-current" strokeWidth="4" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="60" y="94" fontSize="5.6" className="fill-current text-amber-600" fontWeight="700">shortwave IN (visible)</text>
      {/* ground */}
      <rect x="60" y="165" width="270" height="20" rx="6" className="fill-current text-stone-500/25" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="195" y="180" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">Earth's surface warms</text>
      {/* IR out partially trapped */}
      <path d="M240 160 L320 90" className="fill-none stroke-current" strokeWidth="3" strokeDasharray="6 4" style={{ color: "rgb(244 63 94 / 0.8)" }} />
      <path d="M270 160 Q300 120 300 130" className="fill-none stroke-current" strokeWidth="3" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="330" y="120" fontSize="5.6" className="fill-current text-rose-600" fontWeight="700">longwave OUT (infrared)</text>
      <text x="195" y="216" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">CO₂, CH₄ and friends absorb outgoing infrared and re-radiate it back — the planet's blanket</text>
      {/* natural vs enhanced */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NATURAL vs ENHANCED</text>
      {[
        "natural greenhouse effect: keeps",
        "  Earth ~33°C warmer than an",
        "  airless world (−18°C → +15°C)",
        "  — it is essential to life",
        "enhanced effect: extra CO₂ and",
        "  CH₄ from fossil fuels, farming",
        "  and deforestation thicken the",
        "  blanket — the problem is the",
        "  extra, not the effect",
        "exam trap: 'greenhouse effect' is",
        "  not the villain; the enhanced",
        "  part is",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: shortwave in, longwave out, gases absorb longwave — the mechanism in one sentence; +33°C is the natural effect's value.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Without the greenhouse effect, Earth's oceans would freeze — the term is a compliment gone wrong.</text>
    </svg>
  );
}
