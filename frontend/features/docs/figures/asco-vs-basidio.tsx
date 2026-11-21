/** Ascomycetes vs Basidiomycetes — the higher fungi contrast. Well-detailed. Theme-aware. */
export function AscoVsBasidio({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Ascomycetes versus basidiomycetes sac fungi versus club fungi ascus eight ascospores versus basidium four basidiospores septate hyphae examples yeast Penicillium morels versus mushrooms puffballs rusts smuts bracket fungi">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The two 'higher' fungi — sac vs club</text>

      {/* ascomycetes */}
      <rect x="30" y="44" width="330" height="190" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ASCOMYCETES — sac fungi</text>
      {/* ascus */}
      <rect x="150" y="86" width="90" height="34" rx="16" className="fill-none stroke-current text-violet-600" strokeWidth="3" />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={172 + i * 16} cy="103" r="4.5" className="fill-current text-violet-600" />
      ))}
      <text x="195" y="140" fontSize="7" textAnchor="middle" className="fill-current text-violet-600" fontWeight="700">ascus: 8 ascospores in a row</text>
      {[
        "yeast (budding), Penicillium, morels,",
        "cup fungi, powdery mildews",
        "septate hyphae; spores shot from ascus",
      ].map((t, i) => (
        <text key={t} x="60" y={166 + i * 20} fontSize="7.2" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      {/* basidiomycetes */}
      <rect x="380" y="44" width="310" height="190" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="535" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BASIDIOMYCETES — club fungi</text>
      {/* basidium */}
      <path d="M490 120 L490 96 M535 120 L535 96 M580 120 L580 96" strokeWidth="2.5" className="stroke-current text-amber-600" />
      <rect x="480" y="120" width="110" height="14" rx="6" className="fill-none stroke-current text-amber-600" strokeWidth="3" />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={505 + i * 20} cy="90" r="4.5" className="fill-current text-amber-600" />
      ))}
      <text x="535" y="150" fontSize="7" textAnchor="middle" className="fill-current text-amber-600" fontWeight="700">basidium: 4 basidiospores on stalks</text>
      {[
        "mushrooms, puffballs, bracket fungi,",
        "rusts and smuts (crop diseases)",
        "spores borne externally on the club",
      ].map((t, i) => (
        <text key={t} x="400" y={176 + i * 20} fontSize="7.2" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      <rect x="30" y="248" width="660" height="40" rx="10" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="50" y="264" fontSize="8" className="fill-current text-foreground" fontWeight="700">One-glance ID: spores INSIDE a sac → ascomycete · spores OUTSIDE on a club → basidiomycete.</text>
      <text x="50" y="281" fontSize="7.4" className="fill-current text-muted-foreground">Both have septate hyphae and a dikaryotic phase — they are the evolved 'higher' fungi.</text>
    </svg>
  );
}
