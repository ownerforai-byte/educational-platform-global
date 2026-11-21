/** Algal thallus forms — unicellular, colonial, filamentous, parenchymatous. Theme-aware. */
export function AlgalThallusTypes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Algal thallus forms unicellular colonial coenobium filamentous branched and parenchymatous with examples">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Thallus shapes — every body plan algae invented</text>

      {[
        { x: 80, t: "UNICELLULAR", s: "Chlamydomonas", draw: "one" },
        { x: 240, t: "COLONIAL", s: "Volvox (coenobium)", draw: "many" },
        { x: 410, t: "FILAMENTOUS", s: "Spirogyra", draw: "fila" },
        { x: 580, t: "PARENCHYMATOUS", s: "Ulva-like sheet", draw: "sheet" },
      ].map((n) => (
        <g key={n.t}>
          {n.draw === "one" && <circle cx={n.x} cy="110" r="22" className="fill-current text-emerald-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />}
          {n.draw === "many" && (
            <g>
              <circle cx={n.x} cy="110" r="30" fill="none" strokeWidth="2" strokeDasharray="4 3" className="stroke-current text-emerald-600" />
              {[[n.x - 12, 96], [n.x + 10, 98], [n.x - 4, 122], [n.x + 14, 118], [n.x - 18, 116]].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="5" className="fill-current text-emerald-500/60" />
              ))}
            </g>
          )}
          {n.draw === "fila" && (
            <g className="stroke-current text-emerald-500" strokeWidth="4">
              <path d={`M${n.x - 34} 110 q17 -14 34 0 q17 14 34 0 q17 -14 34 0`} fill="none" />
            </g>
          )}
          {n.draw === "sheet" && <rect x={n.x - 40} y="90" width="80" height="40" rx="6" className="fill-current text-emerald-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />}
          <text x={n.x} y="164" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="180" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
        </g>
      ))}
      <text x="16" y="216" fontSize="10" className="fill-current text-muted-foreground">No roots, stems or leaves — the whole plant is a THALLUS, and every cell touches water.</text>
    </svg>
  );
}
