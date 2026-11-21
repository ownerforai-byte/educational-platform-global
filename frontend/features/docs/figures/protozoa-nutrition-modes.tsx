/** Protozoan nutrition modes — holozoic, holophytic, saprozoic, parasitic. Theme-aware. */
export function ProtozoaNutritionModes({ className }: { className?: string }) {
  const card = (x: number, c: string, t: string, lines: string[], k: string) => (
    <g key={k}>
      <rect x={x} y="60" width="146" height="120" rx="12" style={{ color: c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
      <text x={x + 73} y="86" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{t}</text>
      {lines.map((line, i) => (
        <text key={i} x={x + 73} y={104 + i * 14} fontSize="8" textAnchor="middle" className={i === lines.length - 1 ? "fill-current text-foreground font-bold" : "fill-current text-muted-foreground"}>{line}</text>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Protozoan nutrition modes holozoic holophytic saprozoic and parasitic with examples">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">How a single cell feeds — four nutrition modes</text>
      {card(16, "rgb(22 163 74 / 0.9)", "Holozoic", ["engulfs whole food", "particles (phagocytosis)", "Amoeba, Paramecium"], "a")}
      {card(178, "rgb(14 165 233 / 0.9)", "Holophytic", ["photosynthesis with", "chlorophyll", "Euglena (mixotroph)"], "b")}
      {card(340, "rgb(245 158 11 / 0.9)", "Saprozoic", ["absorbs dissolved", "organic matter", "Euglena (dark), some amoebae"], "c")}
      {card(502, "rgb(244 63 94 / 0.9)", "Parasitic", ["lives in/on a host,", "absorbs its nutrients", "Plasmodium, Entamoeba"], "d")}
      <text x="16" y="200" fontSize="10" className="fill-current text-muted-foreground">Digestion is intracellular in all — food is digested inside food vacuoles and the waste egested at any surface point.</text>
    </svg>
  );
}
