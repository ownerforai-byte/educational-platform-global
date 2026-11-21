/** Branch tree three divisions — botany, zoology, microbiology. Well-detailed. Theme-aware. */
export function BranchTreeDivisions({ className }: { className?: string }) {
  const divisions: [string, string, string, string][] = [
    ["Botany", "the plant kingdom: algae to angiosperms", "morphology, anatomy, taxonomy, ecology of plants", "rgb(22 163 74)"],
    ["Zoology", "the animal kingdom: protozoa to mammals", "earthworm, frog, human physiology and diversity", "rgb(2 132 199)"],
    ["Microbiology", "the invisible kingdom: bacteria, viruses, fungi", "Mucor, yeast, disease, fermentation", "rgb(139 92 246)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Branch tree three divisions botany zoology microbiology biology main subdivisions scope fields examples">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Biology's three main divisions</text>
      <rect x="250" y="44" width="220" height="40" rx="10" className="fill-current text-sky-500/20" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="69" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BIOLOGY</text>
      {[0, 1, 2].map((i) => (
        <line key={i} x1={360} y1="84" x2={135 + i * 225} y2="112" className="stroke-current text-stone-500" strokeWidth="2" />
      ))}
      {divisions.map(([name, scope, topics, rgb], i) => {
        const x = 30 + i * 228;
        return (
          <g key={name}>
            <rect x={x} y="112" width="210" height="150" rx="10" className="fill-current text-slate-500/10" strokeWidth="2.2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 105} y="136" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            <text x={x + 14} y="160" fontSize="7" className="fill-current text-muted-foreground">{scope.slice(0, 34)}</text>
            <text x={x + 14} y="174" fontSize="7" className="fill-current text-muted-foreground">{scope.slice(34, 68)}</text>
            <text x={x + 14} y="200" fontSize="6.8" className="fill-current" style={{ color: rgb }}>{topics.slice(0, 34)}</text>
            <text x={x + 14} y="214" fontSize="6.8" className="fill-current" style={{ color: rgb }}>{topics.slice(34, 68)}</text>
            <text x={x + 105} y="246" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{["plants", "animals", "microbes"][i]}</text>
          </g>
        );
      })}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name the division, its object of study, and two sub-branches within it.</text>
    </svg>
  );
}
