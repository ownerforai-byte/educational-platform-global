// Solved: naming element 104 by digit roots. Theme-aware.
export function DigitRootNaming({ className }: { className?: string }) {
  const steps: [string, string][] = [
    ["Split Z into digits", "104 → 1 · 0 · 4"],
    ["Convert each digit to its root", "1 = un · 0 = nil · 4 = quad"],
    ["Join the roots", "un + nil + quad = unnilquad"],
    ["Add the ending -ium", "unnilquadium (symbol Unq)"],
  ];
  return (
    <svg viewBox="0 0 720 230" className={className} role="img" aria-label="Solved systematic IUPAC naming of element 104 one zero four un nil quad plus ium gives unnilquadium symbol Unq temporary name">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — name element Z = 104 systematically</text>
      {steps.map(([t, d], i) => (
        <g key={t}>
          <rect x="30" y={40 + i * 42} width="660" height="36" rx="9" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(16 185 129 / 0.85)" }} />
          <text x="46" y={58 + i * 42} fontSize="9.5" className="fill-current text-emerald-600" fontWeight="800">{i + 1}. {t}</text>
          <text x="674" y={58 + i * 42} fontSize="9.5" textAnchor="end" className="fill-current text-foreground" fontWeight="700">{d}</text>
        </g>
      ))}
      <rect x="30" y="210" width="660" height="0" />
      <text x="360" y="224" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Digit roots: 0 nil · 1 un · 2 bi · 3 tri · 4 quad · 5 pent · 6 hex · 7 sept · 8 oct · 9 enn. The name is temporary until IUPAC confirms the discovery.</text>
    </svg>
  );
}
