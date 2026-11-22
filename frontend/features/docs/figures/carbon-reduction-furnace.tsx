// CarbonReductionFurnace figure. Theme-aware.
export function CarbonReductionFurnace({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Carbon reduction smelter with coke converting oxide to metal through carbon monoxide">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Carbon reduction — coke does the chemistry</text>
      <rect x="220" y="55" width="220" height="130" rx="10" fill="rgb(239 68 68)" opacity="0.08" stroke="rgb(239 68 68)" strokeWidth="2" />
      <text x="330" y="80" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">roasted oxide + coke, 1000–1500 °C</text>
      <text x="330" y="106" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">C + O₂ → CO₂ · CO₂ + C → 2CO</text>
      <text x="330" y="132" fontSize="12" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">ZnO + C → Zn + CO</text>
      <text x="330" y="156" fontSize="12" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">Fe₂O₃ + 3CO → 2Fe + 3CO₂</text>
      <text x="330" y="178" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">Zn distils out at 907 °C — self-refining</text>
      <text x="80" y="120" fontSize="10.5" className="fill-current text-muted-foreground">CO is made</text>
      <text x="80" y="138" fontSize="10.5" className="fill-current text-muted-foreground">inside the</text>
      <text x="80" y="156" fontSize="10.5" className="fill-current text-muted-foreground">furnace —</text>
      <text x="80" y="174" fontSize="10.5" className="fill-current text-muted-foreground">no delivery needed</text>
      <text x="545" y="120" fontSize="10.5" className="fill-current text-muted-foreground">works for</text>
      <text x="545" y="138" fontSize="10.5" className="fill-current text-muted-foreground">Zn Fe Pb Cu;</text>
      <text x="545" y="156" fontSize="10.5" className="fill-current text-muted-foreground">fails for Na Mg Al</text>
    </svg>
  );
}
