/** Mitigation vs adaptation — two answers to a warming world. Well-detailed. Theme-aware. */
export function MitigationAdaptationPair({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["Goal", "stop the cause — cut emissions", "live with the effect — adjust"],
    ["Examples", "solar and wind, EVs, forests kept standing, efficiency", "drought-proof crops, flood embankments, early-warning systems"],
    ["Timescale", "decades — benefits are global and shared", "years — benefits are local and immediate"],
    ["Nepal angle", "hydropower instead of diesel, forest conservation", "glacial-lake warning, terracing, crop switching"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Mitigation versus adaptation climate change responses emission reduction adjustment examples Nepal hydropower embankments comparison">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Mitigation vs adaptation — two answers, one problem</text>
      <rect x="30" y="44" width="180" height="30" rx="6" className="fill-current text-slate-500/20" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="120" y="64" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Aspect</text>
      <rect x="215" y="44" width="235" height="30" rx="6" className="fill-current text-emerald-500/20" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="332" y="64" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Mitigation (fix the cause)</text>
      <rect x="455" y="44" width="235" height="30" rx="6" className="fill-current text-sky-500/20" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="572" y="64" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Adaptation (fix the impact)</text>
      {rows.map(([f, m, a], i) => {
        const y = 82 + i * 46;
        return (
          <g key={f}>
            <rect x="30" y={y} width="660" height="40" rx="6" className="fill-current text-slate-500/5" stroke="currentColor" strokeWidth="1" style={{ color: "rgb(120 113 108 / 0.4)" }} />
            <text x="46" y={y + 17} fontSize="7.6" className="fill-current text-foreground" fontWeight="700">{f}</text>
            <text x="230" y={y + 15} fontSize="6.8" className="fill-current text-muted-foreground">{m.slice(0, 42)}</text>
            {m.length > 42 && <text x="230" y={y + 27} fontSize="6.8" className="fill-current text-muted-foreground">{m.slice(42, 84)}</text>}
            <text x="470" y={y + 15} fontSize="6.8" className="fill-current text-muted-foreground">{a.slice(0, 42)}</text>
            {a.length > 42 && <text x="470" y={y + 27} fontSize="6.8" className="fill-current text-muted-foreground">{a.slice(42, 84)}</text>}
          </g>
        );
      })}
      <rect x="30" y="268" width="660" height="24" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="284" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: define both, give two examples each, then say why the world needs both together.</text>
    </svg>
  );
}
