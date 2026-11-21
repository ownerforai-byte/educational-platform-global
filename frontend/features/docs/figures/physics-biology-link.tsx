/** Physics biology link — instruments and laws. Well-detailed. Theme-aware. */
export function PhysicsBiologyLink({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Physics biology link biophysics microscope X-ray MRI radiation optics pressure flow instruments laws energy levers muscles">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Physics ↔ biology — instruments and laws</text>

      {/* instruments */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">INSTRUMENTS PHYSICS GAVE BIOLOGY</text>
      {[
        "microscope optics → cells discovered",
        "X-rays → bone and crystal structure",
        "MRI / CT → living brains, no surgery",
        "ultrasound → seeing the unborn",
        "radioisotopes → tracing atoms through",
        "  metabolism",
      ].map((t, i) => (
        <text key={t} x="50" y={94 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* microscope icon */}
      <path d="M100 236 q0 -40 24 -52 M100 236 h40 M124 184 l-14 -14 M124 184 l14 -14" className="fill-none stroke-current text-violet-500" strokeWidth="2.6" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <circle cx="124" cy="170" r="7" className="fill-none stroke-current text-violet-500" strokeWidth="2.4" style={{ color: "rgb(139 92 246 / 0.9)" }} />

      {/* laws */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">LAWS BIOLOGY OBEYS</text>
      {[
        "energy flow obeys thermodynamics —",
        "  the 10% law is physics, applied",
        "light laws rule photosynthesis",
        "pressure and flow rule blood, sap",
        "levers and forces rule muscles, bones",
        "biophysics: the hybrid discipline",
      ].map((t, i) => (
        <text key={t} x="410" y={94 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <text x="410" y="204" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">Every biological machine runs on the</text>
      <text x="410" y="218" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">same physics as every other machine —</text>
      <text x="410" y="232" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">it is just wetter and self-repairing.</text>
      <text x="410" y="256" fontSize="7" className="fill-current text-muted-foreground">Exam hook: one instrument + one law</text>
      <text x="410" y="270" fontSize="7" className="fill-current text-muted-foreground">borrowed from physics.</text>
    </svg>
  );
}
