// Band theory panel: conductor, semiconductor, insulator gaps. Theme-aware.
export function BandTheoryPanel({ className }: { className?: string }) {
  const cases: [string, string, string][] = [
    ["Conductor (Cu)", "bands overlap or conduction partly filled", "rgb(16 185 129)"],
    ["Semiconductor (Si)", "small gap, about 1 eV", "rgb(245 158 11)"],
    ["Insulator (diamond)", "large gap, about 5.5 eV", "rgb(244 63 94)"],
  ];
  return (
    <svg viewBox="0 0 680 300" className={className} role="img" aria-label="Band theory panel comparing conductor overlapping bands semiconductor small one electron volt gap and insulator large 5.5 electron volt gap">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Band theory: the gap decides everything</text>
      {cases.map(([label, note, color], i) => {
        const x = 40 + i * 220;
        return (
          <g key={i}>
            <rect x={x} y="60" width="180" height="200" rx="10" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <text x={x + 90} y="86" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{label}</text>
            {i === 0 ? (
              <g>
                <rect x={x + 40} y="150" width="100" height="34" className="fill-current" style={{ color }} opacity="0.3" />
                <rect x={x + 40} y="110" width="100" height="34" className="fill-current" style={{ color }} opacity="0.15" />
                <text x={x + 90} y="172" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground">conduction (part full)</text>
                <text x={x + 90} y="132" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground">valence</text>
              </g>
            ) : (
              <g>
                <rect x={x + 40} y="160" width="100" height="30" className="fill-current" style={{ color }} opacity="0.15" />
                <rect x={x + 40} y={i === 1 ? 120 : 90} width="100" height="30" className="fill-current" style={{ color }} opacity="0.15" />
                <text x={x + 90} y={i === 1 ? 112 : 82} fontSize="8.5" textAnchor="middle" className="fill-current text-foreground">conduction (empty)</text>
                <text x={x + 90} y="200" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground">valence (full)</text>
                <text x={x + 90} y={i === 1 ? 145 : 118} fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">gap</text>
              </g>
            )}
            <text x={x + 90} y="248" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{note}</text>
          </g>
        );
      })}
    </svg>
  );
}
