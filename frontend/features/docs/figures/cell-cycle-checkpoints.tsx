/** Cell cycle checkpoints — G1, G2, M gates. Well-detailed. Theme-aware. */
export function CellCycleCheckpoints({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Cell cycle checkpoints G1 restriction point checks size nutrients DNA damage G2 checkpoint checks replication completeness M spindle checkpoint checks chromosome attachment cyclins CDKs control cancer when failed">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Cell-cycle checkpoints — the three quality gates</text>

      {/* ring */}
      <circle cx="300" cy="160" r="95" className="fill-none stroke-current text-muted-foreground" strokeWidth="6" />
      {/* phases */}
      {[
        { a: -45, t: "G1 — growth" },
        { a: 45, t: "S — DNA replication" },
        { a: 135, t: "G2 — preparation" },
        { a: 225, t: "M — mitosis" },
      ].map((p) => {
        const rad = (p.a * Math.PI) / 180;
        const x = 300 + 115 * Math.cos(rad);
        const y = 160 + 115 * Math.sin(rad);
        return <text key={p.t} x={x} y={y + 4} fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{p.t}</text>;
      })}

      {/* checkpoints */}
      {[
        { x: 300, y: 62, t: "G1 checkpoint", s: "size, nutrients, DNA damage?" },
        { x: 300, y: 258, t: "G2 checkpoint", s: "replication complete? damage repaired?" },
        { x: 195, y: 160, t: "M checkpoint", s: "all kinetochores attached to spindle?" },
      ].map((c) => (
        <g key={c.t}>
          <circle cx={c.x} cy={c.y} r="9" className="fill-current text-rose-500" />
          <text x={c.x - 14} y={c.y - 12} fontSize="7.6" textAnchor={c.x < 300 ? "end" : "middle"} className="fill-current text-rose-600" fontWeight="800">{c.t}</text>
          <text x={c.x - 14} y={c.y + 22} fontSize="6.8" textAnchor={c.x < 300 ? "end" : "middle"} className="fill-current text-muted-foreground">{c.s}</text>
        </g>
      ))}

      {/* control panel */}
      <rect x="470" y="60" width="230" height="180" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="585" y="84" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MOLECULAR CONTROLS</text>
      <text x="490" y="108" fontSize="7.6" className="fill-current text-muted-foreground">• cyclins rise and fall each phase</text>
      <text x="490" y="126" fontSize="7.6" className="fill-current text-muted-foreground">• CDK enzymes activate only when</text>
      <text x="490" y="142" fontSize="7.6" className="fill-current text-muted-foreground">  bound to their cyclin partner</text>
      <text x="490" y="166" fontSize="7.6" className="fill-current text-muted-foreground">• failed checkpoints → damaged cells</text>
      <text x="490" y="184" fontSize="7.6" className="fill-current text-muted-foreground">  keep dividing = cancer</text>
      <text x="490" y="208" fontSize="7.6" className="fill-current text-muted-foreground">• G0: non-dividing resting state</text>
      <text x="490" y="226" fontSize="7.6" className="fill-current text-muted-foreground">  (neurons, most muscle cells)</text>

      <text x="16" y="288" fontSize="8.4" className="fill-current text-muted-foreground">Interphase (G1 + S + G2) lasts ~90% of the cycle — division is the short finale, preparation is the long story.</text>
    </svg>
  );
}
