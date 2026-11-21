/** Rhesus factor pregnancy — the second-baby problem. Well-detailed. Theme-aware. */
export function RhesusFactorPregnancy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Rhesus factor pregnancy Rh negative mother positive foetus sensitisation anti D immunoglobulin injection haemolytic disease newborn erythroblastosis fetalis second pregnancy jaundice prevention timing 28 weeks antibody screening">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Rh in pregnancy — the second-baby problem, solved</text>
      {/* mechanism */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE MECHANISM</text>
      {[
        "Rh− mother + Rh+ foetus: at",
        "  birth, foetal blood enters her",
        "  circulation",
        "she makes anti-Rh antibodies —",
        "  harmless to this baby",
        "next Rh+ pregnancy: those",
        "  antibodies cross the placenta",
        "  and attack the foetus's blood",
        "  (haemolytic disease: jaundice,",
        "  anaemia, heart failure)",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* prevention */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE PREVENTION</text>
      {[
        "anti-D immunoglobulin injected",
        "  at 28 weeks and after birth —",
        "  it mops up foetal cells before",
        "  the mother can react",
        "given preventively, the mother",
        "  never makes her own anti-Rh",
        "the fix is a global standard of",
        "  prenatal care",
        "exam hook: the disease hits the",
        "  SECOND Rh+ baby — prevention",
        "  must precede sensitisation",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: Rh− mother, Rh+ foetus, anti-D at 28 weeks — three facts that answer any Rh question.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Before anti-D, this disease killed thousands per year — a preventive triumph of immunology.</text>
    </svg>
  );
}
