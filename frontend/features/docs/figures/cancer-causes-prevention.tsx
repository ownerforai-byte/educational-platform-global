/** Cancer causes prevention — the multi-hit reality. Well-detailed. Theme-aware. */
export function CancerCausesPrevention({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Cancer causes prevention multi hit reality carcinogens tobacco alcohol UV radiation HPV hepatitis viruses occupational asbestos processed meat obesity sedentary genetic predisposition BRCA one third preventable screening mammography pap smear colonoscopy HPV vaccine hepatitis B vaccine early detection survival rates lifestyle factors WHO prevention statistics Nepal cancer registry rising tobacco chewing oral cancer">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Cancer — the multi-hit reality and the preventable share</text>
      {/* causes */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE CAUSES (MULTI-HIT)</text>
      {[
        "cancer needs several mutations —",
        "  no single hit usually suffices",
        "external hits: tobacco (the",
        "  largest), alcohol, UV,",
        "  processed meat, asbestos,",
        "  air pollution",
        "infection hits: HPV → cervical,",
        "  hepatitis B/C → liver,",
        "  H. pylori → stomach",
        "inherited hits: BRCA mutations",
        "  load the dice but don't",
        "  guarantee the disease",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* prevention */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE PREVENTION STACK</text>
      {[
        "no tobacco: the single biggest",
        "  lever — a third of cancers",
        "  trace to smoking and chewing",
        "vaccines: HPV (cervical) and",
        "  hepatitis B (liver) — cancer",
        "  prevention by injection",
        "screening: pap smear, mammography,",
        "  colonoscopy — catch it early,",
        "  survival transforms",
        "diet, exercise, weight: the",
        "  unglamorous third of the story",
        "exam hook: 'about one-third of",
        "  cancers are preventable' —",
        "  quote it with two examples",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: multi-hit mechanism + two external causes + two prevention methods — the four-part cancer answer.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Cancer is partly bad luck and largely bad environments — the preventable share is the part policy can reach.</text>
    </svg>
  );
}
