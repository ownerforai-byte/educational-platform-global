// Wood's bridge demonstration of atomic hydrogen. Theme-aware.
export function WoodsBridgeAfterglow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Wood's bridge tube where hydrogen becomes atomic at the discharge arc and recombines with a third flame at the far end">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Wood's bridge: atomic hydrogen made visible</text>
      <rect x="50" y="90" width="560" height="50" rx="14" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
      <path d="M 610 100 q 30 15 0 30" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
      <rect x="120" y="82" width="60" height="66" rx="8" className="fill-current" style={{ color: "rgb(168 85 247)" }} opacity="0.3" />
      <text x="150" y="150" fontSize="11" textAnchor="middle" fill="rgb(168 85 247)">discharge arc</text>
      <text x="60" y="80" fontSize="11" className="fill-current text-muted-foreground">H₂ in →</text>
      <path d="M 560 115 q 10 -18 24 -18" stroke="rgb(245 158 11)" strokeWidth="3" fill="none" />
      <text x="540" y="82" fontSize="11.5" fontWeight="800" fill="rgb(245 158 11)">third flame</text>
      <text x="150" y="105" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">H₂ → 2H</text>
      <text x="380" y="105" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">atoms stream across the bridge</text>
      <text x="330" y="200" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">At the far end the atoms recombine: H + H → H₂ + heat</text>
      <text x="330" y="222" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">A flame burns where no gas is fed - recombination heat made visible</text>
    </svg>
  );
}
