/**
 * Tangent and normal to a curve — derivative as slope; normal ⊥ tangent.
 * Theme-aware via currentColor.
 */
export function DerivativeTangentLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 360" className={className} role="img" aria-label="Curve with tangent and normal lines at a point">
      {/* axes */}
      <line x1="60" y1="310" x2="600" y2="310" strokeWidth="2" className="stroke-current text-muted-foreground" />
      <line x1="80" y1="330" x2="80" y2="30" strokeWidth="2" className="stroke-current text-muted-foreground" />
      <polygon points="594,304 610,310 594,316" className="fill-current text-muted-foreground" />
      <polygon points="74,38 80,22 86,38" className="fill-current text-muted-foreground" />
      <text x="596" y="336" fontSize="13" className="fill-current text-muted-foreground">x</text>
      <text x="66" y="24" fontSize="13" className="fill-current text-muted-foreground">y</text>
      <text x="90" y="330" fontSize="12" className="fill-current text-muted-foreground">O</text>

      {/* curve y = f(x) (smooth cubic-ish rise) */}
      <path
        d="M 90 290 C 190 290 240 240 300 180 C 360 120 420 80 560 60"
        fill="none" strokeWidth="3.5" className="stroke-current text-primary"
      />
      <text x="470" y="46" fontSize="14" className="fill-current text-primary" fontWeight="700">y = f(x)</text>

      {/* point P on the curve */}
      <circle cx="300" cy="180" r="7" className="fill-current text-rose-500" />
      <text x="292" y="164" fontSize="15" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="800">P (a, f(a))</text>

      {/* tangent line (slope positive, moderate) */}
      <line x1="150" y1="258" x2="470" y2="94" strokeWidth="2.5" className="stroke-current text-emerald-500" />
      <text x="428" y="120" fontSize="13" className="fill-current text-emerald-600 dark:text-emerald-400" fontWeight="700">tangent</text>
      <text x="428" y="138" fontSize="12" className="fill-current text-muted-foreground">slope = f′(a)</text>

      {/* normal line (perpendicular: steeper negative slope) */}
      <line x1="300" y1="180" x2="392" y2="322" strokeWidth="2.5" className="stroke-current text-sky-500" />
      <text x="398" y="308" fontSize="13" className="fill-current text-sky-600 dark:text-sky-400" fontWeight="700">normal</text>
      <text x="398" y="326" fontSize="12" className="fill-current text-muted-foreground">slope = −1/f′(a)</text>

      {/* right-angle marker between tangent and normal at P */}
      <polyline points="322,168 334,190 312,202" fill="none" strokeWidth="1.5" className="stroke-current text-muted-foreground" />

      {/* takeaway */}
      <g>
        <rect x="430" y="220" width="180" height="70" rx="10" className="fill-current text-card" stroke="currentColor" style={{ color: "rgb(0 0 0 / 0.12)" }} />
        <text x="446" y="246" fontSize="13" className="fill-current text-foreground" fontWeight="700">tangent slope = f′(a)</text>
        <text x="446" y="266" fontSize="13" className="fill-current text-foreground" fontWeight="700">normal slope = −1/f′(a)</text>
        <text x="446" y="283" fontSize="10" className="fill-current text-muted-foreground">product of slopes = −1</text>
      </g>
    </svg>
  );
}
