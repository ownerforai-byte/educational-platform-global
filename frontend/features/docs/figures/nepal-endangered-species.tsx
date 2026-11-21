/** Nepal's endangered species grid with IUCN status. Theme-aware. */
export function NepalEndangeredSpecies({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Nepal's endangered species grid greater one-horned rhinoceros vulnerable Bengal tiger endangered snow leopard vulnerable red panda endangered gharial critically endangered arna endangered spiny babbler endemic and Bengal florican critically endangered">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Nepal's threatened roster — species and status</text>
      {[
        { y: 48, t: "Greater one-horned rhinoceros", s: "Terai grasslands, riverine forest", st: "VU", c: "rgb(202 138 4 / 0.9)" },
        { y: 74, t: "Bengal tiger", s: "Terai and Churia forests", st: "EN", c: "rgb(234 88 12 / 0.9)" },
        { y: 100, t: "Snow leopard", s: "high Himalaya, 3,000–5,500 m", st: "VU", c: "rgb(202 138 4 / 0.9)" },
        { y: 126, t: "Red panda", s: "temperate bamboo forests", st: "EN", c: "rgb(234 88 12 / 0.9)" },
        { y: 152, t: "Gharial", s: "Karnali, Rapti, Narayani rivers", st: "CR", c: "rgb(220 38 38 / 0.9)" },
        { y: 178, t: "Asiatic wild buffalo (arna)", s: "Koshi Tappu wetlands", st: "EN", c: "rgb(234 88 12 / 0.9)" },
        { y: 204, t: "Spiny babbler (Nepal-endemic) · Bengal florican", s: "mid-hill scrub · Terai grasslands", st: "LC · CR", c: "rgb(220 38 38 / 0.9)" },
      ].map((r) => (
        <g key={r.t}>
          <rect x="24" y={r.y - 11} width="612" height="24" rx="6" className="fill-current text-stone-500/8" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
          <text x="36" y={r.y + 4} fontSize="7.8" className="fill-current text-foreground" fontWeight="800">{r.t}</text>
          <text x="330" y={r.y + 4} fontSize="7.2" className="fill-current text-muted-foreground">{r.s}</text>
          <rect x="590" y={r.y - 9} width="36" height="18" rx="5" style={{ color: r.c }} className="fill-current opacity-25" />
          <text x="608" y={r.y + 4} fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{r.st}</text>
        </g>
      ))}
      <text x="16" y="238" fontSize="9" className="fill-current text-muted-foreground">Memory hook: Terai = rhino + tiger + gharial; Himalaya = snow leopard; bamboo mid-hills = red panda.</text>
    </svg>
  );
}
