// NitrogenPrussianBlue figure. Theme-aware.
export function NitrogenPrussianBlue({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Nitrogen detection giving prussian blue ferric ferrocyanide">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Nitrogen test — the Prussian blue finale</text>
      <rect x="40" y="52" width="580" height="66" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="330" y="76" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">extract (NaCN) + FeSO₄ → Na₄[Fe(CN)₆] · then + Fe³⁺ (dilute H₂SO₄, boil)</text>
      <text x="330" y="100" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">sodium ferrocyanide forms first; ferric ion is added second</text>
      <rect x="150" y="135" width="360" height="60" rx="10" fill="rgb(30 64 175)" opacity="0.25" stroke="rgb(30 64 175)" strokeWidth="2" />
      <text x="330" y="160" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(147 197 253)">Prussian blue precipitate</text>
      <text x="330" y="182" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Fe₄[Fe(CN)₆]₃ — ferric ferrocyanide = nitrogen present</text>
    </svg>
  );
}
