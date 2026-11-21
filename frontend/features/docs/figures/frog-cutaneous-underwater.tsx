/** Frog cutaneous underwater survival — skin as scuba gear. Well-detailed. Theme-aware. */
export function FrogCutaneousUnderwater({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog cutaneous underwater survival skin as scuba gear dissolved oxygen diffusion hibernation mud winter lungs closed months skin capillaries oxygen water">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Skin as scuba gear — surviving underwater</text>
      {/* underwater frog */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">UNDERWATER EXCHANGE</text>
      {/* water */}
      <rect x="60" y="90" width="270" height="110" rx="10" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <ellipse cx="195" cy="150" rx="55" ry="28" className="fill-current text-emerald-500/25" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="195" y="154" fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">frog (lungs closed)</text>
      {/* O2 arrows in, CO2 out */}
      {[[100, 130], [130, 124], [160, 130]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y - 14} l4 12 l-4 -2 l-4 6`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      ))}
      <text x="110" y="110" fontSize="6.2" className="fill-current text-sky-600" fontWeight="700">O₂ in</text>
      {[[240, 170], [270, 164], [290, 172]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y + 10} l4 -12 l-4 2 l-4 -6`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      ))}
      <text x="255" y="196" fontSize="6.2" className="fill-current text-amber-600" fontWeight="700">CO₂ out</text>
      <text x="195" y="222" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">skin capillaries lie right under a thin, mucus-wet epidermis —</text>
      <text x="195" y="238" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">dissolved oxygen diffuses straight into the blood</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY IT SUFFICES</text>
      {[
        "a resting frog's demand is low",
        "  — skin alone can cover it",
        "hibernating frogs in mud survive",
        "  months with lungs closed",
        "active frogs must add lungs —",
        "  skin cannot keep up with leaps",
        "the same wet skin that breathes",
        "  also loses water: the trade-off",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: cutaneous respiration covers rest and hibernation; pulmonary takes over during activity — match mode to demand.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Thin skin + dense capillaries + mucus = the frog's three-part breathing kit.</text>
    </svg>
  );
}
