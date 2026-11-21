/** Spirogyra cell zoom — spiral chloroplast and pyrenoids. Well-detailed. Theme-aware. */
export function SpirogyraPyrenoidZoom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Spirogyra filament cell zoom spiral ribbon chloroplast pyrenoids nucleus cell wall mucilage sheath conjugation green alga pond silk">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Zoom into one Spirogyra cell</text>

      {/* filament strip */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="230" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FILAMENT (unbranched, one cell thick)</text>
      {/* three cells in a row */}
      {[80, 205, 330].map((x, i) => (
        <g key={x}>
          <rect x={x} y="84" width="110" height="150" rx="10" className="fill-current text-emerald-600/10" stroke="currentColor" strokeWidth="2.2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
          {/* spiral chloroplast */}
          <path d={`M${x + 12} 96 q46 20 0 40 q-46 20 0 40 q46 20 0 40 q-46 20 0 14`} className="fill-none stroke-current text-emerald-500" strokeWidth="5" style={{ color: "rgb(34 197 94 / 0.8)" }} />
          {/* pyrenoids on the ribbon */}
          {[[x + 24, 118], [x + 44, 156], [x + 24, 196], [x + 62, 176]].map(([px, py], j) => (
            <circle key={j} cx={px} cy={py} r="5" className="fill-current text-amber-400/60" stroke="currentColor" strokeWidth="1" style={{ color: "rgb(251 191 36 / 0.9)" }} />
          ))}
          {i === 1 && (
            <>
              <circle cx={x + 55} cy="160" r="8" className="fill-current text-violet-500/50" stroke="currentColor" strokeWidth="1.4" />
              <text x={x + 55} y="248" fontSize="6.8" textAnchor="middle" className="fill-current text-violet-500">nucleus</text>
            </>
          )}
        </g>
      ))}
      <text x="60" y="256" fontSize="7.2" className="fill-current text-muted-foreground">end walls join cells like a green chain — 'pond silk'.</text>

      {/* notes card */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ONE CELL, FOUR FACTS</text>
      {[
        "ribbon chloroplast spirals",
        "1 to many pyrenoids make starch",
        "central nucleus in cytoplasm",
        "mucilage sheath = slimy feel",
        "name means 'spiral' — the",
        "chloroplast gives it away",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 23} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="466" y="240" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: spiral chloroplast +</text>
      <text x="466" y="254" fontSize="7.2" className="fill-current text-muted-foreground">pyrenoids = Spirogyra, every time.</text>
    </svg>
  );
}
