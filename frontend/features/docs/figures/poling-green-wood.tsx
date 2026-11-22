// PolingGreenWood figure. Theme-aware.
export function PolingGreenWood({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Poling of molten crude copper with green wood poles releasing reducing hydrocarbons">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Poling — green wood as reducing agent</text>
      <rect x="200" y="80" width="260" height="100" rx="10" fill="rgb(239 68 68)" opacity="0.2" stroke="rgb(239 68 68)" strokeWidth="2" />
      <text x="330" y="105" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">molten crude Cu (with Cu₂O)</text>
      <line x1="260" y1="45" x2="290" y2="110" stroke="rgb(101 67 33)" strokeWidth="7" strokeLinecap="round" />
      <line x1="400" y1="45" x2="370" y2="110" stroke="rgb(101 67 33)" strokeWidth="7" strokeLinecap="round" />
      <text x="330" y="150" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">stirring collects dross</text>
      <text x="70" y="100" fontSize="10.5" className="fill-current text-muted-foreground">green wood gives:</text>
      <text x="70" y="120" fontSize="10.5" fill="rgb(16 185 129)">hydrocarbons →</text>
      <text x="70" y="138" fontSize="10.5" fill="rgb(16 185 129)">reduce Cu₂O → Cu</text>
      <text x="70" y="160" fontSize="10.5" fill="rgb(59 130 246)">steam → stirs +</text>
      <text x="70" y="178" fontSize="10.5" fill="rgb(59 130 246)">shields from air</text>
      <text x="545" y="110" fontSize="10.5" className="fill-current text-muted-foreground">dry wood would</text>
      <text x="545" y="128" fontSize="10.5" className="fill-current text-muted-foreground">only stir —</text>
      <text x="545" y="146" fontSize="10.5" className="fill-current text-muted-foreground">green is the point</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">2Cu₂O + C → 4Cu + CO₂ (via wood gases)</text>
    </svg>
  );
}
