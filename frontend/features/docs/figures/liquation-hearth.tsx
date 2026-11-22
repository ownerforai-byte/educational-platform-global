// LiquationHearth figure. Theme-aware.
export function LiquationHearth({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Liquation furnace with inclined hearth letting low melting tin flow away from impurities">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Liquation — let the metal flow away</text>
      <path d="M 150 80 L 480 150" stroke="rgb(148 163 184)" strokeWidth="10" strokeLinecap="round" />
      <rect x="160" y="58" width="90" height="26" rx="5" fill="rgb(148 163 184)" opacity="0.5" />
      <text x="205" y="50" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">impure Sn block</text>
      <path d="M 250 92 C 300 110, 380 128, 470 146" stroke="rgb(16 185 129)" strokeWidth="5" fill="none" opacity="0.8" />
      <rect x="470" y="140" width="120" height="50" rx="8" fill="rgb(16 185 129)" opacity="0.15" stroke="rgb(16 185 129)" />
      <text x="530" y="162" fontSize="11" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">pure Sn</text>
      <text x="530" y="180" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">collects below</text>
      <text x="330" y="195" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">hearth held just above 232 °C — Fe and C stay put on the slope</text>
      <text x="80" y="110" fontSize="10.5" className="fill-current text-muted-foreground">Sn melts at</text>
      <text x="80" y="128" fontSize="10.5" className="fill-current text-muted-foreground">232 °C —</text>
      <text x="80" y="146" fontSize="10.5" className="fill-current text-muted-foreground">gravity is</text>
      <text x="80" y="164" fontSize="10.5" className="fill-current text-muted-foreground">the refiner</text>
    </svg>
  );
}
