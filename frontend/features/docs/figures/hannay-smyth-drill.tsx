// Worked Hannay-Smyth and dipole-ratio calculation for HF. Theme-aware.
export function HannaySmythDrill({ className }: { className?: string }) {
  const steps: [string, string][] = [
    ["Given", "mu observed = 1.91 D, bond length = 92 pm"],
    ["Full ionic dipole", "mu = q x d = 1.602e-19 C x 92e-12 m = 1.47e-29 C.m = 4.42 D"],
    ["Ratio method", "percent ionic = 1.91 / 4.42 x 100 = about 43%"],
    ["Hannay-Smyth check", "16(1.9) + 3.5(1.9)^2 = 30.4 + 12.6 = about 43%"],
  ];
  return (
    <svg viewBox="0 0 700 280" className={className} role="img" aria-label="Worked calculation of percentage ionic character of hydrogen fluoride by dipole ratio and Hannay Smyth equation both giving 43 percent">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Worked: percent ionic character of HF</text>
      {steps.map(([head, body], i) => (
        <g key={i}>
          <rect x="24" y={46 + i * 54} width="652" height="46" rx="8" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.08" />
          <rect x="24" y={46 + i * 54} width="652" height="46" rx="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <text x="40" y={64 + i * 54} fontSize="12" className="fill-current text-foreground" fontWeight="800">{head}</text>
          <text x="40" y={82 + i * 54} fontSize="11" className="fill-current text-muted-foreground">{body}</text>
        </g>
      ))}
    </svg>
  );
}
