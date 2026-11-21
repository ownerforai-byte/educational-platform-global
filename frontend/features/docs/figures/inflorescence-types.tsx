/** Inflorescence types — raceme, spike, umbel, corymb, head. Theme-aware. */
export function InflorescenceTypes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Inflorescence types raceme stalked flowers along axis spike sessile flowers umbel rays from one point corymb flat top and head compact capitulum">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Inflorescence — how flowers are packed</text>

      {[
        { x: 80, t: "RACEME", s: "stalked flowers up the axis" },
        { x: 220, t: "SPIKE", s: "sessile (no stalk) flowers" },
        { x: 360, t: "UMBEL", s: "stalks from one point" },
        { x: 500, t: "HEAD", s: "compact disc of florets" },
      ].map((n, idx) => (
        <g key={n.t}>
          <rect x={n.x - 62} y="56" width="124" height="160" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <text x={n.x} y="80" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          {idx === 0 && (
            <g>
              <line x1={n.x} y1="200" x2={n.x} y2="96" strokeWidth="3" className="stroke-current text-emerald-700" />
              {[100, 130, 160, 190].map((y, i) => (
                <g key={y}><line x1={n.x} y1={y} x2={n.x + 18} y2={y - 8} strokeWidth="1.5" className="stroke-current text-emerald-600" /><circle cx={n.x + 22} cy={y - 10} r="5" className="fill-current text-rose-400" /></g>
              ))}
            </g>
          )}
          {idx === 1 && (
            <g>
              <line x1={n.x} y1="200" x2={n.x} y2="96" strokeWidth="3" className="stroke-current text-emerald-700" />
              {[100, 128, 156, 184].map((y) => (
                <circle key={y} cx={n.x} cy={y} r="5" className="fill-current text-rose-400" />
              ))}
            </g>
          )}
          {idx === 2 && (
            <g>
              <line x1={n.x} y1="200" x2={n.x} y2="150" strokeWidth="3" className="stroke-current text-emerald-700" />
              {[[n.x - 40, 110], [n.x - 14, 96], [n.x + 14, 96], [n.x + 40, 110]].map(([x, y], i) => (
                <g key={i}><line x1={n.x} y1="150" x2={x} y2={y + 8} strokeWidth="1.5" className="stroke-current text-emerald-600" /><circle cx={x} cy={y} r="5" className="fill-current text-rose-400" /></g>
              ))}
            </g>
          )}
          {idx === 3 && (
            <g>
              <line x1={n.x} y1="200" x2={n.x} y2="160" strokeWidth="3" className="stroke-current text-emerald-700" />
              <circle cx={n.x} cy="140" r="22" className="fill-current text-rose-400/70" />
              {[[n.x - 12, 132], [n.x + 8, 130], [n.x - 4, 146], [n.x + 12, 148], [n.x, 124]].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="4" className="fill-current text-amber-400" />
              ))}
            </g>
          )}
          <text x={n.x} y="234" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
        </g>
      ))}
      <text x="16" y="252" fontSize="10" className="fill-current text-muted-foreground">Why pack flowers? Grouped flowers are more visible to pollinators and pollinate in one visit — economy by architecture.</text>
    </svg>
  );
}
