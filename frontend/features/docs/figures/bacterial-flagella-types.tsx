/** Bacterial flagella arrangements — how motility is wired. Well-detailed. Theme-aware. */
export function BacterialFlagellaTypes({ className }: { className?: string }) {
  const types: [string, string, string][] = [
    ["Monotrichous", "one flagellum at one end — fastest straight runner", "rgb(2 132 199)"],
    ["Lophotrichous", "a tuft of flagella at one pole", "rgb(22 163 74)"],
    ["Amphitrichous", "flagella at both poles — can reverse", "rgb(245 158 11)"],
    ["Peritrichous", "flagella all around the body", "rgb(139 92 246)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Bacterial flagella arrangements monotrichous lophotrichous amphitrichous peritrichous motility chemotaxis run and tumble flagellin basal body">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Flagella — four wiring patterns</text>
      {types.map(([name, detail, rgb], i) => {
        const x = 30 + i * 170;
        const cx = x + 85;
        return (
          <g key={name}>
            <rect x={x} y="44" width="160" height="200" rx="12" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={cx} y="66" fontSize="8.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            {/* bacterium */}
            <rect x={cx - 20} y={128} width="40" height="16" rx="8" className="fill-current" style={{ color: rgb, opacity: 0.4 }} stroke="currentColor" strokeWidth="1.4" />
            {i === 0 && <path d={`M${cx + 20} 136 q20 -6 34 4 q-16 8 -34 -4`} className="fill-none stroke-current" strokeWidth="2" style={{ color: rgb }} />}
            {i === 1 && [0, 1, 2].map((j) => (
              <path key={j} d={`M${cx + 20} ${132 + j * 4} q20 ${-8 + j * 8} 34 ${j * 4}`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: rgb }} />
            ))}
            {i === 2 && (
              <g>
                <path d={`M${cx + 20} 136 q18 -6 30 2`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: rgb }} />
                <path d={`M${cx - 20} 136 q-18 -6 -30 2`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: rgb }} />
              </g>
            )}
            {i === 3 && [0, 60, 120, 180, 240, 300].map((a) => (
              <path key={a} d={`M${cx + 18 * Math.cos((a * Math.PI) / 180)} ${136 + 7 * Math.sin((a * Math.PI) / 180)} q${14 * Math.cos((a * Math.PI) / 180)} ${-4} ${22 * Math.cos((a * Math.PI) / 180)} ${8 * Math.sin((a * Math.PI) / 180)}`} className="fill-none stroke-current" strokeWidth="1.6" style={{ color: rgb }} />
            ))}
            <text x={cx} y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(0, 40)}</text>
            {detail.length > 40 && <text x={cx} y="210" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(40, 80)}</text>}
            <text x={cx} y="232" fontSize="6.8" textAnchor="middle" className="fill-current" style={{ color: rgb }}>{["polar single", "polar tuft", "both poles", "all around"][i]}</text>
          </g>
        );
      })}
      <rect x="30" y="258" width="660" height="34" rx="8" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="272" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Rotation (not whipping) drives the run; reversing the motor gives the tumble — how bacteria steer toward food (chemotaxis).</text>
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name the arrangement from the pattern — one, tuft, both ends, all around.</text>
    </svg>
  );
}
