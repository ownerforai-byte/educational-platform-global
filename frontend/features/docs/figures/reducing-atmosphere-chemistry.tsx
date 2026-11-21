/** Reducing atmosphere chemistry — why no free oxygen mattered. Well-detailed. Theme-aware. */
export function ReducingAtmosphereChemistry({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Reducing atmosphere chemistry methane ammonia hydrogen water vapour no free oxygen why organics survived oxidation ozone absent primordial">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">A reducing atmosphere — chemistry without oxygen</text>
      {/* gas list */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE PRIMORDIAL MIX</text>
      {[
        ["CH₄", "methane — carbon in its most reduced form"],
        ["NH₃", "ammonia — the nitrogen source"],
        ["H₂", "hydrogen — electron donor everywhere"],
        ["H₂O", "water vapour — condensed into oceans"],
      ].map(([gas, note], i) => (
        <g key={gas}>
          <text x="50" y={98 + i * 34} fontSize="10" className="fill-current text-sky-600" fontWeight="800">{gas}</text>
          <text x="96" y={98 + i * 34} fontSize="6.8" className="fill-current text-muted-foreground">{note}</text>
        </g>
      ))}
      <text x="50" y="244" fontSize="7.2" className="fill-current text-foreground" fontWeight="700">Crucially: NO free O₂</text>
      {/* consequence */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY 'REDUCING' MATTERS</text>
      {[
        "no O₂ → organics were not burnt",
        "  back into CO₂ as fast as they formed",
        "no ozone → UV reached the surface,",
        "  driving reactions but also breaking",
        "  molecules in shallow water only",
        "reducing conditions favour building",
        "  complex carbon chains — the raw",
        "  material of biomolecules",
      ].map((t, i) => (
        <text key={t} x="410" y={94 + i * 17} fontSize="7" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <text x="410" y="248" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">Today's oxidising atmosphere would</text>
      <text x="410" y="262" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">destroy the same soup in hours.</text>
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: a reducing atmosphere is the reason organic molecules could accumulate at all — the 'why' behind the soup.</text>
    </svg>
  );
}
