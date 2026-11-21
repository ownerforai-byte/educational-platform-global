/** Smoking cessation steps — the quitting pathway. Well-detailed. Theme-aware. */
export function SmokingCessationSteps({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Smoking cessation steps quitting pathway nicotine replacement therapy patches gum counselling set quit date triggers withdrawal coping relapse stages precontemplation action maintenance health benefits timeline 20 minutes 1 year risk">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Quitting smoking — a pathway, not a willpower test</text>
      {/* pathway */}
      <rect x="30" y="44" width="660" height="150" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {[
        ["Decide", "set a quit date; list your triggers", 130],
        ["Prepare", "nicotine replacement (patch, gum) or prescription aid", 300],
        ["Quit day", "remove all cigarettes; change routines", 470],
        ["Maintain", "counselling, support lines, relapse plan", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(16 185 129 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">most successful quitters needed several attempts — relapse is part of the pathway, not the end of it</text>
      {/* recovery timeline */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["20 min", "heart rate and blood pressure drop"],
        ["2–12 wks", "circulation and lung function improve"],
        ["1 yr", "heart disease risk halves"],
        ["10–15 yrs", "cancer and stroke risk near a never-smoker's"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="46" y={232 + i * 16} fontSize="6.6" className="fill-current text-sky-600" fontWeight="700">{k}</text>
          <text x="120" y={232 + i * 16} fontSize="6.4" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: the recovery timeline starts at 20 minutes — quote it to show quitting pays immediately.</text>
    </svg>
  );
}
