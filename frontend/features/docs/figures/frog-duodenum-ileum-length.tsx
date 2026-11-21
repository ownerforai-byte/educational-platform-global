/** Frog duodenum ileum length — short gut of a carnivore. Well-detailed. Theme-aware. */
export function FrogDuodenumIleumLength({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog duodenum ileum short gut carnivore herbivore comparison intestine length diet protein easy digest large intestine reduced cloaca single exit">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">A short gut — the carnivore's shortcut</text>
      {/* gut length comparison */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CARNIVORE vs HERBIVORE</text>
      <path d="M60 110 q60 -20 120 0 q60 20 120 0" className="fill-none stroke-current" strokeWidth="4" strokeLinecap="round" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="92" fontSize="6.4" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="700">frog: short, simple intestine</text>
      <path d="M60 170 q20 24 40 0 q20 -24 40 0 q20 24 40 0 q20 -24 40 0 q20 24 40 0 q20 -24 40 0 q20 24 40 0" className="fill-none stroke-current" strokeWidth="4" strokeLinecap="round" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="195" y="212" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">herbivore (cow, rabbit): long, coiled intestine</text>
      <text x="195" y="230" fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">cellulose needs length and microbes — flesh does not</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FROG GUT STATIONS</text>
      {[
        ["Duodenum", "receives bile + pancreatic juice"],
        ["Ileum", "main absorption, coiled"],
        ["Large intestine", "reduced — water recovery only"],
        ["Cloaca", "one exit for gut, urine, gametes"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="406" y={96 + i * 30} fontSize="7" className="fill-current text-sky-600" fontWeight="700">{k}</text>
          <text x="486" y={96 + i * 30} fontSize="6.8" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <text x="406" y="226" fontSize="6.6" className="fill-current text-emerald-600">the cloaca is the amphibian's three-way junction —</text>
      <text x="406" y="240" fontSize="6.6" className="fill-current text-emerald-600">digestive, urinary and reproductive in one door</text>
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: gut length tracks diet — carnivore short, herbivore long. The frog's short gut is evidence of its carnivory.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Cloaca = common chamber: faeces, urine and eggs or sperm all leave through it.</text>
    </svg>
  );
}
