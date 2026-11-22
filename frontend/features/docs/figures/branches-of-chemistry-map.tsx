// Five main branches of chemistry. Theme-aware.
export function BranchesOfChemistryMap({ className }: { className?: string }) {
  const branches: [string, string, string][] = [
    ["Organic", "carbon compounds — fuels, drugs, polymers", "rgb(16 185 129 / 0.9)"],
    ["Inorganic", "everything else — metals, minerals, salts", "rgb(14 165 233 / 0.9)"],
    ["Physical", "energy, rates, equilibrium — the why", "rgb(139 92 246 / 0.9)"],
    ["Analytical", "what is it, how much — identification", "rgb(245 158 11 / 0.9)"],
    ["Biochemistry", "chemistry of life — enzymes, DNA", "rgb(244 63 94 / 0.9)"],
  ];
  return (
    <svg viewBox="0 0 720 230" className={className} role="img" aria-label="Five branches of chemistry organic inorganic physical analytical and biochemistry with example topics for each branch">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Chemistry's five main branches</text>
      <rect x="260" y="40" width="200" height="36" rx="9" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="64" fontSize="11" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">CHEMISTRY</text>
      {branches.map(([name, ex, color], i) => {
        const x = 40 + i * 134;
        return (
          <g key={name}>
            <line x1="360" y1="76" x2={x + 60} y2="110" className="stroke-current" strokeWidth="1.4" style={{ color }} />
            <rect x={x} y="110" width="120" height="66" rx="9" className="fill-current" style={{ color }} opacity="0.12" />
            <rect x={x} y="110" width="120" height="66" rx="9" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color }} />
            <text x={x + 60} y="132" fontSize="9.5" textAnchor="middle" className="fill-current" style={{ color }} fontWeight="800">{name}</text>
            <text x={x + 60} y="150" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{ex.slice(0, 26)}</text>
            <text x={x + 60} y="164" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{ex.slice(26, 52)}</text>
          </g>
        );
      })}
      <rect x="30" y="196" width="660" height="24" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="212" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">The branches interlock: a drug (organic) is assayed (analytical), its reaction rate studied (physical) and its enzyme binding explained (biochemistry).</text>
    </svg>
  );
}
