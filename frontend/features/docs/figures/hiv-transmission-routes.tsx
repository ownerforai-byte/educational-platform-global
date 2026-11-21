/** HIV transmission routes — and the routes that don't. Well-detailed. Theme-aware. */
export function HIVTransmissionRoutes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="HIV transmission routes unsafe blood sexual contact shared needles mother to child breastfeeding myths handshake mosquito bite food casual contact does not spread antiretroviral testing counselling Nepal">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">HIV — how it spreads, and how it doesn't</text>
      {/* does spread */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">REAL ROUTES (BODY FLUIDS)</text>
      {[
        "unprotected sexual contact",
        "infected blood transfusion or",
        "  shared needles",
        "mother to child: pregnancy,",
        "  birth, breastfeeding",
        "the virus is fragile outside the",
        "  body — which is why the",
        "  'no-routes' list is so long",
        "antiretroviral therapy cuts",
        "  mother-to-child transmission",
        "  to near zero",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* myths */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NOT ROUTES — THE MYTHS</text>
      {[
        "handshakes, hugs, shared meals",
        "mosquito bites — the virus",
        "  cannot complete its cycle in",
        "  the insect",
        "swimming pools, toilets, cups",
        "caring for a person living with",
        "  HIV carries no risk with",
        "  ordinary contact",
        "stigma, not the virus, is the",
        "  biggest barrier to testing",
        "  and treatment",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="240" width="330" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Exam hook: list the three real routes and three myths — examiners reward the contrast.</text>
      <text x="195" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">HIV attacks helper T cells — immunity fails, so infections that never harm healthy people become lethal.</text>
      <text x="195" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Testing, treatment and zero stigma form the public-health triangle.</text>
    </svg>
  );
}
