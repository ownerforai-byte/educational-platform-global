/** Water dependence of ferns — why fertilisation still needs a film. Well-detailed. Theme-aware. */
export function FernWaterDependence({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Fern water dependence flagellate sperm swim through water film to archegonium on prothallus external fertilisation damp habitat seed plants removed need">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Still tied to water — the swimming sperm</text>

      {/* prothallus with water film */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="230" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WET PROTHALLUS SURFACE</text>
      {/* prothallus */}
      <path d="M110 210 q-30 -24 0 -40 q30 -16 60 0 q28 16 -4 40 q-26 10 -56 0" className="fill-current text-lime-500/25" stroke="currentColor" strokeWidth="2.2" style={{ color: "rgb(132 204 22 / 0.9)" }} />
      {/* antheridium releasing sperm */}
      <circle cx="140" cy="180" r="9" className="fill-current text-sky-500/30" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="100" y="164" fontSize="7" className="fill-current text-sky-600">antheridium</text>
      {/* archegonium */}
      <path d="M196 176 q8 -16 14 0 q-2 10 -7 10 q-5 0 -7 -10" className="fill-current text-rose-500/30" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="220" y="170" fontSize="7" className="fill-current text-rose-500">archegonium + egg</text>
      {/* swimming sperm paths */}
      {[[150, 182, 190, 186], [146, 190, 192, 194], [152, 176, 196, 180]].map(([x1, y1, x2, y2], i) => (
        <path key={i} d={`M${x1} ${y1} q10 ${i % 2 === 0 ? -8 : 8} 20 0 q10 ${i % 2 === 0 ? 8 : -8} 20 0`} className="fill-none stroke-current text-sky-500" strokeWidth="1.6" strokeDasharray="3 2" />
      ))}
      {[[172, 178], [176, 192], [180, 180]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" className="fill-current text-sky-600" />
      ))}
      <text x="230" y="212" fontSize="7.2" className="fill-current text-sky-600" fontWeight="700">flagellate sperms must swim across a water film</text>
      <text x="50" y="248" fontSize="7.2" className="fill-current text-muted-foreground">No rain or dew = no fertilisation. This single fact keeps every fern close to damp shade.</text>

      {/* notes card */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE WATER RULE</text>
      {[
        "bryophytes: sperm must swim",
        "pteridophytes: sperm must swim",
        "gymnosperms: pollen tube does it",
        "angiosperms: pollen tube + ovary",
        "each step frees reproduction",
        "further from free water",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 23} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="466" y="240" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: external fertilisation</text>
      <text x="466" y="254" fontSize="7.2" className="fill-current text-muted-foreground">on the prothallus is the fern's</text>
      <text x="466" y="268" fontSize="7.2" className="fill-current text-muted-foreground">weak point — seeds fixed it.</text>
    </svg>
  );
}
