/** Rhizobium nodules — Fabaceae's nitrogen partnership. Well-detailed. Theme-aware. */
export function FabaceaeNodulesRhizobium({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Rhizobium root nodules Fabaceae legume nitrogen fixation bacteria convert N2 to ammonia natural fertiliser crop rotation pulses peas beans soil fertility">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Root nodules — the pea family's fertiliser factory</text>

      {/* plant with nodules */}
      <rect x="30" y="44" width="380" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="220" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PEA PLANT WITH NODULES</text>
      {/* shoot */}
      <rect x="212" y="90" width="10" height="60" rx="4" className="fill-current text-emerald-700/40" />
      {[[196, 104], [238, 112]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="14" ry="7" className="fill-current text-emerald-600/40" />
      ))}
      {/* roots */}
      <path d="M217 150 q-40 30 -70 60 M217 150 q0 40 -6 80 M217 150 q40 30 70 60 M217 150 q20 40 30 78" className="fill-none stroke-current text-amber-800" strokeWidth="3" style={{ color: "rgb(146 64 14 / 0.9)" }} />
      {/* nodules */}
      {[[150, 208], [186, 228], [284, 208], [248, 226], [224, 240]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="8" className="fill-current text-rose-400/40" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(251 113 133 / 0.9)" }} />
      ))}
      <text x="220" y="262" fontSize="7.2" textAnchor="middle" className="fill-current text-rose-400" fontWeight="700">nodules — swollen homes for Rhizobium bacteria</text>

      {/* exchange card */}
      <rect x="430" y="44" width="260" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="560" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE DEAL INSIDE</text>
      {[
        "Rhizobium enters root hairs",
        "root swells into a nodule",
        "bacteria convert N₂ → ammonia",
        "plant feeds bacteria sugars",
        "result: protein-rich pulses",
        "and nitrogen left in the soil",
        "— why farmers rotate legumes",
      ].map((t, i) => (
        <text key={t} x="446" y={94 + i * 23} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="446" y="248" fontSize="7.2" className="fill-current text-sky-600" fontWeight="700">free natural fertiliser, grown not bought</text>

      <rect x="30" y="274" width="660" height="18" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="287" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: diadelphous stamens (9+1) + legume fruit + Rhizobium nodules = Fabaceae, three facts in one answer.</text>
    </svg>
  );
}
