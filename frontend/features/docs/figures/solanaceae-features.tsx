/** Solanaceae features — five-lobed rotate corolla, epipetalous stamens, berry. Theme-aware. */
export function SolanaceaeFeatures({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Solanaceae family features with five lobed rotate corolla epipetalous stamens attached to petals bicarpellary ovary and berry fruit potato tomato">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solanaceae — the nightshade family</text>

      {/* flower front view */}
      <g>
        <rect x="30" y="56" width="290" height="170" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
        <text x="175" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ROTATE, 5-lobed corolla</text>
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="175" cy="150" rx="16" ry="34" transform={`rotate(${a} 175 150)`} className="fill-current text-violet-400/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(167 139 250 / 0.9)" }} />
        ))}
        <circle cx="175" cy="150" r="12" className="fill-current text-amber-500/70" />
        <text x="46" y="206" fontSize="8.3" className="fill-current text-muted-foreground">5 fused petals, wheel-shaped (rotate) face</text>
        <text x="46" y="222" fontSize="8.3" className="fill-current text-muted-foreground">stamens EPIPETALOUS — attached to the petals</text>
      </g>

      {/* fruit + formula */}
      <g>
        <rect x="340" y="56" width="290" height="170" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <text x="485" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Berry + formula</text>
        <circle cx="440" cy="140" r="26" className="fill-current text-rose-500/40" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        <path d="M440 114 l-6 -10 h12 Z" className="fill-current text-emerald-600/70" />
        <text x="485" y="186" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">⊕ ⚥ K(5) C(5) A5 G(₂)</text>
        <text x="485" y="204" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">potato, tomato, chilli, tobacco — many are poisonous</text>
      </g>
      <text x="16" y="246" fontSize="10" className="fill-current text-muted-foreground">Chemical signature: alkaloids (solanine, nicotine, atropine) — the family that feeds us and poisons us.</text>
    </svg>
  );
}
