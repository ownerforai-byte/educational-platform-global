/** Scope of biology — levels from molecules to biosphere. Theme-aware. */
export function ScopeLevels({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Scope of biology from molecules to biosphere with the question each level asks and the field that answers it">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Scope of biology — molecules to biosphere</text>
      {[
        { y: 52, lvl: "Molecules", q: "How does DNA code protein?", f: "Molecular biology, biochemistry" },
        { y: 76, lvl: "Cells", q: "How do cells divide and specialise?", f: "Cytology, cell biology" },
        { y: 100, lvl: "Tissues / organs", q: "How does a leaf breathe?", f: "Anatomy, physiology" },
        { y: 124, lvl: "Organisms", q: "How does an organism develop, behave?", f: "Morphology, physiology, ethology" },
        { y: 148, lvl: "Populations / species", q: "How do populations change?", f: "Genetics, ecology" },
        { y: 172, lvl: "Communities / biosphere", q: "How do ecosystems cycle energy?", f: "Ecology, environmental biology" },
        { y: 196, lvl: "Across time", q: "How did life originate and diversify?", f: "Evolution, palaeontology" },
        { y: 220, lvl: "Diversity", q: "How do we name and classify life?", f: "Taxonomy, systematics" },
      ].map((r) => (
        <g key={r.lvl}>
          <rect x="24" y={r.y - 11} width="612" height="22" rx="5" className="fill-current text-sky-500/8" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
          <text x="36" y={r.y + 4} fontSize="7.6" className="fill-current text-foreground" fontWeight="700">{r.lvl}</text>
          <text x="180" y={r.y + 4} fontSize="7.4" className="fill-current text-muted-foreground">{r.q}</text>
          <text x="440" y={r.y + 4} fontSize="7.4" className="fill-current text-muted-foreground" fontStyle="italic">{r.f}</text>
        </g>
      ))}
    </svg>
  );
}
