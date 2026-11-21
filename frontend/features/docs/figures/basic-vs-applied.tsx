/** Basic vs applied research comparison. Theme-aware. */
export function BasicVsApplied({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Basic pure research versus applied research compared on aim driver outcome examples and relationship with examples of DNA replication lac operon insulin production and Bt cotton">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Basic vs applied research</text>
      {[
        { y: 52, row: "Aim", b: "expand knowledge — answer how/why for its own sake", a: "solve a specific practical problem" },
        { y: 82, row: "Driver", b: "curiosity", a: "need" },
        { y: 112, row: "Outcome", b: "theories, principles, mechanisms", a: "products, techniques, policies" },
        { y: 142, row: "Examples", b: "how DNA replicates; how the lac operon works", a: "insulin production in E. coli; Bt cotton; a malaria vaccine" },
        { y: 172, row: "Relationship", b: "feeds applied research", a: "depends on basic research's foundations" },
      ].map((r) => (
        <g key={r.row}>
          <rect x="24" y={r.y - 13} width="612" height="26" rx="7" className="fill-current text-violet-500/8" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
          <text x="36" y={r.y + 4} fontSize="7.8" className="fill-current text-foreground" fontWeight="800">{r.row}</text>
          <text x="140" y={r.y + 4} fontSize="7.4" className="fill-current text-muted-foreground">{r.b}</text>
          <text x="420" y={r.y + 4} fontSize="7.4" className="fill-current text-muted-foreground">{r.a}</text>
        </g>
      ))}
      <text x="16" y="206" fontSize="9" className="fill-current text-muted-foreground">Basic research builds the principles; applied research cashes them in — neither substitutes for the other.</text>
      <text x="16" y="224" fontSize="9" className="fill-current text-muted-foreground">Exam hook: name two examples of each, and state which feeds which.</text>
    </svg>
  );
}
