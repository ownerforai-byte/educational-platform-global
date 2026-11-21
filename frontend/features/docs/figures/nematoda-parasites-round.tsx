/** Nematoda roundworm parasites — Ascaris hookworm Wuchereria. Well-detailed. Theme-aware. */
export function NematodaParasitesRound({ className }: { className?: string }) {
  const parasites: [string, string, string][] = [
    ["Ascaris lumbricoides", "intestinal roundworm, faecal-oral route", "rgb(244 63 94)"],
    ["Ancylostoma (hookworm)", "larvae enter through bare feet", "rgb(217 119 6)"],
    ["Wuchereria bancrofti", "lymph vessels, mosquito vector — elephantiasis", "rgb(139 92 246)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Nematoda roundworm parasites Ascaris hookworm Wuchereria elephantiasis routes infection prevention sanitation enterobius pinworm">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Roundworm parasites — three names to know</text>
      {parasites.map(([name, detail, rgb], i) => {
        const x = 30 + i * 228;
        return (
          <g key={name}>
            <rect x={x} y="44" width="210" height="170" rx="12" className="fill-current text-slate-500/10" strokeWidth="2.2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 105} y="68" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            {/* worm squiggle */}
            <path d={`M${x + 60} 120 q20 -24 40 0 q20 24 40 0`} className="fill-none stroke-current" strokeWidth="4" strokeLinecap="round" style={{ color: rgb }} />
            <text x={x + 14} y="160" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(0, 32)}</text>
            <text x={x + 14} y="176" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(32, 64)}</text>
            <text x={x + 105} y="198" fontSize="6.2" textAnchor="middle" className="fill-current" style={{ color: rgb }}>{["wash hands, wash food", "wear shoes", "mosquito control"][i]}</text>
          </g>
        );
      })}
      <rect x="30" y="228" width="660" height="64" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="248" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">All three are Nematoda: cylindrical body, pseudocoelom, complete gut with mouth AND anus — the plan is the same, the doorway differs.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Prevention follows the doorway: sanitation for faecal-oral, footwear for skin entry, vector control for mosquito-borne.</text>
      <text x="360" y="282" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: match each parasite to its route of entry and one prevention measure.</text>
    </svg>
  );
}
