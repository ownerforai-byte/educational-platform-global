/** Membrane transport modes — diffusion, facilitated, active, bulk. Well-detailed. Theme-aware. */
export function MembraneTransportModes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 340" className={className} role="img" aria-label="Membrane transport modes simple diffusion down gradient no protein no energy facilitated diffusion through channel or carrier protein no energy active transport against gradient via pump using ATP bulk transport endocytosis and exocytosis vesicles">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Crossing the membrane — four mechanisms</text>

      {/* membrane band helper */}
      {[
        { y: 60, t: "SIMPLE DIFFUSION", e: "no protein, no energy — O₂, CO₂", c: "rgb(22 163 74 / 0.9)" },
        { y: 128, t: "FACILITATED DIFFUSION", e: "channel/carrier protein, no energy — glucose", c: "rgb(14 165 233 / 0.9)" },
        { y: 196, t: "ACTIVE TRANSPORT", e: "pump protein + ATP, against gradient — Na⁺/K⁺", c: "rgb(244 63 94 / 0.9)" },
        { y: 264, t: "BULK TRANSPORT", e: "vesicles: endocytosis in, exocytosis out", c: "rgb(139 92 246 / 0.9)" },
      ].map((row) => (
        <g key={row.t}>
          <rect x="30" y={row.y} width="660" height="52" rx="10" style={{ color: row.c }} className="fill-current opacity-10" strokeWidth="2" stroke="currentColor" />
          <text x="46" y={row.y + 20} fontSize="8.4" className="fill-current text-foreground" fontWeight="800">{row.t}</text>
          <text x="46" y={row.y + 38} fontSize="7.4" className="fill-current text-muted-foreground">{row.e}</text>
          {/* membrane segment */}
          <line x1="330" y1={row.y + 12} x2="330" y2={row.y + 40} strokeWidth="3" className="stroke-current text-muted-foreground" />
          <line x1="440" y1={row.y + 12} x2="440" y2={row.y + 40} strokeWidth="3" className="stroke-current text-muted-foreground" />
        </g>
      ))}

      {/* arrows per row */}
      <path d="M300 86 L470 86" markerEnd="url(#arrmt)" strokeWidth="2.5" className="stroke-current text-emerald-600" />
      <path d="M360 154 L410 154" markerEnd="url(#arrmt)" strokeWidth="2.5" className="stroke-current text-sky-600" />
      <rect x="368" y="144" width="34" height="20" rx="4" className="fill-none stroke-current text-sky-600" strokeWidth="2" />
      <path d="M360 222 L410 222" markerEnd="url(#arrmt)" strokeWidth="2.5" className="stroke-current text-rose-600" />
      <rect x="368" y="212" width="34" height="20" rx="4" className="fill-none stroke-current text-rose-600" strokeWidth="2" />
      <text x="415" y="226" fontSize="7" className="fill-current text-rose-600" fontWeight="800">ATP</text>
      <circle cx="345" cy="290" r="12" className="fill-current text-violet-500/30" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <path d="M357 290 q20 0 30 0" markerEnd="url(#arrmt)" strokeWidth="2" className="stroke-current text-violet-600" />
      <defs><marker id="arrmt" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" className="fill-current text-muted-foreground" /></marker></defs>

      <text x="16" y="334" fontSize="8.4" className="fill-current text-muted-foreground">Passive (top two) follows the gradient; active (bottom two) spends energy to defy or swallow it.</text>
    </svg>
  );
}
