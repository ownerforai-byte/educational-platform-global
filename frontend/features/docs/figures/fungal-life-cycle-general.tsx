/** General fungal life cycle — haploid dominant with dikaryon. Well-detailed. Theme-aware. */
export function FungalLifeCycleGeneral({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="General fungal life cycle spore germination mycelium plasmogamy dikaryon karyogamy meiosis spore formation haploid dominant cycle with n and 2n stages labelled">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">General fungal life cycle — haploid-dominant</text>

      {/* ring steps */}
      {[
        { x: 120, y: 80, t: "1. spore lands", s: "n" },
        { x: 360, y: 70, t: "2. germinates → mycelium", s: "n hyphae" },
        { x: 590, y: 90, t: "3. plasmogamy (+ × −)", s: "n + n" },
        { x: 590, y: 210, t: "4. dikaryon grows", s: "n + n" },
        { x: 360, y: 235, t: "5. karyogamy (fusion)", s: "2n — brief!" },
        { x: 120, y: 215, t: "6. meiosis → new spores", s: "n" },
      ].map((p) => (
        <g key={p.t}>
          <circle cx={p.x} cy={p.y} r="34" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
          <text x={p.x} y={p.y - 4} fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{p.t}</text>
          <text x={p.x} y={p.y + 12} fontSize="7" textAnchor="middle" className="fill-current text-violet-600" fontWeight="800">{p.s}</text>
        </g>
      ))}
      <path d="M154 80 L326 72 M394 74 L556 88 M590 124 L590 176 M556 214 L394 232 M326 234 L154 216 M86 212 L120 114" strokeWidth="2" className="stroke-current text-muted-foreground" markerEnd="url(#arrflc)" />
      <defs><marker id="arrflc" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" className="fill-current text-muted-foreground" /></marker></defs>

      <rect x="30" y="252" width="660" height="38" rx="10" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="50" y="268" fontSize="7.8" className="fill-current text-foreground" fontWeight="700">Key contrast with animals/plants: the multicellular body is haploid (n); the diploid (2n) stage is a single cell that soon meioses.</text>
      <text x="50" y="284" fontSize="7.4" className="fill-current text-muted-foreground">Plasmogamy (cytoplasm fuses) precedes karyogamy (nuclei fuse) — often by hours, sometimes by generations.</text>
    </svg>
  );
}
