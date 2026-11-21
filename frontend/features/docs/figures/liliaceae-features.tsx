/** Liliaceae features — trimerous monocot flower, parallel leaves, capsule. Theme-aware. */
export function LiliaceaeFeatures({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Liliaceae family features with trimerous flower six tepals in two whorls of three superior ovary capsule fruit and parallel veined leaves onion lily">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Liliaceae — the monocot blueprint family</text>

      {/* trimerous flower */}
      <g>
        <rect x="30" y="56" width="290" height="170" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        <text x="175" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TRIMEROUS — parts in 3s</text>
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse key={a} cx="175" cy="150" rx="13" ry="36" transform={`rotate(${a} 175 150)`} className="fill-current text-amber-300/50" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(252 211 77 / 0.9)" }} />
        ))}
        <circle cx="175" cy="150" r="11" className="fill-current text-emerald-600/70" />
        <text x="46" y="206" fontSize="8.3" className="fill-current text-muted-foreground">6 TEPALS (sepals + petals look alike) in 2 whorls of 3</text>
        <text x="46" y="222" fontSize="8.3" className="fill-current text-muted-foreground">stamens in 2 whorls of 3; superior tricarpellary ovary</text>
      </g>

      {/* capsule + formula */}
      <g>
        <rect x="340" y="56" width="290" height="170" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <text x="485" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Capsule + formula</text>
        <ellipse cx="450" cy="140" rx="26" ry="30" className="fill-current text-emerald-500/40" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <line x1="450" y1="110" x2="450" y2="170" strokeWidth="1.5" className="stroke-current text-emerald-700" />
        <text x="485" y="186" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">⊕ ⚥ P₃+₃ A₃+₃ G(₃)</text>
        <text x="485" y="204" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">onion, garlic, lily, aloe, asparagus</text>
      </g>
      <text x="16" y="246" fontSize="10" className="fill-current text-muted-foreground">Monocot checklist all in one family: trimerous flowers, parallel-veined leaves, fibrous roots, scattered vascular bundles.</text>
    </svg>
  );
}
