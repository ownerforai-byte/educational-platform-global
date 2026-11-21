/** Algin, agar and iodine — brown and red algae products. Well-detailed. Theme-aware. */
export function AlginIodineProducts({ className }: { className?: string }) {
  const cards: [string, string, string[], string][] = [
    ["ALGIN (brown algae)", "from kelp cell walls — a thickening gel", ["ice cream smoothness", "shampoo + toothpaste", "printer inks"], "rgb(180 130 40)"],
    ["AGAR (red algae)", "gel from red seaweed cell walls", ["culture medium in labs", "jellies and desserts", "capsule coatings"], "rgb(219 39 119)"],
    ["IODINE (brown algae)", "kelp concentrates iodine from seawater", ["iodine supplements", "antiseptic tincture", "goitre prevention"], "rgb(2 132 199)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Algin agar iodine products from brown and red algae kelp uses ice cream agar culture medium iodine goitre economic importance seaweed industry">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">From seaweed to shelf — three money products</text>
      {cards.map(([name, source, uses, rgb], i) => {
        const x = 30 + i * 225;
        return (
          <g key={name}>
            <rect x={x} y="44" width="210" height="200" rx="12" className="fill-current text-slate-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <rect x={x + 16} y="58" width="26" height="26" rx="6" className="fill-current" style={{ color: rgb, opacity: 0.4 }} />
            <text x={x + 16} y="106" fontSize="8.6" className="fill-current text-foreground" fontWeight="800">{name}</text>
            <text x={x + 16} y="126" fontSize="7.2" className="fill-current text-muted-foreground">{source}</text>
            {uses.map((u, j) => (
              <text key={u} x={x + 16} y={156 + j * 24} fontSize="7.4" className="fill-current text-muted-foreground">• {u}</text>
            ))}
            <text x={x + 16} y="234" fontSize="6.8" className="fill-current" style={{ color: rgb }}>seaweed farming = coastal jobs</text>
          </g>
        );
      })}
      <rect x="30" y="260" width="660" height="32" rx="8" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="274" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Exam hook: agar → red algae + lab culture medium; algin → brown algae + food industry; iodine → kelp + goitre.</text>
      <text x="360" y="287" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">Match the product to the algal class, not just to 'algae'.</text>
    </svg>
  );
}
