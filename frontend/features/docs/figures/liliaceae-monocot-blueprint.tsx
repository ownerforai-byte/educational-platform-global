/** Liliaceae monocot blueprint — trimerous flowers and tepals. Well-detailed. Theme-aware. */
export function LiliaceaeMonocotBlueprint({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Liliaceae monocot blueprint trimerous flower six tepals perianth 3 plus 3 stamens superior tricarpellary ovary axile placentation capsule onion garlic aloe parallel venation">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Liliaceae — the monocot blueprint family</text>

      {/* trimerous flower */}
      <rect x="30" y="44" width="380" height="220" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="220" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TRIMEROUS: EVERYTHING IN THREES</text>
      {/* six tepals */}
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse key={a} cx={220 + 34 * Math.cos((a * Math.PI) / 180)} cy={150 + 34 * Math.sin((a * Math.PI) / 180)} rx="22" ry="10" className="fill-current text-violet-400/30" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(139 92 246 / 0.9)" }} transform={`rotate(${a} ${220 + 34 * Math.cos((a * Math.PI) / 180)} ${150 + 34 * Math.sin((a * Math.PI) / 180)})`} />
      ))}
      {/* stamens 3+3 */}
      {[30, 90, 150, 210, 270, 330].map((a) => (
        <line key={a} x1={220 + 10 * Math.cos((a * Math.PI) / 180)} y1={150 + 10 * Math.sin((a * Math.PI) / 180)} x2={220 + 24 * Math.cos((a * Math.PI) / 180)} y2={150 + 24 * Math.sin((a * Math.PI) / 180)} className="stroke-current text-amber-600" strokeWidth="2.2" style={{ color: "rgb(180 130 40 / 0.9)" }} />
      ))}
      <circle cx="220" cy="150" r="9" className="fill-current text-emerald-500/50" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="300" y="118" fontSize="7.2" className="fill-current text-violet-500" fontWeight="700">6 look-alike tepals (no sepals vs petals)</text>
      <text x="300" y="136" fontSize="7.2" className="fill-current text-amber-600" fontWeight="700">stamens 3 + 3</text>
      <text x="300" y="154" fontSize="7.2" className="fill-current text-emerald-600" fontWeight="700">superior tricarpellary ovary below</text>
      {/* bulb below */}
      <path d="M200 210 q20 -16 40 0 q-4 22 -20 22 q-16 0 -20 -22" className="fill-current text-stone-300/40" stroke="currentColor" strokeWidth="1.6" />
      <text x="220" y="248" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">bulb = stored-food underground bud (onion)</text>

      {/* notes card */}
      <rect x="430" y="44" width="260" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="560" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BLUEPRINT CHECKLIST</text>
      {[
        "parallel-veined leaves",
        "perianth in two whorls of 3",
        "stamens 3 + 3 (epiphyllous)",
        "axile placentation, capsule",
        "often bulb or rhizome storage",
        "members: onion, garlic, aloe,",
        "colchicum, tulip, lily",
      ].map((t, i) => (
        <text key={t} x="446" y={94 + i * 22} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="446" y="248" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: trimerous + tepals +</text>
      <text x="446" y="262" fontSize="7.2" className="fill-current text-muted-foreground">superior ovary = Liliaceae;</text>
      <text x="446" y="276" fontSize="7.2" className="fill-current text-muted-foreground">colchicine from Colchicum.</text>
    </svg>
  );
}
