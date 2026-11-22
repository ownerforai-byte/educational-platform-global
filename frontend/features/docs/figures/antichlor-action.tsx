// Antichlor action. Theme-aware.
export function AntichlorAction({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 200" className={className} role="img" aria-label="Sodium thiosulphate as antichlor removing excess chlorine after bleaching in textile mills">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Antichlor: undoing the bleach</text>
      <rect x="80" y="56" width="500" height="56" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.14" />
      <text x="330" y="80" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">Na₂S₂O₃ + 4Cl₂ + 5H₂O → 2NaHSO₄ + 8HCl</text>
      <text x="330" y="102" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">residual Cl₂ from bleaching consumed before it rots the fibre</text>
      <text x="330" y="150" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">Bleach → fabric → antichlor rinse → dye</text>
      <text x="330" y="182" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Without it, chlorine keeps attacking the cloth long after the whiteness is done</text>
    </svg>
  );
}
