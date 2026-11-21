/** Environmental legislation Nepal — the legal shield. Well-detailed. Theme-aware. */
export function EnvironmentalLegislationNepal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Environmental legislation Nepal Environment Protection Act 1997 2019 2076 IEE EIA initial environmental examination environmental impact assessment requirement projects constitution right clean environment 30 EPA EPA amendment penalties enforcement gap implementation">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Nepal's environmental law — the shield and its gaps</text>
      {/* law framework */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE LEGAL STACK</text>
      {[
        "Constitution (2015): right to a",
        "  clean and healthy environment",
        "  is a fundamental right",
        "Environment Protection Act:",
        "  first 1997 (2053 BS), replaced",
        "  by the 2019 (2076 BS) Act",
        "EPA rules require IEE or EIA",
        "  for projects by size and type",
        "sectoral laws: forest, water,",
        "  vehicles, standards",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* reality check */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">LAW vs PRACTICE</text>
      {[
        "EIA reports exist on paper —",
        "  monitoring after approval is",
        "  the weak link",
        "standards exist (air, water,",
        "  noise) — enforcement capacity",
        "  lags the statute",
        "courts have become active:",
        "  public-interest litigation has",
        "  shaped environmental policy",
        "the honest exam answer: Nepal's",
        "  framework is sound; the gap",
        "  is implementation and",
        "  monitoring",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: EPA 2019 (2076 BS) replaced the 1997 act; IEE for small projects, EIA for large ones — know which applies where.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">A constitution that names the environment a right is rare — Nepal's does.</text>
    </svg>
  );
}
