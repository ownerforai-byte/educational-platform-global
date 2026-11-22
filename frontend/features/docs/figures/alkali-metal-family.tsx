// AlkaliMetalFamily figure. Theme-aware.
export function AlkaliMetalFamily({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Group one alkali metals column with outer ns one configuration">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Group IA — one electron defines the family</text>
      {["Li [He]2s¹", "Na [Ne]3s¹", "K [Ar]4s¹", "Rb [Kr]5s¹", "Cs [Xe]6s¹", "Fr [Rn]7s¹"].map((m, i) => (
        <g key={m}>
          <rect x="60" y={44 + i * 26} width="220" height="22" rx="5" fill="rgb(59 130 246)" opacity={0.35 - i * 0.04} />
          <text x="75" y={60 + i * 26} fontSize="11.5" fontWeight="700" className="fill-current text-foreground">{m}</text>
        </g>
      ))}
      <text x="330" y="70" fontSize="11.5" fontWeight="800" fill="rgb(245 158 11)">one ns¹ electron over a noble-gas core</text>
      <text x="330" y="94" fontSize="10.5" className="fill-current text-muted-foreground">→ lost easily, +1 only, no other state</text>
      <text x="330" y="122" fontSize="10.5" className="fill-current text-muted-foreground">→ soft, low-melting, light metals</text>
      <text x="330" y="150" fontSize="10.5" className="fill-current text-muted-foreground">→ strongest reducing agents; MOH strongest bases</text>
      <text x="330" y="178" fontSize="10.5" className="fill-current text-muted-foreground">→ compounds ionic, colourless, water-soluble</text>
    </svg>
  );
}
