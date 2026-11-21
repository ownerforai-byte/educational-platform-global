/** Biological method of investigation — eight-step cycle. Theme-aware. */
export function BiologicalMethodCycle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Biological method of investigation eight steps observation question hypothesis prediction experiment data analysis conclusion and publication with the sal leaf fall example">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The biological method — eight steps</text>
      {[
        { y: 50, n: "1", t: "OBSERVATION", s: "sal trees shed leaves in the dry season" },
        { y: 76, n: "2", t: "QUESTION", s: "does water stress trigger leaf fall?" },
        { y: 102, n: "3", t: "HYPOTHESIS", s: "sal sheds leaves to reduce water loss when soil moisture falls" },
        { y: 128, n: "4", t: "PREDICTION (deduction)", s: "if watered regularly, sal trees should retain leaves" },
        { y: 154, n: "5", t: "EXPERIMENT", s: "watered (control) vs unwatered (experimental); measure leaf retention" },
        { y: 180, n: "6", t: "DATA ANALYSIS", s: "compare % leaf retention between groups" },
        { y: 206, n: "7", t: "CONCLUSION", s: "watered trees retain leaves — hypothesis supported" },
        { y: 232, n: "8", t: "PUBLICATION / VERIFICATION", s: "report methods and results so others can repeat" },
      ].map((r) => (
        <g key={r.n}>
          <circle cx="40" cy={r.y} r="11" className="fill-current text-sky-500/30" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
          <text x="40" y={r.y + 3.5} fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{r.n}</text>
          <text x="60" y={r.y - 1} fontSize="7.6" className="fill-current text-foreground" fontWeight="700">{r.t}</text>
          <text x="60" y={r.y + 9} fontSize="7.2" className="fill-current text-muted-foreground">{r.s}</text>
        </g>
      ))}
    </svg>
  );
}
