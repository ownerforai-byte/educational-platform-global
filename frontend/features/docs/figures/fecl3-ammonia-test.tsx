// FeCl3 reaction with ammonia test. Theme-aware.
export function Fecl3AmmoniaTest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 200" className={className} role="img" aria-label="Ferric chloride solution with ammonia giving reddish brown ferric hydroxide precipitate insoluble in excess ammonia">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">FeCl₃ + NH₄OH: brown and stubborn</text>
      <rect x="60" y="56" width="540" height="60" rx="10" className="fill-current" style={{ color: "rgb(180 83 9)" }} opacity="0.18" />
      <text x="330" y="82" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">FeCl₃ + 3NH₄OH → Fe(OH)₃↓ + 3NH₄Cl</text>
      <text x="330" y="104" fontSize="10.5" textAnchor="middle" fill="rgb(180 83 9)">reddish-brown precipitate, insoluble in excess NH₃</text>
      <text x="330" y="160" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Contrast: Cu(OH)₂ dissolves in excess ammonia; Fe(OH)₃ never does</text>
      <text x="330" y="184" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Colour is the tell: pale blue → deep blue for Cu, reddish-brown for Fe</text>
    </svg>
  );
}
