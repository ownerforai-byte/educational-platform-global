// ToxicFiveTable figure. Theme-aware.
export function ToxicFiveTable({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Table of five toxic metals with forms targets diseases and sources">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The toxic five</text>
      <line x1="35" y1="50" x2="625" y2="50" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["METAL", "TARGET", "DISEASE", "SOURCE"],
        ["Fe (excess)", "liver, gut", "haemochromatosis", "tonics, overload"],
        ["As (As(III))", "enzymes (–SH)", "arsenicosis", "groundwater"],
        ["Hg (MeHg)", "CNS", "Minamata disease", "contaminated fish"],
        ["Pb", "haem enzymes, CNS", "plumbism", "paints, batteries"],
        ["Cd", "kidneys, bone", "itai-itai disease", "batteries, smoke"]].map((row, i) => (
        <g key={i}>
          {[0, 1, 2, 3].map((c) => (
            <text key={c} x={40 + [0, 130, 290, 480][c]} y={72 + i * 26} fontSize={i ? "10" : "9.5"} fontWeight={i ? (c ? "400" : "700") : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[c]}</text>
          ))}
          <line x1="35" y1={80 + i * 26} x2="625" y2={80 + i * 26} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
      <text x="330" y="226" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Minamata = mercury ate the nerves · itai-itai = cadmium ate the kidneys and bones</text>
    </svg>
  );
}
