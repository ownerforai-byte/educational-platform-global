/**
 * Cell division — the mitotic stages from interphase through cytokinesis,
 * drawn as six mini-cells with chromosome behaviour highlighted.
 * Theme-aware via currentColor.
 */
export function MitosisStages({ className }: { className?: string }) {
  const cells = [
    { label: "Interphase", sub: "G1 · S · G2", note: "DNA replicates", cx: 70, chromo: "diffuse" },
    { label: "Prophase", sub: "chromosomes condense", note: "nuclear envelope breaks", cx: 178, chromo: "condensed" },
    { label: "Metaphase", sub: "equatorial plate", note: "spindle fibres attach", cx: 286, chromo: "aligned" },
    { label: "Anaphase", sub: "centromeres split", note: "chromatids separate", cx: 394, chromo: "split" },
    { label: "Telophase", sub: "nuclei reform", note: "envelopes rebuild", cx: 502, chromo: "reformed" },
    { label: "Cytokinesis", sub: "cytoplasm divides", note: "two daughter cells", cx: 610, chromo: "done" },
  ];
  return (
    <svg viewBox="0 0 680 250" className={className} role="img" aria-label="Six stages of mitosis from interphase through cytokinesis showing chromosome condensation, alignment at the equator, separation of chromatids and formation of two daughter cells">
      {cells.map((c, i) => (
        <g key={c.label}>
          <circle cx={c.cx} cy="110" r="42" className="fill-current text-sky-500/5" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.7)" }} />
          {/* stage-specific chromosomes */}
          {c.chromo === "diffuse" && (
            <circle cx={c.cx} cy="110" r="16" className="fill-current text-violet-500/20" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.8)" }} />
          )}
          {c.chromo === "condensed" && (
            <g className="stroke-current text-violet-600 dark:text-violet-400" strokeWidth="3" style={{ color: "rgb(124 58 237)" }}>
              <line x1={c.cx - 14} y1="98" x2={c.cx - 4} y2="118" />
              <line x1={c.cx + 4} y1="98" x2={c.cx + 14} y2="118" />
            </g>
          )}
          {c.chromo === "aligned" && (
            <g className="stroke-current text-violet-600 dark:text-violet-400" strokeWidth="3" style={{ color: "rgb(124 58 237)" }}>
              <line x1={c.cx - 4} y1="110" x2={c.cx + 4} y2="110" />
              <line x1={c.cx - 30} y1="146" x2={c.cx - 2} y2="112" />
              <line x1={c.cx + 30} y1="146" x2={c.cx + 2} y2="112" />
              <line x1={c.cx - 30} y1="74" x2={c.cx - 2} y2="108" />
              <line x1={c.cx + 30} y1="74" x2={c.cx + 2} y2="108" />
            </g>
          )}
          {c.chromo === "split" && (
            <g className="stroke-current text-violet-600 dark:text-violet-400" strokeWidth="3" style={{ color: "rgb(124 58 237)" }}>
              <line x1={c.cx - 22} y1="94" x2={c.cx - 10} y2="126" />
              <line x1={c.cx + 22} y1="94" x2={c.cx + 10} y2="126" />
            </g>
          )}
          {c.chromo === "reformed" && (
            <g>
              <circle cx={c.cx - 12} cy="106" r="12" className="fill-current text-violet-500/20" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.8)" }} />
              <circle cx={c.cx + 12} cy="116" r="12" className="fill-current text-violet-500/20" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.8)" }} />
            </g>
          )}
          {c.chromo === "done" && (
            <g>
              <circle cx={c.cx - 20} cy="110" r="26" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.8)" }} />
              <circle cx={c.cx + 20} cy="110" r="26" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.8)" }} />
            </g>
          )}
          <text x={c.cx} y="172" textAnchor="middle" fontSize="11" className="fill-current text-foreground" fontWeight="800">{c.label}</text>
          <text x={c.cx} y="188" textAnchor="middle" fontSize="9" className="fill-current text-muted-foreground">{c.sub}</text>
          <text x={c.cx} y="202" textAnchor="middle" fontSize="9" className="fill-current text-muted-foreground">{c.note}</text>
          {i < cells.length - 1 && (
            <g>
              <line x1={c.cx + 46} y1="110" x2={c.cx + 64} y2="110" strokeWidth="2.5" className="stroke-current text-foreground" />
              <polygon points={`${c.cx + 60},105 ${c.cx + 70},110 ${c.cx + 60},115`} className="fill-current text-foreground" />
            </g>
          )}
        </g>
      ))}
      <text x="12" y="30" fontSize="12" className="fill-current text-foreground" fontWeight="800">Mitosis — one diploid cell → two identical diploid cells (2n → 2n)</text>
      <text x="12" y="48" fontSize="10" className="fill-current text-muted-foreground">Chromosome number is conserved; meiosis (next) halves it for gametes.</text>
    </svg>
  );
}
