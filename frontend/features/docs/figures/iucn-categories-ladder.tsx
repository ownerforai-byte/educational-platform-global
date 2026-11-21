/** IUCN Red List categories severity ladder. Theme-aware. */
export function IucnCategoriesLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="IUCN Red List categories in decreasing severity EX extinct EW extinct in the wild CR critically endangered EN endangered VU vulnerable NT near threatened LC least concern DD data deficient NE not evaluated">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The Red List ladder — risk of extinction, highest first</text>
      {[
        { y: 48, c: "rgb(0 0 0 / 0.55)", t: "EX — Extinct", s: "no reasonable doubt the last individual has died; no surveys can find it" },
        { y: 74, c: "rgb(120 53 15 / 0.9)", t: "EW — Extinct in the Wild", s: "survives only in captivity or cultivation; no natural population" },
        { y: 100, c: "rgb(220 38 38 / 0.9)", t: "CR — Critically Endangered", s: "extremely high risk; e.g. population < 50 mature individuals or rapid decline" },
        { y: 126, c: "rgb(234 88 12 / 0.9)", t: "EN — Endangered", s: "very high risk; smaller populations or steeper declines than CR threshold" },
        { y: 152, c: "rgb(202 138 4 / 0.9)", t: "VU — Vulnerable", s: "high risk; larger populations than EN but still threatened" },
        { y: 178, c: "rgb(101 163 13 / 0.9)", t: "NT — Near Threatened", s: "close to qualifying for a threatened category" },
        { y: 204, c: "rgb(22 163 74 / 0.9)", t: "LC — Least Concern", s: "widespread and abundant; lowest risk" },
        { y: 230, c: "rgb(100 116 139 / 0.9)", t: "DD — Data Deficient · NE — Not Evaluated", s: "insufficient information; not yet assessed against the criteria" },
      ].map((r) => (
        <g key={r.t}>
          <rect x="24" y={r.y - 11} width="612" height="22" rx="6" style={{ color: r.c }} className="fill-current opacity-15" stroke="currentColor" strokeWidth="1.5" />
          <text x="36" y={r.y + 4} fontSize="7.8" className="fill-current text-foreground" fontWeight="800">{r.t}</text>
          <text x="290" y={r.y + 4} fontSize="7.2" className="fill-current text-muted-foreground">{r.s}</text>
        </g>
      ))}
      <text x="16" y="254" fontSize="9" className="fill-current text-muted-foreground">Threatened = CR + EN + VU collectively — not a single category.</text>
    </svg>
  );
}
