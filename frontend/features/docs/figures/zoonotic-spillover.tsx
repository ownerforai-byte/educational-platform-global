/** Zoonotic spillover — how animal diseases jump. Well-detailed. Theme-aware. */
export function ZoonoticSpillover({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Zoonotic spillover animal diseases jump humans wildlife reservoir bats poultry swine H5N1 COVID 19 Ebola Nipah One Health approach wet markets bushmeat deforestation contact rate surveillance mutation jump species emergence 75 percent zoonotic origin pandemic prevention">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Zoonotic spillover — how animal diseases jump</text>
      {/* spillover chain */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      {[
        ["Wildlife reservoir", "bats, rodents, birds carry pathogens harmlessly", 130],
        ["Contact interface", "deforestation, markets, farms shrink the distance", 300],
        ["Spillover", "virus adapts, jumps, then spreads human-to-human", 470],
        ["Outbreak", "surveillance (or its absence) decides the scale", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(244 63 94 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">about three-quarters of emerging infectious diseases are zoonotic — we build the contact, the virus takes it</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">One Health: human, animal and environmental health as one system — veterinarians and ecologists belong in the outbreak team.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Examples to quote: HIV (apes), SARS-CoV and SARS-CoV-2 (bats via intermediates), H5N1 (poultry), Nipah (bats→pigs).</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: define zoonosis, name the contact interfaces, give two examples — the standard three-part answer.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Preventing spillover in the forest costs orders of magnitude less than responding to the pandemic it becomes.</text>
    </svg>
  );
}
