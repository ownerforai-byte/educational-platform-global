// PrimaryVsSecondary figure. Theme-aware.
export function PrimaryVsSecondary({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Primary active transport using ATP versus secondary using an ion gradient">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Primary pays ATP; secondary spends a gradient</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">PRIMARY</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">direct energy: ATP hydrolysis</text>
      <text x="180" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Na⁺/K⁺ pump — 3 Na⁺ out, 2 K⁺ in</text>
      <text x="180" y="156" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">both ions against gradients</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">SECONDARY</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">energy: another ion's gradient</text>
      <text x="480" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Na⁺–glucose symport — Na⁺ down,</text>
      <text x="480" y="156" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">glucose up; ATP was spent upstream</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Same family, different paymaster — name which is which</text>
    </svg>
  );
}
