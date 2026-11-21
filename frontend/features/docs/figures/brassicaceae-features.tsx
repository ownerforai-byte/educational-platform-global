/** Brassicaceae features — cruciform corolla, tetradynamous stamens. Theme-aware. */
export function BrassicaceaeFeatures({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Brassicaceae cruciferae family features with four petals in cross arrangement tetradynamous stamens two plus four and silique fruit mustard">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Brassicaceae (Cruciferae) — the mustard family</text>

      {/* flower top view */}
      <g>
        <rect x="30" y="56" width="290" height="170" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        <text x="175" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">'Cruciform' = cross-shaped corolla</text>
        {[0, 90, 180, 270].map((a) => (
          <ellipse key={a} cx="175" cy="140" rx="14" ry="34" transform={`rotate(${a} 175 140)`} className="fill-current text-rose-400/50" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(251 113 133 / 0.9)" }} />
        ))}
        <circle cx="175" cy="140" r="10" className="fill-current text-amber-500/70" />
        <text x="46" y="196" fontSize="8.5" className="fill-current text-muted-foreground">4 free petals in 2 whorls of 2 — K₂+₂ C₄</text>
        <text x="46" y="214" fontSize="8.5" className="fill-current text-muted-foreground">stamens: 2 short outer + 4 long inner = 6 (TETRADYNAMEOUS)</text>
      </g>

      {/* fruit + formula */}
      <g>
        <rect x="340" y="56" width="290" height="170" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <text x="485" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Silique + formula</text>
        <path d="M400 120 q80 -12 170 0 q-80 16 -170 0 Z" className="fill-current text-emerald-500/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <line x1="400" y1="120" x2="570" y2="120" strokeWidth="1.5" className="stroke-current text-emerald-700" />
        <text x="485" y="156" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">silique: long narrow pod with a false partition</text>
        <text x="485" y="186" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">⊕ ⚥ K₂+₂ C₄ A₂+₄ G(₂)</text>
        <text x="485" y="204" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">mustard, cabbage, radish — food oils &amp; vegetables</text>
      </g>
      <text x="16" y="246" fontSize="10" className="fill-current text-muted-foreground">Name origin: Cruciferae = 'cross-bearer', from the four petals arranged like a Maltese cross.</text>
    </svg>
  );
}
