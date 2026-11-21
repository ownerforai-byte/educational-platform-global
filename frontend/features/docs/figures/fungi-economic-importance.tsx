/** Fungi economic importance — food, medicine, industry, harm. Theme-aware. */
export function FungiEconomicImportance({ className }: { className?: string }) {
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
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Fungi economic importance in food medicine industry and harm with examples like yeast penicillin rusts and spoilage">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Fungi and humans — four ledgers</text>
      {col(16, "rgb(22 163 74 / 0.9)", "FOOD", ["mushrooms (protein, vitamins)", "bread via yeast CO₂", "cheese ripening", "soy fermentations"], "a")}
      {col(178, "rgb(14 165 233 / 0.9)", "MEDICINE", ["penicillin (Fleming)", "statins, cyclosporin", "vitamin B sources", "ergot-derived drugs"], "b")}
      {col(340, "rgb(245 158 11 / 0.9)", "INDUSTRY", ["alcohol & brewing", "citric acid", "enzymes (amylase)", "biological pest control"], "c")}
      {col(502, "rgb(239 68 68 / 0.9)", "HARM", ["crop rusts & smuts", "food spoilage (moulds)", "ringworm, athlete's foot", "mycotoxins (aflatoxin)"], "d")}
      <text x="16" y="232" fontSize="10" className="fill-current text-muted-foreground">Balance sheet: one penicillin molecule outweighs a thousand spoiled loaves — but both directions come from the same absorptive lifestyle.</text>
    </svg>
  );
}
