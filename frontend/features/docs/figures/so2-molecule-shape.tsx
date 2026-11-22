// SO2 molecule shape. Theme-aware.
export function So2MoleculeShape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Bent sulphur dioxide molecule with 119 degree bond angle and resonance structures">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Bent, 119°, resonating</text>
      <circle cx="300" cy="110" r="14" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.5" />
      <circle cx="360" cy="82" r="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.5" />
      <circle cx="360" cy="140" r="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.5" />
      <line x1="312" y1="104" x2="350" y2="87" stroke="currentColor" strokeWidth="2.5" className="text-foreground" />
      <line x1="312" y1="118" x2="350" y2="134" stroke="currentColor" strokeWidth="2.5" className="text-foreground" />
      <text x="255" y="115" fontSize="11" textAnchor="end" className="fill-current text-foreground">S</text>
      <text x="375" y="86" fontSize="11" className="fill-current text-foreground">O</text>
      <text x="375" y="144" fontSize="11" className="fill-current text-foreground">O</text>
      <text x="440" y="100" fontSize="11" fill="rgb(59 130 246)">angle ≈ 119°</text>
      <text x="440" y="122" fontSize="10.5" className="fill-current text-muted-foreground">sp² S, one lone pair</text>
      <text x="440" y="144" fontSize="10.5" className="fill-current text-muted-foreground">two equivalent S–O bonds (resonance)</text>
      <text x="330" y="192" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Angular like O₃ — polar molecule, dissolves readily in water as H₂SO₃</text>
    </svg>
  );
}
