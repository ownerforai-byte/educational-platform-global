// H2O2 storage rule trio. Theme-aware.
export function StorageRuleTrio({ className }: { className?: string }) {
  const rules: [string, string, string][] = [
    ["cold", "heat accelerates decomposition", "rgb(14 165 233)"],
    ["dark", "light catalyses 2H₂O₂ → 2H₂O + O₂", "rgb(59 130 246)"],
    ["wax-lined glass/plastic", "metal surfaces and dust catalyse; stabilisers added", "rgb(16 185 129)"],
  ];
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Three storage rules for hydrogen peroxide: cold, dark and wax-lined containers with stabilisers">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Keep it cold, dark, and unwetted by metal</text>
      {rules.map(([r, s, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 52} width="580" height="42" rx="9" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="58" y={64 + i * 52} fontSize="12.5" fontWeight="800" style={{ fill: c }}>{r}</text>
          <text x="58" y={82 + i * 52} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="222" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Urea and sodium pyrophosphate ride along as stabilisers; vented caps release O₂</text>
    </svg>
  );
}
