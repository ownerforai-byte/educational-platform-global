/** Community health workers — the front line that isn't a hospital. Well-detailed. Theme-aware. */
export function CommunityHealthWorkers({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Community health workers FCHV female community health volunteer Nepal roles vaccination promotion ORS maternal care referral antenatal visits primary health care outreach village level tasks list training incentives system">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Community health workers — healthcare's front line</text>
      {/* roles */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT FCHVs ACTUALLY DO</text>
      {[
        "immunisation mobilisation: find",
        "  every child, every dose",
        "pregnancy: promote antenatal",
        "  visits and institutional birth",
        "child health: ORS for diarrhoea,",
        "  pneumonia danger signs,",
        "  growth monitoring",
        "contraception counselling and",
        "  basic distribution",
        "they are trusted because they",
        "  are neighbours, not visitors",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* the system view */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY THE MODEL WORKS</text>
      {[
        "Nepal has >50,000 female",
        "  community health volunteers —",
        "  one per ward, roughly",
        "child mortality fell by three-",
        "  quarters since 1990; FCHVs",
        "  are part of that story",
        "cost-effective: modest pay,",
        "  outsized reach",
        "the catch: volunteer fatigue and",
        "  unpaid workloads — the model",
        "  needs investment to survive",
        "exam hook: FCHV = Female",
        "  Community Health Volunteer",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: FCHVs deliver immunisation, maternal and child health at ward level — name three tasks.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Health systems are built on people, not just buildings — the village volunteer is infrastructure.</text>
    </svg>
  );
}
