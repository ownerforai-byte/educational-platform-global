// Active nitrogen glow discharge. Theme-aware.
export function ActiveNitrogenGlow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Glow discharge tube converting nitrogen to active nitrogen atoms which recombine with yellow afterglow">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Active nitrogen: atoms with a memory</text>
      <rect x="70" y="80" width="480" height="60" rx="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
      <rect x="180" y="88" width="120" height="44" rx="8" className="fill-current" style={{ color: "rgb(168 85 247)" }} opacity="0.3" />
      <text x="240" y="115" fontSize="11.5" fontWeight="800" textAnchor="middle" fill="rgb(168 85 247)">microwave / electric discharge</text>
      <text x="70" y="70" fontSize="11" className="fill-current text-muted-foreground">N₂ in →</text>
      <text x="400" y="115" fontSize="11.5" fontWeight="800" fill="rgb(245 158 11)">2N (atoms) → N₂ + yellow afterglow</text>
      <text x="330" y="180" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The glow persists seconds after the discharge stops - energy stored in atoms</text>
      <text x="330" y="204" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Atomic N attacks Hg, Na, P, S - things molecular N₂ never touches</text>
    </svg>
  );
}
