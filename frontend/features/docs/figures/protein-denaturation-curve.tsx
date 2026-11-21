/** Protein denaturation — native to unfolded, agents and effects. Well-detailed. Theme-aware. */
export function ProteinDenaturationCurve({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Protein denaturation native folded protein with alpha helix and beta sheet unfolding into random coil losing biological activity agents heat acid alkali alcohol urea heavy metals example boiled egg albumin coagulation reversible renaturation ribonuclease">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Denaturation — structure lost, sequence intact</text>

      {/* native */}
      <rect x="30" y="44" width="200" height="140" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="130" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NATIVE (active)</text>
      <path d="M70 110 q15 -25 30 0 q15 25 30 0 q15 -25 30 0" className="fill-none stroke-current text-emerald-600" strokeWidth="3" />
      <path d="M170 100 l20 -12 m0 24 l-20 -12" strokeWidth="2.5" className="stroke-current text-emerald-600" />
      <text x="130" y="160" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">helix + sheet + 3-D fold</text>
      <text x="130" y="176" fontSize="7" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="700">biological activity ✓</text>

      {/* agents */}
      <rect x="255" y="44" width="200" height="140" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="355" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DENATURING AGENTS</text>
      {["heat (cooking)", "strong acids / alkalis", "alcohol, acetone", "urea (breaks H-bonds)", "heavy metals (Pb, Hg)", "vigorous shaking"].map((s, i) => (
        <text key={s} x="272" y={86 + i * 15} fontSize="7.6" className="fill-current text-muted-foreground">• {s}</text>
      ))}

      {/* denatured */}
      <rect x="480" y="44" width="210" height="140" rx="12" className="fill-current text-stone-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="585" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DENATURED (inactive)</text>
      <path d="M505 120 q20 20 35 -5 t35 10 t35 -12 t30 8" className="fill-none stroke-current text-stone-500" strokeWidth="3" />
      <text x="585" y="160" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">random coil — H-bonds broken</text>
      <text x="585" y="176" fontSize="7" textAnchor="middle" className="fill-current text-rose-500" fontWeight="700">activity lost ✗ · peptide bonds intact</text>

      {/* bottom note */}
      <rect x="30" y="204" width="660" height="72" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="50" y="228" fontSize="8.6" className="fill-current text-foreground" fontWeight="700">Everyday examples: boiled egg (albumin coagulates white) · curd from milk protein · alcohol sterilisation</text>
      <text x="50" y="248" fontSize="8" className="fill-current text-muted-foreground">Primary structure (amino-acid sequence) survives — only 2°/3°/4° organisation is lost.</text>
      <text x="50" y="266" fontSize="8" className="fill-current text-muted-foreground">Renaturation is possible for some proteins (ribonuclease) when the agent is removed — proof that sequence dictates fold.</text>
    </svg>
  );
}
