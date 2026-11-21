// Zeeman vs Stark — magnetic vs electric line splitting. Theme-aware.
export function ZeemanStarkContrast({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Zeeman effect splitting a spectral line in a magnetic field contrasted with Stark effect splitting in an electric field">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Zeeman vs Stark — same split, different field</text>
      <rect x="30" y="44" width="320" height="90" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="190" y="66" fontSize="10" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Zeeman effect — magnetic field</text>
      {[130, 190, 250].map((x, i) => (
        <line key={x} x1={x} y1="80" x2={x} y2="118" className="stroke-current" strokeWidth="4.5" style={{ color: ["rgb(59 130 246 / 0.9)", "rgb(239 68 68 / 0.9)", "rgb(59 130 246 / 0.9)"][i] }} />
      ))}
      <text x="190" y="128" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">N and S poles either side; one line splits into components</text>
      <rect x="370" y="44" width="320" height="90" rx="10" className="fill-current text-violet-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="530" y="66" fontSize="10" textAnchor="middle" className="fill-current text-violet-600" fontWeight="800">Stark effect — electric field</text>
      {[470, 530, 590].map((x, i) => (
        <line key={x} x1={x} y1="80" x2={x} y2="118" className="stroke-current" strokeWidth="4.5" style={{ color: ["rgb(139 92 246 / 0.9)", "rgb(239 68 68 / 0.9)", "rgb(139 92 246 / 0.9)"][i] }} />
      ))}
      <text x="530" y="128" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Charged plates either side; the same line splits again</text>
      <rect x="30" y="150" width="660" height="52" rx="10" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="46" y="170" fontSize="8.6" className="fill-current text-foreground" fontWeight="800">Why Bohr cannot explain either: his circular orbits carry no magnetic quantum number (mₗ) — no sub-levels exist for the lines to split into.</text>
      <text x="46" y="188" fontSize="8" className="fill-current text-muted-foreground">Memory pair: Z = M (Zeeman–Magnetic) · S = E (Stark–Electric). Both are 2m stock questions.</text>
    </svg>
  );
}
