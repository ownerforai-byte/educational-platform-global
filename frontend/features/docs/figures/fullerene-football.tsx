// Fullerene football C60. Theme-aware.
export function FullereneFootball({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Buckminsterfullerene C60 football of twenty hexagons and twelve pentagons with endohedral doping">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">C₆₀: the football molecule (1985, Nobel 1996)</text>
      <circle cx="330" cy="110" r="52" fill="none" stroke="rgb(245 158 11)" strokeWidth="3" />
      <circle cx="330" cy="110" r="30" fill="none" stroke="rgb(245 158 11)" strokeWidth="2" />
      {[0, 60, 120, 180, 240, 300].map((a) => {
        const r = (a * Math.PI) / 180;
        return <line key={a} x1={330 + 30 * Math.sin(r)} y1={110 - 30 * Math.cos(r)} x2={330 + 52 * Math.sin(r)} y2={110 - 52 * Math.cos(r)} stroke="rgb(245 158 11)" strokeWidth="1.5" />;
      })}
      <circle cx="330" cy="110" r="6" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.7" />
      <text x="330" y="190" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">20 hexagons + 12 pentagons (Euler's rule) · ~0.7 nm · atoms can be trapped inside (endohedral)</text>
      <text x="330" y="214" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">pentagons force the curvature that closes the sheet into a ball</text>
    </svg>
  );
}
