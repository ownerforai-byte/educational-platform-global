/** Earthworm senses photoreceptors — how a blind worm sees. Well-detailed. Theme-aware. */
export function EarthwormSensesPhotoreceptors({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Earthworm senses photoreceptors skin light avoidance negative phototaxis touch vibration chemical taste no eyes ears surface night danger response">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">A blind worm that avoids light — how?</text>
      {/* photoreceptors in skin */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PHOTORECEPTORS IN THE SKIN</text>
      <rect x="60" y="100" width="270" height="50" rx="10" className="fill-current text-violet-500/15" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      {[[90, 118], [130, 118], [170, 118], [210, 118], [250, 118], [290, 118]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="4" className="fill-current" style={{ color: "rgb(139 92 246 / 0.8)" }} />
          <path d={`M${x} ${y - 4} q4 -8 8 0`} className="fill-none stroke-current" strokeWidth="1.2" style={{ color: "rgb(139 92 246 / 0.8)" }} />
        </g>
      ))}
      <text x="195" y="172" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">single lens-less light cells scattered in the epidermis —</text>
      <text x="195" y="188" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">no image, just brightness: enough to tell sunlit from shaded</text>
      <text x="195" y="210" fontSize="6.4" textAnchor="middle" className="fill-current text-violet-600">densest at the front, sparsest at the tail</text>
      {/* senses list */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FULL SENSE LIST</text>
      {[
        ["Light", "photoreceptor cells — avoid sun"],
        ["Touch", "skin cells all over the body"],
        ["Vibration", "detects digging predators"],
        ["Chemicals", "tastes soil and food quality"],
        ["No eyes", "no ears — no image, no sound"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="406" y={96 + i * 30} fontSize="7" className="fill-current text-sky-600" fontWeight="700">{k}</text>
          <text x="452" y={96 + i * 30} fontSize="6.8" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: photoreceptors in the skin explain negative phototaxis — the worm flees light without seeing anything.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Surface behaviour follows the senses: night, dew, and darkness are safe; day and dryness are not.</text>
    </svg>
  );
}
