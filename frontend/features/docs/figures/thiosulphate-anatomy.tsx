// Thiosulphate anatomy. Theme-aware.
export function ThiosulphateAnatomy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Thiosulphate ion structure sulphate-like sulphur plus sulfane sulphur with two different oxidation states">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">S₂O₃²⁻: two sulphurs, two jobs</text>
      <circle cx="300" cy="100" r="14" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.5" />
      <circle cx="360" cy="100" r="14" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.5" />
      {[0, 120, 240].map((a) => {
        const r = (a * Math.PI) / 180;
        return <circle key={a} cx={300 + 38 * Math.sin(r)} cy={100 - 38 * Math.cos(r)} r="9" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.4" />;
      })}
      <line x1="314" y1="100" x2="346" y2="100" stroke="currentColor" strokeWidth="2.5" className="text-foreground" />
      <text x="255" y="105" fontSize="11" textAnchor="end" className="fill-current text-foreground">S(+5)</text>
      <text x="385" y="105" fontSize="11" className="fill-current text-foreground">S(−2) sulfane</text>
      <text x="500" y="90" fontSize="10.5" className="fill-current text-muted-foreground">one S is the sulfate core,</text>
      <text x="500" y="110" fontSize="10.5" className="fill-current text-muted-foreground">the other is a "replaceable" O</text>
      <text x="330" y="182" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Average OS +2 — but the two S atoms behave completely differently in reactions</text>
    </svg>
  );
}
