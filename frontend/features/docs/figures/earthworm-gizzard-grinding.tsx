/** Earthworm gizzard grinding — mechanical digestion. Well-detailed. Theme-aware. */
export function EarthwormGizzardGrinding({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Earthworm gizzard grinding mechanical digestion soil particles muscular thickening pharynx suction oesophagus calciferous stomach chemistry sequence">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The gizzard — a mill with no teeth of its own</text>
      {/* canal stations */}
      <rect x="30" y="44" width="660" height="140" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <path d="M60 120 h600" className="stroke-current" strokeWidth="14" strokeLinecap="round" style={{ color: "rgb(2 132 199 / 0.25)" }} />
      {[
        ["pharynx", "sucks leaf litter", 100],
        ["oesophagus", "conveyor", 220],
        ["gizzard", "grinds with swallowed grit", 340],
        ["stomach", "calciferous glands neutralise", 470],
        ["intestine", "typhlosole absorbs", 600],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <circle cx={x as number} cy="120" r={i === 2 ? 20 : 13} className="fill-current text-amber-500/30" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(217 119 6 / 0.9)" }} />
          <text x={x as number} y={i === 2 ? 90 : 92} fontSize={i === 2 ? 7.4 : 6.6} textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{name as string}</text>
          <text x={x as number} y={i === 2 ? 160 : 156} fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 26)}</text>
          <text x={x as number} y={i === 2 ? 172 : 168} fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(26, 52)}</text>
        </g>
      ))}
      <rect x="30" y="200" width="660" height="92" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="220" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The trick: the worm swinds sand and soil grains along with its food — the gizzard's thick muscular wall squeezes them together and shreds the litter.</text>
      <text x="360" y="238" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Mechanical digestion first, chemical digestion after — the same order as in a bird's gizzard.</text>
      <text x="360" y="256" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: gizzard = grinding station, located after the oesophagus, before the calciferous stomach.</text>
      <text x="360" y="274" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Its wall is the thickest muscle in the whole canal — that is how you spot it in a dissection.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Without it, leaf litter would pass through undigested.</text>
    </svg>
  );
}
