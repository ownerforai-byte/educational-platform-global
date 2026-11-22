// Cyanide antidote path. Theme-aware.
export function CyanideAntidotePath({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Thiosulphate as cyanide antidote converting cyanide to harmless thiocyanate by trans-sulphuration enzyme rhodanese">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The cyanide antidote</text>
      <rect x="80" y="56" width="500" height="56" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.14" />
      <text x="330" y="80" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">Na₂S₂O₃ + CN⁻ → NaSCN (thiocyanate) + Na₂SO₃</text>
      <text x="330" y="102" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">enzyme rhodanese transfers the sulfane S to the cyanide</text>
      <text x="330" y="150" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">Cyanide's grip on cytochrome oxidase is broken — the spare S is the weapon</text>
      <text x="330" y="184" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The −2 sulphur, useless in most chemistry, saves lives here</text>
    </svg>
  );
}
