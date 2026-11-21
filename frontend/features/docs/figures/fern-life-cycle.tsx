/** Fern life cycle — sorus to spore to prothallus to new sporophyte. Theme-aware. */
export function FernLifeCycle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Fern life cycle sorus sporangia spores prothallus gametophyte archegonium antheridium fertilisation and young sporophyte growing on prothallus">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Fern life cycle — two free-living generations</text>

      {[
        { x: 80, t: "SORUS on frond", s: "sporangia ripen, spores fly", c: "rgb(245 158 11 / 0.9)" },
        { x: 250, t: "SPORE (n)", s: "lands on moist soil", c: "rgb(14 165 233 / 0.9)" },
        { x: 420, t: "PROTHALLUS (n)", s: "heart-shaped gametophyte", c: "rgb(20 184 166 / 0.9)" },
        { x: 580, t: "NEW SPOROPHYTE (2n)", s: "grows from the archegonium", c: "rgb(22 163 74 / 0.9)" },
      ].map((n, i) => (
        <g key={n.t}>
          <rect x={n.x - 64} y="70" width="128" height="62" rx="12" style={{ color: n.c }} className="fill-current opacity-12" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="94" fontSize="8.3" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="112" fontSize="7.3" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          {i < 3 && <line x1={n.x + 66} y1="101" x2={n.x + 104} y2="101" strokeWidth="2.5" className="stroke-current text-foreground" />}
        </g>
      ))}

      {/* prothallus drawing */}
      <path d="M380 190 q40 -30 80 0 q-40 24 -80 0 Z" className="fill-current text-emerald-500/30" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <circle cx="436" cy="184" r="4" className="fill-current text-sky-600/80" />
      <circle cx="404" cy="186" r="4" className="fill-current text-rose-600/80" />
      <text x="470" y="186" fontSize="7.5" className="fill-current text-muted-foreground">blue = antheridia (sperm)</text>
      <text x="470" y="200" fontSize="7.5" className="fill-current text-muted-foreground">red = archegonia (eggs)</text>

      {/* return arrow */}
      <path d="M580 140 Q330 236 80 140" fill="none" strokeWidth="2.5" strokeDasharray="6 4" className="stroke-current text-muted-foreground" />
      <text x="330" y="248" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">meiosis in sporangia → spores; sperm still swim — water needed again</text>

      <text x="16" y="226" fontSize="10" className="fill-current text-muted-foreground">Both generations live independently — unlike mosses (dependent sporophyte) and seed plants (dependent gametophyte).</text>
    </svg>
  );
}
