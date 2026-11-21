/** Food adulteration examples — what's really in the packet. Well-detailed. Theme-aware. */
export function FoodAdulterationExamples({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Food adulteration examples common tricks milk water urea turmeric metanil yellow brick powder chilli coloured sawdust tea dust detergent formalin fish colouring DDT pesticide residues health effects consumer tests simple home detection food standards DFTQC department testing labelling consumer rights action">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Food adulteration — the tricks and the tells</text>
      {/* table of adulterants */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">COMMON ADULTERANTS AND THEIR HARM</text>
      {[
        ["Milk", "water, urea, detergent", "kidney strain, fraud"],
        ["Turmeric / spices", "metanil yellow, brick dust", "carcinogenic colourants"],
        ["Tea", "exhausted leaves re-dyed", "dyes, no flavour"],
        ["Honey", "sugar syrup", "no nutrition, fraud"],
        ["Fish / meat", "formalin, dyes", "formaldehyde toxicity"],
        ["Grains", "sand, stones, coloured kernels", "physical injury"],
      ].map(([food, trick, harm], i) => {
        const y = 92 + i * 18;
        return (
          <g key={food as string}>
            <text x="50" y={y} fontSize="6" className="fill-current text-foreground" fontWeight="700">{food as string}</text>
            <text x="200" y={y} fontSize="5.8" className="fill-current text-muted-foreground">{trick as string}</text>
            <text x="430" y={y} fontSize="5.8" className="fill-current text-rose-600" fontWeight="600">{harm as string}</text>
          </g>
        );
      })}
      <text x="360" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">simple home tests exist: water in milk (lactometer), metanil yellow (dissolves in water, colours it), husk in spices (float test)</text>
      {/* facts */}
      <rect x="30" y="212" width="660" height="80" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="232" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Nepal's DFTQC (Department of Food Technology and Quality Control) tests market samples; consumer courts and fines back the standards.</text>
      <text x="360" y="250" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name two adulterants with food and harm each, plus one home test — the three-part answer.</text>
      <text x="360" y="268" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Adulteration is fraud with a health tail — the profit is small, the damage can be permanent.</text>
      <text x="360" y="284" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Read labels, buy sealed, and trust a lab over a rumour — consumer literacy is food safety.</text>
    </svg>
  );
}
