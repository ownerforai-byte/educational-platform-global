/** Diabetes types contrast — type 1 vs type 2 mechanisms. Well-detailed. Theme-aware. */
export function DiabetesTypesContrast({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Diabetes types contrast type 1 autoimmune insulin deficiency juvenile versus type 2 insulin resistance lifestyle obesity onset age treatment insulin injections oral metformin symptoms polyuria polydipsia weight loss comparison table Nepal prevalence rising">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Diabetes — two diseases, one sugar problem</text>
      {/* table */}
      <rect x="30" y="40" width="150" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="105" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FEATURE</text>
      <rect x="180" y="40" width="260" height="26" rx="6" className="fill-current text-sky-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="310" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TYPE 1</text>
      <rect x="440" y="40" width="250" height="26" rx="6" className="fill-current text-amber-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="565" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TYPE 2</text>
      {[
        ["Cause", "autoimmune β-cell destruction", "insulin resistance + relative deficiency"],
        ["Onset", "childhood/teen, sudden", "adult, gradual (now also in teens)"],
        ["Body habitus", "often lean", "usually overweight"],
        ["Treatment", "insulin injections for life", "diet, exercise, oral drugs; insulin later"],
        ["Share of cases", "~5–10%", "~90–95%"],
      ].map(([feat, t1, t2], i) => {
        const y = 74 + i * 30;
        return (
          <g key={feat}>
            <text x="46" y={y + 10} fontSize="6.6" className="fill-current text-foreground" fontWeight="700">{feat}</text>
            <text x="194" y={y + 10} fontSize="6.2" className="fill-current text-muted-foreground">{t1}</text>
            <text x="454" y={y + 10} fontSize="6.2" className="fill-current text-muted-foreground">{t2}</text>
          </g>
        );
      })}
      <rect x="30" y="228" width="660" height="64" rx="10" className="fill-current text-rose-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="248" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The shared danger: chronically high glucose damages vessels — eyes (retinopathy), kidneys, nerves, heart. Complications, not sugar, do the killing.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: type 1 = no insulin; type 2 = insulin ignored. Symptoms: polyuria, polydipsia, weight loss — the three classics.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Nepal's type 2 numbers are climbing with urban diets and sedentary work — a lifestyle epidemic in motion.</text>
    </svg>
  );
}
