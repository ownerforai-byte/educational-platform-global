/**
 * Wave anatomy + wavefronts — amplitude, wavelength, crest/trough on a
 * progressive wave, with parallel wavefront lines radiating from a source.
 * Theme-aware via currentColor.
 */
export function WaveProperties({ className }: { className?: string }) {
  // sine path: crest at y=90, trough at y=210, midline y=150, λ = 220 px
  const pts: string[] = [];
  for (let x = 0; x <= 420; x += 10) {
    const y = 150 - 60 * Math.sin((2 * Math.PI * x) / 220);
    pts.push(`${x},${y.toFixed(1)}`);
  }
  return (
    <svg viewBox="0 0 640 360" className={className} role="img" aria-label="Wave anatomy with amplitude and wavelength, plus wavefronts from a point source">
      {/* midline */}
      <line x1="0" y1="150" x2="430" y2="150" strokeWidth="1.5" strokeDasharray="6 6" className="stroke-current text-muted-foreground" />
      <text x="436" y="154" fontSize="11" className="fill-current text-muted-foreground">rest position</text>

      {/* the wave */}
      <polyline points={pts.join(" ")} fill="none" strokeWidth="3.5" className="stroke-current text-primary" />

      {/* amplitude bracket */}
      <line x1="110" y1="90" x2="110" y2="150" strokeWidth="2" className="stroke-current text-rose-500" />
      <line x1="102" y1="90" x2="118" y2="90" strokeWidth="2" className="stroke-current text-rose-500" />
      <line x1="102" y1="150" x2="118" y2="150" strokeWidth="2" className="stroke-current text-rose-500" />
      <text x="118" y="124" fontSize="14" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="800">a</text>
      <text x="20" y="76" fontSize="12" className="fill-current text-muted-foreground">amplitude a</text>

      {/* wavelength bracket (one full cycle) */}
      <line x1="110" y1="240" x2="330" y2="240" strokeWidth="2" className="stroke-current text-sky-500" />
      <line x1="110" y1="232" x2="110" y2="248" strokeWidth="2" className="stroke-current text-sky-500" />
      <line x1="330" y1="232" x2="330" y2="248" strokeWidth="2" className="stroke-current text-sky-500" />
      <text x="196" y="262" fontSize="14" className="fill-current text-sky-600 dark:text-sky-400" fontWeight="800">λ (wavelength)</text>

      {/* crest / trough labels */}
      <text x="96" y="80" fontSize="12" className="fill-current text-muted-foreground">crest</text>
      <text x="300" y="236" fontSize="12" className="fill-current text-muted-foreground">trough</text>

      {/* period note */}
      <text x="20" y="306" fontSize="12" className="fill-current text-muted-foreground">one oscillation = period T → f = 1/T</text>

      {/* divider */}
      <line x1="450" y1="20" x2="450" y2="340" strokeWidth="1" strokeDasharray="6 6" className="stroke-current text-border" />

      {/* wavefronts from a point source (right panel) */}
      <circle cx="545" cy="180" r="8" className="fill-current text-amber-500" />
      <text x="500" y="160" fontSize="12" className="fill-current text-muted-foreground">source</text>
      {[40, 75, 110, 145].map((r) => (
        <circle
          key={r} cx="545" cy="180" r={r} fill="none" strokeWidth="2"
          className="stroke-current text-primary"
        />
      ))}
      {/* rays */}
      <line x1="545" y1="180" x2="636" y2="180" strokeWidth="1.5" strokeDasharray="5 5" className="stroke-current text-muted-foreground" />
      <line x1="545" y1="180" x2="622" y2="90" strokeWidth="1.5" strokeDasharray="5 5" className="stroke-current text-muted-foreground" />
      <text x="480" y="330" fontSize="12" className="fill-current text-muted-foreground">wavefronts ⊥ ray direction;</text>
      <text x="480" y="348" fontSize="12" className="fill-current text-muted-foreground">Huygens: each point is a new source</text>
    </svg>
  );
}
