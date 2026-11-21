/**
 * Cell size scale — virus → mycoplasma → bacterium → red blood cell →
 * plant/animal cell → egg, on a log scale. Theme-aware via currentColor.
 */
export function CellSizeScale({ className }: { className?: string }) {
  const items = [
    { x: 70, r: 5, label: "virus", size: "50–100 nm", c: "rgb(148 163 184 / 0.9)" },
    { x: 150, r: 9, label: "mycoplasma", size: "0.1 µm — smallest cell", c: "rgb(20 184 166 / 0.9)" },
    { x: 250, r: 16, label: "bacterium", size: "1–5 µm", c: "rgb(249 115 22 / 0.9)" },
    { x: 370, r: 24, label: "RBC", size: "7–8 µm", c: "rgb(239 68 68 / 0.9)" },
    { x: 500, r: 40, label: "plant cell", size: "20–50 µm", c: "rgb(22 163 74 / 0.9)" },
    { x: 620, r: 52, label: "egg (yolk)", size: "mm–cm — largest cell", c: "rgb(245 158 11 / 0.9)" },
  ];
  return (
    <svg viewBox="0 0 680 240" className={className} role="img" aria-label="Logarithmic size scale comparing virus, mycoplasma, bacterium, red blood cell, plant cell and egg cell diameters">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">How big is a cell? — a logarithmic size ladder</text>
      {items.map((it) => (
        <g key={it.label}>
          <circle cx={it.x} cy="120" r={it.r} className="fill-current opacity-25" style={{ color: it.c }} strokeWidth="2.5" stroke="currentColor" />
          <text x={it.x} y={124} fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{it.label}</text>
          <text x={it.x} y={160 + (it.r > 30 ? 8 : 0)} fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{it.size}</text>
        </g>
      ))}
      <text x="16" y="200" fontSize="10" className="fill-current text-muted-foreground">Scale: nm → µm → mm (each step ≈ ×10). Cells stay small because diffusion sets a size limit — surface area grows as r² while volume grows as r³,</text>
      <text x="16" y="216" fontSize="10" className="fill-current text-muted-foreground">so big cells cannot feed or breathe fast enough across their membrane. Large organisms solve this with many small cells, not bigger ones.</text>
    </svg>
  );
}
