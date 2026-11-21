/** Neanderthal profile — the close cousin. Well-detailed. Theme-aware. */
export function NeanderthalProfile({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Neanderthal profile stocky build heavy brow ridge large brain 1400 cc ice age Europe burial Mousterian tools cousin not ancestor">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Neanderthal man — the strong, cold-adapted cousin</text>
      {/* figure */}
      <circle cx="180" cy="96" r="22" className="fill-current text-stone-500/25" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <path d="M180 118 q-24 22 -20 60" className="stroke-current" strokeWidth="16" strokeLinecap="round" style={{ color: "rgb(120 113 108 / 0.6)" }} />
      <path d="M164 178 l-10 66 M196 178 l14 64" className="stroke-current" strokeWidth="7" strokeLinecap="round" style={{ color: "rgb(120 113 108 / 0.6)" }} />
      <path d="M158 136 l-30 36 M202 136 l32 34" className="stroke-current" strokeWidth="6" strokeLinecap="round" style={{ color: "rgb(120 113 108 / 0.6)" }} />
      <text x="180" y="272" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">short, stocky, barrel-chested — built for the cold</text>
      {/* facts */}
      <rect x="330" y="44" width="360" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="510" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FACT CARD</text>
      {[
        ["Age", "~130–40 thousand years"],
        ["Home", "Europe and western Asia, ice age"],
        ["Brain", "~1400 cc — as large as ours"],
        ["Face", "heavy brow ridge, no chin, big nose"],
        ["Culture", "Mousterian tools, cared for sick, buried dead"],
        ["Fate", "a side branch — not our direct ancestor"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="346" y={92 + i * 24} fontSize="7" className="fill-current text-sky-600" fontWeight="700">{k}</text>
          <text x="386" y={92 + i * 24} fontSize="7" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <rect x="30" y="258" width="280" height="36" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="170" y="274" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: big brain but NOT our ancestor —</text>
      <text x="170" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">a cousin line that went extinct.</text>
    </svg>
  );
}
