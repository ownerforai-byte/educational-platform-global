// Moseley X-ray experiment panel. Theme-aware.
export function MoseleyXrayPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Moseley 1913 X-ray experiment bombarding metal targets with cathode rays measuring characteristic X-ray frequencies proportional to atomic number squared">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Moseley (1913) — the experiment that renumbered the table</text>
      <rect x="40" y="60" width="130" height="70" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="105" y="90" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Cathode-ray gun</text>
      <text x="105" y="108" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">fast electrons</text>
      <line x1="170" y1="95" x2="290" y2="95" className="stroke-current text-sky-500" strokeWidth="2.4" strokeDasharray="7 5" style={{ color: "rgb(14 165 233 / 0.9)" }} markerEnd="url(#mxarr)" />
      <rect x="290" y="62" width="120" height="66" rx="8" className="fill-current text-violet-500/15" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="350" y="90" fontSize="9" textAnchor="middle" className="fill-current text-violet-600" fontWeight="800">Metal target</text>
      <text x="350" y="108" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">Ca, Ti, V, Cr …</text>
      {[330, 300, 270].map((x, i) => (
        <line key={x} x1="410" y1={90 - i * 3} x2={x + 180} y2={62 - i * 22} className="stroke-current text-emerald-500" strokeWidth="2" strokeDasharray="6 4" style={{ color: `rgb(16 185 129 / ${0.9 - i * 0.25})` }} />
      ))}
      <text x="600" y="60" fontSize="8.6" className="fill-current text-emerald-600" fontWeight="800">Characteristic X-rays</text>
      <rect x="30" y="150" width="660" height="54" rx="10" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="46" y="172" fontSize="10" className="fill-current text-amber-600" fontWeight="800">Result: √ν = a (Z − b) — frequency depends on Z, not on atomic mass.</text>
      <text x="46" y="192" fontSize="8.4" className="fill-current text-muted-foreground">Each element emits X-rays at its own Z-determined frequency, so Z is the true serial number of the periodic table — the modern periodic law.</text>
      <defs>
        <marker id="mxarr" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" className="fill-current" /></marker>
      </defs>
    </svg>
  );
}
