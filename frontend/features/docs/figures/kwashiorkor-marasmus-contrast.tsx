/** Kwashiorkor marasmus contrast — two faces of malnutrition. Well-detailed. Theme-aware. */
export function KwashiorkorMarasmusContrast({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Kwashiorkor versus marasmus contrast protein deficiency calorie deficiency oedema swollen belly thin wasting weaning age malnutrition comparison table causes treatment">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Kwashiorkor vs marasmus — two faces of malnutrition</text>
      {/* table */}
      <rect x="30" y="40" width="150" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="105" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FEATURE</text>
      <rect x="180" y="40" width="260" height="26" rx="6" className="fill-current text-amber-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="310" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">KWASHIORKOR</text>
      <rect x="440" y="40" width="250" height="26" rx="6" className="fill-current text-rose-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="565" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MARASMUS</text>
      {[
        ["Deficiency", "protein, with some calories", "calories overall (starvation)"],
        ["Typical age", "1–3 yrs, after weaning", "under 1 yr, early weaning"],
        ["Appearance", "swollen belly, oedema", "extreme wasting, 'skin and bone'"],
        ["Muscle vs fat", "fat preserved under oedema", "both muscle and fat wasted"],
        ["Hair/skin", "thin, discoloured hair; lesions", "dry, thin hair; aged face"],
        ["Outcome", "recoverable with protein", "recoverable with energy-dense food"],
      ].map(([feat, kw, mar], i) => {
        const y = 74 + i * 30;
        return (
          <g key={feat}>
            <text x="46" y={y + 10} fontSize="6.6" className="fill-current text-foreground" fontWeight="700">{feat}</text>
            <text x="194" y={y + 10} fontSize="6.2" className="fill-current text-muted-foreground">{kw}</text>
            <text x="454" y={y + 10} fontSize="6.2" className="fill-current text-muted-foreground">{mar}</text>
          </g>
        );
      })}
      <rect x="30" y="258" width="660" height="34" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="272" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The word: kwashiorkor is Ga for 'the disease the first child gets when the second arrives' — weaning displaces the elder from milk.</text>
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: oedema = kwashiorkor; wasting = marasmus. One sign separates the two in an exam answer.</text>
    </svg>
  );
}
