/** CITES trade regulation — the wildlife passport system. Well-detailed. Theme-aware. */
export function CITESAppendicesDetail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="CITES trade regulation appendices detail appendix one total ban two regulated permit export import quota convention 1975 parties 184 species listed red panda tiger orchid permit system enforcement wildlife trafficking law">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">CITES — the passport system for wildlife trade</text>
      {/* appendices detail */}
      <rect x="30" y="40" width="150" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="105" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">APPENDIX</text>
      <rect x="180" y="40" width="250" height="26" rx="6" className="fill-current text-rose-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="305" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TRADE RULE</text>
      <rect x="440" y="40" width="250" height="26" rx="6" className="fill-current text-emerald-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="565" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">EXAMPLES</text>
      {[
        ["I", "commercial trade banned; special permits only", "tiger, red panda, gharial"],
        ["II", "regulated trade with export permits", "many orchids, pythons"],
        ["III", "one country requests help; certificates", "species listed by any party"],
      ].map(([app, rule, ex], i) => {
        const y = 74 + i * 36;
        return (
          <g key={app}>
            <text x="46" y={y + 14} fontSize="7" className="fill-current text-foreground" fontWeight="800">{app}</text>
            <text x="194" y={y + 8} fontSize="6.2" className="fill-current text-muted-foreground">{rule.slice(0, 40)}</text>
            <text x="194" y={y + 20} fontSize="6.2" className="fill-current text-muted-foreground">{rule.slice(40, 80)}</text>
            <text x="454" y={y + 14} fontSize="6.2" className="fill-current text-muted-foreground">{ex}</text>
          </g>
        );
      })}
      {/* facts */}
      <rect x="30" y="190" width="660" height="102" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        "signed 1973, in force 1975; ~184 member parties — one of the widest treaties on Earth",
        "permits are issued by national management authorities; scientific authorities judge sustainability",
        "weakness: enforcement at borders, corruption, and online wildlife trade outpace inspections",
        "Exam hook: Appendix I = ban, II = permit, III = cooperation — three levels, three verbs.",
      ].map((t, i) => (
        <text key={t} x="46" y={212 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">• {t}</text>
      ))}
    </svg>
  );
}
