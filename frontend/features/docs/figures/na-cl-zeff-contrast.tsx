// Solved: Na vs Cl Zeff contrast. Theme-aware.
export function NaClZeffContrast({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Solved sodium versus chlorine effective nuclear charge plus one versus plus seven same shell ten inner electrons eleven versus seventeen protons explaining radius and ionisation trends">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — Na vs Cl: same shell, different pull</text>
      <rect x="30" y="42" width="320" height="100" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="190" y="64" fontSize="10" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Sodium (Z = 11)</text>
      <text x="190" y="88" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">σ ≈ 10 · Z_eff ≈ 11 − 10 = +1</text>
      <text x="190" y="108" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">weak grip → big radius (186 pm)</text>
      <text x="190" y="126" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">low IE → loses the electron easily</text>
      <rect x="370" y="42" width="320" height="100" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="530" y="64" fontSize="10" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">Chlorine (Z = 17)</text>
      <text x="530" y="88" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">σ ≈ 10 · Z_eff ≈ 17 − 10 = +7</text>
      <text x="530" y="108" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">strong grip → small radius (99 pm)</text>
      <text x="530" y="126" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">high IE, high EA → grabs an electron</text>
      <rect x="30" y="156" width="660" height="48" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="176" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Both keep 10 inner electrons (1s² 2s² 2p⁶) — shielding is constant, so the whole left-to-right story is Z climbing +6.</text>
      <text x="360" y="194" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">One number (Z_eff) explains radius, IE, EA and EN for period 3 — quote it as the cause in any trend answer.</text>
    </svg>
  );
}
