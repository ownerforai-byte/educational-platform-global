/** Porifera canal system — water flow through ostia, spongocoel, osculum. Theme-aware. */
export function PoriferaCanalSystem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Sponge canal system with water entering through ostia passing through choanocyte lined canals into the spongocoel and exiting the osculum carrying food and waste">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Porifera — a body built as a water pump</text>

      {/* sponge body */}
      <path d="M200 220 Q180 90 330 80 Q480 90 460 220 Z" className="fill-current text-teal-500/10" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />

      {/* ostia inlets */}
      <g className="fill-current text-sky-500">
        {[[220, 130], [250, 110], [420, 110], [440, 140], [230, 170], [440, 180]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" />
        ))}
      </g>
      <text x="90" y="120" fontSize="9" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">ostia (pores) — water IN</text>
      <g className="stroke-current text-sky-500" strokeWidth="2">
        <line x1="150" y1="120" x2="216" y2="130" /><line x1="150" y1="150" x2="226" y2="170" />
      </g>

      {/* spongocoel */}
      <ellipse cx="330" cy="160" rx="70" ry="50" className="fill-current text-sky-500/15" strokeWidth="2" strokeDasharray="5 3" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="330" y="156" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">spongocoel</text>
      <text x="330" y="170" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">choanocytes (collar cells) line it —</text>
      <text x="330" y="182" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">flagella create the water current</text>

      {/* osculum */}
      <path d="M310 80 L350 80" strokeWidth="4" className="stroke-current text-rose-500" />
      <text x="360" y="76" fontSize="9" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">osculum — water OUT</text>
      <g className="stroke-current text-rose-500" strokeWidth="2">
        <line x1="330" y1="70" x2="330" y2="50" />
      </g>
      <text x="340" y="52" fontSize="8.5" className="fill-current text-muted-foreground">waste + gametes exit here</text>

      {/* amoebocytes & skeleton */}
      <text x="90" y="216" fontSize="8.5" className="fill-current text-muted-foreground">amoebocytes — digest &amp; distribute; spicules/spongin = skeleton</text>
      <text x="90" y="244" fontSize="9.5" className="fill-current text-muted-foreground">No mouth, no gut, no nerves: every cell eats directly from the water stream — filter feeding perfected.</text>
    </svg>
  );
}
