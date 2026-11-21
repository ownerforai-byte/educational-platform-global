/** REDD plus mechanism — paying countries to keep forests standing. Well-detailed. Theme-aware. */
export function ReddPlusMechanism({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="REDD plus mechanism reducing emissions deforestation forest degradation conservation enhancement carbon credits results based payments developing countries safeguards communities benefit sharing MRV measurement reporting verification Nepal community forestry REDD readiness fund pilot projects critique leakage additionality">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">REDD+ — paying countries to keep forests standing</text>
      {/* mechanism */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE MECHANISM</text>
      {[
        "REDD: Reducing Emissions from",
        "  Deforestation and forest",
        "  Degradation",
        "REDD+ adds conservation,",
        "  sustainable management and",
        "  enhancement of forest carbon",
        "developing countries earn",
        "  results-based payments for",
        "  measured emission reductions",
        "measurement (MRV): satellite",
        "  data + field plots verify",
        "  the claim before money flows",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* strengths and critiques */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PROMISE AND PITFALLS</text>
      {[
        "promise: makes a standing",
        "  forest worth money — the",
        "  economics finally flip",
        "pitfall — leakage: protection",
        "  here can push clearing there",
        "pitfall — additionality: would",
        "  the forest have survived",
        "  anyway? proving it is hard",
        "pitfall — equity: who gets the",
        "  money — states, companies or",
        "  the communities who guarded",
        "  the forest?",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: expand REDD and REDD+, explain results-based payment, and name leakage + additionality as the two critiques.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Nepal's community forestry gives REDD+ a ready-made, locally governed delivery system.</text>
    </svg>
  );
}
