/** Organic farming principles — farming with the soil food web. Well-detailed. Theme-aware. */
export function OrganicFarmingPrinciples({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Organic farming principles compost manure crop rotation green manure biological nitrogen fixation no synthetic pesticide soil health organic certification premium market Nepal exports compost vermicompost mulching practices list">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Organic farming — the practice list behind the label</text>
      {/* practices */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE PRACTICES</text>
      {[
        "compost and manure replace",
        "  synthetic fertiliser",
        "crop rotation and legume",
        "  intercropping fix nitrogen",
        "  biologically",
        "mulching and cover crops feed",
        "  the soil food web",
        "biopesticides (neem, Bt) instead",
        "  of broad-spectrum chemicals",
        "no GMO seed under most",
        "  certification schemes",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* trade-offs */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE HONEST TRADE-OFFS</text>
      {[
        "yields per hectare usually dip,",
        "  at least in transition years",
        "premium prices and export",
        "  markets (Nepal's organic coffee",
        "  and tea) close the gap",
        "soil health compounds: organic",
        "  fields gain organic matter and",
        "  water-holding over time",
        "certification costs — farmer",
        "  groups share the burden",
        "best framing: not anti-science,",
        "  but differently-engineered",
        "  science",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: organic = compost + rotation + biocontrol + no synthetics — four practices define the system.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The soil food web is the real technology — organic farming manages the farmers of the farmers.</text>
    </svg>
  );
}
