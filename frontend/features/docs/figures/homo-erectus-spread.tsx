/** Homo erectus spread — first out of Africa. Well-detailed. Theme-aware. */
export function HomoErectusSpread({ className }: { className?: string }) {
  const stops: [string, string, string][] = [
    ["Africa", "~1.8 mya — the origin", "rgb(217 119 6)"],
    ["Georgia / W Asia", "~1.7 mya — first outpost", "rgb(2 132 199)"],
    ["Java (Java man)", "~1.6–1 mya — Pithecanthropus", "rgb(16 185 129)"],
    ["China (Peking man)", "~700–200 kya — fire, tools", "rgb(139 92 246)"],
    ["Europe", "~800 kya onward", "rgb(244 63 94)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Homo erectus spread out of Africa first migration Java man Peking man Georgia Europe dates million years map steps">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The first diaspora — erectus leaves home</text>
      <path d="M60 200 q120 -50 240 -30 q160 24 300 -40 q40 -20 90 -20" className="fill-none stroke-current text-sky-500" strokeWidth="2.4" strokeDasharray="8 5" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {stops.map(([place, note, rgb], i) => {
        const x = 60 + i * 148;
        const y = i === 0 ? 200 : i === 1 ? 152 : i === 2 ? 138 : i === 3 ? 118 : 110;
        return (
          <g key={place}>
            <circle cx={x} cy={y} r="7" className="fill-current" style={{ color: `${rgb} / 0.5` }} stroke="currentColor" strokeWidth="1.6" />
            <text x={x} y={y - 14} fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{place}</text>
            <text x={x} y={y + 26} fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">{note.slice(0, 30)}</text>
          </g>
        );
      })}
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Erectus managed what no ape had: living outside the forest — fire, hunting, and a body built for long-distance walking.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Java man and Peking man are the classic exam names — both were Homo erectus populations.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: erectus left Africa ~1.8 mya; sapiens left ~60–70 kya — keep the two exits separate.</text>
    </svg>
  );
}
