// Ozone bent structure with resonance. Theme-aware.
export function OzoneStructurePanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Bent ozone molecule with 117 degree angle and two resonance structures giving bond order 1.5">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Bent, resonating, 128 pm</text>
      <circle cx="250" cy="110" r="18" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.4" />
      <circle cx="200" cy="150" r="18" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.4" />
      <circle cx="300" cy="150" r="18" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.4" />
      <line x1="238" y1="122" x2="212" y2="138" stroke="currentColor" strokeWidth="2" className="text-foreground" />
      <line x1="262" y1="122" x2="288" y2="138" stroke="currentColor" strokeWidth="2" className="text-foreground" />
      <text x="250" y="196" fontSize="11.5" textAnchor="middle" className="fill-current text-muted-foreground">angle ≈ 117° · O–O = 128 pm · bond order 1.5</text>
      <text x="470" y="90" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">resonance pair:</text>
      <text x="470" y="116" fontSize="11.5" textAnchor="middle" fill="rgb(16 185 129)">O=O–O  ↔  O–O=O</text>
      <text x="470" y="140" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">both bonds identical in reality</text>
      <text x="330" y="232" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">sp² central oxygen with one lone pair bends the triangle; the π cloud equalises the bonds</text>
    </svg>
  );
}
