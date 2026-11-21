/** Amniocentesis ethics — the test and its controversy. Well-detailed. Theme-aware. */
export function AmniocentesisEthics({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Amniocentesis ethics prenatal diagnosis amniotic fluid chromosomal disorders Down syndrome sex determination misuse female foeticide ban law PCPNDT India Nepal genetic counselling ultrasound 16 weeks needle procedure risks">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Amniocentesis — a diagnostic tool and its misuse</text>
      {/* procedure */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE PROCEDURE</text>
      {[
        "around the 15th–17th week, a",
        "  needle draws a little amniotic",
        "  fluid through the abdominal wall",
        "the fluid holds foetal cells —",
        "  enough to read the chromosomes",
        "diagnoses: Down syndrome and",
        "  other chromosomal disorders,",
        "  some metabolic diseases",
        "small risk of miscarriage —",
        "  offered only when screening",
        "  flags a reason",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* misuse */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE MISUSE — AND THE LAW</text>
      {[
        "the same cells reveal the foetus's",
        "  sex — and sex-selective",
        "  abortion followed",
        " skewed sex ratios in India and",
        "  Nepal forced legal bans:",
        "  testing for sex determination",
        "  is prohibited",
        "the ethical line: the technique",
        "  is neutral; the use is not",
        "genetic counselling frames the",
        "  choice: risk, options, support",
        "  — without coercion",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: amniocentesis diagnoses chromosomal disorders; using it for sex determination is illegal — state both halves.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Every powerful diagnostic carries an ethical shadow — biology and law must answer together.</text>
    </svg>
  );
}
