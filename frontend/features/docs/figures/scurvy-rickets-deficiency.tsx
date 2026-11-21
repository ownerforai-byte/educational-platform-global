/** Scurvy rickets deficiency — missing micronutrients. Well-detailed. Theme-aware. */
export function ScurvyRicketsDeficiency({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Scurvy rickets deficiency vitamin C collagen vitamin D calcium bones sailors citrus sunlight bow legs rickets osteomalacia night blindness vitamin A xerophthalmia goitre iodine anaemia iron deficiency diseases table">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Deficiency diseases — the micronutrient map</text>
      {/* table */}
      <rect x="30" y="40" width="130" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="95" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NUTRIENT</text>
      <rect x="160" y="40" width="180" height="26" rx="6" className="fill-current text-sky-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="250" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DEFICIENCY DISEASE</text>
      <rect x="340" y="40" width="350" height="26" rx="6" className="fill-current text-emerald-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="515" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SIGNATURE SIGN + SOURCE</text>
      {[
        ["Vitamin C", "scurvy", "bleeding gums; citrus, amla"],
        ["Vitamin D", "rickets (kids), osteomalacia", "bowed legs; sunlight + fish"],
        ["Vitamin A", "night blindness, xerophthalmia", "dry eyes; carrot, liver"],
        ["Vitamin B1", "beriberi", "nerve and heart failure; unpolished grain"],
        ["Iodine", "goitre", "swollen thyroid; iodised salt"],
        ["Iron", "anaemia", "pale, tired; green leaves, meat"],
      ].map(([nut, dis, sig], i) => {
        const y = 74 + i * 30;
        return (
          <g key={nut}>
            <text x="46" y={y + 10} fontSize="6.6" className="fill-current text-foreground" fontWeight="700">{nut}</text>
            <text x="174" y={y + 10} fontSize="6.2" className="fill-current text-muted-foreground">{dis}</text>
            <text x="354" y={y + 10} fontSize="6.2" className="fill-current text-muted-foreground">{sig}</text>
          </g>
        );
      })}
      <rect x="30" y="258" width="660" height="34" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="272" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Sailors' scurvy taught the first nutrition lesson: a missing micronutrient produces a specific, curable disease.</text>
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: pair each disease with its nutrient AND one food source — that's the full-mark answer.</text>
    </svg>
  );
}
