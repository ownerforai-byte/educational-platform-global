// Te-I anomaly: mass order vs atomic number order. Theme-aware.
export function TeIAnomaly({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Tellurium iodine anomaly tellurium mass 127.6 higher than iodine 126.9 but tellurium placed before iodine correctly by atomic numbers 52 and 53">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">The classic anomaly: Te before I</text>
      <rect x="30" y="44" width="320" height="100" rx="10" className="fill-current text-rose-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="190" y="66" fontSize="10" textAnchor="middle" className="fill-current text-rose-500" fontWeight="800">Mass order — wrong chemistry</text>
      <rect x="70" y="82" width="100" height="42" rx="6" className="fill-current text-rose-500/20" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="120" y="100" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">I (126.9)</text>
      <text x="120" y="116" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">halogen</text>
      <rect x="190" y="82" width="100" height="42" rx="6" className="fill-current text-rose-500/20" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="240" y="100" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Te (127.6)</text>
      <text x="240" y="116" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">chalcogen</text>
      <text x="190" y="136" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">puts the halogen before the chalcogen — wrong</text>
      <rect x="370" y="44" width="320" height="100" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="530" y="66" fontSize="10" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">Z order — right chemistry</text>
      <rect x="410" y="82" width="100" height="42" rx="6" className="fill-current text-emerald-500/20" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="460" y="100" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Te (Z = 52)</text>
      <text x="460" y="116" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">chalcogen</text>
      <rect x="530" y="82" width="100" height="42" rx="6" className="fill-current text-emerald-500/20" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="580" y="100" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">I (Z = 53)</text>
      <text x="580" y="116" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">halogen</text>
      <text x="530" y="136" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">chalcogen then halogen — families line up</text>
      <rect x="30" y="158" width="660" height="48" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="178" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Mendeleev placed Te before I on chemical grounds and accepted the mass inversion; the modern law resolves it automatically.</text>
      <text x="360" y="196" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Same fix for Ar–K (39.9 vs 39.1) and Co–Ni (58.9 vs 58.7).</text>
    </svg>
  );
}
