// Why properties repeat: repeating outer configurations. Theme-aware.
export function PeriodicityCause({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["Li (Z = 3)", "[He] 2s¹", "+1 outer electron"],
    ["Na (Z = 11)", "[Ne] 3s¹", "+1 outer electron"],
    ["K (Z = 19)", "[Ar] 4s¹", "+1 outer electron"],
  ];
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Cause of periodicity repeating outer electronic configurations of lithium sodium and potassium all one outer s electron giving similar properties">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Why properties repeat — the same outer shell keeps coming back</text>
      {rows.map(([el, cfg, note], i) => (
        <g key={el}>
          <rect x="30" y={40 + i * 44} width="660" height="38" rx="9" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(16 185 129 / 0.85)" }} />
          <text x="46" y={64 + i * 44} fontSize="9.5" className="fill-current text-foreground" fontWeight="800">{el}</text>
          <text x="220" y={64 + i * 44} fontSize="9.5" className="fill-current text-emerald-600" fontWeight="800">{cfg}</text>
          <text x="674" y={64 + i * 44} fontSize="8.4" textAnchor="end" className="fill-current text-muted-foreground">{note}</text>
        </g>
      ))}
      <rect x="30" y="178" width="660" height="34" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="196" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">All three are soft, reactive metals that lose one electron — identical valence shell, identical chemistry. Periodicity is configuration repetition.</text>
      <text x="360" y="208" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Chemical properties belong to the outermost shell; Z only increases the number of shells between repeats.</text>
    </svg>
  );
}
