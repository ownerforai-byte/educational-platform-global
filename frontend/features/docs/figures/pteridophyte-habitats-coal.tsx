/** Pteridophyte habitats and coal-forming ancestors. Well-detailed. Theme-aware. */
export function PteridophyteHabitatsCoal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Pteridophyte habitats shady moist damp places coal formation Carboniferous tree ferns Lepidodendron fossils ancient forests swamp">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Shady corners today — coal seams yesterday</text>

      {/* modern habitat */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TODAY: DAMP, SHADY, HUMID</text>
      {/* shaded forest floor with ferns */}
      {[[100, 200], [170, 206], [250, 198]].map(([x, y], i) => (
        <g key={x}>
          <path d={`M${x} ${y} L${x} ${y - 30}`} className="stroke-current text-emerald-700" strokeWidth="2.6" style={{ color: "rgb(20 83 45 / 0.9)" }} />
          {[-1, 0, 1].map((k) => (
            <ellipse key={k} cx={x + k * 10} cy={y - 34 + Math.abs(k) * 4} rx="9" ry="4" className="fill-current text-emerald-600/40" />
          ))}
        </g>
      ))}
      <path d="M50 226 q170 -12 300 0" className="fill-none stroke-current text-sky-500" strokeWidth="3" strokeDasharray="6 4" />
      <text x="195" y="246" fontSize="7.2" textAnchor="middle" className="fill-current text-sky-600">permanently damp soil — sperm still must swim</text>
      <text x="50" y="264" fontSize="7" className="fill-current text-muted-foreground">rock crevices, stream banks, terraced field walls</text>

      {/* ancient coal forest */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="540" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THEN: CARBONIFEROUS FORESTS</text>
      {/* tree ferns / lepidodendron silhouettes */}
      {[[440, 200], [540, 194], [630, 202]].map(([x, y], i) => (
        <g key={x}>
          <rect x={x - 5} y={y - 90} width="10" height="90" rx="4" className="fill-current text-amber-900/40" />
          {[-2, -1, 0, 1, 2].map((k) => (
            <path key={k} d={`M${x} ${y - 88} l${k * 16} -12`} className="stroke-current text-emerald-700" strokeWidth="2.6" style={{ color: "rgb(20 83 45 / 0.9)" }} />
          ))}
        </g>
      ))}
      {/* coal seam */}
      <rect x="410" y="220" width="260" height="26" rx="6" className="fill-current text-stone-900/60" />
      <text x="540" y="238" fontSize="7" textAnchor="middle" className="fill-current text-stone-200">coal seam — buried, compressed forests</text>
      <text x="410" y="260" fontSize="7" className="fill-current text-muted-foreground">Lepidodendron, tree ferns → today's coal</text>

      {/* footer */}
      <rect x="30" y="272" width="660" height="20" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: pteridophytes were the first vascular land plants; their Carboniferous ancestors became coal.</text>
    </svg>
  );
}
