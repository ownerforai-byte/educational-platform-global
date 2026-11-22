// Fine sulphur forms. Theme-aware.
export function FineSulphurForms({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["flowers of sulphur", "sublimed vapour condensed to powder", "rgb(245 158 11)"],
    ["milk of sulphur", "precipitated fine S from CaS/HCl", "rgb(250 250 250)"],
    ["colloidal sulphur", "2H₂S + SO₂ → 3S + 2H₂O (dispersed)", "rgb(253 224 71)"],
  ];
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Three fine forms of sulphur flowers milk and colloidal with preparation">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Powder, milk and colloid</text>
      {rows.map(([n, p, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.2" />
          <text x="58" y={63 + i * 48} fontSize="12" fontWeight="800" className="fill-current text-foreground">{n}</text>
          <text x="58" y={81 + i * 48} fontSize="10.5" className="fill-current text-muted-foreground">{p}</text>
        </g>
      ))}
      <text x="330" y="206" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Finer particles, better skin action — milk of sulphur in ointments</text>
    </svg>
  );
}
