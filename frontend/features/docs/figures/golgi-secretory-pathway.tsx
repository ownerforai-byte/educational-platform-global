/**
 * ER–Golgi secretory pathway — rough ER → transport vesicles → Golgi
 * cisternae (cis → trans) → secretory vesicles → plasma membrane, with
 * lysosome budding. Theme-aware via currentColor.
 */
export function GolgiSecretoryPathway({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 340" className={className} role="img" aria-label="Secretory pathway diagram showing rough endoplasmic reticulum with ribosomes, transport vesicles, the Golgi apparatus stack of cisternae, budding secretory vesicles and lysosomes heading to the plasma membrane">
      <text x="16" y="28" fontSize="14" className="fill-current text-foreground" fontWeight="800">The endomembrane assembly line — ER → Golgi → out</text>

      {/* rough ER */}
      <g className="stroke-current text-teal-500" strokeWidth="4" fill="none" style={{ color: "rgb(20 184 166 / 0.85)" }}>
        <path d="M40 80 q60 -30 110 0 q50 30 100 0" />
        <path d="M46 102 q54 -26 98 0 q46 24 96 0" />
        <path d="M52 124 q48 -22 86 0 q40 20 88 0" />
      </g>
      {/* ribosomes on ER */}
      <g className="fill-current text-slate-500">
        <circle cx="70" cy="88" r="4" /><circle cx="100" cy="82" r="4" /><circle cx="130" cy="88" r="4" /><circle cx="170" cy="82" r="4" /><circle cx="90" cy="110" r="4" /><circle cx="140" cy="106" r="4" />
      </g>
      <text x="40" y="152" fontSize="11" className="fill-current text-teal-700 dark:text-teal-300" fontWeight="700">Rough ER — protein synthesis (ribosomes studded)</text>

      {/* transport vesicles */}
      <g>
        <circle cx="270" cy="96" r="14" className="fill-current text-sky-500/20" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <circle cx="292" cy="120" r="10" className="fill-current text-sky-500/20" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <text x="240" y="66" fontSize="10.5" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">transport vesicles</text>
        <line x1="250" y1="100" x2="300" y2="112" strokeWidth="2.5" className="stroke-current text-foreground" />
        <polygon points="292,106 310,114 292,120" className="fill-current text-foreground" />
      </g>

      {/* Golgi stack */}
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M350 ${96 + i * 26} q60 ${i % 2 === 0 ? -18 : -10} 120 0`} fill="none" strokeWidth="6" strokeLinecap="round" className="stroke-current text-amber-500" style={{ color: "rgb(245 158 11 / 0.85)" }} />
        ))}
        <text x="478" y="96" fontSize="11" className="fill-current text-amber-600 dark:text-amber-400" fontWeight="700">Golgi apparatus</text>
        <text x="478" y="112" fontSize="9.5" className="fill-current text-muted-foreground">cis face (receiving, top) →</text>
        <text x="478" y="126" fontSize="9.5" className="fill-current text-muted-foreground">trans face (shipping, bottom)</text>
        <text x="352" y="232" fontSize="9.5" className="fill-current text-muted-foreground">modifies (glycosylation), sorts, packages</text>
      </g>

      {/* secretory vesicles to membrane */}
      <g>
        <circle cx="410" cy="266" r="13" className="fill-current text-emerald-500/20" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
        <circle cx="452" cy="286" r="11" className="fill-current text-emerald-500/20" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
        <line x1="410" y1="252" x2="450" y2="296" strokeWidth="2.5" className="stroke-current text-foreground" />
        <polygon points="442,290 458,300 444,304" className="fill-current text-foreground" />
        <text x="486" y="296" fontSize="10.5" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">secretory vesicles → exocytosis</text>
      </g>

      {/* lysosome budding */}
      <g>
        <circle cx="330" cy="270" r="17" className="fill-current text-orange-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(249 115 22 / 0.9)" }} />
        <circle cx="326" cy="266" r="3" className="fill-current text-orange-600" /><circle cx="336" cy="274" r="3" className="fill-current text-orange-600" />
        <text x="244" y="298" fontSize="10.5" className="fill-current text-orange-600 dark:text-orange-400" fontWeight="700">lysosome (hydrolytic enzymes)</text>
      </g>

      {/* plasma membrane target */}
      <rect x="540" y="60" width="14" height="240" rx="7" className="fill-current text-sky-500/20" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.85)" }} />
      <text x="560" y="180" fontSize="10.5" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700" transform="rotate(90 560 180)">plasma membrane</text>

      <text x="16" y="326" fontSize="10" className="fill-current text-muted-foreground">One continuous system: rough ER makes the protein → vesicle ferries it → Golgi polishes and addresses it → vesicle ships it out or to the lysosome for digestion.</text>
    </svg>
  );
}
