/**
 * Acid rain formation — SO₂ and NOx from combustion react with water
 * vapour to form acids; effects on lakes, soil, buildings. Theme-aware.
 */
export function AcidRainFormation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Acid rain formation from sulphur dioxide and nitrogen oxides emitted by factories and vehicles reacting with water vapour to form sulphuric and nitric acid falling on lakes soil and buildings">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Acid rain — from smokestack to lakebed (pH &lt; 5.6)</text>

      {/* sources */}
      <g>
        <rect x="60" y="70" width="130" height="50" rx="10" className="fill-current text-slate-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(87 83 78 / 0.9)" }} />
        <rect x="115" y="40" width="14" height="30" className="fill-current text-slate-500/40" />
        <text x="125" y="94" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">coal plants, smelters</text>
        <rect x="240" y="70" width="130" height="50" rx="10" className="fill-current text-slate-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(87 83 78 / 0.9)" }} />
        <text x="305" y="94" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">vehicles (NOx)</text>
        <text x="90" y="58" fontSize="9" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="800">SO₂ ↑</text>
        <text x="280" y="58" fontSize="9" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="800">NOx ↑</text>
      </g>

      {/* chemistry cloud */}
      <ellipse cx="330" cy="150" rx="150" ry="30" className="fill-current text-slate-400/25" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(148 163 184 / 0.9)" }} />
      <text x="330" y="146" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">react with water vapour in clouds:</text>
      <text x="330" y="162" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">SO₂ + H₂O → H₂SO₄ · NOx + H₂O → HNO₃</text>

      {/* rain */}
      <g className="stroke-current text-sky-500" strokeWidth="2.5">
        <line x1="290" y1="184" x2="282" y2="212" /><line x1="330" y1="184" x2="322" y2="216" /><line x1="370" y1="184" x2="362" y2="212" />
      </g>
      <text x="330" y="234" fontSize="9.5" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">ACID RAIN (pH 4–5)</text>

      {/* effects */}
      {[
        { x: 60, t: "lakes acidify — fish eggs fail (pH < 5)" },
        { x: 220, t: "soil: Ca, Mg leached; Al released to roots" },
        { x: 420, t: "leaves damaged; forests decline" },
        { x: 60, t: "marble & limestone buildings corrode" },
        { x: 220, t: "human: asthma, bronchitis" },
      ].map((e, i) => (
        <text key={i} x={e.x} y={258 + (i > 2 ? 22 : 0)} fontSize="8.5" className="fill-current text-muted-foreground">• {e.t}</text>
      ))}
      <text x="480" y="280" fontSize="9" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">Fix: scrubbers, low-S coal, catalytic converters.</text>
    </svg>
  );
}
