/** E-waste composition hazards — the toxic anatomy of gadgets. Well-detailed. Theme-aware. */
export function EWasteCompositionHazards({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="E-waste composition hazards lead mercury cadmium brominated flame retardants CRT screens circuit boards batteries plastics gold silver palladium recovery informal sector child workers Guiyu Agbogbloshie burning cables toxic smoke Basel Convention transboundary shipment developing countries dump ground formal recycling extended producer responsibility Nepal imports secondhand electronics waste stream growth fastest">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">E-waste — the toxic anatomy of a gadget</text>
      {/* composition */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT'S INSIDE</text>
      {[
        "valuable: gold, silver, copper,",
        "  palladium — a tonne of phones",
        "  holds more gold than a tonne",
        "  of ore",
        "toxic: lead (solder, CRT glass),",
        "  mercury (lamps, switches),",
        "  cadmium (batteries), brominated",
        "  flame retardants (plastics)",
        "the paradox: the same board",
        "  holds a fortune and a poison —",
        "  extraction decides which",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* informal sector */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE INFORMAL SECTOR</text>
      {[
        " Guiyu (China), Agbogbloshie",
        "  (Ghana): cables burned in the",
        "  open for copper — dioxins in",
        "  the smoke, lead in the soil",
        "children pick through the",
        "  imports — the human cost",
        "Basel Convention restricts",
        "  shipping hazardous waste to",
        "  poorer countries — enforcement",
        "  is patchy",
        "the fix: extended producer",
        "  responsibility — the maker",
        "  funds the end of life",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: two valuable metals, two toxins, and the Basel Convention — the four facts of an e-waste answer.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">E-waste is the world's fastest-growing waste stream — your drawer of dead phones is its smallest unit.</text>
    </svg>
  );
}
