/** Mental health depression myths — facts versus stigma. Well-detailed. Theme-aware. */
export function MentalHealthDepressionMyths({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Mental health depression myths facts versus stigma weakness myth treatment works therapy medication combination recovery rates treatment gap Nepal psychiatrists shortage suicide prevention talking helps stigma disclosure family support workplace mental health day awareness">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Depression — myths versus what the evidence says</text>
      {/* myth vs fact */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["MYTH", "it's weakness — just be strong", "rgb(220 38 38)"],
        ["FACT", "it's an illness with biological, psychological and social roots", "rgb(22 163 74)"],
        ["MYTH", "talking about it makes it worse", "rgb(220 38 38)"],
        ["FACT", "talking helps — and is the first step to treatment", "rgb(22 163 74)"],
        ["MYTH", "treatment means lifelong drugs", "rgb(220 38 38)"],
        ["FACT", "therapy and (when needed) medication work; most recover or manage well", "rgb(22 163 74)"],
      ].map(([kind, text, rgb], i) => {
        const y = 74 + i * 22;
        return (
          <g key={i}>
            <rect x="50" y={y - 10} width="52" height="16" rx="4" className="fill-current" style={{ color: `${rgb as string} / 0.3` }} stroke="currentColor" strokeWidth="0.8" />
            <text x="76" y={y + 1} fontSize="5.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{kind as string}</text>
            <text x="112" y={y + 1} fontSize="6.4" className="fill-current text-muted-foreground">{text as string}</text>
          </g>
        );
      })}
      <text x="360" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">depression is common, treatable, and lethal when untreated — the treatment gap is the tragedy</text>
      {/* Nepal context */}
      <rect x="30" y="212" width="660" height="80" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="232" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Nepal's reality: a few hundred psychiatrists for 30 million people — most districts have none; task-sharing trains general workers to deliver basic care.</text>
      <text x="360" y="250" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: define depression as an illness, name two myths with their factual corrections — the balanced answer examiners want.</text>
      <text x="360" y="268" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Stigma's cost is measurable: people suffer silently for years before their first appointment.</text>
      <text x="360" y="284" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Asking 'are you okay?' is not a small gesture — for many, it is the first door.</text>
    </svg>
  );
}
