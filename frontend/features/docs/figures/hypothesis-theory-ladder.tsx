/** Hypothesis to theory ladder — how ideas earn trust. Well-detailed. Theme-aware. */
export function HypothesisTheoryLadder({ className }: { className?: string }) {
  const rungs: [string, string, string][] = [
    ["Observation", "a fact noticed in nature", "leaves fall in the dry season"],
    ["Hypothesis", "a testable proposed explanation", "water stress triggers leaf fall"],
    ["Prediction", "what must happen if it is true", "watered trees keep leaves longer"],
    ["Experiment + data", "the prediction is tested honestly", "watered vs control plots compared"],
    ["Theory", "a hypothesis confirmed repeatedly", "the explanation now carries weight"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Hypothesis theory ladder observation prediction experiment data theory scientific knowledge progression principle falsifiable">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">How an idea earns the title 'theory'</text>
      {rungs.map(([name, detail, ex], i) => {
        const y = 48 + i * 44;
        const w = 220 + i * 100;
        return (
          <g key={name}>
            <rect x="40" y={y} width={w} height="36" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: `rgb(14 165 233 / ${0.7 + i * 0.06})` }} />
            <text x="54" y={y + 16} fontSize="7.8" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x="54" y={y + 29} fontSize="6.8" className="fill-current text-muted-foreground">{detail}</text>
            <text x={56 + w} y={y + 23} fontSize="6.8" className="fill-current text-sky-600">{ex}</text>
          </g>
        );
      })}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">A theory stays a theory only while every new test leaves it standing — one honest failure demotes it.</text>
    </svg>
  );
}
