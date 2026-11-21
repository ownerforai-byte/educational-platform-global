/** DNA fingerprinting — identity from repeating DNA. Well-detailed. Theme-aware. */
export function DnaFingerprinting({ className }: { className?: string }) {
  const lanes: [string, number[]][] = [
    ["Crime scene", [3, 5, 7, 9, 12]],
    ["Suspect A", [3, 5, 7, 10, 12]],
    ["Suspect B", [3, 5, 7, 9, 12]],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="DNA fingerprinting gel electrophoresis VNTR bands comparison crime scene suspect paternity test forensic identification steps">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">DNA fingerprinting — bands as identity</text>
      <text x="16" y="44" fontSize="7.6" className="fill-current text-muted-foreground">Every person's VNTR repeat pattern is unique (except identical twins). Compare the bands, compare the person.</text>

      {/* gel */}
      <rect x="30" y="58" width="330" height="200" rx="10" className="fill-current text-stone-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="46" y="76" fontSize="7" className="fill-current text-muted-foreground">− electrodes (top): long fragments travel slowly</text>
      {lanes.map(([name, bands], i) => {
        const x = 70 + i * 100;
        return (
          <g key={name}>
            <text x={x + 30} y="92" fontSize="6.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{name}</text>
            <line x1={x} y1="100" x2={x} y2="244" className="stroke-current text-stone-400" strokeWidth="1" />
            <line x1={x + 60} y1="100" x2={x + 60} y2="244" className="stroke-current text-stone-400" strokeWidth="1" />
            {bands.map((b, j) => (
              <rect key={j} x={x + 4} y={100 + b * 11} width="52" height="5" rx="2.5" className="fill-current text-sky-500/70" style={{ color: "rgb(2 132 199 / 0.9)" }} />
            ))}
          </g>
        );
      })}
      <text x="46" y="272" fontSize="7" className="fill-current text-muted-foreground">+ electrodes (bottom): short fragments run fastest</text>

      {/* interpretation */}
      <rect x="390" y="58" width="300" height="200" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="80" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">READ THE GEL</text>
      {[
        "crime scene and suspect B match",
        "band for band — same source",
        "suspect A differs at band 4",
        "uses: forensics, paternity,",
        "  identification of remains",
      ].map((t, i) => (
        <text key={t} x="406" y={104 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <text x="406" y="204" fontSize="7.2" className="fill-current text-sky-600" fontWeight="700">Steps: extract DNA → cut with enzymes →</text>
      <text x="406" y="220" fontSize="7.2" className="fill-current text-sky-600" fontWeight="700">amplify by PCR → run gel → compare</text>
      <text x="406" y="246" fontSize="7" className="fill-current text-muted-foreground">Exam hook: identical band pattern =</text>
      <text x="406" y="260" fontSize="7" className="fill-current text-muted-foreground">identical repeat layout, not identical person.</text>
    </svg>
  );
}
