// Avogadro reconciling Dalton and Gay-Lussac. Theme-aware.
export function AvogadroVsDaltonReconcile({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Avogadro hypothesis reconciles Dalton atomism with Gay lussac volume law molecules diatomic oxygen explanation">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">The reconciliation — Avogadro saves both camps</text>
      <rect x="30" y="44" width="210" height="100" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="135" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Dalton's camp</text>
      <text x="135" y="90" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">reactions happen atom-by-atom</text>
      <text x="135" y="108" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">rejected equal-volume-equal-atom</text>
      <text x="135" y="126" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">(it contradicted his data)</text>
      <rect x="255" y="44" width="210" height="100" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">Gay-Lussac's data</text>
      <text x="360" y="90" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">1 vol O₂ + 2 vol H₂ → 2 vol H₂O(g)</text>
      <text x="360" y="108" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">Dalton: impossible — 1 atom O</text>
      <text x="360" y="126" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">cannot make 2 atoms of O in water</text>
      <rect x="480" y="44" width="210" height="100" rx="10" className="fill-current text-violet-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="585" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-violet-600" fontWeight="800">Avogadro's move (1811)</text>
      <text x="585" y="90" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">the unit is the molecule, not the atom</text>
      <text x="585" y="108" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">O₂ splits: each half joins one H₂</text>
      <text x="585" y="126" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">both laws now hold together</text>
      <rect x="30" y="158" width="660" height="52" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="180" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Historical note: the idea was ignored for ~50 years (Cannizzaro, 1860, revived it) — atomic masses stayed confused until then.</text>
      <text x="360" y="198" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Exam phrase: "Avogadro distinguished atom and molecule, resolving the contradiction between Dalton's theory and Gay-Lussac's law."</text>
    </svg>
  );
}
