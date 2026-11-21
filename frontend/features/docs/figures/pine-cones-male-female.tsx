/** Male and female pine cones — structure and position. Theme-aware. */
export function PineConesMaleFemale({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Male pine cone small soft pollen bearing on lower branch and female cone woody scales with ovules on upper branch compared">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Two cones, one tree — Pinus is monoecious</text>

      {/* male cone */}
      <g>
        <rect x="30" y="56" width="290" height="170" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        <text x="175" y="82" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MALE CONE (small, soft)</text>
        <ellipse cx="150" cy="150" rx="60" ry="34" className="fill-current text-amber-500/30" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        {[0, 1, 2].map((r) => (
          <path key={r} d={`M100 ${140 + r * 12} q50 ${-8} 100 0`} fill="none" strokeWidth="2" className="stroke-current text-amber-700/60" />
        ))}
        <g className="stroke-current text-amber-700" strokeWidth="1.5">
          <line x1="215" y1="140" x2="240" y2="126" /><line x1="218" y1="152" x2="244" y2="146" /><line x1="215" y1="162" x2="240" y2="168" />
        </g>
        {[[244, 124], [248, 144], [244, 168]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" className="fill-current text-amber-600/80" />
        ))}
        <text x="46" y="216" fontSize="8.5" className="fill-current text-muted-foreground">microsporophylls bear microsporangia → yellow pollen clouds; lower branches, spring</text>
      </g>

      {/* female cone */}
      <g>
        <rect x="340" y="56" width="290" height="170" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <text x="485" y="82" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FEMALE CONE (large, woody)</text>
        <ellipse cx="460" cy="150" rx="52" ry="42" className="fill-current text-emerald-700/25" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(21 128 61 / 0.9)" }} />
        {[-1, 1].map((s) => (
          <g key={s}>
            {[0, 1, 2, 3].map((r) => (
              <path key={r} d={`M460 ${118 + r * 20} q${34 * s} -6 ${28 * s} 14`} fill="none" strokeWidth="4" className="stroke-current text-emerald-800/70" />
            ))}
          </g>
        ))}
        <circle cx="500" cy="120" r="6" className="fill-current text-rose-500/70" />
        <text x="520" y="118" fontSize="8.5" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">ovules on scale, naked</text>
        <text x="356" y="216" fontSize="8.5" className="fill-current text-muted-foreground">megasporophylls in pairs; upper branches — scales open at pollination, close after</text>
      </g>

      <text x="16" y="246" fontSize="10" className="fill-current text-muted-foreground">Position matters: male cones below, female above — the tree avoids self-pollination and lets wind carry pollen upward.</text>
    </svg>
  );
}
