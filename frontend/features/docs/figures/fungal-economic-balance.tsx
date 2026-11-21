/** Fungal economic importance — beneficial vs harmful. Well-detailed. Theme-aware. */
export function FungalEconomicBalance({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Fungal economic importance beneficial yeast bread brewing antibiotics penicillin cheese mycorrhiza decomposers versus harmful rusts smuts wilts food spoilage aflatoxin ringworm athlete's foot balance chart">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Fungi and us — the two ledgers</text>

      {/* beneficial */}
      <rect x="30" y="44" width="320" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="190" y="66" fontSize="9" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">BENEFICIAL ✓</text>
      {[
        "yeast → bread, beer, wine",
        "Penicillium → penicillin (first antibiotic)",
        "cheese ripening (camembert, roquefort)",
        "mycorrhiza feeds most land plants",
        "decomposers recycle carbon and nitrogen",
      ].map((t, i) => (
        <text key={t} x="50" y={92 + i * 22} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      {/* harmful */}
      <rect x="370" y="44" width="320" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="530" y="66" fontSize="9" textAnchor="middle" className="fill-current text-rose-600" fontWeight="800">HARMFUL ✗</text>
      {[
        "rusts and smuts destroy cereal crops",
        "late blight of potato (Irish famine)",
        "aflatoxin in mouldy grain — liver poison",
        "ringworm, athlete's foot in humans",
        "spoilage of food, paper, leather, paint",
      ].map((t, i) => (
        <text key={t} x="390" y={92 + i * 22} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      <rect x="30" y="240" width="660" height="46" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="50" y="262" fontSize="8.2" className="fill-current text-foreground" fontWeight="700">Verdict: the same biology — external digestion and spores — makes fungi both indispensable recyclers and persistent pests.</text>
      <text x="50" y="279" fontSize="7.6" className="fill-current text-muted-foreground">Exam hook: name one fungus per ledger — Saccharomyces / Penicillium (good); Puccinia / Aspergillus (bad).</text>
    </svg>
  );
}
