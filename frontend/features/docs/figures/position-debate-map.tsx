// Hydrogen's periodic table position debate. Theme-aware.
export function PositionDebateMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 270" className={className} role="img" aria-label="Debate map showing hydrogen's resemblances to alkali metals and halogens and the unique element verdict">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Where does hydrogen sit?</text>
      <rect x="40" y="50" width="280" height="120" rx="10" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.14" />
      <text x="60" y="76" fontSize="13" fontWeight="800" className="fill-current text-foreground">Like Group IA (alkali metals)</text>
      <text x="60" y="100" fontSize="11.5" className="fill-current text-muted-foreground">- one valence electron</text>
      <text x="60" y="122" fontSize="11.5" className="fill-current text-muted-foreground">- forms H⁺, +1 state</text>
      <text x="60" y="144" fontSize="11.5" className="fill-current text-muted-foreground">- good reducing agent</text>
      <rect x="340" y="50" width="280" height="120" rx="10" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.14" />
      <text x="360" y="76" fontSize="13" fontWeight="800" className="fill-current text-foreground">Like Group VIIA (halogens)</text>
      <text x="360" y="100" fontSize="11.5" className="fill-current text-muted-foreground">- diatomic H₂ like Cl₂</text>
      <text x="360" y="122" fontSize="11.5" className="fill-current text-muted-foreground">- forms hydride H⁻ (NaH)</text>
      <text x="360" y="144" fontSize="11.5" className="fill-current text-muted-foreground">- displaced by active elements</text>
      <rect x="150" y="190" width="360" height="48" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.18" />
      <text x="330" y="212" fontSize="13" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">Verdict: a unique element</text>
      <text x="330" y="230" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">placed above Group IA with a question mark</text>
      <text x="330" y="262" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Two families claim it; neither owns it</text>
    </svg>
  );
}
