/** Frog development stages — cleavage, blastula, gastrula, neurula. Theme-aware. */
export function FrogDevelopmentStages({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Frog early development stages from zygote to cleavage morula blastula gastrula with germ layers to neurula">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">From zygote to neurula — the embryo builds itself</text>

      {[
        { x: 70, t: "Zygote", s: "2n, pigmented pole" },
        { x: 190, t: "Cleavage", s: "rapid divisions, no growth" },
        { x: 310, t: "Blastula", s: "hollow ball of cells" },
        { x: 430, t: "Gastrula", s: "3 germ layers form" },
        { x: 560, t: "Neurula", s: "nerve cord + notochord" },
      ].map((st, i) => (
        <g key={st.t}>
          <rect x={st.x - 48} y="70" width="96" height="76" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
          <text x={st.x} y="100" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{st.t}</text>
          <text x={st.x} y="118" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{st.s}</text>
          {i < 4 && <line x1={st.x + 50} y1="108" x2={st.x + 70} y2="108" strokeWidth="2.5" className="stroke-current text-foreground" />}
        </g>
      ))}

      {/* germ layer fate table */}
      <g>
        <rect x="40" y="170" width="580" height="70" rx="10" className="fill-current text-violet-500/8" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
        <text x="56" y="192" fontSize="9" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="800">ECTODERM → skin, nervous system</text>
        <text x="56" y="212" fontSize="9" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">MESODERM → muscles, blood, skeleton, gonads</text>
        <text x="56" y="232" fontSize="9" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="800">ENDODERM → gut lining, liver, lungs, pancreas</text>
      </g>
    </svg>
  );
}
