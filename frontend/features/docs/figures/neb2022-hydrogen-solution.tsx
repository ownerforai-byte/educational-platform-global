// Solved NEB 2022 hydrogen numerical as a step panel. Theme-aware.
export function Neb2022HydrogenSolution({ className }: { className?: string }) {
  const steps: [string, string, string][] = [
    ["Step 1 — E₂", "E₂ = −2.18 × 10⁻¹⁸ / 2²", "= −5.45 × 10⁻¹⁹ J"],
    ["Step 2 — ΔE (3 → 2)", "ΔE = 2.18 × 10⁻¹⁸ (1/4 − 1/9)", "= 3.03 × 10⁻¹⁹ J"],
    ["Step 3 — λ = hc/ΔE", "λ = (6.63 × 10⁻³⁴ × 3 × 10⁸) / 3.03 × 10⁻¹⁹", "= 6.56 × 10⁻⁷ m ≈ 656 nm"],
  ];
  return (
    <svg viewBox="0 0 720 250" className={className} role="img" aria-label="Solved NEB 2022 numerical three steps computing energy of second orbit minus 5.45 times ten to minus nineteen joule and wavelength 656 nanometre for three to two transition">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — NEB 2022 (3m): E₂ and the wavelength of the 3 → 2 jump</text>
      {steps.map(([t, f, r], i) => (
        <g key={t}>
          <rect x="30" y={40 + i * 62} width="660" height="52" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.85)" }} />
          <text x="46" y={60 + i * 62} fontSize="9.5" className="fill-current text-emerald-600" fontWeight="800">{t}</text>
          <text x="46" y={78 + i * 62} fontSize="9.5" className="fill-current text-foreground" fontWeight="700">{f}</text>
          <text x="674" y={78 + i * 62} fontSize="9.5" textAnchor="end" className="fill-current text-emerald-600" fontWeight="800">{r}</text>
        </g>
      ))}
      <rect x="30" y="216" width="660" height="24" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="232" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Template: compute Eₙ, then ΔE = 2.18 × 10⁻¹⁸ (1/n₁² − 1/n₂²), then λ = hc/ΔE — quote the answer in nm.</text>
    </svg>
  );
}
