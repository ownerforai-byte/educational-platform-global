/** Drug addiction reward loop — how dependency forms. Well-detailed. Theme-aware. */
export function DrugAddictionRewardLoop({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Drug addiction reward loop dopamine dopamine reward circuit tolerance withdrawal dependence cycle brain adaptation peer pressure curiosity treatment counselling rehabilitation relapse prevention">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Addiction — the loop the brain builds against itself</text>
      {/* loop */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      {[
        ["Use", "drug floods the reward circuit with dopamine", 195],
        ["Tolerance", "same dose, smaller effect — dose climbs", 195],
      ].map(([name, detail, y], i) => (
        <g key={name as string}>
          <rect x="70" y={70 + i * 56} width="250" height="40" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
          <text x="88" y={90 + i * 56} fontSize="6.6" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x="150" y={90 + i * 56} fontSize="5.8" className="fill-current text-muted-foreground">{detail as string}</text>
        </g>
      ))}
      <path d="M320 90 q30 0 30 26 q0 20 -30 20" className="fill-none stroke-current" strokeWidth="2" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="195" y="216" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">dependence = tolerance + withdrawal — the body has rewired itself around the drug</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY TEENS ARE VULNERABLE</text>
      {[
        "the adolescent reward system is",
        "  extra sensitive — habits form",
        "  faster and stick harder",
        "entry is social: curiosity, peer",
        "  pressure, stress relief",
        "withdrawal drives use as much",
        "  as pleasure does",
        "recovery works: counselling,",
        "  family support, replacement",
        "  therapy, relapse planning",
        "relapse is a step in recovery,",
        "  not the end of it",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: tolerance → dependence → withdrawal — three terms in one causal chain.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Addiction is a brain circuit problem with a social entry point — prevention targets the entry, treatment the circuit.</text>
    </svg>
  );
}
