/** Down syndrome trisomy 21 — the extra chromosome's effects. Well-detailed. Theme-aware. */
export function DownSyndromeTrisomy21({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Down syndrome trisomy 21 extra chromosome 21 nondisjunction meiosis maternal age risk 35 features flat face epicanthal fold heart defect hypotonia intellectual disability karyotype 47 chromosomes inclusion therapy support early intervention">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Down syndrome — one extra chromosome, many effects</text>
      {/* cause */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE CAUSE</text>
      {[
        "trisomy 21: three copies of",
        "  chromosome 21 instead of two",
        "usually nondisjunction — the",
        "  pair fails to separate in",
        "  egg formation (mostly)",
        "maternal age is the main risk",
        "  factor: odds rise sharply",
        "  after 35",
        "karyotype shows 47 chromosomes",
        "  — the diagnostic evidence",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* features */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FEATURE SET</text>
      {[
        "face: flat profile, epicanthal",
        "  eye folds, upward slant",
        "hands: single palmar crease",
        "muscle tone: low (hypotonia)",
        "heart: congenital defects in",
        "  ~half — the main health issue",
        "development: intellectual",
        "  disability of variable degree",
        "support: early therapy, schooling",
        "  and inclusion change outcomes",
        "  dramatically",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: trisomy 21 = nondisjunction + maternal age + 47 chromosomes — cause, risk, diagnosis in one line.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Named for John Langdon Down, who described it a century before the chromosome was found.</text>
    </svg>
  );
}
