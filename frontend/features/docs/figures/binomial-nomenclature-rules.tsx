/** Binomial nomenclature rules — Mangifera indica anatomy with rules list. Theme-aware. */
export function BinomialNomenclatureRules({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Binomial nomenclature anatomy with generic name and specific epithet plus rules of naming laid down by Linnaeus">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Binomial nomenclature — two names, one species</text>

      {/* name anatomy */}
      <rect x="40" y="60" width="270" height="46" rx="10" className="fill-current text-sky-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="175" y="82" fontSize="15" textAnchor="middle" className="fill-current text-foreground" fontWeight="800" fontStyle="italic">Mangifera indica</text>
      <text x="120" y="126" fontSize="8.5" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">Genus — Capital letter</text>
      <line x1="120" y1="106" x2="120" y2="92" strokeWidth="1.5" className="stroke-current text-muted-foreground" />
      <text x="240" y="126" fontSize="8.5" textAnchor="middle" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">specific epithet — small letter</text>
      <line x1="240" y1="106" x2="240" y2="92" strokeWidth="1.5" className="fill-current text-muted-foreground" />

      {/* rules */}
      <rect x="360" y="56" width="280" height="150" rx="12" className="fill-current text-emerald-500/8" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="376" y="80" fontSize="10" className="fill-current text-foreground" fontWeight="800">The rules (Linnaeus, 1753):</text>
      {[
        "two words: genus + specific epithet",
        "genus starts with a capital letter",
        "specific epithet starts small",
        "printed in italics / underlined by hand",
        "name may abbreviate: Mangifera indica → M. indica",
        "every name is unique worldwide",
      ].map((s, i) => (
        <text key={i} x="376" y={100 + i * 17} fontSize="8.5" className="fill-current text-muted-foreground">• {s}</text>
      ))}

      <text x="16" y="226" fontSize="10" className="fill-current text-muted-foreground">Why binomials: local names collide across languages; a scientific name is the same in Kathmandu, Tokyo and Paris.</text>
    </svg>
  );
}
