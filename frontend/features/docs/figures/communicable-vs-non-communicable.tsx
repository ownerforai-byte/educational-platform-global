/** Communicable vs non-communicable — the great divide. Well-detailed. Theme-aware. */
export function CommunicableVsNonCommunicable({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Communicable versus non-communicable diseases contrast infectious agents bacteria virus spread contagious tuberculosis diabetes hypertension lifestyle transition Nepal double burden prevention difference">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Communicable vs non-communicable — the great divide</text>
      {/* contrast */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">COMMUNICABLE</text>
      {[
        "cause: a living agent — virus,",
        "  bacterium, protozoan, worm",
        "spread: air, water, food, vector,",
        "  contact",
        "examples: TB, cholera, malaria,",
        "  COVID-19, measles",
        "control: vaccines, sanitation,",
        "  vectors, antibiotics",
        "they can epidemic — spread is",
        "  the defining property",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* non-communicable */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NON-COMMUNICABLE</text>
      {[
        "cause: genes, lifestyle,",
        "  environment — no microbe",
        "cannot be caught or handed on",
        "examples: diabetes, hypertension,",
        "  cancer, heart disease",
        "control: diet, exercise, screening,",
        "  no tobacco",
        "they are chronic — measured in",
        "  decades, not days",
        "Nepal now faces both at once:",
        "  the 'double burden' of disease",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: the dividing question is 'can it pass from person to person?' — everything else follows from the answer.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Different biology, different medicine: vaccines for one class, lifestyle for the other.</text>
    </svg>
  );
}
