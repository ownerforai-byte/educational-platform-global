/** Geography society links — the wider connections. Well-detailed. Theme-aware. */
export function GeographySocietyLinks({ className }: { className?: string }) {
  const links: [string, string, string][] = [
    ["Geography", "altitude, rainfall, climate belts", "why sal grows low and birch high"],
    ["Sociology", "population, health behaviour, farming customs", "why diseases spread, why forests burn"],
    ["Economics", "value of timber, herbs, ecotourism", "why conservation needs a budget"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Geography sociology economics links with biology altitude climate belts population health ecotourism conservation budget interdisciplinary">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Biology's wider connections</text>
      {links.map(([name, what, why], i) => {
        const y = 48 + i * 70;
        return (
          <g key={name}>
            <rect x="30" y={y} width="660" height="58" rx="10" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
            <text x="50" y={y + 24} fontSize="8.8" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x="50" y={y + 42} fontSize="7.4" className="fill-current text-muted-foreground">{what}</text>
            <text x="360" y={y + 33} fontSize="7.4" className="fill-current text-sky-600">{why}</text>
          </g>
        );
      })}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Geography explains where life lives, sociology explains what people do to it, economics explains what it is worth — biology needs all three.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: one sentence per science, one Nepali example each.</text>
    </svg>
  );
}
