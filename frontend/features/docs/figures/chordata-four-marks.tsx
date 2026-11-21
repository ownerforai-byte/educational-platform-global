/** Chordata four marks — notochord to backbone. Well-detailed. Theme-aware. */
export function ChordataFourMarks({ className }: { className?: string }) {
  const marks: [string, string, string][] = [
    ["Notochord", "stiff rod under the nerve cord — the skeleton's ancestor", "rgb(2 132 199)"],
    ["Dorsal hollow nerve cord", "single cord on the back, above the notochord", "rgb(139 92 246)"],
    ["Pharyngeal slits", "gill slits in the pharynx — filtering, breathing, or vestigial", "rgb(16 185 129)"],
    ["Post-anal tail", "tail extending past the anus — muscle power behind", "rgb(245 158 11)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Chordata four marks notochord dorsal hollow nerve cord pharyngeal slits post anal tail lancelet embryo diagnostic features">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Four marks that make a chordate</text>
      {marks.map(([name, detail, rgb], i) => {
        const y = 44 + i * 56;
        return (
          <g key={name}>
            <rect x="30" y={y} width="660" height="48" rx="10" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x="50" y={y + 20} fontSize="8.2" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x="50" y={y + 37} fontSize="7" className="fill-current text-muted-foreground">{detail}</text>
          </g>
        );
      })}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: all four appear at some stage of life — even humans have pharyngeal pouches and a tail-bud as embryos.</text>
    </svg>
  );
}
