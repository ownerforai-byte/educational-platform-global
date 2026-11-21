// Solved NEB 2022: the two IE irregularities. Theme-aware.
export function IrregularityPairPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 230" className={className} role="img" aria-label="Solved NEB 2022 two ionisation energy irregularities magnesium above aluminium and sodium above chlorine explained by subshell stability and small size high effective nuclear charge">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — NEB 2022 (3m): why IE dips twice in period 3</text>
      <rect x="30" y="42" width="320" height="110" rx="10" className="fill-current text-violet-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="190" y="64" fontSize="9.5" textAnchor="middle" className="fill-current text-violet-600" fontWeight="800">Mg &gt; Al (not the expected rise)</text>
      <text x="190" y="86" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Mg: 3s² — full, symmetrical s subshell</text>
      <text x="190" y="104" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Al: 3s² 3p¹ — the lone 3p electron</text>
      <text x="190" y="126" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">3p sits above 3s and is easier to remove → IE falls</text>
      <rect x="370" y="42" width="320" height="110" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="530" y="64" fontSize="9.5" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">Na &lt; Cl, but Na's IE is far lower</text>
      <text x="530" y="86" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Na: Z_eff ≈ +1, radius 186 pm</text>
      <text x="530" y="104" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Cl: Z_eff ≈ +7, radius 99 pm</text>
      <text x="530" y="126" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">tiny, tightly-held Cl electron → huge IE gap</text>
      <rect x="30" y="166" width="660" height="48" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="186" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Answer skeleton: state the irregularity → give both configurations → blame subshell stability (Mg–Al) and size + Z_eff (Na–Cl).</text>
      <text x="360" y="204" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">The same two dips repeat in period 2 (Be–B and N–O) — same reasons, different elements.</text>
    </svg>
  );
}
