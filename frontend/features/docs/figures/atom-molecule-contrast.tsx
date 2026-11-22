// Atom vs molecule contrast. Theme-aware.
export function AtomMoleculeContrast({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Atom versus molecule smallest particle of element taking part in reaction versus smallest particle of compound with examples hydrogen oxygen water">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Atom vs molecule — the definition pair NEB loves</text>
      <rect x="30" y="44" width="320" height="100" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="190" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Atom</text>
      <circle cx="190" cy="96" r="16" className="fill-current text-sky-500/30" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="190" y="130" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">smallest particle of an element that takes part in a reaction</text>
      <text x="190" y="146" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">examples: H, O, Fe, Na</text>
      <rect x="370" y="44" width="320" height="100" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="530" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">Molecule</text>
      <circle cx="500" cy="96" r="10" className="fill-current text-sky-500" style={{ color: "rgb(14 165 233 / 0.85)" }} />
      <circle cx="536" cy="96" r="8" className="fill-current text-rose-500" style={{ color: "rgb(244 63 94 / 0.85)" }} />
      <circle cx="566" cy="96" r="8" className="fill-current text-rose-500" style={{ color: "rgb(244 63 94 / 0.85)" }} />
      <text x="530" y="130" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">smallest particle of an element or compound able to exist free</text>
      <text x="530" y="146" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">examples: H₂, O₂, H₂O, CO₂</text>
      <rect x="30" y="158" width="660" height="42" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="176" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Atomicity trap: hydrogen's molecule is H₂ but its atom is H — writing "H₂ is the atom of hydrogen" loses the mark.</text>
      <text x="360" y="192" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Noble gases are the exception: He, Ne, Ar exist as single-atom (monoatomic) molecules.</text>
    </svg>
  );
}
