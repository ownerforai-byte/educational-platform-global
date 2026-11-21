/** IVF ethics surplus embryos — the frozen question. Well-detailed. Theme-aware. */
export function IvfEthicsSurplusEmbryos({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="IVF ethics surplus embryos frozen storage cryopreservation status of embryo person versus property moral status debate selective reduction multiple births discard donation research use consent ownership disputes custody cases Davis divorce clinic policies time limits fourteen days rule embryo adoption pre implantation genetic diagnosis PGD sex selection designer baby slippery slope arguments regulation HFEA model">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">IVF's frozen question — what is an embryo?</text>
      {/* the dilemma */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE DILEMMA</text>
      {[
        "IVF creates more embryos than it",
        "  transfers — surplus embryos sit",
        "  in liquid nitrogen by the",
        "  hundreds of thousands",
        "each has one of four fates:",
        "  indefinite storage, discard,",
        "  donation to another couple, or",
        "  donation to research",
        "the moral question: person with",
        "  full rights, or property with",
        "  an owner? Every law picks a",
        "  point on that line",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* frameworks */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FRAMEWORKS</text>
      {[
        "the 14-day rule: research on",
        "  embryos permitted only to 14",
        "  days — the 'primitive streak'",
        "  boundary most jurisdictions use",
        "consent governs: couples decide",
        "  the fate in advance; disputes",
        "  after divorce test whose word",
        "  counts",
        "PGD adds another layer: screening",
        "  embryos for disease — and,",
        "  controversially, for sex",
        "exam hook: name the four fates +",
        "  the 14-day rule — the two",
        "  anchors of any IVF-ethics",
        "  answer",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: four fates of surplus embryos + the 14-day rule + the person-or-property framing — the full IVF-ethics structure.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The freezer holds an ethical question at −196°C — society answers it in law, one jurisdiction at a time.</text>
    </svg>
  );
}
