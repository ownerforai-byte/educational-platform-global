/** Gymnosperm diversity & economic importance — Cycas, Pinus, uses. Theme-aware. */
export function GymnospermDiversityUses({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Gymnosperm diversity with cycas palm like pinus conifer gnetum and economic uses timber resin paper turpentine and edible seeds">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Living gymnosperms & their uses</text>

      {/* Cycas */}
      <g>
        <rect x="30" y="56" width="140" height="140" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <rect x="94" y="120" width="12" height="60" rx="4" className="fill-current text-stone-500/60" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <path d={`M100 ${116 + i * 12} q-40 -10 -54 ${-8 - i * 4}`} fill="none" strokeWidth="4" strokeLinecap="round" className="stroke-current text-emerald-600/80" />
            <path d={`M100 ${116 + i * 12} q40 -10 54 ${-8 - i * 4}`} fill="none" strokeWidth="4" strokeLinecap="round" className="stroke-current text-emerald-600/80" />
          </g>
        ))}
        <text x="100" y="206" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">CYCAS — 'sago palm'</text>
      </g>

      {/* Pinus */}
      <g>
        <rect x="190" y="56" width="140" height="140" rx="12" className="fill-current text-teal-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
        <rect x="254" y="110" width="10" height="70" rx="4" className="fill-current text-stone-500/60" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M259 ${116 + i * 22} l-34 ${10 + i * 3} q34 8 68 0 Z`} className="fill-current text-emerald-700/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(21 128 61 / 0.9)" }} />
        ))}
        <text x="260" y="206" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">PINUS — pine</text>
      </g>

      {/* uses */}
      <rect x="350" y="56" width="290" height="140" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="366" y="80" fontSize="9.5" className="fill-current text-foreground" fontWeight="800">Economic importance:</text>
      {["timber — 'chir' pine wood, furniture", "resin → turpentine, rosin, varnish", "paper pulp from softwood", "edible seeds (Cycas sago after processing)", "ornamental & Christmas trees"].map((s, i) => (
        <text key={i} x="366" y={100 + i * 18} fontSize="8.3" className="fill-current text-muted-foreground">• {s}</text>
      ))}

      <text x="16" y="244" fontSize="10" className="fill-current text-muted-foreground">Nepal link: chir pine (Pinus roxburghii) forests of the mid-hills supply resin and timber — gymnosperms are only ~30 species here, but economically huge.</text>
    </svg>
  );
}
