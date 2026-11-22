// Acidity vs stability opposing trends. Theme-aware.
export function AcidityStabilityScissors({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Opposing trends of increasing acidity and decreasing thermal stability down the hydrogen halides">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">One bond, two opposite arrows</text>
      <path d="M 100 150 Q 330 60 560 150" stroke="rgb(16 185 129)" strokeWidth="3" fill="none" markerEnd="url(#asc1)" />
      <text x="330" y="70" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">acidity ↑ (HI strongest)</text>
      <path d="M 100 180 Q 330 220 560 180" stroke="rgb(239 68 68)" strokeWidth="3" fill="none" markerEnd="url(#asc2)" />
      <text x="330" y="230" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">thermal stability ↓ (HI decomposes)</text>
      {["HCl", "HBr", "HI"].map((t, i) => (
        <text key={i} x={130 + i * 200} y="172" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{t}</text>
      ))}
      <defs>
        <marker id="asc1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker>
        <marker id="asc2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(239 68 68)" /></marker>
      </defs>
      <text x="330" y="120" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The same weakening H–X bond releases its proton easily and its electrons even more easily</text>
    </svg>
  );
}
