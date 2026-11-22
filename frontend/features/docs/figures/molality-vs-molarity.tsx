// Molality vs molarity contrast. Theme-aware.
export function MolalityVsMolarity({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Molality versus molarity comparison mass of solvent versus volume of solution temperature independence">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Molarity vs molality — the denominator decides</text>
      <rect x="30" y="44" width="320" height="100" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="190" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Molarity — per litre of solution</text>
      <text x="190" y="90" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">solution expands when heated → M falls</text>
      <text x="190" y="108" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">easy to prepare (volumetric flask)</text>
      <text x="190" y="126" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">lab default, temperature-sensitive</text>
      <rect x="370" y="44" width="320" height="100" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="530" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">Molality — per kg of solvent</text>
      <text x="530" y="90" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">masses don't change with temperature</text>
      <text x="530" y="108" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">used in colligative-property work</text>
      <text x="530" y="126" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">temperature-independent</text>
      <rect x="30" y="158" width="660" height="42" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="176" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Dilute aqueous solutions: 1 L ≈ 1 kg, so M ≈ m numerically — the coincidence that lets students confuse them safely… until the exam.</text>
      <text x="360" y="192" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">State the denominator explicitly in answers: "per litre of solution" vs "per kilogram of solvent".</text>
    </svg>
  );
}
