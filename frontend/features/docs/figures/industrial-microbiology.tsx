/**
 * Industrial microbiology — fermenter/bioreactor anatomy and the
 * product pipeline (microbe + substrate → product). Theme-aware.
 */
export function IndustrialMicrobiology({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 320" className={className} role="img" aria-label="Industrial fermenter showing stirred tank with pH temperature and aeration controls feeding microbes and substrate in and antibiotic enzyme or vitamin product out downstream">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Microbes as factories — the industrial fermenter</text>

      {/* fermenter */}
      <g>
        <rect x="120" y="70" width="150" height="180" rx="24" className="fill-current text-teal-500/10" strokeWidth="3.5" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
        <rect x="185" y="40" width="20" height="34" rx="4" className="fill-current text-slate-400/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(148 163 184 / 0.9)" }} />
        <line x1="195" y1="90" x2="195" y2="220" strokeWidth="5" className="stroke-current text-slate-400/60" />
        <g className="stroke-current text-slate-400/80" strokeWidth="4">
          <line x1="188" y1="110" x2="202" y2="110" /><line x1="188" y1="140" x2="202" y2="140" /><line x1="188" y1="170" x2="202" y2="170" /><line x1="188" y1="200" x2="202" y2="200" />
        </g>
        <text x="195" y="30" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">stirrer</text>
        <text x="60" y="120" fontSize="9" className="fill-current text-muted-foreground" textAnchor="end">pH probe</text>
        <line x1="66" y1="116" x2="120" y2="116" strokeWidth="2" className="stroke-current text-muted-foreground" />
        <text x="60" y="160" fontSize="9" className="fill-current text-muted-foreground" textAnchor="end">temp. 37 °C</text>
        <line x1="66" y1="156" x2="120" y2="156" strokeWidth="2" className="stroke-current text-muted-foreground" />
        <text x="60" y="200" fontSize="9" className="fill-current text-muted-foreground" textAnchor="end">aeration (O₂)</text>
        <line x1="66" y1="196" x2="120" y2="196" strokeWidth="2" className="stroke-current text-muted-foreground" />
        <text x="195" y="272" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">aseptic, temperature-controlled tank</text>
      </g>

      {/* inputs */}
      <g>
        <rect x="330" y="80" width="120" height="30" rx="8" className="fill-current text-emerald-500/15" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
        <text x="390" y="100" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">microbe (starter culture)</text>
        <rect x="330" y="130" width="120" height="30" rx="8" className="fill-current text-amber-500/15" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        <text x="390" y="150" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">substrate (sugar medium)</text>
        <line x1="330" y1="95" x2="274" y2="110" strokeWidth="2.5" className="stroke-current text-foreground" />
        <polygon points="282,102 266,114 284,118" className="fill-current text-foreground" />
        <line x1="330" y1="145" x2="274" y2="150" strokeWidth="2.5" className="stroke-current text-foreground" />
        <polygon points="282,140 266,150 282,158" className="fill-current text-foreground" />
      </g>

      {/* products */}
      <text x="330" y="200" fontSize="11" className="fill-current text-foreground" fontWeight="800">Products (downstream processing):</text>
      {["antibiotics — penicillin, streptomycin", "enzymes — amylase, protease (detergents)", "vitamins — B12 · acids — citric acid", "single-cell protein · biofuels (ethanol)"].map((t, i) => (
        <text key={t} x="330" y={224 + i * 20} fontSize="9.5" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      <text x="16" y="312" fontSize="10" className="fill-current text-muted-foreground">Control the three variables — pH, temperature, oxygen — and the microbe does the chemistry. Fermentation = metabolism without air, harnessed at industrial scale.</text>
    </svg>
  );
}
