/** Frog sexual dimorphism features — telling the sexes apart. Well-detailed. Theme-aware. */
export function FrogSexualDimorphismFeatures({ className }: { className?: string }) {
  const traits: [string, string, string][] = [
    ["Size", "female larger", "carries eggs"],
    ["Tympanum", "male larger than eye", "tuned to croaks"],
    ["Vocal sacs", "male only", "amplifies call"],
    ["Nuptial pads", "male only, thumb pads", "grips during amplexus"],
    ["Skin texture", "male rougher in season", "may aid grip"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog sexual dimorphism features telling sexes apart size tympanum vocal sacs nuptial pads skin texture male female comparison table breeding season">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Telling the sexes apart — five field marks</text>
      {/* table */}
      <rect x="30" y="40" width="130" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="95" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FEATURE</text>
      <rect x="160" y="40" width="250" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="285" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHO SHOWS IT</text>
      <rect x="410" y="40" width="280" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="550" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FUNCTION</text>
      {traits.map(([name, who, func], i) => {
        const y = 74 + i * 34;
        return (
          <g key={name}>
            <text x="46" y={y + 14} fontSize="7.2" className="fill-current text-foreground" fontWeight="700">{name}</text>
            <text x="174" y={y + 14} fontSize="6.8" className="fill-current text-sky-600">{who}</text>
            <text x="424" y={y + 14} fontSize="6.8" className="fill-current text-muted-foreground">{func}</text>
          </g>
        );
      })}
      <rect x="30" y="248" width="660" height="44" rx="10" className="fill-current text-rose-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="266" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">All dimorphic traits peak in breeding season — outside it, the sexes look nearly identical.</text>
      <text x="360" y="284" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: nuptial pads + vocal sacs + larger tympanum = male. Larger body = female. Any two traits identify the sex.</text>
    </svg>
  );
}
