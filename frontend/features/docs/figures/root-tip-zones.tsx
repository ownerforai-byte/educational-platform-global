/** Root tip zones — cap, elongation, root hairs. Well-detailed. Theme-aware. */
export function RootTipZones({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Root tip zones root cap region of cell division elongation maturation root hairs radicle germination water absorption apical meristem">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">A root tip, top to bottom — four working zones</text>

      {/* root drawing */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="230" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PRIMARY ROOT FROM A GERMINATING SEED</text>
      {/* root body */}
      <path d="M210 84 q0 60 8 100 q6 40 4 70" className="fill-none stroke-current text-amber-700" strokeWidth="16" strokeLinecap="round" style={{ color: "rgb(146 64 14 / 0.4)" }} />
      {/* zone dividers */}
      <path d="M196 110 h36" className="stroke-current text-sky-500" strokeWidth="1.6" strokeDasharray="4 3" />
      <path d="M198 160 h34" className="stroke-current text-sky-500" strokeWidth="1.6" strokeDasharray="4 3" />
      <path d="M204 210 h26" className="stroke-current text-sky-500" strokeWidth="1.6" strokeDasharray="4 3" />
      {/* root cap */}
      <path d="M212 250 q10 14 16 0 q-8 8 -16 0" className="fill-current text-stone-500/50" />
      <text x="240" y="258" fontSize="7.2" className="fill-current text-stone-600" fontWeight="700">root cap — shields the tip, lubricates the dig</text>
      {/* root hairs */}
      {[[218, 226], [222, 236], [214, 232], [226, 222]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} q8 4 12 10`} className="fill-none stroke-current text-sky-600" strokeWidth="1.4" />
      ))}
      <text x="60" y="236" fontSize="7" className="fill-current text-sky-600" fontWeight="700">root hairs — absorption boost</text>
      {/* zone labels */}
      <text x="250" y="100" fontSize="7.2" className="fill-current text-emerald-700" fontWeight="700">region of maturation (differentiation)</text>
      <text x="250" y="146" fontSize="7.2" className="fill-current text-emerald-600" fontWeight="700">region of elongation — cells stretch</text>
      <text x="250" y="188" fontSize="7.2" className="fill-current text-violet-500" fontWeight="700">meristematic zone — dividing cells</text>

      {/* notes card */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ORDER FROM TIP UP</text>
      {[
        "1. root cap — protection",
        "2. meristematic — mitosis",
        "3. elongation — cells lengthen",
        "4. maturation — hairs + tubes",
        "root hairs live days, replaced",
        "constantly as the tip pushes on",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 23} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="466" y="240" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: the radicle emerges first</text>
      <text x="466" y="254" fontSize="7.2" className="fill-current text-muted-foreground">from the seed and builds this tip;</text>
      <text x="466" y="268" fontSize="7.2" className="fill-current text-muted-foreground">absorption happens in zone 4 only.</text>
    </svg>
  );
}
