/**
 * Plasma membrane — fluid-mosaic model close-up: phospholipid bilayer with
 * heads/tails, integral and peripheral proteins, glycoprotein, cholesterol
 * and a channel. Theme-aware via currentColor.
 */
export function PlasmaMembraneFluidMosaic({ className }: { className?: string }) {
  // One phospholipid: head circle + three tails pointing toward the midline.
  // Top leaflet: heads up (extracellular), tails down. Bottom leaflet: heads
  // down (cytoplasm), tails up — tails of both leaflets meet at the midline.
  const lipid = (x: number, headY: number, flip: boolean) => {
    const tailStart = flip ? headY - 6 : headY + 6;
    const tailEnd = flip ? headY - 64 : headY + 64;
    return (
      <g key={`${x}-${headY}`} style={{ color: "rgb(14 165 233 / 0.85)" }}>
        <circle cx={x} cy={headY} r="4.5" className="fill-current text-sky-500" />
        <line x1={x} y1={tailStart} x2={x} y2={tailEnd} strokeWidth="2" className="stroke-current text-sky-600" />
        <line x1={x - 3} y1={tailStart} x2={x - 3} y2={tailEnd} strokeWidth="2" className="stroke-current text-sky-600" />
        <line x1={x + 3} y1={tailStart} x2={x + 3} y2={tailEnd} strokeWidth="2" className="stroke-current text-sky-600" />
      </g>
    );
  };
  const xs = Array.from({ length: 22 }, (_, i) => 96 + i * 22);
  return (
    <svg viewBox="0 0 640 320" className={className} role="img" aria-label="Fluid mosaic model of the plasma membrane showing a phospholipid bilayer with hydrophilic heads and hydrophobic tails, integral and peripheral proteins, a channel protein, glycoproteins with carbohydrate chains and cholesterol wedged between lipids">
      <text x="16" y="28" fontSize="14" className="fill-current text-foreground" fontWeight="800">Fluid-mosaic model of the plasma membrane (Singer &amp; Nicolson, 1972)</text>

      {/* phospholipids: top leaflet (heads up), bottom leaflet (heads down) */}
      {xs.map((x) => lipid(x, 88, false))}
      {xs.map((x) => lipid(x, 232, true))}

      {/* integral protein */}
      <rect x="180" y="66" width="56" height="188" rx="16" className="fill-current text-violet-500/25" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="150" y="272" fontSize="10.5" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="700">integral (trans-membrane) protein</text>

      {/* channel protein */}
      <rect x="330" y="66" width="56" height="188" rx="16" className="fill-current text-emerald-500/20" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <rect x="352" y="86" width="12" height="148" rx="6" className="fill-current text-background" stroke="none" />
      <text x="316" y="290" fontSize="10.5" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">channel protein — ions/water pass</text>

      {/* glycoprotein chains (outside) */}
      <g className="stroke-current text-rose-500" strokeWidth="2.5" fill="none">
        <path d="M208 82 q-6 -18 8 -26" /><path d="M216 82 q10 -16 2 -30" />
        <path d="M358 82 q-6 -18 8 -26" /><path d="M366 82 q10 -16 2 -30" />
      </g>
      <text x="16" y="60" fontSize="10.5" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">carbohydrate chains → glycoproteins (cell recognition)</text>

      {/* cholesterol wedged in the tail zone */}
      <g style={{ color: "rgb(245 158 11 / 0.9)" }}>
        <rect x="262" y="120" width="10" height="34" rx="3" className="fill-current text-amber-500" />
        <rect x="414" y="166" width="10" height="34" rx="3" className="fill-current text-amber-500" />
      </g>
      <text x="248" y="168" fontSize="10" className="fill-current text-amber-600 dark:text-amber-400" fontWeight="700" transform="rotate(-90 256 137)">cholesterol</text>
      <text x="432" y="152" fontSize="9" className="fill-current text-muted-foreground">stiffens · controls fluidity</text>

      {/* peripheral protein */}
      <ellipse cx="488" cy="78" rx="26" ry="12" className="fill-current text-teal-500/25" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
      <text x="452" y="56" fontSize="10.5" className="fill-current text-teal-700 dark:text-teal-300" fontWeight="700">peripheral protein</text>

      {/* orientation labels */}
      <text x="16" y="76" fontSize="10" className="fill-current text-muted-foreground" fontWeight="700">extracellular ↑</text>
      <text x="16" y="252" fontSize="10" className="fill-current text-muted-foreground" fontWeight="700">cytoplasm ↓</text>
      <text x="66" y="160" fontSize="10" className="fill-current text-muted-foreground">hydrophobic tails meet at the midline · hydrophilic heads face the water on both sides</text>
      <text x="16" y="310" fontSize="10" className="fill-current text-muted-foreground">“Fluid”: lipids and proteins drift laterally · “mosaic”: proteins are scattered tiles in the lipid sea · selectively permeable barrier.</text>
    </svg>
  );
}
