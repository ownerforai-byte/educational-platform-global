/** Khoriya shifting cultivation — the old farm cycle. Well-detailed. Theme-aware. */
export function KhoriyaShiftingCycle({ className }: { className?: string }) {
  const steps: [string, string][] = [
    ["1. Select forest plot", "hill slope chosen for its soil"],
    ["2. Slash and burn", "trees cut, fired — ash fertilises"],
    ["3. Farm 2–3 years", "millet, maize; weeds and nutrient loss build up"],
    ["4. Abandon and move", "plot left to fallow 10–20 years"],
    ["5. Return if fallow lasted", "shortened fallow = degraded land"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Khoriya shifting cultivation slash and burn cycle fallow period sustainability threshold population pressure Nepal hills agriculture">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Khoriya — shifting cultivation, step by step</text>
      {steps.map(([s, d], i) => {
        const x = 30 + (i % 3) * 228;
        const y = 48 + Math.floor(i / 3) * 108;
        return (
          <g key={s}>
            <rect x={x} y={y} width="210" height="96" rx="10" className="fill-current text-amber-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
            <text x={x + 14} y={y + 22} fontSize="7.8" className="fill-current text-foreground" fontWeight="800">{s}</text>
            <text x={x + 14} y={y + 42} fontSize="6.8" className="fill-current text-muted-foreground">{d.slice(0, 34)}</text>
            {d.length > 34 && <text x={x + 14} y={y + 56} fontSize="6.8" className="fill-current text-muted-foreground">{d.slice(34, 68)}</text>}
            <text x={x + 14} y={y + 82} fontSize="6.6" className="fill-current text-amber-600">{["forest", "fire", "crops", "fallow", "judgement"][i]}</text>
            {i < 4 && <line x1={x + 210} y1={y + 48} x2={x + 228} y2={y + 48} className="stroke-current text-amber-600" strokeWidth="2" style={{ color: "rgb(180 130 40 / 0.9)" }} markerEnd="url(#arrhl)" />}
          </g>
        );
      })}
      <rect x="488" y="166" width="202" height="96" rx="10" className="fill-current text-rose-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="502" y="188" fontSize="7.8" className="fill-current text-foreground" fontWeight="800">WHEN IT BREAKS</text>
      {["population pressure shortens", "fallow below recovery time —", "soil exhausts, forest never", "returns, slopes erode"].map((t, i) => (
        <text key={t} x="502" y={206 + i * 14} fontSize="6.8" className="fill-current text-muted-foreground">{t}</text>
      ))}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: khoriya is sustainable only while the fallow is long enough for the forest to rebuild the soil.</text>
    </svg>
  );
}
