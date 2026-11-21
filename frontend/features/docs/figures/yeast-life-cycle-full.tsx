/** Yeast life cycle — haploid and diploid phases. Well-detailed. Theme-aware. */
export function YeastLifeCycleFull({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Yeast life cycle full diploid cell budding asexual ascospore formation meiosis four ascospores haploid cells fuse conjugation back to diploid alternating n and 2n phases labelled">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Yeast life cycle — two phases, one loop</text>

      {/* diploid loop (dominant) */}
      <rect x="30" y="44" width="330" height="170" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DIPLOID PHASE (2n) — dominant</text>
      <ellipse cx="140" cy="120" rx="34" ry="24" className="fill-none stroke-current text-violet-600" strokeWidth="3" />
      <ellipse cx="204" cy="120" rx="22" ry="16" className="fill-none stroke-current text-violet-600" strokeWidth="2.5" />
      <path d="M174 120 L182 120" strokeWidth="2" className="stroke-current text-violet-600" />
      <text x="172" y="164" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">mother buds off daughter cells</text>
      <text x="172" y="184" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">— the everyday mode, hours per cycle</text>

      {/* haploid loop */}
      <rect x="380" y="44" width="310" height="170" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="535" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HAPLOID PHASE (n) — under stress</text>
      <rect x="440" y="92" width="190" height="30" rx="14" className="fill-none stroke-current text-emerald-600" strokeWidth="2.5" />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={465 + i * 46} cy="107" r="7" className="fill-current text-emerald-600" />
      ))}
      <text x="535" y="142" fontSize="7" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="700">ascus of 4 ascospores (after meiosis)</text>
      <text x="535" y="164" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">spores germinate → haploid cells</text>
      <text x="535" y="184" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">two haploids conjugate → diploid again</text>

      {/* arrows between */}
      <path d="M360 100 L380 100" markerEnd="url(#arrylc)" strokeWidth="2.5" className="stroke-current text-muted-foreground" />
      <text x="370" y="90" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">meiosis</text>
      <path d="M380 160 L360 160" markerEnd="url(#arrylc)" strokeWidth="2.5" className="stroke-current text-muted-foreground" />
      <text x="370" y="178" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">fusion</text>
      <defs><marker id="arrylc" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" className="fill-current text-muted-foreground" /></marker></defs>

      <rect x="30" y="228" width="660" height="58" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="50" y="250" fontSize="8.2" className="fill-current text-foreground" fontWeight="700">Summary: budding dominates in good times; meiosis to ascospores is the survival escape hatch in bad times.</text>
      <text x="50" y="270" fontSize="7.6" className="fill-current text-muted-foreground">Genetics bonus: because both haploid and diploid cells grow, yeast is the ideal organism for studying mutations.</text>
    </svg>
  );
}
