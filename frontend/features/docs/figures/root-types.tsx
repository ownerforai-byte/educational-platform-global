/** Root types — tap, fibrous, adventitious with modifications. Theme-aware. */
export function RootTypes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Root types tap root of dicot with laterals fibrous roots of monocot and adventitious roots with modifications">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three root systems</text>

      {/* tap root */}
      <g>
        <rect x="16" y="50" width="196" height="170" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <text x="114" y="74" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TAP ROOT (dicot)</text>
        <line x1="114" y1="88" x2="114" y2="200" strokeWidth="4" className="stroke-current text-emerald-700" />
        <g className="stroke-current text-emerald-600" strokeWidth="2">
          <line x1="114" y1="110" x2="70" y2="130" /><line x1="114" y1="110" x2="158" y2="130" />
          <line x1="114" y1="150" x2="82" y2="170" /><line x1="114" y1="150" x2="146" y2="170" />
        </g>
        <text x="114" y="216" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">one main root + laterals; stores food (carrot)</text>
      </g>

      {/* fibrous */}
      <g>
        <rect x="232" y="50" width="196" height="170" rx="12" className="fill-current text-teal-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
        <text x="330" y="74" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FIBROUS (monocot)</text>
        <g className="stroke-current text-teal-600" strokeWidth="2.5">
          <line x1="330" y1="92" x2="270" y2="180" /><line x1="330" y1="92" x2="300" y2="190" /><line x1="330" y1="92" x2="330" y2="196" /><line x1="330" y1="92" x2="360" y2="190" /><line x1="330" y1="92" x2="390" y2="180" />
        </g>
        <text x="330" y="216" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">thread-like cluster from stem base (wheat, grass)</text>
      </g>

      {/* adventitious */}
      <g>
        <rect x="448" y="50" width="196" height="170" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <text x="546" y="74" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ADVENTITIOUS</text>
        <g className="stroke-current text-sky-600" strokeWidth="2.5">
          <line x1="546" y1="96" x2="500" y2="170" /><line x1="546" y1="96" x2="546" y2="190" /><line x1="546" y1="96" x2="592" y2="170" />
        </g>
        <text x="546" y="206" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">from nodes/leaves: prop roots,</text>
        <text x="546" y="220" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">climbing roots, sweet-potato swellings</text>
      </g>

      <text x="16" y="246" fontSize="10" className="fill-current text-muted-foreground">Root jobs: anchorage, absorption (root hairs), storage, and in some species extra support or climbing.</text>
    </svg>
  );
}
