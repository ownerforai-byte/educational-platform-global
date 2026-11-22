// Bond length ladder for carbon-carbon and hydrogen halides. Theme-aware.
export function BondLengthLadder({ className }: { className?: string }) {
  const rows: [string, number, string][] = [
    ["C-C", 154, "single"],
    ["C=C", 134, "double"],
    ["C=C", 120, "triple"],
    ["H-F", 92, "strongest hydride"],
    ["H-I", 160, "weakest hydride"],
  ];
  return (
    <svg viewBox="0 0 660 320" className={className} role="img" aria-label="Bond length ladder with carbon carbon single double triple bonds and hydrogen fluoride to hydrogen iodide showing picometre values">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Bond lengths: order squeezes, size stretches</text>
      {rows.map(([bond, pm, note], i) => (
        <g key={i}>
          <text x="40" y={70 + i * 50} fontSize="13" className="fill-current text-foreground" fontWeight="800">{bond}</text>
          <rect x="110" y={54 + i * 50} width={pm} height="26" rx="6" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.22" />
          <text x={124 + pm} y={72 + i * 50} fontSize="11.5" className="fill-current text-foreground" fontWeight="700">{pm} pm</text>
          <text x="560" y={72 + i * 50} fontSize="10" className="fill-current text-muted-foreground">{note}</text>
        </g>
      ))}
      <text x="330" y="308" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Higher bond order shortens; bigger atoms lengthen; shorter is stronger</text>
    </svg>
  );
}
