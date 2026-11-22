// BlastFurnaceRoute figure. Theme-aware.
export function BlastFurnaceRoute({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Blast furnace pyrometallurgy with in-situ carbon monoxide formation and reduction equation">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Pyrometallurgy — the blast furnace</text>
      <path d="M 200 50 L 460 50 L 430 210 L 230 210 Z" fill="rgb(239 68 68)" opacity="0.08" stroke="rgb(239 68 68)" strokeWidth="2" />
      <text x="330" y="75" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">charge: ore + coke + limestone</text>
      <text x="330" y="115" fontSize="11" textAnchor="middle" className="fill-current text-foreground">CO₂ + C → 2CO  (in situ)</text>
      <text x="330" y="140" fontSize="12" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">Fe₂O₃ + 3CO → 2Fe + 3CO₂</text>
      <text x="330" y="165" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">CaCO₃ → CaO + CO₂ · CaO + SiO₂ → CaSiO₃ (slag)</text>
      <text x="330" y="195" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">molten iron tapped at the hearth</text>
      <text x="110" y="120" fontSize="10.5" className="fill-current text-muted-foreground">coke burns,</text>
      <text x="110" y="138" fontSize="10.5" className="fill-current text-muted-foreground">CO is born,</text>
      <text x="110" y="156" fontSize="10.5" className="fill-current text-muted-foreground">CO steals the</text>
      <text x="110" y="174" fontSize="10.5" className="fill-current text-muted-foreground">oxygen.</text>
      <text x="545" y="120" fontSize="10.5" className="fill-current text-muted-foreground">limestone only</text>
      <text x="545" y="138" fontSize="10.5" className="fill-current text-muted-foreground">carries the sand</text>
      <text x="545" y="156" fontSize="10.5" className="fill-current text-muted-foreground">away as slag —</text>
      <text x="545" y="174" fontSize="10.5" className="fill-current text-muted-foreground">it never reduces.</text>
    </svg>
  );
}
