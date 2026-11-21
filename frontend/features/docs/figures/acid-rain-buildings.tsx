/** Acid rain effects on buildings — the stone that dissolves. Well-detailed. Theme-aware. */
export function AcidRainBuildings({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Acid rain effects buildings marble limestone calcium carbonate dissolution Taj Mahal yellowing statue damage chemical reaction sulphuric acid calcium sulphate gypsum crust black staining cultural heritage monuments restoration cost">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Acid rain on stone — chemistry you can see</text>
      {/* reaction */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE REACTION</text>
      {[
        "marble and limestone are",
        "  calcium carbonate (CaCO₃)",
        "acid rain (H₂SO₄) reacts:",
        "  CaCO₃ + H₂SO₄ →",
        "  CaSO₄ + H₂O + CO₂",
        "the product, gypsum, is soluble",
        "  and washes away — stone",
        "  literally dissolves",
        "black gypsum crusts form where",
        "  rain doesn't rinse — the",
        "  'blackened statue' effect",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* victims */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FAMOUS VICTIMS</text>
      {[
        "the Taj Mahal's marble yellows",
        "  from air pollution — nearby",
        "  industries were ordered shut",
        "Athens' Acropolis marbles have",
        "  eroded more in decades than",
        "  centuries before",
        "medieval cathedrals across",
        "  Europe need constant repair",
        "iron and steel structures",
        "  corrode faster too — bridges,",
        "  railings, vehicles",
        "restoration costs run to",
        "  billions — prevention was",
        "  cheaper all along",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: write the equation — CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂ — the stone-eating reaction.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Cultural heritage is an air-pollution casualty list written in marble.</text>
    </svg>
  );
}
