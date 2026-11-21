/** Pine pollination & seed formation — pollen wing, ovule, archegonia, seed. Theme-aware. */
export function PinePollinationSeed({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Pine pollination winged pollen grain reaching ovule through micropyle pollen tube archegonia fertilisation and winged seed development over two years">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">From pollen grain to winged seed</text>

      {[
        { x: 80, t: "POLLEN GRAIN", s: "two wings (air sacs)\nfor wind travel", c: "rgb(245 158 11 / 0.9)" },
        { x: 250, t: "OVULE", s: "naked, on scale;\npollen lands at micropyle", c: "rgb(14 165 233 / 0.9)" },
        { x: 420, t: "Pollen tube → egg", s: "male gametes reach\narchegonia (no water!)", c: "rgb(124 58 237 / 0.9)" },
        { x: 580, t: "WINGED SEED", s: "embryo + food store\n+ wing for wind dispersal", c: "rgb(22 163 74 / 0.9)" },
      ].map((n, i) => (
        <g key={n.t}>
          <rect x={n.x - 62} y="70" width="124" height="66" rx="12" style={{ color: n.c }} className="fill-current opacity-12" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="92" fontSize="8.3" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          {n.s.split('\n').map((line, j) => (
            <text key={j} x={n.x} y={108 + j * 13} fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{line}</text>
          ))}
          {i < 3 && <line x1={n.x + 64} y1="103" x2={n.x + 92} y2="103" strokeWidth="2.5" className="stroke-current text-foreground" />}
        </g>
      ))}

      {/* pollen grain drawing */}
      <g>
        <circle cx="80" cy="180" r="12" className="fill-current text-amber-500/50" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        <ellipse cx="64" cy="180" rx="8" ry="5" className="fill-current text-amber-500/30" />
        <ellipse cx="96" cy="180" rx="8" ry="5" className="fill-current text-amber-500/30" />
        <text x="80" y="212" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">wings = buoyancy in air</text>
      </g>

      {/* seed drawing */}
      <g>
        <ellipse cx="580" cy="186" rx="16" ry="10" className="fill-current text-stone-600/60" />
        <path d="M596 186 q24 -8 44 0 q-20 8 -44 0 Z" className="fill-current text-sky-500/40" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <text x="580" y="216" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">seed + papery wing</text>
      </g>

      <text x="16" y="244" fontSize="10" className="fill-current text-muted-foreground">Fertilisation to ripe seed takes ~2 years in Pinus — pollination in spring of year one, seed release in autumn of year two.</text>
    </svg>
  );
}
