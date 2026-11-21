// Four blocks of the periodic table. Theme-aware.
export function FourBlocksMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 240" className={className} role="img" aria-label="Four blocks of the periodic table s block groups one two p block groups thirteen to eighteen d block groups three to twelve f block lanthanides actinides with block deciding electron entry subshell">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">The four blocks — where the last electron lands</text>
      <rect x="30" y="44" width="150" height="110" rx="8" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="105" y="66" fontSize="10" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">s-block</text>
      <text x="105" y="86" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Groups 1–2</text>
      <text x="105" y="104" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">ns¹–² · metals</text>
      <text x="105" y="122" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">group no. = ns electrons</text>
      <rect x="190" y="44" width="180" height="110" rx="8" className="fill-current text-violet-500/15" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="280" y="66" fontSize="10" textAnchor="middle" className="fill-current text-violet-600" fontWeight="800">p-block</text>
      <text x="280" y="86" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Groups 13–18</text>
      <text x="280" y="104" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">ns² np¹–⁶ · metals + non-metals</text>
      <text x="280" y="122" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">group = 12 + np electrons</text>
      <rect x="380" y="44" width="160" height="110" rx="8" className="fill-current text-emerald-500/15" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="460" y="66" fontSize="10" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">d-block</text>
      <text x="460" y="86" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Groups 3–12</text>
      <text x="460" y="104" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">(n−1)d¹–¹⁰ ns⁰–² · transition</text>
      <text x="460" y="122" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">group = 2 + (n−1)d electrons</text>
      <rect x="550" y="44" width="140" height="110" rx="8" className="fill-current text-amber-500/15" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="620" y="66" fontSize="10" textAnchor="middle" className="fill-current text-amber-600" fontWeight="800">f-block</text>
      <text x="620" y="86" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Groups 3 (two rows)</text>
      <text x="620" y="104" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">(n−2)f¹–¹⁴ · inner transition</text>
      <text x="620" y="122" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">lanthanides + actinides</text>
      <rect x="30" y="168" width="660" height="56" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="188" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">The block is decided by the differentiating electron — the one that distinguishes the element from the previous one.</text>
      <text x="360" y="206" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Helium is the trap: its configuration is 1s² (s-block placement) but its chemistry is noble-gas (group 18, p-block region).</text>
    </svg>
  );
}
