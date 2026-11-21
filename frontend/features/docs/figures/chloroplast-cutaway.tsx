/**
 * Chloroplast cutaway — double membrane, grana stacks of thylakoids,
 * stroma with circular DNA. Theme-aware via currentColor.
 */
export function ChloroplastCutaway({ className }: { className?: string }) {
  const granum = (x: number, y: number) => (
    <g key={`${x}-${y}`} style={{ color: "rgb(22 163 74 / 0.9)" }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={x} y={y + i * 14} width="64" height="9" rx="3" className="fill-current text-green-600/60" strokeWidth="1.5" stroke="currentColor" />
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 640 340" className={className} role="img" aria-label="Cutaway of a chloroplast showing the double membrane, stacked grana of thylakoids connected by stroma lamellae, and the stroma containing circular DNA and ribosomes">
      <text x="16" y="28" fontSize="14" className="fill-current text-foreground" fontWeight="800">Chloroplast — the photosynthesis factory, cut open</text>

      {/* outer + inner membranes */}
      <ellipse cx="320" cy="180" rx="270" ry="120" fill="none" strokeWidth="4" className="stroke-current text-emerald-600" />
      <ellipse cx="320" cy="180" rx="252" ry="102" fill="none" strokeWidth="2.5" strokeDasharray="6 3" className="stroke-current text-emerald-500" />

      {/* stroma */}
      <ellipse cx="320" cy="180" rx="246" ry="96" className="fill-current text-green-500/5" stroke="none" />
      <text x="196" y="120" fontSize="12" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="800">stroma</text>
      <text x="196" y="136" fontSize="9.5" className="fill-current text-muted-foreground">dark reaction (Calvin cycle) here — CO₂ → glucose</text>

      {/* grana stacks */}
      {granum(150, 150)}
      {granum(250, 196)}
      {granum(360, 150)}
      {granum(460, 200)}
      {/* stroma lamellae connecting grana */}
      <g className="stroke-current text-green-600" strokeWidth="3" fill="none" style={{ color: "rgb(22 163 74 / 0.7)" }}>
        <line x1="214" y1="178" x2="250" y2="206" />
        <line x1="314" y1="224" x2="360" y2="178" />
        <line x1="424" y1="178" x2="460" y2="214" />
      </g>

      {/* labels */}
      <text x="118" y="140" fontSize="10.5" className="fill-current text-green-700 dark:text-green-400" fontWeight="700">granum = stack of thylakoids</text>
      <text x="404" y="140" fontSize="10.5" className="fill-current text-green-700 dark:text-green-400" fontWeight="700">light reaction on thylakoid membranes</text>
      <text x="470" y="188" fontSize="10" className="fill-current text-muted-foreground">stroma lamella connects grana</text>

      {/* DNA + ribosomes */}
      <circle cx="540" cy="120" r="14" fill="none" strokeWidth="2.5" className="stroke-current text-violet-600" style={{ color: "rgb(124 58 237)" }} />
      <text x="500" y="98" fontSize="9.5" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="700">circular DNA</text>
      <g className="fill-current text-slate-500">
        <circle cx="300" cy="256" r="4" /><circle cx="320" cy="264" r="4" /><circle cx="340" cy="256" r="4" />
      </g>
      <text x="280" y="284" fontSize="9.5" className="fill-current text-muted-foreground" fontWeight="700">70S ribosomes (semi-autonomous, like mitochondria)</text>

      {/* outer labels */}
      <text x="90" y="84" fontSize="11" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">double membrane — outer smooth, inner encloses stroma</text>
      <text x="16" y="322" fontSize="10" className="fill-current text-muted-foreground">Chlorophyll a &amp; b sit in the thylakoid membranes; 6CO₂ + 12H₂O → C₆H₁₂O₆ + 6O₂ + 6H₂O (light + chlorophyll).</text>
    </svg>
  );
}
