/** Pseudocoelom roundworm niche — the in-between plan. Well-detailed. Theme-aware. */
export function PseudocoelomRoundwormNiche({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Pseudocoelom roundworm niche Ascaris fluid filled unlined cavity cuticle moult longitudinal muscles only thrashing movement soil intestinal parasites">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The pseudocoelom — an in-between plan that works</text>
      {/* cross-section */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ROUNDWORM CROSS-SECTION</text>
      <circle cx="195" cy="140" r="66" className="fill-none stroke-current" strokeWidth="5" style={{ color: "rgb(217 119 6 / 0.7)" }} />
      <circle cx="195" cy="140" r="40" className="fill-none stroke-current" strokeWidth="2" strokeDasharray="4 3" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <circle cx="195" cy="140" r="14" className="fill-current text-emerald-500/25" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="232" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">fluid cavity NOT lined by mesoderm — cuticle outside, gut inside</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT THE PLAN BUYS</text>
      {[
        "fluid acts as a hydrostatic skeleton",
        "longitudinal muscles only — the",
        "  worm thrashes in whiplash loops",
        "tough cuticle moulted as it grows",
        "hardly any circular muscle: no",
        "  elegant crawling, just efficient",
        "  pushing through soil and gut",
        "examples: Ascaris, hookworm,",
        "  Wuchereria (elephantiasis)",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 19} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">'Pseudo' is not a flaw: for a roundworm pushing through soil or intestine, thrash plus rigid cuticle beats graceful crawling.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: pseudocoelom = unlined by mesoderm; Nematoda is the type phylum; movement = thrashing.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Three descriptors, one mark each.</text>
    </svg>
  );
}
