// Haber process condition choices. Theme-aware.
export function HaberConditionsPanel({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["high pressure (~200 atm)", "4 gas moles -> 2: pressure pushes forward", "rgb(16 185 129)"],
    ["moderate T (~450 C)", "exothermic: high T would cut yield - catalyst rescues rate", "rgb(245 158 11)"],
    ["continuous NH3 removal", "product removal drags the position forward", "rgb(14 165 233)"],
    ["Fe catalyst", "faster arrival, unchanged position", "rgb(148 163 184)"],
  ];
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Haber process conditions explained by Le Chatelier: high pressure, moderate temperature, ammonia removal and iron catalyst">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Haber: the principle as a factory manual</text>
      {rows.map(([t, s, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 52} width="580" height="42" rx="9" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="58" y={64 + i * 52} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{t}</text>
          <text x="58" y={82 + i * 52} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="270" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Every operating choice is a Le Chatelier argument in overalls</text>
    </svg>
  );
}
