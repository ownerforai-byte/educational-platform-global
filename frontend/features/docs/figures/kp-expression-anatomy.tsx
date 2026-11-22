// Kp expression anatomy with partial pressures. Theme-aware.
export function KpExpressionAnatomy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Kp expression for ammonia synthesis written with partial pressures replacing concentrations">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Kp: same fraction, pressure currency</text>
      <text x="330" y="80" fontSize="17" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">N₂(g) + 3H₂(g)  ⇌  2NH₃(g)</text>
      <rect x="120" y="110" width="420" height="64" rx="10" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.14" />
      <text x="330" y="138" fontSize="16" fontWeight="800" textAnchor="middle" fill="rgb(14 165 233)">Kp = (pNH₃)² / (pN₂ · pH₂³)</text>
      <text x="330" y="160" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">each p = partial pressure of that gas in the mixture</text>
      <text x="330" y="220" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Pressures are concentrations in disguise: p = CRT</text>
    </svg>
  );
}
