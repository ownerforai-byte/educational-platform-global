/** Pteridophyte economic uses — food, medicine, ornament. Well-detailed. Theme-aware. */
export function PteridophyteEconomicUses({ className }: { className?: string }) {
  const uses: [string, string, string][] = [
    ["Ornamentals", "ferns and maidenhairs fill shade gardens and hanging baskets", "text-emerald-500"],
    ["Medicine", "Lycopodium spores for pills and skin powders; fern extracts as vermifuges", "text-sky-500"],
    ["Food", "fiddleheads — young coiled frond tips — eaten as a seasonal vegetable", "text-amber-500"],
    ["Soil & science", "biofertiliser Azolla in rice paddies; fossils date rock strata", "text-violet-500"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Pteridophyte economic uses ornamental ferns medicine Lycopodium food fiddleheads Azolla biofertiliser fossils four uses">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">What ferns give us</text>
      {uses.map(([title, detail, tint], i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 30 + col * 335;
        const y = 44 + row * 110;
        return (
          <g key={title}>
            <rect x={x} y={y} width="320" height="98" rx="10" className={`fill-current ${tint}/10`} strokeWidth="2" stroke="currentColor" />
            <text x={x + 16} y={y + 22} fontSize="8.8" className="fill-current text-foreground" fontWeight="800">{i + 1}. {title}</text>
            <text x={x + 16} y={y + 44} fontSize="7.4" className="fill-current text-muted-foreground">{detail}</text>
            {/* mini icon */}
            {i === 0 && <path d={`M${x + 250} ${y + 70} q14 -26 28 0 q-14 8 -28 0`} className="fill-current text-emerald-600/40" />}
            {i === 1 && <rect x={x + 250} y={y + 52} width="28" height="18" rx="4" className="fill-current text-sky-500/30" stroke="currentColor" strokeWidth="1.4" />}
            {i === 2 && <path d={`M${x + 254} ${y + 74} q14 -18 26 -2 q-16 10 -26 2`} className="fill-none stroke-current text-amber-600" strokeWidth="3" />}
            {i === 3 && <path d={`M${x + 248} ${y + 70} h34 M${x + 254} ${y + 62} h22`} className="stroke-current text-violet-500" strokeWidth="2" />}
            <text x={x + 16} y={y + 78} fontSize="6.8" className={`fill-current ${tint}`}>{["shade gardens, homes", "pharmacy + folk medicine", "hills of Nepal, spring dish", "paddies + geology"][i]}</text>
          </g>
        );
      })}
      <rect x="30" y="268" width="660" height="24" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="284" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name one use per group — ornamental (ferns), medicine (Lycopodium), food (fiddleheads), biofertiliser (Azolla).</text>
    </svg>
  );
}
