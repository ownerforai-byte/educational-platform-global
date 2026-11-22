// Derivation steps from rate tie to Kc. Theme-aware.
export function KcDerivationSteps({ className }: { className?: string }) {
  const steps: [string, string][] = [
    ["1. Write both rates", "forward: kf[A]^a[B]^b   reverse: kr[C]^c[D]^d"],
    ["2. Tie them at equilibrium", "kf[A]^a[B]^b = kr[C]^c[D]^d"],
    ["3. Divide both sides", "[C]^c[D]^d / [A]^a[B]^b = kf/kr"],
    ["4. Name the ratio", "Kc = kf/kr - constant at fixed T"],
  ];
  return (
    <svg viewBox="0 0 660 290" className={className} role="img" aria-label="Four derivation steps from equal forward and reverse rates to the equilibrium constant Kc">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">From rate tie to Kc in four moves</text>
      {steps.map(([t, s], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 56} width="580" height="44" rx="9" className="fill-current" style={{ color: i === 3 ? "rgb(16 185 129)" : "rgb(59 130 246)" }} opacity={i === 3 ? 0.2 : 0.12} />
          <text x="58" y={64 + i * 56} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{t}</text>
          <text x="58" y={82 + i * 56} fontSize="12" style={{ fill: i === 3 ? "rgb(16 185 129)" : "rgb(59 130 246)" }} fontWeight="700">{s}</text>
        </g>
      ))}
      <text x="330" y="280" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Two temperature-bound rate constants collapse into one temperature-bound constant</text>
    </svg>
  );
}
