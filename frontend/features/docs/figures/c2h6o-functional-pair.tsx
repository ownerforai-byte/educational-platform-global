// C2H6OFunctionalPair figure. Theme-aware.
export function C2H6OFunctionalPair({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Ethanol and dimethyl ether functional isomers of C2H6O">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">C₂H₆O — same atoms, different function</text>
      <rect x="40" y="52" width="280" height="110" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="180" y="78" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">ethanol CH₃CH₂OH</text>
      <text x="180" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">functional group: –OH (alcohol)</text>
      <text x="180" y="128" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">liquid, b.p. 78 °C, reacts with Na</text>
      <rect x="340" y="52" width="280" height="110" rx="10" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" />
      <text x="480" y="78" fontSize="11.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">dimethyl ether CH₃–O–CH₃</text>
      <text x="480" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">functional group: –O– (ether)</text>
      <text x="480" y="128" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">gas, b.p. −24 °C, inert to Na</text>
      <text x="330" y="196" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Different functional group → different chemistry entirely</text>
    </svg>
  );
}
