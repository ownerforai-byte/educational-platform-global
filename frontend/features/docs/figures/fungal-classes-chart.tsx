/** Fungal classes — phycomycetes, ascomycetes, basidiomycetes, deuteromycetes. Theme-aware. */
export function FungalClassesChart({ className }: { className?: string }) {
  const col = (x: number, c: string, t: string, items: string[], k: string) => (
    <g key={k}>
      <rect x={x} y="56" width="150" height="160" rx="12" style={{ color: c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
      <text x={x + 75} y="80" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{t}</text>
      {items.map((s, i) => (
        <text key={i} x={x + 75} y={102 + i * 20} fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{s}</text>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Four fungal classes phycomycetes ascomycetes basidiomycetes and deuteromycetes with spore structures and examples">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Four fungal classes, sorted by spore case</text>
      {col(16, "rgb(14 165 233 / 0.9)", "PHYCOMYCETES", ["coenocytic hyphae", "spores in sporangia", "aquatic/terrestrial", "Mucor, Rhizopus"], "a")}
      {col(178, "rgb(124 58 237 / 0.9)", "ASCOMYCETES", ["septate hyphae", "spores in sac-like ASCUS", "8 ascospores", "Yeast, Penicillium"], "b")}
      {col(340, "rgb(22 163 74 / 0.9)", "BASIDIOMYCETES", ["septate hyphae", "spores on club BASIDIUM", "mushrooms & rusts", "Agaricus, Puccinia"], "c")}
      {col(502, "rgb(245 158 11 / 0.9)", "DEUTEROMYCETES", ["'imperfect fungi'", "sexual stage unknown", "only asexual spores", "Alternaria, Fusarium"], "d")}
      <text x="16" y="234" fontSize="10" className="fill-current text-muted-foreground">The naming logic: sporangium → ascus → basidium → 'don't know yet'. Sex observed or not decides the class.</text>
    </svg>
  );
}
