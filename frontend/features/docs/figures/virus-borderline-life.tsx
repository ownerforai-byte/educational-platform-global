/** Borderline of life — is a virus alive? Well-detailed. Theme-aware. */
export function VirusBorderlineLife({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Borderline of life virus living or nonliving debate crystalisation tobacco mosaic virus replication only inside host cell metabolism absent arguments both sides">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The borderline of life — is a virus alive?</text>

      {/* living side */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ARGUMENTS FOR 'LIVING'</text>
      {[
        "has genetic material (DNA or RNA)",
        "reproduces — many identical copies",
        "mutates and evolves like organisms",
        "shows host specificity",
        "responds to its environment",
      ].map((t, i) => (
        <text key={t} x="50" y={94 + i * 20} fontSize="7.4" className="fill-current text-muted-foreground">✓ {t}</text>
      ))}
      <polygon points="195,196 210,214 180,214" className="fill-current text-emerald-500/40" />
      <text x="195" y="234" fontSize="7.4" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="700">it replicates, therefore it lives?</text>

      {/* non-living side */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ARGUMENTS FOR 'NON-LIVING'</text>
      {[
        "no cell, no membrane, no cytoplasm",
        "no metabolism outside the host",
        "can be crystallised and stored like salt",
        "inert until it enters a living cell",
      ].map((t, i) => (
        <text key={t} x="410" y={94 + i * 20} fontSize="7.4" className="fill-current text-muted-foreground">✗ {t}</text>
      ))}
      {/* crystal */}
      <polygon points="540,190 570,200 540,222 510,200" className="fill-current text-rose-400/30" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="240" fontSize="7.4" textAnchor="middle" className="fill-current text-rose-500" fontWeight="700">TMV crystals sit in jars for years — inert</text>
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Verdict: viruses are obligate intracellular parasites — living inside a host, non-living outside. The 2024 PYQ asks exactly this.</text>
    </svg>
  );
}
