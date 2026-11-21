/** Conifer forest belts — where gymnosperms rule. Well-detailed. Theme-aware. */
export function ConiferForestBelt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Conifer forest belt altitude chir pine mid hills oak rhododendron higher fir spruce birch timber line alpine Nepal vegetation zones gymnosperm distribution">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Climb a Himalayan slope — find the conifers</text>

      {/* mountain profile */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      {/* slope */}
      <path d="M50 250 L180 100 L240 130 L400 60 L400 250 Z" className="fill-current text-emerald-900/20" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(30 41 59 / 0.9)" }} />
      {/* chir pine zone */}
      {[[100, 218], [130, 200], [160, 180]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x} ${y} l8 -22 l8 22 Z`} className="fill-current text-emerald-700/60" />
          <rect x={x + 7} y={y} width="2" height="8" className="fill-current text-amber-800" />
        </g>
      ))}
      <text x="60" y="240" fontSize="7" className="fill-current text-emerald-700" fontWeight="700">chir pine — mid-hills, resin &amp; timber</text>
      {/* higher conifers */}
      {[[240, 150], [270, 132], [300, 116], [330, 104]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x} ${y} l6 -18 l6 18 Z`} className="fill-current text-teal-700/60" />
        </g>
      ))}
      <text x="250" y="96" fontSize="7" className="fill-current text-teal-700" fontWeight="700">fir, spruce, hemlock — upper belt</text>
      {/* timberline */}
      <path d="M250 108 q60 -30 120 -50" className="fill-none stroke-current text-rose-400" strokeWidth="2" strokeDasharray="5 3" />
      <text x="330" y="52" fontSize="7" className="fill-current text-rose-400">timberline — trees give up</text>

      {/* notes card */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY CONIFERS WIN HIGH UP</text>
      {[
        "needle leaves shrug off snow",
        "evergreen — short seasons used",
        "conical crown sheds snow load",
        "flexible wood, wind-proof",
        "mycorrhizae feed on poor soils",
        "resin antifreeze + wound seal",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 23} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="466" y="240" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: chir pine (Pinus roxburghii)</text>
      <text x="466" y="254" fontSize="7.2" className="fill-current text-muted-foreground">dominates Nepal's mid-hill slopes —</text>
      <text x="466" y="268" fontSize="7.2" className="fill-current text-muted-foreground">resin, turpentine, fuelwood.</text>
    </svg>
  );
}
