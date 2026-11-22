// Carbon use map. Theme-aware.
export function CarbonUseMap({ className }: { className?: string }) {
  const uses: [string, string, string][] = [
    ["diamond", "cutting, drilling, jewellery, heat sinks", "rgb(59 130 246)"],
    ["graphite", "electrodes, pencils, lubricant, moderator", "rgb(100 116 139)"],
    ["coke", "blast-furnace reducing agent", "rgb(51 65 85)"],
    ["carbon black", "tyre filler, inks", "rgb(30 41 59)"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Uses of carbon allotropes and amorphous forms">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">One element, four industries</text>
      {uses.map(([u, s, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.16" />
          <text x="58" y={63 + i * 48} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{u}</text>
          <text x="58" y={81 + i * 48} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">From the drill bit to the pencil to the tyre — all C</text>
    </svg>
  );
}
