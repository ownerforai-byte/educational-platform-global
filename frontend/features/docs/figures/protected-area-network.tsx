/** Nepal's protected-area network numbers. Theme-aware. */
export function ProtectedAreaNetwork({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Nepal protected area network 12 national parks 1 wildlife reserve 1 hunting reserve 6 conservation areas 13 buffer zones covering nearly 24 percent of the country plus Ramsar wetlands">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Nepal's protected-area network — the numbers</text>

      {[
        { x: 100, n: "12", t: "NATIONAL PARKS", c: "rgb(22 163 74 / 0.9)" },
        { x: 210, n: "1", t: "WILDLIFE RESERVE", c: "rgb(14 165 233 / 0.9)" },
        { x: 320, n: "1", t: "HUNTING RESERVE", c: "rgb(245 158 11 / 0.9)" },
        { x: 430, n: "6", t: "CONSERVATION AREAS", c: "rgb(124 58 237 / 0.9)" },
        { x: 560, n: "13", t: "BUFFER ZONES", c: "rgb(20 184 166 / 0.9)" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 48} y="52" width="96" height="96" rx="14" style={{ color: n.c }} className="fill-current opacity-12" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="112" fontSize="30" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.n}</text>
          <text x={n.x} y="168" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground" fontWeight="700">{n.t}</text>
        </g>
      ))}

      <rect x="40" y="186" width="580" height="40" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="56" y="204" fontSize="9" className="fill-current text-foreground" fontWeight="700">Nearly 24% of the country's area is legally protected — plus Ramsar-listed wetlands.</text>
      <text x="56" y="220" fontSize="8" className="fill-current text-muted-foreground">Buffer zones channel benefits (revenue share, community forests) to local people, reducing conflict.</text>
    </svg>
  );
}
