/** Protozoa habitats water — where protozoa live. Well-detailed. Theme-aware. */
export function ProtozoaHabitatsWater({ className }: { className?: string }) {
  const homes: [string, string, string][] = [
    ["Freshwater ponds", "Amoeba, Paramecium, Euglena — free-living", "rgb(2 132 199)"],
    ["Marine", "radiolarians, foraminiferans — shells sink to ooze", "rgb(139 92 246)"],
    ["Soil and moss", "cysts survive dry spells between rains", "rgb(217 119 6)"],
    ["Inside hosts", "Plasmodium (blood), Trypanosoma, Giardia (gut)", "rgb(244 63 94)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Protozoa habitats water freshwater ponds marine soil moss inside hosts parasites free living pellicle moisture requirement">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Where protozoa live — always somewhere wet</text>
      {homes.map(([name, detail, rgb], i) => {
        const x = 30 + i * 172;
        return (
          <g key={name}>
            <rect x={x} y="44" width="158" height="170" rx="12" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 79} y="66" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            {/* droplet icon */}
            <path d={`M${x + 79} 86 q-16 22 0 34 q16 -12 0 -34`} className="fill-current" style={{ color: rgb, opacity: 0.35 }} stroke="currentColor" strokeWidth="1.4" />
            <text x={x + 12} y="142" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(0, 26)}</text>
            <text x={x + 12} y="156" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(26, 52)}</text>
            <text x={x + 12} y="180" fontSize="6.2" textAnchor="middle" className="fill-current" style={{ color: rgb }}>{["need film of water", "shells make ooze", "cyst between rains", "host supplies wet"][i]}</text>
          </g>
        );
      })}
      <rect x="30" y="228" width="660" height="64" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="248" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The rule behind all four homes: a naked single cell cannot cross dry land — every protozoan needs a film of water or a host's fluids.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">That is why the pellicle, the contractile vacuole and the cyst all exist — solutions to living as a drop-bound cell.</text>
      <text x="360" y="284" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name one free-living and one parasitic protozoan with its habitat.</text>
    </svg>
  );
}
