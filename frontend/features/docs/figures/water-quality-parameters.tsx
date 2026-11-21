/** Water quality parameters — the tester's toolkit. Well-detailed. Theme-aware. */
export function WaterQualityParameters({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Water quality parameters dissolved oxygen BOD pH turbidity coliform bacteria hardness nitrates testing kit drinking standard river health indicators clean polluted values">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Water quality — six numbers that judge a river</text>
      {/* parameter table */}
      <rect x="30" y="40" width="150" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="105" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PARAMETER</text>
      <rect x="180" y="40" width="250" height="26" rx="6" className="fill-current text-sky-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="305" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT IT TELLS YOU</text>
      <rect x="440" y="40" width="250" height="26" rx="6" className="fill-current text-emerald-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="565" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CLEAN vs POLLUTED</text>
      {[
        ["Dissolved O₂", "can fish breathe here?", "high vs near zero"],
        ["BOD", "how much waste must decay?", "low vs very high"],
        ["pH", "acid stress?", "~6.5–8.5 vs below 5 or above 9"],
        ["Coliform count", "faecal contamination?", "0 vs hundreds per 100 ml"],
        ["Turbidity", "how cloudy is the light?", "clear vs muddy, silted"],
        ["Nitrates/phosphates", "fertiliser runoff?", "trace vs algal-bloom levels"],
      ].map(([p, t, v], i) => {
        const y = 74 + i * 30;
        return (
          <g key={p}>
            <text x="46" y={y + 10} fontSize="6.6" className="fill-current text-foreground" fontWeight="700">{p}</text>
            <text x="194" y={y + 10} fontSize="6.2" className="fill-current text-muted-foreground">{t}</text>
            <text x="454" y={y + 10} fontSize="6.2" className="fill-current text-muted-foreground">{v}</text>
          </g>
        );
      })}
      <rect x="30" y="252" width="660" height="40" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="268" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">BOD is the master variable: it integrates every organic pollutant into one measurable demand for oxygen.</text>
      <text x="360" y="284" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: match each parameter to its meaning — DO, BOD, coliforms, pH, turbidity, nutrients.</text>
    </svg>
  );
}
