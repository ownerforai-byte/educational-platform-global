/** RBC stages of Plasmodium — ring, trophozoite, schizont, merozoite release. Theme-aware. */
export function PlasmodiumRbcStages({ className }: { className?: string }) {
  const rbc = (cx: number, cy: number, k: string, inner?: React.ReactNode) => (
    <g key={k}>
      <circle cx={cx} cy={cy} r="42" className="fill-current text-rose-500/15" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(239 68 68 / 0.9)" }} />
      {inner}
    </g>
  );
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Plasmodium stages inside red blood cells from signet ring stage through trophozoite and schizont to merozoite release">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Inside the red cell — 48 hours, four acts</text>

      {rbc(110, 120, "r1", <g><circle cx="110" cy="118" r="9" className="fill-current text-violet-600/70" /><circle cx="118" cy="130" r="4" className="fill-current text-violet-600/40" /></g>)}
      <text x="110" y="196" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">① Signet-ring</text>
      <text x="110" y="210" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">young trophozoite (diagnostic)</text>

      {rbc(300, 120, "r2", <g><circle cx="300" cy="120" r="16" className="fill-current text-violet-600/50" /><circle cx="292" cy="112" r="4" className="fill-current text-amber-500/70" /><circle cx="310" cy="128" r="4" className="fill-current text-amber-500/70" /></g>)}
      <text x="300" y="196" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">② Trophozoite</text>
      <text x="300" y="210" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">feeds on haemoglobin → haemozoin pigment</text>

      {rbc(490, 120, "r3", <g><g className="fill-current text-violet-600/70">{[0,1,2,3,4,5,6,7].map((i) => { const a=(i/8)*Math.PI*2; return <circle key={i} cx={490+22*Math.cos(a)} cy={120+22*Math.sin(a)} r="5" />; })}</g></g>)}
      <text x="490" y="196" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">③ Schizont</text>
      <text x="490" y="210" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">nuclei split repeatedly (schizogony)</text>

      <g>
        <path d="M610 96 q20 10 0 24 q-16 10 -24 -4 q-6 -14 10 -20 q8 -4 14 0 Z" className="fill-current text-rose-500/20" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(239 68 68 / 0.9)" }} />
        <g className="fill-current text-violet-600/70"><circle cx="618" cy="104" r="2.5" /><circle cx="626" cy="112" r="2.5" /><circle cx="616" cy="114" r="2.5" /></g>
      </g>
      <text x="620" y="196" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">④ Merozoites out</text>
      <text x="620" y="210" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">RBC bursts → toxins → fever</text>

      <text x="16" y="236" fontSize="10" className="fill-current text-muted-foreground">Haemozoin (malarial pigment) accumulates as haemoglobin is digested — seen in blood smears along with the ring stage for diagnosis.</text>
    </svg>
  );
}
