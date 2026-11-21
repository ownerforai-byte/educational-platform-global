/** Biomagnification DDT chain — concentration rises up trophic levels. Theme-aware. */
export function BiomagnificationDdt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Biomagnification of DDT concentration rising from water to plankton to small fish to large fish to fish eating birds causing eggshell thinning in bald eagle and osprey">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Biomagnification — DDT climbs the food chain</text>

      {[
        { x: 90, t: "WATER", s: "trace DDT", w: 16, c: "rgb(14 165 233 / 0.9)" },
        { x: 220, t: "PLANKTON", s: "absorbs DDT", w: 30, c: "rgb(132 204 22 / 0.9)" },
        { x: 350, t: "SMALL FISH", s: "eats many plankton", w: 48, c: "rgb(22 163 74 / 0.9)" },
        { x: 480, t: "LARGE FISH", s: "eats many small fish", w: 70, c: "rgb(245 158 11 / 0.9)" },
        { x: 610, t: "FISH-EATING BIRD", s: "top consumer", w: 100, c: "rgb(244 63 94 / 0.9)" },
      ].map((n, i) => (
        <g key={n.t}>
          <rect x={n.x - 58} y={150 - n.w / 2} width="116" height={n.w} rx="6" style={{ color: n.c }} className="fill-current opacity-30" stroke="currentColor" strokeWidth="2" />
          <text x={n.x} y="184" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="200" fontSize="6.9" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          {i < 4 && <path d={`M${n.x + 60} 150 h${68}`} markerEnd="url(#arrb2)" strokeWidth="2.5" className="stroke-current text-muted-foreground" />}
        </g>
      ))}
      <defs><marker id="arrb2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" className="fill-current text-muted-foreground" /></marker></defs>

      <rect x="40" y="212" width="580" height="30" rx="9" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="56" y="232" fontSize="8.6" className="fill-current text-foreground" fontWeight="700">End point: DDT thins eggshells — the classic bald eagle / osprey collapse. Each step up concentrates the poison.</text>
    </svg>
  );
}
