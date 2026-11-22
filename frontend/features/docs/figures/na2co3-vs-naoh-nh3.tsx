// Na2co3VsNaohNh3 figure. Theme-aware.
export function Na2co3VsNaohNh3({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Distinguishing test between sodium hydroxide and sodium carbonate using ammonium salt">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The test that separates them</text>
      <rect x="60" y="70" width="240" height="90" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="180" y="95" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">NH₄Cl + NaOH, warm</text>
      <text x="180" y="118" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">NH₄Cl + NaOH → NaCl + NH₃↑ + H₂O</text>
      <text x="180" y="142" fontSize="10" textAnchor="middle" fill="rgb(239 68 68)">pungent gas — turns red litmus blue</text>
      <rect x="360" y="70" width="240" height="90" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="480" y="95" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">NH₄Cl + Na₂CO₃, warm</text>
      <text x="480" y="118" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">NO ammonia</text>
      <text x="480" y="142" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">carbonate is too weak a base</text>
      <text x="330" y="195" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Both are alkaline — only the delivered hydroxide can push NH₄⁺ off its proton</text>
    </svg>
  );
}
