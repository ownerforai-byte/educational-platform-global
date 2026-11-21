/** Herbicide crop selectivity — killing weeds, sparing wheat. Well-detailed. Theme-aware. */
export function HerbicideCropSelectivity({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Herbicide crop selectivity 2,4-D dicot weed killed monocot wheat spared auxin hormone growth uncontrolled glyphosate enzyme EPSP shikimate pathway selective spraying mechanism">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Herbicides — killing the weed, sparing the crop</text>
      {/* selectivity demo */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE 2,4-D TRICK</text>
      {/* monocot crop alive */}
      <path d="M110 190 v-50 m0 0 l-10 -14 m10 14 l10 -14 m-10 14 v-18" className="stroke-current" strokeWidth="3" strokeLinecap="round" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="110" y="212" fontSize="6.2" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="700">wheat (monocot) — survives</text>
      {/* dicot weed dead */}
      <path d="M280 190 v-50 m0 0 l-16 -10 m16 10 l16 -10 m-16 10 l-14 -22 m14 22 l14 -22" className="stroke-current" strokeWidth="3" strokeLinecap="round" style={{ color: "rgb(244 63 94 / 0.6)" }} />
      <text x="280" y="212" fontSize="6.2" textAnchor="middle" className="fill-current text-rose-600" fontWeight="700">broadleaf weed (dicot) — killed</text>
      <text x="195" y="234" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">2,4-D mimics auxin: dicots overgrow and die; grasses barely respond</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HOW SELECTIVITY WORKS</text>
      {[
        "different uptake: waxy leaves",
        "  vs absorbent leaves",
        "different metabolism: the crop",
        "  detoxifies, the weed cannot",
        "different sensitivity: hormone",
        "  systems respond differently",
        "glyphosate blocks one enzyme",
        "  (EPSP synthase) plants need",
        "  for aromatic amino acids —",
        "  animals lack that pathway",
        "cost: overuse selects resistant",
        "  weeds, forcing new chemistry",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: 2,4-D = auxin mimic killing dicots, sparing monocots — the classic selectivity example.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Herbicide selectivity is biochemistry, not luck — three mechanisms decide who dies.</text>
    </svg>
  );
}
