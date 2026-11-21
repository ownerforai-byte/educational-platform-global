/** Darwin voyage Beagle — how the theory was built. Well-detailed. Theme-aware. */
export function DarwinVoyageBeagle({ className }: { className?: string }) {
  const stops: [string, string][] = [
    ["England (1831)", "departs as naturalist on HMS Beagle"],
    ["South America", "fossil glyptodonts resemble living armadillos"],
    ["Galapagos", "finches differ island by island — beaks fit local seeds"],
    ["Back home (1836)", "five years of notes become one dangerous idea"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Darwin voyage HMS Beagle 1831 South America fossils Galapagos finches origin of species 1859 journey map steps">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The voyage that built the theory (1831–1836)</text>
      <path d="M60 210 q120 -60 240 -40 q140 20 260 -30 q80 -30 130 -20" className="fill-none stroke-current text-sky-500" strokeWidth="2.4" strokeDasharray="8 5" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {stops.map(([place, note], i) => {
        const x = 60 + i * 168;
        return (
          <g key={place}>
            <circle cx={x} cy={i === 0 ? 210 : i === 1 ? 150 : i === 2 ? 128 : 148} r="7" className="fill-current text-amber-500/50" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(217 119 6 / 0.9)" }} />
            <text x={x} y={i === 0 ? 238 : i === 1 ? 178 : i === 2 ? 156 : 176} fontSize="7.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{place}</text>
            <text x={x} y={i === 0 ? 250 : i === 1 ? 190 : i === 2 ? 168 : 188} fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">{note.slice(0, 34)}</text>
            <text x={x} y={i === 0 ? 260 : i === 1 ? 200 : i === 2 ? 178 : 198} fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">{note.slice(34, 68)}</text>
          </g>
        );
      })}
      <rect x="30" y="48" width="660" height="52" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="68" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Two observations started it: fossils resemble but differ from living forms, and island populations vary in ways that fit their islands.</text>
      <text x="360" y="86" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Lyell's geology (slow change over vast time) and Malthus's population essay supplied the other two pieces.</text>
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">1859: 'On the Origin of Species' — published 23 years after the voyage, and only because Wallace reached the same conclusion.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: Galapagos finches — one ancestor, island-specific beaks — the clearest natural-selection setup.</text>
    </svg>
  );
}
