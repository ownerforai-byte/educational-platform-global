/** Stem morphology — node, internode, buds, and stem modifications. Theme-aware. */
export function StemMorphology({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Stem morphology with nodes internodes terminal and axillary buds leaves and modifications like runner tendril thorn and tuber">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Reading a stem — nodes tell the story</text>

      {/* stem */}
      <line x1="150" y1="230" x2="150" y2="60" strokeWidth="8" strokeLinecap="round" className="stroke-current text-emerald-700" />
      {[80, 130, 180].map((y) => (
        <g key={y}>
          <circle cx="150" cy={y} r="5" className="fill-current text-amber-500/80" />
          <line x1="150" y1={y} x2="205" y2={y - 24} strokeWidth="3" className="stroke-current text-emerald-500" />
          <ellipse cx="215" cy={y - 29} rx="14" ry="6" className="fill-current text-emerald-500/60" />
          <circle cx="142" cy={y + 6} r="4" className="fill-current text-sky-500/70" />
        </g>
      ))}
      <text x="240" y="84" fontSize="8.5" className="fill-current text-foreground" fontWeight="700">leaf + axillary bud at each NODE</text>
      <text x="240" y="100" fontSize="8" className="fill-current text-muted-foreground">internode = stretch between nodes</text>
      <text x="240" y="116" fontSize="8.5" className="fill-current text-foreground" fontWeight="700">terminal bud caps the tip</text>
      <text x="240" y="132" fontSize="8" className="fill-current text-muted-foreground">stem is normally upright & green (photosynthesises when young)</text>

      {/* modifications */}
      {[
        { x: 470, y: 70, t: "RUNNER", s: "horizontal spread (grass)" },
        { x: 470, y: 118, t: "TENDRIL", s: "climbing coil (pea)" },
        { x: 470, y: 166, t: "THORN", s: "protection (citrus)" },
        { x: 470, y: 214, t: "TUBER", s: "underground store (potato)" },
      ].map((m) => (
        <g key={m.t}>
          <rect x={m.x - 110} y={m.y - 16} width="220" height="30" rx="8" className="fill-current text-violet-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
          <text x={m.x - 96} y={m.y + 4} fontSize="8.5" className="fill-current text-foreground" fontWeight="700">{m.t}</text>
          <text x={m.x + 20} y={m.y + 4} fontSize="8" className="fill-current text-muted-foreground">{m.s}</text>
        </g>
      ))}

      <text x="16" y="248" fontSize="10" className="fill-current text-muted-foreground">Buds are embryonic shoots in waiting — the axillary bud can become a branch, a flower, or a thorn, depending on the signals.</text>
    </svg>
  );
}
