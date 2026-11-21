/** Binomial name examples — genus + epithet pairs. Well-detailed. Theme-aware. */
export function BinomialNameExamples({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Binomial name examples Mangifera indica Homo sapiens Felis domesticus Oryza sativa Zea mays Pisum sativum genus shared among species epithet descriptive meanings table">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Binomials in practice — six names decoded</text>

      {[
        { g: "Mangifera", e: "indica", m: "mango-bearing · from India" },
        { g: "Homo", e: "sapiens", m: "man · wise" },
        { g: "Felis", e: "domesticus", m: "cat · domestic" },
        { g: "Oryza", e: "sativa", m: "rice · cultivated" },
        { g: "Zea", e: "mays", m: "maize · (native name)" },
        { g: "Pisum", e: "sativum", m: "pea · cultivated" },
      ].map((r, i) => (
        <g key={r.g}>
          <rect x="30" y={44 + i * 34} width="660" height="28" rx="7" className={i % 2 ? "fill-current text-muted-foreground opacity-5" : "fill-current text-sky-500/10"} />
          <text x="60" y={63 + i * 34} fontSize="8.6" className="fill-current text-sky-600" fontWeight="800" fontStyle="italic">{r.g}</text>
          <text x="200" y={63 + i * 34} fontSize="8.6" className="fill-current text-emerald-600" fontWeight="700" fontStyle="italic">{r.e}</text>
          <text x="330" y={63 + i * 34} fontSize="7.4" className="fill-current text-muted-foreground">{r.m}</text>
        </g>
      ))}

      <rect x="30" y="252" width="660" height="36" rx="10" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="50" y="268" fontSize="7.8" className="fill-current text-foreground" fontWeight="700">Pattern: the genus groups close relatives (Felis = cats); the epithet pins down the species. Epithets are often descriptive (sativa = cultivated) or geographic (indica).</text>
      <text x="50" y="284" fontSize="7.4" className="fill-current text-muted-foreground">Same epithet, different genus = different organism — sativa appears in Oryza, Pisum and many more.</text>
    </svg>
  );
}
