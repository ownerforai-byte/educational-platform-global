/** Earthworm nervous system — brain, ventral nerve cord, ganglia, segmental nerves. Theme-aware. */
export function EarthwormNervousSystem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Earthworm nervous system with bilobed brain circumpharyngeal commissures ventral nerve cord with segmental ganglia and segmental nerves">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">A ladder nervous system, segment by segment</text>

      {/* body outline */}
      <path d="M80 120 q60 -20 130 -16 q80 4 140 0 q90 -6 160 4 q50 6 50 12 q0 8 -50 12 q-70 10 -160 4 q-60 -4 -140 0 q-70 4 -130 -16 Z" className="fill-current text-rose-500/8" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(190 90 90 / 0.7)" }} />

      {/* brain */}
      <circle cx="110" cy="96" r="10" className="fill-current text-violet-500/40" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
      <text x="110" y="76" fontSize="9" textAnchor="middle" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="800">brain (bilobed, dorsal)</text>

      {/* circumpharyngeal commissures */}
      <path d="M110 106 q-14 26 10 34 M110 106 q14 26 -10 34" fill="none" strokeWidth="3" className="stroke-current text-violet-600" />
      <text x="60" y="160" fontSize="8" className="fill-current text-muted-foreground">circumpharyngeal commissures</text>

      {/* ventral nerve cord */}
      <line x1="120" y1="150" x2="560" y2="142" strokeWidth="5" className="stroke-current text-violet-500" />
      <text x="360" y="172" fontSize="9" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="800">ventral nerve cord — runs UNDER the gut</text>

      {/* ganglia */}
      {Array.from({ length: 9 }, (_, i) => (
        <g key={i}>
          <circle cx={150 + i * 48} cy={149 - i * 0.8} r="5" className="fill-current text-violet-600/70" />
          <line x1={150 + i * 48} y1={149 - i * 0.8} x2={150 + i * 48} y2={112 - i * 0.8} strokeWidth="1.5" className="stroke-current text-violet-400" />
        </g>
      ))}
      <text x="200" y="104" fontSize="8" className="fill-current text-muted-foreground">ganglion + 3 pairs of segmental nerves per segment</text>

      <text x="16" y="216" fontSize="10" className="fill-current text-muted-foreground">Reflex path: receptor in skin → segmental nerve → ganglion → motor response, mostly without the brain — each segment runs its own reflexes.</text>
    </svg>
  );
}
