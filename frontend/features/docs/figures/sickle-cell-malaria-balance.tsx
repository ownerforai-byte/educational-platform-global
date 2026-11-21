/** Sickle cell malaria balance — the heterozygote's advantage. Well-detailed. Theme-aware. */
export function SickleCellMalariaBalance({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Sickle cell malaria balance heterozygote advantage HbS allele malaria resistance balanced polymorphism SS anaemia AA susceptible AS protected selection pressure geography overlap Africa trade-off evolution population genetics example">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Sickle cell — the allele that hurts and protects</text>
      {/* three genotypes */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      {[
        ["AA", "normal haemoglobin; fully susceptible to malaria", "rgb(2 132 199)", 130],
        ["AS", "carrier; malaria-resistant — the sweet spot", "rgb(16 185 129)", 300],
        ["SS", "sickle disease: painful crises, shortened life", "rgb(244 63 94)", 470],
      ].map(([geno, detail, rgb, x], i) => (
        <g key={geno as string}>
          <rect x={(x as number) - 80} y="70" width="160" height="100" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: rgb as string }} />
          <text x={x as number} y="94" fontSize="8" textAnchor="middle" className="fill-current" style={{ color: rgb as string }} fontWeight="800">{geno as string}</text>
          <text x={x as number} y="114" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 34)}</text>
          <text x={x as number} y="128" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(34, 68)}</text>
          {i < 2 && <path d={`M${(x as number) + 82} 120 h${((x as number) + 138) - (x as number) - 82 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(217 119 6 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">in malaria country: AS outsurvives both AA (malaria) and SS (disease) — the heterozygote wins</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The geography proves it: HbS frequencies overlap the historical malaria map — selection drew the allele's border.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Where malaria is eradicated, HbS frequency slowly falls — the advantage evaporates, the cost remains.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: heterozygote advantage (balanced polymorphism) — the case where the carrier beats both homozygotes.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Evolution optimises for survival to reproduce, not for comfort — a disease allele can be a shield.</text>
    </svg>
  );
}
