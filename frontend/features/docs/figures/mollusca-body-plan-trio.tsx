/** Mollusca body plan trio — foot mantle shell. Well-detailed. Theme-aware. */
export function MolluscaBodyPlanTrio({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Mollusca body plan trio foot mantle shell visceral mass classes gastropoda bivalvia cephalopoda snail mussel octopus radula">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Mollusca — three parts, six classes, endless forms</text>
      {/* three parts */}
      <rect x="30" y="44" width="330" height="150" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE BODY PLAN TRIO</text>
      {[
        ["Foot", "muscular locomotion — crawl, dig, or jet", 100],
        ["Mantle", "skin fold that secretes the shell", 170],
        ["Visceral mass", "organs bulk, above the foot", 240],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <text x={x as number} y={100} fontSize="7.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{name as string}</text>
          <text x={x as number} y={116} fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 26)}</text>
          <text x={x as number} y={128} fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(26, 52)}</text>
        </g>
      ))}
      <text x="195" y="180" fontSize="6.6" textAnchor="middle" className="fill-current text-sky-600">radula: a rasping toothed tongue — unique to molluscs</text>
      {/* classes */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THREE FAMILIAR CLASSES</text>
      {[
        ["Gastropoda", "snails — one coiled shell, flat foot"],
        ["Bivalvia", "mussels, oysters — two hinged shells, filter feed"],
        ["Cephalopoda", "octopus, squid — shell lost or internal, jet propulsion"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="406" y={96 + i * 44} fontSize="7.2" className="fill-current text-foreground" fontWeight="700">{k}</text>
          <text x="406" y={112 + i * 44} fontSize="6.6" className="fill-current text-muted-foreground">{v.slice(0, 46)}</text>
          <text x="406" y={126 + i * 44} fontSize="6.6" className="fill-current text-muted-foreground">{v.slice(46, 92)}</text>
        </g>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: foot + mantle + visceral mass = the trio every mollusc shares, from garden snail to giant squid.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Second largest phylum after Arthropoda — the plan scales from pond to abyss.</text>
    </svg>
  );
}
