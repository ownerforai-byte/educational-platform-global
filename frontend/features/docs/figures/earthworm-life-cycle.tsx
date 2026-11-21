/** Earthworm life cycle — cocoon to juvenile to adult without larval stage. Theme-aware. */
export function EarthwormLifeCycle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Earthworm life cycle from fertilised eggs in cocoon through juvenile worm to sexually mature adult with clitellum direct development no larva">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Life cycle — direct development, no larva</text>

      {[
        { x: 80, t: "COCOON", s: "eggs + stored sperm;\n2–4 embryos inside", c: "rgb(245 158 11 / 0.9)" },
        { x: 250, t: "JUVENILE WORM", s: "hatches in 2–3 weeks;\nno clitellum yet", c: "rgb(16 185 129 / 0.9)" },
        { x: 430, t: "GROWING WORM", s: "segments added;\nfeeds on soil humus", c: "rgb(14 165 233 / 0.9)" },
        { x: 590, t: "ADULT", s: "clitellum appears;\nsexually mature", c: "rgb(124 58 237 / 0.9)" },
      ].map((n, i) => (
        <g key={n.t}>
          <rect x={n.x - 62} y="76" width="124" height="74" rx="12" style={{ color: n.c }} className="fill-current opacity-12" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="100" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="118" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{n.s.split('\n')[0]}</text>
          <text x={n.x} y="132" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{n.s.split('\n')[1]}</text>
          {i < 3 && <line x1={n.x + 64} y1="113" x2={n.x + 94} y2="113" strokeWidth="2.5" className="stroke-current text-foreground" />}
        </g>
      ))}

      {/* cycle back arrow */}
      <path d="M590 160 Q330 230 80 160" fill="none" strokeWidth="2.5" strokeDasharray="6 4" className="stroke-current text-muted-foreground" />
      <text x="330" y="222" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">adults mate → new cocoons → cycle repeats (lifespan ~1–2 years)</text>

      <text x="16" y="206" fontSize="10" className="fill-current text-muted-foreground">Direct development: the hatchling is a miniature worm — no tadpole-like larval stage (contrast with the frog).</text>
    </svg>
  );
}
