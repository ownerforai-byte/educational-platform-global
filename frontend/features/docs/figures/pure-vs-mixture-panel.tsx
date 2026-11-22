// Pure substance vs mixture contrast. Theme-aware.
export function PureVsMixturePanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Pure substance versus mixture comparison fixed composition variable composition separation by physical methods melting point sharp versus ranged">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Pure substance vs mixture — four decisive tests</text>
      {[
        ["Composition", "fixed, definite ratio", "variable, any ratio", 30],
        ["Separation", "only by chemical change", "by physical methods", 30],
        ["Melting / boiling", "sharp, characteristic", "over a range", 370],
        ["Energy change on mixing", "new substance forms", "usually none", 370],
      ].map(([prop, pure, mix, x], i) => (
        <g key={String(prop)}>
          <rect x={Number(x)} y={40 + Math.floor(i / 2) * 78} width="320" height="70" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x={Number(x) + 16} y={60 + Math.floor(i / 2) * 78} fontSize="9.5" className="fill-current text-sky-600" fontWeight="800">{String(prop)}</text>
          <text x={Number(x) + 16} y={80 + Math.floor(i / 2) * 78} fontSize="8.4" className="fill-current text-emerald-600" fontWeight="700">Pure: {String(pure)}</text>
          <text x={Number(x) + 16} y={98 + Math.floor(i / 2) * 78} fontSize="8.4" className="fill-current text-amber-600" fontWeight="700">Mixture: {String(mix)}</text>
        </g>
      ))}
      <rect x="30" y="184" width="660" height="26" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="201" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Iron + sulphur heated = compound (FeS, new properties); merely stirred = mixture (magnet still pulls the iron out).</text>
    </svg>
  );
}
