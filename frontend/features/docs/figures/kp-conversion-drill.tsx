// Worked Kp conversion drill: Kc 0.16 at 300 K gives Kp 3.94. Theme-aware.
export function KpConversionDrill({ className }: { className?: string }) {
  const steps: [string, string][] = [
    ["reaction", "N2O4(g) ⇌ 2NO2(g)"],
    ["given", "Kc = 0.16 at T = 300 K"],
    ["count dn", "2 - 1 = +1, so Kp = Kc(RT)"],
    ["multiply", "Kp = 0.16 x 0.0821 x 300 = 0.16 x 24.63"],
    ["answer", "Kp = 3.94 (units: atm)"],
  ];
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Worked conversion of Kc 0.16 at 300 kelvin to Kp 3.94 for the nitrogen dioxide equilibrium">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Conversion drill: Kc to Kp</text>
      {steps.map(([t, s], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 44} width="580" height="36" rx="8" className="fill-current" style={{ color: i === 4 ? "rgb(16 185 129)" : "rgb(59 130 246)" }} opacity={i === 4 ? 0.2 : 0.1} />
          <text x="58" y={69 + i * 44} fontSize="11.5" fontWeight="800" className="fill-current text-foreground">{t}</text>
          <text x="170" y={69 + i * 44} fontSize="12.5" fontWeight={i === 4 ? 800 : 600} style={{ fill: i === 4 ? "rgb(16 185 129)" : "rgb(59 130 246)" }}>{s}</text>
        </g>
      ))}
      <text x="330" y="288" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Cross-check: RT = 24.6 &gt; 1, so Kp must exceed Kc - and it does</text>
    </svg>
  );
}
