/** CITES appendices explained. Theme-aware. */
export function CitesAppendices({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 200" className={className} role="img" aria-label="CITES convention on international trade in endangered species regulates cross-border trade through Appendix I II and III listings with decreasing strictness">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">CITES — trade rules in three appendices</text>
      <text x="16" y="46" fontSize="9" className="fill-current text-muted-foreground">Convention on International Trade in Endangered Species — regulates cross-border trade in threatened species.</text>

      {[
        { x: 110, t: "APPENDIX I", s: "most endangered —", s2: "commercial trade banned", c: "rgb(244 63 94 / 0.9)" },
        { x: 330, t: "APPENDIX II", s: "trade regulated with permits —", s2: "must not harm survival", c: "rgb(245 158 11 / 0.9)" },
        { x: 550, t: "APPENDIX III", s: "species protected in one", s2: "listing country; others cooperate", c: "rgb(14 165 233 / 0.9)" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 88} y="62" width="176" height="84" rx="12" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="86" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="106" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x} y="122" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s2}</text>
        </g>
      ))}
      <text x="16" y="176" fontSize="9.5" className="fill-current text-muted-foreground">Strictness decreases I → II → III; the mechanism is permits, not prohibition everywhere.</text>
    </svg>
  );
}
