// Ozone use map. Theme-aware.
export function OzoneUseMap({ className }: { className?: string }) {
  const uses: [string, string, string][] = [
    ["water sterilisation", "kills microbes, no chlorine taste", "rgb(14 165 233)"],
    ["bleaching", "silk, oils, wax, ivory, flour", "rgb(16 185 129)"],
    ["air purification", "closed rooms, submarines", "rgb(59 130 246)"],
    ["ozonolysis", "locates C=C in organic synthesis", "rgb(245 158 11)"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Four uses of ozone with brief notes">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Ozone at work</text>
      {uses.map(([u, s, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="58" y={63 + i * 48} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{u}</text>
          <text x="58" y={81 + i * 48} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Every use is the third oxygen leaving as nascent [O]</text>
    </svg>
  );
}
