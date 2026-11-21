/** Environmental impact assessment steps — the EIA pipeline. Well-detailed. Theme-aware. */
export function EnvironmentalImpactAssessmentSteps({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Environmental impact assessment steps EIA pipeline screening scoping baseline study impact prediction mitigation public hearing alternatives analysis environmental management plan monitoring auditing decision approval Nepal IEE threshold project types hydropower road mining sectors stages order conditions conditions compliance post monitoring gap">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">EIA — the pipeline from proposal to monitoring</text>
      {/* steps */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["1. Screening", "does the project need IEE or full EIA? (size/type rules)", 130],
        ["2. Scoping", "which impacts matter? set the study's terms", 250],
        ["3. Baseline + prediction", "measure the existing environment; forecast changes", 370],
        ["4. Mitigation + alternatives", "avoid, reduce, restore, offset; compare options", 490],
        ["5. Decision + EMP", "approve with conditions; the EMP is the contract", 610],
      ].map(([name, detail, x], i) => {
        const y = 90 + (i % 2) * 70;
        const col = Math.floor(i / 2);
        const xx = 110 + col * 180;
        const yy = i === 4 ? 90 : y;
        void xx; void yy;
        return (
          <g key={name as string}>
            <rect x={(x as number) - 62} y="70" width="124" height="100" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
            <text x={x as number} y="92" fontSize="6.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
            <text x={x as number} y="112" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 28)}</text>
            <text x={x as number} y="126" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(28, 56)}</text>
            {i < 4 && <path d={`M${(x as number) + 64} 118 h${((x as number) + 120) - (x as number) - 64 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.9)" }} />}
          </g>
        );
      })}
      <text x="360" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">public hearing sits inside the process — affected people must see and contest the prediction</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Nepal's thresholds: schedules in the EPA rules set which projects need IEE (small) versus EIA (large) — a hydropower dam and a rural road sit at different rungs.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: five steps in order + the EMP as the enforceable output — name them in sequence for full marks.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The common failure: excellent reports, no monitoring — the pipeline ends with the audit, not the approval.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">EIA's promise is prediction before construction — its practice is only as honest as the monitoring behind it.</text>
    </svg>
  );
}
