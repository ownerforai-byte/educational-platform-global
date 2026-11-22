// EthanolThreeWays figure. Theme-aware.
export function EthanolThreeWays({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Ethanol written as condensed structural and bond line formulas">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Ethanol three ways</text>
      <rect x="40" y="55" width="180" height="110" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="130" y="80" fontSize="11" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">CONDENSED</text>
      <text x="130" y="118" fontSize="14" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CH₃CH₂OH</text>
      <text x="130" y="145" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">(also written C₂H₅OH)</text>
      <rect x="240" y="55" width="180" height="110" rx="10" fill="rgb(16 185 129)" opacity="0.08" stroke="rgb(16 185 129)" />
      <text x="330" y="80" fontSize="11" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">STRUCTURAL</text>
      <text x="285" y="115" fontSize="10.5" className="fill-current text-foreground">H</text>
      <text x="330" y="115" fontSize="10.5" className="fill-current text-foreground">H</text>
      <text x="375" y="115" fontSize="10.5" className="fill-current text-foreground">H</text>
      <line x1="292" y1="122" x2="322" y2="122" stroke="rgb(16 185 129)" strokeWidth="2" />
      <line x1="338" y1="122" x2="368" y2="122" stroke="rgb(16 185 129)" strokeWidth="2" />
      <line x1="382" y1="122" x2="402" y2="122" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="285" y="140" fontSize="10.5" className="fill-current text-foreground">H–C</text>
      <text x="327" y="140" fontSize="10.5" className="fill-current text-foreground">C–O–H</text>
      <text x="330" y="162" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">every bond drawn</text>
      <rect x="440" y="55" width="180" height="110" rx="10" fill="rgb(245 158 11)" opacity="0.08" stroke="rgb(245 158 11)" />
      <text x="530" y="80" fontSize="11" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">BOND-LINE</text>
      <line x1="480" y1="130" x2="515" y2="105" stroke="rgb(245 158 11)" strokeWidth="3" />
      <line x1="515" y1="105" x2="550" y2="130" stroke="rgb(245 158 11)" strokeWidth="3" />
      <text x="558" y="135" fontSize="10.5" fontWeight="800" className="fill-current text-foreground">OH</text>
      <text x="530" y="162" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">two carbons implied</text>
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Same molecule, three speeds of writing — fluency in all three is basic literacy</text>
    </svg>
  );
}
