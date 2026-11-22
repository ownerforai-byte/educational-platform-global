// IiaCompoundsPanel figure. Theme-aware.
export function IiaCompoundsPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Nitrides and hydrides of alkaline earth metals including hydrolith">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Compounds the whole group makes</text>
      <rect x="40" y="60" width="280" height="115" rx="10" fill="rgb(139 92 246)" opacity="0.1" stroke="rgb(139 92 246)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(139 92 246)" textAnchor="middle">NITRIDES — M₃N₂</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">3M + N₂ → M₃N₂</text>
      <text x="180" y="132" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">ALL of IIA (unlike IA — only Li₃N)</text>
      <text x="180" y="152" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">hydrolyse to NH₃ + hydroxide</text>
      <rect x="340" y="60" width="280" height="115" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">HYDRIDES — MH₂</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">M + H₂ → MH₂ (ionic, H⁻)</text>
      <text x="480" y="132" fontSize="10" textAnchor="middle" className="fill-current text-foreground">CaH₂ = "hydrolith"</text>
      <text x="480" y="152" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">portable H₂ generator: CaH₂ + 2H₂O → Ca(OH)₂ + 2H₂</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The +2 cation stabilises N³⁻ and H⁻ — Group IA (except Li) cannot</text>
    </svg>
  );
}
