// Nitrate resonance panel. Theme-aware.
export function No3ResonancePanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Nitrate ion with three equivalent resonance structures giving bond order one and one third and equal bond lengths">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">NO₃⁻: three drawings, one ion</text>
      <circle cx="330" cy="100" r="22" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.3" />
      <text x="330" y="106" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">N</text>
      {[0, 120, 240].map((a) => {
        const r = (a * Math.PI) / 180;
        return <line key={a} x1="330" y1="100" x2={330 + 46 * Math.sin(r)} y2={100 + 46 * Math.cos(r)} stroke="currentColor" strokeWidth="2" className="text-foreground" />;
      })}
      <text x="330" y="170" fontSize="11.5" textAnchor="middle" className="fill-current text-muted-foreground">3 resonance forms · bond order 1⅓ · all N–O bonds equal</text>
      <text x="330" y="200" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Planar, sp², the charge smeared over three oxygens - stability by sharing</text>
    </svg>
  );
}
