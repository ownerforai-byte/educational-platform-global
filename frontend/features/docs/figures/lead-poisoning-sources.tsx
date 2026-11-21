/** Lead poisoning sources — the quiet metal. Well-detailed. Theme-aware. */
export function LeadPoisoningSources({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Lead poisoning sources petrol additive paint batteries pipes water toys glaze brain development children IQ loss nervous system unleaded fuel phase out ban success story">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Lead — the quiet poison and its routes</text>
      {/* routes */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHERE IT COMES FROM</text>
      {[
        "old petrol additive — the great",
        "  20th-century aerosol source",
        "flaking lead paint in old houses",
        "lead-acid battery recycling",
        "lead water pipes and solder",
        "glazed pottery and cheap toys",
        "children absorb 4–5× more than",
        "  adults — and put hands in",
        "  mouths: the highest-risk group",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* effects */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT IT DOES</text>
      {[
        "mimics other metals, so it slips",
        "  into bone, blood and brain",
        "damages the developing nervous",
        "  system — measurable IQ loss",
        "anaemia, kidney damage, raised",
        "  blood pressure in adults",
        "no safe threshold: any level",
        "  is too much for children",
        "the fix worked: unleaded petrol",
        "  phased out worldwide — blood",
        "  lead levels fell within years",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="240" width="330" height="52" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Exam hook: lead = neurotoxin hitting children hardest; source = petrol, paint, batteries, pipes.</text>
      <text x="195" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The unleaded-fuel phase-out is the textbook proof that pollution control works.</text>
      <text x="195" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Policy + chemistry + health data — one clean success story.</text>
    </svg>
  );
}
