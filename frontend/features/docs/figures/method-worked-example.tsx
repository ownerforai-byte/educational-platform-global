/** Worked example — sal leaf fall experiment. Theme-aware. */
export function MethodWorkedExample({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Worked method example sal leaf fall in winter from observation through water stress question hypothesis prediction experiment to leaf retention conclusion">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Worked example — why do sal leaves fall in winter?</text>
      {[
        { y: 52, n: "1", t: "OBSERVATION", s: "sal trees shed leaves in the dry season" },
        { y: 76, n: "2", t: "QUESTION", s: "does water stress trigger leaf fall?" },
        { y: 100, n: "3", t: "HYPOTHESIS", s: "sal sheds leaves to reduce water loss when soil moisture falls" },
        { y: 124, n: "4", t: "PREDICTION", s: "if watered regularly, sal trees should retain leaves" },
        { y: 148, n: "5", t: "EXPERIMENT", s: "watered (control) vs unwatered (experimental); measure leaf retention" },
        { y: 172, n: "6", t: "ANALYSIS", s: "compare % leaf retention between groups" },
        { y: 196, n: "7", t: "CONCLUSION", s: "watered trees retain leaves — hypothesis supported" },
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
