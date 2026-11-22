// Law of mass action statement panel. Theme-aware.
export function MassActionStatement({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Law of mass action: reaction rate is proportional to the product of the active masses of the reactants raised to their coefficients">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Guldberg and Waage, 1864</text>
      <rect x="40" y="50" width="580" height="64" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.14" />
      <text x="60" y="78" fontSize="13" fontWeight="800" className="fill-current text-foreground">"Rate is proportional to the product of the active masses</text>
      <text x="60" y="100" fontSize="13" fontWeight="800" className="fill-current text-foreground">of the reactants, each raised to its coefficient."</text>
      <rect x="40" y="132" width="280" height="56" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.14" />
      <text x="180" y="166" fontSize="16" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">aA + bB = products</text>
      <rect x="340" y="132" width="280" height="56" rx="10" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.14" />
      <text x="480" y="166" fontSize="16" fontWeight="800" textAnchor="middle" fill="rgb(245 158 11)">rate = k[A]^a[B]^b</text>
      <text x="330" y="218" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Concentrations - not amounts - drive chemistry</text>
    </svg>
  );
}
