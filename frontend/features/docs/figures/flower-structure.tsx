/** Flower structure — four whorls in cross-section with labels. Theme-aware. */
export function FlowerStructure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Flower structure four whorls calyx corolla androecium with anther and filament gynoecium with ovary style stigma and receptacle thalamus">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The flower — four whorls on a receptacle</text>

      {/* receptacle + pedicel */}
      <line x1="330" y1="220" x2="330" y2="180" strokeWidth="5" className="stroke-current text-emerald-700" />
      <ellipse cx="330" cy="176" rx="24" ry="8" className="fill-current text-emerald-700/60" />
      <text x="380" y="216" fontSize="8.5" className="fill-current text-muted-foreground">receptacle (thalamus) — all whorls sit here</text>

      {/* calyx */}
      {[[-1, 0], [1, 0]].map(([s]) => (
        <path key={s} d={`M330 176 q${40 * s} 6 ${54 * s} 26 q${-30 * s} 6 ${-54 * s} -26 Z`} className="fill-current text-emerald-500/50" />
      ))}
      <text x="200" y="216" fontSize="8.5" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">CALYX — sepals (outermost, green)</text>

      {/* corolla */}
      {[[-1], [1]].map(([s]) => (
        <ellipse key={s} cx={330 + 44 * s} cy="140" rx="40" ry="20" transform={`rotate(${-25 * s} ${330 + 44 * s} 140)`} className="fill-current text-rose-400/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(251 113 133 / 0.9)" }} />
      ))}
      <text x="80" y="120" fontSize="8.5" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">COROLLA — petals (colour, attraction)</text>

      {/* androecium */}
      {[[300, 108], [330, 100], [360, 108]].map(([x, y], i) => (
        <g key={i}>
          <line x1="330" y1="150" x2={x} y2={y + 8} strokeWidth="2" className="stroke-current text-amber-600" />
          <ellipse cx={x} cy={y} rx="8" ry="5" className="fill-current text-amber-500/70" />
        </g>
      ))}
      <text x="420" y="96" fontSize="8.5" className="fill-current text-amber-700 dark:text-amber-300" fontWeight="700">ANDROECIUM — stamens</text>
      <text x="420" y="112" fontSize="8" className="fill-current text-muted-foreground">filament + anther (pollen = male gametes)</text>

      {/* gynoecium */}
      <ellipse cx="330" cy="140" rx="16" ry="24" className="fill-current text-violet-500/30" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
      <line x1="330" y1="116" x2="330" y2="92" strokeWidth="3" className="stroke-current text-violet-600" />
      <circle cx="330" cy="88" r="7" className="fill-current text-violet-500/60" />
      <text x="120" y="86" fontSize="8.5" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="700">GYNOECIUM — carpel</text>
      <text x="120" y="102" fontSize="8" className="fill-current text-muted-foreground">ovary (ovules inside) → style → sticky stigma</text>

      <text x="16" y="248" fontSize="10" className="fill-current text-muted-foreground">Order outside-in: calyx → corolla → androecium → gynoecium. Complete flower has all four; bisexual has both sex whorls.</text>
    </svg>
  );
}
