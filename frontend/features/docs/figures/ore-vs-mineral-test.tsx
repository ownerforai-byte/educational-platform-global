// OreVsMineralTest figure. Theme-aware.
export function OreVsMineralTest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Contrast between bauxite as a profitable ore and clay as a mineral that is not an ore">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Ore = mineral + profit</text>
      <rect x="40" y="55" width="270" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.12" stroke="rgb(16 185 129)" />
      <text x="175" y="82" fontSize="13" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">BAUXITE — an ORE</text>
      <text x="175" y="106" fontSize="11" textAnchor="middle" className="fill-current text-foreground">Al₂O₃ · 2H₂O</text>
      <text x="175" y="128" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">aluminium-rich, separable,</text>
      <text x="175" y="146" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">extraction pays → mined worldwide</text>
      <rect x="350" y="55" width="270" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="485" y="82" fontSize="13" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">CLAY — a mineral, not an ore</text>
      <text x="485" y="106" fontSize="11" textAnchor="middle" className="fill-current text-foreground">aluminosilicate chemistry</text>
      <text x="485" y="128" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">same metal, hopeless separation,</text>
      <text x="485" y="146" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">extraction loses money → not mined</text>
      <text x="330" y="205" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Every ore is a mineral; only profitable minerals become ores</text>
    </svg>
  );
}
