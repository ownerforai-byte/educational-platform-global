/** Food tests chart — Benedict's, iodine, biuret, Sudan III, emulsion. Well-detailed. Theme-aware. */
export function FoodTestsChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 320" className={className} role="img" aria-label="Food tests Benedict's test reducing sugars brick red precipitate on heating iodine test starch blue black biuret test protein violet emulsion test fats translucent paper Sudan III red stained droplets with reagents and positive results">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Qualitative food tests — reagent, procedure, positive result</text>

      {[
        { x: 90, t: "BENEDICT'S", s: "reducing sugars", r: "Benedict's reagent + heat", p: "brick-red / orange ppt", c: "rgb(239 68 68 / 0.9)" },
        { x: 265, t: "IODINE", s: "starch", r: "dilute iodine solution", p: "blue-black colour", c: "rgb(76 29 149 / 0.9)" },
        { x: 440, t: "BIURET", s: "protein (peptide bonds)", r: "Biuret reagent (CuSO₄ + NaOH)", p: "violet / purple colour", c: "rgb(139 92 246 / 0.9)" },
        { x: 615, t: "SUDAN III", s: "lipids (fats)", r: "Sudan III stain / paper", p: "red-stained oil droplets", c: "rgb(234 88 12 / 0.9)" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 78} y="44" width="156" height="170" rx="12" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="66" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="86" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">detects: {n.s}</text>
          <text x={n.x} y="110" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{n.r}</text>
          {/* test tube */}
          <path d={`M${n.x - 12} 128 v40 a12 12 0 0 0 24 0 v-40 Z`} className="fill-none stroke-current text-muted-foreground" strokeWidth="2" />
          <path d={`M${n.x - 12} 152 h24 v16 a12 12 0 0 1 -24 0 Z`} style={{ color: n.c }} className="fill-current opacity-60" />
          <text x={n.x} y="212" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{n.p}</text>
        </g>
      ))}

      <rect x="30" y="236" width="660" height="66" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="50" y="260" fontSize="8.6" className="fill-current text-foreground" fontWeight="700">Emulsion test (alternative lipid test): dissolve in ethanol → add water → white emulsion forms.</text>
      <text x="50" y="280" fontSize="8" className="fill-current text-muted-foreground">Control: repeat with distilled water — the negative control must stay blue / brown / colourless.</text>
      <text x="50" y="296" fontSize="8" className="fill-current text-muted-foreground">Non-reducing sugars: hydrolyse with dilute HCl first, neutralise, then run Benedict's.</text>
    </svg>
  );
}
