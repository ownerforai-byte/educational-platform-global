/** Selaginella strobilus zoom — micro- and megasporophylls. Well-detailed. Theme-aware. */
export function SelaginellaHeterosporyZoom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Selaginella strobilus zoom microsporophyll megasporophyll microsporangium megasporangium microspores megaspores ligulate leaves heterosporous clubmoss">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Selaginella's strobilus — spores in two sizes</text>

      {/* strobilus */}
      <rect x="30" y="44" width="380" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="220" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CONE-LIKE STROBILUS AT SHOOT TIP</text>
      {/* axis */}
      <line x1="220" y1="80" x2="220" y2="240" className="stroke-current text-emerald-800" strokeWidth="4" style={{ color: "rgb(6 46 27 / 0.9)" }} />
      {/* sporophyll pairs alternating */}
      {[[80, 92], [80, 122], [80, 152], [80, 182], [80, 212]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M220 ${y} L${x} ${y - 10}`} className="stroke-current text-emerald-600" strokeWidth="2.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
          <path d={`M220 ${y} L360 ${y - 10}`} className="stroke-current text-emerald-600" strokeWidth="2.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
        </g>
      ))}
      {/* microsporangia (upper, small dots) */}
      {[[190, 100], [250, 130], [190, 160]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="8" className="fill-current text-sky-500/30" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          {[0, 1, 2].map((j) => (
            <circle key={j} cx={x - 4 + j * 4} cy={y} r="1.6" className="fill-current text-sky-500/80" />
          ))}
        </g>
      ))}
      {/* megasporangia (lower, bigger) */}
      {[[250, 190], [190, 220]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="11" className="fill-current text-violet-500/30" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(139 92 246 / 0.9)" }} />
          {[0, 1, 2, 3].map((j) => (
            <circle key={j} cx={x - 6 + j * 4} cy={y} r="2.2" className="fill-current text-violet-500/80" />
          ))}
        </g>
      ))}
      <text x="60" y="96" fontSize="7.2" className="fill-current text-sky-600" fontWeight="700">microsporophylls above</text>
      <text x="300" y="222" fontSize="7.2" className="fill-current text-violet-500" fontWeight="700">megasporophylls below</text>

      {/* notes card */}
      <rect x="430" y="44" width="260" height="220" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="560" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TWO SPORES, TWO FATES</text>
      {[
        "microspore → male gametophyte",
        "megaspore → female gametophyte",
        "megaspore stays on the parent",
        "female gametophyte develops inside",
        "— the seed habit's first draft",
        "sporophylls packed in a strobilus",
      ].map((t, i) => (
        <text key={t} x="446" y={94 + i * 23} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="446" y="240" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: Selaginella = heterosporous</text>
      <text x="446" y="254" fontSize="7.2" className="fill-current text-muted-foreground">pteridophyte; 'resurrection plant'</text>
      <text x="446" y="268" fontSize="7.2" className="fill-current text-muted-foreground">curls up dry and revives in rain.</text>
    </svg>
  );
}
