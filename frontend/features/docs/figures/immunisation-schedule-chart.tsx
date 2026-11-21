/** Immunisation schedule chart — the vaccine timeline. Well-detailed. Theme-aware. */
export function ImmunisationScheduleChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Immunisation schedule chart BCG birth hepatitis DPT measles polio booster Nepal national programme timeline doses age herd immunity smallpox eradication success">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Immunisation — the schedule as a timeline</text>
      {/* timeline */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <line x1="70" y1="110" x2="650" y2="110" className="stroke-current" strokeWidth="3" style={{ color: "rgb(2 132 199 / 0.5)" }} />
      {[
        ["Birth", "BCG + OPV-0", 110],
        ["6 wks", "DPT-1, OPV-1, Hep-B1", 200],
        ["9 mo", "measles-1", 330],
        ["12 mo", "MR-2 / boosters", 430],
        ["5 yrs", "DPT booster", 560],
      ].map(([age, vac, x], i) => (
        <g key={age as string}>
          <circle cx={x as number} cy="110" r="6" className="fill-current" style={{ color: "rgb(16 185 129 / 0.8)" }} />
          <text x={x as number} y={i % 2 === 0 ? 92 : 140} fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{age as string}</text>
          <text x={x as number} y={i % 2 === 0 ? 104 : 152} fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{vac as string}</text>
        </g>
      ))}
      <text x="360" y="190" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">multiple doses build memory: each booster raises and steadies the antibody level</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Vaccines teach immunity without disease: live-attenuated, killed, or toxoid — three routes to the same memory.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Smallpox (1980) and near-eradicated polio prove herd immunity works when coverage stays high.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: BCG at birth, DPT series from 6 weeks, measles at 9 months — Nepal's national schedule spine.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Herd immunity protects the unvaccinated — but only above the threshold coverage for each disease.</text>
    </svg>
  );
}
