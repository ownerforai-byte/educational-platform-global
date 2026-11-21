/** Taxonomic aids — herbarium, museum, botanical garden, keys, flora, monographs. Theme-aware. */
export function TaxonomicAids({ className }: { className?: string }) {
  const col = (x: number, c: string, t: string, items: string[], k: string) => (
    <g key={k}>
      <rect x={x} y="56" width="150" height="160" rx="12" style={{ color: c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
      <text x={x + 75} y="80" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{t}</text>
      {items.map((s, i) => (
        <text key={i} x={x + 75} y={102 + i * 22} fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">{s}</text>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Taxonomic aids herbarium pressed specimens museum preserved specimens botanical garden living plants and keys flora monographs catalogues">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Taxonomic aids — the tools of identification</text>
      {col(16, "rgb(22 163 74 / 0.9)", "HERBARIUM", ["dried, pressed plants", "on acid-free sheets", "label: name, place, date", "storehouse of vouchers"], "a")}
      {col(178, "rgb(14 165 233 / 0.9)", "MUSEUM", ["preserved specimens", "in jars / dry mounts", "animals mostly", "reference for study"], "b")}
      {col(340, "rgb(245 158 11 / 0.9)", "BOTANICAL GARDEN", ["LIVING plants, labelled", "ex-situ conservation", "education & research", "(Godawari, Lalitpur)"], "c")}
      {col(502, "rgb(124 58 237 / 0.9)", "PAPER TOOLS", ["key: paired couplets", "flora: region's plant list", "monograph: one genus", "manual: identification"], "d")}
      <text x="16" y="232" fontSize="10" className="fill-current text-muted-foreground">A key walks you through either/or choices (couplets) until only one species fits — the classic exam definition.</text>
    </svg>
  );
}
