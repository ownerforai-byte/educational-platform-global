/** Telemedicine rural access — the doctor on a screen. Well-detailed. Theme-aware. */
export function TelemedicineRuralAccess({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Telemedicine rural access Nepal remote consultation video phone connectivity gaps internet mobile health mHealth specialist distance travel cost saved specialist referral follow up prescriptions limits physical examination diagnostics internet infrastructure mountain districts digital divide literacy data privacy">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Telemedicine — the doctor on a screen</text>
      {/* what it solves */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT IT SOLVES</text>
      {[
        "distance: a specialist consult",
        "  without a two-day walk or bus",
        "  ride to the city",
        "cost: no travel, no lost wages,",
        "  no overnight stays",
        "follow-up: chronic patients",
        "  (diabetes, hypertension) stay",
        "  in touch between visits",
        "training: rural health workers",
        "  get live specialist guidance",
        "  during difficult cases",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* limits */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT IT CANNOT DO</text>
      {[
        "touch: no palpation, no",
        "  listening with a stethoscope —",
        "  many diagnoses need hands",
        "tests: blood, X-ray, biopsy still",
        "  need a facility",
        "connectivity: mountain",
        "  districts lack reliable",
        "  bandwidth — the digital divide",
        "  mirrors the health divide",
        "the realistic model: telemedicine",
        "  as the front door, physical",
        "  clinics for what needs hands",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: two gains (distance, cost) and two limits (touch, connectivity) — a balanced answer scores highest.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Telemedicine extends scarce doctors; it cannot replace the hands-on half of medicine.</text>
    </svg>
  );
}
