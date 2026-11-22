// MacroSevenPanel figure. Theme-aware.
export function MacroSevenPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Seven macro minerals with their biological functions">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The macro seven — more than 100 mg/day</text>
      {[
        ["Ca", "bones, clotting, muscle", "rgb(59 130 246)"],
        ["P", "ATP, DNA, bones", "rgb(16 185 129)"],
        ["K", "intracellular cation, nerves", "rgb(245 158 11)"],
        ["Na", "extracellular cation, fluids", "rgb(239 68 68)"],
        ["Cl", "gastric HCl", "rgb(148 163 184)"],
        ["Mg", "chlorophyll, enzymes", "rgb(139 92 246)"],
        ["S", "proteins (Cys, Met)", "rgb(20 184 166)"],
      ].map(([m, job, col], i) => {
        const x = 40 + (i % 4) * 152;
        const y = 55 + Math.floor(i / 4) * 78;
        return (
          <g key={m as string}>
            <rect x={x} y={y} width="140" height="66" rx="8" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1" />
            <text x={x + 70} y={y + 24} fontSize="13" fontWeight="800" textAnchor="middle" fill={col as string}>{m as string}</text>
            <text x={x + 70} y={y + 44} fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{job as string}</text>
          </g>
        );
      })}
      <text x="330" y="222" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Structure (Ca, P), electricity (Na, K, Cl), catalysis (Mg), protein (S)</text>
    </svg>
  );
}
