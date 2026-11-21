/** Brain size expansion through human evolution. Theme-aware. */
export function BrainExpansionChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Brain size expansion through human evolution Australopithecus 450 to 500 cc Homo habilis 650 to 750 Homo erectus 900 to 1100 Neanderthal 1400 and Homo sapiens 1350 to 1450 cc">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Brain size through the hominid line</text>
      {[
        { x: 100, cc: 475, t: "Australopithecus", s: "450–500 cc" },
        { x: 220, cc: 700, t: "H. habilis", s: "650–750 cc" },
        { x: 340, cc: 1000, t: "H. erectus", s: "900–1100 cc" },
        { x: 460, cc: 1400, t: "Neanderthal", s: "~1400 cc" },
        { x: 580, cc: 1400, t: "H. sapiens", s: "1350–1450 cc" },
      ].map((b) => (
        <g key={b.t}>
          <rect x={b.x - 30} y={170 - b.cc / 12} width="60" height={b.cc / 12} rx="4" className="fill-current text-rose-500/20" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <text x={b.x} y={160 - b.cc / 12} fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{b.s}</text>
          <text x={b.x} y="188" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">{b.t}</text>
        </g>
      ))}
      <text x="16" y="206" fontSize="8" className="fill-current text-muted-foreground">Bipedalism first (freeing hands), then tool use, then brain expansion — feedback with culture.</text>
    </svg>
  );
}
