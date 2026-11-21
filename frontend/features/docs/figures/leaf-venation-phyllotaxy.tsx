/** Leaf venation & phyllotaxy — reticulate vs parallel, alternate/opposite/whorled. Theme-aware. */
export function LeafVenationPhyllotaxy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Leaf venation reticulate net of dicot and parallel of monocot and phyllotaxy alternate opposite and whorled leaf arrangement">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Leaf architecture — veins and arrangement</text>

      {/* reticulate leaf */}
      <g>
        <rect x="16" y="50" width="196" height="170" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <text x="114" y="74" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">RETICULATE (dicot)</text>
        <path d="M114 90 q-40 50 0 110 q40 -60 0 -110 Z" className="fill-current text-emerald-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <line x1="114" y1="92" x2="114" y2="196" strokeWidth="2.5" className="stroke-current text-emerald-700" />
        <g className="stroke-current text-emerald-600" strokeWidth="1.2">
          <line x1="114" y1="110" x2="92" y2="130" /><line x1="114" y1="110" x2="136" y2="130" /><line x1="114" y1="140" x2="88" y2="164" /><line x1="114" y1="140" x2="140" y2="164" /><line x1="114" y1="170" x2="96" y2="188" /><line x1="114" y1="170" x2="132" y2="188" />
        </g>
        <text x="114" y="216" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">a branching net (mango, Peepal)</text>
      </g>

      {/* parallel leaf */}
      <g>
        <rect x="232" y="50" width="196" height="170" rx="12" className="fill-current text-teal-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
        <text x="330" y="74" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PARALLEL (monocot)</text>
        <path d="M290 100 q40 -16 80 0 q-40 70 -80 0 Z" className="fill-current text-teal-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${296 + i * 17} 96 q${34 + i * 2} 34 ${2 + i} 70`} fill="none" strokeWidth="1.5" className="stroke-current text-teal-700" />
        ))}
        <text x="330" y="216" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">veins run side by side (maize, bamboo)</text>
      </g>

      {/* phyllotaxy */}
      <g>
        <rect x="448" y="50" width="196" height="170" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <text x="546" y="74" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PHYLLOTAXY</text>
        <line x1="486" y1="200" x2="486" y2="96" strokeWidth="4" className="stroke-current text-emerald-700" />
        {[[486, 180], [486, 150], [486, 120]].map(([x, y], i) => (
          <ellipse key={i} cx={x + (i % 2 === 0 ? 14 : -14)} cy={y} rx="12" ry="6" className="fill-current text-emerald-500/60" />
        ))}
        <text x="486" y="216" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">alternate (one per node)</text>
        <text x="586" y="120" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">opposite: pair per node</text>
        <text x="586" y="140" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">whorled: 3+ per node</text>
      </g>
      <text x="16" y="246" fontSize="10" className="fill-current text-muted-foreground">Venation + phyllotaxy are ID fingerprints: a net-veined, alternate-leaved plant is almost certainly a dicot.</text>
    </svg>
  );
}
