// Methane sp3 formation in four stages. Theme-aware.
export function MethaneSp3Stages({ className }: { className?: string }) {
  const stages: [string, string][] = [
    ["1. Ground state", "1s2 2s2 2p2 - only 2 unpaired"],
    ["2. Promotion", "2s1 2p3 - four unpaired, energy invested"],
    ["3. Hybridisation", "four sp3 hybrids, tetrahedral directions"],
    ["4. Overlap", "four C-H sigma bonds, 109.5 degrees"],
  ];
  return (
    <svg viewBox="0 0 700 300" className={className} role="img" aria-label="Methane sp3 hybridisation in four stages from ground state through promotion hybridisation and overlap giving tetrahedral shape">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Methane in four stages (NEB 2024)</text>
      {stages.map(([head, body], i) => (
        <g key={i}>
          <rect x="24" y={46 + i * 58} width="652" height="48" rx="8" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.08" />
          <rect x="24" y={46 + i * 58} width="652" height="48" rx="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <text x="40" y={66 + i * 58} fontSize="12.5" className="fill-current text-foreground" fontWeight="800">{head}</text>
          <text x="40" y={86 + i * 58} fontSize="11" className="fill-current text-muted-foreground">{body}</text>
          {i < 3 && <path d={`M 660 ${70 + i * 58} L 676 ${70 + i * 58}`} stroke="currentColor" strokeWidth="2" />}
        </g>
      ))}
    </svg>
  );
}
