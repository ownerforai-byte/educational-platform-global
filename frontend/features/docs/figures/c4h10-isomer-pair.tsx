// C4H10IsomerPair figure. Theme-aware.
export function C4H10IsomerPair({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Butane and isobutane the two chain isomers of C4H10">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">C₄H₁₀ — one formula, two compounds</text>
      <rect x="40" y="52" width="280" height="110" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="78" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">n-butane (straight chain)</text>
      <text x="180" y="108" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CH₃–CH₂–CH₂–CH₃</text>
      <text x="180" y="138" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">b.p. −0.5 °C · unbranched skeleton</text>
      <rect x="340" y="52" width="280" height="110" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="78" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">2-methylpropane (branched)</text>
      <text x="480" y="108" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CH₃–CH(CH₃)–CH₃</text>
      <text x="480" y="138" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">b.p. −11.7 °C · branched skeleton</text>
      <text x="330" y="196" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Same formula, different skeletons — chain isomerism</text>
    </svg>
  );
}
