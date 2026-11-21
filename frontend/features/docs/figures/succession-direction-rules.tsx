/** Succession vs static — why communities change direction. Well-detailed. Theme-aware. */
export function SuccessionDirectionRules({ className }: { className?: string }) {
  const trends: [string, string][] = [
    ["Biomass", "rises steadily to the climax"],
    ["Species diversity", "rises as new niches open"],
    ["Soil depth + moisture", "increase at every stage"],
    ["Food webs", "lengthen — more trophic levels"],
    ["Stability", "climax resists shocks best"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Succession direction rules biomass diversity soil food web stability trends xerarch hydrarch primary secondary sere definition">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Succession has a direction — five trends</text>
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT ALWAYS RISES</text>
      {trends.map(([name, detail], i) => (
        <g key={name}>
          <text x="50" y={94 + i * 32} fontSize="7.6" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
          <text x="64" y={108 + i * 32} fontSize="7" className="fill-current text-muted-foreground">{detail}</text>
          <path d={`M300 ${100 + i * 32} l10 -6 v12`} className="fill-current text-emerald-600" />
        </g>
      ))}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TWO STARTING POINTS</text>
      <text x="406" y="94" fontSize="7.6" className="fill-current text-sky-600" fontWeight="700">Primary (xerarch/hydrarch)</text>
      {["bare rock or open water —", "no soil, no seed bank,", "takes centuries"].map((t, i) => (
        <text key={t} x="406" y={112 + i * 15} fontSize="7" className="fill-current text-muted-foreground">{i === 0 ? t : "  " + t}</text>
      ))}
      <text x="406" y="180" fontSize="7.6" className="fill-current text-emerald-600" fontWeight="700">Secondary</text>
      {["after fire, flood or logging —", "soil and seeds survive,", "recovery is far faster"].map((t, i) => (
        <text key={t} x="406" y={198 + i * 15} fontSize="7" className="fill-current text-muted-foreground">{i === 0 ? t : "  " + t}</text>
      ))}
      <text x="406" y="256" fontSize="7" className="fill-current text-muted-foreground">Exam hook: the sere is the whole</text>
      <text x="406" y="270" fontSize="7" className="fill-current text-muted-foreground">sequence; each step is a seral stage.</text>
    </svg>
  );
}
