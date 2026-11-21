/** Lichen economic uses chart. Well-detailed. Theme-aware. */
export function LichenUsesChart({ className }: { className?: string }) {
  const uses: [string, string, string][] = [
    ["Dyes & litmus", "litmus paper turns red in acid, blue in base", "chemistry labs everywhere"],
    ["Perfume & fixative", "oakmoss resin fixes scent in soaps", "perfume industry"],
    ["Medicines", "usnic acid — antibiotic, wound dressings", "traditional + modern"],
    ["Animal food", "reindeer moss (Cladonia) in the arctic", "reindeer winter diet"],
    ["Soil starter", "pioneers crack rock, add organic matter", "first step of succession"],
    ["Food", "some species eaten after careful treatment", "Iceland moss, manna lichen"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Lichen economic importance chart litmus dye perfume oakmoss usnic acid medicine reindeer moss fodder food soil formation six uses">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">What humans and nature get from lichens</text>
      {uses.map(([title, detail, tag], i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 30 + col * 335;
        const y = 44 + row * 76;
        const tint = ["text-sky-500", "text-amber-500", "text-emerald-500", "text-violet-500", "text-rose-500", "text-lime-500"][i];
        return (
          <g key={title}>
            <rect x={x} y={y} width="320" height="66" rx="10" className={`fill-current ${tint}/10`} strokeWidth="2" stroke="currentColor" />
            <text x={x + 16} y={y + 20} fontSize="8.6" className="fill-current text-foreground" fontWeight="800">{i + 1}. {title}</text>
            <text x={x + 16} y={y + 38} fontSize="7.4" className="fill-current text-muted-foreground">{detail}</text>
            <text x={x + 16} y={y + 54} fontSize="7" className={`fill-current ${tint}`}>{tag}</text>
          </g>
        );
      })}
      <rect x="30" y="272" width="660" height="20" rx="8" className="fill-current text-slate-500/10" strokeWidth="1.5" stroke="currentColor" />
      <text x="360" y="286" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: litmus (acid–base indicator) and reindeer moss are the two most-asked lichen facts.</text>
    </svg>
  );
}
