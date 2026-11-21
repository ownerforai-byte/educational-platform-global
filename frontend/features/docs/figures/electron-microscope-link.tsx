// Electron microscope — de Broglie at work. Theme-aware.
export function ElectronMicroscopeLink({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Electron microscope uses the de Broglie wavelength of accelerated electrons far shorter than visible light to resolve far finer detail">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">de Broglie at work — the electron microscope</text>
      <rect x="30" y="44" width="320" height="100" rx="10" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="190" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-amber-600" fontWeight="800">Light microscope</text>
      <text x="190" y="90" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">λ ≈ 400–700 nm</text>
      <text x="190" y="112" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">cannot resolve anything smaller than</text>
      <text x="190" y="128" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">half a wavelength — virus-sized limit</text>
      <rect x="370" y="44" width="320" height="100" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="530" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Electron microscope</text>
      <text x="530" y="90" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">λ(e⁻) ≈ 0.004 nm at 100 kV</text>
      <text x="530" y="112" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">wavelength ~100 000× shorter →</text>
      <text x="530" y="128" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">resolves atoms and protein filaments</text>
      <rect x="30" y="158" width="660" height="40" rx="8" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="176" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Accelerating electrons raises v, so λ = h/mv shrinks — resolution is a wavelength budget, exactly as wave optics predicts.</text>
      <text x="360" y="190" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Application hook: this is the standard "usefulness of de Broglie's idea" example for a 2m question.</text>
    </svg>
  );
}
