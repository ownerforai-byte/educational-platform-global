// Drying agent trap for ammonia. Theme-aware.
export function DryingAgentTrap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Quicklime is the correct drying agent for ammonia while sulfuric acid and calcium chloride react with it">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Dry it - but with what?</text>
      <rect x="40" y="50" width="580" height="56" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.16" />
      <text x="60" y="76" fontSize="12.5" fontWeight="800" fill="rgb(16 185 129)">✔ quicklime CaO</text>
      <text x="60" y="96" fontSize="11" className="fill-current text-muted-foreground">basic - dries NH₃ without reacting</text>
      <rect x="40" y="118" width="580" height="66" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.13" />
      <text x="60" y="144" fontSize="12.5" fontWeight="800" fill="rgb(239 68 68)">✘ conc. H₂SO₄</text>
      <text x="60" y="164" fontSize="11" className="fill-current text-muted-foreground">2NH₃ + H₂SO₄ → (NH₄)₂SO₄ - the gas is eaten</text>
      <text x="60" y="180" fontSize="11" className="fill-current text-muted-foreground">✘ CaCl₂ - forms CaCl₂·8NH₃ adduct</text>
      <text x="330" y="206" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Never dry a basic gas over an acid or a chloride that complexes it</text>
    </svg>
  );
}
