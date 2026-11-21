/** Space science applications — the spinoff economy. Well-detailed. Theme-aware. */
export function SpaceScienceApplications({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Space science applications spinoffs satellite remote sensing weather forecasting agriculture monitoring disaster management communication television internet GPS navigation banking timing telemedicine education Nepal NTV satellite transponder lease own satellite debate cost benefit developing country priorities landsat MODIS flood mapping forest cover change detection">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Space science — the spinoff economy on the ground</text>
      {/* applications */}
      <rect x="30" y="40" width="660" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["Remote sensing", "land cover, crops, floods, glaciers — maps from orbit", 130],
        ["Communication", "TV, internet backhaul, telemedicine, distance education", 260],
        ["Navigation + timing", "GPS/GNSS — and the timing behind banking networks", 390],
        ["Weather", "forecasting and cyclone warning save thousands of lives", 520],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 78} y="70" width="156" height="110" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name as string}</text>
          <text x={x as number} y="112" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 32)}</text>
          <text x={x as number} y="126" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(32, 64)}</text>
          <text x={x as number} y="168" fontSize="5.6" textAnchor="middle" className="fill-current text-sky-600" fontWeight="700">{["Landsat, MODIS", "TV, internet", "GPS, banking", "monsoon forecasts"][i]}</text>
        </g>
      ))}
      <text x="360" y="200" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">Nepal's practical use: satellite data maps glacial lakes, flood extents and crop health — space assets serving hill valleys</text>
      {/* facts */}
      <rect x="30" y="212" width="660" height="80" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="232" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The ownership debate: Nepal leases transponders for broadcasting; a domestic satellite (Nepal's own) costs hundreds of millions — the cost-benefit is genuinely contested.</text>
      <text x="360" y="250" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: four application classes + one Nepali example (GLOF monitoring) — the applied-space-science answer.</text>
      <text x="360" y="268" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Spinoffs reach everyday life: weather apps, map navigation, ATM timing — all ride on satellites.</text>
      <text x="360" y="284" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">The space economy's best products aren't in orbit — they're the services the orbit makes possible.</text>
    </svg>
  );
}
