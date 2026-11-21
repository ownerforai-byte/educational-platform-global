// de Broglie relation with the mass-wavelength trade-off. Theme-aware.
export function DeBroglieRelation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="de Broglie relation lambda equals h over m v showing wavelength inversely proportional to momentum with electron and macroscopic object comparison">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">de Broglie (1924): every moving particle has a wavelength</text>
      <rect x="30" y="42" width="660" height="52" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="76" fontSize="20" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">λ = h / mv = h / p</text>
      <text x="360" y="112" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">small mass → large wavelength · large momentum → tiny wavelength · h = 6.63 × 10⁻³⁴ J s</text>
      <rect x="30" y="128" width="320" height="62" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.85)" }} />
      <text x="46" y="150" fontSize="9.5" className="fill-current text-emerald-600" fontWeight="800">Electron (m = 9.1 × 10⁻³¹ kg) at 10⁶ m/s</text>
      <text x="46" y="168" fontSize="9.5" className="fill-current text-foreground" fontWeight="700">λ ≈ 0.73 nm — atomic scale</text>
      <text x="46" y="183" fontSize="7.8" className="fill-current text-muted-foreground">crystals diffract it: wave nature is visible</text>
      <rect x="370" y="128" width="320" height="62" rx="10" className="fill-current text-rose-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(244 63 94 / 0.85)" }} />
      <text x="386" y="150" fontSize="9.5" className="fill-current text-rose-500" fontWeight="800">Cricket ball (150 g) at 40 m/s</text>
      <text x="386" y="168" fontSize="9.5" className="fill-current text-foreground" fontWeight="700">λ ≈ 1.1 × 10⁻³⁴ m</text>
      <text x="386" y="183" fontSize="7.8" className="fill-current text-muted-foreground">20 orders below any measurable length: unobservable</text>
      <text x="360" y="208" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Dual nature is universal — its visibility is not. That asymmetry is the standard 2m application.</text>
    </svg>
  );
}
