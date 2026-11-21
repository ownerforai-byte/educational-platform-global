/** Fabaceae features — papilionaceous flower, diadelphous stamens, legume. Theme-aware. */
export function FabaceaeFeatures({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Fabaceae leguminosae features with papilionaceous flower banner wings keel diadelphous stamens nine plus one and legume fruit pea">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Fabaceae (Leguminosae) — the pea family</text>

      {/* papilionaceous flower side view */}
      <g>
        <rect x="30" y="56" width="290" height="170" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        <text x="175" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PAPILIONACEOUS (butterfly-shaped)</text>
        <path d="M120 150 q30 -34 70 -26 q-6 26 -30 34 q-24 8 -40 -8 Z" className="fill-current text-rose-400/60" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(251 113 133 / 0.9)" }} />
        <path d="M190 128 q34 6 40 30 q-30 10 -52 -10 Z" className="fill-current text-rose-400/50" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(251 113 133 / 0.9)" }} />
        <path d="M150 158 q20 22 44 18 q-16 16 -38 6 q-14 -10 -6 -24 Z" className="fill-current text-rose-500/60" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        <text x="46" y="200" fontSize="8.3" className="fill-current text-muted-foreground">1 large banner (standard) · 2 side wings · 2 fused keel petals</text>
        <text x="46" y="216" fontSize="8.3" className="fill-current text-muted-foreground">stamens: 9 fused + 1 free = DIADELPHEOUS</text>
      </g>

      {/* legume + formula */}
      <g>
        <rect x="340" y="56" width="290" height="170" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <text x="485" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Legume + formula</text>
        <path d="M410 120 q70 10 90 40 q-60 16 -110 -6 q-10 -22 20 -34 Z" className="fill-current text-emerald-500/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        {[[450, 142], [470, 150], [488, 158]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" className="fill-current text-stone-600/80" />
        ))}
        <text x="485" y="186" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">% ⚥ K(5) C₁+₂+(2) A(9)+1 G₁</text>
        <text x="485" y="204" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">pea, bean, gram — plus root-nodule nitrogen fixation</text>
      </g>
      <text x="16" y="246" fontSize="10" className="fill-current text-muted-foreground">Symbiosis bonus: Rhizobium nodules fix nitrogen — pea fields fertilise the next crop for free.</text>
    </svg>
  );
}
