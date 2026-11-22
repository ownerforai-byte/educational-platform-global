// Carbonate resonance trio with bond order one and a third. Theme-aware.
export function ResonanceCarbonateTrio({ className }: { className?: string }) {
  const trio = (x0: number, dbl: number) => (
    <g transform={`translate(${x0} 0)`}>
      <circle cx="70" cy="90" r="15" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.3" />
      <text x="70" y="94" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">C</text>
      {[[70, 34], [24, 120], [116, 120]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="13" className="fill-current" style={{ color: "rgb(244 63 94)" }} opacity="0.3" />
          <text x={x} y={y + 4} fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">O</text>
        </g>
      ))}
      {[[70, 48, 70, 76], [34, 110, 60, 98], [106, 110, 80, 98]].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={i === dbl ? 4 : 2} />
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 680 230" className={className} role="img" aria-label="Carbonate ion resonance with three equivalent forms each placing the double bond on a different oxygen and bond order one and a third">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Carbonate: three forms, three equal bonds</text>
      {trio(40, 0)}
      {trio(250, 1)}
      {trio(460, 2)}
      <text x="150" y="110" fontSize="24" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">&#8596;</text>
      <text x="360" y="110" fontSize="24" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">&#8596;</text>
      <text x="340" y="196" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">All three C-O bonds measure 129 pm; bond order = (2+1+1)/3 = 1 and 1/3</text>
    </svg>
  );
}
