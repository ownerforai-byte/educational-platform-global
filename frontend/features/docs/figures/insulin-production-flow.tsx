/** Insulin production flow — human insulin from bacteria. Well-detailed. Theme-aware. */
export function InsulinProductionFlow({ className }: { className?: string }) {
  const steps: [string, string][] = [
    ["1. Human insulin gene", "isolated from pancreatic DNA or made synthetically"],
    ["2. Insert into plasmid", "restriction enzyme + ligase seal the gene in"],
    ["3. Transform E. coli", "bacteria take up the recombinant plasmid"],
    ["4. Ferment and harvest", "scaled tanks; cells secrete proinsulin"],
    ["5. Purify insulin", "chromatography yields clinical-grade hormone"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Insulin production flow recombinant DNA human insulin gene plasmid E coli fermentation purification diabetes treatment humulin biotechnology medicine">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Human insulin from a bacterium — the flow</text>
      {steps.map(([s, d], i) => {
        const y = 44 + i * 50;
        return (
          <g key={s}>
            <rect x="30" y={y} width="380" height="42" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
            <text x="46" y={y + 18} fontSize="7.8" className="fill-current text-foreground" fontWeight="800">{s}</text>
            <text x="46" y={y + 32} fontSize="6.8" className="fill-current text-muted-foreground">{d}</text>
            {i < 4 && <line x1="220" y1={y + 42} x2="220" y2={y + 50} className="stroke-current text-sky-500" strokeWidth="2" style={{ color: "rgb(2 132 199 / 0.9)" }} markerEnd="url(#arrhl)" />}
          </g>
        );
      })}
      {/* outcome panel */}
      <rect x="440" y="44" width="250" height="248" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="565" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY IT MATTERED</text>
      {/* vial */}
      <rect x="540" y="86" width="50" height="66" rx="8" className="fill-current text-emerald-500/20" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <rect x="552" y="78" width="26" height="10" rx="3" className="fill-current text-stone-500/50" stroke="currentColor" strokeWidth="1.4" />
      <text x="565" y="124" fontSize="6.4" textAnchor="middle" className="fill-current text-emerald-700">insulin</text>
      {[
        "before 1982: insulin came",
        "from pig and cow pancreas",
        "recombinant human insulin",
        "(Humulin) is identical to",
        "the body's own hormone",
        "unlimited supply, no allergy",
      ].map((t, i) => (
        <text key={t} x="456" y={176 + i * 15} fontSize="7" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : t}</text>
      ))}
      <text x="456" y="276" fontSize="7" className="fill-current text-emerald-600">First medicine ever made by</text>
      <text x="456" y="288" fontSize="7" className="fill-current text-emerald-600">genetic engineering.</text>
    </svg>
  );
}
