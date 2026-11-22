// H2O2 use map. Theme-aware.
export function H2o2UseMap({ className }: { className?: string }) {
  const uses: [string, string, string][] = [
    ["antiseptic (3%)", "perhydroxyl kills anaerobes; effervescence clears debris", "rgb(16 185 129)"],
    ["bleaching", "hair, silk, wool, ivory - gentle oxidation", "rgb(245 158 11)"],
    ["water treatment", "disinfects wells and swimming pools", "rgb(14 165 233)"],
    ["rocket propellant (HTP)", "85-90% solution, decomposes to thrust", "rgb(239 68 68)"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Four applications of hydrogen peroxide from antiseptic to rocket propellant">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">From medicine cabinet to launch pad</text>
      {uses.map(([u, s, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="58" y={63 + i * 48} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{u}</text>
          <text x="58" y={81 + i * 48} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">All four are the same decomposition, harnessed at different concentrations</text>
    </svg>
  );
}
