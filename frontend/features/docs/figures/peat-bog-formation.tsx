/** Peat bog formation and uses — Sphagnum. Well-detailed. Theme-aware. */
export function PeatBogFormation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Peat bog formation Sphagnum bog moss acid waterlogged dead layers compressed over centuries peat fuel soil amendment carbon store wetland ecology">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Peat — a moss-made fuel and time capsule</text>

      {/* bog cross-section */}
      <rect x="30" y="44" width="380" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="220" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CROSS-SECTION OF A BOG</text>
      {/* living sphagnum */}
      <path d="M60 110 q80 -18 160 -6 q80 12 160 -4 L380 130 q-160 14 -320 0 Z" className="fill-current text-emerald-500/30" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="220" y="102" fontSize="7.2" textAnchor="middle" className="fill-current text-emerald-700" fontWeight="700">living Sphagnum carpet</text>
      {/* older layers */}
      <rect x="60" y="130" width="320" height="40" rx="6" className="fill-current text-amber-700/25" />
      <text x="220" y="154" fontSize="7" textAnchor="middle" className="fill-current text-amber-800">dead moss, years old — slowly compressed</text>
      <rect x="60" y="170" width="320" height="46" rx="6" className="fill-current text-amber-900/35" />
      <text x="220" y="196" fontSize="7" textAnchor="middle" className="fill-current text-amber-100">PEAT — centuries of packed moss</text>
      {/* water table */}
      <path d="M50 226 q170 10 340 0" className="fill-none stroke-current text-sky-500" strokeWidth="3" strokeDasharray="6 4" />
      <text x="220" y="246" fontSize="7.2" textAnchor="middle" className="fill-current text-sky-600">waterlogged, acidic, oxygen-poor — decay is ultra-slow</text>

      {/* facts card */}
      <rect x="430" y="44" width="260" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="560" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY PEAT MATTERS</text>
      {[
        "fuel — dried and burned for heat",
        "soil amendment — holds water",
        "carbon store — locks CO₂ away",
        "preserves pollen, bodies, boats:",
        "a window into past climates",
        "harvesting bogs releases carbon",
      ].map((t, i) => (
        <text key={t} x="446" y={94 + i * 23} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="446" y="240" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: Sphagnum = bog moss;</text>
      <text x="446" y="254" fontSize="7.2" className="fill-current text-muted-foreground">dead moss + acid water + no oxygen</text>
      <text x="446" y="268" fontSize="7.2" className="fill-current text-muted-foreground">= peat, over hundreds of years.</text>
    </svg>
  );
}
