/** Drug abuse types chart — the pharmacological families. Well-detailed. Theme-aware. */
export function DrugAbuseTypesChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Drug abuse types chart depressants stimulants hallucinogens narcotics opioids alcohol barbiturates cannabis LSD cocaine amphetamine heroin effects classification examples table categories pharmacology social drugs">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Drugs of abuse — four families, four fingerprints</text>
      {/* table */}
      <rect x="30" y="40" width="150" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="105" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FAMILY</text>
      <rect x="180" y="40" width="250" height="26" rx="6" className="fill-current text-sky-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="305" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">EFFECT SIGNATURE</text>
      <rect x="440" y="40" width="250" height="26" rx="6" className="fill-current text-amber-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="565" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">EXAMPLES</text>
      {[
        ["Depressants", "slow the CNS: sedation, slowed reflexes", "alcohol, barbiturates, benzodiazepines"],
        ["Stimulants", "speed the CNS: alertness, appetite loss", "cocaine, amphetamines, nicotine"],
        ["Narcotics (opioids)", "pain relief + euphoria; respiratory depression", "morphine, heroin, codeine"],
        ["Hallucinogens", "distort perception and thought", "LSD, cannabis (mixed profile)"],
      ].map(([fam, eff, ex], i) => {
        const y = 74 + i * 34;
        return (
          <g key={fam}>
            <text x="46" y={y + 14} fontSize="6.4" className="fill-current text-foreground" fontWeight="700">{fam}</text>
            <text x="194" y={y + 8} fontSize="6.2" className="fill-current text-muted-foreground">{eff.slice(0, 42)}</text>
            <text x="194" y={y + 20} fontSize="6.2" className="fill-current text-muted-foreground">{eff.slice(42, 84)}</text>
            <text x="454" y={y + 8} fontSize="6.2" className="fill-current text-muted-foreground">{ex.slice(0, 42)}</text>
            <text x="454" y={y + 20} fontSize="6.2" className="fill-current text-muted-foreground">{ex.slice(42, 84)}</text>
          </g>
        );
      })}
      <rect x="30" y="218" width="660" height="74" rx="10" className="fill-current text-rose-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="238" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Overdose fingerprints matter for first aid: opioids stop breathing (naloxone reverses); depressants slow everything; stimulants overheat and seize.</text>
      <text x="360" y="256" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: classify a named drug into its family and give the signature effect — that's the standard question form.</text>
      <text x="360" y="274" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Cannabis sits awkwardly: mild hallucinogen with depressant traits — acknowledge the mixed profile.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Medical use exists for several (morphine, codeine) — the difference between medicine and abuse is dose, purpose and control.</text>
    </svg>
  );
}
