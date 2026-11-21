/** Bentham & Hooker natural system — what it did and why. Well-detailed. Theme-aware. */
export function BenthamHookerSystem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Bentham and Hooker natural system classification genera plantarum dicots gymnosperms monocots overall similarity de Candolle limitations no evolution">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Bentham &amp; Hooker — the great natural system</text>

      {/* three blocks */}
      {[
        ["DICOTYLEDONAE", "2 cotyledons, reticulate veins — the largest block", "rgb(22 163 74)", 165],
        ["GYMNOSPERMAE", "naked seeds, placed between the two flower groups", "rgb(180 130 40)", 165],
        ["MONOCOTYLEDONAE", "1 cotyledon, parallel veins, trimerous flowers", "rgb(2 132 199)", 165],
      ].map(([name, detail, rgb, w], i) => {
        const x = 30 + i * 225;
        return (
          <g key={name as string}>
            <rect x={x} y="44" width={w as number} height="90" rx="10" className="fill-current text-slate-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 105} y="70" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            <text x={x + 16} y="94" fontSize="7.2" className="fill-current text-muted-foreground">{detail}</text>
            <text x={x + 16} y="116" fontSize="6.8" className="fill-current" style={{ color: rgb as string }}>published 1862–1883, 'Genera Plantarum'</text>
          </g>
        );
      })}

      {/* strengths / limits */}
      <rect x="30" y="150" width="320" height="114" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="50" y="172" fontSize="8.4" className="fill-current text-foreground" fontWeight="700">Why it is called 'natural'</text>
      <text x="50" y="192" fontSize="7.4" className="fill-current text-muted-foreground">• uses overall similarity — many characters</text>
      <text x="50" y="208" fontSize="7.4" className="fill-current text-muted-foreground">• related plants land together, mostly</text>
      <text x="50" y="224" fontSize="7.4" className="fill-current text-muted-foreground">• herbaria worldwide still file by it</text>
      <text x="50" y="244" fontSize="7" className="fill-current text-emerald-700">practical, stable, widely adopted</text>

      <rect x="370" y="150" width="320" height="114" rx="10" className="fill-current text-rose-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="390" y="172" fontSize="8.4" className="fill-current text-foreground" fontWeight="700">Its blind spot</text>
      <text x="390" y="192" fontSize="7.4" className="fill-current text-muted-foreground">• written before Darwin was accepted</text>
      <text x="390" y="208" fontSize="7.4" className="fill-current text-muted-foreground">• no evolutionary reasoning behind groups</text>
      <text x="390" y="224" fontSize="7.4" className="fill-current text-muted-foreground">• gymnosperms wedged between dicots and</text>
      <text x="390" y="240" fontSize="7.4" className="fill-current text-muted-foreground">  monocots — an arrangement, not ancestry</text>

      <rect x="30" y="274" width="660" height="18" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="287" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: natural system = overall similarity (Bentham &amp; Hooker); phylogenetic = evolutionary ancestry (later, DNA-informed).</text>
    </svg>
  );
}
