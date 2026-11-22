// S8 crown ring. Theme-aware.
export function S8CrownRing({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="S8 puckered crown ring of eight sulphur atoms in rhombic and monoclinic sulphur">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">S₈: the puckered crown</text>
      {Array.from({ length: 8 }).map((_, i) => {
        const a1 = (i * 45 * Math.PI) / 180;
        const a2 = ((i + 1) * 45 * Math.PI) / 180;
        const x1 = 330 + 70 * Math.cos(a1), y1 = 110 + 45 * Math.sin(a1) + (i % 2 ? 8 : -8);
        const x2 = 330 + 70 * Math.cos(a2), y2 = 110 + 45 * Math.sin(a2) + ((i + 1) % 2 ? 8 : -8);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgb(245 158 11)" strokeWidth="3" />;
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return <circle key={i} cx={330 + 70 * Math.cos(a)} cy={110 + 45 * Math.sin(a) + (i % 2 ? 8 : -8)} r="9" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.7" />;
      })}
      <text x="330" y="196" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Same S₈ ring in both crystalline allotropes — only the packing differs</text>
    </svg>
  );
}
