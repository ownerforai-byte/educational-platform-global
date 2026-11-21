/** Microscope resolution scale — LM vs TEM vs SEM capabilities. Well-detailed. Theme-aware. */
export function MicroscopeResolutionScale({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 280" className={className} role="img" aria-label="Microscope resolution scale light microscope 200 nanometres resolution magnification up to 1500 times transmission electron microscope 0.1 nanometres transmission 2D scanning electron microscope 3D surface and what each can resolve cells bacteria viruses macromolecules">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">How small can we see? Three microscopes compared</text>

      {/* scale bar */}
      <line x1="60" y1="200" x2="680" y2="200" strokeWidth="3" className="stroke-current text-muted-foreground" />
      {[
        { x: 60, l: "1 mm", s: "human egg (limit of the eye)" },
        { x: 200, l: "100 µm", s: "plant/animal cells — LM ✓" },
        { x: 340, l: "10 µm", s: "bacteria — LM ✓" },
        { x: 480, l: "1 µm", s: "organelles — TEM/SEM ✓" },
        { x: 620, l: "0.1 µm", s: "viruses, DNA — TEM ✓" },
      ].map((p) => (
        <g key={p.l}>
          <line x1={p.x} y1="192" x2={p.x} y2="208" strokeWidth="2.5" className="stroke-current text-muted-foreground" />
          <text x={p.x} y="182" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{p.l}</text>
          <text x={p.x} y="224" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">{p.s}</text>
        </g>
      ))}

      {/* microscope cards */}
      {[
        { x: 130, t: "LIGHT MICROSCOPE", s1: "resolution ~200 nm", s2: "magnification ~1500×", s3: "living, stained cells", c: "rgb(22 163 74 / 0.9)" },
        { x: 360, t: "TEM", s1: "resolution ~0.1 nm", s2: "magnification ~1,000,000×", s3: "2-D internal ultrastructure; dead specimens", c: "rgb(14 165 233 / 0.9)" },
        { x: 590, t: "SEM", s1: "resolution ~1 nm", s2: "3-D surface topography", s3: "gold-coated, dead specimens", c: "rgb(139 92 246 / 0.9)" },
      ].map((m) => (
        <g key={m.t}>
          <rect x={m.x - 95} y="44" width="190" height="110" rx="12" style={{ color: m.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={m.x} y="66" fontSize="8.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{m.t}</text>
          <text x={m.x} y="88" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{m.s1}</text>
          <text x={m.x} y="104" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{m.s2}</text>
          <text x={m.x} y="124" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{m.s3}</text>
        </g>
      ))}

      <text x="16" y="262" fontSize="8.4" className="fill-current text-muted-foreground">Resolution (smallest distance still seen as two points) limits detail — magnification without resolution is empty enlargement.</text>
    </svg>
  );
}
