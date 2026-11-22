// ArsenicGroundwater figure. Theme-aware.
export function ArsenicGroundwater({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Arsenic in groundwater exceeding WHO limit causing arsenicosis">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Arsenic — the well-water poison</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">THE ROUTE</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">tube-well groundwater, As(III)</text>
      <text x="180" y="132" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">WHO limit: 10 ppb (0.01 mg/L)</text>
      <text x="180" y="154" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Terai (Nepal) + Gangetic plains affected</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">ARSENICOSIS</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">As(III) binds enzyme –SH groups</text>
      <text x="480" y="132" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">skin keratosis, pigmentation</text>
      <text x="480" y="154" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">skin cancer, nerve damage</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Remedy: tested deep wells or arsenic-removal filters — and BAL as antidote</text>
    </svg>
  );
}
