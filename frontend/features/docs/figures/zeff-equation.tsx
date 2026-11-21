// Zeff equation anatomy. Theme-aware.
export function ZeffEquation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 200" className={className} role="img" aria-label="Effective nuclear charge equation Z effective equals Z minus sigma screening constant with labels for protons and shielding electrons">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Z_eff = Z − σ — the charge the outer electron actually feels</text>
      <rect x="30" y="44" width="660" height="60" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="84" fontSize="20" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Z_eff = Z − σ</text>
      <text x="120" y="128" fontSize="8.6" className="fill-current text-foreground" fontWeight="700">Z = protons (full pull)</text>
      <text x="120" y="146" fontSize="8" className="fill-current text-muted-foreground">what the nucleus would pull with no other electrons present</text>
      <text x="420" y="128" fontSize="8.6" className="fill-current text-foreground" fontWeight="700">σ = screening constant</text>
      <text x="420" y="146" fontSize="8" className="fill-current text-muted-foreground">inner electrons standing between nucleus and the one you watch</text>
      <rect x="30" y="158" width="660" height="34" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="176" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Na: Z = 11 but Z_eff ≈ +1 for the 3s electron — ten inner electrons cancel almost the whole pull.</text>
      <text x="360" y="188" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Every periodic trend (radius, IE, EA, EN) is Z_eff wearing a different costume.</text>
    </svg>
  );
}
