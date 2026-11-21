/** Cholera pandemic history — seven waves of the blue death. Well-detailed. Theme-aware. */
export function CholeraPandemicHistory({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Cholera pandemic history seven waves 1817 first John Snow 1854 Broad Street pump map epidemiology origin Vibrio cholerae O1 El Tor O139 Haiti 2010 Nepal peacekeepers Ganges virulence toxin oral rehydration salt ORS discovery rice water stool dehydration death hours prevention sanitation Oral cholera vaccine Shanchol">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Cholera — seven pandemics and one famous pump</text>
      {/* history */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE TIMELINE</text>
      {[
        "1817: first pandemic from the",
        "  Ganges delta; six more follow",
        "1854: John Snow maps Soho",
        "  deaths to the Broad Street",
        "  pump — epidemiology's birth",
        "the 7th pandemic (El Tor, from",
        "  1961) still runs — Nepal's",
        "  2010 Haiti link via",
        "  peacekeepers showed global",
        "  connectivity's cost",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* treatment */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TREATMENT AND PREVENTION</text>
      {[
        "rice-water stool, dehydration,",
        "  death within hours if untreated",
        "oral rehydration solution (ORS):",
        "  glucose + salts in clean water",
        "  — a few cents saves a life; it",
        "  cut cholera's death rate from",
        "  ~50% to under 1%",
        "prevention: safe water,",
        "  sanitation, oral cholera",
        "  vaccine (Shanchol) in hotspots",
        "exam hook: Snow's pump map —",
        "  the first epidemiological",
        "  detective story",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: 7 pandemics, Snow 1854, ORS cuts fatality from ~50% to under 1% — the three numbers of cholera history.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Cholera never left — it waits wherever water and sanitation fail.</text>
    </svg>
  );
}
