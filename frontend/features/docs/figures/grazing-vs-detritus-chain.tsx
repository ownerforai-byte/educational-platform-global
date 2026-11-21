/**
 * Grazing vs detritus food chain — two energy highways compared.
 * Theme-aware via currentColor.
 */
export function GrazingVsDetritusChain({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Grazing food chain from grass to hawk compared with detritus food chain from dead leaves through decomposers to earthworms and beetles">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Two food chains — fresh leaves vs dead leaves</text>

      {/* grazing */}
      <text x="16" y="58" fontSize="11.5" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="800">GRAZING chain — starts with living plants</text>
      {[
        { x: 70, t: "Grass", s: "producer", c: "rgb(22 163 74 / 0.9)" },
        { x: 210, t: "Grasshopper", s: "herbivore (1°)", c: "rgb(14 165 233 / 0.9)" },
        { x: 350, t: "Frog", s: "carnivore (2°)", c: "rgb(245 158 11 / 0.9)" },
        { x: 490, t: "Snake", s: "carnivore (3°)", c: "rgb(244 63 94 / 0.9)" },
        { x: 600, t: "Hawk", s: "top (4°)", c: "rgb(124 58 237 / 0.9)" },
      ].map((n, i) => (
        <g key={n.t}>
          <rect x={n.x - 40} y="72" width="80" height="34" rx="9" style={{ color: n.c }} className="fill-current opacity-12" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="88" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="101" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          {i < 4 && <line x1={n.x + 42} y1="89" x2={n.x + 98} y2="89" strokeWidth="2.5" className="stroke-current text-foreground" />}
        </g>
      ))}
      <text x="70" y="126" fontSize="8.5" className="fill-current text-muted-foreground">trophic levels: T1 → T2 → T3 → T4 → T5</text>

      {/* detritus */}
      <text x="16" y="168" fontSize="11.5" className="fill-current text-amber-700 dark:text-amber-300" fontWeight="800">DETRITUS chain — starts with dead matter</text>
      {[
        { x: 70, t: "Dead leaves", s: "detritus", c: "rgb(120 113 108 / 0.9)" },
        { x: 230, t: "Decomposer", s: "bacteria, fungi", c: "rgb(124 58 237 / 0.9)" },
        { x: 390, t: "Earthworm", s: "detritivore", c: "rgb(217 119 6 / 0.9)" },
        { x: 550, t: "Beetle / bird", s: "predator", c: "rgb(244 63 94 / 0.9)" },
      ].map((n, i) => (
        <g key={n.t}>
          <rect x={n.x - 42} y="182" width="84" height="34" rx="9" style={{ color: n.c }} className="fill-current opacity-12" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="198" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="211" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          {i < 3 && <line x1={n.x + 44} y1="199" x2={n.x + 116} y2="199" strokeWidth="2.5" className="stroke-current text-foreground" />}
        </g>
      ))}

      <text x="16" y="252" fontSize="10" className="fill-current text-muted-foreground">In forests the detritus chain dominates (most energy sits in litter, not leaves); in open water the grazing chain rules (algae are eaten alive).</text>
      <text x="16" y="272" fontSize="10" className="fill-current text-muted-foreground">Both chains interconnect into a food web — no chain runs in isolation.</text>
      <text x="16" y="290" fontSize="10" className="fill-current text-muted-foreground">Exam hook: why are chains limited to 4–5 levels? — the 10% energy law starves higher levels.</text>
    </svg>
  );
}
