/** Applied fields — agriculture medicine industry. Well-detailed. Theme-aware. */
export function AppliedFieldsTriple({ className }: { className?: string }) {
  const fields: [string, string, string, string][] = [
    ["Agriculture", "plant breeding, pest control, soil science", "more rice from the same terrace", "rgb(22 163 74)"],
    ["Medicine", "disease, immunity, drugs, surgery", "vaccines, antibiotics, diagnosis", "rgb(244 63 94)"],
    ["Industry", "fermentation, enzymes, biofuels", "bread, beer, cheese, ethanol", "rgb(245 158 11)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Applied fields agriculture medicine industry plant breeding vaccination fermentation biotechnology applied biology careers">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Applied biology — three professions, one science</text>
      {fields.map(([name, detail, tag, rgb], i) => {
        const x = 30 + i * 228;
        return (
          <g key={name}>
            <rect x={x} y="44" width="210" height="200" rx="12" className="fill-current text-slate-500/10" strokeWidth="2.2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 105} y="70" fontSize="9.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            {/* icon */}
            {i === 0 && <path d={`M${x + 105} 150 v-30 M${x + 105} 132 q-16 -6 -22 -20 M${x + 105} 132 q16 -6 22 -20`} className="stroke-current" strokeWidth="2.6" style={{ color: rgb }} />}
            {i === 1 && <path d={`M${x + 105} 120 q-18 0 -18 20 q0 16 18 16 q18 0 18 -16 q0 -20 -18 -20`} className="fill-current" style={{ color: rgb, opacity: 0.3 }} stroke="currentColor" strokeWidth="1.8" />}
            {i === 1 && <circle cx={x + 105} cy={140} r="5" className="fill-current" style={{ color: rgb }} />}
            {i === 2 && <rect x={x + 80} y={116} width="50" height="46" rx="6" className="fill-current" style={{ color: rgb, opacity: 0.3 }} stroke="currentColor" strokeWidth="1.8" />}
            <text x={x + 14} y="184" fontSize="7" className="fill-current text-muted-foreground">{detail.slice(0, 32)}</text>
            <text x={x + 14} y="198" fontSize="7" className="fill-current text-muted-foreground">{detail.slice(32, 64)}</text>
            <text x={x + 105} y="226" fontSize="6.8" textAnchor="middle" className="fill-current" style={{ color: rgb }}>{tag}</text>
          </g>
        );
      })}
      <rect x="30" y="256" width="660" height="36" rx="8" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="270" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Basic research feeds all three: understanding DNA made genetic crops possible, understanding microbes made antibiotics and brewing both possible.</text>
      <text x="360" y="284" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: applied biology = biology with a job title — name the field and one of its products.</text>
    </svg>
  );
}
