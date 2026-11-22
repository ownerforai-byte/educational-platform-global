// NaKPumpCycle figure. Theme-aware.
export function NaKPumpCycle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Sodium potassium ATPase cycle pumping three sodium out and two potassium in">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Na⁺/K⁺ ATPase — one ATP, five ions</text>
      <rect x="120" y="60" width="420" height="90" rx="14" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" strokeWidth="2" />
      <text x="330" y="82" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">membrane (pump spans it)</text>
      <text x="180" y="110" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">OUT</text>
      <text x="180" y="132" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">3 Na⁺ expelled ↑</text>
      <text x="480" y="110" fontSize="11" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">IN</text>
      <text x="480" y="132" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">2 K⁺ imported ↓</text>
      <path d="M 300 105 L 360 105" stroke="rgb(245 158 11)" strokeWidth="3" markerEnd="url(#nkc-a)" />
      <text x="330" y="95" fontSize="10" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">ATP → ADP</text>
      <text x="330" y="170" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">3 Na⁺ out : 2 K⁺ in — per ATP</text>
      <text x="330" y="195" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">electrogenic (net +1 out) · runs constantly against the leaks</text>
      <text x="330" y="215" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">maintains resting potential ≈ −70 mV, cell volume, and the Na⁺ gradient</text>
      <defs>
        <marker id="nkc-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
    </svg>
  );
}
