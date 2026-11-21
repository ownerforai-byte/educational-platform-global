/** Moss life cycle — protonema to gametophyte to sporophyte with alternation. Theme-aware. */
export function MossLifeCycle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Moss life cycle spore to protonema to leafy gametophyte with antheridium and archegonium to sporophyte capsule releasing spores alternation of generations">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Moss life cycle — alternation on display</text>

      {[
        { x: 70, t: "SPORE (n)", s: "released from capsule", c: "rgb(14 165 233 / 0.9)" },
        { x: 220, t: "PROTONEMA", s: "creeping green filament", c: "rgb(20 184 166 / 0.9)" },
        { x: 370, t: "GAMETOPHYTE (n)", s: "leafy shoot + sex organs", c: "rgb(22 163 74 / 0.9)" },
        { x: 520, t: "SPOROPHYTE (2n)", s: "seta + capsule on parent", c: "rgb(124 58 237 / 0.9)" },
      ].map((n, i) => (
        <g key={n.t}>
          <rect x={n.x - 60} y="70" width="120" height="66" rx="12" style={{ color: n.c }} className="fill-current opacity-12" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="94" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="112" fontSize="7.3" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          {i < 3 && <line x1={n.x + 62} y1="103" x2={n.x + 88} y2="103" strokeWidth="2.5" className="stroke-current text-foreground" />}
        </g>
      ))}

      {/* fertilisation note */}
      <path d="M370 140 q20 30 60 30" fill="none" strokeWidth="2" strokeDasharray="4 3" className="stroke-current text-rose-500" />
      <text x="380" y="188" fontSize="8.5" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">sperm must SWIM to the archegonium — water required</text>

      {/* return arrow */}
      <path d="M520 146 Q300 240 70 146" fill="none" strokeWidth="2.5" strokeDasharray="6 4" className="stroke-current text-muted-foreground" />
      <text x="300" y="246" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">meiosis in the capsule → haploid spores → cycle repeats</text>

      <text x="16" y="226" fontSize="10" className="fill-current text-muted-foreground">Gametophyte dominates (green leafy plant); the sporophyte is a dependent guest — the reverse of all higher plants.</text>
    </svg>
  );
}
