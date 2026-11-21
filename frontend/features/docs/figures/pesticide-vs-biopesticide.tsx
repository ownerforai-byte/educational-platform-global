/** Pesticide vs biopesticide compare — two philosophies. Well-detailed. Theme-aware. */
export function PesticideVsBiopesticide({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Pesticide versus biopesticide comparison chemical broad spectrum fast residue neem azadirachtin Bt baculovirus pheromone traps narrow target slow biodegradable IPM component shelf life">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Chemical vs biopesticide — two philosophies compared</text>
      {/* table */}
      <rect x="30" y="40" width="150" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="105" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FEATURE</text>
      <rect x="180" y="40" width="260" height="26" rx="6" className="fill-current text-rose-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="310" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CHEMICAL PESTICIDE</text>
      <rect x="440" y="40" width="250" height="26" rx="6" className="fill-current text-emerald-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="565" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BIOPESTICIDE</text>
      {[
        ["Examples", "malathion, carbaryl, 2,4-D", "neem (azadirachtin), Bt, pheromones"],
        ["Spectrum", "broad — hits friends as well as foes", "narrow — specific to target pest"],
        ["Speed", "fast knockdown", "slower; often must be ingested"],
        ["Residue", "days to years", "breaks down quickly"],
        ["Resistance", "high risk under repeated use", "lower, but not zero"],
        ["Role in IPM", "last-resort tool", "early-line component"],
      ].map(([feat, chem, bio], i) => {
        const y = 74 + i * 30;
        return (
          <g key={feat}>
            <text x="46" y={y + 10} fontSize="6.6" className="fill-current text-foreground" fontWeight="700">{feat}</text>
            <text x="194" y={y + 10} fontSize="6.2" className="fill-current text-muted-foreground">{chem}</text>
            <text x="454" y={y + 10} fontSize="6.2" className="fill-current text-muted-foreground">{bio}</text>
          </g>
        );
      })}
      <rect x="30" y="258" width="660" height="34" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="272" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Neem is the flagship: one tree, dozens of compounds, a dozen pests — and it breaks down in days.</text>
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: biopesticides trade speed for specificity and safety — the IPM trade-off in one table.</text>
    </svg>
  );
}
