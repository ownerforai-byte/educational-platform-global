// IUPAC group numbering: old vs new. Theme-aware.
export function IupacGroupMapping({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["IA, IIA", "1, 2", "s-block metals"],
    ["IIIB–VIIIB", "3–10", "d-block core"],
    ["IB, IIB", "11, 12", "coinage + Zn family"],
    ["IIIA–VIIIA", "13–17", "p-block"],
    ["0", "18", "noble gases"],
  ];
  return (
    <svg viewBox="0 0 720 240" className={className} role="img" aria-label="IUPAC group numbering mapping old Roman numeral system IA IIA IIIB to new numbers one to eighteen recommended 1988">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">IUPAC numbering (1988) — one number, one column</text>
      {rows.map(([old, neu, note], i) => (
        <g key={old}>
          <rect x="30" y={40 + i * 36} width="660" height="30" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x="46" y={60 + i * 36} fontSize="9.5" className="fill-current text-muted-foreground" fontWeight="700">{old}</text>
          <text x="200" y={60 + i * 36} fontSize="9.5" className="fill-current text-sky-600" fontWeight="800">→ {neu}</text>
          <text x="674" y={60 + i * 36} fontSize="8" textAnchor="end" className="fill-current text-muted-foreground">{note}</text>
        </g>
      ))}
      <rect x="30" y="224" width="0" height="0" />
      <text x="360" y="234" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Why IUPAC changed it: Roman numerals with A/B meant different things in Europe and America — plain 1–18 ends the confusion.</text>
    </svg>
  );
}
