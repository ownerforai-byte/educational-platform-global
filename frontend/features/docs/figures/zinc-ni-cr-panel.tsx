// ZincNiCrPanel figure. Theme-aware.
export function ZincNiCrPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Zinc nickel and chromium biological roles panel">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Zn²⁺, Ni and Cr — the quiet specialists</text>
      {[
        ["Zn²⁺", "carbonic anhydrase + carboxypeptidase; stores insulin; heals wounds", "rgb(139 92 246)", 40, 55],
        ["Ni", "urease — the enzyme that hydrolyses urea", "rgb(20 184 166)", 40, 125],
        ["Cr", "glucose tolerance factor — assists insulin in glucose uptake", "rgb(101 163 13)", 40, 195],
      ].map(([m, d, col, x, y]) => (
        <g key={m as string}>
          <rect x={x as number} y={y as number} width="580" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 20} y={(y as number) + 35} fontSize="13" fontWeight="800" fill={col as string}>{m as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 35} fontSize="10.5" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="228" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Zn²⁺ is d¹⁰ — it works as a Lewis acid, never by redox</text>
    </svg>
  );
}
