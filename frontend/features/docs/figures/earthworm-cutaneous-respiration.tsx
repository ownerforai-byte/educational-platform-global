/** Earthworm cutaneous respiration — breathing through skin. Well-detailed. Theme-aware. */
export function EarthwormCutaneousRespiration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Earthworm cutaneous respiration breathing through moist skin oxygen diffusion capillary network mucus why worms surface after rain drowning dried out">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Breathing through the skin — and its price</text>
      {/* skin zoom */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SKIN ZOOM</text>
      <rect x="60" y="100" width="270" height="70" rx="10" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="92" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">mucus film on the surface</text>
      {[[90, 170], [130, 170], [170, 170], [210, 170], [250, 170], [290, 170]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x} 170 q6 -14 14 -22`} className="fill-none stroke-current" strokeWidth="1.6" style={{ color: "rgb(244 63 94 / 0.8)" }} />
          <circle cx={x + 14} cy={148} r="2.4" className="fill-current" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        </g>
      ))}
      <text x="195" y="196" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">O₂ dissolves in the film, diffuses through, and is picked up by</text>
      <text x="195" y="210" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">the dense capillary net just under the epidermis</text>
      {/* consequences */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE PRICE OF SKIN BREATHING</text>
      {[
        "skin must stay moist — a dried",
        "  worm suffocates",
        "after heavy rain, flooded burrows",
        "  bring worms to the surface —",
        "  not drowning but oxygen hunger",
        "they avoid sun and dry wind",
        "they surface at night when the",
        "  grass is dew-wet",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 19} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: cutaneous respiration needs moisture — explain why worms surface after rain, and the mark is yours.</text>
    </svg>
  );
}
