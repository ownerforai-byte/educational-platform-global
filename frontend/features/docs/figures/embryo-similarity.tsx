/** Embryological evidence — early embryos of fish, salamander, chick, human. Theme-aware. */
export function EmbryoSimilarity({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Early embryos of fish salamander chick and human strikingly similar with gill pouches pharyngeal arches tail and notochord diverging later von Baer">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Embryological evidence — look alike early on</text>
      {["FISH", "SALAMANDER", "CHICK", "HUMAN"].map((t, i) => (
        <g key={t}>
          <rect x={60 + i * 150} y="50" width="110" height="90" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
          <path d={`M${85 + i * 150} 110 q25 -40 50 0 q-25 12 -50 0`} className="fill-none stroke-current text-sky-600" strokeWidth="2" />
          <line x1={95 + i * 150} y1="80" x2={95 + i * 150} y2="130" strokeWidth="2.5" className="stroke-current text-rose-400" />
          <text x={115 + i * 150} y="158" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{t}</text>
        </g>
      ))}
      <text x="16" y="182" fontSize="8" className="fill-current text-muted-foreground">Shared early features: gill pouches (pharyngeal arches), tail, notochord — diverging later (von Baer).</text>
      <text x="16" y="200" fontSize="8" className="fill-current text-muted-foreground">Human gill-pouch homologs become jaw, ear bones and throat structures.</text>
    </svg>
  );
}
