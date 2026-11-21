/** Safe drinking water methods — from source to cup. Well-detailed. Theme-aware. */
export function SafeDrinkingWaterMethods({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Safe drinking water methods boiling one rolling minute chlorination bleaching powder SODIS solar disinfection PET bottle sun six hours filtration ceramic candle cloth filtering well protection spring source protection methods comparison cost effectiveness Nepal rural">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Making water safe — the household toolkit</text>
      {/* methods table */}
      <rect x="30" y="40" width="150" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="105" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">METHOD</text>
      <rect x="180" y="40" width="250" height="26" rx="6" className="fill-current text-sky-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="305" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HOW IT WORKS</text>
      <rect x="440" y="40" width="250" height="26" rx="6" className="fill-current text-emerald-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="565" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">STRENGTHS / LIMITS</text>
      {[
        ["Boiling", "1 rolling minute kills all pathogens", "certain but fuel-costly"],
        ["Chlorination", "bleaching powder or solution kills microbes", "cheap, tastes odd; needs 30 min contact"],
        ["SODIS", "sun in a clear PET bottle for 6 h", "free; needs sun and clear water"],
        ["Filtration", "ceramic/candle filters strain and adsorb", "good quality; clean the candle"],
      ].map(([m, how, note], i) => {
        const y = 74 + i * 34;
        return (
          <g key={m}>
            <text x="46" y={y + 14} fontSize="6.4" className="fill-current text-foreground" fontWeight="700">{m}</text>
            <text x="194" y={y + 8} fontSize="6.2" className="fill-current text-muted-foreground">{how.slice(0, 42)}</text>
            <text x="194" y={y + 20} fontSize="6.2" className="fill-current text-muted-foreground">{how.slice(42, 84)}</text>
            <text x="454" y={y + 8} fontSize="6.2" className="fill-current text-muted-foreground">{note.slice(0, 42)}</text>
            <text x="454" y={y + 20} fontSize="6.2" className="fill-current text-muted-foreground">{note.slice(42, 84)}</text>
          </g>
        );
      })}
      <rect x="30" y="218" width="660" height="74" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="238" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Protect the source first: a fenced, lined spring or a covered well costs less than treating contaminated water forever.</text>
      <text x="360" y="256" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: match method → mechanism → one limit. Boiling = certain but costly; SODIS = free but weather-dependent.</text>
      <text x="360" y="274" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Storage matters as much as treatment — a clean, covered, narrow-mouthed vessel keeps treated water safe.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Diarrhoeal disease remains a top child killer where this toolkit is missing — each method is a life-saver at scale.</text>
    </svg>
  );
}
