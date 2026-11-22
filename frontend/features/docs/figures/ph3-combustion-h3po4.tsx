// PH3 combustion to H3PO4. Theme-aware.
export function Ph3CombustionH3po4({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 200" className={className} role="img" aria-label="Phosphine burning in air to phosphoric acid with white smoke of metaphosphoric acid">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">PH₃ burns where NH₃ won't</text>
      <rect x="80" y="56" width="500" height="56" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.14" />
      <text x="330" y="80" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">PH₃ + 2O₂ → H₃PO₄</text>
      <text x="330" y="102" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">burns with a yellowish flame; white smoke of HPO₃/H₃PO₄ droplets</text>
      <text x="330" y="150" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">NH₃ is non-flammable in air; PH₃ is not — P–H bonds are the weaker grip</text>
      <text x="330" y="182" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Oxidation: P −3 → +5, a five-electron climb</text>
    </svg>
  );
}
