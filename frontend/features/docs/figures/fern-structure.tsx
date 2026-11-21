/** Fern structure — rhizome, roots, frond with pinnae, sori. Theme-aware. */
export function FernStructure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Fern structure with underground rhizome adventitious roots stipe and large frond divided into pinnae bearing sori underneath">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Dryopteris — the fern body plan</text>

      {/* rhizome */}
      <path d="M80 220 q80 -18 180 -6 q80 8 160 -4" fill="none" strokeWidth="16" strokeLinecap="round" className="stroke-current text-stone-500/60" />
      <text x="90" y="252" fontSize="8.5" className="fill-current text-muted-foreground">underground RHIZOME (stem) with adventitious roots below</text>

      {/* fronds */}
      {[
        { x: 260, h: 150 },
        { x: 380, h: 180 },
        { x: 500, h: 150 },
      ].map((f, fi) => (
        <g key={fi}>
          <line x1={f.x} y1="212" x2={f.x} y2={212 - f.h} strokeWidth="4" className="stroke-current text-emerald-700" />
          {Array.from({ length: 7 }, (_, i) => {
            const y = 200 - i * (f.h - 20) / 7;
            const w = 44 - i * 4;
            return (
              <g key={i}>
                <path d={`M${f.x} ${y} q${-w / 2} -6 ${-w} 0`} fill="none" strokeWidth="7" strokeLinecap="round" className="stroke-current text-emerald-500/70" />
                <path d={`M${f.x} ${y} q${w / 2} -6 ${w} 0`} fill="none" strokeWidth="7" strokeLinecap="round" className="stroke-current text-emerald-500/70" />
              </g>
            );
          })}
        </g>
      ))}
      <text x="560" y="70" fontSize="8.5" className="fill-current text-foreground" fontWeight="700">FROND</text>
      <text x="560" y="84" fontSize="8" className="fill-current text-muted-foreground">= stipe + blade,</text>
      <text x="560" y="98" fontSize="8" className="fill-current text-muted-foreground">blade divided into PINNAE</text>

      {/* sori */}
      {[[380, 150], [396, 138], [364, 162]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" className="fill-current text-amber-600/80" />
      ))}
      <text x="200" y="120" fontSize="8.5" className="fill-current text-amber-700 dark:text-amber-300" fontWeight="700">SORI — brown spore clusters under pinnae</text>

      <text x="16" y="272" fontSize="10" className="fill-current text-muted-foreground">The big plant IS the sporophyte — true roots, true vascular tissue, but still reproducing by spores, not seeds.</text>
    </svg>
  );
}
