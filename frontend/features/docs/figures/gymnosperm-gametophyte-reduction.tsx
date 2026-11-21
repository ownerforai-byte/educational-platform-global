/** Gametophyte reduction — from fern prothallus to pollen grain. Well-detailed. Theme-aware. */
export function GymnospermGametophyteReduction({ className }: { className?: string }) {
  const stages: [string, string, string][] = [
    ["Moss", "large green gametophyte dominates; sporophyte attached", "text-emerald-500"],
    ["Fern", "tiny independent prothallus; short-lived but free-living", "text-lime-500"],
    ["Gymnosperm", "gametophytes microscopic, inside spores/ovule; dependent", "text-amber-500"],
    ["Angiosperm", "reduced further: 3-celled male, 8-nucleate embryo sac", "text-rose-500"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Gametophyte reduction from moss to angiosperm shrinking haploid generation pollen grain embryo sac dependent microscopic evolution trend">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The shrinking gametophyte — land-plant trend</text>
      {stages.map(([name, detail, tint], i) => {
        const y = 44 + i * 58;
        return (
          <g key={name}>
            <rect x="30" y={y} width="660" height="48" rx="10" className={`fill-current ${tint}/10`} strokeWidth="2" stroke="currentColor" />
            <text x="48" y={y + 20} fontSize="8.8" className="fill-current text-foreground" fontWeight="800">{name}</text>
            <text x="48" y={y + 38} fontSize="7.4" className="fill-current text-muted-foreground">{detail}</text>
            {/* shrinking dot */}
            <circle cx={640 - i * 8} cy={y + 24} r={14 - i * 3.2} className={`fill-current ${tint}/40`} stroke="currentColor" strokeWidth="1.4" />
          </g>
        );
      })}
      <rect x="30" y="282" width="660" height="12" rx="6" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="292" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: gymnosperm male gametophyte = the pollen grain itself; female gametophyte lives inside the ovule — never free-living.</text>
    </svg>
  );
}
