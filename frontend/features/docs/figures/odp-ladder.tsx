// ODP ladder CFC HCFC HFC. Theme-aware.
export function OdpLadder({ className }: { className?: string }) {
  const rungs: [string, string, string][] = [
    ["CFCs (Freons)", "no H, Cl fully exposed - highest ODP, banned", "rgb(239 68 68)"],
    ["HCFCs", "some H - troposphere breakdown reduces ODP, transitional", "rgb(245 158 11)"],
    ["HFCs", "no Cl at all - ODP zero, but strong greenhouse gases", "rgb(14 165 233)"],
    ["HFOs / naturals", "low GWP next generation", "rgb(16 185 129)"],
  ];
  return (
    <svg viewBox="0 0 660 270" className={className} role="img" aria-label="Ozone depletion potential ladder from CFCs through HCFCs and HFCs to newer refrigerants">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The refrigerant staircase</text>
      {rungs.map(([t, s, c], i) => (
        <g key={i}>
          <rect x={60 + i * 20} y={46 + i * 50} width="560" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x={80 + i * 20} y={63 + i * 50} fontSize="12" fontWeight="800" style={{ fill: c }}>{t}</text>
          <text x={80 + i * 20} y={80 + i * 50} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="258" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Trading one atmospheric problem for another - policy as chemistry triage</text>
    </svg>
  );
}
