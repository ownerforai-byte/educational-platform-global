/**
 * Faraday's law of electromagnetic induction — moving a magnet through a
 * coil induces current; polarity depends on the direction of motion.
 * Theme-aware via currentColor.
 */
export function FaradayInduction({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 380" className={className} role="img" aria-label="Faraday's experiment with a bar magnet moving through a solenoid connected to a galvanometer">
      {/* solenoid coil (side view, ~5 loops) */}
      {Array.from({ length: 5 }).map((_, i) => {
        const x = 250 + i * 34;
        return (
          <ellipse
            key={i}
            cx={x}
            cy="170"
            rx="16"
            ry="56"
            fill="none"
            strokeWidth="2.5"
            className="stroke-current text-amber-500"
          />
        );
      })}
      <text x="320" y="248" fontSize="12.5" textAnchor="middle" className="fill-current text-amber-700 dark:text-amber-300" fontWeight="700">solenoid / coil</text>

      {/* bar magnet sliding in from the left, N pole first */}
      <g>
        <rect x="70" y="128" width="140" height="84" rx="6" className="fill-current text-rose-500/30" />
        <rect x="70" y="128" width="62" height="84" rx="6" className="fill-current text-rose-500/60" />
        <text x="101" y="176" fontSize="22" textAnchor="middle" className="fill-current text-rose-700 dark:text-rose-300" fontWeight="800">N</text>
        <text x="169" y="176" fontSize="22" textAnchor="middle" className="fill-current text-slate-600 dark:text-slate-300" fontWeight="800">S</text>
        <line x1="210" y1="170" x2="244" y2="170" strokeWidth="3" className="stroke-current text-emerald-500" />
        <polygon points="238,160 256,170 238,180" className="fill-current text-emerald-500" />
      </g>
      <text x="150" y="112" fontSize="12" textAnchor="middle" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">motion in →</text>

      {/* wires to galvanometer */}
      <path d="M 250 114 L 250 62 L 420 62" fill="none" strokeWidth="2.5" className="stroke-current text-foreground" />
      <path d="M 386 114 L 386 62 L 420 62" fill="none" strokeWidth="2.5" className="stroke-current text-foreground" />

      {/* galvanometer */}
      <circle cx="470" cy="62" r="40" fill="none" strokeWidth="2.5" className="stroke-current text-foreground" />
      <line x1="470" y1="62" x2="486" y2="40" strokeWidth="2.5" className="stroke-current text-rose-500" />
      <circle cx="470" cy="62" r="3" className="fill-current text-foreground" />
      <text x="470" y="118" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">galvanometer</text>
      <text x="470" y="132" fontSize="11" textAnchor="middle" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">needle deflects while moving</text>

      {/* flux linkage annotation */}
      <g>
        <rect x="70" y="288" width="500" height="66" rx="12" className="fill-current text-card" stroke="currentColor" style={{ color: "rgb(0 0 0 / 0.12)" }} />
        <text x="88" y="312" fontSize="13" className="fill-current text-foreground" fontWeight="700">ε = −N dΦ/dt</text>
        <text x="212" y="312" fontSize="13" className="fill-current text-muted-foreground">|</text>
        <text x="226" y="312" fontSize="13" className="fill-current text-foreground" fontWeight="700">emf appears while flux through the coil changes</text>
        <text x="88" y="334" fontSize="11.5" className="fill-current text-muted-foreground">No deflection when the magnet is still inside — only while it moves (or the current changes, for mutual induction).</text>
      </g>
    </svg>
  );
}
