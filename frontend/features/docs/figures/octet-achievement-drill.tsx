// Drill: which noble gas does each ion copy? Theme-aware.
export function OctetAchievementDrill({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["Na+", "lost 1 of 2,8,1", "copies Ne (2, 8)"],
    ["Mg2+", "lost 2 of 2,8,2", "copies Ne (2, 8)"],
    ["O2-", "gained 2 onto 2,6", "copies Ne (2, 8)"],
    ["Cl-", "gained 1 onto 2,8,7", "copies Ar (2, 8, 8)"],
  ];
  return (
    <svg viewBox="0 0 640 300" className={className} role="img" aria-label="Drill table matching sodium magnesium oxide and chloride ions to the noble gas configurations they achieve">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Drill: which noble gas does each ion copy?</text>
      {rows.map(([ion, move, target], i) => (
        <g key={i}>
          <rect x="30" y={46 + i * 58} width="250" height="48" rx="8" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.14" />
          <text x="52" y={76 + i * 58} fontSize="15" className="fill-current text-foreground" fontWeight="800">{ion}</text>
          <text x="130" y={76 + i * 58} fontSize="10.5" className="fill-current text-muted-foreground">{move}</text>
          <path d={`M 292 ${70 + i * 58} L 340 ${70 + i * 58}`} stroke="currentColor" strokeWidth="2" />
          <rect x="350" y={46 + i * 58} width="250" height="48" rx="8" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.14" />
          <text x="372" y={76 + i * 58} fontSize="12.5" className="fill-current text-foreground" fontWeight="700">{target}</text>
        </g>
      ))}
    </svg>
  );
}
