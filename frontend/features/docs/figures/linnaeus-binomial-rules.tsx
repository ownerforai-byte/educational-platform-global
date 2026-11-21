/** Linnaeus and binomial rules — naming done right. Well-detailed. Theme-aware. */
export function LinnaeusBinomialRules({ className }: { className?: string }) {
  const rules: [string, string][] = [
    ["Two words", "Genus (first, capitalised) + specific epithet (lowercase)"],
    ["Italicised", "underlined when handwritten — Mangifera indica"],
    ["Latinised", "Genus = noun, epithet often an adjective agreeing with it"],
    ["Authority", "abbreviated author appended — Mangifera indica Linn."],
    ["Unique", "one valid name per species worldwide (ICBN rules)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Linnaeus binomial nomenclature rules two word name genus epithet italicised latinised authority ICBN universal language mango example">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Linnaeus's two-word promise — the rules</text>

      {/* name banner */}
      <rect x="30" y="44" width="660" height="56" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="72" fontSize="14" textAnchor="middle" className="fill-current text-emerald-700" fontStyle="italic" fontWeight="800">Mangifera indica</text>
      <text x="360" y="90" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Genus (capital) + specific epithet (small) — 'the mango-bearing mango tree'</text>

      {/* rules list */}
      <rect x="30" y="114" width="400" height="150" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      {rules.map(([r, d], i) => (
        <g key={r}>
          <text x="48" y={140 + i * 26} fontSize="7.8" className="fill-current text-foreground" fontWeight="700">{i + 1}. {r}</text>
          <text x="130" y={140 + i * 26} fontSize="7" className="fill-current text-muted-foreground">{d}</text>
        </g>
      ))}

      {/* why card */}
      <rect x="450" y="114" width="240" height="150" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="570" y="138" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY BOTHER?</text>
      {[
        "local names change every",
        "few hundred kilometres",
        "latin names are one world",
        "vocabulary for all scientists",
        "Species Plantarum (1753)",
        "started the naming system",
      ].map((t, i) => (
        <text key={t} x="466" y={162 + i * 18} fontSize="7.2" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      <rect x="30" y="274" width="660" height="18" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="287" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: binomial = two-word scientific name; italics for type, capital Genus, small epithet, author abbreviated.</text>
    </svg>
  );
}
