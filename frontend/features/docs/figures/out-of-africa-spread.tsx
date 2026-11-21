/** Out-of-Africa spread of Homo. Theme-aware. */
export function OutOfAfricaSpread({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Out of Africa spread Homo erectus left Africa 1.8 mya modern Homo sapiens left 60 to 70 kya reaching Australia 50 kya Americas 15 kya and Nepal settling every ecological zone">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Out of Africa — the human spread</text>

      <ellipse cx="330" cy="120" rx="180" ry="80" className="fill-current text-stone-500/10" stroke="currentColor" strokeWidth="2.5" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <circle cx="290" cy="120" r="10" className="fill-current text-rose-500" />
      <text x="290" y="150" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">AFRICA</text>

      {[
        { x: 380, y: 90, t: "H. erectus leaves ~1.8 mya" },
        { x: 430, y: 70, t: "H. sapiens leaves ~60–70 kya" },
        { x: 480, y: 110, t: "Australia ~50 kya" },
        { x: 440, y: 160, t: "Americas ~15 kya" },
      ].map((p) => (
        <g key={p.t}>
          <path d={`M300 120 L${p.x} ${p.y}`} strokeWidth="2" strokeDasharray="5 4" className="stroke-current text-sky-500" />
          <circle cx={p.x} cy={p.y} r="4" className="fill-current text-sky-500" />
          <text x={p.x + 6} y={p.y + 4} fontSize="6.8" className="fill-current text-muted-foreground">{p.t}</text>
        </g>
      ))}
      <text x="16" y="216" fontSize="8.4" className="fill-current text-muted-foreground">In Nepal's case: settled every ecological zone from Terai to high Himalaya.</text>
    </svg>
  );
}
