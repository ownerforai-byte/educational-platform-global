/** Floral formula anatomy — symbols and numbers decoded. Theme-aware. */
export function FloralFormulaAnatomy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Floral formula symbols decoded with bract actinomorphic bisexual calyx corolla androecium gynoecium numbers and fusion notation">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Reading a floral formula — the symbol key</text>

      {[
        { x: 40, t: "br ⊕ ⚥", s: "bracteate, actinomorphic", s2: "(radial), bisexual" },
        { x: 230, t: "K C A G", s: "calyx, corolla, androecium,", s2: "gynoecium (in order)" },
        { x: 420, t: "(5) 5 ∞", s: "numbers = parts per whorl;", s2: "( ) = fused, ∞ = many" },
        { x: 580, t: "G̲ / G", s: "underlined = inferior ovary;", s2: "plain = superior ovary" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 30} y="56" width="180" height="90" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
          <text x={n.x + 60} y="84" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x + 60} y="106" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x + 60} y="122" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">{n.s2}</text>
        </g>
      ))}

      <rect x="40" y="164" width="580" height="50" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="56" y="186" fontSize="9" className="fill-current text-foreground" fontWeight="700">Worked example — Brassicaceae: ⊕ ⚥ K₂+₂ C₄ A₂+₄ G(₂) — actinomorphic, bisexual, 4 sepals, 4 petals, 6 stamens (2+4), superior bicarpellary ovary.</text>
      <text x="56" y="204" fontSize="8.5" className="fill-current text-muted-foreground">The formula is a flower compressed into one line — every number and bracket carries family identity.</text>
    </svg>
  );
}
