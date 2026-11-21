/** Neolithic farming shift — agriculture changes everything. Well-detailed. Theme-aware. */
export function NeolithicFarmingShift({ className }: { className?: string }) {
  const shifts: [string, string][] = [
    ["Food", "hunting-gathering → planting and herding"],
    ["Home", "camps → permanent villages"],
    ["Population", "small bands → thousands per settlement"],
    ["Work", "everyone forages → specialisation: farmer, potter, priest"],
    ["Legacy", "surplus food → trade, writing, cities, states"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Neolithic farming shift agriculture wheat rice domestication villages surplus population specialisation civilisation beginning">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The Neolithic turn — farming rewires the species</text>
      {shifts.map(([k, v], i) => {
        const y = 48 + i * 40;
        return (
          <g key={k}>
            <rect x="30" y={y} width="110" height="32" rx="8" className="fill-current text-emerald-500/15" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
            <text x="85" y={y + 21} fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{k}</text>
            <text x="156" y={y + 21} fontSize="7.2" className="fill-current text-muted-foreground">{v}</text>
          </g>
        );
      })}
      <rect x="30" y="252" width="660" height="40" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Farming began ~10,000 years ago — wheat and barley in the Fertile Crescent, rice in Asia — and cultural evolution outran biology from then on.</text>
      <text x="360" y="284" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: agriculture → surplus → specialisation → civilisation — four words, the whole argument.</text>
    </svg>
  );
}
