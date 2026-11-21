/** Interdisciplinary map — biology at the centre. Well-detailed. Theme-aware. */
export function InterdisciplinaryMap({ className }: { className?: string }) {
  const spokes: [string, string, string][] = [
    ["Chemistry", "biomolecules, enzymes", "top-left"],
    ["Physics", "instruments, energy laws", "top-right"],
    ["Mathematics", "models, statistics", "right"],
    ["Geography", "climate, habitats", "bottom-right"],
    ["Medicine", "health, disease", "bottom-left"],
    ["Agriculture", "crops, livestock", "left"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Interdisciplinary map biology at centre connected to chemistry physics mathematics geography medicine agriculture hub diagram">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Biology at the centre of the sciences</text>
      <rect x="30" y="44" width="660" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <circle cx="360" cy="154" r="46" className="fill-current text-sky-500/25" stroke="currentColor" strokeWidth="2.6" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="150" fontSize="9.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BIOLOGY</text>
      <text x="360" y="166" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">the bridge science</text>
      {spokes.map(([name, detail, pos], i) => {
        const angle = (i * 60 - 90) * Math.PI / 180;
        const x = 360 + 150 * Math.cos(angle);
        const y = 154 + 78 * Math.sin(angle);
        return (
          <g key={name}>
            <line x1={360 + 46 * Math.cos(angle)} y1={154 + 46 * Math.sin(angle)} x2={x} y2={y} className="stroke-current text-stone-500" strokeWidth="1.8" />
            <rect x={x - 48} y={y - 14} width="96" height="28" rx="7" className="fill-current text-slate-500/15" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
            <text x={x} y={y - 2} fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            <text x={x} y={y + 9} fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{detail}</text>
          </g>
        );
      })}
      <text x="46" y="256" fontSize="7" className="fill-current text-muted-foreground">Each spoke is a two-way trade: biology borrows methods and lends questions.</text>
    </svg>
  );
}
