/** Rhino translocation success — Chitwan to Bardia. Well-detailed. Theme-aware. */
export function RhinoTranslocationSuccess({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Rhino translocation success Chitwan to Bardia Shuklaphanta founder population one horned rhinoceros 752 count 2021 recovery single population risk second home range release operation capture tranquiliser">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Rhino translocation — building a second home</text>
      {/* story */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE OPERATION</text>
      {[
        "by the 1960s Chitwan held the",
        "  country's only rhino herd —",
        "  one epidemic could end them",
        "translocations moved rhinos to",
        "  Bardia and Shuklaphanta to",
        "  build backup populations",
        "the method: dart, tranquilise,",
        "  transport, release in a",
        "  suitable floodplain habitat",
        "some moves struggled (Bardia's",
        "  numbers fell), Chitwan's core",
        "  herd kept growing",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* numbers */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE NUMBERS</text>
      {[
        "2021 national count: 752 rhinos",
        "  — 694 Chitwan, 38 Bardia,",
        "  17 Shuklaphanta, 3 Parsa",
        "from ~100 animals in the 1960s",
        "  to 752 today",
        "success drivers: military-backed",
        "  patrols, zero-poaching years,",
        "  grassland management, and",
        "  community buffer zones",
        "remaining risk: Chitwan still",
        "  holds most rhinos — the second",
        "  population is still small",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: translocation spreads risk — never keep all founders in one basket (or one floodplain).</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">752 rhinos is a recovery — but 92% still live in one park, so the work isn't done.</text>
    </svg>
  );
}
