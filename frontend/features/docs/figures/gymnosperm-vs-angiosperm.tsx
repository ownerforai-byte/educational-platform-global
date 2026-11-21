/** Gymnosperm vs angiosperm — naked seed vs enclosed seed. Theme-aware. */
export function GymnospermVsAngiosperm({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Gymnosperm naked seed exposed on cone scale versus angiosperm seed enclosed within fruit from ovary comparison">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Gymnosperm literally means 'naked seed'</text>

      {/* gymnosperm cone with exposed seed */}
      <g>
        <rect x="40" y="56" width="290" height="150" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        <ellipse cx="150" cy="140" rx="44" ry="58" className="fill-current text-amber-600/30" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            {[-1, 1].map((s) => (
              <path key={s} d={`M150 ${100 + r * 26} q${34 * s} -8 ${30 * s} 14`} fill="none" strokeWidth="4" className="stroke-current text-amber-700/70" />
            ))}
          </g>
        ))}
        <circle cx="196" cy="112" r="9" className="fill-current text-rose-500/70" />
        <text x="216" y="108" fontSize="8.5" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">seed sits EXPOSED on the scale</text>
        <text x="216" y="124" fontSize="8" className="fill-current text-muted-foreground">no ovary, no fruit wall</text>
        <text x="56" y="196" fontSize="8.5" className="fill-current text-muted-foreground">ovule lies naked on a megasporophyll (cone scale)</text>
      </g>

      {/* angiosperm flower/fruit */}
      <g>
        <rect x="350" y="56" width="290" height="150" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <circle cx="470" cy="130" r="34" className="fill-current text-rose-500/30" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        <circle cx="470" cy="130" r="10" className="fill-current text-emerald-700/70" />
        <text x="530" y="120" fontSize="8.5" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">ovary ENCLOSES the ovules</text>
        <text x="530" y="136" fontSize="8" className="fill-current text-muted-foreground">seed develops inside a fruit</text>
        <text x="366" y="196" fontSize="8.5" className="fill-current text-muted-foreground">angiosperm = 'vessel seed' — the fruit is the vessel</text>
      </g>

      <text x="16" y="226" fontSize="10" className="fill-current text-muted-foreground">Other gymnosperm signatures: no double fertilisation, no vessel elements in xylem (except Gnetum), wind pollination.</text>
    </svg>
  );
}
