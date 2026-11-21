/** One Health approach — the connected health diagram. Well-detailed. Theme-aware. */
export function OneHealthApproach({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="One Health approach human animal environmental health connected diagram triangle overlap avian influenza rabies antimicrobial resistance food safety veterinarians doctors ecologists collaboration CDC WHO OIE WoAH framework examples Nepal avian flu surveillance integrated response">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">One Health — three circles, one health</text>
      {/* venn */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE THREE CIRCLES</text>
      <circle cx="160" cy="125" r="46" className="fill-none stroke-current" strokeWidth="2.5" style={{ color: "rgb(2 132 199 / 0.8)" }} />
      <circle cx="230" cy="125" r="46" className="fill-none stroke-current" strokeWidth="2.5" style={{ color: "rgb(217 119 6 / 0.8)" }} />
      <circle cx="195" cy="170" r="46" className="fill-none stroke-current" strokeWidth="2.5" style={{ color: "rgb(22 163 74 / 0.8)" }} />
      <text x="140" y="112" fontSize="6" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">HUMAN</text>
      <text x="252" y="112" fontSize="6" textAnchor="middle" className="fill-current text-amber-600" fontWeight="800">ANIMAL</text>
      <text x="195" y="212" fontSize="6" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">ENVIRONMENT</text>
      <text x="195" y="172" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">where all three overlap:</text>
      <text x="195" y="184" fontSize="5.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">zoonoses, AMR, food safety</text>
      {/* examples */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PROBLEMS THAT NEED ALL THREE</text>
      {[
        "zoonoses: rabies, avian",
        "  influenza, Nipah — vets and",
        "  doctors must share data",
        "AMR: farms, clinics and rivers",
        "  all select for resistance —",
        "  one drug policy alone fails",
        "food safety: from feed to fork",
        "climate: shifts disease ranges",
        "  for people, livestock and",
        "  wildlife together",
        "the institutional point: WHO,",
        "  WOAH and UNEP now run One",
        "  Health jointly",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: define One Health, draw the three circles, place zoonoses and AMR in the overlap — a full-mark answer.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">COVID-19 made One Health mainstream: the response was never only a medical problem.</text>
    </svg>
  );
}
