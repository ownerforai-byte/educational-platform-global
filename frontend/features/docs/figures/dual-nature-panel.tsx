// Dual nature panel — wave face vs particle face. Theme-aware.
export function DualNaturePanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Dual nature of matter and light one entity showing wave face with diffraction interference and particle face with photoelectric collisions">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Dual nature — one entity, two faces</text>
      <rect x="30" y="44" width="320" height="110" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="190" y="66" fontSize="10" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Wave face</text>
      {[70, 100, 130, 160, 190, 220, 250, 280, 310].map((x, i) => (
        <circle key={x} cx={x} cy={100 + 14 * Math.sin(i * 1.1)} r="3.4" className="fill-current text-sky-500" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      ))}
      <text x="190" y="136" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Evidence: diffraction, interference (Young, Davisson–Germer)</text>
      <rect x="370" y="44" width="320" height="110" rx="10" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="530" y="66" fontSize="10" textAnchor="middle" className="fill-current text-amber-600" fontWeight="800">Particle face</text>
      {[[440, 96], [500, 110], [560, 92], [620, 112]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" className="fill-current text-amber-500" style={{ color: "rgb(245 158 11 / 0.95)" }} />
      ))}
      <text x="530" y="136" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Evidence: photoelectric effect, collisions (E = hν, p = h/λ)</text>
      <text x="360" y="180" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Light shows both · electrons show both · which face appears depends on the experiment</text>
      <text x="360" y="200" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">The de Broglie relation λ = h/mv is the bridge: momentum (particle) sets the wavelength (wave).</text>
    </svg>
  );
}
