/** Lichen as air-pollution bioindicator. Well-detailed. Theme-aware. */
export function LichenPollutionBioindicator({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Lichen air pollution bioindicator clean air many species dirty air none sulphur dioxide sensitivity map tree bark monitoring">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Lichens — living air-pollution meters</text>

      {/* gradient zone map */}
      <rect x="30" y="44" width="660" height="150" rx="12" className="fill-current text-slate-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(100 116 139 / 0.9)" }} />
      <text x="360" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DISTANCE FROM A CITY / FACTORY</text>
      {/* zones */}
      <rect x="60" y="80" width="160" height="70" rx="8" className="fill-current text-rose-500/20" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(244 63 94 / 0.8)" }} />
      <rect x="230" y="80" width="160" height="70" rx="8" className="fill-current text-amber-500/20" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(245 158 11 / 0.8)" }} />
      <rect x="400" y="80" width="260" height="70" rx="8" className="fill-current text-emerald-500/20" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.8)" }} />
      <text x="140" y="102" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">LICHEN DESERT</text>
      <text x="140" y="118" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">SO₂ high — none survive</text>
      <text x="310" y="102" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CRUSTOSE ONLY</text>
      <text x="310" y="118" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">toughest forms return first</text>
      <text x="530" y="102" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FULL COMMUNITY</text>
      <text x="530" y="118" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">foliose + fruticose flourish</text>
      {/* arrow */}
      <line x1="70" y1="170" x2="650" y2="170" className="stroke-current text-slate-500" strokeWidth="2" markerEnd="url(#arrhl)" />
      <text x="360" y="184" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">cleaner air → more species, bigger forms</text>

      {/* why card */}
      <rect x="30" y="208" width="400" height="76" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="50" y="228" fontSize="8.2" className="fill-current text-foreground" fontWeight="700">Why so sensitive?</text>
      <text x="50" y="246" fontSize="7.4" className="fill-current text-muted-foreground">• no waxy cuticle, no shedding leaves — gases soak straight in</text>
      <text x="50" y="262" fontSize="7.4" className="fill-current text-muted-foreground">• absorbs water + minerals directly from air and rain</text>
      <text x="50" y="278" fontSize="7.4" className="fill-current text-muted-foreground">• algal partner is easily poisoned by sulphur dioxide</text>

      {/* use card */}
      <rect x="450" y="208" width="240" height="76" rx="10" className="fill-current text-violet-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="470" y="228" fontSize="8.2" className="fill-current text-foreground" fontWeight="700">Used to map</text>
      <text x="470" y="246" fontSize="7.4" className="fill-current text-muted-foreground">• SO₂ around cities and industry</text>
      <text x="470" y="262" fontSize="7.4" className="fill-current text-muted-foreground">• old European 'air quality atlas'</text>
      <text x="470" y="278" fontSize="7.4" className="fill-current text-muted-foreground">• cheap, continuous, living sensors</text>
    </svg>
  );
}
