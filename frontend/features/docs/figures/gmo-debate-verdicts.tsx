/** Genetically modified organisms debate — the two verdicts. Well-detailed. Theme-aware. */
export function GmoDebateVerdicts({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="GMO debate verdicts golden rice vitamin A bt cotton brinjal Bt gene Bacillus thuringiensis herbicide tolerance roundup ready superweeds resistance evolution terminator seeds monopoly patent Monsanto Bayer farmers saving seed illegal cross pollination labelling consumer right scientific consensus safety feeding world argument against biodiversity gene flow regulation Nepal GM mustard debate ethics playing god naturalness argument corporate control food sovereignty">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">GMOs — the case for and against, honestly stated</text>
      {/* for */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE CASE FOR</text>
      {[
        "Bt crops (cotton, brinjal): built-in",
        "  insect resistance from a soil",
        "  bacterium's protein — less",
        "  insecticide sprayed",
        "golden rice: beta-carotene in",
        "  grain, aimed at vitamin A",
        "  blindness",
        "the scientific consensus: approved",
        "  GM foods show no unique health",
        "  risk versus conventional breeding",
        "drought-tolerant and disease-",
        "  resistant traits under",
        "  development",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* against */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE CASE AGAINST</text>
      {[
        "herbicide-tolerant crops bred",
        "  superweeds — the resistance",
        "  treadmill, pesticide-style",
        "corporate control: patented seed,",
        "  restrictions on saving and",
        "  replanting — farmers become",
        "  licensees",
        "gene flow: transgenes escape to",
        "  wild relatives — irreversible",
        "  release",
        "the deeper objection: control of",
        "  the food chain, not the",
        "  molecule, is what worries",
        "  critics most",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: one benefit (Bt cotton's insecticide cut) + one risk (superweeds) + the safety consensus + the control objection — four marks.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The GMO fight is mostly not about safety — it's about who owns the seed and who bears the risk.</text>
    </svg>
  );
}
