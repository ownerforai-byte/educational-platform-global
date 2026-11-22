// HallHeroultCell figure. Theme-aware.
export function HallHeroultCell({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Hall Heroult electrolytic cell for aluminium with cryolite melt carbon lining and anodes">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Hall–Héroult — aluminium from cryolite</text>
      <rect x="150" y="60" width="360" height="120" rx="8" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" strokeWidth="2" />
      <rect x="154" y="150" width="352" height="26" fill="rgb(59 130 246)" opacity="0.6" />
      <text x="330" y="168" fontSize="9.5" fill="rgb(255 255 255)" textAnchor="middle">molten Al layer — tapped from here (cathode = carbon lining)</text>
      <text x="330" y="82" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Al₂O₃ 2–5 % in molten cryolite Na₃AlF₆ + CaF₂, ~950 °C</text>
      {[250, 330, 410].map((x) => (
        <rect key={x} x={x - 8} y="90" width="16" height="52" fill="rgb(56 56 56)" stroke="rgb(148 163 184)" />
      ))}
      <text x="330" y="112" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">carbon anodes — burn away: C + O₂ → CO₂</text>
      <text x="330" y="198" fontSize="10.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">cathode: Al³⁺ + 3e⁻ → Al · anode: 2O²⁻ → O₂ + 4e⁻ · overall 2Al₂O₃ → 4Al + 3O₂</text>
      <text x="80" y="120" fontSize="10.5" className="fill-current text-muted-foreground">cryolite drops</text>
      <text x="80" y="138" fontSize="10.5" className="fill-current text-muted-foreground">2050 °C to 950 °C</text>
      <text x="80" y="156" fontSize="10.5" className="fill-current text-muted-foreground">and boosts</text>
      <text x="80" y="174" fontSize="10.5" className="fill-current text-muted-foreground">conductivity</text>
    </svg>
  );
}
