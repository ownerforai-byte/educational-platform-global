// Ozone resonance pair with measured bond length. Theme-aware.
export function ResonanceOzonePair({ className }: { className?: string }) {
  const form = (x0: number, flip: boolean) => (
    <g transform={`translate(${x0} 0)`}>
      {[[40, 110], [120, 80], [200, 110]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="16" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.3" />
      ))}
      {[[40, 110], [120, 80], [200, 110]].map(([x, y], i) => (
        <text key={"t" + i} x={x} y={y + 4} fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">O</text>
      ))}
      <line x1={flip ? 54 : 54} y1={flip ? 102 : 102} x2={106} y2={flip ? 86 : 86} stroke="currentColor" strokeWidth="2" />
      <line x1={54} y1={flip ? 110 : 110} x2={106} y2={flip ? 94 : 94} stroke="currentColor" strokeWidth="2" />
      <line x1={134} y1="94" x2="186" y2="110" stroke="currentColor" strokeWidth="2.5" />
      <text x="120" y="160" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">{flip ? "left form" : "right form"}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 640 220" className={className} role="img" aria-label="Ozone resonance with two canonical forms connected by a resonance arrow and measured bond length 128 picometres between single and double bond">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Ozone: neither form is real - the average is</text>
      {form(0, false)}
      <text x="320" y="110" fontSize="26" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">&#8596;</text>
      {form(320, true)}
      <text x="320" y="196" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Experiment: both O-O bonds equal, 128 pm - halfway between single (148) and double (121)</text>
    </svg>
  );
}
