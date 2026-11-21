/** Zoology botany split — why the oldest division exists. Well-detailed. Theme-aware. */
export function ZoologyBotanySplit({ className }: { className?: string }) {
  const sides: [string, string, string][] = [
    ["Botany", "algae, fungi, bryophytes, ferns, gymnosperms, angiosperms", "sedentary, photosynthetic, cell-walled"],
    ["Zoology", "protozoa, worms, insects, fish, frog, human", "mobile, feeding, contractile"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Zoology botany split oldest division plants versus animals study objects differences mobility nutrition cell wall examples syllabus units">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Botany vs zoology — the oldest division in science</text>
      {sides.map(([name, scope, traits], i) => {
        const x = 30 + i * 355;
        return (
          <g key={name}>
            <rect x={x} y="44" width="330" height="150" rx="12" className="fill-current text-slate-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: i === 0 ? "rgb(22 163 74 / 0.9)" : "rgb(2 132 199 / 0.9)" }} />
            <text x={x + 165} y="68" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name.toUpperCase()}</text>
            <text x={x + 16} y="94" fontSize="7.2" className="fill-current text-muted-foreground">{scope.slice(0, 44)}</text>
            <text x={x + 16} y="110" fontSize="7.2" className="fill-current text-muted-foreground">{scope.slice(44, 88)}</text>
            <text x={x + 16} y="136" fontSize="7" className="fill-current" style={{ color: i === 0 ? "rgb(22 163 74)" : "rgb(2 132 199)" }}>{traits}</text>
            <text x={x + 165} y="180" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">{i === 0 ? "units 2, 4, 5 of this course" : "units 8, 9 of this course"}</text>
          </g>
        );
      })}
      <rect x="30" y="206" width="660" height="86" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="46" y="228" fontSize="7.8" className="fill-current text-foreground" fontWeight="800">Why the split is old but not perfect</text>
      {["• fungi were botany's for centuries — now they stand in their own kingdom", "• microbes belong to neither, hence microbiology", "• modern biology cuts across the line: genetics, ecology, biotechnology study both"].map((t, i) => (
        <text key={t} x="46" y={248 + i * 15} fontSize="7.2" className="fill-current text-muted-foreground">{t}</text>
      ))}
    </svg>
  );
}
