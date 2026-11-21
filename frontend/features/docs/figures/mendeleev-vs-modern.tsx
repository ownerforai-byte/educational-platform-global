// Mendeleev vs modern periodic law contrast. Theme-aware.
export function MendeleevVsModern({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 230" className={className} role="img" aria-label="Mendeleev periodic law based on atomic mass contrasted with modern periodic law based on atomic number with defects resolved">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Mendeleev (1869) vs Modern (Moseley, 1913)</text>
      <rect x="30" y="42" width="320" height="120" rx="10" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="190" y="64" fontSize="10" textAnchor="middle" className="fill-current text-amber-600" fontWeight="800">Mendeleev — by atomic mass</text>
      <text x="190" y="86" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">"Properties are a periodic function</text>
      <text x="190" y="102" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">of atomic weights."</text>
      <text x="190" y="124" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Left gaps for undiscovered elements (Ga, Ge)</text>
      <text x="190" y="144" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">But mass is not the true cause of periodicity</text>
      <rect x="370" y="42" width="320" height="120" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="530" y="64" fontSize="10" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Modern — by atomic number Z</text>
      <text x="530" y="86" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">"Properties are a periodic function</text>
      <text x="530" y="102" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">of atomic numbers."</text>
      <text x="530" y="124" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Z = proton count — always a whole number</text>
      <text x="530" y="144" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Root cause: repeating outer configurations</text>
      <rect x="30" y="176" width="660" height="40" rx="8" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="194" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">The modern law fixes every mass anomaly (Te–I, Ar–K, Co–Ni) at once, because Z orders the table, not mass.</text>
      <text x="360" y="210" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Moseley's X-ray work: √ν ∝ (Z − b) — the experimental basis for the modern law.</text>
    </svg>
  );
}
