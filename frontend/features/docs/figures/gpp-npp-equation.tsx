/** GPP NPP equation — productivity arithmetic. Well-detailed. Theme-aware. */
export function GppNppEquation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="GPP NPP equation gross primary productivity respiration net primary productivity kcal per square metre per year units numerical worked example ecosystem">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">GPP, NPP and the one-line subtraction</text>

      {/* equation banner */}
      <rect x="30" y="44" width="660" height="52" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="76" fontSize="15" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NPP = GPP − R</text>
      <text x="360" y="90" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">net = gross − what producers spend on their own respiration</text>

      {/* definitions */}
      <rect x="30" y="112" width="320" height="120" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="190" y="134" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">GPP — gross primary productivity</text>
      {[
        "total energy fixed by photosynthesis",
        "the plant's full income",
        "measured as kcal m⁻² yr⁻¹",
        "or g m⁻² yr⁻¹ (dry mass)",
      ].map((t, i) => (
        <text key={t} x="50" y={156 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <rect x="370" y="112" width="320" height="120" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="530" y="134" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NPP — net primary productivity</text>
      {[
        "energy left after plant respiration",
        "what is actually stored as biomass",
        "this is the food available to",
        "herbivores and the rest of the chain",
      ].map((t, i) => (
        <text key={t} x="390" y={156 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}

      {/* worked example */}
      <rect x="30" y="244" width="660" height="48" rx="10" className="fill-current text-violet-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="46" y="264" fontSize="7.8" className="fill-current text-foreground" fontWeight="800">Worked example (NEB-style):</text>
      <text x="46" y="282" fontSize="7.6" className="fill-current text-muted-foreground">GPP = 20,000 kcal m⁻² yr⁻¹, plant respiration R = 8,000 → NPP = 20,000 − 8,000 = 12,000 kcal m⁻² yr⁻¹ stored as biomass.</text>
    </svg>
  );
}
