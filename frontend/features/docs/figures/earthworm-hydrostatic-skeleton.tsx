/** Earthworm hydrostatic skeleton — fluid as bone. Well-detailed. Theme-aware. */
export function EarthwormHydrostaticSkeleton({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Earthworm hydrostatic skeleton coelomic fluid incompressible muscle antagonistic circular longitudinal burrow pressure locomotion segments alternation">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The hydrostatic skeleton — water as bone</text>
      {/* two-phase motion */}
      <rect x="30" y="44" width="330" height="200" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TWO PHASES, ALTERNATING</text>
      {/* extended segment */}
      <path d="M70 120 q30 -18 60 0 q30 18 60 0" className="fill-none stroke-current" strokeWidth="6" strokeLinecap="round" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="130" y="96" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">circular muscle contracts → segment stretches</text>
      {/* anchored segment */}
      <path d="M70 190 q20 12 40 0 q20 -12 40 0 q20 12 40 0" className="fill-none stroke-current" strokeWidth="6" strokeLinecap="round" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="130" y="226" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">longitudinal muscle contracts → segment shortens, setae grip</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE PHYSICS</text>
      {[
        "coelomic fluid is incompressible —",
        "  squeeze one wall, another bulges",
        "no bones, no joints: the fluid",
        "  itself is the skeleton",
        "antagonistic muscle pairs take",
        "  turns along 100+ segments",
        "result: silent, soil-proof burrowing",
        "  — and why a worm feels firm",
        "  yet bends anywhere",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 19} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: hydrostatic skeleton = coelomic fluid + antagonistic muscles — name both parts for the mechanism mark.</text>
    </svg>
  );
}
