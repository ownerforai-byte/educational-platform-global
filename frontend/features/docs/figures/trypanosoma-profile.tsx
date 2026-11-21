/** Trypanosoma profile — sleeping sickness flagellate. Well-detailed. Theme-aware. */
export function TrypanosomaProfile({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Trypanosoma profile sleeping sickness tsetse fly vector undulating membrane blood parasite chagas kala azar related species">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Trypanosoma — the blood-flagellate</text>
      {/* body */}
      <rect x="30" y="44" width="400" height="150" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="230" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SHAPE IN A BLOOD SMEAR</text>
      <path d="M70 160 q60 -50 140 -30 q80 20 180 -30" className="fill-none stroke-current" strokeWidth="3" strokeLinecap="round" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <path d="M70 160 q60 -34 140 -18 q80 14 180 -22" className="fill-none stroke-current" strokeWidth="1.4" strokeDasharray="3 2" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <circle cx="330" cy="102" r="7" className="fill-current" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="330" y="90" fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">kinetoplast</text>
      <text x="230" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">crescent body, undulating membrane, flagellum at the front</text>
      {/* facts */}
      <rect x="460" y="44" width="230" height="150" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="575" y="66" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FACT CARD</text>
      {[
        ["Habitat", "human blood plasma"],
        ["Vector", "tsetse fly (Glossina)"],
        ["Disease", "sleeping sickness"],
        ["Feeding", "absorbs blood nutrients"],
        ["Class", "Mastigophora"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="474" y={90 + i * 20} fontSize="6.8" className="fill-current text-sky-600" fontWeight="700">{k}</text>
          <text x="524" y={90 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Why it matters in Nepal's syllabus: Trypanosoma is the standard Mastigophora parasite example — flagella plus vector-borne disease in one organism.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Related flagellate parasites: Leishmania (kala-azar, sandfly vector) and Giardia (gut, contaminated water).</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: vector = tsetse fly; disease = sleeping sickness; class = Mastigophora. Three marks, three names.</text>
      <text x="360" y="284" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">The undulating membrane ripples to drive the parasite through viscous blood.</text>
    </svg>
  );
}
