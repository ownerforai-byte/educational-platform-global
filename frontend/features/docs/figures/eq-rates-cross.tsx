// Forward and reverse rates crossing at equilibrium. Theme-aware.
export function EqRatesCross({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Forward rate falls and reverse rate rises until they cross at the equilibrium point">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Two rates, one crossing: how equilibrium arrives</text>
      <line x1="70" y1="250" x2="620" y2="250" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
      <line x1="70" y1="250" x2="70" y2="50" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
      <text x="34" y="140" fontSize="11" className="fill-current text-muted-foreground" transform="rotate(-90 34 140)">rate</text>
      <text x="345" y="272" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">time</text>
      <path d="M 70 70 Q 200 70 340 150" fill="none" stroke="rgb(16 185 129)" strokeWidth="3" />
      <text x="86" y="62" fontSize="12" fontWeight="800" fill="rgb(16 185 129)">forward rate (falls)</text>
      <path d="M 70 250 Q 220 250 340 150" fill="none" stroke="rgb(239 68 68)" strokeWidth="3" />
      <text x="150" y="238" fontSize="12" fontWeight="800" fill="rgb(239 68 68)">reverse rate (rises)</text>
      <circle cx="340" cy="150" r="6" fill="rgb(59 130 246)" />
      <line x1="340" y1="150" x2="340" y2="250" stroke="rgb(59 130 246)" strokeWidth="1.4" strokeDasharray="5 4" />
      <text x="352" y="140" fontSize="12.5" fontWeight="800" className="fill-current text-foreground">equilibrium</text>
      <text x="352" y="158" fontSize="10.5" className="fill-current text-muted-foreground">rates tie, composition constant</text>
      <rect x="470" y="80" width="140" height="58" rx="8" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.16" />
      <text x="482" y="102" fontSize="11.5" fontWeight="800" className="fill-current text-foreground">after the tie:</text>
      <text x="482" y="122" fontSize="10.5" className="fill-current text-muted-foreground">both keep running,</text>
      <text x="482" y="134" fontSize="10.5" className="fill-current text-muted-foreground">equal and opposite</text>
      <text x="330" y="286" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The crossing is not a stop - it is a perfect balance of motion</text>
    </svg>
  );
}
