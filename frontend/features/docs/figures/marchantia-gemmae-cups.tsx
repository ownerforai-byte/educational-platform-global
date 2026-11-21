/** Marchantia gemma cups — asexual reproduction. Well-detailed. Theme-aware. */
export function MarchantiaGemmaeCups({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Marchantia gemma cups asexual reproduction gemmae lens-shaped buds splash cup rain disperses thallus liverwort propagation">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Gemma cups — Marchantia's rain-splash propagators</text>

      {/* thallus with cups */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="230" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DORSAL SURFACE OF THE THALLUS</text>
      {/* ribbon thallus */}
      <path d="M60 210 q60 -34 120 -10 q60 24 110 -6 q60 -30 130 4 L420 240 q-180 16 -360 0 Z" className="fill-current text-emerald-700/25" stroke="currentColor" strokeWidth="2.4" style={{ color: "rgb(20 83 45 / 0.9)" }} />
      <path d="M70 218 q180 -14 340 -2" className="fill-none stroke-current text-emerald-900" strokeWidth="1.4" strokeDasharray="4 3" style={{ color: "rgb(6 46 27 / 0.8)" }} />
      <text x="230" y="262" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">flat, dichotomously branched ribbon with midrib</text>
      {/* gemma cups */}
      {[[140, 150], [250, 138], [350, 152]].map(([x, y]) => (
        <g key={x}>
          <path d={`M${x - 22} ${y} q22 -16 44 0 q-22 10 -44 0`} className="fill-current text-amber-700/40" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(146 64 14 / 0.9)" }} />
          <ellipse cx={x} cy={y - 2} rx="16" ry="6" className="fill-current text-lime-600/40" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(101 163 13 / 0.9)" }} />
          <text x={x} y={y + 22} fontSize="6.8" textAnchor="middle" className="fill-current text-amber-700">gemma cup</text>
        </g>
      ))}
      {/* gemmae dots */}
      {[[120, 96], [150, 110], [230, 92], [262, 104], [330, 100], [360, 114]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="6" ry="4" className="fill-current text-lime-500/50" stroke="currentColor" strokeWidth="1" style={{ color: "rgb(132 204 22 / 0.9)" }} />
      ))}
      <text x="230" y="82" fontSize="7.2" textAnchor="middle" className="fill-current text-lime-600">lens-shaped gemmae splashed out by rain</text>

      {/* notes card */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HOW IT WORKS</text>
      {[
        "cups form on the upper surface",
        "each holds many tiny gemmae",
        "raindrop hits → gemmae splash out",
        "each gemma grows into a full",
        "new thallus — genetically identical",
        "no gametes, no fusion involved",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 23} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="466" y="240" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: gemma cups = asexual</text>
      <text x="466" y="254" fontSize="7.2" className="fill-current text-muted-foreground">reproduction of Marchantia;</text>
      <text x="466" y="268" fontSize="7.2" className="fill-current text-muted-foreground">dispersal agent = rain splash.</text>
    </svg>
  );
}
