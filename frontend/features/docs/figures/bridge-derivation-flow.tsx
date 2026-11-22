// Derivation flow from p = CRT to the bridge equation. Theme-aware.
export function BridgeDerivationFlow({ className }: { className?: string }) {
  const steps: [string, string][] = [
    ["1. Ideal gas line", "p = nRT/V = [i]RT"],
    ["2. Substitute into Kp", "replace every p with [i]RT"],
    ["3. Collect RT factors", "(RT)^(c+d-a-b) emerges"],
    ["4. Name the exponent", "dn = gas moles products - reactants"],
    ["5. The bridge", "Kp = Kc(RT)^dn"],
  ];
  return (
    <svg viewBox="0 0 660 310" className={className} role="img" aria-label="Five step derivation of Kp equals Kc times RT to the delta n from the ideal gas law">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">One gas law builds the bridge</text>
      {steps.map(([t, s], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="8" className="fill-current" style={{ color: i === 4 ? "rgb(16 185 129)" : "rgb(59 130 246)" }} opacity={i === 4 ? 0.2 : 0.1} />
          <text x="58" y={71 + i * 48} fontSize="12" fontWeight="800" className="fill-current text-foreground">{t}</text>
          <text x="300" y={71 + i * 48} fontSize="12.5" fontWeight={i === 4 ? 800 : 600} style={{ fill: i === 4 ? "rgb(16 185 129)" : "rgb(59 130 246)" }}>{s}</text>
        </g>
      ))}
      <text x="330" y="298" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">State p = [i]RT in the exam - the whole (RT)^dn factor is born there</text>
    </svg>
  );
}
