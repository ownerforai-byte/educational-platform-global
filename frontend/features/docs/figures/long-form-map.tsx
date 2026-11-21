// Long-form periodic table block map. Theme-aware.
export function LongFormMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 250" className={className} role="img" aria-label="Long form periodic table map with seven periods eighteen groups s block p block d block f block regions labelled">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">The long-form map — 7 periods × 18 groups</text>
      <rect x="40" y="40" width="80" height="150" rx="6" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="80" y="120" fontSize="10" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">s</text>
      <rect x="130" y="40" width="240" height="90" rx="6" className="fill-current text-violet-500/15" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="250" y="90" fontSize="10" textAnchor="middle" className="fill-current text-violet-600" fontWeight="800">d-block (groups 3–12)</text>
      <rect x="130" y="140" width="240" height="50" rx="6" className="fill-current text-emerald-500/15" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="250" y="170" fontSize="10" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">p-block (groups 13–18)</text>
      <rect x="380" y="40" width="140" height="150" rx="6" className="fill-current text-amber-500/15" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="450" y="120" fontSize="10" textAnchor="middle" className="fill-current text-amber-600" fontWeight="800">f-block</text>
      <rect x="530" y="40" width="150" height="150" rx="6" className="fill-current text-foreground/5" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(120 120 130 / 0.8)" }} />
      {[1, 2, 3, 4, 5, 6, 7].map((p) => (
        <text key={p} x="545" y={52 + p * 18} fontSize="8" className="fill-current text-muted-foreground">period {p}</text>
      ))}
      <text x="80" y="208" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">groups 1–2</text>
      <text x="250" y="208" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">transition metals sit inside periods 4–7</text>
      <text x="450" y="208" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">lanthanides + actinides</text>
      <text x="605" y="208" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">18 groups total</text>
      <rect x="30" y="222" width="660" height="20" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="236" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Period lengths 2, 8, 8, 18, 18, 32, 32; block = the subshell the differentiating electron enters.</text>
    </svg>
  );
}
