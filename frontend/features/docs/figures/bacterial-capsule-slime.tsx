/** Capsule and slime layer — the bacterial raincoat. Well-detailed. Theme-aware. */
export function BacterialCapsuleSlime({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Bacterial capsule slime layer glycocalyx protection phagocytosis virulence biofilm slime layer loose capsule organised comparison cell wall">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Capsule vs slime — the outermost armour</text>

      {/* capsule cell */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CAPSULE — organised, firm</text>
      <ellipse cx="195" cy="150" rx="110" ry="66" className="fill-current text-sky-400/15" stroke="currentColor" strokeWidth="2.4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <rect x="150" y="126" width="90" height="48" rx="20" className="fill-current text-sky-500/25" stroke="currentColor" strokeWidth="2.2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="112" fontSize="6.8" textAnchor="middle" className="fill-current text-sky-600">capsule (glycocalyx)</text>
      <text x="195" y="154" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">cell wall + membrane</text>
      {[
        "neat, thick, detectable by staining",
        "blocks phagocytosis → virulence",
        "pneumococcus's invisibility cloak",
      ].map((t, i) => (
        <text key={t} x="50" y={238 + i * 14} fontSize="7" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      {/* slime cell */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SLIME LAYER — loose, diffuse</text>
      <ellipse cx="540" cy="150" rx="120" ry="72" className="fill-current text-emerald-400/10" stroke="currentColor" strokeWidth="1.6" strokeDasharray="5 4" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <rect x="505" y="128" width="70" height="44" rx="18" className="fill-current text-emerald-500/25" stroke="currentColor" strokeWidth="2.2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="540" y="118" fontSize="6.8" textAnchor="middle" className="fill-current text-emerald-600">slime (unorganised)</text>
      <text x="540" y="154" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">cell wall + membrane</text>
      {[
        "easily washed off, not sharply edged",
        "glues cells into biofilms",
        "helps attachment to surfaces",
      ].map((t, i) => (
        <text key={t} x="410" y={238 + i * 14} fontSize="7" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: both are glycocalyx; capsule = organised and anti-phagocytic, slime = loose and sticky.</text>
    </svg>
  );
}
