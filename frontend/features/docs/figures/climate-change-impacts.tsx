/**
 * Climate change consequences & mitigation — impacts map and the
 * response ladder. Theme-aware via currentColor.
 */
export function ClimateChangeImpacts({ className }: { className?: string }) {
  const panel = (x: number, y: number, c: string, title: string, items: string[], k: string) => (
    <g key={k}>
      <rect x={x} y={y} width="300" height="84" rx="10" style={{ color: c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
      <text x={x + 12} y={y + 22} fontSize="10.5" className="fill-current text-foreground" fontWeight="800">{title}</text>
      {items.map((s, i) => (
        <text key={i} x={x + 12} y={y + 40 + i * 15} fontSize="8.5" className="fill-current text-muted-foreground">• {s}</text>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Climate change impacts panels covering ice and sea level ecosystems agriculture and health plus mitigation strategies mitigation and adaptation">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Climate change — impacts and the two responses</text>

      {panel(16, 50, "rgb(14 165 233 / 0.9)", "ICE & OCEANS", [
        "glaciers retreat (Himalaya — Nepal's water tower)",
        "sea level rise → coastal flooding",
        "ocean acidification bleaches coral",
      ], "a")}
      {panel(340, 50, "rgb(22 163 74 / 0.9)", "ECOSYSTEMS", [
        "species shift uphill / poleward; corals die",
        "phenology mismatch — flowers before pollinators",
        "extinction risk multiplies",
      ], "b")}
      {panel(16, 152, "rgb(217 119 6 / 0.9)", "AGRICULTURE & PEOPLE", [
        "monsoon shifts; droughts & floods intensify",
        "crop yield falls; food prices rise",
        "heat waves → mortality, disease spread",
      ], "c")}
      {panel(340, 152, "rgb(124 58 237 / 0.9)", "RESPONSES", [
        "MITIGATE: cut emissions — renewables, forests",
        "ADAPT: flood-defences, drought crops",
        "global deals: Paris Agreement (2015)",
      ], "d")}

      <text x="16" y="262" fontSize="10" className="fill-current text-muted-foreground">Nepal's stake: Himalayan glaciers feed ten river systems; glacial-lake outburst floods (GLOFs) are the local face of a global problem.</text>
      <text x="16" y="282" fontSize="10" className="fill-current text-muted-foreground">Exam: distinguish mitigation (attacking the cause) from adaptation (softening the blow).</text>
    </svg>
  );
}
