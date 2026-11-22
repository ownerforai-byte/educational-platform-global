// Ice table style calculation steps. Theme-aware.
export function IceTableSteps({ className }: { className?: string }) {
  const steps: [string, string][] = [
    ["1. Balance the equation", "get the coefficients that become powers"],
    ["2. Tabulate concentrations", "list every species at equilibrium"],
    ["3. Write the Kc expression", "products over reactants, solids out"],
    ["4. Substitute and solve", "isolate the unknown, root if squared"],
    ["5. Check units and size", "does the answer make chemical sense?"],
  ];
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Five step recipe for equilibrium concentration calculations from balancing the equation to checking the answer">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The five-line recipe</text>
      {steps.map(([t, s], i) => (
        <g key={i}>
          <rect x="40" y={44 + i * 46} width="580" height="38" rx="8" className="fill-current" style={{ color: i === 4 ? "rgb(16 185 129)" : "rgb(59 130 246)" }} opacity="0.12" />
          <text x="58" y={68 + i * 46} fontSize="12" fontWeight="800" className="fill-current text-foreground">{t}</text>
          <text x="330" y={68 + i * 46} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="290" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Mechanical discipline beats cleverness in every equilibrium numerical</text>
    </svg>
  );
}
