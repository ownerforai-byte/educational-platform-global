/** Conservation success numbers — what the data says. Well-detailed. Theme-aware. */
export function ConservationSuccessNumbers({ className }: { className?: string }) {
  const stats: [string, string, string][] = [
    ["Tiger", "~120 → 355+", "between 2009 and 2024 surveys"],
    ["Rhino", "~100 → 750+", "from near-extinction in the 1960s"],
    ["Gharial", "captive-reared releases", "breeding programme continues"],
    ["Forest cover", "~45%", "recovered with community forestry"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Conservation success numbers Nepal tiger rhino gharial forest cover recovery statistics protected areas evidence">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Proof it works — Nepal's conservation numbers</text>
      {stats.map(([name, val, note], i) => {
        const x = 30 + (i % 2) * 335;
        const y = 44 + Math.floor(i / 2) * 108;
        return (
          <g key={name}>
            <rect x={x} y={y} width="320" height="96" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
            <text x={x + 16} y={y + 24} fontSize="8.6" className="fill-current text-foreground" fontWeight="800">{name}</text>
            <text x={x + 16} y={y + 50} fontSize="12" className="fill-current text-emerald-600" fontWeight="800">{val}</text>
            <text x={x + 16} y={y + 72} fontSize="7" className="fill-current text-muted-foreground">{note}</text>
          </g>
        );
      })}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Behind every number: protected areas, army patrols, buffer-zone revenue sharing and community forestry working together.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: quote one recovery statistic as evidence that conservation works.</text>
    </svg>
  );
}
