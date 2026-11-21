/** Specialist branch careers — ornithology to paleontology. Well-detailed. Theme-aware. */
export function SpecialistBranchCareers({ className }: { className?: string }) {
  const branches: [string, string, string][] = [
    ["Ornithology", "birds — migration, behaviour, conservation", "crane surveys, bird tourism"],
    ["Entomology", "insects — pests, pollinators, disease vectors", "mosquito control, crop protection"],
    ["Mycology", "fungi — mushrooms, moulds, yeasts", "mushroom farming, antibiotics"],
    ["Paleontology", "fossil life — evolution's hard evidence", "dating strata, extinct lineages"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Specialist branch careers ornithology entomology mycology paleontology fields of biology applications jobs examples">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Specialist branches — narrow focus, real jobs</text>
      {branches.map(([name, what, use], i) => {
        const x = 30 + (i % 2) * 335;
        const y = 44 + Math.floor(i / 2) * 108;
        return (
          <g key={name}>
            <rect x={x} y={y} width="320" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
            <text x={x + 16} y={y + 22} fontSize="8.6" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x={x + 16} y={y + 44} fontSize="7.4" className="fill-current text-muted-foreground">{what.slice(0, 46)}</text>
            {what.length > 46 && <text x={x + 16} y={y + 58} fontSize="7.4" className="fill-current text-muted-foreground">{what.slice(46, 92)}</text>}
            <text x={x + 16} y={y + 80} fontSize="7" className="fill-current text-sky-600">{use}</text>
          </g>
        );
      })}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Each specialist branch is one group of organisms studied deeply — the -ology suffix names both the group and the job.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: match the -ology to its organism — birds, insects, fungi, fossils.</text>
    </svg>
  );
}
