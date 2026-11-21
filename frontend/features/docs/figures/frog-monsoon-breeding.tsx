/** Frog monsoon breeding timing — the calendar of a pond. Well-detailed. Theme-aware. */
export function FrogMonsoonBreeding({ className }: { className?: string }) {
  const seasons: [string, string, string][] = [
    ["Monsoon (Jun–Sep)", "breeding: males croak, amplexus, eggs in water", "rgb(2 132 199)"],
    ["Post-monsoon", "tadpoles grow; froglets disperse to moist ground", "rgb(16 185 129)"],
    ["Winter (Dec–Feb)", "hibernation: buried in mud, metabolism slows", "rgb(139 92 246)"],
    ["Summer (Apr–Jun)", "aestivation in dry spells; activity at night", "rgb(217 119 6)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog monsoon breeding timing seasons calendar pond croaking amplexus hibernation aestivation Nepal climate amphibian life rhythm">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The frog's year — a calendar set by water</text>
      {/* ring calendar */}
      <circle cx="220" cy="150" r="80" className="fill-none stroke-current" strokeWidth="30" style={{ color: "rgb(2 132 199 / 0.15)" }} />
      {seasons.map(([name, detail, rgb], i) => {
        const angle = (i * 90 - 90) * Math.PI / 180;
        const x = 220 + 100 * Math.cos(angle);
        const y = 150 + 100 * Math.sin(angle);
        return (
          <g key={name}>
            <circle cx={x} cy={y} r="6" className="fill-current" style={{ color: rgb }} />
            <text x={x + (x > 220 ? 12 : -12)} y={y + 3} fontSize="6.6" textAnchor={x > 220 ? "start" : "end"} className="fill-current text-foreground" fontWeight="700">{name.split(" ")[0]}</text>
          </g>
        );
      })}
      <text x="220" y="146" fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">one year</text>
      <text x="220" y="160" fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">water rules all</text>
      {/* season table */}
      <rect x="400" y="44" width="290" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {seasons.map(([name, detail, rgb], i) => (
        <g key={name}>
          <text x="416" y={74 + i * 48} fontSize="7" className="fill-current" style={{ color: rgb }} fontWeight="800">{name}</text>
          <text x="416" y={90 + i * 48} fontSize="6.6" className="fill-current text-muted-foreground">{detail.slice(0, 46)}</text>
          <text x="416" y={104 + i * 48} fontSize="6.6" className="fill-current text-muted-foreground">{detail.slice(46, 92)}</text>
        </g>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: breeding in monsoon, hibernation in winter, aestivation in summer — three seasons, three behaviours.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Both dormancy types are water-driven: too cold or too dry, and the frog simply waits.</text>
    </svg>
  );
}
