// Carbon hybridisation trio. Theme-aware.
export function CarbonHybridisationTrio({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Three hybridisations of carbon building diamond graphite and fullerene">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Hybridisation is destiny</text>
      <circle cx="130" cy="110" r="14" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.4" />
      {[0, 90, 180, 270].map((a) => {
        const r = (a * Math.PI) / 180;
        return <line key={a} x1="130" y1="110" x2={130 + 34 * Math.sin(r)} y2={110 + 34 * Math.cos(r)} stroke="currentColor" strokeWidth="2" className="text-foreground" />;
      })}
      <text x="130" y="170" fontSize="11.5" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">sp³ → diamond</text>
      <text x="130" y="188" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">4 σ bonds, 3-D rigid</text>
      {[0, 120, 240].map((a) => {
        const r = (a * Math.PI) / 180;
        return <line key={a} x1="330" y1="110" x2={330 + 36 * Math.sin(r)} y2={110 + 36 * Math.cos(r)} stroke="currentColor" strokeWidth="2" className="text-foreground" />;
      })}
      <circle cx="330" cy="110" r="14" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.4" />
      <text x="330" y="170" fontSize="11.5" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">sp² → graphite</text>
      <text x="330" y="188" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">3 σ + 1 delocalised e⁻</text>
      <circle cx="530" cy="110" r="30" fill="none" stroke="rgb(245 158 11)" strokeWidth="2.5" />
      <circle cx="530" cy="110" r="16" fill="none" stroke="rgb(245 158 11)" strokeWidth="2" />
      <text x="530" y="170" fontSize="11.5" fontWeight="800" textAnchor="middle" fill="rgb(245 158 11)">sp² strained → C₆₀</text>
      <text x="530" y="188" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">ball of 20 hex + 12 pent</text>
      <text x="330" y="232" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Lock the electrons (insulator) or free them (conductor) — the atom decides</text>
    </svg>
  );
}
