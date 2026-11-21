/** Major branches of biology with example problems. Theme-aware. */
export function BranchesOfBiology({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Major branches of biology botany zoology microbiology ecology and genetics each with the problem it studies">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Major branches of biology and the problems they study</text>
      {[
        { y: 50, t: "BOTANY", s: "studies plants — e.g. why sal forests fail to regenerate under heavy lopping" },
        { y: 78, t: "ZOOLOGY", s: "studies animals — e.g. how tiger density responds to prey availability" },
        { y: 106, t: "MICROBIOLOGY", s: "studies microorganisms — e.g. how Lactobacillus sours milk into curd" },
        { y: 134, t: "ECOLOGY", s: "studies organism–environment relations — e.g. why eutrophication kills lake fish" },
        { y: 162, t: "GENETICS", s: "studies heredity and variation — e.g. how haemophilia passes from carrier mothers to sons" },
      ].map((r) => (
        <g key={r.t}>
          <rect x="24" y={r.y - 13} width="612" height="26" rx="7" className="fill-current text-violet-500/8" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
          <text x="36" y={r.y + 4} fontSize="7.8" className="fill-current text-foreground" fontWeight="800">{r.t}</text>
          <text x="150" y={r.y + 4} fontSize="7.4" className="fill-current text-muted-foreground">{r.s}</text>
        </g>
      ))}
      <text x="16" y="196" fontSize="9" className="fill-current text-muted-foreground">The five NEB branches each pair a subject with a concrete problem — the problem, not the label, is what the branch studies.</text>
      <text x="16" y="214" fontSize="9" className="fill-current text-muted-foreground">Specialist branches (ornithology, entomology, mycology) narrow further — e.g. migration routes of demoiselle cranes.</text>
    </svg>
  );
}
