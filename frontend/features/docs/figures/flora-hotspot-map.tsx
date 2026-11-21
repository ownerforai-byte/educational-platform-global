/** Flora hotspots & threats — why endemic species are at risk. Theme-aware. */
export function FloraHotspotMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Flora hotspots of Nepal with Himal highlands mid hills and Terai showing endemic species concentration and threats">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Where the unique plants live — and what threatens them</text>

      {/* stylised Nepal profile */}
      <path d="M40 190 L120 90 L200 60 L280 100 L360 150 L440 185 L620 195 L620 210 L40 210 Z" className="fill-current text-emerald-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <circle cx="140" cy="95" r="7" className="fill-current text-rose-500" />
      <circle cx="240" cy="120" r="7" className="fill-current text-amber-500" />
      <circle cx="420" cy="180" r="7" className="fill-current text-sky-500" />
      <text x="140" y="78" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">Himal: endemic primulas, gentians</text>
      <text x="240" y="140" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">Mid-hills: orchids, Rhododendron</text>
      <text x="430" y="202" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">Terai: sal forest, grassland herbs</text>

      {/* threats */}
      <rect x="40" y="216" width="580" height="36" rx="8" className="fill-current text-rose-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(239 68 68 / 0.9)" }} />
      <text x="56" y="239" fontSize="9" className="fill-current text-foreground" fontWeight="700">Threats: deforestation, overgrazing, medicinal over-harvest (yarsagumba, jatamasi), invasive species, climate shift upslope</text>
    </svg>
  );
}
