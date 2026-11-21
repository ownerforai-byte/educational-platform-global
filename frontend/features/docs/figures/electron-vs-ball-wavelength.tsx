// Solved contrast: electron vs cricket ball de Broglie wavelengths. Theme-aware.
export function ElectronVsBallWavelength({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 230" className={className} role="img" aria-label="Solved comparison electron at ten to six metres per second gives 0.73 nanometres observable while cricket ball gives 1.1 times ten to minus thirty four metres unobservable">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — the same equation, 25 orders apart</text>
      <rect x="30" y="42" width="660" height="56" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="46" y="64" fontSize="9.5" className="fill-current text-sky-600" fontWeight="800">Electron: m = 9.1 × 10⁻³¹ kg, v = 10⁶ m s⁻¹</text>
      <text x="46" y="86" fontSize="10" className="fill-current text-foreground" fontWeight="700">λ = 6.63 × 10⁻³⁴ / (9.1 × 10⁻³¹ × 10⁶) = 7.3 × 10⁻¹⁰ m ≈ 0.73 nm</text>
      <rect x="30" y="110" width="660" height="56" rx="10" className="fill-current text-rose-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="46" y="132" fontSize="9.5" className="fill-current text-rose-500" fontWeight="800">Cricket ball: m = 0.150 kg, v = 40 m s⁻¹</text>
      <text x="46" y="154" fontSize="10" className="fill-current text-foreground" fontWeight="700">λ = 6.63 × 10⁻³⁴ / (0.150 × 40) = 1.1 × 10⁻³⁴ m — unmeasurably small</text>
      <rect x="30" y="178" width="660" height="40" rx="8" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="195" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">0.73 nm matches atomic spacings — crystals diffract electrons (Davisson–Germer).</text>
      <text x="360" y="211" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">10⁻³⁴ m is 20 orders below a proton: macroscopic wave nature can never be detected. Same law, different visibility.</text>
    </svg>
  );
}
