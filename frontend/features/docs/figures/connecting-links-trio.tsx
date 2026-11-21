/** Connecting links trio — Peripatus Euglena Archaeopteryx Neopalpa. Well-detailed. Theme-aware. */
export function ConnectingLinksTrio({ className }: { className?: string }) {
  const links: [string, string, string, string][] = [
    ["Peripatus", "annelid side: segmented body, nephridia", "arthropod side: jointed legs, tracheae", "rgb(2 132 199)"],
    ["Euglena", "plant side: chloroplasts, photosynthesis", "animal side: motile, no cell wall", "rgb(22 163 74)"],
    ["Archaeopteryx", "reptile side: teeth, bony tail, claws", "bird side: feathers, wishbone, wings", "rgb(217 119 6)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Connecting links trio Peripatus Euglena Archaeopteryx bridging groups with characters on both sides evidence of evolution">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three connecting links, one lesson</text>
      {links.map(([name, sideA, sideB, rgb], i) => {
        const y = 48 + i * 70;
        return (
          <g key={name}>
            <rect x="30" y={y} width="660" height="58" rx="10" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x="50" y={y + 24} fontSize="8.6" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x="50" y={y + 42} fontSize="7" className="fill-current text-muted-foreground">{sideA}</text>
            <text x="360" y={y + 24} fontSize="7" className="fill-current text-muted-foreground">{sideB}</text>
            <text x="360" y={y + 42} fontSize="6.8" className="fill-current" style={{ color: rgb }}>→ bridges the two groups</text>
          </g>
        );
      })}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">A connecting link carries characters of two groups — impossible if groups were created separately, expected if they share ancestry.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: for each link, name the two groups it bridges and one character from each.</text>
    </svg>
  );
}
