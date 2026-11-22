// Five postulates of VSEPR theory. Theme-aware.
export function VseprPostulatesPanel({ className }: { className?: string }) {
  const posts: [string, string][] = [
    ["1. Domains count", "electron pairs around the central atom - bonding or lone - set the geometry"],
    ["2. Maximum separation", "pairs arrange to be as far apart as possible, minimising repulsion"],
    ["3. Repulsion order", "lone pair-lone pair beats lone pair-bond pair beats bond pair-bond pair"],
    ["4. Multiple bonds count once", "a double or triple bond acts as one electron domain for shape"],
    ["5. Lone pairs compress", "lone pairs occupy more space and squeeze the bond angles down"],
  ];
  return (
    <svg viewBox="0 0 700 330" className={className} role="img" aria-label="Five postulates of VSEPR theory covering electron domains maximum separation repulsion order multiple bonds and lone pair compression">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">VSEPR: five postulates that predict every shape</text>
      {posts.map(([head, body], i) => (
        <g key={i}>
          <rect x="24" y={46 + i * 54} width="652" height="46" rx="8" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.08" />
          <rect x="24" y={46 + i * 54} width="652" height="46" rx="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <text x="40" y={64 + i * 54} fontSize="12" className="fill-current text-foreground" fontWeight="800">{head}</text>
          <text x="40" y={82 + i * 54} fontSize="11" className="fill-current text-muted-foreground">{body}</text>
        </g>
      ))}
    </svg>
  );
}
