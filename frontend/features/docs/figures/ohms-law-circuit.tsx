/**
 * Ohm's-law circuit — cell, ammeter (series), resistor, voltmeter (parallel).
 * Theme-aware: strokes use currentColor with Tailwind color classes.
 */
export function OhmsLawCircuit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 360" className={className} role="img" aria-label="Simple circuit demonstrating Ohm's law">
      {/* wire loop */}
      <polyline
        points="120,90 120,280 520,280 520,90"
        fill="none" strokeWidth="3" className="stroke-current text-foreground"
      />
      {/* cell (long/short parallel lines) on top side */}
      <line x1="120" y1="90" x2="300" y2="90" strokeWidth="3" className="stroke-current text-foreground" />
      <line x1="300" y1="66" x2="300" y2="114" strokeWidth="4" className="stroke-current text-amber-500" />
      <line x1="318" y1="76" x2="318" y2="104" strokeWidth="4" className="stroke-current text-amber-500" />
      <line x1="318" y1="90" x2="520" y2="90" strokeWidth="3" className="stroke-current text-foreground" />
      <text x="286" y="52" fontSize="13" className="fill-current text-amber-600 dark:text-amber-400" fontWeight="700">V (cell)</text>
      <text x="258" y="132" fontSize="12" className="fill-current text-muted-foreground">+ long line, − short line</text>

      {/* current direction arrow */}
      <line x1="150" y1="140" x2="150" y2="220" strokeWidth="2.5" className="stroke-current text-sky-500" />
      <polygon points="141,204 150,226 159,204" className="fill-current text-sky-500" />
      <text x="60" y="186" fontSize="13" className="fill-current text-sky-600 dark:text-sky-400" fontWeight="700">current I</text>

      {/* ammeter in series (circle with A) on right wire */}
      <circle cx="520" cy="185" r="26" className="fill-current text-card" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(0 0 0 / 0.25)" }} />
      <text x="512" y="192" fontSize="18" className="fill-current text-sky-600 dark:text-sky-400" fontWeight="800">A</text>
      <text x="556" y="190" fontSize="12" className="fill-current text-muted-foreground">ammeter (series)</text>

      {/* resistor (zig-zag) on bottom wire */}
      <polyline
        points="250,280 266,262 296,298 326,262 356,298 386,262 402,280"
        fill="none" strokeWidth="3" className="stroke-current text-rose-500"
      />
      <text x="296" y="326" fontSize="14" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">R (resistor)</text>

      {/* voltmeter in parallel with resistor */}
      <line x1="286" y1="280" x2="286" y2="220" strokeWidth="2" className="stroke-current text-muted-foreground" />
      <line x1="366" y1="280" x2="366" y2="220" strokeWidth="2" className="stroke-current text-muted-foreground" />
      <line x1="286" y1="220" x2="366" y2="220" strokeWidth="2" className="stroke-current text-muted-foreground" />
      <circle cx="326" cy="200" r="24" className="fill-current text-card" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(0 0 0 / 0.25)" }} />
      <text x="317" y="207" fontSize="16" className="fill-current text-emerald-600 dark:text-emerald-400" fontWeight="800">V</text>
      <text x="356" y="164" fontSize="12" className="fill-current text-muted-foreground">voltmeter (parallel)</text>

      {/* law annotation */}
      <g>
        <rect x="30" y="220" width="150" height="44" rx="10" className="fill-current text-card" stroke="currentColor" style={{ color: "rgb(0 0 0 / 0.12)" }} />
        <text x="46" y="248" fontSize="16" className="fill-current text-foreground" fontWeight="800">V = I R</text>
      </g>
    </svg>
  );
}
