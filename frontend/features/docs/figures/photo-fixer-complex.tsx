// Photo fixer complex. Theme-aware.
export function PhotoFixerComplex({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Hypo fixing unexposed silver halide in photographic film by forming soluble silver thiosulphate complex">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Why the fixer is called "hypo"</text>
      <rect x="80" y="56" width="500" height="56" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.14" />
      <text x="330" y="80" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">AgBr + 2S₂O₃²⁻ → [Ag(S₂O₃)₂]³⁻ + Br⁻</text>
      <text x="330" y="102" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">insoluble AgBr dissolved as a soluble complex</text>
      <text x="330" y="150" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">Unexposed grains wash away; the developed black image stays</text>
      <text x="330" y="184" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Le Chatelier in a darkroom: complexation pulls Ag⁺ out of its halide</text>
    </svg>
  );
}
