/** Rhododendron temperate show — Nepal's national flower belt. Well-detailed. Theme-aware. */
export function RhododendronTemperateBelt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Rhododendron temperate belt 2000 to 3000 metres Nepal national flower lali gurans oak fir forest spring bloom altitude">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Rhododendron (lali gurans) — the temperate show-off</text>

      {/* tree with blooms */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">2000–3000 m, BLOOMS IN SPRING</text>
      <path d="M195 250 v-90" className="stroke-current text-amber-800" strokeWidth="6" style={{ color: "rgb(146 64 14 / 0.9)" }} />
      {[[-46, -20], [0, -46], [46, -20], [-24, -62], [24, -62]].map(([dx, dy], i) => (
        <g key={i}>
          <circle cx={195 + dx} cy={132 + dy} r="15" className="fill-current text-emerald-700/40" />
          {[0, 1, 2].map((j) => (
            <circle key={j} cx={195 + dx + (j - 1) * 9} cy={128 + dy} r="4.5" className="fill-current text-rose-500/70" />
          ))}
        </g>
      ))}
      <text x="195" y="266" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">coral-red bloom blankets whole hillsides each spring</text>
      <text x="50" y="120" fontSize="7" className="fill-current text-muted-foreground">evergreen broadleaf — leathery leaves</text>
      <text x="50" y="134" fontSize="7" className="fill-current text-muted-foreground">shares the temperate forest with oak and fir</text>

      {/* facts */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY IT MATTERS</text>
      {[
        "Nepal's national flower (lali gurans)",
        "~30+ species in the country —",
        "  a centre of rhododendron diversity",
        "tourism draw: spring trekking",
        "bark and flower used in folk medicine",
        "indicator of the temperate zone —",
        "  see it, name the altitude",
      ].map((t, i) => (
        <text key={t} x="406" y={94 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <text x="406" y="228" fontSize="7" className="fill-current text-rose-500" fontWeight="700">One glance at a blooming hillside and</text>
      <text x="406" y="242" fontSize="7" className="fill-current text-rose-500" fontWeight="700">you can name the zone: temperate.</text>
      <text x="406" y="262" fontSize="7" className="fill-current text-muted-foreground">Exam hook: altitude band + national</text>
      <text x="406" y="276" fontSize="7" className="fill-current text-muted-foreground">flower status in one line.</text>
    </svg>
  );
}
