/** Flower symmetry — actinomorphic vs zygomorphic vs asymmetric. Well-detailed. Theme-aware. */
export function FlowerSymmetryTypes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Flower symmetry types actinomorphic radial any plane zygomorphic bilateral one plane asymmetric examples mustard pea canna valvate twisted imbricate aestivation">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Cut a flower — how many mirror halves?</text>

      {/* actinomorphic */}
      <rect x="30" y="44" width="220" height="200" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="140" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ACTINOMORPHIC (⊕)</text>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse key={a} cx={140 + 30 * Math.cos((a * Math.PI) / 180)} cy={140 + 30 * Math.sin((a * Math.PI) / 180)} rx="18" ry="10" className="fill-current text-rose-400/30" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(251 113 133 / 0.9)" }} transform={`rotate(${a} ${140 + 30 * Math.cos((a * Math.PI) / 180)} ${140 + 30 * Math.sin((a * Math.PI) / 180)})`} />
      ))}
      <circle cx="140" cy="140" r="10" className="fill-current text-amber-500/60" />
      <path d="M140 90 V190 M90 140 H190 M104 104 L176 176 M176 104 L104 176" className="stroke-current text-sky-500/60" strokeWidth="1.2" strokeDasharray="3 3" />
      <text x="140" y="216" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">any vertical cut = two equal halves</text>
      <text x="140" y="232" fontSize="7" textAnchor="middle" className="fill-current text-emerald-700">mustard, datura, chilli</text>

      {/* zygomorphic */}
      <rect x="270" y="44" width="220" height="200" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="380" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ZYgomorphic (✿ / %)</text>
      {/* pea-like flower */}
      <path d="M330 150 q20 -34 50 -30 q34 4 40 30 q-10 26 -44 28 q-34 2 -46 -28" className="fill-current text-violet-500/30" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <path d="M356 120 q10 -18 26 -14" className="fill-none stroke-current text-violet-600" strokeWidth="3" />
      <path d="M380 156 q26 -10 34 -4" className="fill-none stroke-current text-violet-600" strokeWidth="3" />
      <path d="M380 96 V200" className="stroke-current text-sky-500/70" strokeWidth="1.6" strokeDasharray="4 3" />
      <text x="380" y="216" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">only ONE plane divides it equally</text>
      <text x="380" y="232" fontSize="7" textAnchor="middle" className="fill-current text-sky-600">pea, bean, orchid</text>

      {/* asymmetric */}
      <rect x="510" y="44" width="180" height="200" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="600" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ASYMMETRIC</text>
      <path d="M560 130 q20 -26 50 -18 q26 8 18 34 q-10 24 -40 20 q-32 -6 -28 -36" className="fill-current text-rose-400/25" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(251 113 133 / 0.9)" }} />
      <circle cx="590" cy="146" r="8" className="fill-current text-amber-500/50" />
      <path d="M560 150 q40 12 68 -4" className="stroke-current text-rose-500/60" strokeWidth="1.4" strokeDasharray="4 3" />
      <text x="600" y="216" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">no plane makes equal halves</text>
      <text x="600" y="232" fontSize="7" textAnchor="middle" className="fill-current text-rose-500">canna</text>

      <rect x="30" y="258" width="660" height="34" rx="8" className="fill-current text-violet-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="272" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Exam hook: ⊕ = actinomorphic (radial), % = zygomorphic (bilateral) — both appear in floral formulae.</text>
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Symmetry is decided by the corolla's shape, not the number of petals.</text>
    </svg>
  );
}
