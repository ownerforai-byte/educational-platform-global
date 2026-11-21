// Solved: core vs valence electrons in Zeff bookkeeping. Theme-aware.
export function CoreValenceSplit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Solved core versus valence electron split for lithium and sodium inner core electrons screen fully outer valence electron determines chemistry and effective nuclear charge">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — split every configuration into core and valence</text>
      <rect x="30" y="42" width="320" height="100" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="190" y="64" fontSize="9.5" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Lithium: 1s² 2s¹</text>
      <text x="190" y="88" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">core = 2 (1s²) · valence = 1</text>
      <text x="190" y="108" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">σ ≈ 2 × 0.85 = 1.70 (simple model: 2)</text>
      <text x="190" y="126" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">Z_eff ≈ 3 − 2 = +1 → reactive metal</text>
      <rect x="370" y="42" width="320" height="100" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="530" y="64" fontSize="9.5" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">Sodium: 1s² 2s² 2p⁶ 3s¹</text>
      <text x="530" y="88" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">core = 10 · valence = 1</text>
      <text x="530" y="108" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">one more full shell between core and electron</text>
      <text x="530" y="126" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">still Z_eff ≈ +1, but radius grows → reactivity up</text>
      <rect x="30" y="156" width="660" height="44" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="174" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Group 1 stays at Z_eff ≈ +1 all the way down — that constancy is why the family behaves alike, while growing size makes them ever more reactive.</text>
      <text x="360" y="192" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Drill: write config → circle the valence shell → count core electrons → subtract for Z_eff.</text>
    </svg>
  );
}
