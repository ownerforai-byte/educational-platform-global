// Solved: proton vs electron wavelength at the same speed. Theme-aware.
export function ProtonWavelengthDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Solved proton and electron at the same speed proton wavelength 1836 times shorter because mass enters the denominator of lambda equals h over m v">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — same speed, proton vs electron</text>
      <rect x="30" y="42" width="660" height="52" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="46" y="64" fontSize="9.5" className="fill-current text-sky-600" fontWeight="800">Electron: m = 9.1 × 10⁻³¹ kg, v = 10⁴ m/s</text>
      <text x="46" y="84" fontSize="9.5" className="fill-current text-foreground" fontWeight="700">λ = 6.63 × 10⁻³⁴ / (9.1 × 10⁻³¹ × 10⁴) = 7.3 × 10⁻⁸ m = 73 nm</text>
      <rect x="30" y="106" width="660" height="52" rx="10" className="fill-current text-violet-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="46" y="128" fontSize="9.5" className="fill-current text-violet-600" fontWeight="800">Proton: m = 1.67 × 10⁻²⁷ kg (≈ 1836× heavier), same v</text>
      <text x="46" y="148" fontSize="9.5" className="fill-current text-foreground" fontWeight="700">λ = 6.63 × 10⁻³⁴ / (1.67 × 10⁻²⁷ × 10⁴) ≈ 4.0 × 10⁻¹¹ m</text>
      <rect x="30" y="170" width="660" height="30" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="189" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Ratio 73 nm / 0.04 nm ≈ 1836 = the mass ratio — mass sits in the denominator, so heavier particles carry shorter wavelengths.</text>
    </svg>
  );
}
