/** Nomenclature codes and rules — ICBN principles. Well-detailed. Theme-aware. */
export function NomenclatureCodes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Nomenclature codes and rules ICBN principles binomial nomenclature Latin italicised genus epithet priority rule type specimen tautonyms validity conditions">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Rules of nomenclature — how names stay valid</text>

      {/* example anatomy */}
      <rect x="30" y="44" width="320" height="120" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="190" y="68" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Mangifera indica Linn.</text>
      <text x="120" y="96" fontSize="7.6" textAnchor="middle" className="fill-current text-sky-600" fontWeight="700">genus — capitalised, italic</text>
      <text x="262" y="96" fontSize="7.6" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="700">epithet — small, italic</text>
      <text x="190" y="126" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">author abbreviation = who validly named it</text>
      <text x="190" y="146" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">written in Latin or Latinised form</text>

      {/* principles */}
      <rect x="370" y="44" width="320" height="120" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="390" y="68" fontSize="8.6" className="fill-current text-foreground" fontWeight="800">KEY PRINCIPLES</text>
      {[
        "two-word name for every species",
        "priority: the earliest valid name wins",
        "type specimen anchors each name",
        "no duplicate names within a genus",
      ].map((t, i) => (
        <text key={t} x="390" y={90 + i * 19} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      {/* violations */}
      <rect x="30" y="180" width="660" height="104" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="50" y="204" fontSize="8.6" className="fill-current text-foreground" fontWeight="700">WHAT MAKES A NAME INVALID:</text>
      <text x="50" y="226" fontSize="7.8" className="fill-current text-muted-foreground">• tautonyms (same word twice — allowed in zoology, rejected in botany) · names not published validly · names based on lost type specimens</text>
      <text x="50" y="248" fontSize="7.8" className="fill-current text-muted-foreground">• if two names collide, the older published one is retained and the younger becomes a synonym (nomen conservandum protects famous exceptions)</text>
      <text x="50" y="270" fontSize="7.8" className="fill-current text-muted-foreground">• codes: ICBN for plants, ICZN for animals, ICNB for bacteria — separate rulebooks, one goal: one name, one organism, worldwide.</text>
    </svg>
  );
}
