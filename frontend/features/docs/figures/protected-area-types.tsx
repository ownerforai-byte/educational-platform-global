/** Protected-area designation types comparison. Theme-aware. */
export function ProtectedAreaTypes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Protected area designation types national park wildlife reserve hunting reserve conservation area buffer zone biodiversity hotspot and Ramsar site with definitions">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Seven designations — what each one means</text>
      {[
        { y: 48, t: "NATIONAL PARK", s: "large area; ecosystems + wildlife; no consumptive use; government-managed" },
        { y: 76, t: "WILDLIFE RESERVE", s: "protects particular wildlife and habitat; human activity more restricted than parks" },
        { y: 104, t: "HUNTING RESERVE", s: "only area where regulated hunting of certain species is permitted (Dhorpatan)" },
        { y: 132, t: "CONSERVATION AREA", s: "managed with local communities for both biodiversity and sustainable use" },
        { y: 160, t: "BUFFER ZONE", s: "community-use fringe around parks; channels revenue share and forests to locals" },
        { y: 188, t: "BIODIVERSITY HOTSPOT", s: "region with exceptional endemic species that has lost ≥70% of original habitat" },
        { y: 216, t: "RAMSAR SITE", s: "wetland of international importance (Ramsar Convention, 1971, Iran)" },
      ].map((r) => (
        <g key={r.t}>
          <rect x="24" y={r.y - 11} width="612" height="24" rx="6" className="fill-current text-emerald-500/8" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
          <text x="36" y={r.y + 4} fontSize="7.8" className="fill-current text-foreground" fontWeight="800">{r.t}</text>
          <text x="216" y={r.y + 4} fontSize="7.4" className="fill-current text-muted-foreground">{r.s}</text>
        </g>
      ))}
    </svg>
  );
}
