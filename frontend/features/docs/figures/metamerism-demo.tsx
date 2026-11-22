// MetamerismDemo figure. Theme-aware.
export function MetamerismDemo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Metamerism unequal alkyl groups around a hetero atom">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Metamerism — unequal alkyl halves</text>
      <rect x="40" y="52" width="280" height="110" rx="10" fill="rgb(139 92 246)" opacity="0.1" stroke="rgb(139 92 246)" />
      <text x="180" y="78" fontSize="11.5" fontWeight="800" fill="rgb(139 92 246)" textAnchor="middle">C₂H₅–O–C₂H₅</text>
      <text x="180" y="106" fontSize="11" textAnchor="middle" className="fill-current text-foreground">diethyl ether</text>
      <text x="180" y="130" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">2 + 2 split around oxygen</text>
      <rect x="340" y="52" width="280" height="110" rx="10" fill="rgb(20 184 166)" opacity="0.1" stroke="rgb(20 184 166)" />
      <text x="480" y="78" fontSize="11.5" fontWeight="800" fill="rgb(20 184 166)" textAnchor="middle">CH₃–O–C₃H₇</text>
      <text x="480" y="106" fontSize="11" textAnchor="middle" className="fill-current text-foreground">methyl propyl ether</text>
      <text x="480" y="130" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">1 + 3 split around oxygen</text>
      <text x="330" y="196" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">same formula C₄H₁₀O · the alkyl groups flanking O are redistributed</text>
    </svg>
  );
}
